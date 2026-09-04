import React from 'react';
import { useRailway } from '../context/RailwayContext';
import { CorridorVisualizer } from '../components/common/CorridorVisualizer';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  TrainTrack,
  Train,
  Wrench,
  Clock,
  ShieldAlert,
  Radio,
  Zap,
  Activity,
  ArrowRight
} from 'lucide-react';

export const CorridorStatusPage: React.FC = () => {
  const { corridors, runAiOptimization, isOptimizing } = useRailway();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Railway Corridor Availability & Track Telemetry
            </h1>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              LIVE SECTIONS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time block possession, active train density, and speed restrictions across Howrah – Asansol Corridor
          </p>
        </div>

        <button
          onClick={runAiOptimization}
          disabled={isOptimizing}
          className="px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
        >
          <Zap className={`w-4 h-4 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
          <span>Refresh Corridor Telemetry</span>
        </button>
      </div>

      {/* Main Interactive Corridor Visualizer */}
      <CorridorVisualizer corridors={corridors} />

      {/* Detailed Section Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {corridors.map(sec => (
          <div
            key={sec.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                      {sec.id}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{sec.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Chainage: KM {sec.kmStart} to KM {sec.kmEnd} ({sec.kmEnd - sec.kmStart} km total)
                  </p>
                </div>
                <StatusBadge status={sec.status} variant="corridorStatus" size="md" />
              </div>

              <div className="grid grid-cols-2 gap-3 my-4 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Next Block Window</span>
                  <span className="font-mono font-bold text-slate-900 text-xs mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {sec.nextAvailableWindow}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Active Trains In Section</span>
                  <span className="font-mono font-bold text-slate-900 text-xs mt-1 flex items-center gap-1">
                    <Train className="w-3.5 h-3.5 text-amber-600" />
                    {sec.activeTrains} Trains (COA Tracked)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Speed Potential / Caution</span>
                  <span className="font-mono font-bold text-emerald-700 text-xs mt-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                    {sec.speedRestrictionKmph} Kmph Max
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Planned Tasks</span>
                  <span className="font-mono font-bold text-purple-700 text-xs mt-1 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-purple-600" />
                    {sec.plannedMaintenance} Tasks Queued
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/40 p-2.5 rounded border border-blue-100">
                <strong>Controller Log: </strong>{sec.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
