import React from 'react';
import { useRailway } from '../context/RailwayContext';
import { KPICard } from '../components/common/KPICard';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Train,
  Layers,
  Sparkles,
  ArrowDownRight,
  ArrowUpRight,
  Download
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { showToast } = useRailway();

  const comparisonData = [
    { metric: 'Asset Availability (%)', beforeAI: 91.5, afterAI: 95.4, target: 95.0 },
    { metric: 'Block Utilization (%)', beforeAI: 61.2, afterAI: 87.8, target: 85.0 },
    { metric: 'Maintenance Completion (%)', beforeAI: 74.0, afterAI: 93.5, target: 90.0 },
    { metric: 'Integrated Blocks (%)', beforeAI: 22.0, afterAI: 69.4, target: 60.0 },
  ];

  const downtimeTrend = [
    { month: 'Apr', before: 580, after: 410 },
    { month: 'May', before: 610, after: 390 },
    { month: 'Jun', before: 540, after: 370 },
    { month: 'Jul', before: 590, after: 360 },
    { month: 'Aug', before: 550, after: 350 },
    { month: 'Sep (Now)', before: 540, after: 360 },
  ];

  const radarData = [
    { subject: 'Safety Rules', BeforeAI: 80, AfterAI: 100, fullMark: 100 },
    { subject: 'Block Utilization', BeforeAI: 60, AfterAI: 90, fullMark: 100 },
    { subject: 'Timetable Slack', BeforeAI: 55, AfterAI: 92, fullMark: 100 },
    { subject: 'Cross-Dept Sync', BeforeAI: 40, AfterAI: 95, fullMark: 100 },
    { subject: 'Asset Uptime', BeforeAI: 75, AfterAI: 96, fullMark: 100 },
    { subject: 'Emergency Agility', BeforeAI: 50, AfterAI: 88, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Operational Performance & AI Impact Analytics
            </h1>
            <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300">
              BEFORE VS AFTER SIMULATION
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Executive metrics demonstrating corridor throughput, downtime reduction, and block integration efficiency
          </p>
        </div>

        <button
          onClick={() => showToast('Analytics Exported', 'Full analytical performance report downloaded.', 'success')}
          className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Analytics PDF</span>
        </button>
      </div>

      {/* 6 Top Analytics KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KPICard
          title="Asset Availability"
          value="95.4%"
          badgeText="+3.9%"
          icon={CheckCircle2}
          variant="success"
          trend={{ value: "+3.9%", isPositive: true, label: "vs legacy" }}
        />

        <KPICard
          title="Asset Downtime"
          value="360m"
          badgeText="-33.3%"
          icon={Clock}
          variant="success"
          trend={{ value: "-180m", isPositive: true, label: "saved / week" }}
        />

        <KPICard
          title="Block Utilization"
          value="87.8%"
          badgeText="+26.6%"
          icon={Gauge}
          variant="success"
          trend={{ value: "+26.6%", isPositive: true, label: "AI efficiency" }}
        />

        <KPICard
          title="Task Completion"
          value="93.5%"
          badgeText="SLA Met"
          icon={BarChart3}
          variant="info"
          trend={{ value: "+19.5%", isPositive: true, label: "completion" }}
        />

        <KPICard
          title="Train Disruption"
          value="0.0%"
          badgeText="Pax Guarded"
          icon={Train}
          variant="success"
          trend={{ value: "0 mins", isPositive: true, label: "punctuality loss" }}
        />

        <KPICard
          title="Integrated Blocks"
          value="69.4%"
          badgeText="Multi-Dept"
          icon={Layers}
          variant="info"
          trend={{ value: "+47.4%", isPositive: true, label: "synergy" }}
        />
      </div>

      {/* Main Comparative Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Before vs After AI Bar Comparison */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Key Operational Metrics: Legacy vs RailSamanvay AI
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Comparative benchmarks across Indian Railways operations</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="metric" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748B' }} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="beforeAI" name="Legacy Siloed Planning" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="afterAI" name="RailSamanvay AI Integrated" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: 6-Month Asset Downtime Reduction Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Monthly Corridor Downtime Reduction (Minutes)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Total line possession duration per month</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={downtimeTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} unit="m" />
                <Tooltip contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="before" name="Legacy Downtime (Mins)" stroke="#F87171" strokeWidth={2} strokeDasharray="3 3" />
                <Line type="monotone" dataKey="after" name="RailSamanvay AI Downtime (Mins)" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Radar Chart: Multi-Dimensional Operational Synergy */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Multi-Dimensional Operations Radar
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Holistic improvement across safety, cross-department sync, and agility</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">*Simulation / Demo Data for SIH 2026 Evaluation</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar name="Legacy Practice" dataKey="BeforeAI" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.2} />
              <Radar name="RailSamanvay AI Engine" dataKey="AfterAI" stroke="#2563EB" fill="#2563EB" fillOpacity={0.4} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0B192C', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
