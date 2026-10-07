import React, { useState } from 'react';
import { EnforcementEvent } from '../data/legalIntelligenceData';
import { StatusBadge } from './StatusBadge';
import { Calendar, CheckSquare, Square, Building2, ShieldAlert } from 'lucide-react';

interface EnforcementChronologyProps {
  events: EnforcementEvent[];
  selectedJurisdictionCodes: string[];
}

export const EnforcementChronology: React.FC<EnforcementChronologyProps> = ({
  events,
  selectedJurisdictionCodes,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'evt-1-0': true,
    'evt-1-1': true,
  });
  const [eventFilter, setEventFilter] = useState<string>('ALL');

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredEvents = events.filter((evt) => {
    const matchesJur =
      selectedJurisdictionCodes.length === 0 ||
      selectedJurisdictionCodes.includes(evt.jurisdictionCode);
    const matchesType =
      eventFilter === 'ALL' || evt.eventType === eventFilter;
    return matchesJur && matchesType;
  });

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-[#F1F5F9] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
            <span>Statutory Phase-In & Supervisory Sweeps</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{filteredEvents.length} Active Milestones</span>
          </div>
          <h2 className="font-serif-editorial text-[18px] font-bold text-[#0B192C] mt-0.5">
            Cross-Border Enforcement Chronology & Readiness Checklist (2026–2027)
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#E2E8F0] rounded-[4px]">
          {[
            'ALL',
            'Statutory Deadline',
            'Supervisory Audit',
            'Rulemaking Finalization',
          ].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setEventFilter(type)}
              className={`h-7 px-2.5 text-xs font-semibold rounded-[3px] transition-colors whitespace-nowrap ${
                eventFilter === type
                  ? 'bg-white text-[#0B192C] shadow-xs'
                  : 'text-[#475569] hover:text-[#0B192C]'
              }`}
            >
              {type === 'ALL' ? 'All Milestones' : type}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-[#E2E8F0]">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-6 hover:bg-[#F8FAFC] transition-colors grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2E8F0] pb-4 lg:pb-0 lg:pr-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-[#0B192C] tabular-nums">
                  <Calendar className="w-3.5 h-3.5 text-[#991B1B]" />
                  <span>{evt.date}</span>
                  <span className="text-[#75777D]">({evt.quarter})</span>
                </div>

                <div className="mt-2.5">
                  <StatusBadge status={evt.status} />
                </div>

                <div className="mt-3 text-xs font-semibold text-[#0B192C]">
                  {evt.jurisdictionName} ({evt.jurisdictionCode})
                </div>
                <div className="mt-1 text-xs text-[#475569] flex items-start gap-1.5">
                  <Building2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#475569]" />
                  <span>{evt.authority}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono-code text-[#475569]">
                Instrument: {evt.instrument}
              </div>
            </div>

            <div className="lg:col-span-9">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.04em] text-[#1E2E45]">
                  {evt.eventType}
                </span>
                <span className="text-xs text-[#475569] flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Scope: {evt.impactedEntities}</span>
                </span>
              </div>

              <h3 className="font-serif-editorial text-[18px] leading-[24px] font-bold text-[#0B192C] mt-1.5">
                {evt.title}
              </h3>

              <p className="text-[14px] leading-[22px] text-[#44474C] mt-2">
                {evt.description}
              </p>

              <div className="mt-4 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[4px] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#0B192C] mb-2.5">
                  General Counsel Operational Readiness Action Items
                </div>
                <div className="space-y-2">
                  {evt.complianceChecklist.map((item, idx) => {
                    const checkKey = `${evt.id}-${idx}`;
                    const isDone = !!checkedItems[checkKey];
                    return (
                      <button
                        key={checkKey}
                        type="button"
                        onClick={() => toggleCheck(checkKey)}
                        className="w-full text-left flex items-start gap-2.5 text-[13px] leading-[18px] group"
                      >
                        {isDone ? (
                          <CheckSquare className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-[#75777D] group-hover:text-[#0B192C] shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            isDone
                              ? 'line-through text-[#75777D]'
                              : 'text-[#131B2E] group-hover:text-[#0B192C]'
                          }
                        >
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
