"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { FeedItem } from "@/lib/rss";
import { NewsletterIssueCard } from "./newsletter-issue-card";
import { FiAlertCircle, FiRefreshCw, FiLoader, FiInbox } from "react-icons/fi";
import { getNewsletterIssuesAsFeedItems } from "@/lib/newsletter-issues";

const ITEMS_PER_PAGE = 20;

export function NewsletterIssuesList({ newsletterId }: { newsletterId: string }) {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allFeeds, setAllFeeds] = useState<FeedItem[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastFeedElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  async function fetchIssues() {
    try {
      setLoading(true);
      setError(null);
      
      const issuesData = getNewsletterIssuesAsFeedItems(newsletterId);
      
      setAllFeeds(issuesData || []);
      setFeeds(issuesData.slice(0, ITEMS_PER_PAGE) || []);
      setHasMore(issuesData.length > ITEMS_PER_PAGE);
    } catch (error) {
      console.error("뉴스레터 이슈 가져오기 오류:", error);
      setError("뉴스레터 이슈 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIssues();
  }, [newsletterId]);

  useEffect(() => {
    if (page === 1) return;
    
    const endIndex = page * ITEMS_PER_PAGE;
    const newFeeds = allFeeds.slice(0, endIndex);
    setFeeds(newFeeds);
    setHasMore(endIndex < allFeeds.length);
  }, [page, allFeeds]);

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="flex flex-col items-center p-8 rounded-2xl border border-border animate-pulse bg-card">
          <div className="relative mb-6">
            <FiLoader className="h-16 w-16 animate-spin text-primary" />
            <div className="absolute inset-0 blur-xl opacity-50 bg-primary/20"></div>
          </div>
          <p className="text-xl font-medium text-primary">
            뉴스레터 이슈 목록을 불러오는 중...
          </p>
          <p className="mt-2 text-sm text-muted-foreground">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-8 rounded-2xl border border-border mb-6 max-w-md bg-card">
          <FiAlertCircle className="h-16 w-16 mx-auto mb-6 text-red-500" />
          <h3 className="text-xl font-bold mb-4">오류가 발생했습니다</h3>
          <p className="mb-6 text-lg text-muted-foreground">{error}</p>
          <button
            onClick={fetchIssues}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
          >
            <FiRefreshCw className="h-5 w-5" />
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (feeds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-8 rounded-2xl border border-border max-w-md bg-card">
          <FiInbox className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h3 className="text-xl font-bold mb-4">표시할 뉴스레터 이슈가 없습니다</h3>
          <p className="text-base text-muted-foreground">
            현재 이 뉴스레터의 이슈 정보를 불러올 수 없습니다. 나중에 다시 시도해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3 w-full">
      {feeds.map((feed, index) => {
        if (feeds.length === index + 1) {
          return (
            <div ref={lastFeedElementRef} key={feed.link || index}>
              <NewsletterIssueCard item={feed} />
            </div>
          );
        } else {
          return <NewsletterIssueCard key={feed.link || index} item={feed} />;
        }
      })}
      
      {loading && page > 1 && (
        <div className="flex justify-center items-center py-4">
          <FiLoader className="h-6 w-6 animate-spin text-primary mr-2" />
          <span className="text-muted-foreground">더 불러오는 중...</span>
        </div>
      )}
      
      {!hasMore && feeds.length > 0 && (
        <div className="text-center py-6 text-muted-foreground">
          모든 뉴스레터 이슈를 불러왔습니다
        </div>
      )}
    </div>
  );
} 