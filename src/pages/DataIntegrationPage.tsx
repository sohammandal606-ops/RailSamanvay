import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import {
  Database, Wifi, WifiOff, RefreshCw, Filter,
  CheckCircle2, AlertTriangle, ArrowRight, ArrowDown,
  Activity, Package, CircleDot
} from 'lucide-react';
import { SourceSystem, UnifiedDatabaseRecord } from '../types';

const SOURCE_COLORS: Record<SourceSystem, { bg: string; text: string; border: string; dot: string }> = {
  BDMS: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
  TMS: { bg: 'bg-sky-500/10', text: 'text-sky-300', border: 'border-sky-500/30', dot: 'bg-sky-400' },
  SMMS: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30', dot: 'bg-amber-400' },
  TDMS: { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/30', dot: 'bg-purple-400' },
  COA: { bg: 'bg-teal-500/10', text: 'text-teal-300', border: 'border-teal-500/30', dot: 'bg-teal-400' },
};

const URGENCY_COLORS: Record<string, string> = {
  Critical: 'bg-red-500/20 text-red-300 border-red-500/30',
  High: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Medium: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Low: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

const STATUS_COLORS: Record<string, string> = {
  Ingested: 'bg-blue-500/20 text-blue-300',
  Normalized: 'bg-yellow-500/20 text-yellow-300',
  Clustered: 'bg-purple-500/20 text-purple-300',
  Scheduled: 'bg-emerald-500/20 text-emerald-300',
};

export const DataIntegrationPage: React.FC = () => {
  const { dataSources, ingestionStats, unifiedRecords, triggerDataIngestionSync } = useRailway();
  const [filterSource, setFilterSource] = useState<SourceSystem | 'All'>('All');
  const [filterUrgency, setFilterUrgency] = useState<string>('All');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    triggerDataIngestionSync();
    setTimeout(() => setIsSyncing(false), 1400);
  };

  const filteredRecords = unifiedRecords.filter(r => {
    const matchSource = filterSource === 'All' || r.source === filterSource;
    const matchUrgency = filterUrgency === 'All' || r.urgency === filterUrgency;
    return matchSource && matchUrgency;
  });

  const connectedCount = dataSources.filter(s => s.status === 'Connected').length;

  return (
    <div className="p-4 lg:p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-400" />
            Data Integration & Unified Pipeline
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            5 sources → Ingestion Engine → Normalized Unified Database
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing...' : 'Sync All Sources'}
        </button>
      </div>

      {/* ─── SECTION 1: Data Sources ─── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Wifi className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Data Sources — {connectedCount}/5 Connected
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
          {dataSources.map(src => {
            const c = SOURCE_COLORS[src.id];
            return (
              <div
                key={src.id}
                className={`rounded-xl border ${c.border} ${c.bg} p-4 flex flex-col gap-2 relative overflow-hidden`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-extrabold font-mono ${c.text}`}>{src.name}</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-2 py-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
                    {src.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">{src.fullName}</p>
                <p className="text-[10px] text-slate-400">{src.dataType}</p>
                <div className="flex justify-between text-[11px] text-slate-300 mt-1">
                  <span className="font-semibold">{src.records.toLocaleString()} records</span>
                  <span className="text-slate-400">{src.lastSync}</span>
                </div>
                {/* Health bar */}
                <div className="w-full bg-slate-800 rounded-full h-1">
                  <div
                    className="h-1 rounded-full bg-emerald-400 transition-all"
                    style={{ width: `${src.health}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400">Health: {src.health}%</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SECTION 2: Data Flow Diagram ─── */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          Data Flow Architecture
        </h2>
        <div className="flex flex-col items-center gap-0">
          {/* Sources row */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {dataSources.map(src => {
              const c = SOURCE_COLORS[src.id];
              return (
                <div
                  key={src.id}
                  className={`px-4 py-2 rounded-lg border ${c.border} ${c.bg} text-center`}
                >
                  <p className={`text-sm font-extrabold font-mono ${c.text}`}>{src.name}</p>
                  <p className="text-[10px] text-slate-400">{src.records} rec.</p>
                </div>
              );
            })}
          </div>

          {/* Arrow down */}
          <div className="flex flex-col items-center py-2">
            <div className="w-px h-6 bg-blue-500/50" />
            <ArrowDown className="w-5 h-5 text-blue-400" />
            <div className="w-px h-2 bg-blue-500/50" />
          </div>

          {/* Ingestion Engine */}
          <div className="w-full max-w-2xl bg-blue-600/10 border border-blue-500/40 rounded-xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CircleDot className="w-5 h-5 text-blue-400 animate-pulse" />
                <span className="font-bold text-blue-300 text-sm">Data Ingestion Engine</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  ingestionStats.ingestionPipelineStatus === 'Healthy'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {ingestionStats.ingestionPipelineStatus}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{ingestionStats.lastIngestionTimestamp}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="text-center">
                <p className="text-xl font-extrabold text-white">{ingestionStats.recordsReceived.toLocaleString()}</p>
                <p className="text-[11px] text-slate-400">Records Received</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-extrabold text-emerald-300">{ingestionStats.recordsValidated.toLocaleString()}</p>
                <p className="text-[11px] text-slate-400">Records Validated</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-extrabold text-red-300">{ingestionStats.corruptedDuplicatesDropped}</p>
                <p className="text-[11px] text-slate-400">Corrupted / Dropped</p>
              </div>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex flex-col items-center py-2">
            <div className="w-px h-2 bg-blue-500/50" />
            <ArrowDown className="w-5 h-5 text-blue-400" />
            <div className="w-px h-6 bg-blue-500/50" />
          </div>

          {/* Unified Database */}
          <div className="w-full max-w-2xl bg-indigo-600/10 border border-indigo-500/40 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Database className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-indigo-300 text-sm">Unified Normalized Database</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {ingestionStats.recordsValidated.toLocaleString()} normalized records — ready for DBSCAN clustering & CP-SAT optimization
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Unified Records Table ─── */}
      <section>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Unified Database — {filteredRecords.length} records
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Source Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterSource}
                onChange={e => setFilterSource(e.target.value as SourceSystem | 'All')}
                className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Sources</option>
                {dataSources.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            {/* Urgency Filter */}
            <select
              value={filterUrgency}
              onChange={e => setFilterUrgency(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Urgency</option>
              {['Critical', 'High', 'Medium', 'Low'].map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Record ID</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Department</th>
                <th className="px-4 py-3 font-semibold">Section</th>
                <th className="px-4 py-3 font-semibold">Chainage</th>
                <th className="px-4 py-3 font-semibold">Asset Type</th>
                <th className="px-4 py-3 font-semibold">Urgency</th>
                <th className="px-4 py-3 font-semibold">Block Dur.</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRecords.map(r => {
                const c = SOURCE_COLORS[r.source];
                return (
                  <tr key={r.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-300 font-semibold">{r.recordId}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${c.border} ${c.bg} ${c.text}`}>
                        {r.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{r.department}</td>
                    <td className="px-4 py-3 text-slate-400">{r.trackSection}</td>
                    <td className="px-4 py-3 font-mono text-slate-300">{r.chainageKm}</td>
                    <td className="px-4 py-3 text-slate-300 max-w-[180px] truncate" title={r.assetType}>{r.assetType}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${URGENCY_COLORS[r.urgency]}`}>
                        {r.urgency}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono">
                      {r.suggestedBlockDurationMin > 0 ? `${r.suggestedBlockDurationMin} min` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_COLORS[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">{r.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredRecords.length === 0 && (
            <div className="p-8 text-center text-slate-500">No records match filters.</div>
          )}
        </div>
      </section>
    </div>
  );
};
