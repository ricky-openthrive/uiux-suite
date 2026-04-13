import { Hono } from "hono";
import type { Env } from "./types/env";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();
app.use("*", cors({ origin: "*", allowMethods: ["GET"] }));

app.get("/", (c) => {
  return c.json({
    name: "uiux-registry",
    version: "1.0.0",
  });
});

app.get("/r/:name", async (c): Promise<Response> => {
  const { name } = c.req.param();
  const path = `/r/${name}.json`;

  return c.env.ASSETS.fetch(path).then(async (res) => {
    if (res.status === 200) {
      return new Response(await res.text(), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Component not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  });
});

export default app;
