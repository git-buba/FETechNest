"use client";

import { useState } from "react";
import { BlogList } from "@/features/blogs/ui/blog-list";
import { FeedItem } from "@/lib/rss";
import { BsBuilding, BsCodeSquare } from "react-icons/bs";
import { Suspense } from "react";

// 로딩 스켈레톤 UI
function BlogsSkeleton() {
  return (
    <div className="flex flex-col space-y-4 w-full">
      {Array.from({ length: 10 }).map((_, i) => (
        <div 
          key={i} 
          className="flex items-center justify-between border border-border rounded-lg p-4 animate-pulse bg-card"
        >
          <div className="flex-1">
            <div className="h-5 bg-primary/20 rounded-full w-1/5 mb-3"></div>
            <div className="h-6 bg-muted rounded-md w-4/5 mb-3"></div>
            <div className="flex gap-4 mt-2">
              <div className="h-4 bg-muted/70 rounded-full w-24"></div>
              <div className="h-4 bg-muted/70 rounded-full w-32"></div>
              <div className="h-4 bg-muted/70 rounded-full w-20"></div>
            </div>
          </div>
          <div className="w-5 h-5 rounded-full bg-primary/20"></div>
        </div>
      ))}
    </div>
  );
}

// Props 타입 정의
interface BlogTabsProps {
  platformBlogs: FeedItem[];
  companyBlogs: FeedItem[];
}

// 수정된 BlogList 컴포넌트를 포함하는 래퍼
function BlogListWrapper({ feeds, category }: { feeds: FeedItem[], category: string }) {
  return (
    <div className="mt-4">
      <BlogList 
        initialFeeds={feeds} 
        initialCategory={category} 
        hideCategories={true} 
        disableFetching={true} // 서버 데이터만 사용하도록 설정
      />
    </div>
  );
}

// 블로그 탭 컴포넌트
export function BlogTabs({ platformBlogs, companyBlogs }: BlogTabsProps) {
  const [activeTab, setActiveTab] = useState<"platform" | "company" | "all">("platform");
  
  // 서버에서 제공한 데이터 사용 (SWR 불필요)
  const platformFeedsToShow = platformBlogs;
  const companyFeedsToShow = companyBlogs;
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* 탭 버튼 - 더 강조된 디자인 */}
      <div className="mb-6">
        <div className="flex rounded-t-xl overflow-hidden border-x border-t border-border">
          <button
            onClick={() => setActiveTab("platform")}
            className={`flex-1 items-center justify-center flex py-4 text-sm transition-all ${
              activeTab === "platform"
                ? "bg-background border-b-2 border-primary text-primary font-bold"
                : "bg-muted border-b border-border text-foreground/70 hover:bg-muted/70 font-normal"
            }`}
          >
            <BsCodeSquare className="mr-2 h-5 w-5" />
            <span>플랫폼 기술 블로그</span>
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`flex-1 items-center justify-center flex py-4 text-sm transition-all ${
              activeTab === "company"
                ? "bg-background border-b-2 border-primary text-primary font-bold"
                : "bg-muted border-b border-border text-foreground/70 hover:bg-muted/70 font-normal"
            }`}
          >
            <BsBuilding className="mr-2 h-5 w-5" />
            <span>회사 기술 블로그</span>
          </button>
        </div>
      </div>
      
      {/* 탭 컨텐츠 - 패널 디자인 추가 */}
      <div className="rounded-b-xl border border-border bg-card p-4">
        {/* 플랫폼 블로그 탭 */}
        <div className={activeTab === "platform" ? "block" : "hidden"}>
          <Suspense fallback={<BlogsSkeleton />}>
            <BlogListWrapper feeds={platformFeedsToShow} category="플랫폼 기술 블로그" />
          </Suspense>
        </div>
        
        {/* 회사 블로그 탭 */}
        <div className={activeTab === "company" ? "block" : "hidden"}>
          <Suspense fallback={<BlogsSkeleton />}>
            <BlogListWrapper feeds={companyFeedsToShow} category="회사 기술 블로그" />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 