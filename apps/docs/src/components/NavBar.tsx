import { useTheme } from "@repo/ui/config/theme-provider.tsx";
import { Button } from "@repo/ui/components/ui/Button.tsx";
import { Moon, Sun } from "lucide-react";

export const NavBar = () => {
  const { setTheme, theme } = useTheme();
  console.log("Current theme:", theme);
  return (
    <nav className="flex">
      <ul className="flex gap-4">
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            Contact
          </a>
        </li>
      </ul>
      {theme === "dark" ? (
        <Button
          variant="primary"
          className="ml-auto"
          onClick={() => setTheme("light")}
        >
          <Sun className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="ml-auto"
          onClick={() => setTheme("dark")}
        >
          <Moon className="w-4 h-4" />
        </Button>
      )}
    </nav>
  );
};
