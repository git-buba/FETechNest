"use client";

import { FiClock, FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

interface FeedItemProps {
  blog: {
    title: string;
    url: string;
  };
}

export default function FeedItem({ blog }: FeedItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(blog.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-border rounded-lg p-4 bg-card">
      <div className="mb-3 sm:mb-0">
        <h3 className="text-lg font-medium">{blog.title}</h3>
        <div className="mt-1 flex items-center text-xs text-muted-foreground">
          <FiClock className="h-3 w-3 mr-1" />
          <span>업데이트: 매일</span>
        </div>
      </div>
      <div>
        <button 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <FiCheck className="h-4 w-4" />
              <span>복사됨!</span>
            </>
          ) : (
            <>
              <FiCopy className="h-4 w-4" />
              <span>URL 복사</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
} 