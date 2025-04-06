/**
 * API URL을 생성하는 유틸리티 함수
 * 서버 컴포넌트와 클라이언트 컴포넌트 모두에서 사용 가능
 */
export function getApiUrl(path: string, params?: Record<string, string>): string {
  // 기본 URL 설정
  let baseUrl: string;
  
  // 클라이언트 측에서 실행 중인 경우
  if (typeof window !== 'undefined') {
    baseUrl = `${window.location.protocol}//${window.location.host}`;
  } 
  // 서버 측에서 실행 중인 경우
  else {
    // Vercel 환경변수 확인
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else {
      // 로컬 개발 환경
      baseUrl = 'http://localhost:3000';
    }
  }
  
  // 경로가 슬래시로 시작하는지 확인하고 조정
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 기본 URL에 경로 추가
  let url = `${baseUrl}${normalizedPath}`;
  
  // 파라미터가 있는 경우 추가
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });
    
    const queryString = searchParams.toString();
    if (queryString) {
      url = `${url}?${queryString}`;
    }
  }
  
  return url;
} 