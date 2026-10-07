import React, { useState } from 'react';
import { JurisdictionProfile } from '../data/legalIntelligenceData';
import { StatusBadge } from './StatusBadge';
import { Globe, ShieldAlert, Scale, ArrowUpRight, Check } from 'lucide-react';

interface JurisdictionMapPanelProps {
  jurisdictions: JurisdictionProfile[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onInspectJurisdiction: (jurisdiction: JurisdictionProfile) => void;
}

export const JurisdictionMapPanel: React.FC<JurisdictionMapPanelProps> = ({
  jurisdictions,
  selectedIds,
  onToggleSelect,
  onInspectJurisdiction,
}) => {
  const [hoveredId, setHoveredId] = useState<string>('eu');

  const activeJurisdiction =
    jurisdictions.find((j) => j.id === hoveredId) || jurisdictions[0];

  const getRegionFill = (id: string) => {
    const j = jurisdictions.find((item) => item.id === id);
    if (!j) return '#E2E8F0';
    if (j.status === 'ENACTED') return '#1E2E45';
    if (j.status === 'PROPOSED') return '#93C5FD';
    return '#64748B';
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
      {/* Top Bar of Map Module */}
      <div className="px-6 py-4 bg-[#F1F5F9] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
            <span>Global Statutory Surveillance</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">5 Primary Regimes Monitored</span>
            <span aria-hidden="true">·</span>
            <span>Q4 2026 Docket</span>
          </div>
          <h2 className="font-serif-editorial text-[18px] font-bold text-[#0B192C] mt-0.5">
            Cross-Border AI Regulatory Topology & Extraterritorial Reach
          </h2>
        </div>

        {/* Map Legend */}
        <div className="flex flex-wrap items-center gap-5 text-xs text-[#44474C]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-[2px] bg-[#1E2E45] inline-block border border-[#0B192C]" />
            <span className="font-medium text-[#0B192C]">Enacted / Binding Statute</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-[2px] bg-[#93C5FD] inline-block border border-[#2563EB]" />
            <span className="font-medium text-[#0B192C]">Proposed / Parliamentary Bill</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-[2px] bg-[#64748B] inline-block border border-[#475569]" />
            <span className="font-medium text-[#0B192C]">Enforcement & Sectoral Framework</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-[2px] bg-[#E2E8F0] inline-block border border-[#CBD5E1]" />
            <span className="text-[#75777D]">Unmonitored / Baseline</span>
          </div>
        </div>
      </div>

      {/* Main Split Grid: Vector Map (7 cols) + Live Jurisdiction Dossier Card (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
        {/* Left: Polished Vector World Map Canvas */}
        <div className="lg:col-span-7 p-6 bg-[#F8FAFC] relative flex flex-col justify-between min-h-[360px]">
          {/* Subtle coordinate grid header */}
          <div className="flex items-center justify-between text-[11px] font-mono-code text-[#75777D] mb-2">
            <span>PROJECTION: MERCATOR STATUTORY INDEX // 2026.10</span>
            <span>SELECT NODE TO PIN IN MATRIX</span>
          </div>

          <div className="relative w-full aspect-[2.15/1] my-auto">
            <svg
              viewBox="0 0 1000 460"
              className="w-full h-full select-none"
              role="img"
              aria-label="Global AI Regulatory Jurisdiction Map"
            >
              <defs>
                <pattern
                  id="legalGrid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="0.75"
                  />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect width="1000" height="460" fill="url(#legalGrid)" />

              {/* Equator & Tropics Hairlines */}
              <line
                x1="0"
                y1="260"
                x2="1000"
                y2="260"
                stroke="#CBD5E1"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="145"
                x2="1000"
                y2="145"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray="2 4"
              />

              {/* Inactive Continental Silhouettes (Stylized Architectural Vector Polygons) */}
              {/* Canada & North America Base */}
              <path
                d="M95,75 L295,65 L335,130 L285,165 L145,165 L90,120 Z"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              {/* Latin America */}
              <path
                d="M255,245 L355,260 L395,335 L335,435 L295,430 L270,320 Z"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              {/* Africa */}
              <path
                d="M445,215 L565,215 L610,275 L575,395 L510,405 L475,310 L435,265 Z"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              {/* Middle East & Central Eurasia */}
              <path
                d="M565,155 L710,105 L855,115 L830,175 L645,235 L575,205 Z"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              {/* South Asia */}
              <path
                d="M665,215 L730,215 L710,295 L675,285 Z"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              {/* Australia / Oceania */}
              <path
                d="M775,335 L895,330 L905,405 L805,415 L770,375 Z"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="1"
              />

              {/* ACTIVE MONITORED JURISDICTIONS */}
              {/* United States Federal Territory */}
              <path
                d="M150,165 L295,165 L310,215 L245,235 L165,225 Z"
                fill={getRegionFill('us-fed')}
                fillOpacity={hoveredId === 'us-fed' ? '0.95' : '0.8'}
                stroke="#0B192C"
                strokeWidth={hoveredId === 'us-fed' ? '2' : '1'}
                className="cursor-pointer transition-opacity duration-150"
                onMouseEnter={() => setHoveredId('us-fed')}
                onClick={() => onInspectJurisdiction(jurisdictions.find((j) => j.id === 'us-fed')!)}
              />

              {/* California Sub-National Highlight */}
              <path
                d="M145,172 L175,172 L182,222 L152,218 Z"
                fill={getRegionFill('us-ca')}
                stroke="#991B1B"
                strokeWidth={hoveredId === 'us-ca' ? '2.5' : '1.5'}
                className="cursor-pointer transition-opacity duration-150"
                onMouseEnter={() => setHoveredId('us-ca')}
                onClick={() => onInspectJurisdiction(jurisdictions.find((j) => j.id === 'us-ca')!)}
              />

              {/* European Union Continental Territory */}
              <path
                d="M460,115 L565,110 L575,185 L465,195 L445,155 Z"
                fill={getRegionFill('eu')}
                fillOpacity={hoveredId === 'eu' ? '1' : '0.88'}
                stroke="#0B192C"
                strokeWidth={hoveredId === 'eu' ? '2' : '1'}
                className="cursor-pointer transition-opacity duration-150"
                onMouseEnter={() => setHoveredId('eu')}
                onClick={() => onInspectJurisdiction(jurisdictions.find((j) => j.id === 'eu')!)}
              />

              {/* United Kingdom Territory */}
              <path
                d="M448,122 L478,120 L480,152 L452,152 Z"
                fill={getRegionFill('uk')}
                stroke="#1D4ED8"
                strokeWidth={hoveredId === 'uk' ? '2.5' : '1.5'}
                className="cursor-pointer transition-opacity duration-150"
                onMouseEnter={() => setHoveredId('uk')}
                onClick={() => onInspectJurisdiction(jurisdictions.find((j) => j.id === 'uk')!)}
              />

              {/* China (PRC) Territory */}
              <path
                d="M705,165 L835,160 L845,245 L735,255 L700,215 Z"
                fill={getRegionFill('cn')}
                fillOpacity={hoveredId === 'cn' ? '1' : '0.88'}
                stroke="#0B192C"
                strokeWidth={hoveredId === 'cn' ? '2' : '1'}
                className="cursor-pointer transition-opacity duration-150"
                onMouseEnter={() => setHoveredId('cn')}
                onClick={() => onInspectJurisdiction(jurisdictions.find((j) => j.id === 'cn')!)}
              />

              {/* Cross-Border Extraterritorial Connection Arcs */}
              <path
                d="M 495 155 Q 360 95 230 185"
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.25"
                strokeDasharray="3 3"
                opacity="0.55"
              />
              <path
                d="M 495 155 Q 630 115 765 205"
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.25"
                strokeDasharray="3 3"
                opacity="0.55"
              />
              <path
                d="M 765 205 Q 775 250 752 295"
                fill="none"
                stroke="#475569"
                strokeWidth="1.25"
                strokeDasharray="2 2"
                opacity="0.6"
              />

              {/* Interactive Jurisdiction Nodes */}
              {jurisdictions.map((j) => {
                const isHovered = hoveredId === j.id;
                const isSelected = selectedIds.includes(j.id);
                return (
                  <g
                    key={j.id}
                    transform={`translate(${j.mapCoordinates.x}, ${j.mapCoordinates.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredId(j.id)}
                    onClick={() => onToggleSelect(j.id)}
                  >
                    {/* Outer Pulse Ring on Active */}
                    {isHovered && (
                      <circle
                        r="16"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                    )}
                    {/* Pin Base */}
                    <rect
                      x="-26"
                      y="-11"
                      width="52"
                      height="22"
                      rx="3"
                      fill={isHovered ? '#0B192C' : isSelected ? '#1E2E45' : '#FFFFFF'}
                      stroke={isHovered ? '#2563EB' : '#0B192C'}
                      strokeWidth={isHovered ? '2' : '1.25'}
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill={isHovered || isSelected ? '#FFFFFF' : '#0B192C'}
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                      letterSpacing="0.04em"
                    >
                      {j.code}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Jurisdiction Selector Strip */}
          <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {jurisdictions.map((j) => {
                const isSelected = selectedIds.includes(j.id);
                const isHovered = hoveredId === j.id;
                return (
                  <button
                    key={j.id}
                    type="button"
                    onMouseEnter={() => setHoveredId(j.id)}
                    onClick={() => onToggleSelect(j.id)}
                    className={`h-8 px-2.5 text-xs font-medium rounded-[4px] border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      isHovered
                        ? 'bg-[#0B192C] text-white border-[#0B192C]'
                        : isSelected
                        ? 'bg-[#F1F5F9] text-[#0B192C] border-[#94A3B8]'
                        : 'bg-white text-[#475569] border-[#CBD5E1] hover:text-[#0B192C]'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-[2px] flex items-center justify-center border ${
                        isSelected
                          ? 'bg-[#2563EB] border-[#2563EB] text-white'
                          : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </span>
                    <span className="font-mono-code font-semibold">{j.code}</span>
                    <span className="hidden sm:inline">{j.name}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] text-[#475569] tabular-nums">
              {selectedIds.length} of {jurisdictions.length} Pinned in Matrix
            </span>
          </div>
        </div>

        {/* Right: Interactive Jurisdiction Micro-Dossier (Level 1 Surface) */}
        <div className="lg:col-span-5 p-6 bg-white flex flex-col justify-between">
          <div>
            {/* Top Status & Code Row */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#475569]">
                <Globe className="w-3.5 h-3.5 text-[#0B192C]" />
                <span>JURISDICTION CODE: {activeJurisdiction.code}</span>
                <span>·</span>
                <span>{activeJurisdiction.region}</span>
              </div>
              <StatusBadge status={activeJurisdiction.status} />
            </div>

            {/* Jurisdiction Title in Merriweather */}
            <h3 className="font-serif-editorial text-[22px] leading-[28px] font-bold text-[#0B192C]">
              {activeJurisdiction.name}
            </h3>
            <p className="text-xs font-mono-code text-[#1E2E45] mt-1 font-medium">
              {activeJurisdiction.primaryInstrument} ({activeJurisdiction.officialCitation})
            </p>

            {/* Analytical Summary */}
            <p className="text-[14px] leading-[22px] text-[#44474C] mt-3">
              {activeJurisdiction.executiveSummary}
            </p>

            {/* Key Statutory Indicators Grid */}
            <dl className="mt-5 pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#75777D]">
                  Max Statutory Penalty Ceiling
                </dt>
                <dd className="text-[14px] font-mono-code font-semibold text-[#991B1B] mt-1 tabular-nums">
                  {activeJurisdiction.maxPenaltyCeiling}
                </dd>
                <dd className="text-[12px] text-[#475569] mt-0.5">
                  {activeJurisdiction.maxPenaltyRevenuePct}
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#75777D]">
                  Extraterritorial Reach
                </dt>
                <dd className="text-[14px] font-semibold text-[#0B192C] mt-1 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#1E2E45]" />
                  {activeJurisdiction.extraterritorialReach
                    ? 'Strict Long-Arm Applicability'
                    : 'Domestic / Procurement Nexus'}
                </dd>
                <dd className="text-[12px] text-[#475569] mt-0.5">
                  Risk Tier: <strong className="text-[#0B192C]">{activeJurisdiction.riskRating}</strong>
                </dd>
              </div>

              <div className="col-span-2 pt-3 border-t border-[#E2E8F0]">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#75777D] flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#991B1B]" />
                  Next Statutory Milestone ({activeJurisdiction.nextMilestoneDate})
                </dt>
                <dd className="text-[13px] font-medium text-[#0B192C] mt-1">
                  {activeJurisdiction.nextMilestoneLabel}
                </dd>
              </div>
            </dl>
          </div>

          {/* Action Bar */}
          <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onToggleSelect(activeJurisdiction.id)}
              className="h-10 px-4 text-xs font-semibold rounded-[4px] bg-white text-[#0B192C] border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-colors whitespace-nowrap"
            >
              {selectedIds.includes(activeJurisdiction.id)
                ? 'Unpin from Matrix'
                : 'Pin to Comparative Matrix'}
            </button>

            <button
              type="button"
              onClick={() => onInspectJurisdiction(activeJurisdiction)}
              className="h-10 px-5 text-xs font-semibold rounded-[4px] bg-[#0B192C] text-white border border-[#0B192C] hover:bg-[#1E2E45] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Inspect Statutory Clauses</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
