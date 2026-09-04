import React, { useState } from 'react';
import { CorridorSection } from '../../types';
import { StatusBadge } from './StatusBadge';
import { Train, Wrench, ShieldAlert, Clock, Info, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface CorridorVisualizerProps {
  corridors: CorridorSection[];
  onSelectSection?: (section: CorridorSection) => void;
}

export const CorridorVisualizer: React.FC<CorridorVisualizerProps> = ({
  corridors,
  onSelectSection,
}) => {
  const [selectedSection, setSelectedSection] = useState<CorridorSection | null>(null);

  const handleSectionClick = (sec: CorridorSection) => {
    setSelectedSection(sec);
    if (onSelectSection) onSelectSection(sec);
  };

  const getStatusColor = (status: CorridorSection['status']) => {
    switch (status) {
      case 'Available':
        return {
          line: 'bg-emerald-500',
          ring: 'border-emerald-500 text-emerald-700 bg-emerald-50',
          dot: 'bg-emerald-500',
          label: 'Available (Normal)'
        };
      case 'Maintenance Planned':
        return {
          line: 'bg-amber-500',
          ring: 'border-amber-500 text-amber-700 bg-amber-50',
          dot: 'bg-amber-500',
          label: 'Planned Shadow Block'
        };
      case 'Active Maintenance':
        return {
          line: 'bg-blue-600',
          ring: 'border-blue-600 text-blue-700 bg-blue-50',
          dot: 'bg-blue-600 animate-pulse',
          label: 'Active Possession'
        };
      case 'Blocked':
        return {
          line: 'bg-red-500',
          ring: 'border-red-500 text-red-700 bg-red-50',
          dot: 'bg-red-500',
          label: 'Emergency / Blocked'
        };
      default:
        return {
          line: 'bg-slate-300',
          ring: 'border-slate-400 text-slate-700 bg-slate-50',
          dot: 'bg-slate-400',
          label: 'Unknown'
        };
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Eastern Mainline Corridor Schematic (Grand Chord Quadruple Line)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time track possession, active train density, and AI-scheduled shadow blocks (HWH – ASN Section)
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-600 font-medium">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-600 font-medium">Maintenance Planned</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-slate-600 font-medium">Active Maintenance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-slate-600 font-medium">Blocked</span>
          </div>
        </div>
      </div>

      {/* Interactive Corridor Rail Track Visualizer */}
      <div className="py-6 px-3 sm:px-6 bg-slate-900 rounded-lg text-white relative overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Top Track Label */}
          <div className="flex justify-between items-center text-xs text-slate-400 mb-6 font-mono font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>HOWRAH JN (HWH) • KM 0.0</span>
            </div>
            <span>BARDHAMAN (BWN) • KM 95.0</span>
            <span>DURGAPUR (DGR) • KM 158.0</span>
            <div className="flex items-center gap-1.5">
              <span>ASANSOL JN (ASN) • KM 200.0</span>
              <span className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
          </div>

          {/* Track Railway Graphic */}
          <div className="relative flex items-center justify-between my-8 px-4">
            {/* Background Steel Rail */}
            <div className="absolute left-4 right-4 h-2 bg-slate-700 rounded" />
            <div className="absolute left-4 right-4 h-0.5 top-1 bg-slate-500 opacity-40" />

            {/* Corridor Segment Nodes & Spans */}
            {corridors.map((sec, idx) => {
              const styling = getStatusColor(sec.status);
              const isSelected = selectedSection?.id === sec.id;

              return (
                <div key={sec.id} className="relative z-10 flex-1 flex flex-col items-center">
                  {/* Segment Span Line */}
                  <div
                    onClick={() => handleSectionClick(sec)}
                    className={`h-3 w-full mx-2 rounded-full cursor-pointer transition-all duration-300 relative group flex items-center justify-center ${
                      styling.line
                    } ${isSelected ? 'ring-4 ring-white/80 shadow-lg scale-y-125' : 'hover:scale-y-110'}`}
                  >
                    {/* Active train movement icon floating */}
                    {sec.activeTrains > 0 && (
                      <div className="absolute -top-7 bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 shadow border border-slate-700">
                        <Train className="w-3 h-3" />
                        <span>{sec.activeTrains} Trains</span>
                      </div>
                    )}

                    {sec.plannedMaintenance > 0 && (
                      <div className="absolute -bottom-7 bg-slate-800 text-blue-300 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 shadow border border-slate-700">
                        <Wrench className="w-3 h-3" />
                        <span>{sec.plannedMaintenance} Tasks</span>
                      </div>
                    )}
                  </div>

                  {/* Section Label Button */}
                  <button
                    onClick={() => handleSectionClick(sec)}
                    className={`mt-8 px-3 py-1.5 rounded-md text-xs font-semibold text-center transition-all border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-white shadow-md'
                        : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <div className="font-mono text-[11px] text-slate-300">{sec.from.split(' ')[0]} ⇄ {sec.to.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Click for Telemetry</div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <div className="mt-6 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
            <span>Automatic Block Territory (4-Aspect Colour Light Signals)</span>
            <span>Speed Potential: 130 Kmph • Traction: 25kV AC 50Hz OHE</span>
          </div>
        </div>
      </div>

      {/* Corridor Detailed Telemetry Panel (When Clicked) */}
      {selectedSection && (
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-railway-navy text-white rounded-md">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{selectedSection.name}</h4>
                  <span className="text-xs font-mono text-slate-500">[{selectedSection.id}]</span>
                  <StatusBadge status={selectedSection.status} variant="corridorStatus" size="sm" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  Chainage: KM {selectedSection.kmStart} to KM {selectedSection.kmEnd} ({selectedSection.kmEnd - selectedSection.kmStart} Track KM)
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSection(null)}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-200 text-xs">
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block">Next Available Block Window</span>
              <span className="font-bold text-slate-900 font-mono flex items-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {selectedSection.nextAvailableWindow}
              </span>
            </div>

            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block">Active Train Count</span>
              <span className="font-bold text-slate-900 font-mono flex items-center gap-1 mt-1">
                <Train className="w-3.5 h-3.5 text-amber-600" />
                {selectedSection.activeTrains} Live Trains (COA Tracked)
              </span>
            </div>

            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block">Planned Maintenance Tasks</span>
              <span className="font-bold text-slate-900 font-mono flex items-center gap-1 mt-1">
                <Wrench className="w-3.5 h-3.5 text-purple-600" />
                {selectedSection.plannedMaintenance} Integrated Tasks
              </span>
            </div>

            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block">Permissible Speed & Caution</span>
              <span className="font-bold text-slate-900 font-mono flex items-center gap-1 mt-1">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                {selectedSection.speedRestrictionKmph || 110} Kmph (Caution in force)
              </span>
            </div>
          </div>

          <div className="mt-3 text-xs bg-blue-50/70 border border-blue-200 rounded p-2.5 text-blue-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Operations Controller Note: </span>
              {selectedSection.notes}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
