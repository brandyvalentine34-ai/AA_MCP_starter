import React from 'react';
import { LegalBriefing } from '../data/legalIntelligenceData';
import { StatusBadge } from './StatusBadge';
import { ArrowUpRight, BookOpen, Check, Bookmark } from 'lucide-react';

interface LegalInsightCardProps {
  briefing: LegalBriefing;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenBriefing: (briefing: LegalBriefing) => void;
}

export const LegalInsightCard: React.FC<LegalInsightCardProps> = ({
  briefing,
  isBookmarked,
  onToggleBookmark,
  onOpenBriefing,
}) => {
  return (
    <article className="bg-white border border-[#E2E8F0] rounded-lg p-6 flex flex-col justify-between hover:border-[#94A3B8] transition-colors">
      <div>
        {/* Header: Publishing Date, Jurisdiction Code, Topic Tag & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-[12px] font-medium text-[#475569]">
            <span className="font-mono-code font-semibold text-[#0B192C] tabular-nums">
              {briefing.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-code font-semibold text-[#1E2E45]">
              {briefing.jurisdictionCode}
            </span>
            <span aria-hidden="true">·</span>
            <span>{briefing.topic}</span>
          </div>
          <StatusBadge status={briefing.status} />
        </div>

        {/* Title in Merriweather (headline-sm) */}
        <h3
          onClick={() => onOpenBriefing(briefing)}
          className="font-serif-editorial text-[18px] leading-[25px] font-bold text-[#0B192C] mt-4 cursor-pointer hover:text-[#1E2E45] transition-colors"
        >
          {briefing.title}
        </h3>

        {/* 2-line analytical summary in Inter (body-md) */}
        <p className="text-[14px] leading-[22px] text-[#44474C] mt-2.5 line-clamp-3">
          {briefing.summary}
        </p>

        {/* Unboxed Docket / Citation Reference */}
        <div className="mt-4 flex items-center gap-2 text-[12px] font-mono-code text-[#475569]">
          <span>Citation: {briefing.docketOrCitation}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{briefing.readingTime}</span>
        </div>
      </div>

      {/* Footer: Partner Attribution Row & Inline Executive Citation Link */}
      <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-[4px] bg-[#0B192C] text-white font-serif-editorial text-xs font-bold flex items-center justify-center shrink-0">
            {briefing.author.initials}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-[#0B192C] truncate">
              {briefing.author.name}
            </div>
            <div className="text-[11px] text-[#475569] truncate">
              {briefing.author.role} · {briefing.author.office}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onToggleBookmark(briefing.id)}
            title={isBookmarked ? 'Remove from Executive Dossier' : 'Add to Executive Dossier'}
            className={`h-8 px-2.5 text-xs font-medium rounded-[4px] border transition-colors inline-flex items-center gap-1 whitespace-nowrap ${
              isBookmarked
                ? 'bg-[#F1F5F9] text-[#0B192C] border-[#0B192C]'
                : 'bg-white text-[#475569] border-[#CBD5E1] hover:text-[#0B192C]'
            }`}
          >
            {isBookmarked ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Cite</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onOpenBriefing(briefing)}
            className="h-8 px-3 text-xs font-semibold rounded-[4px] bg-[#0B192C] text-white hover:bg-[#1E2E45] transition-colors inline-flex items-center gap-1 whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Brief</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
