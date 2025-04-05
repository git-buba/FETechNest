"use client";

import { FiCalendar, FiUser, FiChevronRight, FiLink, FiFileText } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { FeedItem } from "@/lib/rss";
import { useState, useEffect } from "react";

// 블로그별 색상 (이미지 대신 사용)
const BLOG_COLORS = {
  "네이버 D2": "#19ce60",
  "카카오 기술 블로그": "#ffde00",
  "라인 기술 블로그": "#00c300",
  "우아한형제들 기술 블로그": "#2ac1bc",
  "Vercel 블로그": "#000000",
  "CSS-Tricks": "#ff7a59",
  "Smashing Magazine": "#e85c41",
  "JavaScript Weekly": "#f7df1e",
  "React Blog": "#61dafb",
  "Vue.js News": "#42b883",
  "Angular Blog": "#dd0031",
  "Next.js Blog": "#000000",
  "Node.js Blog": "#68a063",
  "GitHub Blog": "#6f42c1",
  "Mozilla Hacks": "#ff9500",
  "토스 기술 블로그": "#0064ff",
  "당근마켓 기술 블로그": "#fa6616",
  "Chrome 개발자 블로그": "#1a73e8",
  "MDN Web Docs 블로그": "#83d0f2",
  "Web.dev": "#3740ff",
  "기본": "#6366f1"
};

export function BlogCard({ item }: { item: FeedItem }) {
  const date = item.isoDate || item.pubDate;
  const formattedDate = date 
    ? formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
    : "";
  
  const author = item.creator || item.author || "알 수 없음";
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
  const getContentSnippet = (content: string | undefined): string => {
    if (!content) return "";
    
    // HTML 태그 제거
    const plainText = content.replace(/<[^>]+>/g, ' ');
    
    // 짧은 설명으로 제한
    return plainText.length > 120 
      ? plainText.substring(0, 120) + '...' 
      : plainText;
  };
  
  const contentSnippet = getContentSnippet(item.content || item.contentSnippet || item.description);
  
  // 블로그 배경색 가져오기
  const getBlogColor = (sourceName: string): string => {
    return BLOG_COLORS[sourceName as keyof typeof BLOG_COLORS] || BLOG_COLORS["기본"];
  };
  
  // 대비되는 텍스트 색상 계산
  const getContrastColor = (hexColor: string): string => {
    // 간단한 밝기 계산
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness > 128 ? '#000000' : '#ffffff';
  };
  
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
      className="block border border-border rounded-lg overflow-hidden bg-card text-card-foreground hover:shadow-md transition-all hover:bg-accent/5"
    >
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/4 h-48 md:h-auto overflow-hidden bg-muted/20 relative">
          {hasImage ? (
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center" 
              style={{ 
                backgroundColor: getBlogColor(sourceName),
                color: getContrastColor(getBlogColor(sourceName))
              }}
            >
              <div className="text-center p-4">
                <FiFileText className="mx-auto h-12 w-12 mb-2" />
                <div className="font-medium">{sourceName}</div>
              </div>
            </div>
          )}
          <div className="absolute top-0 left-0 m-2 px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded">
            {sourceName}
          </div>
        </div>
        
        <div className="flex-1 p-4 md:p-5 flex flex-col">
          <h3 className="text-lg md:text-xl font-medium text-foreground mb-2">{item.title}</h3>
          
          {contentSnippet && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {contentSnippet}
            </p>
          )}
          
          <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
            {date && (
              <span className="flex items-center">
                <FiCalendar className="h-3 w-3 mr-1" />
                {formattedDate}
              </span>
            )}
            <span className="flex items-center">
              <FiUser className="h-3 w-3 mr-1" />
              {author}
            </span>
            <span className="flex items-center ml-auto">
              <FiLink className="h-3 w-3 mr-1" />
              <span className="hover:text-primary">보러가기</span>
              <FiChevronRight className="h-3 w-3 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
} 