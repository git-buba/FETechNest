import { NextRequest, NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/rss";

// Next.js 14+ 설정
export const runtime = 'nodejs';
export const dynamic = "force-dynamic"; // URL 파라미터 때문에 동적으로 유지
export const revalidate = 3600; // 1시간마다 재검증

export async function GET(request: NextRequest) {
  try {
    // URL에서 카테고리 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // 캐시 키를 생성할 수 있음 (Redis 또는 다른 캐싱 솔루션을 사용할 경우)
    // const cacheKey = `rss-feeds-${category || 'all'}`;
    
    // 카테고리에 따라 피드 가져오기
    const feeds = await fetchAllFeeds(category || undefined);
    
    if (!feeds || feeds.length === 0) {
      console.log('피드를 가져왔지만 결과가 없습니다.');
      return NextResponse.json({ 
        feeds: [],
        message: '피드를 찾을 수 없습니다. 잠시 후 다시 시도해주세요.' 
      }, { status: 200 });
    }
    
    console.log(`RSS API 응답 완료: ${feeds.length}개의 피드 항목 리턴`);
    return NextResponse.json({ feeds });
  } catch (error) {
    console.error("RSS API error:", error);
    
    return NextResponse.json(
      { message: "피드를 처리하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 