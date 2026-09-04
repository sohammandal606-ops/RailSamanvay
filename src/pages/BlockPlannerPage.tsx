import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { useNavigate } from 'react-router-dom';
import {
  CalendarRange,
  Sparkles,
  Zap,
  Clock,
  Train,
  Wrench,
  Radio,
  Layers,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';

export const BlockPlannerPage: React.FC = () => {
  const {
    blockPlans,
    runAiOptimization,
    isOptimizing,
    approveBlockPlan,
    setIsEmergencyModalOpen
  } = useRailway();

  const navigate = useNavigate();

  const [planningHorizon, setPlanningHorizon] = useState<'Today' | 'This Week' | 'Next Week' | 'This Month'>('Today');
  const [selectedCorridor, setSelectedCorridor] = useState<string>('SEC-BWN-DGR');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-12');
  const [activeBlockDetailId, setActiveBlockDetailId] = useState<string>('BLK-2026-0912-004');

  const selectedPlan = blockPlans.find(p => p.id === activeBlockDetailId) || blockPlans[0];

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Interactive Block Planner (Gantt Matrix)
            </h1>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              CORE ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic timeline synchronization of Engineering, S&T, Traction maintenance with COA Train Timetables
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Flame className="w-4 h-4" />
            <span>Emergency Request</span>
          </button>

          <button
            onClick={runAiOptimization}
            disabled={isOptimizing}
            className="px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            <Zap className={`w-4 h-4 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Synthesizing Coordinated Blocks...' : 'Run AI Optimization'}</span>
          </button>
        </div>
      </div>

      {/* Top Controls Bar (Section 8 Requirement) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Planning Horizon */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-500 mb-1">
              Planning Horizon
            </label>
            <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-lg">
              {(['Today', 'This Week', 'Next Week', 'This Month'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setPlanningHorizon(h)}
                  className={`text-[11px] font-bold py-1 px-1.5 rounded text-center transition-all ${
                    planningHorizon === h
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {h.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-500 mb-1">
              Planning Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full text-xs font-mono font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Corridor Selector */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-500 mb-1">
              Railway Corridor Section
            </label>
            <select
              value={selectedCorridor}
              onChange={e => setSelectedCorridor(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="SEC-HWH-BWN">Howrah – Bardhaman (KM 0–95)</option>
              <option value="SEC-BWN-DGR">Bardhaman – Durgapur (KM 95–158)</option>
              <option value="SEC-DGR-ASN">Durgapur – Asansol (KM 158–200)</option>
              <option value="SEC-ASN-DHN">Asansol – Dhanbad (KM 200–260)</option>
            </select>
          </div>

          {/* Department Selector */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-500 mb-1">
              Department Overlay
            </label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="ALL">All Departments (Integrated View)</option>
              <option value="Engineering">Engineering (Track - TMS)</option>
              <option value="S&T">S&T (Signals - SMMS)</option>
              <option value="Traction">Traction (OHE - TDMS)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Gantt Timeline Visualizer */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900">
                Multi-Department Maintenance & Train Movement Matrix
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Coordinated Shadow Window Highlight: 10:00 – 12:00 IST (Triple Department Joint Block)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 font-mono font-bold">
              Integrated Window: 10:00 - 12:00
            </span>
          </div>
        </div>

        {/* Timeline Grid Container */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[850px] space-y-4">
            
            {/* Time Scale Header */}
            <div className="grid grid-cols-13 gap-1 text-center font-mono text-xs text-slate-500 border-b border-slate-200 pb-2">
              {timeSlots.map(time => (
                <div key={time} className="py-1">
                  <span className={time >= '10:00' && time <= '12:00' ? 'text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded' : ''}>
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Track 1: Engineering (TMS) */}
            <div className="flex items-center gap-3">
              <div className="w-32 text-xs font-bold text-blue-900 shrink-0 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-600" />
                <span>Engineering (Track)</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1 relative bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="col-start-1 col-span-3 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Track clear
                </div>
                {/* Coordinated Track Block: 10:00 - 12:00 (Starts index 4, span 2) */}
                <div
                  onClick={() => setActiveBlockDetailId('BLK-2026-0912-004')}
                  className="col-start-5 col-span-2 bg-blue-600 text-white rounded-md p-2 cursor-pointer hover:bg-blue-700 transition-all shadow-sm border border-blue-500 group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold">ENG-1042</span>
                    <span className="bg-blue-800/80 px-1 rounded">90 min</span>
                  </div>
                  <div className="text-[11px] font-bold mt-1 truncate">
                    Rail Renewal & Tamping
                  </div>
                  <div className="text-[9px] text-blue-200 mt-0.5">KM 142/6 • Shadow Active</div>
                </div>
                <div className="col-start-7 col-span-6 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Track clear
                </div>
              </div>
            </div>

            {/* Track 2: S&T (Signalling - SMMS) */}
            <div className="flex items-center gap-3">
              <div className="w-32 text-xs font-bold text-amber-900 shrink-0 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-600" />
                <span>S&T (Signals)</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1 relative bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="col-start-1 col-span-4 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Signals active
                </div>
                {/* S&T Block: 10:00 - 11:30 (Starts index 4, span 2) */}
                <div
                  onClick={() => setActiveBlockDetailId('BLK-2026-0912-004')}
                  className="col-start-5 col-span-2 bg-amber-600 text-white rounded-md p-2 cursor-pointer hover:bg-amber-700 transition-all shadow-sm border border-amber-500"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold">SIG-2041</span>
                    <span className="bg-amber-800/80 px-1 rounded">60 min</span>
                  </div>
                  <div className="text-[11px] font-bold mt-1 truncate">
                    Relay & Interlocking
                  </div>
                  <div className="text-[9px] text-amber-100 mt-0.5">KM 145/2 • Joint Shadow</div>
                </div>
                <div className="col-start-7 col-span-6 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Signals active
                </div>
              </div>
            </div>

            {/* Track 3: Traction (OHE - TDMS) */}
            <div className="flex items-center gap-3">
              <div className="w-32 text-xs font-bold text-purple-900 shrink-0 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-purple-600" />
                <span>Traction (OHE)</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1 relative bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="col-start-1 col-span-4 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Power 25kV Live
                </div>
                {/* Traction Block: 10:00 - 12:00 */}
                <div
                  onClick={() => setActiveBlockDetailId('BLK-2026-0912-004')}
                  className="col-start-5 col-span-2 bg-purple-600 text-white rounded-md p-2 cursor-pointer hover:bg-purple-700 transition-all shadow-sm border border-purple-500"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold">TRA-3022</span>
                    <span className="bg-purple-800/80 px-1 rounded">45 min</span>
                  </div>
                  <div className="text-[11px] font-bold mt-1 truncate">
                    OHE Stagger & Isolation
                  </div>
                  <div className="text-[9px] text-purple-200 mt-0.5">KM 141/8 • Power Cut</div>
                </div>
                <div className="col-start-7 col-span-6 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Power 25kV Live
                </div>
              </div>
            </div>

            {/* Track 4: Train Operations (COA) */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-32 text-xs font-bold text-slate-900 shrink-0 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600" />
                <span>Train Operations</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1 relative bg-slate-900 p-2 rounded-lg border border-slate-800 text-white text-xs">
                {/* 06:00 - 08:00 Trains */}
                <div className="col-span-2 bg-emerald-800/80 border border-emerald-600 rounded p-1.5 flex flex-col justify-center text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono">
                    <Train className="w-3 h-3" /> 22301 Vande Bharat
                  </div>
                </div>

                {/* 08:00 - 10:00 Trains */}
                <div className="col-span-2 bg-emerald-800/80 border border-emerald-600 rounded p-1.5 flex flex-col justify-center text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono">
                    <Train className="w-3 h-3" /> 12301 Rajdhani Ex
                  </div>
                </div>

                {/* 10:00 - 12:00 SHADOW BLOCK SLOT */}
                <div className="col-span-2 bg-slate-800 border-2 border-dashed border-amber-400 rounded p-1.5 flex flex-col items-center justify-center text-center">
                  <div className="text-[10px] font-bold text-amber-300 uppercase font-mono">
                    SHADOW BLOCK SLOT
                  </div>
                  <div className="text-[9px] text-slate-300">
                    BTPN Freight held in loop • Zero Pax penalty
                  </div>
                </div>

                {/* 12:00 - 14:00 Trains */}
                <div className="col-span-2 bg-emerald-800/80 border border-emerald-600 rounded p-1.5 flex flex-col justify-center text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono">
                    <Train className="w-3 h-3" /> 13029 Express
                  </div>
                </div>

                {/* 14:00 - 16:00 Trains */}
                <div className="col-span-2 bg-emerald-800/80 border border-emerald-600 rounded p-1.5 flex flex-col justify-center text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono">
                    <Train className="w-3 h-3" /> Coal BOXN Freight
                  </div>
                </div>

                {/* 16:00 - 18:00 Trains */}
                <div className="col-span-2 bg-emerald-800/80 border border-emerald-600 rounded p-1.5 flex flex-col justify-center text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono">
                    <Train className="w-3 h-3" /> EMU Suburban Fleet
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Coordinated Integrated Block Detail Banner (Section 8 Highlight) */}
        <div className="mt-6 p-5 bg-blue-50/80 rounded-xl border border-blue-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-blue-200/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs">
                {selectedPlan.id}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Integrated Coordinated Shadow Block (KM 140 – KM 146)
                  </h4>
                  <StatusBadge status={selectedPlan.status} variant="approvalStatus" size="sm" />
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Slot: {selectedPlan.startTime} – {selectedPlan.endTime} IST ({selectedPlan.durationMin} Mins) • Corridor: {selectedPlan.corridor}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/approval/${selectedPlan.id}`)}
                className="px-4 py-2 bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>Inspect Safety Rules & Validation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {selectedPlan.status === 'Pending Approval' && (
                <button
                  onClick={() => approveBlockPlan(selectedPlan.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Block Plan</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-slate-500 block">Block Utilization</span>
              <span className="font-mono font-bold text-slate-900 text-base mt-1 block">
                {selectedPlan.blockUtilization}%
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">+28% vs separate blocks</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-slate-500 block">Maintenance Tasks Merged</span>
              <span className="font-mono font-bold text-slate-900 text-base mt-1 block">
                {selectedPlan.tasksCount} Joint Tasks
              </span>
              <span className="text-[10px] text-blue-600 font-semibold">Engineering + S&T + OHE</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-slate-500 block">Corridor Asset Downtime</span>
              <span className="font-mono font-bold text-slate-900 text-base mt-1 block">
                {selectedPlan.estimatedAssetDowntimeMin} Minutes
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">Saved 180 min total</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-slate-500 block">Estimated Train Impact</span>
              <span className="font-mono font-bold text-emerald-700 text-base mt-1 block">
                Low / Mitigated
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">0 passenger detentions</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
