import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface Newsletter {
  id?: string;
  title: string;
  description?: string;
  contentSnippet?: string;
  publisher: string;
  category: string;
  frequency: string;
  url: string;
  link?: string;
  imageUrl?: string;
  subscribeCount: number;
  topics: string[];
}

interface NewsletterCardProps {
  newsletter: Newsletter;
}

export function NewsletterCard({ newsletter }: NewsletterCardProps) {
  const { title, description = "", contentSnippet, publisher, frequency, topics = [], url, link } = newsletter;
  
  // 외부 링크로 사용할 URL (link가 있으면 link, 없으면 url 사용)
  const externalUrl = link || url;
  
  // 설명이 비어있는 경우 기본 설명 사용 (contentSnippet을 우선적으로 사용)
  const displayDescription = contentSnippet || description || `${publisher}에서 제공하는 ${frequency} 뉴스레터입니다. ${topics.length > 0 ? topics.join(', ') + ' 관련 소식을 전합니다.' : ''}`;

  return (
    <Link 
      href={externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between border border-border rounded-lg p-4 bg-card text-card-foreground hover:shadow-lg transition-all duration-300 hover:bg-accent/10 hover:border-primary/30 hover:-translate-y-0.5 group"
    >
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="text-sm font-medium text-primary">
            {publisher}
          </span>
        </div>
        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {displayDescription}
        </p>
      </div>
      
      <div className="flex items-center text-primary ml-4 transition-transform duration-300 group-hover:translate-x-1">
        <FiChevronRight className="h-5 w-5" />
      </div>
    </Link>
  );
} 