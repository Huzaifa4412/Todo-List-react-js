import { ListTodo } from "lucide-react";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState("light");

  return (
    <div className="container flex items-center justify-between">
      <h2
        className="flex gap-2 text-3xl font-bold items-center "
        style={{
          color: "var(--text-color)",
        }}
      >
        <ListTodo size={30} /> Todo List
      </h2>
      {isDark == "light" ? (
        <Moon
          size={30}
          onClick={() => {
            setIsDark("dark");
            document.documentElement.setAttribute("data-theme", "dark");
          }}
          style={{
            color: "var(--text-color)",
          }}
        />
      ) : (
        <Sun
          size={30}
          onClick={() => {
            setIsDark("light");
            document.documentElement.removeAttribute("data-theme");
          }}
          style={{
            color: "var(--text-color)",
          }}
        />
      )}
    </div>
  );
}
