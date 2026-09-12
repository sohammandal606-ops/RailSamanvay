import React from 'react';
import { useRailway } from '../context/RailwayContext';
import { CorridorVisualizer } from '../components/common/CorridorVisualizer';
import { StatusBadge } from '../components/common/StatusBadge';
import { GovEmblem } from '../components/common/GovEmblem';
import {
  TrainTrack,
  Train,
  Wrench,
  Clock,
  ShieldAlert,
  Radio,
  Zap,
  Activity,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const CorridorStatusPage: React.FC = () => {
  const { corridors, runAiOptimization, isOptimizing, currentUser } = useRailway();

  return (
    <div className="space-y-6">
      {/* Official Government Corridor Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Railway Corridor Availability & Track Telemetry
              </h1>
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded border border-blue-300">
                LIVE SECTION BLOCK CIRCUITS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              भारतीय रेल ट्रैक एवं कॉरिडोर उपलब्धता स्थिति • Real-time line possession, train headway spacing, and caution order speed restrictions across {currentUser.zone || 'Eastern Railway (ER) / Howrah Div'}
            </p>
          </div>
        </div>

        <button
          onClick={runAiOptimization}
          disabled={isOptimizing}
          className="w-full sm:w-auto px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all border border-slate-800 disabled:opacity-50 active:scale-98"
        >
          <Zap className={`w-4 h-4 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
          <span>{isOptimizing ? 'Refreshing...' : 'Refresh Section Telemetry'}</span>
        </button>
      </div>

      {/* Main Interactive Corridor Visualizer */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrainTrack className="w-5 h-5 text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Interactive Section Occupation & Automatic Block Signaling Diagram
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            HOWRAH (KM 0) — DHANBAD (KM 260) MAINLINE
          </span>
        </div>
        <CorridorVisualizer corridors={corridors} />
      </div>

      {/* Detailed Section Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {corridors.map(sec => (
          <div
            key={sec.id}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-railway-navy text-white px-2 py-0.5 rounded">
                      {sec.id}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{sec.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Chainage: KM {sec.kmStart} to KM {sec.kmEnd} ({sec.kmEnd - sec.kmStart} km total section length)
                  </p>
                </div>
                <StatusBadge status={sec.status} variant="corridorStatus" size="md" />
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 my-4 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Next Feasible Block Window</span>
                  <span className="font-mono font-bold text-slate-900 text-xs mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-700" />
                    {sec.nextAvailableWindow}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Active Trains in Block</span>
                  <span className="font-mono font-bold text-slate-900 text-xs mt-1 flex items-center gap-1">
                    <Train className="w-3.5 h-3.5 text-amber-600" />
                    {sec.activeTrains} Trains (COA Tracked)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Section Speed Potential</span>
                  <span className="font-mono font-bold text-emerald-800 text-xs mt-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                    {sec.speedRestrictionKmph} Kmph Max Permissible
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Queued Maintenance Requisitions</span>
                  <span className="font-mono font-bold text-purple-800 text-xs mt-1 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-purple-600" />
                    {sec.plannedMaintenance} Tasks Queued
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/50 p-2.5 rounded-lg border border-blue-200">
                <strong>Chief Controller Dispatch Note: </strong>{sec.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
