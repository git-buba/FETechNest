import { FiBook } from "react-icons/fi";
import { fetchAllFeeds } from '@/lib/rss';
import { BlogTabs } from "@/features/blogs/ui/blog-tabs";
import { FeedItem } from "@/lib/rss";

// Static Site Generation과 Incremental Static Regeneration 설정
export const dynamic = 'force-static'; // 정적 생성으로 변경
export const revalidate = 3600; // 1시간마다 재검증

/**
 * 특정 카테고리의 블로그 데이터를 가져오는 함수
 * @param category 블로그 카테고리
 * @returns 정제된 피드 아이템 배열
 */
async function loadBlogsByCategory(category: string): Promise<FeedItem[]> {
  try {
    console.log(`${category} 데이터 정적 생성 중...`);
    const feeds = await fetchAllFeeds(category);
    
    // 직렬화 가능한 형태로 정제
    const serializedFeeds = feeds.map(feed => {
      try {
        // 직렬화-역직렬화를 통해 안전한 객체로 변환
        return JSON.parse(JSON.stringify(feed));
      } catch (error) {
        console.error(`피드 직렬화 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
        return null;
      }
    }).filter(Boolean) as FeedItem[];
    
    console.log(`${category} 데이터 ${serializedFeeds.length}개 로드 완료`);
    return serializedFeeds;
  } catch (error) {
    console.error(`${category} 데이터 로딩 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    return [];
  }
}

/**
 * 메인 페이지 컴포넌트
 * 빌드 시점에 정적으로 생성되며, revalidate 시간마다 재생성됨
 */
export default async function Home() {
  console.log('홈페이지 정적 생성 시작...');
  
  // 여러 카테고리의 데이터를 병렬로 로드
  const [platformBlogs, companyBlogs] = await Promise.all([
    loadBlogsByCategory("플랫폼 기술 블로그"),
    loadBlogsByCategory("회사 기술 블로그")
  ]);
  
  console.log(`홈페이지 데이터 로드 완료: 플랫폼 블로그 ${platformBlogs.length}개, 회사 블로그 ${companyBlogs.length}개`);
  
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
