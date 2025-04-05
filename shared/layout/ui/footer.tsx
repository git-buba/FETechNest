"use client";

import Link from "next/link";
import { FiRss, FiMail, FiGithub } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="border-t py-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FE TechNest - 프론트엔드 개발자를 위한 기술 정보 허브
            </p>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <FiRss className="mr-1 h-4 w-4" />
              RSS 피드
            </Link>
            
            <Link
              href="/newsletters"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <FiMail className="mr-1 h-4 w-4" />
              뉴스레터
            </Link>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <FiGithub className="mr-1 h-4 w-4" />
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
} 