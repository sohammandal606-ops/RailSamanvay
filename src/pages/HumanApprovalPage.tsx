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
  Check
} from 'lucide-react';

export const HumanApprovalPage: React.FC = () => {
  const {
    blockPlans,
    approveBlockPlan,
    rejectBlockPlan,
    modifyBlockPlan,
    showToast
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
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 text-xs">
          {(['ALL', 'Pending Approval', 'Approved', 'Rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
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

      {/* Safety Notice Banner */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-950">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Operating Authority Mandate: </span>
          AI mathematical models perform spatial clustering and timetable conflict checks. Prior to granting electronic line clear or traction power shutdown, authorized Section Controllers and Traction Power Controllers must review and formally authorize the coordinated block.
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

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/approval/${plan.id}`)}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Modify Parameters</span>
                  </button>

                  {plan.status === 'Pending Approval' && (
                    <>
                      <button
                        onClick={() => rejectBlockPlan(plan.id, 'Operating timetable slack conflict')}
                        className="px-3.5 py-1.5 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject Plan</span>
                      </button>

                      <button
                        onClick={() => approveBlockPlan(plan.id)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
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
    </div>
  );
};
