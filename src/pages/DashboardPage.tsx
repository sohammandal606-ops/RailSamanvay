import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { KPICard } from '../components/common/KPICard';
import { CorridorVisualizer } from '../components/common/CorridorVisualizer';
import { StatusBadge } from '../components/common/StatusBadge';
import { GovEmblem } from '../components/common/GovEmblem';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wrench,
  AlertTriangle,
  CalendarRange,
  ShieldAlert,
  Gauge,
  CheckCircle2,
  TrendingUp,
  Zap,
  Sparkles,
  ArrowRight,
  Clock,
  TrainTrack,
  Layers,
  BarChart3,
  Flame,
  Radio,
  RefreshCw,
  Database,
  Activity,
  RotateCcw,
  CheckSquare,
  ShieldCheck,
  Building2,
  FileCheck
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const {
    tasks,
    corridors,
    blockPlans,
    runAiOptimization,
    isOptimizing,
    setSelectedTaskForDrawer,
    setIsEmergencyModalOpen,
    dynamicEvents,
    triggerDynamicEvent,
    executionRecords,
    rejectedDecisions,
    planFeedback,
    currentUser
  } = useRailway();

  const navigate = useNavigate();

  const criticalTasks = tasks.filter(t => t.criticality === 'Critical');
  const pendingApprovals = blockPlans.filter(p => p.status === 'Pending Approval');

  // Recharts Data Sets
  const availabilityTrendData = [
    { day: 'Day 1', availability: 91.2, target: 95 },
    { day: 'Day 5', availability: 92.0, target: 95 },
    { day: 'Day 10', availability: 93.4, target: 95 },
    { day: 'Day 15', availability: 92.8, target: 95 },
    { day: 'Day 20', availability: 94.1, target: 95 },
    { day: 'Day 25', availability: 94.5, target: 95 },
    { day: 'Day 30', availability: 95.2, target: 95 },
  ];

  const priorityDistData = [
    { name: 'Critical', value: 86, color: '#DC2626' },
    { name: 'High', value: 242, color: '#F59E0B' },
    { name: 'Medium', value: 580, color: '#EAB308' },
    { name: 'Low', value: 340, color: '#10B981' },
  ];

  const departmentWiseData = [
    { name: 'Engineering', TMS_Track: 540, Integrated: 410 },
    { name: 'S&T (Signals)', SMMS_Signals: 380, Integrated: 310 },
    { name: 'Traction (OHE)', TDMS_Traction: 328, Integrated: 280 },
  ];

  const downtimeComparisonData = [
    { corridor: 'HWH-BWN', beforeAI: 160, afterAI: 110 },
    { corridor: 'BWN-DGR', beforeAI: 190, afterAI: 120 },
    { corridor: 'DGR-ASN', beforeAI: 110, afterAI: 75 },
    { corridor: 'ASN-DHN', beforeAI: 180, afterAI: 125 },
  ];

  return (
    <div className="space-y-6">
      {/* Official Government Operations Command Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Central Operations Command Room
              </h1>
              <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-300">
                COA INTEGRATED
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                5/5 FEEDS SYNCED
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              भारतीय रेल परिचालन नियंत्रण कक्ष • {currentUser.zone || 'Eastern Railway (ER) / Howrah Div'} • Sector: HWH – BWN – ASN
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex-1 lg:flex-initial px-3.5 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all border border-red-800 active:scale-98 shrink-0"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Emergency Block Request</span>
          </button>

          <button
            onClick={runAiOptimization}
            disabled={isOptimizing}
            className="flex-1 lg:flex-initial px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all border border-slate-800 disabled:opacity-50 active:scale-98 shrink-0"
          >
            <Zap className={`w-4 h-4 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Running CP-SAT Engine...' : 'Run CP-SAT Optimizer'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Re-Optimization Incident Simulator */}
      <div className="bg-amber-500/10 border border-amber-400/40 rounded-xl p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-700 rounded-lg shrink-0 mt-0.5">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Indian Railways Incident & Disruption Simulator (Automated Reactive Re-Plan)
                </h4>
                <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded">
                  G&SR RULE 1968
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Simulate unexpected track fractures, OHE line drops, or sudden train delays to trigger instant OR-Tools CP-SAT re-scheduling.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {dynamicEvents.map((evt) => (
              <button
                key={evt.id}
                onClick={() => triggerDynamicEvent(evt.id)}
                className="px-3 py-1.5 rounded-lg border border-amber-300 bg-white hover:bg-amber-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                title={evt.description}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulate: {evt.title.split(' ')[0]} ({evt.affectedSection})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 12 Key Performance Indicators (Comprehensive Operations Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        <KPICard
          title="Total Tasks"
          value="1,248"
          badgeText="TMS+SMMS+TDMS"
          icon={Wrench}
          trend={{ value: "+14", isNeutral: true, label: "today" }}
          variant="info"
          onClick={() => navigate('/tasks')}
        />

        <KPICard
          title="BDMS Block Demands"
          value="240"
          badgeText="Active Demands"
          icon={Database}
          trend={{ value: "Connected", isPositive: true, label: "BDMS" }}
          variant="info"
          onClick={() => navigate('/integration')}
        />

        <KPICard
          title="Critical Defects"
          value="86"
          badgeText="Urgent"
          icon={AlertTriangle}
          trend={{ value: "-8", isPositive: true, label: "resolved" }}
          variant="critical"
          onClick={() => navigate('/tasks')}
        />

        <KPICard
          title="Active Clusters"
          value="4 Zones"
          badgeText="DBSCAN + K-Means"
          icon={CalendarRange}
          trend={{ value: "100%", isPositive: true, label: "coordinated" }}
          variant="default"
          onClick={() => navigate('/insights')}
        />

        <KPICard
          title="Asset Availability"
          value="94.7%"
          badgeText="Mainline SLA"
          icon={CheckCircle2}
          trend={{ value: "+3.2%", isPositive: true, label: "vs target" }}
          variant="success"
          onClick={() => navigate('/analytics')}
        />

        <KPICard
          title="Block Utilization"
          value="87.3%"
          badgeText="Shadow Blocked"
          icon={Gauge}
          trend={{ value: "+26.3%", isPositive: true, label: "CP-SAT" }}
          variant="success"
          onClick={() => navigate('/analytics')}
        />

        <KPICard
          title="Active Possessions"
          value={`${executionRecords.filter(r => r.executionStatus === 'Block In Progress').length} Blocks`}
          badgeText="Track Telemetry"
          icon={Activity}
          trend={{ value: "Live", isPositive: true, label: "monitored" }}
          variant="warning"
          onClick={() => navigate('/approval')}
        />

        <KPICard
          title="Re-Plan Queue"
          value={`${rejectedDecisions.filter(d => d.replanStatus === 'Awaiting Re-Plan').length} Pending`}
          badgeText="CP-SAT Queue"
          icon={RotateCcw}
          trend={{ value: "Re-evaluation", isNeutral: true, label: "ready" }}
          variant="default"
          onClick={() => navigate('/approval')}
        />

        <KPICard
          title="HITL Clearance Gate"
          value={`${pendingApprovals.length} Pending`}
          badgeText="Strict HITL"
          icon={CheckSquare}
          trend={{ value: "Mandatory", isPositive: true, label: "human sign" }}
          variant="info"
          onClick={() => navigate('/approval')}
        />

        <KPICard
          title="Punctuality Score"
          value="99.8%"
          badgeText="COA Feeds"
          icon={ShieldAlert}
          trend={{ value: "Zero Delay", isPositive: true, label: "priority trains" }}
          variant="success"
          onClick={() => navigate('/analytics')}
        />

        <KPICard
          title="Audit Feedback"
          value={`${planFeedback.length} Audited`}
          badgeText="Continuous ML"
          icon={RefreshCw}
          trend={{ value: "Logged", isPositive: true, label: "post-block" }}
          variant="default"
          onClick={() => navigate('/approval')}
        />

        <KPICard
          title="CO2 & Energy Saved"
          value="42 MWh"
          badgeText="Multi-Depts"
          icon={TrendingUp}
          trend={{ value: "-18%", isPositive: true, label: "engine idle" }}
          variant="success"
          onClick={() => navigate('/analytics')}
        />
      </div>

      {/* Corridor Section Status Visualizer */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrainTrack className="w-5 h-5 text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Live Corridor Track Availability & Signaling State
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            HOWRAH – BARDDHAMAN – ASANSOL 3RD & 4TH LINES
          </span>
        </div>
        <CorridorVisualizer
          corridors={corridors}
          onSelectSection={() => {}}
        />
      </div>

      {/* Visualizations Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Asset Availability Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-700" />
                Asset Availability Trend (30-Day Moving SLA Window)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Target (95%) vs Actual Infrastructure Availability across Eastern Railway Mainline
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
              Current: 95.2%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={availabilityTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: '#64748B' }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#071A2E', borderRadius: '8px', color: '#fff', fontSize: '11px', border: '1px solid #1E3E62' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="availability"
                  name="Actual Availability (%)"
                  stroke="#1E40AF"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#1E40AF' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target SLA (95%)"
                  stroke="#059669"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Maintenance Priority Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                Task Priority Classification
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Asset defects classified by safety criticality</p>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityDistData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {priorityDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#071A2E', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-red-50 p-1.5 rounded text-red-800 font-mono font-bold border border-red-200">
              86 Critical (&lt;24h)
            </div>
            <div className="bg-amber-50 p-1.5 rounded text-amber-800 font-mono font-bold border border-amber-200">
              242 High Priority
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 Charts & Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 3: Department-wise Maintenance */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-700" />
                Multi-Branch Block Coordination
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Isolated Requests vs Coordinated Shadow Blocks</p>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentWiseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#071A2E', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="TMS_Track" name="Individual Req" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Integrated" name="AI Coordinated" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Downtime Reduction */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                Downtime Reduction (Minutes)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Line Block Possession Duration: Before vs After AI</p>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downtimeComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="corridor" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} unit="m" />
                <Tooltip contentStyle={{ backgroundColor: '#071A2E', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="beforeAI" name="Legacy Plan (mins)" fill="#F87171" radius={[4, 4, 0, 0]} />
                <Bar dataKey="afterAI" name="AI Optimized (mins)" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Approval Queue & Action Feed */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">Pending Form G-48 Sanctions</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                {pendingApprovals.length} Awaiting Sanction
              </span>
            </div>

            <div className="space-y-3">
              {pendingApprovals.slice(0, 2).map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => navigate(`/approval/${plan.id}`)}
                  className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-800">{plan.id}</span>
                    <span className="text-[10px] font-mono text-slate-500">{plan.date}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-1 truncate">{plan.corridor}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono">{plan.startTime} – {plan.endTime} ({plan.durationMin}m)</span>
                    <span className="font-bold text-emerald-700 font-mono">{plan.blockUtilization}% Util</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              to="/approval"
              className="w-full py-2 px-3 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Open Sanction Desk (Sr. DOM)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
