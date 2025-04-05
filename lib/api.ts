import { FeedItem } from "./rss";

// SWR용 fetcher 함수
export const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMessage = errorData.error || `서버 오류: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    // 네트워크 오류나 JSON 파싱 오류 등을 처리
    if (error instanceof Error) {
      throw new Error(`데이터를 가져오는데 실패했습니다: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다');
  }
};

// 초기 데이터로 SWR 키를 생성하는 헬퍼 함수
export const getSWRKey = <T extends unknown[]>(url: string, initialData: T = [] as unknown as T) => {
  return initialData.length > 0 ? null : url;
};

// 피드 필터링 함수
export const filterFeeds = (
  feeds: FeedItem[] | null | undefined, 
  category: string, 
  source: string | null = null, 
  searchTerm: string = ""
): FeedItem[] => {
  // null 또는 undefined 체크
  if (!feeds) return [];
  
  // 빈 배열 체크
  if (feeds.length === 0) return [];
  
  // 카테고리 필터링
  let results = feeds;
  if (category !== "전체") {
    results = feeds.filter((feed: FeedItem) => 
      feed.source?.category === category
    );
  }
  
  // 소스 필터링
  if (source) {
    results = results.filter((feed: FeedItem) => 
      feed.source?.title === source
    );
  }
  
  // 검색어 필터링
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    results = results.filter(
      (feed: FeedItem) => 
        (feed.title || '').toLowerCase().includes(term) ||
        (feed.content || '').toLowerCase().includes(term) ||
        (feed.contentSnippet || '').toLowerCase().includes(term) ||
        (feed.description || '').toLowerCase().includes(term)
    );
  }
  
  return results;
}; 