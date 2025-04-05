// 날짜 포맷팅 함수
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "날짜 없음";
  
  try {
    const date = new Date(dateString);
    
    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) return "날짜 없음";
    
    // 현재 시간과의 차이 계산
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHours = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    // 상대적 시간 표시
    if (diffInSec < 60) {
      return "방금 전";
    } else if (diffInMin < 60) {
      return `${diffInMin}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else {
      // 날짜 형식으로 표시
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}.${month}.${day}`;
    }
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return "날짜 오류";
  }
} 