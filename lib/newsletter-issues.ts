import { FeedItem } from './rss';

export type NewsletterIssue = {
  id: string;
  title: string;
  url: string;
  date: string;
  newsletterId: string;
};

// 프론트엔드 포커스 뉴스레터 이슈 목록
// 실제로는 API를 통해 가져오거나 스크래핑할 수 있지만, 여기서는 정적 데이터로 구현
export const FRONTEND_FOCUS_ISSUES: NewsletterIssue[] = [
  {
    id: '686',
    title: 'Issue #686',
    url: 'https://frontendfoc.us/issues/686',
    date: '2025-04-02',
    newsletterId: 'frontend-focus',
  },
  {
    id: '685',
    title: 'Issue #685',
    url: 'https://frontendfoc.us/issues/685',
    date: '2025-03-26',
    newsletterId: 'frontend-focus',
  },
  {
    id: '684',
    title: 'Issue #684',
    url: 'https://frontendfoc.us/issues/684',
    date: '2025-03-19',
    newsletterId: 'frontend-focus',
  },
  {
    id: '683',
    title: 'Issue #683',
    url: 'https://frontendfoc.us/issues/683',
    date: '2025-03-12',
    newsletterId: 'frontend-focus',
  },
  {
    id: '682',
    title: 'Issue #682',
    url: 'https://frontendfoc.us/issues/682',
    date: '2025-03-05',
    newsletterId: 'frontend-focus',
  },
  {
    id: '681',
    title: 'Issue #681',
    url: 'https://frontendfoc.us/issues/681',
    date: '2025-02-26',
    newsletterId: 'frontend-focus',
  },
  {
    id: '680',
    title: 'Issue #680',
    url: 'https://frontendfoc.us/issues/680',
    date: '2025-02-19',
    newsletterId: 'frontend-focus',
  },
  {
    id: '679',
    title: 'Issue #679',
    url: 'https://frontendfoc.us/issues/679',
    date: '2025-02-12',
    newsletterId: 'frontend-focus',
  },
  {
    id: '678',
    title: 'Issue #678',
    url: 'https://frontendfoc.us/issues/678',
    date: '2025-02-05',
    newsletterId: 'frontend-focus',
  },
  {
    id: '677',
    title: 'Issue #677',
    url: 'https://frontendfoc.us/issues/677',
    date: '2025-01-29',
    newsletterId: 'frontend-focus',
  },
  {
    id: '676',
    title: 'Issue #676',
    url: 'https://frontendfoc.us/issues/676',
    date: '2025-01-22',
    newsletterId: 'frontend-focus',
  },
  {
    id: '675',
    title: 'Issue #675',
    url: 'https://frontendfoc.us/issues/675',
    date: '2025-01-15',
    newsletterId: 'frontend-focus',
  },
  {
    id: '674',
    title: 'Issue #674',
    url: 'https://frontendfoc.us/issues/674',
    date: '2025-01-08',
    newsletterId: 'frontend-focus',
  },
  {
    id: '673',
    title: 'Issue #673',
    url: 'https://frontendfoc.us/issues/673',
    date: '2024-12-18',
    newsletterId: 'frontend-focus',
  },
  {
    id: '672',
    title: 'Issue #672',
    url: 'https://frontendfoc.us/issues/672',
    date: '2024-12-11',
    newsletterId: 'frontend-focus',
  }
];

export const JAVASCRIPT_WEEKLY_ISSUES: NewsletterIssue[] = [
  {
    id: '640',
    title: 'Issue #640',
    url: 'https://javascriptweekly.com/issues/640',
    date: '2025-04-04',
    newsletterId: 'javascript-weekly',
  },
  {
    id: '639',
    title: 'Issue #639',
    url: 'https://javascriptweekly.com/issues/639',
    date: '2025-03-28',
    newsletterId: 'javascript-weekly',
  },
  {
    id: '638',
    title: 'Issue #638',
    url: 'https://javascriptweekly.com/issues/638',
    date: '2025-03-21',
    newsletterId: 'javascript-weekly',
  },
  {
    id: '637',
    title: 'Issue #637',
    url: 'https://javascriptweekly.com/issues/637',
    date: '2025-03-14',
    newsletterId: 'javascript-weekly',
  },
  {
    id: '636',
    title: 'Issue #636',
    url: 'https://javascriptweekly.com/issues/636',
    date: '2025-03-07',
    newsletterId: 'javascript-weekly',
  }
];

export const REACT_STATUS_ISSUES: NewsletterIssue[] = [
  {
    id: '392',
    title: 'Issue #392',
    url: 'https://react.statuscode.com/issues/392',
    date: '2025-04-03',
    newsletterId: 'react-status',
  },
  {
    id: '391',
    title: 'Issue #391',
    url: 'https://react.statuscode.com/issues/391',
    date: '2025-03-27',
    newsletterId: 'react-status',
  },
  {
    id: '390',
    title: 'Issue #390',
    url: 'https://react.statuscode.com/issues/390',
    date: '2025-03-20',
    newsletterId: 'react-status',
  },
  {
    id: '389',
    title: 'Issue #389',
    url: 'https://react.statuscode.com/issues/389',
    date: '2025-03-13',
    newsletterId: 'react-status',
  },
  {
    id: '388',
    title: 'Issue #388',
    url: 'https://react.statuscode.com/issues/388',
    date: '2025-03-06',
    newsletterId: 'react-status',
  },
];

export const NODE_WEEKLY_ISSUES: NewsletterIssue[] = [
  {
    id: '538',
    title: 'Issue #538',
    url: 'https://nodeweekly.com/issues/538',
    date: '2025-04-04',
    newsletterId: 'node-weekly',
  },
  {
    id: '537',
    title: 'Issue #537',
    url: 'https://nodeweekly.com/issues/537',
    date: '2025-03-28',
    newsletterId: 'node-weekly',
  },
  {
    id: '536',
    title: 'Issue #536',
    url: 'https://nodeweekly.com/issues/536',
    date: '2025-03-21',
    newsletterId: 'node-weekly',
  },
  {
    id: '535',
    title: 'Issue #535',
    url: 'https://nodeweekly.com/issues/535',
    date: '2025-03-14',
    newsletterId: 'node-weekly',
  },
  {
    id: '534',
    title: 'Issue #534',
    url: 'https://nodeweekly.com/issues/534',
    date: '2025-03-07',
    newsletterId: 'node-weekly',
  },
];

export const CSS_WEEKLY_ISSUES: NewsletterIssue[] = [
  {
    id: '570',
    title: 'Issue #570',
    url: 'https://css-weekly.com/issue-570/',
    date: '2025-04-01',
    newsletterId: 'css-weekly',
  },
  {
    id: '569',
    title: 'Issue #569',
    url: 'https://css-weekly.com/issue-569/',
    date: '2025-03-25',
    newsletterId: 'css-weekly',
  },
  {
    id: '568',
    title: 'Issue #568',
    url: 'https://css-weekly.com/issue-568/',
    date: '2025-03-18',
    newsletterId: 'css-weekly',
  },
  {
    id: '567',
    title: 'Issue #567',
    url: 'https://css-weekly.com/issue-567/',
    date: '2025-03-11',
    newsletterId: 'css-weekly',
  },
  {
    id: '566',
    title: 'Issue #566',
    url: 'https://css-weekly.com/issue-566/',
    date: '2025-03-04',
    newsletterId: 'css-weekly',
  },
];

export const NEWSLETTER_ISSUES_MAP = {
  'frontend-focus': FRONTEND_FOCUS_ISSUES,
  'javascript-weekly': JAVASCRIPT_WEEKLY_ISSUES,
  'react-status': REACT_STATUS_ISSUES,
  'node-weekly': NODE_WEEKLY_ISSUES,
  'css-weekly': CSS_WEEKLY_ISSUES,
};

// 특정 뉴스레터의 이슈 목록 가져오기
export function getNewsletterIssues(newsletterId: string): NewsletterIssue[] {
  return NEWSLETTER_ISSUES_MAP[newsletterId as keyof typeof NEWSLETTER_ISSUES_MAP] || [];
}

// 뉴스레터 이슈를 RSS 피드 형식으로 변환
export function convertIssueToFeedItem(issue: NewsletterIssue): FeedItem {
  const date = new Date(issue.date);
  return {
    title: issue.title,
    link: issue.url,
    content: `<p>${issue.title} - ${new Date(issue.date).toLocaleDateString()}</p>`,
    contentSnippet: `${issue.title} - ${new Date(issue.date).toLocaleDateString()}`,
    categories: ['뉴스레터', '이슈'],
    source: {
      title: `${issue.newsletterId} 이슈`,
      url: `https://${issue.newsletterId.replace('-', '')}.com/issues`,
      category: '뉴스레터 이슈'
    },
    enclosure: undefined,
    isoDate: date.toISOString()
  };
}

// 특정 뉴스레터의 이슈 목록을 RSS 피드 형식으로 변환
export function getNewsletterIssuesAsFeedItems(newsletterId: string): FeedItem[] {
  const issues = getNewsletterIssues(newsletterId);
  return issues.map(convertIssueToFeedItem);
} 