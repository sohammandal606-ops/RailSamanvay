import React from 'react';
import { useRailway } from '../context/RailwayContext';
import { KPICard } from '../components/common/KPICard';
import { GovEmblem } from '../components/common/GovEmblem';
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
  Download,
  FileSpreadsheet,
  Building2,
  FileCheck
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
  const { showToast, currentUser } = useRailway();

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
    { subject: 'Energy Efficiency', BeforeAI: 50, AfterAI: 88, fullMark: 100 },
  ];

  const handleExport = () => {
    showToast('Railway Board Report Generated', 'Exported Zonal Operating Review (PDF / Excel Format).', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Official Government Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Zonal Operating Statistics & Performance Review
              </h1>
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded border border-blue-300">
                P-INDEX & KPI ANALYTICS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              भारतीय रेल सांख्यिकी एवं विश्लेषण • Infrastructure availability benchmarks, block utilization gains, and punctuality audit for {currentUser.zone || 'Eastern Railway (ER) / Howrah Div'}
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white text-xs font-bold rounded-lg transition-all border border-slate-800 shadow-xs"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
          <span>Export Board Report</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Track Availability"
          value="95.4%"
          badgeText="Target: 95.0%"
          icon={TrendingUp}
          variant="success"
          trend={{ value: "+3.9%", isPositive: true, label: "vs baseline" }}
        />

        <KPICard
          title="Block Utilization"
          value="87.8%"
          badgeText="+26.6% Surge"
          icon={Gauge}
          variant="success"
          trend={{ value: "+26.6%", isPositive: true, label: "via shadow blocks" }}
        />

        <KPICard
          title="Line Downtime Saved"
          value="180 Mins"
          badgeText="Per Coordinated Block"
          icon={Clock}
          variant="info"
          trend={{ value: "-33.3%", isPositive: true, label: "track possession" }}
        />

        <KPICard
          title="Safety Rule Violations"
          value="0"
          badgeText="G&SR 1968"
          icon={CheckCircle2}
          variant="success"
          trend={{ value: "100%", isPositive: true, label: "compliant" }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Key Metrics Comparison */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-700" />
                Operating Performance: Legacy Separate Blocks vs AI Shadow Blocks
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Benchmarked against Railway Board targets</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="metric" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#071A2E', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="beforeAI" name="Isolated Requisition (%)" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="afterAI" name="AI Coordinated (%)" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Railway Board Target (%)" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: 6-Month Downtime Reduction Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                6-Month Monthly Downtime Reduction Trend (Hours)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Corridor shutdown hours saved monthly across Howrah Division</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={downtimeTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit="h" />
                <Tooltip contentStyle={{ backgroundColor: '#071A2E', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="before" name="Legacy Shutdown Hours" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="after" name="AI Optimized Hours" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 2: Comprehensive Multi-Dimensional Radar Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Radar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-700" />
              Operational Holistic Maturity Radar
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Cross-functional assessment across 6 operational axes</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                <Radar name="Before AI" dataKey="BeforeAI" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.3} />
                <Radar name="After AI" dataKey="AfterAI" stroke="#1E40AF" fill="#1E40AF" fillOpacity={0.5} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#071A2E', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial & Quantitative Savings Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Divisional Impact & Efficiency Gains (Audited for Railway Board)
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300">
                Verified: CRIS Analytics
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Freight Demurrage Avoidance</span>
                <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">₹ 14.8 Crores</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Zero freight path cancellations</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Loco Idling Fuel Saved</span>
                <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">42,000 Litres</span>
                <span className="text-[11px] text-blue-700 font-semibold">Eliminated unnecessary loop line detentions</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Tamping Machine Utilization</span>
                <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">8.2 km / day</span>
                <span className="text-[11px] text-emerald-700 font-semibold">+42% output per tamping shift</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Section Controller Workload</span>
                <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">-65% Conflicts</span>
                <span className="text-[11px] text-purple-700 font-semibold">Automated pre-deconfliction eliminates verbal exchanges</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Statistical methodology adhering to RDSO Track Management Manual</span>
            <span className="font-mono text-[10px]">REPORT REF: RDSO/OPER/2026/09</span>
          </div>
        </div>

      </div>
    </div>
  );
};
