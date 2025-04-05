"use client";

import { FiLoader, FiAlertCircle, FiRefreshCw, FiInbox } from "react-icons/fi";
import { NewsletterCard } from "./newsletter-card";
import { fetcher } from "@/lib/api";
import useSWR from "swr";

interface Newsletter {
  id?: string;
  title: string;
  description: string;
  publisher: string;
  category: string;
  frequency: string;
  url: string;
  link?: string;
  imageUrl?: string;
  subscribeCount: number;
  topics: string[];
}

interface NewsletterListProps {
  initialNewsletters?: Newsletter[];
}

export function NewsletterList({ initialNewsletters = [] }: NewsletterListProps) {
  // SWR 설정에서 API URL을 null로 설정하여 API 호출 비활성화
  const { data, error, isLoading, mutate } = useSWR<{newsletters: Newsletter[]}>(
    null, // API URL을 null로 설정하여 API 호출을 비활성화
    fetcher, 
    {
      fallbackData: { newsletters: initialNewsletters },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 3600000,
      focusThrottleInterval: 3600000,
    }
  );
  
  // 뉴스레터 데이터 (초기 데이터만 사용)
  const newsletters = data?.newsletters || initialNewsletters;
  
  if (isLoading && !initialNewsletters.length) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="flex flex-col items-center p-8 rounded-2xl border border-border animate-pulse bg-card">
          <div className="relative mb-6">
            <FiLoader className="h-16 w-16 animate-spin text-primary" />
            <div className="absolute inset-0 blur-xl opacity-50 bg-primary/20"></div>
          </div>
          <p className="text-xl font-medium text-primary">
            뉴스레터 정보를 불러오는 중...
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
          <p className="mb-6 text-lg text-muted-foreground">
            {error instanceof Error 
              ? error.message 
              : '뉴스레터 데이터를 가져오는데 실패했습니다'}
          </p>
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
  
  // 결과가 없는 경우 UI
  if (newsletters.length === 0) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-8 rounded-2xl border border-border max-w-md bg-card">
            <FiInbox className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h3 className="text-xl font-bold mb-4">표시할 뉴스레터가 없습니다</h3>
            <p className="text-base text-muted-foreground">
              아직 등록된 뉴스레터가 없습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col space-y-3 w-full">
        {newsletters.map((newsletter) => (
          <NewsletterCard 
            key={newsletter.link || newsletter.url} 
            newsletter={newsletter} 
          />
        ))}
      </div>
    </div>
  );
} 