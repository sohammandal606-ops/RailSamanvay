import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
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
  Check
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
        <p>Block plan not found.</p>
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
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/approval')}
            className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-railway-navy text-white px-2.5 py-0.5 rounded">
                {plan.id}
              </span>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Plan Verification & Formal Clearance
              </h1>
              <StatusBadge status={plan.status} variant="approvalStatus" size="sm" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Corridor: {plan.corridor} • Date: {plan.date}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {plan.status === 'Pending Approval' ? (
            <>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Cancel Edit' : 'Modify Slot'}</span>
              </button>

              <button
                onClick={() => {
                  rejectBlockPlan(plan.id);
                  navigate('/approval');
                }}
                className="px-3.5 py-2 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Plan</span>
              </button>

              <button
                onClick={() => {
                  approveBlockPlan(plan.id);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Authorize Block Clearance</span>
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

      {/* Edit Mode Panel (If activated) */}
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

      {/* Sections A to F in Structured Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Section A, B, C */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION A: Block Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">A</span>
              Block Information & Corridor Telemetry
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
                <span className="text-slate-500 block">Scheduled Slot & Duration</span>
                <span className="font-mono font-bold text-blue-700 text-xs mt-1 block">
                  {plan.startTime} – {plan.endTime} ({plan.durationMin} Mins)
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Block Type</span>
                <span className="font-bold text-purple-800 text-xs mt-1 block">
                  Integrated Multi-Department Shadow Block
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Participating Depts</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {plan.departments.map(d => (
                    <StatusBadge key={d} status={d} variant="department" size="sm" />
                  ))}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Safety Protocol</span>
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
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">B</span>
                Coordinated Maintenance Activities ({linkedTasks.length} Tasks)
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
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">C</span>
              Train Timetable Interaction & Mitigation Analysis (COA)
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
                      Scheduled Window: <span className="font-mono font-semibold">{tc.scheduledTime}</span>
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
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
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">D</span>
              Railway Domain Rule Engine Validation
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
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">E</span>
              AI Efficiency & Asset Impact
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
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">F</span>
              Approval & Audit Trail
            </h3>

            <div className="space-y-3 text-xs border-l-2 border-blue-500 pl-3 ml-1">
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
