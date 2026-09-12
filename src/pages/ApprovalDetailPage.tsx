import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { GovEmblem } from '../components/common/GovEmblem';
import { OfficialStamp } from '../components/common/OfficialStamp';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Edit3,
  BrainCircuit,
  Clock,
  Train,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  History,
  FileCheck,
  Zap,
  Radio,
  Layers,
  Check,
  Printer,
  FileText
} from 'lucide-react';

export const ApprovalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blockPlans, tasks, approveBlockPlan, rejectBlockPlan, modifyBlockPlan, showToast } = useRailway();

  const plan = blockPlans.find(p => p.id === id) || blockPlans[0];

  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState(plan?.startTime || '10:00');
  const [endTime, setEndTime] = useState(plan?.endTime || '12:00');
  const [durationMin, setDurationMin] = useState(plan?.durationMin || 120);

  if (!plan) {
    return (
      <div className="p-8 text-center text-slate-600">
        <p>Block requisition plan not found.</p>
        <Link to="/approval" className="text-blue-600 underline text-xs mt-2 block">
          Back to Approval Queue
        </Link>
      </div>
    );
  }

  const linkedTasks = tasks.filter(t => plan.taskIds.includes(t.id));

  const handleSaveModification = () => {
    modifyBlockPlan(plan.id, {
      startTime,
      endTime,
      durationMin: Number(durationMin)
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Official Government Form G-48 Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/approval')}
            className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
            title="Back to Sanctions Queue"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <GovEmblem size="md" variant="gold" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold bg-railway-navy text-white px-2.5 py-0.5 rounded">
                FORM G-48: {plan.id}
              </span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Official Block Sanction & Line Clear Clearance Dossier
              </h1>
              <StatusBadge status={plan.status} variant="approvalStatus" size="sm" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Corridor Sector: {plan.corridor} • Date of Possession: {plan.date} • G&SR Rule 1968 Compliant
            </p>
          </div>
        </div>

        {/* Action Buttons & Stamp */}
        <div className="flex items-center gap-2 flex-wrap">
          <OfficialStamp
            status={plan.status as any}
            officerTitle="SR. DIVISIONAL OPERATIONS MANAGER"
            sanctionRef={plan.id}
            size="sm"
          />

          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5"
            title="Print Official Form G-48"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print G-48</span>
          </button>

          {plan.status === 'Pending Approval' ? (
            <>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Cancel Edit' : 'Adjust Slot'}</span>
              </button>

              <button
                onClick={() => {
                  rejectBlockPlan(plan.id);
                  navigate('/approval');
                }}
                className="px-3.5 py-2 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>

              <button
                onClick={() => {
                  approveBlockPlan(plan.id);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Authorize Block Clearance (DSC Sign)</span>
              </button>
            </>
          ) : (
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Status: {plan.status}</span>
            </div>
          )}
        </div>
      </div>

      {/* HITL Mandatory Regulatory Notice */}
      <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/20 text-red-700 rounded-lg shrink-0">
            <ShieldCheck className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-900 flex items-center gap-2">
              <span>Human-In-The-Loop (HITL) Formal Authorization Protocol</span>
              <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase">
                Mandatory Safety Gate
              </span>
            </h4>
            <p className="text-xs text-red-700 mt-0.5">
              Automated execution without officer sign-off is strictly prohibited. AI recommendation engines (OR-Tools CP-SAT) generate conflict-free candidate slots; final possession authority rests exclusively with the Chief Section Controller.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-red-800 bg-red-100 px-3 py-1 rounded-lg shrink-0 border border-red-200 hidden md:block">
          Engine: {plan.optimizationEngine || 'OR-Tools CP-SAT'}
        </span>
      </div>

      {/* Alternative Block Window Suggestion */}
      {(plan.alternativeBlockWindow || plan.id === 'BLK-2026-0912-004') && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg shrink-0">
              <Zap className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                  CP-SAT Alternative Recommended Window
                </h4>
                <span className="text-[10px] font-bold bg-indigo-200 text-indigo-800 px-1.5 py-0.5 rounded">
                  0 Train Conflict Slot
                </span>
              </div>
              <p className="text-xs text-indigo-800 mt-0.5">
                Recommended Slot: <strong className="font-mono">14:00 – 16:00</strong> (Post-peak traffic window with zero Rajdhani/Freight headways and optimal crew availability).
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setStartTime('14:00');
              setEndTime('16:00');
              modifyBlockPlan(plan.id, { startTime: '14:00', endTime: '16:00', durationMin: 120 });
              showToast('Switched to CP-SAT optimal window (14:00 - 16:00)', 'success');
            }}
            className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
          >
            Apply 14:00 – 16:00 Window
          </button>
        </div>
      )}

      {/* Edit Mode Panel */}
      {isEditing && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 animate-in slide-in-from-top duration-200">
          <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
            Modify Block Window Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Start Time</label>
              <input
                type="text"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">End Time</label>
              <input
                type="text"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Duration (Min)</label>
              <input
                type="number"
                value={durationMin}
                onChange={e => setDurationMin(Number(e.target.value))}
                className="w-full text-xs font-mono px-3 py-1.5 bg-white border border-slate-300 rounded"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-xs text-slate-600 bg-white border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveModification}
              className="px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Save & Re-evaluate Rules
            </button>
          </div>
        </div>
      )}

      {/* Multi-Factor Operational Distinction Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-purple-600" />
              Multi-Factor Operational Matrix (Exact Formulas & Sub-Metric Decomposition)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Explicit distinction across Safety Criticality, Demand Urgency, Asset Availability Impact, and Priority Score.
            </p>
          </div>
          <span className="text-[10px] font-mono bg-purple-50 text-purple-700 border border-purple-200 px-2 py-1 rounded font-bold">
            Task Evaluation: ENG-1042
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* 1. Safety Criticality */}
          <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-3.5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-rose-950 uppercase tracking-wider text-[11px]">Safety Criticality</span>
              <span className="font-mono font-extrabold text-base text-rose-700">92/100</span>
            </div>
            <p className="text-[10px] text-rose-800">Intrinsic structural failure risk & derailment potential</p>
            <div className="space-y-1 pt-1 text-[11px] text-rose-900 font-mono">
              <div className="flex justify-between"><span>Defect Severity (40%):</span><strong>30 pts</strong></div>
              <div className="flex justify-between"><span>Track Class & Speed (30%):</span><strong>25 pts</strong></div>
              <div className="flex justify-between"><span>Traffic Density GMT (20%):</span><strong>20 pts</strong></div>
              <div className="flex justify-between"><span>Passenger Risk (10%):</span><strong>17 pts</strong></div>
            </div>
          </div>

          {/* 2. Urgency Breakdown */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-950 uppercase tracking-wider text-[11px]">Demand Urgency</span>
              <span className="font-mono font-extrabold text-base text-amber-700">81/100</span>
            </div>
            <p className="text-[10px] text-amber-800">Time-sensitive escalation & statutory deadlines</p>
            <div className="space-y-1 pt-1 text-[11px] text-amber-900 font-mono">
              <div className="flex justify-between"><span>Days Since Detection (35%):</span><strong>30 pts</strong></div>
              <div className="flex justify-between"><span>Regulatory Mandate (25%):</span><strong>20 pts</strong></div>
              <div className="flex justify-between"><span>Speed Restriction (20%):</span><strong>16 pts</strong></div>
              <div className="flex justify-between"><span>Weather / Seasonal (20%):</span><strong>15 pts</strong></div>
            </div>
          </div>

          {/* 3. Availability Impact */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-blue-950 uppercase tracking-wider text-[11px]">Availability Impact</span>
              <span className="font-mono font-extrabold text-base text-blue-700">78/100</span>
            </div>
            <p className="text-[10px] text-blue-800">Infrastructure availability & corridor throughput</p>
            <div className="space-y-1 pt-1 text-[11px] text-blue-900 font-mono">
              <div className="flex justify-between"><span>Line Availability:</span><strong>94% → 98%</strong></div>
              <div className="flex justify-between"><span>Estimated Downtime:</span><strong>120 min</strong></div>
              <div className="flex justify-between"><span>Speed Restriction:</span><strong>45 km/h</strong></div>
              <div className="flex justify-between"><span>Throughput Gain:</span><strong>+4.2%</strong></div>
            </div>
          </div>

          {/* 4. Priority Score */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px]">Priority Score</span>
              <span className="font-mono font-extrabold text-base text-emerald-700">85/100</span>
            </div>
            <p className="text-[10px] text-emerald-800">Composite scheduling weight for CP-SAT solver</p>
            <div className="space-y-1 pt-1 text-[11px] text-emerald-900 font-mono">
              <div className="flex justify-between"><span>Formula:</span><strong>0.35C + 0.30U</strong></div>
              <div className="flex justify-between"><span>Availability Factor:</span><strong>+ 0.20A</strong></div>
              <div className="flex justify-between"><span>Resource Synergy:</span><strong>+ 0.15R</strong></div>
              <div className="flex justify-between"><span>Solver Ranking:</span><strong className="text-emerald-800">Top 1st Priority</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections A to F in Structured Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Section A, B, C */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION A: Block Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-railway-navy text-white flex items-center justify-center text-[10px]">A</span>
              Form G-48 Block Information & Corridor Section
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Block Identification</span>
                <span className="font-mono font-bold text-slate-900 text-sm mt-1 block">{plan.id}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Corridor Section</span>
                <span className="font-bold text-slate-900 text-xs mt-1 block">{plan.corridor}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Possession Slot & Duration</span>
                <span className="font-mono font-bold text-blue-700 text-xs mt-1 block">
                  {plan.startTime} – {plan.endTime} ({plan.durationMin} Mins)
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Block Classification</span>
                <span className="font-bold text-purple-800 text-xs mt-1 block">
                  Synchronized Multi-Department Shadow Block
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Participating Branches</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {plan.departments.map(d => (
                    <StatusBadge key={d} status={d} variant="department" size="sm" />
                  ))}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Operating Safety Protocol</span>
                <span className="font-mono font-bold text-emerald-700 text-xs mt-1 block">
                  G&SR Rule 4.09 Compliant
                </span>
              </div>
            </div>
          </div>

          {/* SECTION B: Maintenance Activities */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-railway-navy text-white flex items-center justify-center text-[10px]">B</span>
                Coordinated Maintenance Activities ({linkedTasks.length} Requisitions)
              </span>
              <span className="text-slate-500 text-[11px] font-normal">TMS / SMMS / TDMS</span>
            </h3>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden text-xs">
              {linkedTasks.map((t) => (
                <div key={t.id} className="p-3 hover:bg-slate-50 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{t.id}</span>
                      <span className="font-mono text-blue-600">[{t.assetId}]</span>
                      <StatusBadge status={t.department} variant="department" size="sm" />
                      <StatusBadge status={t.criticality} variant="criticality" size="sm" />
                    </div>
                    <p className="font-semibold text-slate-800 mt-1">{t.defect}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{t.location} • {t.durationMin} mins required</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-slate-900 block">{t.aiUrgencyScore}/100</span>
                    <span className="text-[10px] text-slate-400">AI Urgency</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION C: Train Conflicts & Mitigations */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-railway-navy text-white flex items-center justify-center text-[10px]">C</span>
              Train Timetable Interaction & Caution Order Analysis (COA)
            </h3>

            <div className="space-y-2.5 text-xs">
              {plan.trainConflicts.map((tc, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Train className="w-4 h-4 text-blue-600" />
                      <span className="font-mono font-bold text-slate-900">{tc.trainNumber} - {tc.trainName}</span>
                      <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">{tc.trainType}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Scheduled Slot: <span className="font-mono font-semibold">{tc.scheduledTime}</span>
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                      Mitigation: {tc.mitigationAction}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Section D, E, F */}
        <div className="space-y-6">
          
          {/* SECTION D: Railway Rule Validation Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-railway-navy text-white flex items-center justify-center text-[10px]">D</span>
              Railway Operating Code Validation Checklist
            </h3>

            <div className="space-y-2.5 text-xs">
              {plan.validationRules.map((rule, idx) => (
                <div key={idx} className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{rule.name}</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-0.5 leading-snug pl-5.5">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION E: AI Optimization Score */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-railway-navy text-white flex items-center justify-center text-[10px]">E</span>
              CP-SAT Asset Impact & Operating Metrics
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-slate-600">Corridor Block Utilization</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">{plan.blockUtilization}%</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-slate-600">AI Confidence Rating</span>
                <span className="font-mono font-bold text-blue-700 text-sm">{plan.aiConfidence}%</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-slate-600">Asset Downtime Saved</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">180 Mins (-33%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Punctuality Risk Score</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">0.02 (Minimal)</span>
              </div>
            </div>
          </div>

          {/* SECTION F: Approval & Audit History */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-railway-navy text-white flex items-center justify-center text-[10px]">F</span>
              Official Audit Trail & Digital Signature Record
            </h3>

            <div className="space-y-3 text-xs border-l-2 border-blue-600 pl-3 ml-1">
              {plan.history.map((h, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span className="font-bold text-slate-700">{h.actor}</span>
                    <span>{h.timestamp}</span>
                  </div>
                  <p className="text-slate-800 font-semibold mt-0.5">{h.action}</p>
                  {h.notes && <p className="text-[11px] text-slate-500 italic mt-0.5">{h.notes}</p>}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
