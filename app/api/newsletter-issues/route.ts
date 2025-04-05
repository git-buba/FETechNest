import { NextResponse } from 'next/server';
import { getNewsletterIssuesAsFeedItems } from '@/lib/newsletter-issues';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const newsletterId = url.searchParams.get('id');
    
    if (!newsletterId) {
      return NextResponse.json(
        { error: '뉴스레터 ID가 필요합니다.' },
        { status: 400 }
      );
    }
    
    const issues = getNewsletterIssuesAsFeedItems(newsletterId);
    
    if (issues.length === 0) {
      return NextResponse.json(
        { message: '해당 뉴스레터의 이슈가 없습니다.', feeds: [] },
        { status: 200 }
      );
    }
    
    return NextResponse.json({ feeds: issues });
  } catch (error) {
    console.error('뉴스레터 이슈 데이터 가져오기 오류:', error);
    return NextResponse.json(
      { error: '뉴스레터 이슈 데이터를 가져오는 데 실패했습니다.' },
      { status: 500 }
    );
  }
} 