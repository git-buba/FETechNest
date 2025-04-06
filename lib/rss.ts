import Parser from 'rss-parser';

export type FeedItem = {
  title: string;
  link: string;
  content: string;
  contentSnippet?: string;
  isoDate?: string;
  pubDate?: string;
  creator?: string;
  author?: string;
  categories?: string[];
  source?: {
    title: string;
    url: string;
    category: string;
  };
  enclosure?: {
    url: string;
    type?: string;
  };
  description?: string;
  guid?: string;
  comments?: string;
  feedUrl?: string;
  language?: string;
};

// 커스텀 필드 타입 정의
type CustomItem = {
  creator: string;
  'dc:creator': string;
  content: string;
  'content:encoded': string;
  description: string;
  comments: string;
  guid: string;
  language: string;
  enclosure: Parser.Enclosure;
};

type CustomFeed = {
  language: string;
};

const parser = new Parser<CustomFeed, CustomItem>({
  customFields: {
    item: [
      'creator',
      'dc:creator',
      'content',
      'content:encoded',
      'description',
      'comments',
      'guid',
      'language',
      'enclosure',
    ],
    feed: [
      'language',
    ]
  },
});

// 유명한 기술 블로그 RSS 피드 목록을 카테고리별로 분리
export const COMPANY_TECH_BLOGS = [
  {
    title: '네이버 D2',
    url: 'https://d2.naver.com/d2.atom',
    category: '회사 기술 블로그'
  },
  {
    title: '카카오 기술 블로그',
    url: 'https://tech.kakao.com/feed/',
    category: '회사 기술 블로그'
  },
  {
    title: '라인 기술 블로그',
    url: 'https://engineering.linecorp.com/ko/feed/',
    category: '회사 기술 블로그'
  },
  {
    title: '우아한형제들 기술 블로그',
    url: 'https://techblog.woowahan.com/feed/',
    category: '회사 기술 블로그'
  },
  {
    title: '토스 기술 블로그',
    url: 'https://toss.tech/rss.xml',
    category: '회사 기술 블로그'
  },
  {
    title: '당근마켓 기술 블로그',
    url: 'https://medium.com/feed/daangn',
    category: '회사 기술 블로그'
  },
  {
    title: '올리브영 기술 블로그',
    url: 'https://techblog.oliveyoung.co.kr/rss',
    category: '회사 기술 블로그'
  },
  {
    title: '여기어때 기술 블로그',
    url: 'https://techblog.gccompany.co.kr/feed',
    category: '회사 기술 블로그'
  },
  {
    title: '카카오페이 기술 블로그',
    url: 'https://tech.kakaopay.com/rss',
    category: '회사 기술 블로그'
  },
  {
    title: '리디 기술 블로그',
    url: 'https://www.ridicorp.com/feed.xml',
    category: '회사 기술 블로그'
  }
];

export const PLATFORM_TECH_BLOGS = [
  {
    title: 'Vercel 블로그',
    url: 'https://vercel.com/atom',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'CSS-Tricks',
    url: 'https://css-tricks.com/feed/',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/feed/',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'JavaScript Weekly',
    url: 'https://javascriptweekly.com/rss/',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'React Blog',
    url: 'https://reactjs.org/feed.xml',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'Vue.js News',
    url: 'https://news.vuejs.org/feed.xml',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'Angular Blog',
    url: 'https://blog.angular.io/feed',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'Next.js Blog',
    url: 'https://nextjs.org/feed.xml',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'Node.js Blog',
    url: 'https://nodejs.org/en/feed/blog.xml',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'GitHub Blog',
    url: 'https://github.blog/feed/',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'Mozilla Hacks',
    url: 'https://hacks.mozilla.org/feed/',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'Chrome 개발자 블로그',
    url: 'https://developer.chrome.com/static/blog/feed.xml',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'MDN Web Docs 블로그',
    url: 'https://developer.mozilla.org/en-US/blog/rss.xml',
    category: '플랫폼 기술 블로그'
  },
  {
    title: 'Web.dev',
    url: 'https://web.dev/feed.xml',
    category: '플랫폼 기술 블로그'
  }
];

// 전체 기술 블로그 목록 (이전 코드와의 호환성을 위해 유지)
export const TECH_BLOGS = [...COMPANY_TECH_BLOGS, ...PLATFORM_TECH_BLOGS];

// 프론트엔드 관련 뉴스레터 목록
export const TECH_NEWSLETTERS = [
  {
    title: 'JavaScript Weekly',
    description: '매주 JavaScript 관련 최신 뉴스와 기사를 제공하는 뉴스레터',
    url: 'https://javascriptweekly.com/',
    imageUrl: '/images/newsletters/javascript-weekly.png'
  },
  {
    title: 'Frontend Focus',
    description: '웹 프론트엔드 개발, HTML, CSS, 브라우저 기술에 관한 뉴스레터',
    url: 'https://frontendfoc.us/',
    imageUrl: '/images/newsletters/frontend-focus.png'
  },
  {
    title: 'React Status',
    description: 'React 생태계의 최신 동향과 튜토리얼을 다루는 주간 뉴스레터',
    url: 'https://react.statuscode.com/',
    imageUrl: '/images/newsletters/react-status.png'
  },
  {
    title: 'Node Weekly',
    description: 'Node.js 관련 최신 뉴스와 기사를 제공하는 주간 뉴스레터',
    url: 'https://nodeweekly.com/',
    imageUrl: '/images/newsletters/node-weekly.png'
  },
  {
    title: 'CSS Weekly',
    description: 'CSS 관련 튜토리얼, 기사, 도구를 공유하는 뉴스레터',
    url: 'https://css-weekly.com/',
    imageUrl: '/images/newsletters/css-weekly.png'
  },
  {
    title: 'TypeScript Weekly',
    description: 'TypeScript 관련 최신 소식과 팁을 제공하는 뉴스레터',
    url: 'https://typescript-weekly.com/',
    imageUrl: '/images/newsletters/typescript-weekly.png'
  },
  {
    title: 'Web Tools Weekly',
    description: '웹 개발 도구와 자원에 관한 주간 뉴스레터',
    url: 'https://webtoolsweekly.com/',
    imageUrl: '/images/newsletters/web-tools-weekly.png'
  },
  {
    title: 'Dev Tips',
    description: '개발자를 위한 팁과 트릭을 제공하는 뉴스레터',
    url: 'https://umaar.com/dev-tips/',
    imageUrl: '/images/newsletters/dev-tips.png'
  },
  {
    title: 'Frontend Horse',
    description: '창의적인 프론트엔드 개발 및 웹 애니메이션에 관한 뉴스레터',
    url: 'https://frontend.horse/',
    imageUrl: '/images/newsletters/frontend-horse.png'
  },
  {
    title: 'Bytes',
    description: '개발자를 위한 짧고 유익한 뉴스레터',
    url: 'https://bytes.dev/',
    imageUrl: '/images/newsletters/bytes.png'
  },
  {
    title: 'Frontend Digest',
    description: '프론트엔드 커뮤니티의 주요 소식을 다루는 뉴스레터',
    url: 'https://frontenddigest.com/',
    imageUrl: '/images/newsletters/frontend-digest.png'
  },
  {
    title: 'Frontend Weekly',
    description: '프론트엔드 개발 관련 뉴스와 트렌드 소식을 전하는 뉴스레터',
    url: 'https://frontendweekly.co/',
    imageUrl: '/images/newsletters/frontend-weekly.png'
  }
];

// 간단한 인메모리 캐시 구현
interface CacheItem<T> {
  data: T;
  expiry: number;
}

const CACHE_DURATION = 60 * 60 * 1000; // 1시간 캐시 유효기간 (밀리초)
const feedCache: Record<string, CacheItem<Parser.Output<CustomItem>>> = {};
const allFeedsCache: Record<string, CacheItem<FeedItem[]>> = {};

// 간소화된 fetchFeed 함수 - 캐싱 추가
export async function fetchFeed(url: string): Promise<Parser.Output<CustomItem> | null> {
  try {
    // 캐시 확인
    const now = Date.now();
    const cacheKey = url;
    
    if (feedCache[cacheKey] && feedCache[cacheKey].expiry > now) {
      console.log(`${url} 피드 캐시에서 가져오기`);
      return feedCache[cacheKey].data;
    }
    
    console.log(`${url} 피드 가져오기 시도 중...`);
    const feed = await parser.parseURL(url);
    console.log(`${url} 피드 가져오기 성공!`);
    
    // 결과 캐싱
    feedCache[cacheKey] = {
      data: feed,
      expiry: now + CACHE_DURATION
    };
    
    return feed;
  } catch (error) {
    console.error(`${url} 피드를 가져오는데 실패: ${error}`);
    return null;
  }
}

// RSS 피드 항목을 서버-클라이언트 직렬화에 안전한 객체로 변환
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeFeedItem(item: Record<string, any>): FeedItem {
  // 기본 필드만 추출하여 새 객체 생성
  const sanitized: FeedItem = {
    title: item.title || '',
    link: item.link || '',
    content: item.content || item['content:encoded'] || item.description || '',
    contentSnippet: item.contentSnippet || '',
    isoDate: item.isoDate || '',
    pubDate: item.pubDate || '',
    creator: item.creator || item['dc:creator'] || item.author || '',
    author: item.author || item.creator || item['dc:creator'] || '',
    categories: Array.isArray(item.categories) ? [...item.categories] : [],
    description: item.description || '',
    source: item.source ? {
      title: item.source.title || '',
      url: item.source.url || '',
      category: item.source.category || ''
    } : undefined
  };

  // enclosure가 있으면 안전하게 복사
  if (item.enclosure && typeof item.enclosure === 'object') {
    sanitized.enclosure = {
      url: item.enclosure.url || '',
      type: item.enclosure.type || ''
    };
  }

  return sanitized;
}

export async function fetchAllFeeds(category?: string) {
  try {
    // 캐시 확인
    const now = Date.now();
    const cacheKey = `feeds-${category || 'all'}`;
    
    if (allFeedsCache[cacheKey] && allFeedsCache[cacheKey].expiry > now) {
      console.log(`캐시에서 피드 가져오기: ${cacheKey}`);
      return allFeedsCache[cacheKey].data;
    }
    
    console.log('모든 피드 가져오기 시작...');
    
    // 카테고리에 따라 블로그 목록 필터링
    const blogsToFetch = category 
      ? TECH_BLOGS.filter(blog => blog.category === category)
      : TECH_BLOGS;
    
    // Promise.allSettled로 모든 피드를 병렬로 가져옵니다
    const results = await Promise.allSettled(
      blogsToFetch.map(async (blog) => {
        try {
          const feed = await fetchFeed(blog.url);
          if (!feed) return [];
          
          return feed.items.map((item) => {
            // 먼저 source 정보 추가
            const itemWithSource = {
              ...item,
              source: {
                title: blog.title,
                url: blog.url,
                category: blog.category
              },
            };
            
            // 직렬화 가능한 객체로 정제
            return sanitizeFeedItem(itemWithSource);
          });
        } catch (blogError) {
          console.error(`${blog.title} 피드 처리 중 오류:`, blogError);
          return [];
        }
      })
    );

    // 성공한 결과만 추출
    const feedsArrays = results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<FeedItem[]>).value);
    
    const allFeeds = feedsArrays.flat();
    
    console.log(`총 ${allFeeds.length}개의 피드 항목을 가져왔습니다.`);

    // 날짜별로 정렬
    const sortedFeeds = allFeeds.sort((a, b) => {
      const dateA = a.isoDate || a.pubDate || '';
      const dateB = b.isoDate || b.pubDate || '';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    
    // 결과 캐싱
    allFeedsCache[cacheKey] = {
      data: sortedFeeds,
      expiry: now + CACHE_DURATION
    };
    
    return sortedFeeds;
  } catch (error) {
    console.error('모든 피드 가져오기 오류:', error);
    return [];
  }
}

// 간소화된 이메일 구독 정보 가져오기 함수
export async function fetchEmailSubscriptionsFromAPI(url: string): Promise<FeedItem[] | null> {
  try {
    console.log(`${url} 이메일 구독 정보 가져오기 시도 중...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API 응답 오류: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`${url} 이메일 구독 정보 가져오기 성공!`);
    
    // 데이터 정제하여 직렬화 가능한 객체로 변환
    const feeds = data.feeds || data.items || data.subscriptions || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return feeds.map((item: Record<string, any>) => sanitizeFeedItem(item));
  } catch (error) {
    console.error(`${url} 이메일 구독 정보를 가져오는데 실패: ${error}`);
    return null;
  }
} 