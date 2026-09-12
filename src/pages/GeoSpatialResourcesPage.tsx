import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { GovEmblem } from '../components/common/GovEmblem';
import {
  MapPin, Cpu, Users, Shield, Train,
  Activity, AlertTriangle, CheckCircle2,
  CircleDot, Wrench, Zap, RefreshCw
} from 'lucide-react';

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string; dotColor: string }> = {
  Normal: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dotColor: 'bg-slate-400' },
  'Maintenance Active': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-300', dotColor: 'bg-red-600' },
  'Block Scheduled': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', dotColor: 'bg-amber-500' },
  'Anomaly Detected': { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-300', dotColor: 'bg-orange-500' },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Track Machines': <Train className="w-4 h-4 text-blue-700" />,
  'Tower Wagons': <Zap className="w-4 h-4 text-purple-700" />,
  'Workforce Teams': <Users className="w-4 h-4 text-emerald-700" />,
  'Safety Escorts': <Shield className="w-4 h-4 text-amber-700" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  'Track Machines': 'border-blue-200 bg-blue-50/40',
  'Tower Wagons': 'border-purple-200 bg-purple-50/40',
  'Workforce Teams': 'border-emerald-200 bg-emerald-50/40',
  'Safety Escorts': 'border-amber-200 bg-amber-50/40',
};

export const GeoSpatialResourcesPage: React.FC = () => {
  const { resources, geoMarkers, currentUser } = useRailway();
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
    <div className="space-y-6">
      {/* Official Government Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Geospatial Asset & Machinery Depot Allocation
              </h1>
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded border border-blue-300">
                GIS TRACK TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              भारतीय रेल जीआईएस एवं भारी मशीनरी डिपो • Real-time tracking of CSM tamping machines, BCM ballast cleaners, OHE tower wagons, and gang squads across {currentUser.zone || 'Eastern Railway (ER) / Howrah Div'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <span>Active Depot: Howrah (HWH) & Burdwan (BWN)</span>
        </div>
      </div>

      {/* ─── SECTION 1: Resource Pool Summary ─── */}
      <section>
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-700" />
          Division Heavy Machinery & Workforce Allocation Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {grouped.map(g => (
            <div key={g.category} className={`rounded-xl border ${CATEGORY_COLORS[g.category]} p-4 bg-white shadow-xs`}>
              <div className="flex items-center gap-2 mb-2">
                {CATEGORY_ICONS[g.category]}
                <span className="text-xs font-bold text-slate-900">{g.category}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div>
                  <p className="text-lg font-extrabold text-slate-900 font-mono">{g.totalAvail}</p>
                  <p className="text-[10px] text-slate-500">Available</p>
                </div>
                <div>
                  <p className="text-lg font-extrabold text-blue-700 font-mono">{g.totalAssigned}</p>
                  <p className="text-[10px] text-slate-500">In Field</p>
                </div>
                <div>
                  <p className="text-lg font-extrabold text-emerald-700 font-mono">{g.avgUtil}%</p>
                  <p className="text-[10px] text-slate-500">Avg Util.</p>
                </div>
              </div>
              {/* Utilization bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full transition-all ${g.avgUtil > 80 ? 'bg-red-600' : g.avgUtil > 60 ? 'bg-amber-500' : 'bg-emerald-600'}`}
                  style={{ width: `${g.avgUtil}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 2: Individual Resources Table ─── */}
      <section>
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-700" />
          Individual Machine & Gang Deployment Register
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Resource / Machine Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 font-mono">Avail</th>
                <th className="px-4 py-3 font-mono">Assigned</th>
                <th className="px-4 py-3">Util. %</th>
                <th className="px-4 py-3">Base Depot</th>
                <th className="px-4 py-3">Operational State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {resources.map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{r.name}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5">
                      {CATEGORY_ICONS[r.category]}
                      <span className="text-slate-700">{r.category}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700">{r.totalAvailable}</td>
                  <td className="px-4 py-3 font-mono text-blue-700 font-bold">{r.assigned}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${r.utilizationRate > 80 ? 'bg-red-600' : r.utilizationRate > 60 ? 'bg-amber-500' : 'bg-emerald-600'}`}
                          style={{ width: `${r.utilizationRate}%` }}
                        />
                      </div>
                      <span className={`font-mono font-bold ${r.utilizationRate > 80 ? 'text-red-700' : r.utilizationRate > 60 ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {r.utilizationRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">{r.currentBaseDepot}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      r.operationalStatus === 'Ready' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                      r.operationalStatus === 'In Field' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                      'bg-red-50 text-red-800 border-red-300'
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
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-700" />
          Geo-Spatial Corridor Asset Locations — Howrah → Burdwan → Durgapur (0–200 km)
        </h2>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-xs">
            {Object.entries(STATUS_STYLES).map(([status, s]) => (
              <span key={status} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${s.dotColor}`} />
                <span className="text-slate-600 font-medium">{status}</span>
              </span>
            ))}
          </div>

          {/* Corridor Track */}
          <div className="relative w-full overflow-x-auto bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="relative min-w-[700px] py-16">
              {/* Track line */}
              <div className="absolute top-1/2 left-0 right-0 h-2.5 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 rounded-full -translate-y-1/2" />
              {/* KM labels */}
              {[0, 50, 100, 150, 200].map(km => (
                <div
                  key={km}
                  className="absolute top-[calc(50%+14px)] text-[9px] text-slate-500 font-mono -translate-x-1/2 font-bold"
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
                    <div className={`absolute left-1/2 -translate-x-1/2 w-px ${m.chainageKm % 2 === 0 ? '-top-10 h-10' : 'top-4 h-10'} bg-slate-400`} />

                    {/* Dot */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shadow-md transition-all ${
                        style.dotColor
                      } border-white ${isSelected ? 'scale-150 ring-2 ring-blue-600' : 'hover:scale-125'} ${
                        m.status === 'Maintenance Active' ? 'animate-pulse' : ''
                      }`}
                    >
                      {m.status === 'Maintenance Active' && <span className="text-[6px] text-white font-bold">!</span>}
                    </div>

                    {/* Label */}
                    <div
                      className={`absolute ${
                        m.chainageKm % 2 === 0 ? '-top-20' : 'top-8'
                      } left-1/2 -translate-x-1/2 whitespace-nowrap`}
                    >
                      <div className={`text-[10px] font-bold text-center text-slate-800`}>
                        {m.locationName.split(' (')[0]}
                      </div>
                      <div className="text-[9px] text-slate-500 text-center font-mono font-semibold">KM {m.chainageKm}</div>
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
                    <span className="font-bold text-sm text-slate-900">{selectedMarkerData.locationName}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border ${style.border} font-semibold`}>
                      {selectedMarkerData.status}
                    </span>
                  </div>
                  <span className="text-slate-600 text-xs font-mono font-bold">KM {selectedMarkerData.chainageKm}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-slate-500 text-[11px] mb-1">Section</p>
                    <p className="text-slate-900 font-bold">{selectedMarkerData.section}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[11px] mb-1">Crews Allocated</p>
                    <p className="text-emerald-700 font-bold text-base font-mono">{selectedMarkerData.crewsAllocated}</p>
                  </div>
                  {selectedMarkerData.activeBlockWindow && (
                    <div>
                      <p className="text-slate-500 text-[11px] mb-1">Active Possession Window</p>
                      <p className="text-amber-800 font-bold font-mono">{selectedMarkerData.activeBlockWindow}</p>
                    </div>
                  )}
                  <div className="col-span-2 md:col-span-3">
                    <p className="text-slate-500 text-[11px] mb-1">Assigned Machines / Track Plant Units</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMarkerData.assignedMachines.map((m, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-slate-300 text-slate-800 rounded text-[11px] font-mono font-bold shadow-2xs">
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
            <p className="text-center text-xs text-slate-500 mt-4 font-mono">
              ↑ Click any station or track marker along the line to inspect machine & gang deployment
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
