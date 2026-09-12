import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { KPICard } from '../components/common/KPICard';
import { GovEmblem } from '../components/common/GovEmblem';
import { useNavigate } from 'react-router-dom';
import {
  BrainCircuit,
  Cpu,
  Layers,
  ShieldAlert,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  CalendarRange,
  Zap,
  Radio,
  ArrowRight,
  TrendingUp,
  MapPin,
  Activity
} from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const AiInsightsPage: React.FC = () => {
  const { anomalies, clusters, kMeansClusters, runAiOptimization, isOptimizing, setSelectedTaskForDrawer, tasks, currentUser } = useRailway();
  const navigate = useNavigate();

  const [selectedClusterId, setSelectedClusterId] = useState<string>('CLUST-01');

  // Scatter plot data representing tasks in 2D space (KM Chainage vs Defect Severity Anomaly)
  const clusterPlotData = [
    { x: 142.6, y: 0.91, z: 90, name: 'TRK-7821 (Track Tongue Wear)', cluster: 'Cluster 1 (KM 140-146)', dept: 'Engineering', color: '#1E40AF' },
    { x: 145.2, y: 0.84, z: 60, name: 'SIG-331 (Relay Fault)', cluster: 'Cluster 1 (KM 140-146)', dept: 'S&T', color: '#D97706' },
    { x: 141.8, y: 0.71, z: 45, name: 'OHE-112 (Contact Wire)', cluster: 'Cluster 1 (KM 140-146)', dept: 'Traction', color: '#7C3AED' },
    { x: 144.1, y: 0.74, z: 75, name: 'TRK-4921 (Ballast Tamping)', cluster: 'Cluster 1 (KM 140-146)', dept: 'Engineering', color: '#1E40AF' },

    { x: 218.4, y: 0.92, z: 60, name: 'OHE-221 (Insulator Flashover)', cluster: 'Cluster 2 (KM 216-222)', dept: 'Traction', color: '#7C3AED' },
    { x: 217.2, y: 0.65, z: 45, name: 'TRK-3012 (Turnout Check)', cluster: 'Cluster 2 (KM 216-222)', dept: 'Engineering', color: '#1E40AF' },

    { x: 82.4, y: 0.68, z: 40, name: 'SIG-452 (Axle Counter)', cluster: 'Cluster 3 (KM 80-84)', dept: 'S&T', color: '#D97706' },
    { x: 81.1, y: 0.55, z: 50, name: 'TRK-1090 (Fishplate Joint)', cluster: 'Cluster 3 (KM 80-84)', dept: 'Engineering', color: '#1E40AF' },

    { x: 204.2, y: 0.88, z: 60, name: 'TRK-3902 (BCM Screening)', cluster: 'Cluster 4 (KM 202-208)', dept: 'Engineering', color: '#1E40AF' },
    { x: 206.5, y: 0.79, z: 45, name: 'SIG-611 (Cable Trench)', cluster: 'Cluster 4 (KM 202-208)', dept: 'S&T', color: '#D97706' },
    { x: 205.1, y: 0.72, z: 55, name: 'OHE-344 (OHE Mast)', cluster: 'Cluster 4 (KM 202-208)', dept: 'Traction', color: '#7C3AED' },
  ];

  return (
    <div className="space-y-6">
      {/* Official Government Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                AI Telemetry Insights & Spatial DBSCAN Clustering
              </h1>
              <span className="text-xs font-mono font-bold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded border border-purple-300">
                CRIS AI/ML MODELS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              भारतीय रेल कृत्रिम बुद्धिमत्ता अंतर्दृष्टि एवं क्लस्टरिंग • Isolation Forest telemetry anomaly detection & DBSCAN spatial clustering for coordinated shadow blocks along {currentUser.zone || 'Eastern Railway (ER) / Howrah Div'}
            </p>
          </div>
        </div>

        <button
          onClick={runAiOptimization}
          disabled={isOptimizing}
          className="px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all border border-slate-800 disabled:opacity-50"
        >
          <Zap className={`w-4 h-4 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
          <span>{isOptimizing ? 'Re-clustering...' : 'Re-run Spatial Clustering'}</span>
        </button>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Critical Assets Detected"
          value="27"
          badgeText="Isolation Forest"
          icon={ShieldAlert}
          variant="critical"
          subtext="Anomaly score > 0.85 threshold"
        />

        <KPICard
          title="Anomalous Patterns"
          value="14"
          badgeText="Defect Spikes"
          icon={Activity}
          variant="warning"
          subtext="Accelerated wear rate vs baseline"
        />

        <KPICard
          title="Potential Joint Blocks"
          value="18"
          badgeText="DBSCAN Clusters"
          icon={Layers}
          variant="info"
          subtext="High spatial density clusters"
        />

        <KPICard
          title="Overdue High-Risk Tasks"
          value="32"
          badgeText="TMS / SMMS"
          icon={AlertTriangle}
          variant="critical"
          subtext="SLA exceeded > 14 days"
        />
      </div>

      {/* DBSCAN Visualizer & Spatial Cluster Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Scatter Plot of Spatial Clusters */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-700" />
                Spatial DBSCAN Task Density Visualizer (Chainage vs Anomaly Magnitude)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tasks close in spatial proximity (Epsilon = 3.0 KM) are clustered for shadow maintenance
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              4 Optimal Clusters Identified
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Kilometer Chainage (KM)"
                  domain={[70, 240]}
                  unit=" KM"
                  tick={{ fontSize: 11, fill: '#64748B' }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Anomaly Magnitude"
                  domain={[0.4, 1.0]}
                  tick={{ fontSize: 11, fill: '#64748B' }}
                />
                <ZAxis type="number" dataKey="z" range={[80, 260]} name="Duration (Mins)" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-lg text-xs shadow-xl font-mono">
                          <div className="font-bold text-amber-300">{data.name}</div>
                          <div className="text-slate-300 mt-1">Chainage: KM {data.x}</div>
                          <div className="text-slate-300">Anomaly Score: {data.y}</div>
                          <div className="text-slate-300">Duration: {data.z} Mins</div>
                          <div className="text-emerald-400 mt-1 font-bold">{data.cluster}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter data={clusterPlotData}>
                  {clusterPlotData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-700" /> Engineering</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> S&T Signals</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-700" /> Traction OHE</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">Bubble radius proportional to task duration</span>
          </div>

          {/* DBSCAN Hyperparameter Telemetry & Selected Cluster Deep-Dive */}
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            {/* Hyperparameter Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Epsilon (ε Distance)</span>
                <span className="font-mono font-extrabold text-slate-900 text-sm mt-0.5 block">3.0 KM</span>
                <span className="text-[10px] text-slate-400">Spatial radius threshold</span>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Min Points (MinPts)</span>
                <span className="font-mono font-extrabold text-slate-900 text-sm mt-0.5 block">2 Tasks</span>
                <span className="text-[10px] text-slate-400">Core density requirement</span>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Silhouette Coefficient</span>
                <span className="font-mono font-extrabold text-emerald-700 text-sm mt-0.5 block">0.87</span>
                <span className="text-[10px] text-emerald-600 font-semibold">High spatial cohesion</span>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Consolidated Possession</span>
                <span className="font-mono font-extrabold text-blue-700 text-sm mt-0.5 block">180 Mins Saved</span>
                <span className="text-[10px] text-blue-600 font-semibold">-33.3% line downtime</span>
              </div>
            </div>

            {/* Active Selected Cluster Drilldown View */}
            {(() => {
              const activeClust = clusters.find(c => c.id === selectedClusterId) || clusters[0];
              const matchingPlotPoints = clusterPlotData.filter(d => d.cluster.includes(activeClust.kmRange.split(' ')[0]));
              return (
                <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        Inspecting: <strong className="text-blue-800">{activeClust.clusterName}</strong>
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-blue-200 text-blue-900 px-1.5 py-0.2 rounded">
                        {activeClust.kmRange}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Density {Math.round(activeClust.densityScore * 100)}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      <strong>Coordination Strategy: </strong>
                      {activeClust.coordinationStrategy || 'Simultaneous shadow possession with shared power cutoff and track safety escorts.'}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[11px] text-slate-500 font-semibold">Grouped Tasks:</span>
                      {matchingPlotPoints.map((pt, i) => (
                        <span key={i} className="text-[10px] font-mono font-semibold bg-white border border-slate-300 text-slate-700 px-2 py-0.5 rounded shadow-2xs">
                          {pt.name.split(' ')[0]} (KM {pt.x})
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/planner')}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shrink-0 shadow-xs transition-colors"
                  >
                    View in Planner →
                  </button>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Right Col: DBSCAN Clusters List */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-700" />
                Active DBSCAN Clusters
              </h3>
              <span className="text-xs font-mono font-bold text-slate-500">
                {clusters.length} Zones
              </span>
            </div>

            <div className="space-y-3">
              {clusters.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedClusterId(c.id)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    selectedClusterId === c.id
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{c.clusterName}</span>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                      Density: {Math.round(c.densityScore * 100)}%
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-mono mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {c.kmRange} ({c.tasksCount} Tasks)
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.departments.map(d => (
                      <StatusBadge key={d} status={d} variant="department" size="sm" />
                    ))}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Potential Block: <strong className="text-emerald-700">Yes (Shadowed)</strong></span>
                    <span className="font-mono font-bold text-blue-700">{c.estimatedWindowMin} min window</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => navigate('/planner')}
              className="w-full py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-800"
            >
              <span>Schedule Selected Cluster in Block Planner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Anomaly Detection Telemetry Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-red-600" />
              Isolation Forest Telemetry Anomaly Detections
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Unsupervised machine learning models identifying accelerated track degradation & repeat signal anomalies
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anomalies.map((anom) => (
            <div
              key={anom.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">{anom.assetId}</span>
                      <StatusBadge status={anom.department} variant="department" size="sm" />
                      <span className="text-xs font-mono text-slate-500">{anom.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      Score: {anom.anomalyScore}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5 font-bold">{anom.riskFactor} Risk</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                  <strong>Detection Rationale: </strong>
                  {anom.reason}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Defects in 30d: <strong>{anom.defectCount30d} events</strong></span>
                <button
                  onClick={() => {
                    const matchedTask = tasks.find(t => t.assetId === anom.assetId);
                    if (matchedTask) setSelectedTaskForDrawer(matchedTask);
                  }}
                  className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1"
                >
                  <span>Analyze Urgency Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DBSCAN Clarification Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-slate-700">
        <div className="flex items-start gap-2">
          <BrainCircuit className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold text-blue-950 mb-1">ⓘ DBSCAN Cluster Notice — Spatial Density vs Operational Priority</p>
            <p className="text-slate-600 leading-relaxed">
              DBSCAN clusters tasks by <strong className="text-slate-900">spatial proximity</strong> along the track chainage to identify which tasks can be combined into a single block window — saving repeated corridor possessions.
              Cluster density score reflects how tightly tasks are grouped, <strong className="text-red-700 font-bold">NOT</strong> how urgent they are.
              Priority is separately determined by the multi-factor scoring system: <strong className="text-slate-900">Criticality (92) + Urgency (81) + Availability Impact (78) → Priority Score (85)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* K-Means Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">K-Means Centroid Clustering — Strategic Staging Zones</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                K=4 geographic corridor zones for scheduling optimal track machine staging and resource pre-positioning
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded">
            4 Corridor Zones
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {kMeansClusters.map((km, i) => {
            const colors = [
              { ring: 'border-blue-200', badge: 'bg-blue-50 text-blue-800 border-blue-300', accent: 'text-blue-700' },
              { ring: 'border-purple-200', badge: 'bg-purple-50 text-purple-800 border-purple-300', accent: 'text-purple-700' },
              { ring: 'border-amber-200', badge: 'bg-amber-50 text-amber-800 border-amber-300', accent: 'text-amber-700' },
              { ring: 'border-teal-200', badge: 'bg-teal-50 text-teal-800 border-teal-300', accent: 'text-teal-700' },
            ];
            const c = colors[i % 4];
            return (
              <div key={km.id} className={`bg-slate-50/60 border ${c.ring} rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">{km.clusterName}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${c.badge}`}>
                    KM Centroid: {km.centroidKm}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center my-3">
                  <div>
                    <p className={`text-xl font-extrabold ${c.accent}`}>{km.tasksCount}</p>
                    <p className="text-[10px] text-slate-500">Tasks</p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 font-mono">{km.sharedMachineSavingsMin}</p>
                    <p className="text-[10px] text-slate-500">Min Saved</p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-emerald-700 font-mono">{km.departments.length}</p>
                    <p className="text-[10px] text-slate-500">Branches</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 mb-2">
                  <span className="font-semibold text-slate-800">Optimal Window: </span>
                  {km.optimalCorridorBlockWindow}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{km.description}</p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {km.departments.map(d => (
                    <span key={d} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-300 font-medium">{d}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900">K-Means vs DBSCAN in Indian Railways Operations:</strong> While DBSCAN identifies spatially-dense pockets (task groups) for same-window coordination,
            K-Means divides the entire corridor into K=4 strategic zones to pre-position machines at optimal centroid depots,
            reducing transit time waste and enabling parallel block windows across non-overlapping zones.
          </p>
        </div>
      </div>

    </div>
  );
};
