import { FeedItem } from './rss';

export type Newsletter = {
  id: string;
  title: string;
  description: string;
  frequency: string;
  link: string;
  categories: string[];
  website?: string;
  twitter?: string;
  image?: string;
};

export type EmailSubscription = {
  id: string;
  name: string;
  description: string;
  email: string;
  frequency: string;
  categories: string[];
  website?: string;
  image?: string;
};

// 프론트엔드 관련 인기 뉴스레터 목록
export const FE_NEWSLETTERS: Newsletter[] = [
  {
    id: 'frontend-focus',
    title: 'Frontend Focus',
    description: '웹 프론트엔드, HTML, CSS, 브라우저 기술에 관한 뉴스와 튜토리얼',
    frequency: '주간',
    link: 'https://frontendfoc.us/',
    categories: ['웹 개발', '프론트엔드', 'HTML', 'CSS'],
    website: 'https://frontendfoc.us/',
    twitter: 'https://twitter.com/frontendfocus',
    image: 'https://cooperpress.s3.amazonaws.com/publications/frontend/frontend.png'
  },
  {
    id: 'javascript-weekly',
    title: 'JavaScript Weekly',
    description: '매주 JavaScript 관련 최신 뉴스와 기사를 제공하는 뉴스레터',
    frequency: '주간',
    link: 'https://javascriptweekly.com/',
    categories: ['JavaScript', '웹 개발', '프론트엔드'],
    website: 'https://javascriptweekly.com/',
    twitter: 'https://twitter.com/javascriptdaily',
    image: 'https://cooperpress.s3.amazonaws.com/publications/javascript/javascript.png'
  },
  {
    id: 'react-status',
    title: 'React Status',
    description: 'React 생태계의 최신 동향, 튜토리얼, 도구에 관한 주간 뉴스레터',
    frequency: '주간',
    link: 'https://react.statuscode.com/',
    categories: ['React', 'JavaScript', '프론트엔드'],
    website: 'https://react.statuscode.com/',
    image: 'https://cooperpress.s3.amazonaws.com/publications/reactstatus/reactstatus.png'
  },
  {
    id: 'node-weekly',
    title: 'Node Weekly',
    description: 'Node.js 생태계 관련 뉴스, 아티클, 프로젝트를 모아 제공',
    frequency: '주간',
    link: 'https://nodeweekly.com/',
    categories: ['Node.js', 'JavaScript', '백엔드'],
    website: 'https://nodeweekly.com/',
    image: 'https://cooperpress.s3.amazonaws.com/publications/node/node.png'
  },
  {
    id: 'css-weekly',
    title: 'CSS Weekly',
    description: 'CSS 관련 뉴스, 튜토리얼, 기술에 관한 주간 뉴스레터',
    frequency: '주간',
    link: 'https://css-weekly.com/',
    categories: ['CSS', '웹 디자인', '프론트엔드'],
    website: 'https://css-weekly.com/',
    twitter: 'https://twitter.com/CSSWeekly',
    image: 'https://pbs.twimg.com/profile_images/1080202833134362624/K-LwG77M_400x400.jpg'
  },
  {
    id: 'typescript-weekly',
    title: 'TypeScript Weekly',
    description: 'TypeScript 개발자를 위한 최신 뉴스와 링크 모음',
    frequency: '주간',
    link: 'https://typescript-weekly.com/',
    categories: ['TypeScript', 'JavaScript', '프론트엔드'],
    website: 'https://typescript-weekly.com/',
    image: 'https://typescript-weekly.com/favicon-96x96.png'
  },
  {
    id: 'web-tools-weekly',
    title: 'Web Tools Weekly',
    description: '웹 개발 도구와 자원에 관한 주간 뉴스레터',
    frequency: '주간',
    link: 'https://webtoolsweekly.com/',
    categories: ['개발 도구', '웹 개발', '프론트엔드'],
    website: 'https://webtoolsweekly.com/',
    image: '/images/newsletters/web-tools-weekly.png'
  },
  {
    id: 'smashing-magazine',
    title: 'Smashing Magazine Newsletter',
    description: '웹 디자인과 개발에 관한 실용적인 기사와 가이드',
    frequency: '격주',
    link: 'https://www.smashingmagazine.com/the-smashing-newsletter/',
    categories: ['웹 디자인', 'UX', 'CSS', '프론트엔드'],
    website: 'https://www.smashingmagazine.com/',
    twitter: 'https://twitter.com/smashingmag',
    image: 'https://www.smashingmagazine.com/images/logo/logo--red.png'
  },
  {
    id: 'dev-tips',
    title: 'Dev Tips',
    description: '개발자를 위한 팁과 트릭을 제공하는 뉴스레터',
    frequency: '주간',
    link: 'https://umaar.com/dev-tips/',
    categories: ['개발 팁', '웹 개발', '프론트엔드'],
    website: 'https://umaar.com/dev-tips/',
    image: '/images/newsletters/dev-tips.png'
  },
  {
    id: 'frontend-horse',
    title: 'Frontend Horse',
    description: '창의적인 프론트엔드 개발 및 웹 애니메이션에 관한 뉴스레터',
    frequency: '격주',
    link: 'https://frontend.horse/',
    categories: ['창의적 코딩', 'CSS', '애니메이션'],
    website: 'https://frontend.horse/',
    image: '/images/newsletters/frontend-horse.png'
  },
  {
    id: 'bytes',
    title: 'Bytes',
    description: '개발자를 위한 짧고 유익한 뉴스레터',
    frequency: '주간',
    link: 'https://bytes.dev/',
    categories: ['JavaScript', '웹 개발', '프론트엔드'],
    website: 'https://bytes.dev/',
    image: '/images/newsletters/bytes.png'
  },
  {
    id: 'frontend-digest',
    title: 'Frontend Digest',
    description: '프론트엔드 커뮤니티의 주요 소식을 다루는 뉴스레터',
    frequency: '주간',
    link: 'https://frontenddigest.com/',
    categories: ['프론트엔드', '웹 개발'],
    website: 'https://frontenddigest.com/',
    image: '/images/newsletters/frontend-digest.png'
  },
  {
    id: 'frontend-weekly',
    title: 'Frontend Weekly',
    description: '프론트엔드 개발 관련 뉴스와 트렌드 소식을 전하는 뉴스레터',
    frequency: '주간',
    link: 'https://frontendweekly.co/',
    categories: ['프론트엔드', '웹 개발'],
    website: 'https://frontendweekly.co/',
    image: '/images/newsletters/frontend-weekly.png'
  }
];

// 프론트엔드 관련 이메일 구독 목록
export const FE_EMAIL_SUBSCRIPTIONS: EmailSubscription[] = [
  {
    id: 'css-tricks',
    name: 'CSS-Tricks',
    description: 'CSS 및 프론트엔드 개발 관련 팁과 트릭',
    email: 'newsletter@css-tricks.com',
    frequency: '주간',
    categories: ['CSS', '웹 개발', '프론트엔드'],
    website: 'https://css-tricks.com/',
    image: 'https://pbs.twimg.com/profile_images/1080202833134362624/K-LwG77M_400x400.jpg'
  },
  {
    id: 'ui-dev-newsletter',
    name: 'UI.dev Newsletter',
    description: 'React, JavaScript, 프론트엔드 개발 관련 최신 정보',
    email: 'info@ui.dev',
    frequency: '주간',
    categories: ['React', 'JavaScript', '프론트엔드'],
    website: 'https://ui.dev/newsletters/',
    image: 'https://pbs.twimg.com/profile_images/1223928896600858625/OXp_QGGa_400x400.jpg'
  },
  {
    id: 'web-dev',
    name: 'web.dev',
    description: 'Google의 웹 개발 가이드와 최신 웹 기술 소식',
    email: 'web.dev@google.com',
    frequency: '격주',
    categories: ['웹 표준', '웹 성능', 'Chrome'],
    website: 'https://web.dev/newsletter/',
    image: 'https://www.smashingmagazine.com/images/logo/logo--red.png'
  },
  {
    id: 'frontend-horse',
    name: 'Frontend Horse',
    description: '크리에이티브 프론트엔드 개발 기법과 영감',
    email: 'hello@frontend.horse',
    frequency: '격주',
    categories: ['창의적 코딩', 'CSS', '애니메이션'],
    website: 'https://frontend.horse/newsletter',
    image: 'https://pbs.twimg.com/profile_images/1223928896600858625/OXp_QGGa_400x400.jpg'
  }
];

// 메일 뉴스레터를 RSS 피드 형식으로 변환하여 통합 표시
export function convertNewsletterToFeedItem(newsletter: Newsletter): FeedItem {
  return {
    title: newsletter.title,
    link: newsletter.link,
    content: `<p>${newsletter.description}</p>`,
    contentSnippet: newsletter.description,
    categories: newsletter.categories,
    source: {
      title: '메일 뉴스레터',
      url: newsletter.website || newsletter.link,
      category: '뉴스레터'
    },
    // 뉴스레터의 이미지가 있으면 enclosure로 추가
    enclosure: newsletter.image ? { url: newsletter.image } : undefined,
    // 최신 콘텐츠는 아니지만 목록에 표시하기 위한 날짜 (현재 시간으로 설정)
    isoDate: new Date().toISOString()
  };
}

// 이메일 구독을 RSS 피드 형식으로 변환
export function convertEmailSubscriptionToFeedItem(subscription: EmailSubscription): FeedItem {
  return {
    title: subscription.name,
    link: subscription.website || `mailto:${subscription.email}`,
    content: `<p>${subscription.description}</p><p>구독 이메일: ${subscription.email}</p>`,
    contentSnippet: `${subscription.description} 구독 이메일: ${subscription.email}`,
    categories: subscription.categories,
    source: {
      title: '이메일 구독',
      url: subscription.website || `mailto:${subscription.email}`,
      category: '이메일 구독'
    },
    // 이미지가 있으면 enclosure로 추가
    enclosure: subscription.image ? { url: subscription.image } : undefined,
    // 표시용 날짜
    isoDate: new Date().toISOString()
  };
}

export function getAllNewsletters(): FeedItem[] {
  return FE_NEWSLETTERS.map(convertNewsletterToFeedItem);
}

export function getAllEmailSubscriptions(): FeedItem[] {
  return FE_EMAIL_SUBSCRIPTIONS.map(convertEmailSubscriptionToFeedItem);
} 