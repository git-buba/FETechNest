"use client";

import { FiClock, FiCopy, FiCheck } from "react-icons/fi";
import { useState, useMemo } from "react";
import { BLOG_COLORS } from "@/shared/constants/blog-colors";

interface FeedItemProps {
  blog: {
    title: string;
    url: string;
    category?: string;
  };
}

export default function FeedItem({ blog }: FeedItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(blog.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 블로그 브랜드 색상 가져오기 - useMemo로 최적화
  const blogColor = useMemo(() => 
    BLOG_COLORS[blog.title] || BLOG_COLORS["기본"],
  [blog.title]);

  // 대비되는 텍스트 색상 계산 - useMemo로 최적화
  const textColor = useMemo(() => {
    // 간단한 밝기 계산
    const hexColor = blogColor;
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness > 128 ? '#000000' : '#ffffff';
  }, [blogColor]);

  // 버튼 배경색 - useMemo로 최적화
  const buttonBgColor = useMemo(() => 
    copied ? '#10b981' : blogColor,
  [copied, blogColor]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-border rounded-lg p-4 bg-card overflow-hidden">
      <div className="mb-3 sm:mb-0 relative pl-4 sm:pl-6">
        {/* 색상 표시줄 */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-2 sm:w-3"
          style={{ backgroundColor: blogColor }}
        ></div>
        <h3 className="text-lg font-medium">{blog.title}</h3>
        <div className="mt-1 flex items-center text-xs text-muted-foreground">
          <FiClock className="h-3 w-3 mr-1" />
          <span>업데이트: 매일</span>
        </div>
      </div>
      <div>
        <button 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          onClick={handleCopy}
          style={{ 
            backgroundColor: buttonBgColor, 
            color: textColor 
          }}
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