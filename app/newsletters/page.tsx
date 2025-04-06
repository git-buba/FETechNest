import { NewsletterList } from "@/features/newsletters/ui/newsletter-list";
import { FiMail } from "react-icons/fi";
import { FE_NEWSLETTERS } from '@/lib/email-newsletters';
import { TECH_NEWSLETTERS } from '@/lib/rss';

// Static Site Generation과 Incremental Static Regeneration 설정
// force-static: 항상 정적으로 생성
// revalidate: 3600초(1시간)마다 재생성
export const dynamic = 'force-static'; 
export const revalidate = 3600; 

// NewsletterList 컴포넌트에서 필요한 타입과 일치하는 타입 정의
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

/**
 * 뉴스레터 데이터를 정적으로 가져오는 함수
 * 빌드 시점에 실행되며 revalidate 시간마다 백그라운드에서 재실행됨
 */
async function getNewsletters(): Promise<{ newsletters: Newsletter[] }> {
  try {
    console.log('뉴스레터 데이터 정적 생성 중...');
    
    // 모든 뉴스레터 데이터를 하나의 배열로 통합
    const allNewsletters: Newsletter[] = [
      // lib/email-newsletters 데이터 변환
      ...FE_NEWSLETTERS.map(newsletter => ({
        id: newsletter.id,
        title: newsletter.title,
        description: newsletter.description,
        publisher: 'Newsletter Provider',
        category: newsletter.categories[0] || '프론트엔드',
        frequency: newsletter.frequency,
        url: newsletter.website || newsletter.link,
        link: newsletter.link,
        imageUrl: newsletter.image,
        subscribeCount: Math.floor(Math.random() * 1000) + 100,
        topics: newsletter.categories,
      })),
      
      // lib/rss 데이터 변환
      ...TECH_NEWSLETTERS.map(newsletter => ({
        id: newsletter.title.toLowerCase().replace(/\s+/g, '-'),
        title: newsletter.title,
        description: newsletter.description,
        publisher: 'Tech Newsletter',
        category: '기술',
        frequency: '주간',
        url: newsletter.url,
        link: newsletter.url,
        imageUrl: newsletter.imageUrl,
        subscribeCount: Math.floor(Math.random() * 1000) + 500,
        topics: ['기술', '웹개발', '프로그래밍'],
      }))
    ];
    
    // 중복 제거 (제목 기준)
    const uniqueNewsletters = Array.from(
      new Map(allNewsletters.map(item => [item.title, item])).values()
    );
    
    console.log(`${uniqueNewsletters.length}개의 뉴스레터 데이터 생성 완료`);
    return { newsletters: uniqueNewsletters };
  } catch (error) {
    console.error("뉴스레터 데이터 가져오기 오류:", error);
    return { newsletters: [] };
  }
}

/**
 * 뉴스레터 페이지 컴포넌트
 * getNewsletters 함수를 통해 정적으로 데이터를 가져옴
 */
export default async function NewslettersPage() {
  // await를 사용하여 명시적으로 비동기 데이터 로딩
  const data = await getNewsletters();
  
  return (
    <div className="container mx-auto max-w-7xl py-10 px-4 sm:px-6 md:py-12">
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-primary/10">
            <FiMail className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-foreground">
          개발자 뉴스레터
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-muted-foreground mb-8">
          고품질 기술 콘텐츠를 받아보세요
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <NewsletterList initialNewsletters={data.newsletters} />
      </div>
    </div>
  );
} 