import { FiBook } from "react-icons/fi";
import { fetchAllFeeds } from '@/lib/rss';
import { BlogTabs } from "@/features/blogs/ui/blog-tabs";

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1시간마다 재검증

// 플랫폼 블로그 데이터 로딩
async function loadPlatformBlogs() {
  try {
    const feeds = await fetchAllFeeds("플랫폼 기술 블로그");
    
    return feeds.map(feed => {
      try {
        return JSON.parse(JSON.stringify(feed));
      } catch (error) {
        console.error('피드 직렬화 오류:', error);
        return null;
      }
    }).filter(Boolean);
  } catch (error) {
    console.error('서버 측 피드 가져오기 오류:', error);
    return [];
  }
}

// 회사 블로그 데이터 로딩
async function loadCompanyBlogs() {
  try {
    const feeds = await fetchAllFeeds("회사 기술 블로그");
    
    return feeds.map(feed => {
      try {
        return JSON.parse(JSON.stringify(feed));
      } catch (error) {
        console.error('피드 직렬화 오류:', error);
        return null;
      }
    }).filter(Boolean);
  } catch (error) {
    console.error('서버 측 피드 가져오기 오류:', error);
    return [];
  }
}

// 메인 페이지 (서버 컴포넌트)
export default async function Home() {
  // 두 카테고리의 데이터를 병렬로 로드
  const [platformBlogs, companyBlogs] = await Promise.all([
    loadPlatformBlogs(),
    loadCompanyBlogs()
  ]);
  
  return (
    <div className="container mx-auto max-w-7xl py-10 px-4 sm:px-6 md:py-12">
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-primary/10">
            <FiBook className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          테크 블로그 모음
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-foreground mb-8">
          다양한 기술 블로그를 한 곳에서 확인하세요
        </p>
      </div>
      
      {/* 클라이언트 컴포넌트로 분리된 탭 UI */}
      <BlogTabs 
        platformBlogs={platformBlogs} 
        companyBlogs={companyBlogs} 
      />
    </div>
  );
}
