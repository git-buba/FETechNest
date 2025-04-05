import { NewsletterList } from "@/features/newsletters/ui/newsletter-list";
import { FiMail } from "react-icons/fi";
import { FE_NEWSLETTERS } from '@/lib/email-newsletters';
import { TECH_NEWSLETTERS } from '@/lib/rss';

// 정적 생성(SSG)과 증분 정적 재생성(ISR) 설정
export const dynamic = 'force-static'; // 정적 생성으로 변경
export const revalidate = 3600; // 1시간마다 재검증

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

// API 대신 직접 데이터 소스에서 뉴스레터 정보를 가져옵니다
function getNewsletters() {
  try {
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
    
    return { newsletters: uniqueNewsletters };
  } catch (error) {
    console.error("뉴스레터 데이터 가져오기 오류:", error);
    return { newsletters: [] };
  }
}

export default async function NewslettersPage() {
  const data = getNewsletters();
  
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