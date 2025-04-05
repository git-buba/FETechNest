import { NextResponse } from 'next/server';
import { getAllNewsletters } from '@/lib/email-newsletters';
import { TECH_NEWSLETTERS } from '@/lib/rss';

// Next.js 14+ 설정
export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 3600; // 1시간마다 재검증

export async function GET() {
  try {
    // 기존 뉴스레터 목록 가져오기
    const newsletters = getAllNewsletters();
    
    // TECH_NEWSLETTERS에서 FeedItem 형식으로 변환
    const techNewsletters = TECH_NEWSLETTERS.map(newsletter => ({
      id: newsletter.title.toLowerCase().replace(/\s+/g, '-'),
      title: newsletter.title,
      description: newsletter.description,
      publisher: 'Tech Newsletter Provider',
      category: '기술',
      frequency: '주간',
      url: newsletter.url,
      imageUrl: newsletter.imageUrl,
      subscribeCount: Math.floor(Math.random() * 1000) + 500,
      topics: ['기술', '웹개발', '프로그래밍'],
      link: newsletter.url,
      content: `<p>${newsletter.description}</p>`,
      contentSnippet: newsletter.description,
      source: {
        title: '기술 뉴스레터',
        url: newsletter.url,
        category: '기술'
      },
      enclosure: newsletter.imageUrl ? { url: newsletter.imageUrl } : undefined,
      isoDate: new Date().toISOString()
    }));
    
    // 두 배열 결합 (중복 제거)
    const combinedNewsletters = [...newsletters];
    
    // 중복되지 않는 항목만 추가
    techNewsletters.forEach(techNewsletter => {
      if (!combinedNewsletters.some(n => n.title === techNewsletter.title)) {
        combinedNewsletters.push(techNewsletter);
      }
    });
    
    return NextResponse.json({ newsletters: combinedNewsletters });
  } catch (error) {
    console.error('뉴스레터 데이터 가져오기 오류:', error);
    return NextResponse.json(
      { error: '뉴스레터 데이터를 가져오는 데 실패했습니다.' },
      { status: 500 }
    );
  }
} 