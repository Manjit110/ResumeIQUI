import React from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  // Simple toggle for demonstration
  const [dark, setDark] = React.useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  return (
    <button
      onClick={() => setDark(d => !d)}
      className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-lg z-50"
      aria-label="Toggle Dark Mode"
    >
      {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-900" />}
    </button>
  );
}
