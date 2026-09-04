import React from 'react';
import { useRailway } from '../../context/RailwayContext';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Sparkles,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Clock,
  Gauge,
  Train,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface OptimizationResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OptimizationResultModal: React.FC<OptimizationResultModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { optimizationMetrics } = useRailway();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-railway-navy text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/20 border border-blue-400/30 text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">AI-Generated Block Optimization Result</h3>
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-400/30">
                  SOLVER COMPLETED
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-mono">
                Execution Time: 1,840ms • Last Run: {optimizationMetrics.lastRunTimestamp}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Objectives Banner */}
        <div className="bg-slate-50 border-b border-slate-200 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Multi-Objective Function Target
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-white p-2 rounded border border-slate-200 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Max Asset Availability</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white p-2 rounded border border-slate-200 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Min Asset Downtime</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white p-2 rounded border border-slate-200 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Min Train Disruption</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white p-2 rounded border border-slate-200 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Max Block Utilization</span>
            </div>
          </div>
        </div>

        {/* Content Comparison */}
        <div className="p-6 space-y-6">
          {/* Key Improvements Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-700 font-mono font-bold text-xl">
                <ArrowDownRight className="w-5 h-5" />
                33%
              </div>
              <div className="text-xs font-semibold text-emerald-900 mt-1">Asset Downtime</div>
              <div className="text-[10px] text-emerald-700">180 Mins Saved</div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-700 font-mono font-bold text-xl">
                <ArrowUpRight className="w-5 h-5" />
                +27%
              </div>
              <div className="text-xs font-semibold text-blue-900 mt-1">Block Utilization</div>
              <div className="text-[10px] text-blue-700">From 61% to 88%</div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-700 font-mono font-bold text-xl">
                <ArrowDownRight className="w-5 h-5" />
                38%
              </div>
              <div className="text-xs font-semibold text-purple-900 mt-1">Separate Closures</div>
              <div className="text-[10px] text-purple-700">8 Blocks → 5 Blocks</div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="rounded-lg border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Corridor Metric</th>
                  <th className="p-3 text-slate-500">Before Optimization (Silos)</th>
                  <th className="p-3 text-emerald-800 bg-emerald-50/50">After AI Optimization</th>
                  <th className="p-3 text-right">Net Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium text-slate-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    Separate Department Blocks
                  </td>
                  <td className="p-3 font-mono text-slate-600">8 Separate Blocks</td>
                  <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50/30">
                    5 Coordinated Blocks
                  </td>
                  <td className="p-3 font-mono text-right font-semibold text-emerald-600">
                    -3 Redundant Windows
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Total Corridor Asset Downtime
                  </td>
                  <td className="p-3 font-mono text-slate-600">540 Minutes (9.0 hrs)</td>
                  <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50/30">
                    360 Minutes (6.0 hrs)
                  </td>
                  <td className="p-3 font-mono text-right font-semibold text-emerald-600">
                    -180 Minutes (-33%)
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-800 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-slate-500" />
                    Corridor Block Utilization
                  </td>
                  <td className="p-3 font-mono text-slate-600">61% Efficiency</td>
                  <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50/30">
                    88% High Density
                  </td>
                  <td className="p-3 font-mono text-right font-semibold text-emerald-600">
                    +27% Utilization
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-800 flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-slate-500" />
                    Passenger Timetable Conflict
                  </td>
                  <td className="p-3 font-mono text-rose-600">4 Potential Conflicts</td>
                  <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50/30">
                    0 Passenger Punctuality Loss
                  </td>
                  <td className="p-3 font-mono text-right font-semibold text-emerald-600">
                    100% Mitigated
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Safety disclaimer */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Human-in-the-Loop Requirement: </span>
              AI recommendations have been generated and passed mathematical domain rule checks. Final authorization must be granted by authorized Section Controllers in the Approval Queue.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            *Simulation / Demo Data for Indian Railways Control Room
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/approval');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-railway-navy hover:bg-railway-slate rounded-md flex items-center gap-1.5 shadow-sm"
            >
              Review in Approval Queue
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
