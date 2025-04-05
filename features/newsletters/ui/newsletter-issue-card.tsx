"use client";

import { FiChevronRight } from "react-icons/fi";
import { FeedItem } from "@/lib/rss";

export function NewsletterIssueCard({ item }: { item: FeedItem }) {
  return (
    <a 
      href={item.link || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-between border border-border rounded-lg p-4 bg-card text-card-foreground hover:shadow-md transition-all hover:bg-accent/5"
    >
      <div className="flex-1">
        <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
      </div>
      
      <div className="flex items-center text-primary ml-4">
        <FiChevronRight className="h-5 w-5" />
      </div>
    </a>
  );
} 