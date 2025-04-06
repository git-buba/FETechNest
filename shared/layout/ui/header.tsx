"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBook,
  FiRss,
  FiCode,
  FiMoon,
  FiSun,
  FiMail,
} from "react-icons/fi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center space-x-2 text-lg font-bold"
        >
          <FiCode className="h-6 w-6" />
          <span>FE TechNest</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground sm:px-3 sm:py-2 ${
              pathname === "/" ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <FiBook className="h-4 w-4" />
            <span className="hidden sm:inline">블로그</span>
          </Link>
          <Link
            href="/newsletters"
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground sm:px-3 sm:py-2 ${
              pathname === "/newsletters" ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <FiMail className="h-4 w-4" />
            <span className="hidden sm:inline">뉴스레터</span>
          </Link>
          <Link
            href="/feeds"
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground sm:px-3 sm:py-2 ${
              pathname === "/feeds" ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <FiRss className="h-4 w-4" />
            <span className="hidden sm:inline">RSS 피드</span>
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none"
            aria-label="테마 변경"
          >
            {mounted ? (
              theme === "dark" ? (
                <FiSun className="h-4 w-4" />
              ) : (
                <FiMoon className="h-4 w-4" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
} 