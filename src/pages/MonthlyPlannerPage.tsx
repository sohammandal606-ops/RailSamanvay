import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { KPICard } from '../components/common/KPICard';
import { GovEmblem } from '../components/common/GovEmblem';
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
  TrainTrack,
  ShieldCheck,
  Building2,
  TrendingUp
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
      {/* Official Government Header Banner */}
      <div className="gov-card p-5 border-l-4 border-railway-saffron">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <GovEmblem size="lg" className="shrink-0 drop-shadow-sm" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-railway-maroon tracking-wider uppercase font-hindi">
                  भारतीय रेल • पूर्व रेलवे (हावड़ा मंडल)
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
                  MACRO LOOKAHEAD MATRIX
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex flex-wrap items-center gap-2.5 mt-0.5">
                <span>मासिक रणनीतिक ब्लॉक योजना</span>
                <span className="text-slate-400 font-light hidden sm:inline">|</span>
                <span className="text-base sm:text-lg font-bold text-slate-800">
                  Monthly Strategic Corridor Possession Plan
                </span>
              </h1>
              <p className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2 font-medium">
                <span>Macro-level corridor possession forecasting, track renewal scheduling & OHE maintenance sync</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="font-mono text-railway-navy font-bold">{currentMonth}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <button
              onClick={() => showToast('Monthly Forecast Exported', 'Downloaded as official Railway Board dossier (PDF & CSV).', 'success')}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export Monthly Dossier</span>
            </button>

            <button
              onClick={runAiOptimization}
              disabled={isOptimizing}
              className="px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isOptimizing ? 'Optimizing Matrix...' : 'Optimize Month Projection'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Total Planned Blocks"
          value="78"
          badgeText="All Corridors"
          icon={CalendarRange}
          variant="info"
          subtext="Monthly allocation roster"
        />

        <KPICard
          title="Integrated Shadow Blocks"
          value="54"
          badgeText="69% Multi-Dept"
          icon={Layers}
          variant="success"
          subtext="Zero passenger disruption"
        />

        <KPICard
          title="Critical Maintenance"
          value="19"
          badgeText="Track & OHE"
          icon={Zap}
          variant="warning"
          subtext="G&SR Zero SLA breach"
        />

        <KPICard
          title="Expected Availability"
          value="95.4%"
          badgeText="Target > 95%"
          icon={Gauge}
          variant="success"
          subtext="Corridor infrastructure uptime"
        />
      </div>

      {/* Filter & Month Navigation Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth('August 2026')}
            className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <span className="font-extrabold text-sm text-slate-900 font-mono px-3 py-1 bg-slate-100 rounded-md border border-slate-200">
            {currentMonth}
          </span>
          <button
            onClick={() => setCurrentMonth('October 2026')}
            className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <select
            value={selectedCorridor}
            onChange={e => setSelectedCorridor(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-railway-navy text-slate-800"
          >
            <option value="ALL">All Corridors (HWH – BWN – DGR – ASN)</option>
            <option value="HWH-BWN">Howrah – Bardhaman (Quadruple Line)</option>
            <option value="BWN-DGR">Bardhaman – Durgapur Section</option>
            <option value="DGR-ASN">Durgapur – Asansol Section</option>
          </select>

          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-railway-navy text-slate-800"
          >
            <option value="ALL">All Controlling Departments</option>
            <option value="Engineering">Engineering (P-Way / Track TMS)</option>
            <option value="S&T">S&T (Signals & SMMS)</option>
            <option value="Traction">Traction (25kV OHE TDMS)</option>
          </select>
        </div>
      </div>

      {/* Month Calendar Grid (30 Day Blocks) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Calendar Header Bar */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-railway-gold" />
            <span className="font-bold uppercase tracking-wider">
              {currentMonth} DAY-BY-DAY CORRIDOR OCCUPANCY & MAINTENANCE ROSTER
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Joint Possession
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Single Track
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Free Flow
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {days.map(d => {
              const hasIntegratedBlock = d % 3 === 0 || d === 12 || d === 14;
              const hasSingleBlock = d % 2 === 0;
              const isToday = d === 12;

              return (
                <div
                  key={d}
                  className={`p-3 rounded-lg border min-h-[105px] flex flex-col justify-between transition-all hover:shadow-xs ${
                    isToday
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/30 shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-mono font-bold ${isToday ? 'text-blue-700' : 'text-slate-800'}`}>
                      Sep {d}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded font-mono">
                        TODAY
                      </span>
                    )}
                  </div>

                  <div className="my-1.5 space-y-1">
                    {hasIntegratedBlock ? (
                      <div className="p-1.5 rounded bg-purple-100 text-purple-950 text-[10px] font-bold truncate border border-purple-200">
                        ⚡ Joint Block (3 Depts)
                      </div>
                    ) : hasSingleBlock ? (
                      <div className="p-1.5 rounded bg-blue-100 text-blue-950 text-[10px] font-semibold truncate border border-blue-200">
                        🔧 Track Tamping (TMS)
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-400 italic py-1">
                        Clear corridor
                      </div>
                    )}
                  </div>

                  <div className="text-[9px] text-slate-500 font-mono flex items-center justify-between pt-1.5 border-t border-slate-200">
                    <span className="font-semibold">Window: {hasIntegratedBlock ? '120m' : hasSingleBlock ? '60m' : '0m'}</span>
                    <span className="text-emerald-700 font-bold">{hasIntegratedBlock ? '92% util' : ''}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divisional Target Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">
              Railway Board Operating Directive: All major corridor possessions require 72h advance notice to COA.
            </span>
          </div>
          <div className="font-mono text-[11px] font-bold text-railway-navy">
            Monthly Target Compliance: 98.2%
          </div>
        </div>
      </div>
    </div>
  );
};
