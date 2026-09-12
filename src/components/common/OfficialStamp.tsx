import React from 'react';

interface OfficialStampProps {
  status: 'Approved' | 'Pending Approval' | 'Rejected' | 'Emergency Sanction';
  officerTitle?: string;
  sanctionRef?: string;
  date?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const OfficialStamp: React.FC<OfficialStampProps> = ({
  status,
  officerTitle = 'SR. DIVISIONAL OPERATIONS MANAGER',
  sanctionRef,
  date = '12-SEP-2026',
  size = 'md',
}) => {
  const getStampConfig = () => {
    switch (status) {
      case 'Approved':
        return {
          stampClass: 'official-stamp-approved',
          title: 'SANCTIONED / APPROVED',
          subtitle: 'G&SR RULE 1968 COMPLIANT',
          sealColor: 'border-emerald-600 text-emerald-800',
        };
      case 'Emergency Sanction':
        return {
          stampClass: 'official-stamp-rejected',
          title: 'EMERGENCY SANCTIONED',
          subtitle: 'SPECIAL DISPENSATION',
          sealColor: 'border-red-600 text-red-800',
        };
      case 'Rejected':
        return {
          stampClass: 'official-stamp-rejected',
          title: 'REJECTED / RETURNED',
          subtitle: 'OPERATIONAL CONFLICT',
          sealColor: 'border-red-600 text-red-800',
        };
      case 'Pending Approval':
      default:
        return {
          stampClass: 'official-stamp-pending',
          title: 'AWAITING SANCTION',
          subtitle: 'UNDER HITL SCRUTINY',
          sealColor: 'border-amber-600 text-amber-800',
        };
    }
  };

  const config = getStampConfig();

  const sizeClasses = {
    sm: 'p-1.5 text-[9px]',
    md: 'p-2.5 text-[10px]',
    lg: 'p-3.5 text-xs',
  }[size];

  return (
    <div className={`inline-block rounded-lg shadow-xs select-none ${config.stampClass} ${sizeClasses}`}>
      <div className="border border-current px-2.5 py-1 rounded text-center leading-tight">
        <div className="font-extrabold tracking-wider">{config.title}</div>
        <div className="text-[8px] opacity-90 mt-0.5">{officerTitle}</div>
        <div className="text-[7px] opacity-75">{config.subtitle}</div>
        {sanctionRef && (
          <div className="text-[7px] font-mono mt-0.5 opacity-90">REF: {sanctionRef} • {date}</div>
        )}
      </div>
    </div>
  );
};
