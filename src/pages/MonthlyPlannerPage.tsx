import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { KPICard } from '../components/common/KPICard';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  CalendarRange,
  Gauge,
  TrainTrack
} from 'lucide-react';

export const MonthlyPlannerPage: React.FC = () => {
  const { runAiOptimization, isOptimizing, showToast } = useRailway();

  const [currentMonth, setCurrentMonth] = useState('September 2026');
  const [selectedCorridor, setSelectedCorridor] = useState('ALL');
  const [selectedDept, setSelectedDept] = useState('ALL');

  // Days in month mock (30 days)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Monthly Strategic Block Matrix
            </h1>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              {currentMonth}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Macro-level corridor possession forecasting and track renewal synchronization
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => showToast('Monthly Forecast Exported', 'Downloaded as PDF & CSV.', 'success')}
            className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Plan</span>
          </button>

          <button
            onClick={runAiOptimization}
            disabled={isOptimizing}
            className="px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Optimize Month Projection</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards (Section 14 Requirement) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Total Planned Blocks"
          value="78"
          badgeText="All Corridors"
          icon={CalendarRange}
          variant="info"
          subtext="Monthly allocation"
        />

        <KPICard
          title="Integrated Blocks"
          value="54"
          badgeText="69% Multi-Dept"
          icon={Layers}
          variant="success"
          subtext="Shadow possession"
        />

        <KPICard
          title="Critical Maintenance"
          value="19"
          badgeText="Track & OHE"
          icon={Zap}
          variant="warning"
          subtext="Zero SLA breach"
        />

        <KPICard
          title="Expected Availability"
          value="95.4%"
          badgeText="Target > 95%"
          icon={Gauge}
          variant="success"
          subtext="Infrastructure uptime"
        />
      </div>

      {/* Filter & Month Navigation Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth('August 2026')}
            className="p-1.5 rounded border border-slate-300 hover:bg-slate-100"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <span className="font-bold text-sm text-slate-900 font-mono px-3">
            {currentMonth}
          </span>
          <button
            onClick={() => setCurrentMonth('October 2026')}
            className="p-1.5 rounded border border-slate-300 hover:bg-slate-100"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <select
            value={selectedCorridor}
            onChange={e => setSelectedCorridor(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
          >
            <option value="ALL">All Corridors (HWH – BWN – DGR – ASN)</option>
            <option value="HWH-BWN">Howrah – Bardhaman (Quadruple Line)</option>
            <option value="BWN-DGR">Bardhaman – Durgapur</option>
            <option value="DGR-ASN">Durgapur – Asansol</option>
          </select>

          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
          >
            <option value="ALL">All Departments</option>
            <option value="Engineering">Engineering (Track)</option>
            <option value="S&T">S&T (Signals)</option>
            <option value="Traction">Traction (OHE)</option>
          </select>
        </div>
      </div>

      {/* Month Calendar Grid (30 Day Blocks) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
          September 2026 Day-by-Day Block Distribution
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {days.map(d => {
            const hasIntegratedBlock = d % 3 === 0 || d === 12 || d === 14;
            const hasSingleBlock = d % 2 === 0;
            const isToday = d === 12;

            return (
              <div
                key={d}
                className={`p-3 rounded-lg border min-h-[95px] flex flex-col justify-between transition-all ${
                  isToday
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/30'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-bold ${isToday ? 'text-blue-700' : 'text-slate-800'}`}>
                    Sep {d}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.2 rounded font-mono">
                      TODAY
                    </span>
                  )}
                </div>

                <div className="my-1.5 space-y-1">
                  {hasIntegratedBlock ? (
                    <div className="p-1 rounded bg-purple-100 text-purple-900 text-[10px] font-bold truncate border border-purple-200">
                      ⚡ Joint Block (3 Depts)
                    </div>
                  ) : hasSingleBlock ? (
                    <div className="p-1 rounded bg-blue-100 text-blue-900 text-[10px] font-medium truncate border border-blue-200">
                      🔧 Track Tamping (TMS)
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-400 italic">Clear corridor</div>
                  )}
                </div>

                <div className="text-[9px] text-slate-500 font-mono flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span>Window: {hasIntegratedBlock ? '120m' : hasSingleBlock ? '60m' : '0m'}</span>
                  <span>{hasIntegratedBlock ? '92% util' : ''}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
