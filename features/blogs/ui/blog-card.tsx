"use client";

import { FiChevronRight, FiFileText } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { FeedItem } from "@/lib/rss";
import { useState, useEffect, useMemo } from "react";
import { BLOG_COLORS } from "@/shared/constants/blog-colors";

// 블로그별 색상 정의는 shared/constants/blog-colors.ts로 이동했습니다.

export function BlogCard({ item }: { item: FeedItem }) {
  const date = item.isoDate || item.pubDate;
  const formattedDate = date 
    ? formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
    : "";
  
  const sourceName = item.source?.title || "블로그";
  const [hasImage, setHasImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  
  // 컨텐츠에서 첫 번째 이미지 URL을 추출하는 함수
  const extractImageFromContent = (content: string): string | null => {
    if (!content) return null;
    
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(imgRegex);
    
    return match ? match[1] : null;
  };
  
  // 컨텐츠 스니펫 생성 (HTML 태그 제거)
  const contentSnippet = useMemo(() => {
    const content = item.content || item.contentSnippet || item.description;
    if (!content) return "";
    
    // HTML 태그 제거
    const plainText = content.replace(/<[^>]+>/g, ' ');
    
    // 짧은 설명으로 제한
    return plainText.length > 150 
      ? plainText.substring(0, 150) + '...' 
      : plainText;
  }, [item.content, item.contentSnippet, item.description]);
  
  // 블로그 배경색 가져오기 - useMemo로 최적화
  const blogColor = useMemo(() => 
    BLOG_COLORS[sourceName] || BLOG_COLORS["기본"], 
  [sourceName]);
  
  // 대비되는 텍스트 색상 계산 - useMemo로 최적화
  const contrastColor = useMemo(() => {
    // 간단한 밝기 계산
    const hexColor = blogColor;
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness > 128 ? '#000000' : '#ffffff';
  }, [blogColor]);
  
  // 컴포넌트 마운트 시 컨텐츠에서 이미지 URL 추출 시도
  useEffect(() => {
    const content = item.content || item.contentSnippet || item.description;
    if (content) {
      const extractedImage = extractImageFromContent(content);
      if (extractedImage) {
        setImageUrl(extractedImage);
        setHasImage(true);
      }
    }
  }, [item]);

  return (
    <a 
      href={item.link || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block border-b border-border py-4 px-4 hover:bg-accent/5 transition-colors"
    >
      <div className="flex w-full">
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center mb-1">
            <div 
              className="h-5 w-5 flex-shrink-0 mr-2 rounded overflow-hidden"
              style={{ 
                backgroundColor: blogColor,
                color: contrastColor 
              }}
            >
              {hasImage ? (
                <img 
                  src={imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <FiFileText className="h-3 w-3" />
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-muted-foreground">{sourceName}</span>
            {date && (
              <>
                <span className="mx-1 text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{formattedDate}</span>
              </>
            )}
          </div>
          
          <h3 className="text-base font-medium text-foreground mb-1">{item.title}</h3>
          
          {contentSnippet && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {contentSnippet}
            </p>
          )}
        </div>
        
        <div className="flex items-center">
          <FiChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </a>
  );
} 