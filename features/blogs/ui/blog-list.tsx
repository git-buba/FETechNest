"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { FeedItem, fetchAllFeeds } from "@/lib/rss";
import { FiAlertCircle, FiRefreshCw, FiLoader, FiInbox, FiSearch, FiFilter, FiX, FiChevronDown, FiChevronRight, FiFileText } from "react-icons/fi";
import { TECH_BLOGS, COMPANY_TECH_BLOGS, PLATFORM_TECH_BLOGS } from "@/lib/rss";
import useSWR from 'swr';
import { filterFeeds } from "@/lib/api";
import { BLOG_COLORS } from "@/shared/constants/blog-colors";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const ITEMS_PER_PAGE = 10;

// 블로그별 색상 정의는 shared/constants/blog-colors.ts로 이동했습니다.

// 블로그 카테고리 색상
const CATEGORY_COLORS = {
  "회사 기술 블로그": "#0ea5e9",
  "플랫폼 기술 블로그": "#8b5cf6",
  "전체": "#6366f1"
};

interface BlogListProps {
  initialFeeds?: FeedItem[];
  initialCategory?: string;
  hideCategories?: boolean;
  disableFetching?: boolean;
}

export function BlogList({ 
  initialFeeds = [], 
  initialCategory = "플랫폼 기술 블로그", 
  hideCategories = false,
  disableFetching = false 
}: BlogListProps) {
  // 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // refs
  const observer = useRef<IntersectionObserver | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  
  // SWR을 사용한 데이터 가져오기 (API 대신 직접 함수 호출하도록 수정)
  const { data, error, isLoading, mutate } = useSWR(
    disableFetching ? null : `feeds-${selectedCategory}`,
    async () => {
      const feeds = await fetchAllFeeds(selectedCategory !== "전체" ? selectedCategory : undefined);
      return { feeds };
    },
    {
      fallbackData: initialFeeds.length > 0 ? { feeds: initialFeeds } : undefined,
      revalidateOnFocus: false,
    }
  );
  
  // 모든 피드와 필터링된 피드 상태
  const allFeeds = data?.feeds || initialFeeds;
  const [filteredFeeds, setFilteredFeeds] = useState<FeedItem[]>([]);
  const [displayedFeeds, setDisplayedFeeds] = useState<FeedItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  // 외부 클릭 감지 로직
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showFilterDropdown && 
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterDropdown]);

  // 무한 스크롤 구현을 위한 IntersectionObserver
  const lastFeedElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      }, {
        rootMargin: '300px',
        threshold: 0.1
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // 피드 필터링 및 페이지네이션 처리
  useEffect(() => {
    if (allFeeds.length === 0) return;
    
    // 공통 필터링 함수 사용
    const results = filterFeeds(allFeeds, selectedCategory, selectedSource, searchTerm);
    
    setFilteredFeeds(results);
    setPage(1);
    setDisplayedFeeds(results.slice(0, ITEMS_PER_PAGE));
    setHasMore(results.length > ITEMS_PER_PAGE);
  }, [searchTerm, selectedSource, allFeeds, selectedCategory]);

  // 페이지 변경 시 표시할 피드 업데이트
  useEffect(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    setDisplayedFeeds(filteredFeeds.slice(0, endIndex));
    setHasMore(endIndex < filteredFeeds.length);
  }, [page, filteredFeeds]);

  // 필터 초기화
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSource(null);
    setPage(1);
  };

  // 카테고리 선택 UI
  const renderCategorySelector = () => {
    if (hideCategories) return null;
    
    return (
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-border p-1 bg-card">
          {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
              style={{ 
                borderBottom: selectedCategory === category ? `2px solid ${color}` : 'none'
              }}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // 검색 및 필터 UI
  const renderSearchAndFilter = () => {
    // 카테고리에 맞는 블로그 목록 가져오기
    const blogsForCategory = selectedCategory === "회사 기술 블로그" 
      ? COMPANY_TECH_BLOGS 
      : selectedCategory === "플랫폼 기술 블로그" 
        ? PLATFORM_TECH_BLOGS 
        : TECH_BLOGS;
        
    return (
      <div className="mb-6 bg-card border border-border rounded-lg p-4 shadow-sm">
        {renderCategorySelector()}
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="bg-background border border-border text-foreground rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-3"
            placeholder="게시물 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setSearchTerm("")}
            >
              <FiX className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiFilter className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium">블로그 필터</span>
            </div>
            
            {selectedSource && (
              <button
                onClick={resetFilters}
                className="px-2 py-1 text-xs rounded-full text-destructive hover:text-destructive/90"
              >
                초기화
              </button>
            )}
          </div>
          
          <div className="relative">
            <button
              ref={dropdownButtonRef}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`flex items-center justify-between w-full p-2.5 bg-background border-2 ${showFilterDropdown ? 'border-primary' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`}
            >
              <span className="text-sm">
                {selectedSource ? (
                  <span className="flex items-center">
                    <span className="w-4 h-4 rounded-full mr-2" style={{ 
                      backgroundColor: BLOG_COLORS[selectedSource as keyof typeof BLOG_COLORS] || BLOG_COLORS["기본"] 
                    }}></span>
                    {selectedSource}
                  </span>
                ) : (
                  <span className="text-muted-foreground">블로그 선택</span>
                )}
              </span>
              <FiChevronDown className={`ml-2 h-4 w-4 ${showFilterDropdown ? 'text-primary transform rotate-180' : 'text-muted-foreground'} transition-transform duration-200`} />
            </button>
            
            {showFilterDropdown && (
              <div 
                ref={dropdownRef}
                className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 border-2 border-border rounded-lg shadow-xl py-1 max-h-60 overflow-auto"
              >
                {blogsForCategory.map((blog, index) => (
                  <div key={blog.title}>
                    <button
                      onClick={() => {
                        setSelectedSource(selectedSource === blog.title ? null : blog.title);
                        setShowFilterDropdown(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 text-sm hover:bg-primary/5 ${
                        selectedSource === blog.title ? "bg-primary/20 font-medium" : ""
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full mr-3 flex-shrink-0" style={{ 
                        backgroundColor: BLOG_COLORS[blog.title as keyof typeof BLOG_COLORS] || BLOG_COLORS["기본"] 
                      }}></span>
                      <span className="truncate">{blog.title}</span>
                    </button>
                    {index < blogsForCategory.length - 1 && (
                      <div className="border-t border-border/50 mx-2 my-0.5"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* 선택된 필터 표시 */}
        {selectedSource && (
          <div className="flex items-center mt-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
            <div className="flex-1 flex items-center">
              <span className="w-4 h-4 rounded-full mr-2" style={{ 
                backgroundColor: BLOG_COLORS[selectedSource as keyof typeof BLOG_COLORS] || BLOG_COLORS["기본"] 
              }}></span>
              <span className="text-sm font-medium text-foreground">선택됨: <span className="font-bold text-primary">{selectedSource}</span></span>
            </div>
            <button
              onClick={resetFilters}
              className="p-1 hover:bg-background rounded-full"
              aria-label="필터 초기화"
            >
              <FiX className="h-5 w-5 text-primary hover:text-foreground" />
            </button>
          </div>
        )}
        
        {filteredFeeds.length === 0 && (searchTerm || selectedSource) && !isLoading && (
          <div className="text-center py-4 mt-4 text-muted-foreground bg-muted/20 rounded-lg">
            <div className="flex flex-col items-center justify-center py-6">
              <FiSearch className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-base font-medium">검색 결과가 없습니다</p>
              <p className="text-sm text-muted-foreground mt-1">다른 검색어나 필터를 시도해보세요</p>
            </div>
          </div>
        )}
        
        {filteredFeeds.length > 0 && (searchTerm || selectedSource) && (
          <div className="text-sm text-primary font-medium mt-3 flex items-center">
            <span className="bg-primary/10 rounded-full px-2 py-0.5 text-primary mr-2">{filteredFeeds.length}</span>
            <span>검색 결과 찾음</span>
          </div>
        )}
      </div>
    );
  };

  // 로딩 UI
  if (isLoading && !initialFeeds.length) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="flex flex-col items-center p-8 rounded-2xl border border-border animate-pulse bg-card">
          <div className="relative mb-6">
            <FiLoader className="h-16 w-16 animate-spin text-primary" />
            <div className="absolute inset-0 blur-xl opacity-50 bg-primary/20"></div>
          </div>
          <p className="text-xl font-medium text-primary">
            블로그 피드를 불러오는 중...
          </p>
          <p className="mt-2 text-sm text-muted-foreground">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  // 에러 UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-8 rounded-2xl border border-border mb-6 max-w-md bg-card">
          <FiAlertCircle className="h-16 w-16 mx-auto mb-6 text-red-500" />
          <h3 className="text-xl font-bold mb-4">오류가 발생했습니다</h3>
          <p className="mb-6 text-lg text-muted-foreground">{error.message}</p>
          <button
            onClick={() => mutate()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
          >
            <FiRefreshCw className="h-5 w-5" />
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 결과가 없을 때 UI
  if (displayedFeeds.length === 0 && !searchTerm && !selectedSource && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-8 rounded-2xl border border-border max-w-md bg-card">
          <FiInbox className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h3 className="text-xl font-bold mb-4">표시할 피드가 없습니다</h3>
          <p className="text-base text-muted-foreground">
            현재 구독 중인 블로그에서 피드를 불러올 수 없습니다. 나중에 다시 시도해주세요.
          </p>
        </div>
      </div>
    );
  }

  // 메인 UI
  return (
    <div className="w-full">
      {renderSearchAndFilter()}
      
      {/* 피드 리스트 형태로 변경 */}
      <div className="space-y-4 mt-4">
        {displayedFeeds.length > 0 ? (
          displayedFeeds.map((feed, index) => {
            const date = feed.isoDate || feed.pubDate;
            const formattedDate = date 
              ? formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
              : "";
            const sourceName = feed.source?.title || "블로그";
            const blogColor = BLOG_COLORS[sourceName] || BLOG_COLORS["기본"];
            
            // 컨텐츠 스니펫 생성
            const content = feed.content || feed.contentSnippet || feed.description;
            const contentSnippet = content
              ? content.replace(/<[^>]+>/g, ' ').substring(0, 150) + (content.length > 150 ? '...' : '')
              : "";
            
            return (
              <div 
                key={`${feed.link}-${index}`}
                ref={index === displayedFeeds.length - 1 ? lastFeedElementRef : null}
                className="flex border border-border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow transition-shadow"
              >
                <div 
                  className="w-2 flex-shrink-0"
                  style={{ backgroundColor: blogColor }}
                ></div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div 
                        className="h-6 w-6 flex-shrink-0 rounded-full overflow-hidden mr-2"
                        style={{ backgroundColor: blogColor }}
                      >
                        {feed.enclosure?.url ? (
                          <img 
                            src={feed.enclosure?.url}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <FiFileText className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{sourceName}</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{formattedDate}</span>
                    </div>
                    <a 
                      href={feed.link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                      aria-label="자세히 보기"
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </a>
                  </div>
                  
                  <a 
                    href={feed.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{feed.title}</h3>
                    {contentSnippet && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {contentSnippet}
                      </p>
                    )}
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="border border-dashed rounded-lg p-8 text-center">
            {error ? (
              <div className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</div>
            ) : isLoading ? (
              <div className="flex justify-center">
                <FiLoader className="animate-spin text-primary h-6 w-6" />
              </div>
            ) : searchTerm || selectedSource ? (
              <div>
                <div className="text-muted-foreground mb-2">검색 결과가 없습니다.</div>
                <button 
                  onClick={resetFilters} 
                  className="text-primary hover:underline text-sm"
                >
                  모든 결과 보기
                </button>
              </div>
            ) : (
              <div className="text-muted-foreground">피드가 없습니다.</div>
            )}
          </div>
        )}
      </div>
      
      {/* 로딩 인디케이터 */}
      {hasMore && displayedFeeds.length > 0 && (
        <div className="flex justify-center mt-8 mb-4">
          <FiLoader className="animate-spin text-primary h-6 w-6" />
        </div>
      )}
    </div>
  );
} 