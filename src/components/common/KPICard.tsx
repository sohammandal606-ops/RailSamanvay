import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
    label?: string;
  };
  icon: LucideIcon;
  badgeText?: string;
  variant?: 'default' | 'critical' | 'warning' | 'success' | 'info';
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtext,
  trend,
  icon: Icon,
  badgeText,
  variant = 'default',
  onClick,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'critical':
        return {
          iconBg: 'bg-red-50 text-red-700 border-red-200',
          accentBorder: 'border-l-4 border-l-red-600',
          badgeBg: 'bg-red-50 text-red-700 border border-red-200'
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
          accentBorder: 'border-l-4 border-l-amber-500',
          badgeBg: 'bg-amber-50 text-amber-700 border border-amber-200'
        };
      case 'success':
        return {
          iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          accentBorder: 'border-l-4 border-l-emerald-600',
          badgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        };
      case 'info':
        return {
          iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
          accentBorder: 'border-l-4 border-l-blue-600',
          badgeBg: 'bg-blue-50 text-blue-700 border border-blue-200'
        };
      default:
        return {
          iconBg: 'bg-slate-100 text-slate-700 border-slate-200',
          accentBorder: 'border-l-4 border-l-railway-slate',
          badgeBg: 'bg-slate-100 text-slate-700'
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 ${vStyles.accentBorder} ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">{value}</span>
            {badgeText && (
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${vStyles.badgeBg}`}>
                {badgeText}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2.5 rounded-lg border ${vStyles.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(trend || subtext) && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          {trend ? (
            <div className="flex items-center gap-1">
              {trend.isNeutral ? (
                <Minus className="w-3.5 h-3.5 text-slate-400" />
              ) : trend.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
              )}
              <span
                className={`font-semibold font-mono ${
                  trend.isNeutral
                    ? 'text-slate-600'
                    : trend.isPositive
                    ? 'text-emerald-600'
                    : 'text-rose-600'
                }`}
              >
                {trend.value}
              </span>
              <span className="text-slate-400">{trend.label || 'vs last week'}</span>
            </div>
          ) : (
            <span className="text-slate-500">{subtext}</span>
          )}
          {subtext && trend && <span className="text-slate-400 text-[11px] truncate max-w-[120px]">{subtext}</span>}
        </div>
      )}
    </div>
  );
};
