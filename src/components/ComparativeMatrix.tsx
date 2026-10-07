import React, { useState } from 'react';
import {
  JurisdictionProfile,
  StatutoryVector,
} from '../data/legalIntelligenceData';
import { StatusBadge } from './StatusBadge';
import {
  ArrowLeftRight,
  FileText,
  Scale,
  Check,
  Copy,
  SlidersHorizontal,
} from 'lucide-react';

interface ComparativeMatrixProps {
  jurisdictions: JurisdictionProfile[];
  selectedIds: string[];
  searchQuery: string;
  activeVectorFilter: string;
  onInspectClause: (
    jurisdiction: JurisdictionProfile,
    vectorKey: keyof JurisdictionProfile['vectors'],
    vectorData: StatutoryVector
  ) => void;
}

const VECTOR_KEYS: {
  key: keyof JurisdictionProfile['vectors'];
  label: string;
  shortCode: string;
}[] = [
  {
    key: 'scopeAndTiering',
    label: 'Risk Tiering & Extraterritorial Scope',
    shortCode: 'VEC-01',
  },
  {
    key: 'foundationModels',
    label: 'GPAI & Frontier Compute Thresholds',
    shortCode: 'VEC-02',
  },
  {
    key: 'transparencyAndWatermarking',
    label: 'Synthetic Media & Provenance Marking',
    shortCode: 'VEC-03',
  },
  {
    key: 'incidentReporting',
    label: 'Serious Incident Notification Window',
    shortCode: 'VEC-04',
  },
  {
    key: 'conformityAndAudit',
    label: 'FRIA & Pre-Deployment Conformity Audit',
    shortCode: 'VEC-05',
  },
  {
    key: 'sovereignDataAndTraining',
    label: 'Training Data Provenance & TDM Opt-Out',
    shortCode: 'VEC-06',
  },
];

export const ComparativeMatrix: React.FC<ComparativeMatrixProps> = ({
  jurisdictions,
  selectedIds,
  searchQuery,
  activeVectorFilter,
  onInspectClause,
}) => {
  const [diffMode, setDiffMode] = useState<boolean>(false);
  const [diffLeftId, setDiffLeftId] = useState<string>('eu');
  const [diffRightId, setDiffRightId] = useState<string>('us-ca');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const visibleJurisdictions = jurisdictions.filter((j) =>
    selectedIds.includes(j.id)
  );

  const visibleVectors = VECTOR_KEYS.filter((v) => {
    if (activeVectorFilter !== 'ALL' && v.key !== activeVectorFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    if (v.label.toLowerCase().includes(q)) return true;
    return visibleJurisdictions.some((j) => {
      const vec = j.vectors[v.key];
      return (
        vec.citation.toLowerCase().includes(q) ||
        vec.summary.toLowerCase().includes(q) ||
        vec.fullClauseText.toLowerCase().includes(q) ||
        j.name.toLowerCase().includes(q)
      );
    });
  });

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const leftJurisdiction =
    jurisdictions.find((j) => j.id === diffLeftId) || jurisdictions[0];
  const rightJurisdiction =
    jurisdictions.find((j) => j.id === diffRightId) || jurisdictions[2];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
      {/* Matrix Subheader & Mode Switcher */}
      <div className="px-6 py-4 bg-[#F1F5F9] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
            <span>Cross-Jurisdictional Statutory Alignment</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {visibleJurisdictions.length} Regimes Active
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {visibleVectors.length} Statutory Vectors
            </span>
          </div>
          <h2 className="font-serif-editorial text-[18px] font-bold text-[#0B192C] mt-0.5">
            Interactive Comparative Regulatory Matrix
          </h2>
        </div>

        {/* Mode Toggle: Full Multi-Jurisdiction Grid vs. Dual-Pane Statutory Diff */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center p-1 bg-[#E2E8F0] rounded-[4px]">
            <button
              type="button"
              onClick={() => setDiffMode(false)}
              className={`h-8 px-3 text-xs font-semibold rounded-[3px] transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                !diffMode
                  ? 'bg-white text-[#0B192C] shadow-xs'
                  : 'text-[#475569] hover:text-[#0B192C]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Multi-Jurisdiction Matrix</span>
            </button>
            <button
              type="button"
              onClick={() => setDiffMode(true)}
              className={`h-8 px-3 text-xs font-semibold rounded-[3px] transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                diffMode
                  ? 'bg-white text-[#0B192C] shadow-xs'
                  : 'text-[#475569] hover:text-[#0B192C]'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Side-by-Side Statutory Diff</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE A: Side-by-Side Dual-Pane Statutory Diff View */}
      {diffMode ? (
        <div>
          {/* Dual Selector Bar */}
          <div className="px-6 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between gap-3 bg-white px-3.5 py-2 rounded-[4px] border border-[#CBD5E1]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#475569]">
                Primary Baseline Regime:
              </span>
              <select
                value={diffLeftId}
                onChange={(e) => setDiffLeftId(e.target.value)}
                className="text-xs font-semibold text-[#0B192C] bg-transparent focus:outline-none cursor-pointer"
              >
                {jurisdictions.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.code} — {j.name} ({j.primaryInstrument})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between gap-3 bg-white px-3.5 py-2 rounded-[4px] border border-[#CBD5E1]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#475569]">
                Comparative Counterpart:
              </span>
              <select
                value={diffRightId}
                onChange={(e) => setDiffRightId(e.target.value)}
                className="text-xs font-semibold text-[#0B192C] bg-transparent focus:outline-none cursor-pointer"
              >
                {jurisdictions.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.code} — {j.name} ({j.primaryInstrument})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Diff Rows */}
          <div className="divide-y divide-[#E2E8F0]">
            {visibleVectors.map((vecMeta) => {
              const leftVec = leftJurisdiction.vectors[vecMeta.key];
              const rightVec = rightJurisdiction.vectors[vecMeta.key];
              return (
                <div key={vecMeta.key} className="p-6 hover:bg-[#F8FAFC] transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-code text-[11px] font-semibold text-[#475569]">
                        {vecMeta.shortCode}
                      </span>
                      <span className="text-[#CBD5E1]">·</span>
                      <h3 className="font-serif-editorial text-[16px] font-bold text-[#0B192C]">
                        {vecMeta.label}
                      </h3>
                    </div>
                    <span className="text-xs text-[#475569]">
                      Statutory Divergence Analysis
                    </span>
                  </div>

                  {/* Dual Pane Diff Cells */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[
                      { jur: leftJurisdiction, vec: leftVec, side: 'left' },
                      { jur: rightJurisdiction, vec: rightVec, side: 'right' },
                    ].map(({ jur, vec, side }) => (
                      <div
                        key={`${jur.id}-${side}`}
                        className="bg-white border border-[#E2E8F0] rounded-[4px] p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E2E8F0]">
                            <div className="flex items-center gap-2">
                              <span className="font-mono-code text-xs font-bold text-[#0B192C]">
                                {jur.code}
                              </span>
                              <span className="text-xs font-semibold text-[#1E2E45]">
                                {jur.name}
                              </span>
                            </div>
                            <StatusBadge status={jur.status} />
                          </div>

                          <div className="mt-3 flex items-center justify-between text-xs text-[#475569]">
                            <span className="font-mono-code font-semibold text-[#0B192C]">
                              {vec.citation}
                            </span>
                            <span className="tabular-nums">
                              Effective: {vec.effectiveDate}
                            </span>
                          </div>

                          <p className="mt-2.5 text-[13px] leading-[20px] text-[#131B2E]">
                            {vec.summary}
                          </p>

                          <blockquote className="mt-3 p-3 bg-[#F8FAFC] border-l-2 border-[#0B192C] text-[12px] leading-[18px] font-mono-code text-[#44474C]">
                            “{vec.fullClauseText}”
                          </blockquote>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                          <span className="text-[11px] text-[#475569]">
                            Obligation: <strong className="text-[#0B192C]">{vec.obligationLevel}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => onInspectClause(jur, vecMeta.key, vec)}
                            className="text-xs font-semibold text-[#1D4ED8] hover:text-[#0B192C] inline-flex items-center gap-1"
                          >
                            <Scale className="w-3.5 h-3.5" />
                            <span>Open Counsel Commentary</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* MODE B: High-Density Multi-Jurisdiction Pinned Matrix */
        <div className="overflow-x-auto">
          {visibleJurisdictions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-serif-editorial text-lg font-bold text-[#0B192C]">
                No Jurisdictions Pinned to Matrix
              </p>
              <p className="text-sm text-[#475569] mt-1">
                Select one or more jurisdictions in the filter bar or map above to generate a side-by-side statutory comparison.
              </p>
            </div>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F1F5F9] border-b border-[#CBD5E1]">
                  {/* Pinned Leftmost Jurisdiction Column Header */}
                  <th className="sticky left-0 z-10 bg-[#F1F5F9] min-w-[250px] max-w-[270px] py-3.5 px-4 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#0B192C] border-r border-[#CBD5E1]">
                    Jurisdiction & Primary Instrument
                  </th>
                  <th className="min-w-[180px] py-3.5 px-4 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#0B192C] border-r border-[#E2E8F0]">
                    Status & Max Penalty
                  </th>
                  {visibleVectors.map((v) => (
                    <th
                      key={v.key}
                      className="min-w-[275px] py-3.5 px-4 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#0B192C] border-r border-[#E2E8F0] last:border-r-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{v.label}</span>
                        <span className="font-mono-code text-[10px] text-[#475569]">
                          {v.shortCode}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {visibleJurisdictions.map((jur) => (
                  <tr
                    key={jur.id}
                    className="group hover:bg-[#F8FAFC] transition-colors align-top"
                  >
                    {/* Leftmost Pinned Jurisdiction Column */}
                    <td className="sticky left-0 z-10 bg-white group-hover:bg-[#F8FAFC] transition-colors py-4 px-4 border-r border-[#E2E8F0]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono-code text-xs font-bold text-[#0B192C]">
                          {jur.code} · {jur.region}
                        </span>
                        <span className="text-[11px] font-medium text-[#475569]">
                          {jur.extraterritorialReach ? 'Extraterritorial' : 'Domestic'}
                        </span>
                      </div>
                      <div className="font-serif-editorial text-[16px] font-bold text-[#0B192C] mt-1">
                        {jur.name}
                      </div>
                      <div className="text-[12px] font-medium text-[#1E2E45] mt-1">
                        {jur.primaryInstrument}
                      </div>
                      <div className="text-[11px] font-mono-code text-[#75777D] mt-0.5">
                        {jur.officialCitation}
                      </div>
                    </td>

                    {/* Status & Penalty Column */}
                    <td className="py-4 px-4 border-r border-[#E2E8F0]">
                      <StatusBadge status={jur.status} />
                      <div className="mt-3">
                        <div className="text-[11px] uppercase tracking-[0.04em] text-[#75777D] font-semibold">
                          Statutory Ceiling
                        </div>
                        <div className="text-[13px] font-mono-code font-bold text-[#991B1B] mt-0.5 tabular-nums">
                          {jur.maxPenaltyCeiling}
                        </div>
                        <div className="text-[12px] text-[#44474C] mt-0.5 leading-snug">
                          {jur.maxPenaltyRevenuePct}
                        </div>
                      </div>
                    </td>

                    {/* Dynamic Vector Cells */}
                    {visibleVectors.map((v) => {
                      const vec = jur.vectors[v.key];
                      const cellId = `${jur.id}-${v.key}`;
                      return (
                        <td
                          key={v.key}
                          className="py-4 px-4 border-r border-[#E2E8F0] last:border-r-0 min-h-[64px]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono-code text-[12px] font-semibold text-[#0B192C]">
                              {vec.citation}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyCitation(
                                  cellId,
                                  `${jur.name} (${jur.officialCitation}) — ${vec.citation}: ${vec.summary}`
                                )
                              }
                              title="Copy Statutory Citation"
                              className="text-[#75777D] hover:text-[#0B192C] p-1 rounded transition-colors"
                            >
                              {copiedKey === cellId ? (
                                <Check className="w-3.5 h-3.5 text-[#0F766E]" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          <p className="text-[13px] leading-[19px] text-[#44474C] mt-1.5">
                            {vec.summary}
                          </p>

                          <div className="mt-3 pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between gap-2 text-[11px]">
                            <span className="text-[#75777D] tabular-nums">
                              {vec.obligationLevel} · {vec.effectiveDate}
                            </span>
                            <button
                              type="button"
                              onClick={() => onInspectClause(jur, v.key, vec)}
                              className="font-semibold text-[#1E2E45] hover:text-[#2563EB] inline-flex items-center gap-1 whitespace-nowrap"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Clause Text</span>
                            </button>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};
