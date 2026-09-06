import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
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
  RotateCcw
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Human-in-the-Loop Block Approval Queue
            </h1>
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
              {pendingCount} Awaiting Authorization
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            "AI recommends. Railway authorities validate." • Indian Railways General & Subsidiary Rules (G&SR) Enforced
          </p>
        </div>

        {/* Filter Status Switcher */}
        <div className="flex items-center gap-1 sm:gap-2 bg-white p-1 rounded-lg border border-slate-200 text-xs overflow-x-auto max-w-full shrink-0">
          {(['ALL', 'Pending Approval', 'Approved', 'Rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap text-xs ${
                filterStatus === st
                  ? 'bg-railway-navy text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'ALL' ? 'All Plans' : st}
            </button>
          ))}
        </div>
      </div>

      {/* ─── PROMINENT HITL NOTICE ─── */}
      <div className="bg-red-500/5 border border-red-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertOctagon className="w-6 h-6 text-red-400 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <p className="font-bold text-red-300 text-sm mb-1">⚠️ Human-in-the-Loop Authorization Mandatory</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">AI MUST NOT automatically approve any railway block.</strong>{' '}
              All AI-generated block plans are <em>recommendations only</em>. Final authorization — granting electronic line clear,
              power isolation, or corridor possession — <strong className="text-amber-300">must be performed by an authorized Railway Officer</strong>{' '}
              (Section Controller or Traction Power Controller) after human review.
              This safeguard is enforced under Indian Railways G&SR Rules and cannot be bypassed.
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
                  ? 'border-amber-300 ring-1 ring-amber-400/30'
                  : plan.status === 'Approved'
                  ? 'border-emerald-300'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header Bar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold text-sm bg-railway-navy text-white px-3 py-1 rounded-md">
                    {plan.id}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{plan.corridor}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Date: {plan.date} • Window: {plan.startTime} – {plan.endTime} IST ({plan.durationMin} min)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={plan.status} variant="approvalStatus" size="md" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* Meta Attributes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Coordinated Depts</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {plan.departments.map(d => (
                        <StatusBadge key={d} status={d} variant="department" size="sm" />
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Merged Tasks</span>
                    <span className="font-mono font-bold text-slate-900 text-sm block mt-1">
                      {plan.tasksCount} Tasks
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">AI Confidence</span>
                    <span className="font-mono font-bold text-blue-700 text-sm block mt-1">
                      {plan.aiConfidence}%
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Block Utilization</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm block mt-1">
                      {plan.blockUtilization}%
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Asset Downtime</span>
                    <span className="font-mono font-bold text-slate-900 text-sm block mt-1">
                      {plan.estimatedAssetDowntimeMin} Mins
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Train Impact</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm block mt-1">
                      {plan.trainImpact}
                    </span>
                  </div>
                </div>

                {/* AI Reasoning Section */}
                <div className="p-3.5 bg-blue-50/50 rounded-lg border border-blue-100 text-xs text-slate-800">
                  <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1">
                    <BrainCircuit className="w-4 h-4 text-blue-600" />
                    AI Optimization Reasoning
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {plan.aiReasoning.summary} {plan.aiReasoning.coordinationRationale}
                  </p>
                  <div className="mt-2 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Net Gain: {plan.aiReasoning.savingsAnalysis}</span>
                  </div>
                </div>

                {/* Safety Rule Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-4 text-[11px] font-semibold">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Safety Validation: {plan.safetyValidation}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Rule Engine: {plan.ruleValidation}
                    </span>
                  </div>

                  <Link
                    to={`/approval/${plan.id}`}
                    className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                  >
                    <span>View Comprehensive Audit & Timetable Conflict Analysis</span>
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
                    <span>Modify</span>
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
                        <span>Authorize Block Plan</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ─── EXECUTION STATUS TRACKER ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-blue-400" />
          Execution Status Tracker
        </h2>
        <div className="space-y-3">
          {executionRecords.map(er => (
            <div key={er.blockId} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div>
                  <p className="font-mono font-bold text-slate-200 text-sm">{er.blockId}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{er.corridor}</p>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                  er.executionStatus === 'Safety Sign-off Done' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                  er.executionStatus === 'Block In Progress' ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' :
                  er.executionStatus === 'Delayed' ? 'bg-red-500/10 text-red-300 border-red-500/30' :
                  'bg-slate-600/50 text-slate-300 border-slate-600'
                }`}>
                  {er.executionStatus}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                <div>
                  <p className="text-slate-400">Planned</p>
                  <p className="text-slate-200 font-mono">{er.plannedStart} – {er.plannedEnd}</p>
                </div>
                <div>
                  <p className="text-slate-400">Actual Start</p>
                  <p className="text-slate-200 font-mono">{er.actualStart || '—'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Authorized by</p>
                  <p className="text-slate-200 font-semibold">{er.authorizedOfficer}</p>
                </div>
                <div>
                  <p className="text-slate-400">Safety Sign-off</p>
                  <p className={`font-semibold ${
                    er.safetySignOffStatus === 'Verified by S&T & ENG' ? 'text-emerald-300' :
                    er.safetySignOffStatus === 'Overdue' ? 'text-red-300' : 'text-amber-300'
                  }`}>{er.safetySignOffStatus}</p>
                </div>
              </div>
              {/* Work completion bar */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      er.workCompletionPct === 100 ? 'bg-emerald-400' :
                      er.workCompletionPct > 50 ? 'bg-blue-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${er.workCompletionPct}%` }}
                  />
                </div>
                <span className="text-slate-300 font-mono font-bold w-10 text-right">{er.workCompletionPct}%</span>
              </div>
              {er.executionStatus === 'Block In Progress' && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => updateExecutionStatus(er.blockId, 'Completed')}
                    className="px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => updateExecutionStatus(er.blockId, 'Safety Sign-off Done')}
                    className="px-3 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Safety Sign-off
                  </button>
                </div>
              )}
              <p className="text-[11px] text-slate-500 mt-2 italic">{er.notes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── REJECTED DECISIONS WITH RE-PLAN ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <XCircle className="w-4 h-4 text-red-400" />
          Rejected Decisions — Human Override Log
        </h2>
        {rejectedDecisions.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">No rejections logged.</p>
        ) : (
          <div className="space-y-3">
            {rejectedDecisions.map(r => (
              <div key={r.id} className="bg-slate-800/60 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-mono font-bold text-slate-200 text-sm">{r.blockId}</p>
                    <p className="text-xs text-slate-400">{r.corridor}</p>
                    <p className="text-xs text-red-300 mt-1">
                      <strong>Rejection Reason:</strong> {r.rejectionReason}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Rejected by: {r.rejectedBy} • {r.timestamp}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[11px] px-2.5 py-1 rounded border font-bold ${
                      r.replanStatus === 'Re-Optimized' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                      r.replanStatus === 'Cancelled' ? 'bg-slate-600/50 text-slate-400 border-slate-600' :
                      'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}>
                      {r.replanStatus}
                    </span>
                    {r.replanStatus === 'Awaiting Re-Plan' && (
                      <button
                        onClick={() => replanRejectedBlock(r.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Re-Plan with CP-SAT
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── PLAN FEEDBACK LOOP ─── */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          Execution Feedback Loop — Model Calibration Inputs
        </h2>
        {planFeedback.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">No feedback submitted yet.</p>
        ) : (
          <div className="space-y-3">
            {planFeedback.map(fb => (
              <div key={fb.id} className="bg-slate-800/60 border border-purple-500/20 rounded-lg p-4 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <span className="font-mono font-bold text-slate-200">{fb.blockId}</span>
                    <span className="text-slate-400 ml-2">• Submitted by: {fb.submittedBy}</span>
                    <span className="text-slate-500 ml-2">{fb.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      fb.wasTimingAccurate ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      Timing: {fb.wasTimingAccurate ? 'Accurate' : 'Inaccurate'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      fb.disruptionLevel === 'None' || fb.disruptionLevel === 'Minimal' ? 'bg-emerald-500/20 text-emerald-300' :
                      fb.disruptionLevel === 'Severe' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      Disruption: {fb.disruptionLevel}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 italic">"{fb.notes}"</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
          <p className="text-[11px] text-slate-400">
            <strong className="text-slate-300">Feedback Loop:</strong> Execution outcome data is stored and will be used by the AI engine for future weight calibration — improving Urgency and Priority score accuracy over time.
          </p>
        </div>
      </div>

    </div>
  );
};
