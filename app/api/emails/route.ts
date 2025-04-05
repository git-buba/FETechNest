import { NextResponse } from 'next/server';
import { getAllEmailSubscriptions } from '@/lib/email-newsletters';

export async function GET() {
  try {
    // 로컬 데이터에서 이메일 구독 정보를 가져옵니다
    const localEmails = getAllEmailSubscriptions();
    
    // 로컬 데이터 반환
    return NextResponse.json({ feeds: localEmails });
  } catch (error) {
    console.error('이메일 구독 데이터 가져오기 오류:', error);
    return NextResponse.json(
      { error: '이메일 구독 데이터를 가져오는 데 실패했습니다.' },
      { status: 500 }
    );
  }
} 