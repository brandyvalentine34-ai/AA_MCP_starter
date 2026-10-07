/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  JURISDICTIONS,
  LEGAL_BRIEFINGS,
  ENFORCEMENT_CHRONOLOGY,
  RegulatoryStatus,
  JurisdictionProfile,
  StatutoryVector,
} from './data/legalIntelligenceData';
import { StatusBadge } from './components/StatusBadge';
import { JurisdictionMapPanel } from './components/JurisdictionMapPanel';
import { ComparativeMatrix } from './components/ComparativeMatrix';
import { LegalInsightCard } from './components/LegalInsightCard';
import { EnforcementChronology } from './components/EnforcementChronology';
import { StatutoryTriageSimulator } from './components/StatutoryTriageSimulator';
import {
  ExecutiveDossierDrawer,
  DrawerPayload,
} from './components/ExecutiveDossierDrawer';
import {
  Search,
  X,
  Scale,
  Filter,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';

export default function App() {
  // Active workspace view or full executive scroll
  const [activeTab, setActiveTab] = useState<
    'overview' | 'matrix' | 'chronology'
  >('overview');

  // Selected Jurisdiction IDs for Matrix & Map
  const [selectedJurisdictionIds, setSelectedJurisdictionIds] = useState<
    string[]
  >(['eu', 'us-fed', 'us-ca', 'uk', 'cn', 'sg']);

  // Faceted Filter Bar state
  const [statusFilter, setStatusFilter] = useState<RegulatoryStatus | 'ALL'>(
    'ALL'
  );
  const [vectorFilter, setVectorFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Bookmarked briefings for Dossier export
  const [bookmarkedBriefings, setBookmarkedBriefings] = useState<string[]>([
    'brief-eu-gpai-code',
    'brief-ca-ab2013-audit',
  ]);

  // Deep-dive Drawer Payload
  const [drawerPayload, setDrawerPayload] = useState<DrawerPayload>(null);

  // Search input ref for Cmd+K / Ctrl+K shortcut
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && drawerPayload) {
        setDrawerPayload(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerPayload]);

  // Toggle Jurisdiction Selection
  const handleToggleJurisdiction = (id: string) => {
    setSelectedJurisdictionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    setBookmarkedBriefings((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered Jurisdictions
  const filteredJurisdictions = JURISDICTIONS.filter((j) => {
    if (statusFilter !== 'ALL' && j.status !== statusFilter) return false;
    return true;
  });

  // Filtered Briefings
  const filteredBriefings = LEGAL_BRIEFINGS.filter((b) => {
    if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.docketOrCitation.toLowerCase().includes(q) ||
      b.jurisdictionName.toLowerCase().includes(q) ||
      b.topic.toLowerCase().includes(q)
    );
  });

  const handleResetFilters = () => {
    setSelectedJurisdictionIds(['eu', 'us-fed', 'us-ca', 'uk', 'cn', 'sg']);
    setStatusFilter('ALL');
    setVectorFilter('ALL');
    setSearchQuery('');
  };

  const handleInspectClause = (
    jurisdiction: JurisdictionProfile,
    vectorKey: keyof JurisdictionProfile['vectors'],
    vectorData: StatutoryVector
  ) => {
    setDrawerPayload({
      type: 'clause',
      jurisdiction,
      vectorKey,
      vectorData,
    });
  };

  const selectedCodes = JURISDICTIONS.filter((j) =>
    selectedJurisdictionIds.includes(j.id)
  ).map((j) => j.code);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#131B2E] flex flex-col">
      {/* TOP BAR CONTRACT */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark in Merriweather */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('overview');
            }}
            className="font-serif-editorial text-[20px] font-bold tracking-[-0.02em] text-[#0B192C] whitespace-nowrap shrink-0"
          >
            LCD Global AI Regulatory Tracker
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="flex items-center gap-7 text-[14px] font-medium text-[#44474C]">
            {[
              { id: 'overview', label: 'Executive Overview' },
              { id: 'matrix', label: 'Comparative Matrix' },
              { id: 'chronology', label: 'Enforcement Chronology' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      item.id as 'overview' | 'matrix' | 'chronology'
                    )
                  }
                  className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                    isActive
                      ? 'text-[#0B192C] font-semibold border-[#0B192C]'
                      : 'text-[#44474C] border-transparent hover:text-[#0B192C] hover:border-[#CBD5E1]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* EDITORIAL EXECUTIVE HERO BANNER */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code font-semibold text-[#475569] uppercase tracking-[0.04em]">
                <span>CROSS-BORDER STATUTORY INTELLIGENCE</span>
                <span aria-hidden="true">·</span>
                <span>OCTOBER 2026 EDITION</span>
                <span aria-hidden="true">·</span>
                <span>REGULATION (EU) 2024/1689 & GLOBAL COUNTERPARTS</span>
              </div>

              <h1 className="font-serif-editorial text-[28px] sm:text-[36px] lg:text-[40px] leading-[36px] sm:leading-[44px] lg:leading-[48px] tracking-[-0.02em] font-bold text-[#0B192C] mt-2.5 text-balance">
                Global Artificial Intelligence Statutory & Enforcement Matrix
              </h1>

              <p className="text-[16px] leading-[26px] text-[#44474C] mt-3 max-w-3xl">
                Authoritative side-by-side statutory analysis, extraterritorial applicability determinations, and supervisory enforcement chronologies across the European Union, United States Federal & California regimes, the United Kingdom, Mainland China, and Singapore.
              </p>
            </div>

            {/* Key Quantitative Statutory Benchmarks (Tabular Numerals) */}
            <div className="lg:col-span-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#475569] pb-2.5 border-b border-[#E2E8F0] flex items-center justify-between">
                <span>Statutory Exposure Benchmarks</span>
                <span className="font-mono-code text-[#0B192C]">Q4 2026</span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-[11px] text-[#75777D] font-medium">
                    EU AI Act Art. 99 Ceiling
                  </dt>
                  <dd className="text-[18px] font-mono-code font-bold text-[#991B1B] tabular-nums mt-0.5">
                    €35M / 7.0%
                  </dd>
                  <dd className="text-[11px] text-[#475569]">
                    Global Annual Turnover
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#75777D] font-medium">
                    GPAI Systemic Threshold
                  </dt>
                  <dd className="text-[18px] font-mono-code font-bold text-[#0B192C] tabular-nums mt-0.5">
                    10^25 FLOPs
                  </dd>
                  <dd className="text-[11px] text-[#475569]">
                    EU Art. 51(2) Presumption
                  </dd>
                </div>
                <div className="pt-2 border-t border-[#E2E8F0]">
                  <dt className="text-[11px] text-[#75777D] font-medium">
                    Fastest Incident Clock
                  </dt>
                  <dd className="text-[16px] font-mono-code font-bold text-[#0B192C] tabular-nums mt-0.5">
                    1.0 Hour
                  </dd>
                  <dd className="text-[11px] text-[#475569]">
                    China CAC & Singapore MAS
                  </dd>
                </div>
                <div className="pt-2 border-t border-[#E2E8F0]">
                  <dt className="text-[11px] text-[#75777D] font-medium">
                    Cal. AB 2013 Disclosure
                  </dt>
                  <dd className="text-[16px] font-mono-code font-bold text-[#0B192C] tabular-nums mt-0.5">
                    12 Vectors
                  </dd>
                  <dd className="text-[11px] text-[#475569]">
                    Mandatory Dataset Summary
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY FACETED FILTER BAR (Level 2 Elevation) */}
      <div
        className="sticky top-16 z-20 bg-white border-b border-[#CBD5E1]"
        style={{
          boxShadow: '0px 8px 24px -4px rgba(11, 25, 44, 0.06)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Faceted Multi-Select Jurisdiction Chips & Status Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#475569] flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#0B192C]" />
              <span>Jurisdictions:</span>
            </span>

            {JURISDICTIONS.map((jur) => {
              const isSelected = selectedJurisdictionIds.includes(jur.id);
              return (
                <button
                  key={jur.id}
                  type="button"
                  onClick={() => handleToggleJurisdiction(jur.id)}
                  className={`h-8 px-2.5 text-xs font-medium rounded-[4px] border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#F1F5F9] text-[#0B192C] border-[#CBD5E1] font-semibold'
                      : 'bg-white text-[#75777D] border-[#E2E8F0] hover:text-[#0B192C]'
                  }`}
                >
                  <span className="font-mono-code">{jur.code}</span>
                  <span
                    className={`text-[10px] px-1 rounded-[2px] tabular-nums ${
                      isSelected
                        ? 'bg-[#0B192C] text-white'
                        : 'bg-[#F1F5F9] text-[#475569]'
                    }`}
                  >
                    6
                  </span>
                </button>
              );
            })}

            <span className="h-4 w-[1px] bg-[#E2E8F0] mx-1 hidden sm:inline-block" />

            {/* Status Filter Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                aria-label="Filter by Regulatory Status"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as RegulatoryStatus | 'ALL')
                }
                className="h-8 pl-2.5 pr-7 text-xs font-semibold text-[#0B192C] bg-[#F1F5F9] border border-[#CBD5E1] rounded-[4px] appearance-none cursor-pointer focus:outline-2 focus:outline-[#2563EB]"
              >
                <option value="ALL">Status: All Regimes (6)</option>
                <option value="ENACTED">Enacted / In Effect (3)</option>
                <option value="FRAMEWORK">Risk-Based Framework (2)</option>
                <option value="PROPOSED">Proposed / Pending (1)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#475569] pointer-events-none absolute right-2" />
            </div>

            {/* Statutory Vector Filter Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                aria-label="Filter by Statutory Vector"
                value={vectorFilter}
                onChange={(e) => setVectorFilter(e.target.value)}
                className="h-8 pl-2.5 pr-7 text-xs font-semibold text-[#0B192C] bg-[#F1F5F9] border border-[#CBD5E1] rounded-[4px] appearance-none cursor-pointer focus:outline-2 focus:outline-[#2563EB]"
              >
                <option value="ALL">All Statutory Vectors (6)</option>
                <option value="scopeAndTiering">VEC-01: Risk Tiering & Scope</option>
                <option value="foundationModels">VEC-02: GPAI & Compute</option>
                <option value="transparencyAndWatermarking">
                  VEC-03: Synthetic Watermarking
                </option>
                <option value="incidentReporting">
                  VEC-04: Incident Reporting
                </option>
                <option value="conformityAndAudit">
                  VEC-05: FRIA & Conformity Audit
                </option>
                <option value="sovereignDataAndTraining">
                  VEC-06: Training Data & TDM
                </option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#475569] pointer-events-none absolute right-2" />
            </div>

            {(statusFilter !== 'ALL' ||
              vectorFilter !== 'ALL' ||
              searchQuery !== '' ||
              selectedJurisdictionIds.length < JURISDICTIONS.length) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-8 px-2.5 text-xs font-medium text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-[4px] hover:border-[#B91C1C] transition-colors inline-flex items-center gap-1 whitespace-nowrap"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Integrated Quick Search with Ctrl+K / Cmd+K indicator */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#75777D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search citations, Art. 27, AB 2013..."
              className="w-full h-8 pl-8 pr-16 text-xs bg-[#F8FAFC] text-[#0B192C] placeholder-[#75777D] border border-[#CBD5E1] rounded-[4px] focus:bg-white focus:outline-2 focus:outline-[#2563EB]"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#75777D] hover:text-[#0B192C]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono-code font-medium text-[#475569] bg-[#F1F5F9] border border-[#CBD5E1] rounded-[2px]">
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT VIEWPORT (1440px Contained Grid) */}
      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-10 flex-1">
        {/* SECTION 1: Interactive Jurisdiction Map Preview (Shown on Overview) */}
        {activeTab === 'overview' && (
          <section aria-label="Interactive Jurisdiction Map">
            <JurisdictionMapPanel
              jurisdictions={filteredJurisdictions}
              selectedIds={selectedJurisdictionIds}
              onToggleSelect={handleToggleJurisdiction}
              onInspectJurisdiction={(jur) =>
                setDrawerPayload({ type: 'jurisdiction', jurisdiction: jur })
              }
            />
          </section>
        )}

        {/* SECTION 2: Interactive Comparative Regulatory Matrix */}
        {(activeTab === 'overview' || activeTab === 'matrix') && (
          <section aria-label="Comparative Regulatory Matrix">
            <ComparativeMatrix
              jurisdictions={filteredJurisdictions}
              selectedIds={selectedJurisdictionIds}
              searchQuery={searchQuery}
              activeVectorFilter={vectorFilter}
              onInspectClause={handleInspectClause}
            />
          </section>
        )}

        {/* SECTION 3: Structured Legal Insight Cards (Partner Briefings) */}
        {activeTab === 'overview' && (
          <section aria-label="Executive Legal Insight Briefings">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-5 pb-3 border-b border-[#E2E8F0]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                  <span>Partner Practice Memoranda & Statutory Interpretations</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {filteredBriefings.length} Published Briefings
                  </span>
                </div>
                <h2 className="font-serif-editorial text-[22px] leading-[28px] font-bold text-[#0B192C] mt-0.5">
                  Structured Legal Insight Briefings
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status="ENACTED" customLabel="ENACTED / IN EFFECT" />
                <StatusBadge status="FRAMEWORK" customLabel="RISK-BASED FRAMEWORK" />
                <StatusBadge status="PROPOSED" customLabel="PROPOSED / PENDING" />
              </div>
            </div>

            {filteredBriefings.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-lg p-10 text-center">
                <p className="font-serif-editorial text-base font-bold text-[#0B192C]">
                  No Legal Briefings Match Current Filter Criteria
                </p>
                <p className="text-xs text-[#475569] mt-1">
                  Clear your search query or reset status filters to view all published Partner memoranda.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBriefings.map((briefing) => (
                  <LegalInsightCard
                    key={briefing.id}
                    briefing={briefing}
                    isBookmarked={bookmarkedBriefings.includes(briefing.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenBriefing={(b) =>
                      setDrawerPayload({ type: 'briefing', briefing: b })
                    }
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* SECTION 4: Cross-Border Enforcement Chronology */}
        {(activeTab === 'overview' || activeTab === 'chronology') && (
          <section aria-label="Enforcement Chronology">
            <EnforcementChronology
              events={ENFORCEMENT_CHRONOLOGY}
              selectedJurisdictionCodes={selectedCodes}
            />
          </section>
        )}

        {/* SECTION 5: AI System Risk Tiering & Statutory Triage Simulator */}
        {activeTab === 'overview' && (
          <section aria-label="Statutory Triage Simulator">
            <StatutoryTriageSimulator
              onApplyRecommendedJurisdictions={(codes) => {
                const matchingIds = JURISDICTIONS.filter((j) =>
                  codes.includes(j.code)
                ).map((j) => j.id);
                setSelectedJurisdictionIds(matchingIds);
                setActiveTab('matrix');
              }}
            />
          </section>
        )}
      </main>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-white border-t border-[#E2E8F0] mt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#475569]">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#0B192C]" />
            <span className="font-serif-editorial font-bold text-[#0B192C]">
              LCD Global AI Regulatory Tracker
            </span>
            <span>·</span>
            <span>Brussels · Washington, D.C. · San Francisco · London · Singapore</span>
          </div>
          <div className="text-[#75777D]">
            Statutory citations current as of October 2026. For institutional General Counsel reference only.
          </div>
        </div>
      </footer>

      {/* LEVEL 3 Z-INDEX: DEEP-DIVE STATUTORY & EXPORT DRAWER */}
      <ExecutiveDossierDrawer
        payload={drawerPayload}
        onClose={() => setDrawerPayload(null)}
      />
    </div>
  );
};

