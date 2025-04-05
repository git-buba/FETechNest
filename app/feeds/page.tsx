import { Suspense } from "react";
import { FiRss, FiInfo } from "react-icons/fi";
import Link from "next/link";
import FeedItem from "@/shared/components/ui/feed-item";
import { TECH_BLOGS } from '@/lib/rss';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1시간마다 재검증

interface FeedSource {
  title: string;
  url: string;
  category?: string;
}

function getFeeds() {
  return { feeds: TECH_BLOGS };
}

function FeedsSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between border border-border rounded-lg p-4 animate-pulse bg-card h-20"
        >
          <div className="flex-1">
            <div className="h-5 bg-muted/70 rounded-full w-2/3 mb-2"></div>
            <div className="h-3 bg-muted/70 rounded-full w-full"></div>
          </div>
          <div className="h-10 w-24 rounded-md bg-muted/70"></div>
        </div>
      ))}
    </div>
  );
}

export default async function FeedsPage() {
  const data = getFeeds();
  const techBlogs = data.feeds as FeedSource[] || [];
  
  return (
    <div className="container mx-auto max-w-7xl py-10 px-4 sm:px-6 md:py-12">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-primary/10">
            <FiRss className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-foreground">
          RSS 피드 목록
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
          기술 블로그 및 뉴스레터 소스의 RSS 피드 목록입니다. 원하는 소스를 복사하여 RSS 리더에 추가하세요.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto my-8">
        <div className="p-4 mb-8 rounded-lg border border-border bg-muted/20">
          <div className="flex items-start gap-3">
            <FiInfo className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">RSS 피드 사용 안내</h3>
              <p className="text-sm text-muted-foreground">
                아래 목록의 피드 URL을 복사하여 <a href="https://feedly.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Feedly</a>, 
                <a href="https://newsblur.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> NewsBlur</a> 또는 
                다른 RSS 리더에 추가하면 최신 소식을 받아볼 수 있습니다.
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">기술 블로그 피드</h2>
        <Suspense fallback={<FeedsSkeleton />}>
          <div className="space-y-4">
            {techBlogs.map((blog: FeedSource, index: number) => (
              <FeedItem key={index} blog={blog} />
            ))}
          </div>
        </Suspense>
        
        <h2 className="text-2xl font-bold mt-12 mb-4">뉴스레터 피드</h2>
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-center text-muted-foreground py-8">
            뉴스레터 피드는 각 뉴스레터 상세 페이지에서 확인할 수 있습니다.<br />
            <Link href="/newsletters" className="text-primary hover:underline mt-2 inline-block">
              뉴스레터 목록 보기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 