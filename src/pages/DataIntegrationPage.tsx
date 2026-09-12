import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { GovEmblem } from '../components/common/GovEmblem';
import {
  Database, Wifi, WifiOff, RefreshCw, Filter,
  CheckCircle2, AlertTriangle, ArrowRight, ArrowDown,
  Activity, Package, CircleDot, Layers, ShieldCheck
} from 'lucide-react';
import { SourceSystem, UnifiedDatabaseRecord } from '../types';

const SOURCE_COLORS: Record<SourceSystem, { bg: string; text: string; border: string; dot: string }> = {
  BDMS: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', dot: 'bg-emerald-600' },
  TMS: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-300', dot: 'bg-sky-600' },
  SMMS: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', dot: 'bg-amber-600' },
  TDMS: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-300', dot: 'bg-purple-600' },
  COA: { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-300', dot: 'bg-teal-600' },
};

const URGENCY_COLORS: Record<string, string> = {
  Critical: 'bg-red-50 text-red-700 border-red-200',
  High: 'bg-amber-50 text-amber-700 border-amber-200',
  Medium: 'bg-blue-50 text-blue-700 border-blue-200',
  Low: 'bg-slate-100 text-slate-700 border-slate-200',
};

const STATUS_COLORS: Record<string, string> = {
  Ingested: 'bg-blue-50 text-blue-700 border border-blue-200',
  Normalized: 'bg-amber-50 text-amber-700 border border-amber-200',
  Clustered: 'bg-purple-50 text-purple-700 border border-purple-200',
  Scheduled: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

export const DataIntegrationPage: React.FC = () => {
  const { dataSources, ingestionStats, unifiedRecords, triggerDataIngestionSync, showToast } = useRailway();
  const [filterSource, setFilterSource] = useState<SourceSystem | 'All'>('All');
  const [filterUrgency, setFilterUrgency] = useState<string>('All');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    triggerDataIngestionSync();
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Data Synchronization Complete', '5/5 Legacy Systems polled and ingested successfully.', 'success');
    }, 1400);
  };

  const filteredRecords = unifiedRecords.filter(r => {
    const matchSource = filterSource === 'All' || r.source === filterSource;
    const matchUrgency = filterUrgency === 'All' || r.urgency === filterUrgency;
    return matchSource && matchUrgency;
  });

  const connectedCount = dataSources.filter(s => s.status === 'Connected').length;

  return (
    <div className="space-y-6">
      {/* Official Government Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Legacy Railway Systems Integration & Unified Data Pipeline
              </h1>
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded border border-blue-300">
                CRIS ENTERPRISE DATA BUS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              भारतीय रेल एकीकृत डेटा एकीकरण एवं पाइपलाइन • Real-time telemetry ingestion from TMS (Track), SMMS (Signals), TDMS (Traction), COA (Control Office) & BDMS
            </p>
          </div>
        </div>

        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white text-xs font-bold rounded-lg transition-all border border-slate-800 disabled:opacity-60 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Feeds...' : 'Poll & Sync All Feeds'}</span>
        </button>
      </div>

      {/* ─── SECTION 1: Data Sources ─── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Wifi className="w-4 h-4 text-emerald-600" />
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Connected Legacy Feeds — {connectedCount}/5 Operational
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
          {dataSources.map(src => {
            const c = SOURCE_COLORS[src.id];
            return (
              <div
                key={src.id}
                className={`rounded-xl border ${c.border} ${c.bg} p-4 flex flex-col gap-2 relative bg-white shadow-xs`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-extrabold font-mono ${c.text}`}>{src.name}</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 rounded-full px-2 py-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
                    {src.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-900 font-bold">{src.fullName}</p>
                <p className="text-[10px] text-slate-500 font-mono">{src.dataType}</p>
                <div className="flex justify-between text-[11px] text-slate-700 mt-1">
                  <span className="font-bold font-mono">{src.records.toLocaleString()} records</span>
                  <span className="text-slate-500 text-[10px] font-mono">{src.lastSync}</span>
                </div>
                {/* Health bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-emerald-600 transition-all"
                    style={{ width: `${src.health}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Feed Health: {src.health}%</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SECTION 2: Data Flow Diagram ─── */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-700" />
          Indian Railways CRIS Enterprise Ingestion Pipeline Architecture
        </h2>
        <div className="flex flex-col items-center gap-0">
          {/* Sources row */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {dataSources.map(src => {
              const c = SOURCE_COLORS[src.id];
              return (
                <div
                  key={src.id}
                  className={`px-4 py-2 rounded-lg border ${c.border} ${c.bg} text-center shadow-2xs`}
                >
                  <p className={`text-sm font-extrabold font-mono ${c.text}`}>{src.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{src.records} rec.</p>
                </div>
              );
            })}
          </div>

          {/* Arrow down */}
          <div className="flex flex-col items-center py-2">
            <div className="w-px h-6 bg-blue-400" />
            <ArrowDown className="w-4 h-4 text-blue-600" />
            <div className="w-px h-2 bg-blue-400" />
          </div>

          {/* Ingestion Engine */}
          <div className="w-full max-w-2xl bg-blue-50/70 border border-blue-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CircleDot className="w-5 h-5 text-blue-700 animate-pulse" />
                <span className="font-bold text-slate-900 text-sm">ETL & Data Normalization Pipeline</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  ingestionStats.ingestionPipelineStatus === 'Healthy'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {ingestionStats.ingestionPipelineStatus}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">{ingestionStats.lastIngestionTimestamp}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="text-center">
                <p className="text-xl font-extrabold text-slate-900 font-mono">{ingestionStats.recordsReceived.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500">Records Received</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-extrabold text-emerald-700 font-mono">{ingestionStats.recordsValidated.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500">Records Validated</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-extrabold text-red-600 font-mono">{ingestionStats.corruptedDuplicatesDropped}</p>
                <p className="text-[11px] text-slate-500">Duplicates Dropped</p>
              </div>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex flex-col items-center py-2">
            <div className="w-px h-2 bg-blue-400" />
            <ArrowDown className="w-4 h-4 text-blue-600" />
            <div className="w-px h-6 bg-blue-400" />
          </div>

          {/* Unified Database */}
          <div className="w-full max-w-2xl bg-purple-50/70 border border-purple-200 rounded-xl p-4 text-center shadow-xs">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Database className="w-5 h-5 text-purple-700" />
              <span className="font-bold text-slate-900 text-sm">Unified Canonical Railway Database (UCRD)</span>
            </div>
            <p className="text-[11px] text-slate-600 font-mono">
              {ingestionStats.recordsValidated.toLocaleString()} validated schema records — feeding DBSCAN spatial clustering & CP-SAT solver
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Unified Records Table ─── */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-700" />
              Normalized Unified Database Records
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Correlated cross-department records ready for optimization
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Source filter */}
            <div className="flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterSource}
                onChange={e => setFilterSource(e.target.value as SourceSystem | 'All')}
                className="text-xs font-semibold px-2 py-1 rounded bg-slate-50 border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="All">All Feeds</option>
                <option value="BDMS">BDMS</option>
                <option value="TMS">TMS</option>
                <option value="SMMS">SMMS</option>
                <option value="TDMS">TDMS</option>
                <option value="COA">COA</option>
              </select>
            </div>

            {/* Urgency filter */}
            <select
              value={filterUrgency}
              onChange={e => setFilterUrgency(e.target.value)}
              className="text-xs font-semibold px-2 py-1 rounded bg-slate-50 border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="All">All Criticalities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Record ID</th>
                <th className="py-2.5 px-3">Feed Source</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-3">Track Chainage</th>
                <th className="py-2.5 px-3">Asset Type</th>
                <th className="py-2.5 px-3">Criticality</th>
                <th className="py-2.5 px-3">Est. Duration</th>
                <th className="py-2.5 px-3">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No unified records match your filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map(rec => (
                  <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{rec.recordId}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] border ${SOURCE_COLORS[rec.source]?.bg} ${SOURCE_COLORS[rec.source]?.text} ${SOURCE_COLORS[rec.source]?.border}`}>
                        {rec.source}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">{rec.department}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px]">{rec.trackSection} ({rec.chainageKm})</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{rec.assetType}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${URGENCY_COLORS[rec.urgency]}`}>
                        {rec.urgency}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono">{rec.suggestedBlockDurationMin} min</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_COLORS[rec.status]}`}>
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
