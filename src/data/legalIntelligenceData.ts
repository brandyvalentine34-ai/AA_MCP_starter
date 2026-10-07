export type RegulatoryStatus =
  | 'ENACTED'
  | 'PROPOSED'
  | 'CONSULTATION'
  | 'FRAMEWORK';

export interface StatutoryVector {
  category: string;
  citation: string;
  summary: string;
  obligationLevel: 'Mandatory' | 'Conditional' | 'Voluntary' | 'Prohibited';
  effectiveDate: string;
  fullClauseText: string;
  counselCommentary: string;
}

export interface JurisdictionProfile {
  id: string;
  code: string;
  name: string;
  region: 'EMEA' | 'Americas' | 'APAC';
  primaryInstrument: string;
  officialCitation: string;
  status: RegulatoryStatus;
  riskRating: 'Critical' | 'High' | 'Moderate' | 'Advisory';
  supervisoryAuthority: string;
  maxPenaltyCeiling: string;
  maxPenaltyRevenuePct: string;
  extraterritorialReach: boolean;
  nextMilestoneDate: string;
  nextMilestoneLabel: string;
  executiveSummary: string;
  mapCoordinates: { x: number; y: number };
  vectors: {
    scopeAndTiering: StatutoryVector;
    foundationModels: StatutoryVector;
    transparencyAndWatermarking: StatutoryVector;
    incidentReporting: StatutoryVector;
    conformityAndAudit: StatutoryVector;
    sovereignDataAndTraining: StatutoryVector;
  };
}

export interface LegalBriefing {
  id: string;
  date: string;
  jurisdictionCode: string;
  jurisdictionName: string;
  topic: string;
  status: RegulatoryStatus;
  title: string;
  summary: string;
  docketOrCitation: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    office: string;
    initials: string;
  };
  keyTakeaways: string[];
  sections: {
    heading: string;
    content: string;
    statutoryQuote?: {
      citation: string;
      text: string;
    };
  }[];
}

export interface EnforcementEvent {
  id: string;
  date: string;
  quarter: string;
  jurisdictionCode: string;
  jurisdictionName: string;
  authority: string;
  instrument: string;
  eventType: 'Statutory Deadline' | 'Enforcement Action' | 'Rulemaking Finalization' | 'Supervisory Audit';
  status: RegulatoryStatus;
  title: string;
  impactedEntities: string;
  description: string;
  complianceChecklist: string[];
}

export const STATUS_CONFIG: Record<
  RegulatoryStatus,
  {
    label: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    dotColor: string;
  }
> = {
  ENACTED: {
    label: 'ENACTED / IN EFFECT',
    textColor: 'text-[#991B1B]',
    bgColor: 'bg-[#FEF2F2]',
    borderColor: 'border-[#FCA5A5]',
    dotColor: 'bg-[#991B1B]',
  },
  PROPOSED: {
    label: 'PROPOSED / PENDING',
    textColor: 'text-[#1D4ED8]',
    bgColor: 'bg-[#EFF6FF]',
    borderColor: 'border-[#93C5FD]',
    dotColor: 'bg-[#1D4ED8]',
  },
  CONSULTATION: {
    label: 'CONSULTATION PHASE',
    textColor: 'text-[#B45309]',
    bgColor: 'bg-[#FFFBEB]',
    borderColor: 'border-[#FDE68A]',
    dotColor: 'bg-[#D97706]',
  },
  FRAMEWORK: {
    label: 'RISK-BASED FRAMEWORK',
    textColor: 'text-[#0F766E]',
    bgColor: 'bg-[#F0FDFA]',
    borderColor: 'border-[#99F6E4]',
    dotColor: 'bg-[#0F766E]',
  },
};

export const JURISDICTIONS: JurisdictionProfile[] = [
  {
    id: 'eu',
    code: 'EU',
    name: 'European Union',
    region: 'EMEA',
    primaryInstrument: 'Artificial Intelligence Act',
    officialCitation: 'Regulation (EU) 2024/1689',
    status: 'ENACTED',
    riskRating: 'Critical',
    supervisoryAuthority: 'European AI Office & National Market Surveillance Authorities',
    maxPenaltyCeiling: '€35,000,000',
    maxPenaltyRevenuePct: '7.0% Global Annual Turnover',
    extraterritorialReach: true,
    nextMilestoneDate: '2026-08-02',
    nextMilestoneLabel: 'Full Applicability of High-Risk AI System Obligations (Annex III)',
    executiveSummary:
      'Comprehensive horizontal product-safety and fundamental-rights regulation establishing a four-tier risk classification regime, strict conformity assessments for high-risk deployments, and systemic risk obligations for General-Purpose AI (GPAI) models exceeding 10^25 FLOPs.',
    mapCoordinates: { x: 495, y: 155 },
    vectors: {
      scopeAndTiering: {
        category: 'Risk Classification & Extraterritorial Scope',
        citation: 'Art. 2(1), Art. 5 & Art. 6; Annex III',
        summary: 'Applies to providers and deployers globally if output is used within the Union. Prohibits 8 unacceptable practices; mandates strict controls for Annex III high-risk domains.',
        obligationLevel: 'Mandatory',
        effectiveDate: '02 Feb 2025 (Prohibitions) / 02 Aug 2026 (High-Risk)',
        fullClauseText:
          'Article 2(1)(c): This Regulation applies to providers and deployers of AI systems that have their place of establishment or Are located in a third country, where the output produced by the AI system is used in the Union.',
        counselCommentary:
          'Cross-border enterprise SaaS platforms cannot rely on server localization outside the EU to avoid compliance if any synthesized analysis, scoring, or output informs decisions inside an EU Member State.',
      },
      foundationModels: {
        category: 'GPAI & Systemic Risk Thresholds',
        citation: 'Art. 51–55; Annex XI & XII',
        summary: 'Mandatory technical documentation and copyright policy for all GPAI models; adversarial red-teaming and cybersecurity mandates for models >= 10^25 FLOPs.',
        obligationLevel: 'Mandatory',
        effectiveDate: '02 Aug 2025',
        fullClauseText:
          'Article 51(2): A general-purpose AI model shall be presumed to have high impact capabilities pursuant to paragraph 1, point (a), when the cumulative amount of compute used for its training measured in floating point operations is greater than 10^25.',
        counselCommentary:
          'Downstream enterprise fine-tuners modify GPAI obligations only to the extent of the fine-tuning layer, provided the base provider has fulfilled Annex XI documentation transfers.',
      },
      transparencyAndWatermarking: {
        category: 'Synthetic Content & Deepfake Disclosure',
        citation: 'Art. 50(1)–(4)',
        summary: 'Machine-readable provenance marking for synthetic audio, image, video, and text; explicit human-facing disclosure for emotion recognition and biometric categorization.',
        obligationLevel: 'Mandatory',
        effectiveDate: '02 Aug 2026',
        fullClauseText:
          'Article 50(2): Providers of AI systems, including general-purpose AI systems, generating synthetic audio, image, video or text content, shall ensure that the outputs of the AI system are marked in a machine-readable format and detectable as artificially generated or manipulated.',
        counselCommentary:
          'Interoperable C2PA metadata standards are emerging as the de facto technical compliance vehicle under the European AI Office Code of Practice.',
      },
      incidentReporting: {
        category: 'Serious Incident Notification Window',
        citation: 'Art. 73(1)–(4)',
        summary: 'Strict tiered reporting to Market Surveillance Authorities: 15 days default, 10 days for widespread infringement or death, 2 days for systemic critical infrastructure disruption.',
        obligationLevel: 'Mandatory',
        effectiveDate: '02 Aug 2026',
        fullClauseText:
          'Article 73(2): The notification shall be made immediately after the provider has established a causal link between the AI system and the serious incident or the reasonable likelihood of such a link, and, in any event, not later than 15 days after the provider or, where applicable, the deployer, becomes aware of the serious incident.',
        counselCommentary:
          'Requires synchronization with GDPR Art. 33 (72-hour breach reporting) and NIS2 (24-hour early warning) within unified enterprise incident response playbooks.',
      },
      conformityAndAudit: {
        category: 'Fundamental Rights & Conformity Audit',
        citation: 'Art. 27 & Art. 43',
        summary: 'Mandatory Fundamental Rights Impact Assessment (FRIA) prior to deployment for public bodies and credit/insurance evaluators; CE marking and EU database registration.',
        obligationLevel: 'Mandatory',
        effectiveDate: '02 Aug 2026',
        fullClauseText:
          'Article 27(1): Prior to deploying a high-risk AI system referred to in Article 6(2), with the exception of high-risk AI systems intended to be used in the area listed in point 2 of Annex III, deployers that are bodies governed by public law, or are private entities providing public services... shall perform an assessment of the impact on fundamental rights.',
        counselCommentary:
          'Financial institutions deploying automated creditworthiness or fraud-triage models must complete FRIA documentation prior to production cutover.',
      },
      sovereignDataAndTraining: {
        category: 'Training Data Provenance & Copyright Opt-Out',
        citation: 'Art. 53(1)(c)–(d)',
        summary: 'Mandatory compliance with Directive (EU) 2019/790 Art. 4(3) Text and Data Mining (TDM) reservation of rights and publication of a sufficiently detailed training data summary.',
        obligationLevel: 'Mandatory',
        effectiveDate: '02 Aug 2025',
        fullClauseText:
          'Article 53(1)(c): Providers of general-purpose AI models shall put in place a policy to comply with Union law on copyright and related rights, and in particular to identify and comply with, including through state-of-the-art technologies, a reservation of rights expressed pursuant to Article 4(3) of Directive (EU) 2019/790.',
        counselCommentary:
          'Applies extraterritorially even if model pre-training occurred entirely on US or APAC compute clusters before weight importation into the EU.',
      },
    },
  },
  {
    id: 'us-fed',
    code: 'US-FED',
    name: 'United States (Federal & OMB)',
    region: 'Americas',
    primaryInstrument: 'OMB M-24-10 / NIST AI RMF / FTC Section 5',
    officialCitation: '15 U.S.C. § 45; OMB Memo M-24-10; NIST AI 600-1',
    status: 'FRAMEWORK',
    riskRating: 'High',
    supervisoryAuthority: 'FTC, DOJ Civil Rights Division, CFPB, SEC & Federal Procurement Agencies',
    maxPenaltyCeiling: '$51,744 per violation',
    maxPenaltyRevenuePct: 'Algorithmic Disgorgement & Model Deletion',
    extraterritorialReach: false,
    nextMilestoneDate: '2026-12-01',
    nextMilestoneLabel: 'Federal Procurement Contractor AI Safeguard Certification Renewal',
    executiveSummary:
      'Decentralized enforcement-first architecture combining FTC unfair/deceptive trade practices actions (including mandatory algorithmic disgorgement), binding federal procurement prerequisites under OMB directives, and NIST Generative AI Risk Management profiles.',
    mapCoordinates: { x: 230, y: 185 },
    vectors: {
      scopeAndTiering: {
        category: 'Risk Classification & Extraterritorial Scope',
        citation: 'OMB M-24-10 § 5(a); 15 U.S.C. § 45',
        summary: 'Classifies "Safety-Impacting" and "Rights-Impacting" AI for federal agencies and contractors; FTC enforces broad consumer protection and civil rights statutes across all commercial sectors.',
        obligationLevel: 'Conditional',
        effectiveDate: 'In Effect (Continuous Enforcement)',
        fullClauseText:
          'OMB M-24-10 Section 5(a): By December 1, 2024, agencies must implement minimum practices for AI that is safety-impacting or rights-impacting, or cease use of the AI system until compliant.',
        counselCommentary:
          'While NIST AI RMF is nominally voluntary, FTC and CFPB consent decrees routinely incorporate NIST standards as the baseline standard of reasonable care.',
      },
      foundationModels: {
        category: 'GPAI & Systemic Risk Thresholds',
        citation: 'BIS Reporting Rule (15 CFR Part 702); NIST AI 600-1',
        summary: 'Department of Commerce Bureau of Industry and Security (BIS) survey reporting for dual-use foundation models (>10^26 integer/floating-point operations) and large computing clusters.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect (Quarterly BIS Filings)',
        fullClauseText:
          '15 CFR § 702.7: Industrial base survey reporting requirements apply to U.S. persons developing or intending to develop dual-use foundation models exceeding technical compute thresholds.',
        counselCommentary:
          'Hyperscalers and frontier labs face strict national security disclosure obligations regarding weights security, red-team telemetry, and foreign IaaS customers.',
      },
      transparencyAndWatermarking: {
        category: 'Synthetic Content & Deepfake Disclosure',
        citation: 'FTC Impersonation Rule (16 CFR Part 461); NIST AI 100-4',
        summary: 'Strict liability for commercial AI impersonation of government or business entities; FTC treats undisclosed synthetic endorsements or deceptive AI avatars as per se Section 5 violations.',
        obligationLevel: 'Mandatory',
        effectiveDate: '01 Apr 2024',
        fullClauseText:
          '16 CFR § 461.2: It is an unfair or deceptive act or practice to materially and falsely pose as, directly or by implication, a government entity or officer thereof, or a business or officer thereof, in or affecting commerce.',
        counselCommentary:
          'Enterprise marketing and customer-service voice agents must include unambiguous initial synthetic disclosures to mitigate FTC unfairness claims.',
      },
      incidentReporting: {
        category: 'Serious Incident Notification Window',
        citation: 'CIRCIA (6 U.S.C. § 681b) & SEC Item 1.05 Form 8-K',
        summary: 'Public registrants must disclose material cybersecurity/AI model compromise incidents within 4 business days on Form 8-K; critical infrastructure entities report within 72 hours.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect (SEC Form 8-K)',
        fullClauseText:
          'SEC Release No. 33-11216 (Item 1.05): If the registrant experiences a cybersecurity incident that is determined by the registrant to be material, describe the material aspects of the nature, scope, and timing of the incident within four business days.',
        counselCommentary:
          'Adversarial prompt injection or training-data poisoning that compromises material proprietary weights or customer records triggers Form 8-K materiality triage.',
      },
      conformityAndAudit: {
        category: 'Fundamental Rights & Conformity Audit',
        citation: 'CFPB Circular 2023-03; EEOC Title VII Guidance',
        summary: 'Adverse action notices under ECOA cannot cite "complex black-box AI algorithms"; employers remain strictly liable for disparate impact in automated hiring tools (80% four-fifths rule).',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'CFPB Circular 2023-03: Creditors must provide accurate and specific reasons for adverse actions even when utilizing complex artificial intelligence or machine learning models.',
        counselCommentary:
          'Explainability post-hoc approximations (SHAP/LIME) must be empirically validated before relying on them for statutory ECOA adverse action disclosures.',
      },
      sovereignDataAndTraining: {
        category: 'Training Data Provenance & Copyright Opt-Out',
        citation: '17 U.S.C. § 107 (Fair Use Litigation); FTC Model Disgorgement',
        summary: 'Active federal district court litigation over transformative fair use; FTC enforces complete destruction of models and weights trained on unlawfully collected personal or biometric data.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'FTC Consent Order Standard Remedy: Respondent shall delete or destroy all Affected Work Product, including any algorithms, models, or weight parameters developed in whole or in part using Unlawfully Collected Data.',
        counselCommentary:
          'Algorithmic disgorgement represents an existential operational risk—tainted training datasets can legally compel the destruction of an entire production model.',
      },
    },
  },
  {
    id: 'us-ca',
    code: 'US-CA',
    name: 'California (State Regime)',
    region: 'Americas',
    primaryInstrument: 'CA AI Transparency Act & Training Data Disclosure',
    officialCitation: 'Cal. Civ. Code § 3110 (AB 2013) & Cal. Bus. & Prof. Code § 22757 (SB 942)',
    status: 'ENACTED',
    riskRating: 'Critical',
    supervisoryAuthority: 'California Attorney General & California Privacy Protection Agency (CPPA)',
    maxPenaltyCeiling: '$5,000 per day / $7,500 intentional violation',
    maxPenaltyRevenuePct: 'Statutory Per-Consumer Daily Civil Penalties',
    extraterritorialReach: true,
    nextMilestoneDate: '2026-01-01',
    nextMilestoneLabel: 'Mandatory Public Training Dataset Documentation (AB 2013) & Watermarking',
    executiveSummary:
      'The most stringent sub-national statutory AI regime in North America, imposing mandatory public documentation of high-level training dataset summaries (AB 2013), latent provenance watermarking (SB 942), and CPPA Automated Decision-Making Technology (ADMT) opt-out rights.',
    mapCoordinates: { x: 165, y: 195 },
    vectors: {
      scopeAndTiering: {
        category: 'Risk Classification & Extraterritorial Scope',
        citation: 'Cal. Civ. Code § 3111; CCPA ADMT Regs § 7200',
        summary: 'Applies to any developer of a generative AI system made publicly available to Californians, and businesses using ADMT for significant employment, credit, housing, or healthcare decisions.',
        obligationLevel: 'Mandatory',
        effectiveDate: '01 Jan 2026',
        fullClauseText:
          'Cal. Civ. Code § 3111(a): On or before January 1, 2026, and before each time thereafter that a generative artificial intelligence system or service, or a substantial modification to a generative artificial intelligence system or service, is made publicly available to Californians, the developer shall post documentation on the developer’s internet website.',
        counselCommentary:
          'Unlike the EU AI Act, AB 2013 contains no compute floor—small domain-specific generative models made available to California residents are equally covered.',
      },
      foundationModels: {
        category: 'GPAI & Systemic Risk Thresholds',
        citation: 'Cal. Frontier AI Framework & SB 942 (§ 22757.1)',
        summary: 'Covered providers with >1,000,000 monthly visitors or users must provide a free, publicly accessible AI detection tool and embed latent disclosures in synthetic outputs.',
        obligationLevel: 'Mandatory',
        effectiveDate: '01 Jan 2026',
        fullClauseText:
          'Cal. Bus. & Prof. Code § 22757.2(a): A covered provider shall make available an artificial intelligence detection tool at no cost to the user that allows a user to assess whether image, video, or audio content was created or altered by the covered provider’s GenAI system.',
        counselCommentary:
          'Covered providers licensing foundation models to third parties must contractually mandate preservation of latent watermarking capabilities.',
      },
      transparencyAndWatermarking: {
        category: 'Synthetic Content & Deepfake Disclosure',
        citation: 'Cal. Bus. & Prof. Code § 22757.3; AB 1836 & AB 2602',
        summary: 'Mandatory latent metadata (provider name, system version, timestamp, unique identifier) durable against compression; strict prohibition on unauthorized digital replicas of deceased or living performers.',
        obligationLevel: 'Mandatory',
        effectiveDate: '01 Jan 2026',
        fullClauseText:
          'Cal. Bus. & Prof. Code § 22757.3(a): A covered provider shall include latent disclosures in AI-generated image, video, or audio content created by a generative AI system that is permanent or extraordinarily difficult to remove.',
        counselCommentary:
          'Failure to revoke a third-party licensee’s access within 96 hours of discovering removal of latent watermarking capabilities exposes the model provider to direct statutory liability.',
      },
      incidentReporting: {
        category: 'Serious Incident Notification Window',
        citation: 'Cal. Civ. Code § 1798.82 & CPPA Enforcement Rules',
        summary: 'Expedited notification to the California Attorney General if personal data or biometric training vectors affecting >500 California residents are exfiltrated or exposed via model inversion.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'Cal. Civ. Code § 1798.82(a): A person or business that conducts business in California, and that owns or licenses computerized data that includes personal information, shall disclose a breach of the security of the system following discovery or notification of the breach in the security of the data in the most expedient time possible.',
        counselCommentary:
          'Private right of action under CCPA (§ 1798.150) provides statutory damages of $100–$750 per consumer per incident without proof of actual pecuniary harm.',
      },
      conformityAndAudit: {
        category: 'Fundamental Rights & Conformity Audit',
        citation: 'CPPA Risk Assessment & ADMT Regulations (§ 7150–7221)',
        summary: 'Mandatory pre-use Risk Assessments submitted to the CPPA before training AI models on personal information or deploying ADMT for profiling or significant consumer decisions.',
        obligationLevel: 'Mandatory',
        effectiveDate: '2026 Phased Enforcement',
        fullClauseText:
          'CPPA Regs § 7150(b): Every business whose processing of consumers’ personal information presents significant risk to consumers’ privacy shall conduct a risk assessment before initiating that processing, including processing to train artificial intelligence or automated decisionmaking technology.',
        counselCommentary:
          'Requires executive attestation signed by a designated senior officer certifying that the privacy risks do not outweigh the operational benefits.',
      },
      sovereignDataAndTraining: {
        category: 'Training Data Provenance & Copyright Opt-Out',
        citation: 'Cal. Civ. Code § 3111(a)(1)–(12) (AB 2013)',
        summary: 'Requires public disclosure of 12 granular dataset attributes: sources/owners, data point volume, IP/copyright licensing status, presence of PII/biometrics, synthetic data ratios, and cleaning dates.',
        obligationLevel: 'Mandatory',
        effectiveDate: '01 Jan 2026',
        fullClauseText:
          'Cal. Civ. Code § 3111(a): The documentation shall include a high-level summary of the datasets used in the development of the generative artificial intelligence system, including whether the datasets include any data protected by copyright, trademark, or patent, or whether the datasets are entirely in the public domain.',
        counselCommentary:
          'Applies retroactively to substantial modifications released on or after Jan 1, 2026. General Counsel must audit trade-secret boundaries against AB 2013’s 12 mandatory disclosure fields.',
      },
    },
  },
  {
    id: 'uk',
    code: 'UK',
    name: 'United Kingdom',
    region: 'EMEA',
    primaryInstrument: 'Pro-Innovation Sectoral Framework & AI Safety Institute Bill',
    officialCitation: 'DSIT Command Paper CP 928; UK GDPR Art. 22; Online Safety Act 2023',
    status: 'PROPOSED',
    riskRating: 'Moderate',
    supervisoryAuthority: 'ICO, FCA, CMA, Ofcom & UK AI Safety Institute (AISI)',
    maxPenaltyCeiling: '£17,500,000',
    maxPenaltyRevenuePct: '4.0% Global Annual Turnover (ICO) / 10.0% (Ofcom/CMA)',
    extraterritorialReach: true,
    nextMilestoneDate: '2026-11-15',
    nextMilestoneLabel: 'Statutory Frontier AI Bill Parliamentary Second Reading & CMA Foundation Review',
    executiveSummary:
      'Context-specific regulatory model empowering existing sectoral regulators (ICO, FCA, CMA, Ofcom) under five cross-sectoral principles, supplemented by forthcoming targeted statutory binding obligations strictly on frontier model developers.',
    mapCoordinates: { x: 472, y: 140 },
    vectors: {
      scopeAndTiering: {
        category: 'Risk Classification & Extraterritorial Scope',
        citation: 'DSIT Cross-Sectoral Principles; FCA AI Update',
        summary: 'Rejects fixed statutory product lists in favor of use-case proportionality assessed by sector regulators (e.g., FCA Senior Managers and Certification Regime accountability).',
        obligationLevel: 'Conditional',
        effectiveDate: 'In Effect (Sectoral) / 2026 (Frontier Statute)',
        fullClauseText:
          'DSIT Regulatory Principles: Regulators are directed to apply five core principles—Safety, Security & Robustness; Appropriate Transparency & Explainability; Fairness; Accountability & Governance; Contestability & Redress—within existing statutory remits.',
        counselCommentary:
          'UK financial services firms face immediate personal accountability under the FCA Senior Managers Regime (SM&CR) for AI governance failures without waiting for a new AI statute.',
      },
      foundationModels: {
        category: 'GPAI & Systemic Risk Thresholds',
        citation: 'AISI Frontier Model Testing & CMA Foundation Model Principles',
        summary: 'Pre-deployment safety evaluation agreements with the UK AI Safety Institute (AISI) transitioning into statutory mandatory pre-release testing for frontier compute tiers.',
        obligationLevel: 'Prohibited',
        effectiveDate: 'Q4 2026 (Statutory Transition)',
        fullClauseText:
          'King’s Speech Legislative Briefing: The Government will seek to establish the most appropriate legislation to place requirements on those working to develop the most powerful artificial intelligence models.',
        counselCommentary:
          'Competition and Markets Authority (CMA) closely scrutinizes vertical partnerships and compute investments between hyperscalers and foundation model labs under UK merger control.',
      },
      transparencyAndWatermarking: {
        category: 'Synthetic Content & Deepfake Disclosure',
        citation: 'Online Safety Act 2023 & ICO Explainability Guidance',
        summary: 'Ofcom enforces illegal content duties covering synthetic non-consensual intimate imagery and election disinformation; ICO requires meaningful transparency for automated profiling.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'UK GDPR Article 13(2)(f): The controller shall provide the data subject with information as to the existence of automated decision-making, including profiling, and meaningful information about the logic involved.',
        counselCommentary:
          'Data Protection and Digital Information reforms preserve human review safeguards while clarifying lawful legitimate interest assessments for safety testing.',
      },
      incidentReporting: {
        category: 'Serious Incident Notification Window',
        citation: 'FCA Principle 11 (SUP 15.3) & UK GDPR Art. 33',
        summary: 'Immediate notification to FCA of any material operational disruption involving algorithmic trading or credit models; 72-hour ICO notification for personal data breaches.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'FCA Handbook SUP 15.3.1R: A firm must notify the FCA immediately it becomes aware, or has information which reasonably suggests, that any matter having a serious regulatory impact has occurred.',
        counselCommentary:
          'Operational resilience rules (PS21/3) treat third-party foundation model API outages or hallucinations affecting important business services as reportable operational incidents.',
      },
      conformityAndAudit: {
        category: 'Fundamental Rights & Conformity Audit',
        citation: 'UK GDPR Art. 35 (DPIA) & Equality Act 2010',
        summary: 'Mandatory Data Protection Impact Assessment (DPIA) before deploying innovative AI technologies involving systematic evaluation or sensitive biometric processing.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'UK GDPR Article 35(1): Where a type of processing in particular using new technologies, and taking into account the nature, scope, context and purposes of the processing, is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall, prior to the processing, carry out an assessment.',
        counselCommentary:
          'ICO AI Auditing Framework provides the definitive technical checklist used by UK investigators during compulsory data protection audits.',
      },
      sovereignDataAndTraining: {
        category: 'Training Data Provenance & Copyright Opt-Out',
        citation: 'CDPA 1988 § 29A & DSIT Copyright Consultation',
        summary: 'UK TDM exception (§ 29A) currently remains restricted to non-commercial research; ongoing DSIT consultation on introducing a commercial TDM exception with machine-readable opt-out.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'Consultation Active (2026)',
        fullClauseText:
          'Copyright, Designs and Patents Act 1988 Section 29A(1): The making of a copy of a work by a person who has lawful access to the work does not infringe copyright in the work provided that the copy is made in order that a person who has lawful access to the work may carry out a computational analysis of anything recorded in the work for the sole purpose of research for a non-commercial purpose.',
        counselCommentary:
          'Commercial AI training on UK-hosted copyrighted content without an explicit license remains high-risk pending parliamentary resolution of the CDPA § 29A commercial expansion.',
      },
    },
  },
  {
    id: 'cn',
    code: 'CN',
    name: 'China (PRC)',
    region: 'APAC',
    primaryInstrument: 'Interim Measures for Generative AI & Algorithmic Registry',
    officialCitation: 'CAC Order No. 15 (2023); TC260-003 Safety Standard',
    status: 'ENACTED',
    riskRating: 'Critical',
    supervisoryAuthority: 'Cyberspace Administration of China (CAC), MIIT & MPS',
    maxPenaltyCeiling: '¥50,000,000 (PIPL Integration)',
    maxPenaltyRevenuePct: '5.0% Annual Turnover & Service Suspension / App Delisting',
    extraterritorialReach: true,
    nextMilestoneDate: '2026-09-01',
    nextMilestoneLabel: 'Mandatory National Standard GB/T Synthetic Content Labeling Enforcement Audit',
    executiveSummary:
      'Prescriptive vertical regulatory regime requiring pre-deployment CAC security assessments, mandatory Double-Filing (Algorithm Registry + Large Model Filing) for public-facing services, and strict TC260 corpus purity thresholds (<5% illegal/harmful training samples).',
    mapCoordinates: { x: 765, y: 205 },
    vectors: {
      scopeAndTiering: {
        category: 'Risk Classification & Extraterritorial Scope',
        citation: 'CAC Order No. 15 Art. 2 & Art. 20',
        summary: 'Applies to all generative AI services provided to the public within PRC territory; foreign services not completing CAC filing are blocked and removed from domestic app stores.',
        obligationLevel: 'Mandatory',
        effectiveDate: '15 Aug 2023 (In Full Effect)',
        fullClauseText:
          'CAC Order No. 15 Article 2: These Measures apply to the utilization of generative artificial intelligence technology to provide services for generating text, pictures, audio, video, and other content to the public within the territory of the People’s Republic of China.',
        counselCommentary:
          'Enterprise B2B internal tools not bearing "public opinion attributes or social mobilization capabilities" qualify for a streamlined provincial filing track rather than full central CAC model registration.',
      },
      foundationModels: {
        category: 'GPAI & Systemic Risk Thresholds',
        citation: 'CAC Order No. 15 Art. 17; TC260-003 Standard',
        summary: 'Mandatory Security Assessment and Large Model Filing prior to public launch; requires prompt-rejection testing across 31 risk categories with >=95% refusal accuracy.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'CAC Order No. 15 Article 17: Providers of generative AI services with public opinion attributes or social mobilization capabilities shall conduct security assessments in accordance with national regulations and complete algorithm filing, modification, or cancellation procedures.',
        counselCommentary:
          'Foreign multinational corporations typically must partner with a locally licensed PRC cloud/model operator to deploy generative features for domestic PRC customers.',
      },
      transparencyAndWatermarking: {
        category: 'Synthetic Content & Deepfake Disclosure',
        citation: 'Deep Synthesis Provisions Art. 16–17; Mandatory GB Standard',
        summary: 'Dual-layer marking mandate: explicit visible watermarks on user-facing synthetic media plus implicit metadata tracing user account ID, timestamp, and service provider code.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect (Updated GB Standard 2025/2026)',
        fullClauseText:
          'Deep Synthesis Provisions Article 17: Deep synthesis service providers providing services that might cause confusion or misidentification by the public shall place conspicuous labels in reasonable positions on the generated or edited content.',
        counselCommentary:
          'Implicit metadata tags must be preserved by downstream distribution platforms (social networks, content hubs), creating chain-of-custody verification duties.',
      },
      incidentReporting: {
        category: 'Serious Incident Notification Window',
        citation: 'Cybersecurity Law Art. 25 & CAC Incident Measures',
        summary: 'Ultra-compressed reporting: 1 hour for "Particularly Severe" or "Major" network/AI security incidents affecting national security or >10M users; immediate content takedown.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'CAC Cybersecurity Incident Reporting Measures: Operators shall report particularly severe or major cybersecurity incidents to the provincial cyberspace administration and public security organs within 1 hour.',
        counselCommentary:
          'Providers must maintain real-time kill-switch capabilities to suspend specific generation endpoints upon discovery of prohibited outputs.',
      },
      conformityAndAudit: {
        category: 'Fundamental Rights & Conformity Audit',
        citation: 'TC260-003 § 5–7 (Corpus & Model Safety Evaluation)',
        summary: 'Random sampling of >=4,000 training corpus items per source showing >=96% safety qualification rate; red-team testing with >=2,000 adversarial prompts.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'TC260-003 Section 5.2(b): Training corpus security evaluations shall randomly sample no fewer than 4,000 data entries from the corpus, with a safety qualification rate of no less than 96%.',
        counselCommentary:
          'Requires dedicated manual annotation logs and third-party inspection reports archived in mainland China for CAC supervisory review.',
      },
      sovereignDataAndTraining: {
        category: 'Training Data Provenance & Copyright Opt-Out',
        citation: 'CAC Order No. 15 Art. 7; PIPL Art. 38–40',
        summary: 'Strict prohibition on using blocked cross-border sources or unconsented personal information; cross-border transfer of training data or fine-tuning telemetry requires CAC Standard Contract or Security Assessment.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'CAC Order No. 15 Article 7: Providers shall use data and foundation models from legitimate sources; where intellectual property rights are involved, they shall not infringe upon the statutory intellectual property rights enjoyed by others.',
        counselCommentary:
          'Corpus blacklists maintained under TC260 prohibit training on sources containing more than 5% non-compliant content, even if individual scraped samples are filtered.',
      },
    },
  },
  {
    id: 'sg',
    code: 'SG',
    name: 'Singapore',
    region: 'APAC',
    primaryInstrument: 'Model AI Governance Framework for GenAI & Agentic AI',
    officialCitation: 'IMDA GenAI Framework (2024/2025); PDPA 2012; MAS FEAT / Project MindForge',
    status: 'FRAMEWORK',
    riskRating: 'Moderate',
    supervisoryAuthority: 'Infocomm Media Development Authority (IMDA), PDPC & Monetary Authority of Singapore (MAS)',
    maxPenaltyCeiling: 'S$1,000,000',
    maxPenaltyRevenuePct: '10.0% Annual Domestic Turnover in Singapore (PDPA / Online Safety)',
    extraterritorialReach: true,
    nextMilestoneDate: '2026-10-30',
    nextMilestoneLabel: 'MAS Financial Sector AI Risk Management Supervisory Thematic Inspection',
    executiveSummary:
      'Internationally interoperable governance regime anchored by IMDA’s Model AI Governance Framework for Generative AI, AI Verify open-source testing toolkit, and binding Monetary Authority of Singapore (MAS) supervisory expectations for financial institutions.',
    mapCoordinates: { x: 752, y: 295 },
    vectors: {
      scopeAndTiering: {
        category: 'Risk Classification & Extraterritorial Scope',
        citation: 'IMDA GenAI Framework Nine Dimensions; MAS FEAT',
        summary: 'Allocates shared responsibility across the AI supply chain (Model Developers, Cloud/Infra Providers, Application Deployers); MAS enforces strict materiality tiering for financial services.',
        obligationLevel: 'Conditional',
        effectiveDate: 'In Effect',
        fullClauseText:
          'IMDA Framework Dimension 1 (Accountability): Responsibility should be allocated based on the level of control each stakeholder exercises across the AI development and deployment lifecycle.',
        counselCommentary:
          'Used across ASEAN as the reference standard; completing AI Verify testing reports satisfies due diligence inquiries from enterprise procurement boards across APAC.',
      },
      foundationModels: {
        category: 'GPAI & Systemic Risk Thresholds',
        citation: 'IMDA Starter Kit for Safety Testing of LLM Applications',
        summary: 'Standardized safety benchmarking across hallucination, toxicity, stereotyping, and prompt injection via the AI Verify Foundation testing suite.',
        obligationLevel: 'Voluntary',
        effectiveDate: 'In Effect',
        fullClauseText:
          'IMDA AI Verify Testing Protocol: Model evaluators should execute standardized baseline evaluations alongside domain-specific adversarial red-teaming prior to production deployment.',
        counselCommentary:
          'While voluntary for general commerce, MAS expects licensed banks and insurers under Project MindForge to maintain quantitative model validation logs.',
      },
      transparencyAndWatermarking: {
        category: 'Synthetic Content & Deepfake Disclosure',
        citation: 'Elections (Integrity of Online Advertising) Amendment Act 2024',
        summary: 'Strict statutory prohibition and criminal/financial penalties on digitally generated or manipulated deepfakes depicting election candidates during electoral periods; C2PA provenance promotion.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'Elections (Integrity of Online Advertising) Act: No person shall publish or permit to be published online election advertising that depicts a candidate saying or doing something they did not say or do via synthetic manipulation.',
        counselCommentary:
          'Online platforms operating in Singapore must comply with corrective directions within hours or face severe blocking and financial sanctions.',
      },
      incidentReporting: {
        category: 'Serious Incident Notification Window',
        citation: 'PDPA § 26D & MAS Notice TRM (Technology Risk Management)',
        summary: 'MAS-regulated financial institutions must report system malfunctions or AI security breaches within 1 hour; PDPC requires data breach notification within 3 calendar days.',
        obligationLevel: 'Mandatory',
        effectiveDate: 'In Effect',
        fullClauseText:
          'MAS Notice on Technology Risk Management: A financial institution shall notify the Authority as soon as possible, but not later than 1 hour, upon the discovery of a relevant incident.',
        counselCommentary:
          'Singapore’s 1-hour MAS reporting window is among the fastest financial-sector incident thresholds globally.',
      },
      conformityAndAudit: {
        category: 'Fundamental Rights & Conformity Audit',
        citation: 'PDPC Advisory Guidelines on Use of Personal Data in AI Systems',
        summary: 'Clarifies application of PDPA "Business Improvement" and "Research" exceptions for AI model training, paired with Data Protection Impact Assessments.',
        obligationLevel: 'Conditional',
        effectiveDate: '01 Mar 2024',
        fullClauseText:
          'PDPC AI Guidelines § 3.2: Organizations may rely on the Business Improvement Exception to use personal data without consent to train or test AI systems for enhancing existing goods/services, subject to data minimization safeguards.',
        counselCommentary:
          'Provides clear statutory safe harbor for enterprise internal fine-tuning on customer logs, provided data is not shared outside the corporate group.',
      },
      sovereignDataAndTraining: {
        category: 'Training Data Provenance & Copyright Opt-Out',
        citation: 'Singapore Copyright Act 2021 § 243–244 (Computational Data Analysis)',
        summary: 'Broad statutory copyright exception permitting commercial and non-commercial Computational Data Analysis (TDM) on lawfully accessed works, which cannot be overridden by contract.',
        obligationLevel: 'Voluntary',
        effectiveDate: 'In Effect',
        fullClauseText:
          'Copyright Act 2021 Section 244(1): If the conditions in subsection (2) are met, it is a permitted use of a work to make a copy of the work for the purpose of computational data analysis. Section 244(4): Any contract term purporting to restrict this permitted use is void.',
        counselCommentary:
          'Makes Singapore one of the most favorable jurisdictions globally for commercial AI model training, provided the scraper did not bypass paywalls or technical authentication barriers.',
      },
    },
  },
];

export const LEGAL_BRIEFINGS: LegalBriefing[] = [
  {
    id: 'brief-eu-gpai-code',
    date: '05 OCT 2026',
    jurisdictionCode: 'EU',
    jurisdictionName: 'European Union',
    topic: 'General-Purpose AI & Annex III Enforcement',
    status: 'ENACTED',
    title: 'Operationalizing EU AI Act Article 27 Fundamental Rights Impact Assessments & GPAI Downstream Liability Allocation',
    summary:
      'As national Market Surveillance Authorities initiate active docket reviews under Regulation (EU) 2024/1689, enterprise deployers of credit, insurance, and recruitment AI systems must reconcile upstream model documentation deficits with strict Annex III conformity obligations.',
    docketOrCitation: 'Reg. (EU) 2024/1689 · Art. 25, 27 & 53',
    readingTime: '9 min read',
    author: {
      name: 'Dr. Helena Vance-Köhler',
      role: 'Co-Chair, Global AI Regulatory Practice',
      office: 'Brussels / Frankfurt',
      initials: 'HV',
    },
    keyTakeaways: [
      'Article 25(1) automatically reclassifies downstream enterprise deployers as High-Risk "Providers" if they affix their trademark to an AI system or make a substantial modification (including domain fine-tuning that alters intended purpose).',
      'Financial institutions and insurers must file the Fundamental Rights Impact Assessment (FRIA) summary template with their national Market Surveillance Authority prior to first production deployment.',
      'Upstream GPAI providers refusing to supply Annex XII downstream integrator documentation breach Article 53(1)(b), creating contractual indemnification triggers.',
    ],
    sections: [
      {
        heading: '01. The Article 25 Value-Chain Trap: When Fine-Tuning Triggers Provider Liability',
        content:
          'General Counsel across multinational enterprises frequently assume that licensing a foundation model via API insulates the organization from "Provider" obligations under Chapter III, Section 2 of the EU AI Act. However, Article 25(1)(b) and (c) establish a strict statutory reclassification trigger: any deployer who modifies the intended purpose of an AI system already placed on the market—or performs fine-tuning, retrieval-augmented generation (RAG) architectural integration, or weight adaptation that constitutes a "substantial modification" into an Annex III high-risk domain—assumes the full panoply of Provider obligations under Article 16.',
        statutoryQuote: {
          citation: 'Regulation (EU) 2024/1689, Article 25(1)(c)',
          text: 'Any distributor, importer, deployer or other third-party shall be considered to be a provider of a high-risk AI system for the purposes of this Regulation and shall be subject to the obligations of the provider under Article 16, in any of the following circumstances: ... (c) they modify the intended purpose of an AI system, including a general-purpose AI system, which has not been classified as high-risk and has already been placed on the market or put into service in such a way that the AI system becomes a high-risk AI system in accordance with Article 6.',
        },
      },
      {
        heading: '02. Mandatory Fundamental Rights Impact Assessments (Article 27)',
        content:
          'Private entities providing public services, alongside banking and insurance institutions deploying AI systems for creditworthiness evaluation (Annex III, Point 5(b)) or life and health insurance risk pricing (Annex III, Point 5(c)), must complete a formal Fundamental Rights Impact Assessment before putting the system into service. Unlike a standard GDPR Article 35 DPIA, the Article 27 FRIA requires explicit enumeration of specific categories of natural persons affected, human oversight governance measures, and internal complaint-handling mechanisms.',
      },
      {
        heading: '03. Model Supply-Chain Indemnification & Contractual Architecture',
        content:
          'Enterprise procurement agreements executed in Q4 2026 must incorporate three non-negotiable statutory covenants: (i) an affirmative warranty of compliance with Article 53(1)(c) EU copyright and TDM reservation protocols; (ii) mandatory delivery of Annex XII technical documentation within 10 business days of model version updates; and (iii) uncapped or super-capped indemnification for regulatory fines arising from training corpus provenance defects.',
      },
    ],
  },
  {
    id: 'brief-ca-ab2013-audit',
    date: '29 SEP 2026',
    jurisdictionCode: 'US-CA',
    jurisdictionName: 'California',
    topic: 'Training Data Provenance & Watermarking',
    status: 'ENACTED',
    title: 'California AB 2013 & SB 942 Enforcement Sweeps: Navigating Public Dataset Disclosures Without Waiving Trade Secret Protection',
    summary:
      'Analysis of the California Attorney General’s initial statutory inquiries under Civil Code § 3110 and strategies for structuring public dataset summaries that satisfy all twelve statutory subsections while preserving proprietary curation methodologies.',
    docketOrCitation: 'Cal. Civ. Code § 3111 · Bus. & Prof. Code § 22757',
    readingTime: '7 min read',
    author: {
      name: 'Marcus Sterling, Esq.',
      role: 'Senior Partner, Litigation & Regulatory Enforcement',
      office: 'San Francisco / Washington, D.C.',
      initials: 'MS',
    },
    keyTakeaways: [
      'AB 2013 contains no de minimis revenue or parameter threshold: any generative AI system or substantial modification made publicly available to Californians must publish a 12-point dataset summary on its public website.',
      'Disclosures must explicitly state whether datasets contain copyrighted material, personal information (CCPA § 1798.140(v)), or aggregate consumer information, creating direct evidentiary records for copyright and privacy plaintiffs.',
      'SB 942 requires covered providers (>1M monthly users) to include both user-configurable manifest disclosures and tamper-resistant latent metadata in all synthetic visual/audio outputs.',
    ],
    sections: [
      {
        heading: '01. The Twelve Mandatory Dataset Disclosure Vectors Under Civil Code § 3111',
        content:
          'Effective January 1, 2026, California Civil Code § 3111 mandates that developers of generative AI systems publish a detailed summary of the datasets used in development. Because the statute defines "generative artificial intelligence" broadly and applies to any substantial modification released after the effective date, enterprise SaaS vendors embedding fine-tuned generative copilot features face immediate disclosure scrutiny.',
        statutoryQuote: {
          citation: 'California Civil Code § 3111(a)(5)–(8)',
          text: 'The documentation shall include a high-level summary of the datasets used in the development of the generative artificial intelligence system or service, including, at a minimum, all of the following: (5) Whether the datasets include any data protected by copyright, trademark, or patent... (6) Whether the datasets were purchased or licensed by the developer. (7) Whether the datasets include personal information... (8) Whether the datasets include aggregate consumer information.',
        },
      },
      {
        heading: '02. Balancing Statutory Granularity Against Trade Secret Defensibility',
        content:
          'Under the California Uniform Trade Secrets Act (CUTSA), public disclosure of specific dataset weights, proprietary synthetic data mixes, and vendor-specific licensing arrangements can extinguish trade secret status. Counsel should structure § 3111 disclosures using categorical range bands (e.g., "10^9 to 10^10 tokens derived from licensed commercial financial news archives") rather than enumerating individual dataset licensors.',
      },
    ],
  },
  {
    id: 'brief-ftc-disgorgement',
    date: '18 SEP 2026',
    jurisdictionCode: 'US-FED',
    jurisdictionName: 'United States (Federal)',
    topic: 'Algorithmic Disgorgement & SEC Materiality',
    status: 'FRAMEWORK',
    title: 'Algorithmic Disgorgement as a Baseline Remedy: FTC Section 5 Consent Decrees & SEC Form 8-K Model Poisoning Disclosures',
    summary:
      'Evaluating the operational and balance-sheet exposure of mandatory model weight deletion remedies in FTC data-provenance enforcement actions, alongside SEC Division of Corporation Finance guidance on adversarial AI incidents.',
    docketOrCitation: '15 U.S.C. § 45 · SEC Release No. 33-11216',
    readingTime: '8 min read',
    author: {
      name: 'Eleanor Vance-Thorne',
      role: 'Partner, Cyber & Algorithmic Risk',
      office: 'New York',
      initials: 'EV',
    },
    keyTakeaways: [
      'The FTC routinely mandates "Algorithmic Disgorgement"—the permanent destruction of models, weights, and embeddings trained on data collected without affirmative express consent or in violation of privacy representations.',
      'Retroactive privacy policy changes to permit AI model training on historical customer conversations or support tickets are treated by the FTC as per se deceptive and unfair practices.',
      'Model weight exfiltration or adversarial data poisoning affecting core product integrity can trigger the 4-business-day SEC Form 8-K Item 1.05 reporting clock.',
    ],
    sections: [
      {
        heading: '01. Anatomy of an Algorithmic Disgorgement Order',
        content:
          'Unlike monetary civil penalties—which can be modeled as a bounded financial reserve—algorithmic disgorgement strikes at the capital asset itself. Under the FTC’s "fruit of the poisonous tree" doctrine applied to machine learning, if even a fraction of a pre-training or fine-tuning corpus includes unconsented biometric data, children’s data (COPPA), or customer records scraped in contravention of terms-of-service commitments, the Commission requires certification of complete destruction of the resulting model parameters.',
        statutoryQuote: {
          citation: 'FTC Standard Algorithmic Destruction Provision (Section 5 Enforcement)',
          text: 'IT IS FURTHER ORDERED that Respondent, within thirty (30) days of the effective date of this Order, shall delete or destroy all Affected Work Product, including any algorithms, models, neural network weights, or software products developed in whole or in part using Covered Information collected without Affirmative Express Consent, and provide a sworn statement signed under penalty of perjury confirming such destruction.',
        },
      },
      {
        heading: '02. Lineage Quarantine & Clean-Room Model Checkpointing',
        content:
          'To insulate foundational R&D investments from total disgorgement risk, engineering and legal teams must implement cryptographic lineage checkpointing. Base checkpoints trained strictly on audited public-domain and explicitly licensed corpora should be frozen and air-gapped prior to any fine-tuning involving user-generated telemetry.',
      },
    ],
  },
  {
    id: 'brief-apac-crossborder',
    date: '08 SEP 2026',
    jurisdictionCode: 'SG',
    jurisdictionName: 'Singapore & PRC',
    topic: 'Cross-Border Compute & APAC Dual-Track Compliance',
    status: 'ENACTED',
    title: 'Bifurcated APAC AI Architectures: Reconciling China CAC Double-Filing & TC260 Standards with Singapore MAS Project MindForge',
    summary:
      'Architectural blueprint for financial and multinational institutions operating across Greater China and ASEAN, contrasting mainland China’s TC260 corpus purity audits with Singapore’s interoperable AI Verify and PDPA Business Improvement safe harbors.',
    docketOrCitation: 'CAC Order No. 15 · TC260-003 · Singapore PDPA § 244',
    readingTime: '11 min read',
    author: {
      name: 'Kenneth Tan & Mei-Ling Zhou',
      role: 'APAC Heads of Technology & Financial Regulation',
      office: 'Singapore / Shanghai',
      initials: 'KT',
    },
    keyTakeaways: [
      'Mainland China requires a strict "Double-Filing" regime (Algorithm Registry + Large Model Filing) and TC260 safety evaluation (4,000+ corpus sample audit with >=96% pass rate) before public release.',
      'Singapore’s Copyright Act § 244 provides an unwaivable statutory TDM exception for commercial model training, positioning Singapore as the premier APAC regional compute hub.',
      'Cross-border transmission of fine-tuning prompts or RAG embeddings from mainland China to regional inference endpoints triggers PIPL Art. 38 cross-border data transfer thresholds.',
    ],
    sections: [
      {
        heading: '01. Navigating the CAC Large Model Filing & TC260-003 Technical Audit',
        content:
          'Multinational corporations deploying generative AI interfaces to users inside mainland China cannot simply route API traffic to global foundation models. Under CAC Order No. 15 and the TC260-003 National Standard, any public-facing generative capability must either build atop a domestically registered foundation model or complete an independent central CAC security assessment, including adversarial red-teaming across 31 statutory content categories.',
        statutoryQuote: {
          citation: 'National Technical Committee 260 (TC260-003), Section 7.1',
          text: 'Model security assessments shall employ a dedicated test question bank containing no fewer than 2,000 adversarial test questions covering all 31 risk categories listed in Appendix A; the proportion of generated content that conforms to security requirements shall not be less than 90%.',
        },
      },
      {
        heading: '02. Leveraging Singapore as an ASEAN Model Training & Validation Hub',
        content:
          'Conversely, Singapore combines the statutory certainty of Copyright Act Section 244 (which voids contractual terms attempting to prohibit computational data analysis on lawfully accessed works) with the Personal Data Protection Act’s Business Improvement Exception. Multinationals are increasingly establishing dual-enclave architectures: hosting regional ASEAN/Global model weights in Singapore while operating an isolated, domestically licensed model instance for PRC operations.',
      },
    ],
  },
];

export const ENFORCEMENT_CHRONOLOGY: EnforcementEvent[] = [
  {
    id: 'evt-1',
    date: '02 AUG 2026',
    quarter: 'Q3 2026',
    jurisdictionCode: 'EU',
    jurisdictionName: 'European Union',
    authority: 'European AI Office & Member State Market Surveillance Authorities',
    instrument: 'Regulation (EU) 2024/1689 (Art. 6(2), Annex III & Art. 50)',
    eventType: 'Statutory Deadline',
    status: 'ENACTED',
    title: 'Full Statutory Applicability of EU AI Act High-Risk Annex III Obligations & Article 50 Transparency Rules',
    impactedEntities: 'Providers & Deployers of High-Risk AI Systems (Biometrics, Critical Infrastructure, Education, Employment, Credit/Insurance, Law Enforcement) & Synthetic Media Generators',
    description:
      'Primary enforcement milestone under Regulation (EU) 2024/1689. All Annex III high-risk AI systems placed on the market or put into service must maintain a continuous Risk Management System (Art. 9), Data Governance protocols (Art. 10), Technical Documentation (Annex IV), Automatic Event Logging (Art. 12), Human Oversight (Art. 14), CE Marking, and EU Database Registration (Art. 49). Deployers must complete Fundamental Rights Impact Assessments (Art. 27).',
    complianceChecklist: [
      'Complete Annex IV Technical Documentation & EU Declaration of Conformity (Art. 47) for all Annex III systems.',
      'Register covered high-risk AI systems in the European Commission central database (Art. 49).',
      'Execute and archive Article 27 Fundamental Rights Impact Assessments (FRIA) for banking, insurance, and public-sector deployments.',
      'Deploy C2PA / machine-readable provenance watermarking across all synthetic audio, image, video, and text endpoints (Art. 50(2)).',
    ],
  },
  {
    id: 'evt-2',
    date: '01 SEP 2026',
    quarter: 'Q3 2026',
    jurisdictionCode: 'CN',
    jurisdictionName: 'China (PRC)',
    authority: 'Cyberspace Administration of China (CAC) & MIIT',
    instrument: 'Mandatory National Standard GB/T Synthetic Content Labeling Measures',
    eventType: 'Supervisory Audit',
    status: 'ENACTED',
    title: 'CAC Nationwide Supervisory Inspection of Explicit & Implicit Synthetic Content Watermarking',
    impactedEntities: 'Generative AI Service Providers, Mobile App Stores & Content Distribution Platforms Operating in Mainland China',
    description:
      'Mandatory national technical enforcement sweep verifying dual-layer synthetic media identification. Service providers must embed visible watermarks at specified screen coordinates/audio intervals and write immutable metadata fields into file headers tracing provider registration ID and generation sequence.',
    complianceChecklist: [
      'Verify file-header metadata persistence across JPEG, MP4, WAV, and PDF export pipelines.',
      'Audit app-store distribution compliance certificates and CAC Algorithm Registry filing numbers displayed in user interfaces.',
      'Validate automated ingestion filters that detect and label third-party synthetic uploads.',
    ],
  },
  {
    id: 'evt-3',
    date: '30 OCT 2026',
    quarter: 'Q4 2026',
    jurisdictionCode: 'SG',
    jurisdictionName: 'Singapore',
    authority: 'Monetary Authority of Singapore (MAS)',
    instrument: 'MAS Project MindForge Phase II & Technology Risk Management (TRM) Guidelines',
    eventType: 'Supervisory Audit',
    status: 'FRAMEWORK',
    title: 'MAS Thematic Inspection of Generative & Agentic AI Governance in Banking and Capital Markets',
    impactedEntities: 'Licensed Banks, Merchant Banks, Insurers & Capital Markets Intermediaries in Singapore',
    description:
      'Supervisory thematic review evaluating board-level AI risk appetite frameworks, quantitative model validation for LLM-powered credit/research copilots, autonomous agent kill-switches, and third-party foundation model concentration risk.',
    complianceChecklist: [
      'Update Materiality Risk Tiering matrices for all internal and customer-facing generative AI workflows.',
      'Run AI Verify benchmark test suites and archive adversarial prompt-injection evaluation logs.',
      'Verify 1-hour MAS TRM incident reporting runbooks cover model hallucination and RAG data leakage scenarios.',
    ],
  },
  {
    id: 'evt-4',
    date: '15 NOV 2026',
    quarter: 'Q4 2026',
    jurisdictionCode: 'UK',
    jurisdictionName: 'United Kingdom',
    authority: 'Department for Science, Innovation and Technology (DSIT) & CMA',
    instrument: 'UK Statutory Frontier AI Safety & Copyright Transparency Bill',
    eventType: 'Rulemaking Finalization',
    status: 'PROPOSED',
    title: 'UK Parliamentary Committee Finalization of Statutory Pre-Deployment Testing for Frontier Models',
    impactedEntities: 'Frontier AI Model Developers, Cloud Compute Providers & Commercial TDM Data Licensors',
    description:
      'Codification of voluntary Bletchley/Seoul AI Safety Institute (AISI) testing commitments into binding statutory obligations for frontier compute models, alongside statutory clarity on UK copyright opt-out registries for commercial web crawlers.',
    complianceChecklist: [
      'Review compute threshold definitions and pre-deployment AISI weight-access protocols.',
      'Audit commercial web-scraping pipelines touching UK-hosted media and publishing domains under CDPA § 29A.',
    ],
  },
  {
    id: 'evt-5',
    date: '01 DEC 2026',
    quarter: 'Q4 2026',
    jurisdictionCode: 'US-FED',
    jurisdictionName: 'United States (Federal)',
    authority: 'Office of Management and Budget (OMB) & Federal Acquisition Regulatory Council',
    instrument: 'OMB Memorandum M-24-10 & Federal Acquisition Regulation (FAR) AI Clauses',
    eventType: 'Statutory Deadline',
    status: 'FRAMEWORK',
    title: 'Annual Federal Agency & Government Contractor Rights-Impacting AI Safeguard Recertification',
    impactedEntities: 'Federal Agencies & Commercial Software Vendors Supplying AI Systems to the U.S. Government',
    description:
      'Mandatory annual Chief AI Officer (CAIO) recertification of all safety-impacting and rights-impacting AI systems across federal agencies, enforcing flow-down NIST AI 600-1 testing, ongoing disparate impact monitoring, and human opt-out mechanisms on commercial procurement vendors.',
    complianceChecklist: [
      'Deliver updated NIST AI RMF / AI 600-1 conformity attestations for all federal contract vehicles.',
      'Confirm zero unauthorized training or retention of Federal Government data within commercial multi-tenant foundation models.',
    ],
  },
  {
    id: 'evt-6',
    date: '02 AUG 2027',
    quarter: 'Q3 2027',
    jurisdictionCode: 'EU',
    jurisdictionName: 'European Union',
    authority: 'European Commission & Notified Bodies',
    instrument: 'Regulation (EU) 2024/1689 (Art. 6(1) & Annex I Regulated Products)',
    eventType: 'Statutory Deadline',
    status: 'ENACTED',
    title: 'Applicability of EU AI Act Obligations for High-Risk AI Embedded as Safety Components in Annex I Products',
    impactedEntities: 'Medical Devices (MDR/IVDR), Automotive, Aviation, Industrial Machinery & Toy Manufacturers',
    description:
      'Final phase-in milestone under Article 113(c) of the EU AI Act, bringing AI systems that serve as safety components of products covered by Union harmonization legislation (Annex I)—including medical devices, civil aviation, and motor vehicles—into full third-party Notified Body conformity assessment.',
    complianceChecklist: [
      'Align MDR/IVDR Notified Body audit schedules with EU AI Act Annex VII quality management system audits.',
      'Complete post-market monitoring plan integration under Article 72.',
    ],
  },
];
