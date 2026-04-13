import type { Config } from "./config.js";

// ─── Types ──────────────────────────────────
export interface RegistryFile {
  path: string;
  target: string;
  type: string;
  content: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

export interface RegistryIndex {
  name: string;
  items: {
    name: string;
    type: string;
    title?: string;
    description?: string;
    dependencies: string[];
    registryDependencies: string[];
  }[];
}

const DEFAULT_URL = "https://cxful-registry.ricky-l.workers.dev/";

// ─── Fetch single component ─────────────────
export async function fetchComponent(
  name: string,
  config: Config | null
): Promise<RegistryItem> {
  const base = config?.registryUrl ?? DEFAULT_URL;
  const url = `${base}/r/${name}.json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Component "${name}" not found (${url} → ${res.status})`
    );
  }

  return (await res.json()) as RegistryItem;
}

// ─── Fetch index ────────────────────────────
export async function fetchIndex(
  config: Config | null
): Promise<RegistryIndex> {
  const base = config?.registryUrl ?? DEFAULT_URL;
  const url = `${base}/r/index.json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch registry index (${url} → ${res.status})`
    );
  }

  return (await res.json()) as RegistryIndex;
}

// ─── Resolve components + dependencies recursively ───
export async function resolveComponents(
  names: string[],
  config: Config | null
): Promise<RegistryItem[]> {
  const resolved = new Map<string, RegistryItem>();
  const queue = [...names];

  while (queue.length > 0) {
    const name = queue.shift()!;
    if (resolved.has(name)) continue;

    const item = await fetchComponent(name, config);
    resolved.set(name, item);

    for (const dep of item.registryDependencies) {
      if (!resolved.has(dep)) {
        queue.push(dep);
      }
    }
  }

  // Topological sort — dependencies first
  const ordered: RegistryItem[] = [];
  const visited = new Set<string>();

  function visit(name: string) {
    if (visited.has(name)) return;
    visited.add(name);
    const item = resolved.get(name);
    if (!item) return;
    for (const dep of item.registryDependencies) visit(dep);
    ordered.push(item);
  }

  for (const name of resolved.keys()) visit(name);
  return ordered;
}
