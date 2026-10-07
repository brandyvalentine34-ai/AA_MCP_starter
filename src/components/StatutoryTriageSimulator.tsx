import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, ShieldAlert, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    riskWeight: number;
    triggeredRegimes: string[];
    statutoryTrigger: string;
  }[];
}

const TRIAGE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    title: '01. Model Architecture & Compute Footprint',
    subtitle: 'Select the foundational architecture or fine-tuning profile of the AI system under review.',
    options: [
      {
        label: 'Frontier / General-Purpose AI Model (>= 10^25 FLOPs)',
        description: 'Pre-training or substantial modification of a foundational model exceeding EU systemic risk or US BIS reporting compute thresholds.',
        riskWeight: 40,
        triggeredRegimes: ['EU', 'US-FED', 'US-CA', 'CN'],
        statutoryTrigger: 'EU AI Act Art. 51–55 (Systemic Risk GPAI); 15 CFR § 702.7 (BIS Dual-Use Reporting)',
      },
      {
        label: 'Domain Fine-Tuned or RAG-Augmented Enterprise Model',
        description: 'Adapting a third-party foundation model with proprietary weights, domain corpora, or customer telemetry.',
        riskWeight: 25,
        triggeredRegimes: ['EU', 'US-CA', 'SG'],
        statutoryTrigger: 'EU AI Act Art. 25(1)(c) (Substantial Modification Provider Reclassification); Cal. Civ. Code § 3111 (AB 2013)',
      },
      {
        label: 'Unmodified API Integration / Narrow Analytical Classifier',
        description: 'Calling an upstream provider API without weight modification or deploying traditional statistical ML.',
        riskWeight: 10,
        triggeredRegimes: ['EU', 'US-FED'],
        statutoryTrigger: 'EU AI Act Art. 26 (Deployer Oversight Duties); FTC Section 5 Standard of Care',
      },
    ],
  },
  {
    id: 'q2',
    title: '02. Operational Deployment Domain',
    subtitle: 'Identify the primary commercial or institutional decision-making context.',
    options: [
      {
        label: 'Creditworthiness, Insurance Pricing, Employment or Public Services',
        description: 'Automated screening, candidate ranking, credit scoring, health/life risk underwriting, or critical infrastructure.',
        riskWeight: 40,
        triggeredRegimes: ['EU', 'US-FED', 'US-CA', 'UK'],
        statutoryTrigger: 'EU AI Act Art. 6(2) & Annex III High-Risk + Art. 27 Mandatory FRIA; CFPB Circular 2023-03 (ECOA)',
      },
      {
        label: 'Public-Facing Synthetic Media, Voice Agents or Customer Copilots',
        description: 'Generating text, audio, image, or video content accessible to end consumers across jurisdictions.',
        riskWeight: 25,
        triggeredRegimes: ['EU', 'US-CA', 'CN', 'SG'],
        statutoryTrigger: 'EU AI Act Art. 50(2) Watermarking; Cal. SB 942 Latent Disclosure; China CAC Order No. 15 Double-Filing',
      },
      {
        label: 'Internal Enterprise Productivity & Code/Document Synthesis',
        description: 'Strictly internal employee-facing knowledge retrieval, drafting, or software engineering assistance.',
        riskWeight: 5,
        triggeredRegimes: ['SG', 'UK'],
        statutoryTrigger: 'Singapore PDPA Business Improvement Safe Harbor; Standard Enterprise Data Governance',
      },
    ],
  },
  {
    id: 'q3',
    title: '03. Geographic Output & Data Provenance Nexus',
    subtitle: 'Where are system outputs utilized and how was the training/RAG dataset sourced?',
    options: [
      {
        label: 'Global Deployment Including EU Residents, California Consumers & Mainland China',
        description: 'System outputs inform decisions inside the EU, California, and PRC; training data includes scraped web corpora.',
        riskWeight: 20,
        triggeredRegimes: ['EU', 'US-CA', 'CN', 'UK', 'SG'],
        statutoryTrigger: 'EU AI Act Art. 2(1)(c) Extraterritorial Output Rule & Art. 53(1)(c) TDM Opt-Out; China TC260-003 Corpus Audit',
      },
      {
        label: 'Transatlantic (US, UK & EU) Commercial Deployment Only',
        description: 'No mainland China public endpoint; training/fine-tuning restricted to licensed enterprise data and audited repositories.',
        riskWeight: 10,
        triggeredRegimes: ['EU', 'US-FED', 'US-CA', 'UK'],
        statutoryTrigger: 'Cal. AB 2013 12-Point Public Dataset Summary; UK GDPR Art. 35 DPIA',
      },
    ],
  },
];

interface StatutoryTriageSimulatorProps {
  onApplyRecommendedJurisdictions: (codes: string[]) => void;
}

export const StatutoryTriageSimulator: React.FC<StatutoryTriageSimulatorProps> = ({
  onApplyRecommendedJurisdictions,
}) => {
  const [selections, setSelections] = useState<Record<string, number>>({
    q1: 1,
    q2: 0,
    q3: 0,
  });

  const handleSelect = (qId: string, optionIdx: number) => {
    setSelections((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const chosenOptions = TRIAGE_QUESTIONS.map(
    (q) => q.options[selections[q.id] ?? 0]
  );

  const totalScore = chosenOptions.reduce((acc, opt) => acc + opt.riskWeight, 0);
  const uniqueRegimes = Array.from(
    new Set(chosenOptions.flatMap((opt) => opt.triggeredRegimes))
  );

  const tierClassification =
    totalScore >= 60
      ? {
          tier: 'HIGH-RISK / ANNEX III & EXTRATERRITORIAL STATUTORY OBLIGATIONS',
          badgeColor: 'bg-[#FEF2F2] text-[#991B1B] border-[#FCA5A5]',
          counselDetermination:
            'System triggers mandatory pre-deployment Fundamental Rights Impact Assessments (EU Art. 27), public training dataset summaries (Cal. AB 2013), and potential Provider reclassification under EU AI Act Art. 25(1)(c).',
        }
      : totalScore >= 35
      ? {
          tier: 'TRANSPARENCY-MANDATED & SECTORAL SUPERVISORY TIER',
          badgeColor: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#93C5FD]',
          counselDetermination:
            'System requires machine-readable C2PA provenance watermarking (EU Art. 50 / Cal. SB 942), explicit synthetic disclosure, and contractual Annex XII upstream model documentation.',
        }
      : {
          tier: 'BASELINE GOVERNANCE & INTERNAL SAFE HARBOR TIER',
          badgeColor: 'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]',
          counselDetermination:
            'Qualifies for streamlined internal deployment under Singapore PDPA Business Improvement exceptions and EU minimal-risk voluntary codes, subject to standard DPIA logging.',
        };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-[#F1F5F9] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
            <span>Interactive Statutory Applicability Assessment</span>
            <span aria-hidden="true">·</span>
            <span>Article 6 / Article 25 / AB 2013 Diagnostic</span>
          </div>
          <h2 className="font-serif-editorial text-[18px] font-bold text-[#0B192C] mt-0.5">
            AI System Risk Tiering & Extraterritorial Obligations Simulator
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setSelections({ q1: 1, q2: 0, q3: 0 })}
          className="h-8 px-3 text-xs font-semibold rounded-[4px] bg-white text-[#0B192C] border border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Parameters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
        {/* Left: 3-Step Questionnaire (7 cols) */}
        <div className="lg:col-span-7 p-6 space-y-6">
          {TRIAGE_QUESTIONS.map((q) => {
            const activeIdx = selections[q.id] ?? 0;
            return (
              <div key={q.id} className="pb-6 border-b border-[#E2E8F0] last:border-b-0 last:pb-0">
                <h3 className="font-serif-editorial text-[16px] font-bold text-[#0B192C]">
                  {q.title}
                </h3>
                <p className="text-xs text-[#475569] mt-0.5">{q.subtitle}</p>

                <div className="mt-3 space-y-2.5">
                  {q.options.map((opt, idx) => {
                    const isSelected = activeIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelect(q.id, idx)}
                        className={`w-full text-left p-3.5 rounded-[4px] border transition-colors ${
                          isSelected
                            ? 'bg-[#F1F5F9] border-[#0B192C]'
                            : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[13px] font-semibold text-[#0B192C]">
                            {opt.label}
                          </span>
                          <span className="font-mono-code text-[11px] font-semibold text-[#1E2E45]">
                            {opt.triggeredRegimes.join(' · ')}
                          </span>
                        </div>
                        <p className="text-[12px] leading-[18px] text-[#44474C] mt-1">
                          {opt.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Real-Time Statutory Opinion & Triggered Obligations (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-[#F8FAFC] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono-code font-semibold uppercase tracking-[0.05em] text-[#475569]">
                PRELIMINARY STATUTORY DETERMINATION
              </span>
              <span className="font-mono-code text-xs font-bold text-[#0B192C] tabular-nums">
                INDEX: {totalScore}/100
              </span>
            </div>

            <div
              className={`mt-3 p-3 rounded-[4px] border text-xs font-bold uppercase tracking-[0.04em] flex items-center gap-2 ${tierClassification.badgeColor}`}
            >
              {totalScore >= 60 ? (
                <ShieldAlert className="w-4 h-4 shrink-0" />
              ) : totalScore >= 35 ? (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              <span>{tierClassification.tier}</span>
            </div>

            <p className="mt-4 text-[14px] leading-[22px] text-[#131B2E]">
              {tierClassification.counselDetermination}
            </p>

            {/* Triggered Statutory Citations */}
            <div className="mt-6 pt-4 border-t border-[#CBD5E1]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#0B192C] mb-3 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#1E2E45]" />
                <span>Triggered Statutory Provisions & Citations</span>
              </div>
              <div className="space-y-2.5">
                {chosenOptions.map((opt, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white border border-[#E2E8F0] rounded-[4px]"
                  >
                    <div className="text-[11px] font-mono-code font-bold text-[#1E2E45]">
                      {opt.statutoryTrigger}
                    </div>
                    <div className="text-[12px] text-[#475569] mt-1">
                      Triggered by: {opt.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jurisdictions Implicated */}
            <div className="mt-5 pt-4 border-t border-[#CBD5E1]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#475569]">
                Jurisdictions with Direct Statutory Nexus ({uniqueRegimes.length})
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono-code text-xs font-bold text-[#0B192C]">
                {uniqueRegimes.map((code, idx) => (
                  <React.Fragment key={code}>
                    <span>{code}</span>
                    {idx < uniqueRegimes.length - 1 && (
                      <span className="text-[#94A3B8]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#CBD5E1]">
            <button
              type="button"
              onClick={() => onApplyRecommendedJurisdictions(uniqueRegimes)}
              className="w-full h-10 px-4 text-xs font-semibold rounded-[4px] bg-[#0B192C] text-white hover:bg-[#1E2E45] transition-colors flex items-center justify-center gap-2"
            >
              <span>Filter Comparative Matrix to Triggered Regimes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
