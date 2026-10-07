import React, { useState } from 'react';
import {
  JurisdictionProfile,
  LegalBriefing,
  StatutoryVector,
} from '../data/legalIntelligenceData';
import { StatusBadge } from './StatusBadge';
import {
  X,
  Scale,
  Printer,
  Copy,
  Check,
  FileText,
  ShieldAlert,
  BookOpen,
} from 'lucide-react';

export type DrawerPayload =
  | {
      type: 'clause';
      jurisdiction: JurisdictionProfile;
      vectorKey: keyof JurisdictionProfile['vectors'];
      vectorData: StatutoryVector;
    }
  | {
      type: 'jurisdiction';
      jurisdiction: JurisdictionProfile;
    }
  | {
      type: 'briefing';
      briefing: LegalBriefing;
    }
  | {
      type: 'export';
      selectedJurisdictions: JurisdictionProfile[];
      bookmarkedBriefings: LegalBriefing[];
    }
  | null;

interface ExecutiveDossierDrawerProps {
  payload: DrawerPayload;
  onClose: () => void;
}

export const ExecutiveDossierDrawer: React.FC<ExecutiveDossierDrawerProps> = ({
  payload,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!payload) return null;

  const handleCopyText = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-30 flex justify-end bg-[#0B192C]/35 backdrop-blur-[1px]">
      <div
        className="w-full max-w-2xl bg-white h-full border-l border-[#CBD5E1] flex flex-col justify-between overflow-hidden"
        style={{
          boxShadow: '0px 8px 24px -4px rgba(11, 25, 44, 0.08)',
        }}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-[#F1F5F9] border-b border-[#CBD5E1] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono-code font-semibold text-[#0B192C]">
            {payload.type === 'clause' && (
              <>
                <Scale className="w-4 h-4 text-[#1E2E45]" />
                <span>STATUTORY CLAUSE & COUNSEL COMMENTARY</span>
              </>
            )}
            {payload.type === 'jurisdiction' && (
              <>
                <FileText className="w-4 h-4 text-[#1E2E45]" />
                <span>FULL JURISDICTION STATUTORY DOSSIER</span>
              </>
            )}
            {payload.type === 'briefing' && (
              <>
                <BookOpen className="w-4 h-4 text-[#1E2E45]" />
                <span>EXECUTIVE LEGAL INTELLIGENCE BRIEFING</span>
              </>
            )}
            {payload.type === 'export' && (
              <>
                <Printer className="w-4 h-4 text-[#1E2E45]" />
                <span>BOARD & GENERAL COUNSEL BRIEFING EXPORT</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-[4px] bg-white border border-[#CBD5E1] flex items-center justify-center text-[#475569] hover:text-[#0B192C] hover:border-[#94A3B8] transition-colors"
            aria-label="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* 1. CLAUSE INSPECTION */}
          {payload.type === 'clause' && (
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
                <div>
                  <span className="text-xs font-mono-code font-bold text-[#1E2E45]">
                    {payload.jurisdiction.code} · {payload.jurisdiction.name}
                  </span>
                  <h2 className="font-serif-editorial text-[22px] leading-[28px] font-bold text-[#0B192C] mt-1">
                    {payload.vectorData.category}
                  </h2>
                </div>
                <StatusBadge status={payload.jurisdiction.status} />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-4 bg-[#F8FAFC] p-4 rounded-[4px] border border-[#E2E8F0]">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#75777D]">
                    Statutory Citation
                  </dt>
                  <dd className="text-[13px] font-mono-code font-bold text-[#0B192C] mt-0.5">
                    {payload.vectorData.citation}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#75777D]">
                    Effective Date & Tier
                  </dt>
                  <dd className="text-[13px] font-semibold text-[#0B192C] mt-0.5 tabular-nums">
                    {payload.vectorData. obligationLevel} · {payload.vectorData.effectiveDate}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#475569]">
                  Verbatim Statutory Text / Regulatory Instrument Excerpt
                </h3>
                <blockquote className="mt-2 p-4 bg-[#F1F5F9] border-l-4 border-[#0B192C] font-serif-editorial italic text-[15px] leading-[25px] text-[#0B192C]">
                  “{payload.vectorData.fullClauseText}”
                </blockquote>
              </div>

              <div className="mt-6">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#475569]">
                  Analytical Summary
                </h3>
                <p className="mt-2 text-[14px] leading-[22px] text-[#131B2E]">
                  {payload.vectorData.summary}
                </p>
              </div>

              <div className="mt-6 p-5 bg-white border border-[#CBD5E1] rounded-[4px]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.05em] text-[#991B1B]">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Partner Practice Note & Operational Risk Guidance</span>
                </div>
                <p className="mt-2 text-[14px] leading-[22px] text-[#131B2E]">
                  {payload.vectorData.counselCommentary}
                </p>
              </div>
            </div>
          )}

          {/* 2. FULL JURISDICTION DOSSIER */}
          {payload.type === 'jurisdiction' && (
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
                <div>
                  <span className="text-xs font-mono-code font-bold text-[#1E2E45]">
                    {payload.jurisdiction.code} · {payload.jurisdiction.region}
                  </span>
                  <h2 className="font-serif-editorial text-[26px] leading-[34px] font-bold text-[#0B192C] mt-1">
                    {payload.jurisdiction.name}
                  </h2>
                  <p className="text-xs font-mono-code text-[#475569] mt-1">
                    {payload.jurisdiction.primaryInstrument} ({payload.jurisdiction.officialCitation})
                  </p>
                </div>
                <StatusBadge status={payload.jurisdiction.status} />
              </div>

              <p className="mt-4 text-[15px] leading-[24px] text-[#131B2E]">
                {payload.jurisdiction.executiveSummary}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 p-4 bg-[#F1F5F9] rounded-[4px] border border-[#E2E8F0]">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#75777D]">
                    Supervisory Authority
                  </div>
                  <div className="text-[13px] font-semibold text-[#0B192C] mt-1">
                    {payload.jurisdiction.supervisoryAuthority}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#75777D]">
                    Penalty Ceiling
                  </div>
                  <div className="text-[13px] font-mono-code font-bold text-[#991B1B] mt-1">
                    {payload.jurisdiction.maxPenaltyCeiling} ({payload.jurisdiction.maxPenaltyRevenuePct})
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#0B192C] border-b border-[#E2E8F0] pb-2">
                  Complete Six-Vector Statutory Breakdown
                </h3>
                {(
                  Object.values(payload.jurisdiction.vectors) as StatutoryVector[]
                ).map((vec, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-serif-editorial font-bold text-[#0B192C]">
                        {vec.category}
                      </span>
                      <span className="font-mono-code font-semibold text-[#1E2E45]">
                        {vec.citation}
                      </span>
                    </div>
                    <p className="text-[13px] leading-[20px] text-[#44474C] mt-1.5">
                      {vec.summary}
                    </p>
                    <p className="text-[12px] text-[#0B192C] mt-2 pt-2 border-t border-[#E2E8F0]">
                      <strong>Counsel Note:</strong> {vec.counselCommentary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. FULL LEGAL BRIEFING ARTICLE */}
          {payload.type === 'briefing' && (
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs font-mono-code text-[#475569]">
                  <span>{payload.briefing.date}</span>
                  <span>·</span>
                  <span className="font-bold text-[#0B192C]">
                    {payload.briefing.jurisdictionName}
                  </span>
                  <span>·</span>
                  <span>{payload.briefing.readingTime}</span>
                </div>
                <StatusBadge status={payload.briefing.status} />
              </div>

              <h2 className="font-serif-editorial text-[24px] leading-[32px] font-bold text-[#0B192C] mt-4">
                {payload.briefing.title}
              </h2>

              <div className="mt-4 flex items-center gap-3 py-3 border-y border-[#E2E8F0]">
                <div className="w-9 h-9 rounded-[4px] bg-[#0B192C] text-white font-serif-editorial text-xs font-bold flex items-center justify-center">
                  {payload.briefing.author.initials}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B192C]">
                    {payload.briefing.author.name}
                  </div>
                  <div className="text-[11px] text-[#475569]">
                    {payload.briefing.author.role} · {payload.briefing.author.office} · Citation: {payload.briefing.docketOrCitation}
                  </div>
                </div>
              </div>

              {/* Executive Key Takeaways */}
              <div className="mt-5 p-4 bg-[#F1F5F9] border border-[#CBD5E1] rounded-[4px]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#0B192C] mb-2">
                  Executive Summary & General Counsel Key Takeaways
                </div>
                <ul className="space-y-2 text-[13px] leading-[20px] text-[#131B2E] list-disc pl-4">
                  {payload.briefing.keyTakeaways.map((kt, idx) => (
                    <li key={idx}>{kt}</li>
                  ))}
                </ul>
              </div>

              {/* Long-form Editorial Sections */}
              <div className="mt-6 space-y-6">
                {payload.briefing.sections.map((sec, idx) => (
                  <section key={idx}>
                    <h3 className="font-serif-editorial text-[18px] leading-[24px] font-bold text-[#0B192C]">
                      {sec.heading}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-[26px] text-[#131B2E]">
                      {sec.content}
                    </p>
                    {sec.statutoryQuote && (
                      <blockquote className="mt-4 p-4 bg-[#F8FAFC] border-l-4 border-[#0B192C] rounded-r-[4px]">
                        <div className="text-[11px] font-mono-code font-bold text-[#0B192C] uppercase tracking-[0.04em]">
                          {sec.statutoryQuote.citation}
                        </div>
                        <p className="mt-1 font-serif-editorial italic text-[14px] leading-[22px] text-[#44474C]">
                          “{sec.statutoryQuote.text}”
                        </p>
                      </blockquote>
                    )}
                  </section>
                ))}
              </div>
            </div>
          )}

          {/* 4. EXECUTIVE BRIEFING DOSSIER EXPORT */}
          {payload.type === 'export' && (
            <div>
              <div className="p-4 bg-[#0B192C] text-white rounded-[4px]">
                <div className="text-[11px] font-mono-code uppercase tracking-[0.05em] text-[#BAC7E1]">
                  LCD GLOBAL AI REGULATORY TRACKER // PRIVILEGED & CONFIDENTIAL ATTORNEY WORK PRODUCT
                </div>
                <h2 className="font-serif-editorial text-[20px] font-bold mt-1">
                  Cross-Border AI Regulatory Executive Briefing Memorandum
                </h2>
                <p className="text-xs text-[#DAE2FD] mt-1">
                  Generated for General Counsel & Board Risk Committee · October 2026
                </p>
              </div>

              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.05em] text-[#0B192C] border-b border-[#E2E8F0] pb-2">
                  1. Pinned Jurisdictions in Comparative Matrix ({payload.selectedJurisdictions.length})
                </h3>
                <div className="mt-3 space-y-2.5">
                  {payload.selectedJurisdictions.map((j) => (
                    <div
                      key={j.id}
                      className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#0B192C]">
                          {j.code} — {j.name} ({j.primaryInstrument})
                        </div>
                        <div className="text-[11px] text-[#475569] mt-0.5">
                          Citation: {j.officialCitation} · Max Penalty: {j.maxPenaltyCeiling}
                        </div>
                      </div>
                      <StatusBadge status={j.status} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.05em] text-[#0B192C] border-b border-[#E2E8F0] pb-2">
                  2. Cited Partner Briefings Attached ({payload.bookmarkedBriefings.length})
                </h3>
                <div className="mt-3 space-y-2.5">
                  {payload.bookmarkedBriefings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 bg-white border border-[#E2E8F0] rounded-[4px]"
                    >
                      <div className="text-xs font-serif-editorial font-bold text-[#0B192C]">
                        {b.title}
                      </div>
                      <div className="text-[11px] text-[#475569] mt-1">
                        {b.author.name} ({b.author.office}) · {b.docketOrCitation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="px-6 py-4 bg-[#F1F5F9] border-t border-[#CBD5E1] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              const summaryText =
                payload.type === 'clause'
                  ? `${payload.jurisdiction.name} — ${payload.vectorData.citation}: "${payload.vectorData.fullClauseText}"`
                  : payload.type === 'briefing'
                  ? `${payload.briefing.title} (${payload.briefing.docketOrCitation})`
                  : `LCD Global AI Regulatory Tracker Dossier (${new Date().toISOString().slice(0, 10)})`;
              handleCopyText(summaryText);
            }}
            className="h-10 px-4 text-xs font-semibold rounded-[4px] bg-white text-[#0B192C] border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Official Citation</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="h-10 px-5 text-xs font-semibold rounded-[4px] bg-[#0B192C] text-white border border-[#0B192C] hover:bg-[#1E2E45] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
