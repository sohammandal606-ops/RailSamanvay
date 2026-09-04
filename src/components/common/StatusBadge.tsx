import React from 'react';
import { Criticality, TaskStatus, CorridorSectionState, BlockApprovalStatus, Department } from '../../types';

interface BadgeProps {
  status?: string;
  variant?: 'criticality' | 'taskStatus' | 'corridorStatus' | 'approvalStatus' | 'department' | 'sourceSystem';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({
  status = 'Normal',
  variant = 'criticality',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-semibold px-2.5 py-1',
    lg: 'text-sm font-semibold px-3 py-1.5',
  }[size];

  const getStyle = () => {
    switch (variant) {
      case 'criticality': {
        const crit = status as Criticality;
        if (crit === 'Critical') return 'bg-red-50 text-red-700 border border-red-200 ring-1 ring-red-500/20';
        if (crit === 'High') return 'bg-amber-50 text-amber-700 border border-amber-200 ring-1 ring-amber-500/20';
        if (crit === 'Medium') return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      }
      case 'taskStatus': {
        const st = status as TaskStatus;
        if (st === 'Pending') return 'bg-amber-50 text-amber-800 border border-amber-300';
        if (st === 'Scheduled') return 'bg-blue-50 text-blue-700 border border-blue-300';
        if (st === 'In Progress') return 'bg-indigo-50 text-indigo-700 border border-indigo-300 animate-pulse';
        if (st === 'Completed') return 'bg-emerald-50 text-emerald-700 border border-emerald-300';
        return 'bg-slate-100 text-slate-700 border border-slate-300';
      }
      case 'corridorStatus': {
        const cs = status as CorridorSectionState;
        if (cs === 'Available') return 'bg-emerald-50 text-emerald-800 border border-emerald-300';
        if (cs === 'Maintenance Planned') return 'bg-amber-50 text-amber-800 border border-amber-300';
        if (cs === 'Active Maintenance') return 'bg-blue-50 text-blue-800 border border-blue-300';
        if (cs === 'Blocked') return 'bg-red-50 text-red-800 border border-red-300';
        return 'bg-slate-100 text-slate-700 border border-slate-300';
      }
      case 'approvalStatus': {
        const as = status as BlockApprovalStatus;
        if (as === 'Approved') return 'bg-emerald-100 text-emerald-900 border border-emerald-400 font-bold';
        if (as === 'Pending Approval') return 'bg-amber-100 text-amber-900 border border-amber-400 font-bold';
        if (as === 'Rejected') return 'bg-rose-100 text-rose-900 border border-rose-400 font-bold';
        if (as === 'Modified') return 'bg-blue-100 text-blue-900 border border-blue-400 font-bold';
        return 'bg-slate-100 text-slate-800 border border-slate-300';
      }
      case 'department': {
        const dept = status as Department;
        if (dept === 'Engineering') return 'bg-blue-50 text-blue-800 border border-blue-300';
        if (dept === 'S&T') return 'bg-amber-50 text-amber-800 border border-amber-300';
        if (dept === 'Traction') return 'bg-purple-50 text-purple-800 border border-purple-300';
        if (dept === 'Control Office') return 'bg-teal-50 text-teal-800 border border-teal-300';
        return 'bg-slate-100 text-slate-800 border border-slate-300';
      }
      case 'sourceSystem': {
        if (status === 'TMS') return 'bg-sky-100 text-sky-900 border border-sky-300 font-mono';
        if (status === 'SMMS') return 'bg-amber-100 text-amber-900 border border-amber-300 font-mono';
        if (status === 'TDMS') return 'bg-purple-100 text-purple-900 border border-purple-300 font-mono';
        return 'bg-teal-100 text-teal-900 border border-teal-300 font-mono';
      }
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md leading-none transition-colors ${sizeClasses} ${getStyle()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
};
