import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import {
  MapPin, Cpu, Users, Shield, Train,
  Activity, AlertTriangle, CheckCircle2,
  CircleDot, Wrench, Zap, RefreshCw
} from 'lucide-react';

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string; dotColor: string }> = {
  Normal: { bg: 'bg-slate-800', text: 'text-slate-300', border: 'border-slate-700', dotColor: 'bg-slate-400' },
  'Maintenance Active': { bg: 'bg-red-500/10', text: 'text-red-300', border: 'border-red-500/40', dotColor: 'bg-red-400' },
  'Block Scheduled': { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/40', dotColor: 'bg-amber-400' },
  'Anomaly Detected': { bg: 'bg-orange-500/10', text: 'text-orange-300', border: 'border-orange-500/40', dotColor: 'bg-orange-400' },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Track Machines': <Train className="w-4 h-4 text-sky-400" />,
  'Tower Wagons': <Zap className="w-4 h-4 text-purple-400" />,
  'Workforce Teams': <Users className="w-4 h-4 text-emerald-400" />,
  'Safety Escorts': <Shield className="w-4 h-4 text-amber-400" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  'Track Machines': 'border-sky-500/30 bg-sky-500/5',
  'Tower Wagons': 'border-purple-500/30 bg-purple-500/5',
  'Workforce Teams': 'border-emerald-500/30 bg-emerald-500/5',
  'Safety Escorts': 'border-amber-500/30 bg-amber-500/5',
};

export const GeoSpatialResourcesPage: React.FC = () => {
  const { resources, geoMarkers } = useRailway();
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Group resources by category
  const categories = ['Track Machines', 'Tower Wagons', 'Workforce Teams', 'Safety Escorts'];
  const grouped = categories.map(cat => ({
    category: cat,
    items: resources.filter(r => r.category === cat),
    avgUtil: Math.round(
      resources.filter(r => r.category === cat).reduce((s, r) => s + r.utilizationRate, 0) /
      (resources.filter(r => r.category === cat).length || 1)
    ),
    totalAssigned: resources.filter(r => r.category === cat).reduce((s, r) => s + r.assigned, 0),
    totalAvail: resources.filter(r => r.category === cat).reduce((s, r) => s + r.totalAvailable, 0),
  }));

  const selectedMarkerData = geoMarkers.find(m => m.id === selectedMarker);

  return (
    <div className="p-4 lg:p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl font-extrabold text-white flex items-center gap-2">
          <MapPin className="w-6 h-6 text-emerald-400" />
          Resources & Geo-Spatial Corridor View
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Howrah → Bardhaman → Durgapur (KM 0 – 200) — Track machine deployment and field crew allocation
        </p>
      </div>

      {/* ─── SECTION 1: Resource Pool Summary ─── */}
      <section>
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          Resource Pool — Summary by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {grouped.map(g => (
            <div key={g.category} className={`rounded-xl border ${CATEGORY_COLORS[g.category]} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                {CATEGORY_ICONS[g.category]}
                <span className="text-xs font-bold text-slate-200">{g.category}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div>
                  <p className="text-lg font-extrabold text-white">{g.totalAvail}</p>
                  <p className="text-[10px] text-slate-400">Available</p>
                </div>
                <div>
                  <p className="text-lg font-extrabold text-blue-300">{g.totalAssigned}</p>
                  <p className="text-[10px] text-slate-400">Assigned</p>
                </div>
                <div>
                  <p className="text-lg font-extrabold text-emerald-300">{g.avgUtil}%</p>
                  <p className="text-[10px] text-slate-400">Avg Util.</p>
                </div>
              </div>
              {/* Utilization bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all ${g.avgUtil > 80 ? 'bg-red-400' : g.avgUtil > 60 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                  style={{ width: `${g.avgUtil}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 2: Individual Resources Table ─── */}
      <section>
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-sky-400" />
          Individual Resource Details
        </h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Resource</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Avail.</th>
                <th className="px-4 py-3 font-semibold">Assigned</th>
                <th className="px-4 py-3 font-semibold">Util. %</th>
                <th className="px-4 py-3 font-semibold">Base Depot</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {resources.map(r => (
                <tr key={r.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-200">{r.name}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5">
                      {CATEGORY_ICONS[r.category]}
                      <span className="text-slate-300">{r.category}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 font-mono">{r.totalAvailable}</td>
                  <td className="px-4 py-3 text-blue-300 font-mono">{r.assigned}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${r.utilizationRate > 80 ? 'bg-red-400' : r.utilizationRate > 60 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                          style={{ width: `${r.utilizationRate}%` }}
                        />
                      </div>
                      <span className={`font-mono font-bold ${r.utilizationRate > 80 ? 'text-red-300' : r.utilizationRate > 60 ? 'text-amber-300' : 'text-emerald-300'}`}>
                        {r.utilizationRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{r.currentBaseDepot}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.operationalStatus === 'Ready' ? 'bg-emerald-500/20 text-emerald-300' :
                      r.operationalStatus === 'In Field' ? 'bg-sky-500/20 text-sky-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {r.operationalStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── SECTION 3: Geo-Spatial Corridor Map ─── */}
      <section>
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          Geo-Spatial Corridor — Howrah → Durgapur (0–200 km)
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-xs">
            {Object.entries(STATUS_STYLES).map(([status, s]) => (
              <span key={status} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${s.dotColor}`} />
                <span className="text-slate-400">{status}</span>
              </span>
            ))}
          </div>

          {/* Corridor Track */}
          <div className="relative w-full overflow-x-auto">
            <div className="relative min-w-[700px] py-16">
              {/* Track line */}
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full -translate-y-1/2" />
              {/* KM labels */}
              {[0, 50, 100, 150, 200].map(km => (
                <div
                  key={km}
                  className="absolute top-[calc(50%+14px)] text-[9px] text-slate-500 font-mono -translate-x-1/2"
                  style={{ left: `${(km / 200) * 100}%` }}
                >
                  KM {km}
                </div>
              ))}

              {/* Markers */}
              {geoMarkers.map(m => {
                const style = STATUS_STYLES[m.status] || STATUS_STYLES.Normal;
                const leftPct = Math.min(Math.max((m.chainageKm / 200) * 100, 2), 97);
                const isSelected = selectedMarker === m.id;

                return (
                  <div
                    key={m.id}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                    style={{ left: `${leftPct}%` }}
                    onClick={() => setSelectedMarker(isSelected ? null : m.id)}
                  >
                    {/* Connector line */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-px ${m.chainageKm % 2 === 0 ? '-top-10 h-10' : 'top-4 h-10'} ${style.dotColor.replace('bg-', 'bg-').replace('-400', '-400/50')}`} />

                    {/* Dot */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shadow-lg transition-all ${
                        style.dotColor
                      } border-white/20 ${isSelected ? 'scale-150' : 'hover:scale-125'} ${
                        m.status === 'Maintenance Active' ? 'animate-pulse' : ''
                      }`}
                    >
                      {m.status === 'Maintenance Active' && <span className="text-[6px] text-white font-bold">!</span>}
                    </div>

                    {/* Label (alternating above/below) */}
                    <div
                      className={`absolute ${
                        m.chainageKm % 2 === 0 ? '-top-20' : 'top-8'
                      } left-1/2 -translate-x-1/2 whitespace-nowrap`}
                    >
                      <div className={`text-[9px] font-semibold text-center ${style.text}`}>
                        {m.locationName.split(' (')[0]}
                      </div>
                      <div className="text-[8px] text-slate-500 text-center font-mono">KM {m.chainageKm}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Marker Detail Panel */}
          {selectedMarkerData && (() => {
            const style = STATUS_STYLES[selectedMarkerData.status] || STATUS_STYLES.Normal;
            return (
              <div className={`mt-4 rounded-xl border ${style.border} ${style.bg} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${style.dotColor}`} />
                    <span className="font-bold text-sm text-white">{selectedMarkerData.locationName}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border ${style.border} ${style.text} font-semibold`}>
                      {selectedMarkerData.status}
                    </span>
                  </div>
                  <span className="text-slate-400 text-xs font-mono">KM {selectedMarkerData.chainageKm}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-slate-400 text-[11px] mb-1">Section</p>
                    <p className="text-slate-200 font-semibold">{selectedMarkerData.section}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[11px] mb-1">Crews Allocated</p>
                    <p className="text-emerald-300 font-bold text-base">{selectedMarkerData.crewsAllocated}</p>
                  </div>
                  {selectedMarkerData.activeBlockWindow && (
                    <div>
                      <p className="text-slate-400 text-[11px] mb-1">Active Block Window</p>
                      <p className="text-amber-300 font-semibold">{selectedMarkerData.activeBlockWindow}</p>
                    </div>
                  )}
                  <div className="col-span-2 md:col-span-3">
                    <p className="text-slate-400 text-[11px] mb-1">Assigned Machines / Units</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMarkerData.assignedMachines.map((m, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 rounded text-[11px] font-mono">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {!selectedMarkerData && (
            <p className="text-center text-xs text-slate-500 mt-4">
              ↑ Click any marker on the corridor to inspect deployment details
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
