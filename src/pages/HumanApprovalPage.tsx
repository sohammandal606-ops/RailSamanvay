import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { GovEmblem } from '../components/common/GovEmblem';
import { OfficialStamp } from '../components/common/OfficialStamp';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Edit3,
  BrainCircuit,
  Clock,
  MapPin,
  Train,
  Layers,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  AlertOctagon,
  UserCheck,
  RefreshCw,
  Activity,
  MessageSquare,
  RotateCcw,
  FileText,
  FileCheck
} from 'lucide-react';

export const HumanApprovalPage: React.FC = () => {
  const {
    blockPlans,
    approveBlockPlan,
    rejectBlockPlan,
    modifyBlockPlan,
    showToast,
    executionRecords,
    rejectedDecisions,
    planFeedback,
    replanRejectedBlock,
    updateExecutionStatus
  } = useRailway();

  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredPlans = blockPlans.filter(p => {
    if (filterStatus === 'ALL') return true;
    return p.status === filterStatus;
  });

  const pendingCount = blockPlans.filter(p => p.status === 'Pending Approval').length;

  return (
    <div className="space-y-6">
      {/* Official Government Sanction Desk Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Sanctioning Authority Desk (Sr. DOM / Section Controller)
              </h1>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                {pendingCount} Awaiting Authorization
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              "AI recommends. Railway authorities validate." • Indian Railways General & Subsidiary Rules (G&SR 1968) Enforced
            </p>
          </div>
        </div>

        {/* Filter Status Switcher */}
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs overflow-x-auto max-w-full shrink-0">
          {(['ALL', 'Pending Approval', 'Approved', 'Rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap text-xs ${
                filterStatus === st
                  ? 'bg-railway-navy text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'ALL' ? 'All Requisitions' : st}
            </button>
          ))}
        </div>
      </div>

      {/* ─── PROMINENT HITL STATUTORY SAFEGUARD NOTICE ─── */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertOctagon className="w-6 h-6 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <p className="font-bold text-slate-900 text-sm mb-1">
              ⚠️ Statutory Indian Railways G&SR Rule 1968 Human-in-the-Loop Mandate
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900">AI MUST NOT automatically approve any railway corridor possession or power block.</strong>{' '}
              All AI-generated block proposals are <em>recommendations only</em>. Final authorization — granting electronic line clear,
              traction power isolation (TPC), or section possession — <strong className="text-amber-800 font-bold">must be validated by an authorized Railway Officer</strong>{' '}
              (Section Controller or Sr. Divisional Operations Manager) after safety verification.
              This safeguard is mandatory under Indian Railways Operating Code and cannot be bypassed.
            </p>
          </div>
        </div>
      </div>

      {/* Block Plan Cards Grid */}
      <div className="space-y-6">
        {filteredPlans.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            No block plans match the selected filter.
          </div>
        ) : (
          filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md ${
                plan.status === 'Pending Approval'
                  ? 'border-amber-400 ring-1 ring-amber-400/30'
                  : plan.status === 'Approved'
                  ? 'border-emerald-400'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header Bar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold text-sm bg-railway-navy text-white px-3 py-1 rounded-md">
                    FORM G-48: {plan.id}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{plan.corridor}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Possession Window: {plan.date} • {plan.startTime} – {plan.endTime} IST ({plan.durationMin} min)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <OfficialStamp
                    status={plan.status as any}
                    officerTitle="SR. DIVISIONAL OPERATIONS MANAGER"
                    sanctionRef={plan.id}
                    size="sm"
                  />
                  <StatusBadge status={plan.status} variant="approvalStatus" size="md" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* Meta Attributes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Coordinated Branches</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {plan.departments.map(d => (
                        <StatusBadge key={d} status={d} variant="department" size="sm" />
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Merged Tasks</span>
                    <span className="font-mono font-bold text-slate-900 text-sm block mt-1">
                      {plan.tasksCount} Joint Tasks
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">CP-SAT Confidence</span>
                    <span className="font-mono font-bold text-blue-700 text-sm block mt-1">
                      {plan.aiConfidence}%
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Block Utilization</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm block mt-1">
                      {plan.blockUtilization}%
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Asset Downtime</span>
                    <span className="font-mono font-bold text-slate-900 text-sm block mt-1">
                      {plan.estimatedAssetDowntimeMin} Mins
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Passenger Impact</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm block mt-1">
                      {plan.trainImpact}
                    </span>
                  </div>
                </div>

                {/* AI Reasoning Section */}
                <div className="p-3.5 bg-blue-50/50 rounded-lg border border-blue-200 text-xs text-slate-800">
                  <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1">
                    <BrainCircuit className="w-4 h-4 text-blue-600" />
                    CP-SAT Optimization Rationale & Safety Justification
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {plan.aiReasoning.summary} {plan.aiReasoning.coordinationRationale}
                  </p>
                  <div className="mt-2 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Net Railway Benefit: {plan.aiReasoning.savingsAnalysis}</span>
                  </div>
                </div>

                {/* Safety Rule Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-4 text-[11px] font-semibold">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      G&SR Headway Verification: {plan.safetyValidation}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Station Master Rule Check: {plan.ruleValidation}
                    </span>
                  </div>

                  <Link
                    to={`/approval/${plan.id}`}
                    className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1"
                  >
                    <span>Open Form G-48 Clearance Form & Timetable Conflicts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 font-mono">
                  {plan.history[plan.history.length - 1]?.action} by {plan.history[plan.history.length - 1]?.actor}
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => navigate(`/approval/${plan.id}`)}
                    className="flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-98"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Inspect / Modify</span>
                  </button>

                  {plan.status === 'Pending Approval' && (
                    <>
                      <button
                        onClick={() => rejectBlockPlan(plan.id, 'Operating timetable slack conflict')}
                        className="flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => approveBlockPlan(plan.id)}
                        className="w-full sm:w-auto sm:flex-initial px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
                      >
                        <Check className="w-4 h-4" />
                        <span>Sanction Block (Sr. DOM)</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ─── LIVE EXECUTION & SAFETY SIGN-OFF TRACKER ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-emerald-400" />
          Real-time Section Block Possession & Safety Sign-off Register
        </h2>
        <div className="space-y-3">
          {executionRecords.map(er => (
            <div key={er.blockId} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div>
                  <p className="font-mono font-bold text-slate-200 text-sm">FORM G-48: {er.blockId}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{er.corridor}</p>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                  er.executionStatus === 'Safety Sign-off Done' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-mono' :
                  er.executionStatus === 'Block In Progress' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 font-mono' :
                  er.executionStatus === 'Delayed' ? 'bg-red-500/20 text-red-300 border-red-500/40 font-mono' :
                  'bg-slate-700/50 text-slate-300 border-slate-600 font-mono'
                }`}>
                  {er.executionStatus}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                <div>
                  <p className="text-slate-400">Scheduled Possession</p>
                  <p className="text-slate-200 font-mono">{er.plannedStart} – {er.plannedEnd}</p>
                </div>
                <div>
                  <p className="text-slate-400">Actual Line Clear</p>
                  <p className="text-slate-200 font-mono">{er.actualStart || '—'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Sanctioning Officer</p>
                  <p className="text-slate-200 font-bold">{er.authorizedOfficer}</p>
                </div>
                <div>
                  <p className="text-slate-400">Joint Safety Sign-off</p>
                  <p className="text-slate-200 font-mono text-[11px] text-emerald-400">{er.safetySignOffStatus}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700 flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Operational Log: </span>{er.notes}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateExecutionStatus(er.blockId, 'Block In Progress')}
                    className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    Grant Line Possession
                  </button>
                  <button
                    onClick={() => updateExecutionStatus(er.blockId, 'Safety Sign-off Done')}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    Joint Safety Sign-off
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
