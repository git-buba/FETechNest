import { NextResponse } from 'next/server';
import { TECH_BLOGS } from '@/lib/rss';

// Next.js 14+ 설정
export const runtime = 'nodejs';
export const dynamic = 'force-static'; // 정적 생성으로 변경
export const revalidate = 3600; // 1시간마다 재검증

export async function GET() {
  try {
    // TECH_BLOGS는 상수이므로 바로 JSON으로 변환하여 반환
    return NextResponse.json({
      feeds: TECH_BLOGS,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching feeds:', error);
    return NextResponse.json(
      { error: '피드를 가져오는 중 오류가 발생했습니다', success: false },
      { status: 500 }
    );
  }
} 