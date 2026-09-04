import React from 'react';
import { MaintenanceTask } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  X,
  BrainCircuit,
  AlertTriangle,
  Clock,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useRailway } from '../../context/RailwayContext';
import { useNavigate } from 'react-router-dom';

interface TaskUrgencyDrawerProps {
  task: MaintenanceTask | null;
  onClose: () => void;
}

export const TaskUrgencyDrawer: React.FC<TaskUrgencyDrawerProps> = ({ task, onClose }) => {
  const { runAiOptimization, showToast } = useRailway();
  const navigate = useNavigate();

  if (!task) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300', label: 'CRITICAL PRIORITY' };
    if (score >= 75) return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-300', label: 'HIGH PRIORITY' };
    if (score >= 50) return { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-300', label: 'MEDIUM PRIORITY' };
    return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-300', label: 'ROUTINE PRIORITY' };
  };

  const scoreMeta = getScoreColor(task.aiUrgencyScore);

  const breakdownItems = [
    {
      label: 'Asset Criticality',
      score: task.breakdown.assetCriticality,
      max: 30,
      description: 'Route density classification, speed potential (130 kmph) & passenger train impact.',
      color: 'bg-red-500'
    },
    {
      label: 'Defect Severity',
      score: task.breakdown.defectSeverity,
      max: 25,
      description: 'Physical wear, acoustic/ultrasonic flaw echo magnitude, or insulation breakdown score.',
      color: 'bg-amber-500'
    },
    {
      label: 'Overdue Factor',
      score: task.breakdown.overdueFactor,
      max: 20,
      description: 'Days elapsed past scheduled inspection/overhaul cycle in TMS/SMMS/TDMS.',
      color: 'bg-purple-500'
    },
    {
      label: 'Anomaly Score (Isolation Forest)',
      score: task.breakdown.anomalyScore,
      max: 15,
      description: 'Statistical anomaly in defect recurring frequency over last 30 operational days.',
      color: 'bg-blue-500'
    },
    {
      label: 'Operational Impact Factor',
      score: task.breakdown.operationalImpact,
      max: 10,
      description: 'Impact on high-speed trains (Rajdhani, Vande Bharat) and freight paths.',
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end transition-all">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div>
          <div className="p-5 bg-railway-navy text-white flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 text-xs font-mono border border-blue-400/30">
                  {task.id}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                  Asset: {task.assetId}
                </span>
                <StatusBadge status={task.sourceSystem} variant="sourceSystem" size="sm" />
              </div>
              <h2 className="text-lg font-bold text-white mt-2 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-amber-400" />
                AI Maintenance Priority Analysis
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Meta Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Department</span>
              <div className="mt-1">
                <StatusBadge status={task.department} variant="department" size="sm" />
              </div>
            </div>
            <div>
              <span className="text-slate-500 block">Location (Chainage)</span>
              <span className="font-mono font-bold text-slate-800 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {task.location}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Est. Duration</span>
              <span className="font-mono font-bold text-slate-800 flex items-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {task.durationMin} Mins
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Big AI Urgency Score Hero */}
            <div className={`p-4 rounded-xl border ${scoreMeta.border} ${scoreMeta.bg} flex items-center justify-between`}>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Composite AI Urgency Score
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className={`text-4xl font-extrabold font-mono ${scoreMeta.text}`}>
                    {task.aiUrgencyScore}
                  </span>
                  <span className="text-lg text-slate-500 font-semibold">/ 100</span>
                </div>
                <div className={`mt-1 text-xs font-bold ${scoreMeta.text}`}>
                  {scoreMeta.label}
                </div>
              </div>
              <div className="text-right">
                <StatusBadge status={task.criticality} variant="criticality" size="lg" />
                <div className="mt-2 text-xs font-mono text-slate-500">
                  Due: {task.dueDate}
                </div>
              </div>
            </div>

            {/* Why was this task prioritized? */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-blue-600" />
                Why Was This Task Prioritized?
              </h3>
              <p className="text-xs leading-relaxed text-slate-700 mt-2">
                {task.aiExplanation}
              </p>
              {task.recommendedBlockWindow && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Recommended AI Slot:</span>
                  <span className="font-mono font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                    {task.recommendedBlockWindow}
                  </span>
                </div>
              )}
            </div>

            {/* Factor Breakdown */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Multi-Factor Urgency Breakdown</span>
                <span className="text-slate-400 font-normal">Weights Normalized</span>
              </h3>

              <div className="space-y-3.5">
                {breakdownItems.map((item, idx) => {
                  const percentage = Math.round((item.score / item.max) * 100);
                  return (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-800">{item.label}</span>
                        <span className="font-mono font-bold text-slate-900">
                          {item.score} <span className="text-slate-400 font-normal">/ {item.max}</span>
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Safety & Compliance Verification */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 text-xs text-emerald-950">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Railway Safety Compliance Rule
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Task satisfies General & Subsidiary Rules (G&SR) Chapter IV for block possession and required traction power isolation clearances.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
          >
            Close Panel
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                navigate('/planner');
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 flex items-center gap-1.5"
            >
              View in Planner
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onClose();
                runAiOptimization();
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-railway-navy hover:bg-railway-slate rounded-md flex items-center gap-1.5 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Re-optimize Corridor Block
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
