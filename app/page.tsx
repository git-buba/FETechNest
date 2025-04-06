import { FiBook } from "react-icons/fi";
import { BlogTabs } from "@/features/blogs/ui/blog-tabs";
import { fetchAllFeeds } from "@/lib/rss";

// ISR 설정
export const dynamic = 'force-static'; // 정적 생성으로 설정
export const revalidate = 3600; // 1시간마다 재검증

// 메타데이터 설정
export const metadata = {
  title: '기술 블로그 모음 | 개발자를 위한 최신 기술 정보',
  description: '국내외 기술 블로그를 한 곳에서 모아보세요. 최신 개발 트렌드와 기술 정보를 쉽게 확인할 수 있습니다.',
};

// getStaticProps 패턴으로 구현한 데이터 가져오기 함수
async function getStaticBlogsData() {
  try {
    // 여러 카테고리의 데이터를 병렬로 로드
    const [platformBlogs, companyBlogs] = await Promise.all([
      fetchAllFeeds("플랫폼 기술 블로그"),
      fetchAllFeeds("회사 기술 블로그"),
    ]);
    
    console.log(`플랫폼 블로그 ${platformBlogs.length}개, 회사 블로그 ${companyBlogs.length}개 로드됨`);
    
    return {
      platformBlogs,
      companyBlogs,
    };
  } catch (error) {
    console.error(`블로그 데이터 로드 오류:`, error instanceof Error ? error.message : '알 수 없는 오류');
    return {
      platformBlogs: [],
      companyBlogs: [],
    };
  }
}

/**
 * 메인 페이지 컴포넌트
 * ISR 패턴: 빌드 시점에 정적으로 생성되며, revalidate 시간마다 재생성됨
 */
export default async function Home() {
  // getStaticProps 패턴으로 데이터 가져오기
  const { platformBlogs, companyBlogs } = await getStaticBlogsData();
  
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
