import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { GovEmblem } from '../components/common/GovEmblem';
import { OfficialStamp } from '../components/common/OfficialStamp';
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
  ArrowRight,
  FileText,
  FileCheck
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
      {/* Official Government Form G-48 Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Form G-48: Interactive Block Matrix
              </h1>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded border border-amber-300">
                G&SR RULE 1968
              </span>
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded border border-blue-300">
                FORM G-48 SANCTIONS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              भारतीय रेल ब्लॉक नियोजन प्रणाली • Dynamic timeline synchronization of Engineering, S&T, and Traction possessions with live COA train paths
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex-1 sm:flex-initial px-3.5 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all border border-red-800 active:scale-98 shrink-0"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Emergency Request</span>
          </button>

          <button
            onClick={runAiOptimization}
            disabled={isOptimizing}
            className="flex-1 sm:flex-initial px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all border border-slate-800 disabled:opacity-50 active:scale-98 shrink-0"
          >
            <Zap className={`w-4 h-4 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'CP-SAT Solving...' : 'Run CP-SAT Optimizer'}</span>
          </button>
        </div>
      </div>

      {/* Top Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Planning Horizon */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
              Planning Horizon
            </label>
            <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-lg">
              {(['Today', 'This Week', 'Next Week', 'This Month'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setPlanningHorizon(h)}
                  className={`text-[11px] font-bold py-1 px-1.5 rounded text-center transition-all ${
                    planningHorizon === h
                      ? 'bg-railway-navy text-white shadow-xs'
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
            <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
              Requisition Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full text-xs font-mono font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Corridor Selector */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
              Railway Section / Corridor
            </label>
            <select
              value={selectedCorridor}
              onChange={e => setSelectedCorridor(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="SEC-HWH-BWN">Howrah – Bardhaman (KM 0–95)</option>
              <option value="SEC-BWN-DGR">Bardhaman – Durgapur (KM 95–158)</option>
              <option value="SEC-DGR-ASN">Durgapur – Asansol (KM 158–200)</option>
              <option value="SEC-ASN-DHN">Asansol – Dhanbad (KM 200–260)</option>
            </select>
          </div>

          {/* Department Selector */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
              Operating Department Filter
            </label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="ALL">All Departments (Integrated View)</option>
              <option value="Engineering">Civil Engineering (TMS - Track)</option>
              <option value="S&T">Signal & Telecom (SMMS - S&T)</option>
              <option value="Traction">Electrical Traction (TDMS - OHE)</option>
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
                Multi-Department Block Coordination & Train Movement Matrix
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Coordinated Shadow Window Highlight: 10:00 – 12:00 IST (Triple Department Joint Block under Form G-48)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="sm:hidden text-[10px] text-blue-600 font-mono">
              ↔ Swipe timeline
            </span>
            <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-300 font-mono font-bold text-[11px] sm:text-xs">
              Synchronized Slot: 10:00 - 12:00 IST
            </span>
          </div>
        </div>

        {/* Timeline Grid Container */}
        <div className="overflow-x-auto pb-4 -mx-2 sm:mx-0 px-2 sm:px-0">
          <div className="min-w-[850px] space-y-4">
            
            {/* Time Scale Header */}
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              <div className="w-28 sm:w-32 text-xs font-mono font-bold text-slate-500 shrink-0">
                Railway Time (24h)
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1 text-center font-mono text-xs text-slate-600">
                {timeSlots.slice(0, 12).map((time) => {
                  const isWindow = time === '10:00' || time === '11:00';
                  return (
                    <div key={time} className="py-1">
                      <span className={isWindow ? 'text-blue-900 font-bold bg-blue-100 px-2 py-0.5 rounded border border-blue-300' : ''}>
                        {time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Track 1: Engineering (TMS) */}
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-32 text-xs font-bold text-blue-900 shrink-0 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-600" />
                <span>Civil Engg (TMS)</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1 relative bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="col-start-1 col-span-4 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Track Clear
                </div>
                {/* Coordinated Track Block: 10:00 - 12:00 */}
                <div
                  onClick={() => setActiveBlockDetailId('BLK-2026-0912-004')}
                  className="col-start-5 col-span-2 bg-blue-600 text-white p-2 rounded text-[11px] font-bold flex flex-col justify-center cursor-pointer shadow-sm hover:bg-blue-700 transition-colors border border-blue-500"
                >
                  <span className="font-mono">ENG-1042 / Tamping</span>
                  <span className="text-[9px] text-blue-200 font-normal">KM 142/12 - 142/20</span>
                </div>
                <div className="col-start-7 col-span-6 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Normal Speed (130 kmph)
                </div>
              </div>
            </div>

            {/* Track 2: S&T (SMMS) */}
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-32 text-xs font-bold text-amber-900 shrink-0 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-600" />
                <span>S&T (SMMS)</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1 relative bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="col-start-1 col-span-4 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Signals Normal
                </div>
                <div
                  onClick={() => setActiveBlockDetailId('BLK-2026-0912-004')}
                  className="col-start-5 col-span-2 bg-amber-600 text-white p-2 rounded text-[11px] font-bold flex flex-col justify-center cursor-pointer shadow-sm hover:bg-amber-700 transition-colors border border-amber-500"
                >
                  <span className="font-mono">SIG-3081 / Point #14</span>
                  <span className="text-[9px] text-amber-200 font-normal">Interlocking Overhaul</span>
                </div>
                <div className="col-start-7 col-span-6 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  Automatic Signaling Active
                </div>
              </div>
            </div>

            {/* Track 3: Traction (TDMS) */}
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-32 text-xs font-bold text-purple-900 shrink-0 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-purple-600" />
                <span>Traction (TDMS)</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1 relative bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="col-start-1 col-span-4 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  OHE Energized (25 kV)
                </div>
                <div
                  onClick={() => setActiveBlockDetailId('BLK-2026-0912-004')}
                  className="col-start-5 col-span-2 bg-purple-700 text-white p-2 rounded text-[11px] font-bold flex flex-col justify-center cursor-pointer shadow-sm hover:bg-purple-800 transition-colors border border-purple-600"
                >
                  <span className="font-mono">TRD-5502 / OHE Power</span>
                  <span className="text-[9px] text-purple-200 font-normal">Power Block Isolated</span>
                </div>
                <div className="col-start-7 col-span-6 text-slate-400 text-[10px] flex items-center justify-center font-mono italic">
                  25 kV AC Live
                </div>
              </div>
            </div>

            {/* Track 4: Train Timetable (COA) */}
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-32 text-xs font-bold text-slate-800 shrink-0 flex items-center gap-1.5">
                <Train className="w-4 h-4 text-emerald-600" />
                <span>COA Timetable</span>
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1 relative bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="col-start-1 col-span-2 bg-emerald-100 text-emerald-900 border border-emerald-300 p-1.5 rounded text-[10px] font-mono font-bold flex items-center justify-center truncate">
                  12301 Rajdhani
                </div>
                <div className="col-start-3 col-span-2 bg-emerald-100 text-emerald-900 border border-emerald-300 p-1.5 rounded text-[10px] font-mono font-bold flex items-center justify-center truncate">
                  22301 Vande Bharat
                </div>
                <div className="col-start-5 col-span-2 bg-blue-100 text-blue-900 border border-blue-300 p-1.5 rounded text-[10px] font-mono font-bold flex items-center justify-center text-center">
                  🛑 Line Block Possessed
                </div>
                <div className="col-start-7 col-span-2 bg-emerald-100 text-emerald-900 border border-emerald-300 p-1.5 rounded text-[10px] font-mono font-bold flex items-center justify-center truncate">
                  12313 Sealdah Raj
                </div>
                <div className="col-start-9 col-span-4 bg-slate-100 text-slate-700 p-1.5 rounded text-[10px] font-mono flex items-center justify-center">
                  Freight Path (BOXN)
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Selected Plan Details Card */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-200/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900">
                  {selectedPlan.id}
                </span>
                <StatusBadge status={selectedPlan.status} variant="approvalStatus" size="sm" />
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                  {selectedPlan.corridor}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Synchronized Slot: {selectedPlan.date} • {selectedPlan.startTime} to {selectedPlan.endTime} ({selectedPlan.durationMin} Minutes Possession)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <OfficialStamp
                status={selectedPlan.status as any}
                officerTitle="SR. DIVISIONAL OPERATIONS MANAGER"
                sanctionRef={selectedPlan.id}
                size="sm"
              />
              <button
                onClick={() => navigate(`/approval/${selectedPlan.id}`)}
                className="px-3 py-1.5 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold transition-all"
              >
                Open Formal Sanction Form
              </button>
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

        {/* OR-Tools CP-SAT Short-Term Solver Telemetry Panel */}
        <div className="mt-6 bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>OR-Tools CP-SAT Constraint Optimization Engine (Short-Term Solver)</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                    STATUS: OPTIMAL
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Multi-objective mathematical formulation for shadow block consolidation & timetable deconfliction
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
              G&SR Safety Parameters Enforced
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Solver Telemetry */}
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 space-y-2">
              <span className="font-bold text-purple-300 uppercase text-[10px] block">CP-SAT Solver Metrics</span>
              <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                <div className="flex justify-between"><span>Decision Variables:</span><strong className="text-white">1,480</strong></div>
                <div className="flex justify-between"><span>Linear Constraints:</span><strong className="text-white">3,920</strong></div>
                <div className="flex justify-between"><span>Solver Runtime:</span><strong className="text-emerald-400">42 ms</strong></div>
                <div className="flex justify-between"><span>Optimality Gap:</span><strong className="text-emerald-400">0.00%</strong></div>
                <div className="flex justify-between"><span>Alternative Slot:</span><strong className="text-indigo-300">14:00 – 16:00</strong></div>
              </div>
            </div>

            {/* Hard Constraints Enforced */}
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 uppercase text-[10px] block">Hard Domain Constraints Checked</span>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>Headway Separation (≥ 15 min buffer)</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>Spatial Machine Isolation (≥ 500m)</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>OHE Power Block Electrical Isolation</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>Crew Duty Limits (≤ 8h statutory limit)</span></div>
              </div>
            </div>

            {/* Multi-Objective Function */}
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 space-y-2">
              <span className="font-bold text-blue-300 uppercase text-[10px] block">Objective Weighting Formulation</span>
              <div className="p-2 bg-slate-900 rounded font-mono text-[10px] text-blue-200 leading-relaxed border border-slate-800">
                Min: 0.35·Downtime + 0.30·TrainDelay - 0.20·CriticalityScore - 0.15·ResourceSynergy
              </div>
              <p className="text-[10px] text-slate-400">
                Guarantees zero cancellation of premium Vande Bharat / Rajdhani services while maximizing engineering throughput.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
