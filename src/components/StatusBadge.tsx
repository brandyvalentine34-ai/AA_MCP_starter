import React from 'react';
import { RegulatoryStatus, STATUS_CONFIG } from '../data/legalIntelligenceData';

interface StatusBadgeProps {
  status: RegulatoryStatus;
  customLabel?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, customLabel }) => {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-[22px] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.05em] leading-[14px] rounded-[2px] border whitespace-nowrap shrink-0 ${config.bgColor} ${config.textColor} ${config.borderColor}`}
    >
      <span className={`w-1.5 h-1.5 rounded-[1px] ${config.dotColor}`} aria-hidden="true" />
      {customLabel || config.label}
    </span>
  );
};
