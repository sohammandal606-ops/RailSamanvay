import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrainTrack,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
  AlertOctagon,
  Cpu,
  Database,
  Users,
  ChevronRight,
  Train,
  Wrench,
  Radio,
  FileCheck,
  Building2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans w-full max-w-full overflow-x-hidden">
      {/* Top Enterprise Header */}
      <header className="sticky top-0 z-50 bg-railway-navy/95 backdrop-blur-md border-b border-slate-800 text-white w-full max-w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md border border-blue-400/30 shrink-0">
              <TrainTrack className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight truncate">RailSamanvay</span>
                <span className="text-[10px] sm:text-xs font-mono font-bold bg-blue-500/20 text-blue-300 px-1.5 sm:px-2 py-0.5 rounded border border-blue-400/30 shrink-0">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono truncate hidden sm:block">
                Indian Railways Automatic Block Planning
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-200 hover:text-white px-2 sm:px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 whitespace-nowrap active:scale-95"
            >
              <span className="hidden sm:inline">Explore Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-railway-navy via-slate-900 to-slate-950 text-white pt-12 sm:pt-16 pb-16 sm:pb-24 px-3 sm:px-6 w-full max-w-full">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 2026 AI Operations Innovation</span>
            </div>

            <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight px-1 break-words">
              Intelligent Railway Maintenance{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Block Planning
              </span>
            </h1>

            <p className="mt-4 text-xs sm:text-base text-slate-300 leading-relaxed font-normal px-2 max-w-2xl mx-auto break-words">
              AI-powered coordination of Engineering, S&T and Traction maintenance blocks to maximize infrastructure availability and minimize asset downtime.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Explore Live Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="px-6 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center active:scale-98"
              >
                View How It Works
              </a>
            </div>
          </div>

          {/* Interactive Stylized Hero Visualizer (Railway Corridor & Multi-department Coordinated Shadow Block) */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-700 p-3 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-md w-full max-w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-mono font-bold text-white uppercase text-[10px] sm:text-xs truncate">
                  Corridor Coordinated Planning Visualization (KM 140 – KM 146)
                </span>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3 font-mono text-[10px] sm:text-[11px] text-slate-400">
                <span className="sm:hidden text-amber-300 font-sans">↔ Swipe timeline</span>
                <span>TMS Track • SMMS Signals • TDMS Power</span>
              </div>
            </div>

            {/* Stylized Gantt/Corridor Track */}
            <div className="overflow-x-auto pb-2 w-full max-w-full">
              <div className="min-w-[560px] space-y-3 font-mono text-xs">
                {/* Timeline ruler */}
                <div className="grid grid-cols-6 gap-2 text-center text-slate-500 border-b border-slate-800 pb-2 text-[11px]">
                  <span>08:00</span>
                  <span>09:00</span>
                  <span className="text-amber-400 font-bold bg-amber-500/10 rounded py-0.5">10:00 (START)</span>
                  <span className="text-amber-400 font-bold bg-amber-500/10 rounded py-0.5">11:00 (SHADOW)</span>
                  <span className="text-amber-400 font-bold bg-amber-500/10 rounded py-0.5">12:00 (CLEAR)</span>
                  <span>13:00</span>
                </div>

              {/* Engineering track */}
              <div className="flex items-center gap-3">
                <span className="w-28 text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-blue-500" />
                  Engineering:
                </span>
                <div className="flex-1 grid grid-cols-6 gap-2">
                  <div className="col-span-2" />
                  <div className="col-span-3 bg-blue-600/40 border border-blue-500 text-blue-200 rounded p-1.5 text-center text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm">
                    <Wrench className="w-3 h-3" />
                    Track Deep Screening & Rail Renewal [ENG-1042]
                  </div>
                  <div className="col-span-1" />
                </div>
              </div>

              {/* S&T Track */}
              <div className="flex items-center gap-3">
                <span className="w-28 text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-amber-500" />
                  S&T Signals:
                </span>
                <div className="flex-1 grid grid-cols-6 gap-2">
                  <div className="col-span-2" />
                  <div className="col-span-2 bg-amber-600/40 border border-amber-500 text-amber-200 rounded p-1.5 text-center text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm">
                    <Radio className="w-3 h-3" />
                    Electronic Interlocking & Track Circuit [SIG-2041]
                  </div>
                  <div className="col-span-2" />
                </div>
              </div>

              {/* Traction Track */}
              <div className="flex items-center gap-3">
                <span className="w-28 text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-purple-500" />
                  Traction OHE:
                </span>
                <div className="flex-1 grid grid-cols-6 gap-2">
                  <div className="col-span-2" />
                  <div className="col-span-3 bg-purple-600/40 border border-purple-500 text-purple-200 rounded p-1.5 text-center text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm">
                    <Zap className="w-3 h-3" />
                    25kV Cantilever & Stagger Adjustment [TRA-3022]
                  </div>
                  <div className="col-span-1" />
                </div>
              </div>

              {/* Train Operations */}
              <div className="flex items-center gap-3 pt-1">
                <span className="w-28 text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-emerald-500" />
                  Train Ops:
                </span>
                <div className="flex-1 grid grid-cols-6 gap-2">
                  <div className="col-span-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded p-1 text-center text-[10px] flex items-center justify-center gap-1">
                    <Train className="w-3 h-3" /> 22301 Vande Bharat
                  </div>
                  <div className="col-span-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded p-1 text-center text-[10px] flex items-center justify-center gap-1">
                    <Train className="w-3 h-3" /> 12301 Rajdhani Ex
                  </div>
                  <div className="col-span-3 bg-slate-800/80 border border-dashed border-slate-600 text-slate-400 rounded p-1 text-center text-[10px] flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    SHADOW BLOCK WINDOW (Passenger Trains Diverted / No Detention)
                  </div>
                  <div className="col-span-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded p-1 text-center text-[10px] flex items-center justify-center gap-1">
                    <Train className="w-3 h-3" /> 13029 Express
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* AI Callout */}
            <div className="mt-5 p-3 rounded-lg bg-blue-950/60 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-blue-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>AI Synergy Detected:</strong> 3 departments merged into a single 120-min window saving 180 min asset downtime.
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[11px] border border-emerald-400/30">
                89% Block Utilization
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-slate-200 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">3 Depts</div>
            <div className="text-[11px] sm:text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">
              TMS, SMMS & TDMS Integrated
            </div>
          </div>
          <div className="p-3 sm:p-4 border-l border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono">24 / 7</div>
            <div className="text-[11px] sm:text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">
              Control Room Planning Support
            </div>
          </div>
          <div className="p-3 sm:p-4 border-t md:border-t-0 md:border-l border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">Weekly & Monthly</div>
            <div className="text-[11px] sm:text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">
              Dynamic Lookahead Planning
            </div>
          </div>
          <div className="p-3 sm:p-4 border-t md:border-t-0 border-l border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 font-mono">100% G&SR</div>
            <div className="text-[11px] sm:text-xs text-slate-500 mt-1 font-semibold uppercase tracking-wider">
              Railway Safety Rules Validated
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            Current Operations Challenge
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Why Railway Block Planning Needs Intelligence
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Independent department scheduling leads to repeated corridor shutdowns, sub-optimal maintenance windows, and avoidable train detentions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold font-mono text-base mb-4 border border-red-200">
              01
            </div>
            <h4 className="text-base font-bold text-slate-900">Decentralized Planning</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Engineering, S&T and Traction independently request maintenance blocks without visibility into overlapping spatial corridors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold font-mono text-base mb-4 border border-amber-200">
              02
            </div>
            <h4 className="text-base font-bold text-slate-900">Poor Block Utilization</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Available maintenance windows are frequently utilized below 60% capacity because single-department tasks fail to leverage shadow possessions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold font-mono text-base mb-4 border border-purple-200">
              03
            </div>
            <h4 className="text-base font-bold text-slate-900">Asset Downtime Spikes</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Delayed maintenance causes speed restrictions and unexpected rail/OHE failures, reducing total network infrastructure throughput.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-mono text-base mb-4 border border-blue-200">
              04
            </div>
            <h4 className="text-base font-bold text-slate-900">Operational Conflicts</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Block planning frequently conflicts with high-priority passenger services (Vande Bharat / Rajdhani) and scheduled freight rake paths.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section (Transformation Pipeline) */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
              The Paradigm Shift
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              From Departmental Silos to Unified AI Orchestration
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              How RailSamanvay AI harmonizes maintenance data streams into optimized, rule-validated block recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* CURRENT AS-IS */}
            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold mb-4">
                  <AlertOctagon className="w-4 h-4" />
                  CURRENT RAILWAY PLANNING PRACTICE
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-900 rounded border border-slate-700 text-slate-300 flex items-center justify-between">
                    <span>TMS (Track Management System)</span>
                    <span className="text-rose-400">Separate Request</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-700 text-slate-300 flex items-center justify-between">
                    <span>SMMS (Signalling Maintenance System)</span>
                    <span className="text-rose-400">Separate Request</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-700 text-slate-300 flex items-center justify-between">
                    <span>TDMS (Traction Distribution System)</span>
                    <span className="text-rose-400">Separate Request</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded bg-rose-950/50 border border-rose-800 text-rose-200 text-xs leading-relaxed">
                Result: 8+ separate block closures per week, 540 minutes total asset downtime, recurring operational friction with Operating Department.
              </div>
            </div>

            {/* TO-BE WITH RAILSAMANVAY AI */}
            <div className="bg-blue-950/60 rounded-xl p-6 border border-blue-500/50 flex flex-col justify-between relative shadow-xl">
              <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 text-[10px] font-mono font-extrabold px-3 py-0.5 rounded-full uppercase">
                AI Powered Future
              </div>
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  RAILSAMANVAY AI INTEGRATED PIPELINE
                </div>
                
                {/* Pipeline Flowchart */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-900/90 rounded border border-blue-400/40 text-blue-200 font-mono flex items-center justify-between">
                    <span>TMS + SMMS + TDMS + COA Data Telemetry</span>
                    <Database className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-center text-slate-500 text-xs">↓</div>
                  <div className="p-2.5 bg-slate-900/90 rounded border border-blue-400/40 text-blue-200 font-mono flex items-center justify-between">
                    <span>Isolation Forest Anomaly & DBSCAN Clustering</span>
                    <Cpu className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-center text-slate-500 text-xs">↓</div>
                  <div className="p-2.5 bg-slate-900/90 rounded border border-blue-400/40 text-blue-200 font-mono flex items-center justify-between">
                    <span>Domain Rule Engine & Urgency Priority Scoring</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-center text-slate-500 text-xs">↓</div>
                  <div className="p-2.5 bg-slate-900/90 rounded border border-blue-400/40 text-blue-200 font-mono flex items-center justify-between">
                    <span>Human Approval by Railway Section Controller</span>
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs leading-relaxed">
                Result: 33% reduction in corridor downtime, 88% block utilization, 0 passenger timetable penalties.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
            System Capabilities
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Built for High-Density Indian Railway Operations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Multi-Source Data Integration',
              desc: 'Continuous real-time ingestion from Track Management (TMS), Signalling (SMMS), Traction Distribution (TDMS), and Control Office (COA).',
              icon: Database
            },
            {
              title: 'AI Anomaly Detection',
              desc: 'Isolation Forest algorithms uncover hidden track geometry degradation and signal relay failure signatures before failure.',
              icon: Cpu
            },
            {
              title: 'Spatial Maintenance Clustering',
              desc: 'DBSCAN algorithms cluster nearby Engineering, S&T, and Traction tasks along the same kilometer chainage into single shadow blocks.',
              icon: Layers
            },
            {
              title: 'Domain Safety Rule Engine',
              desc: 'Validates maximum block duration, 25kV OHE isolation clearances, speed restriction buffers, and G&SR compliance.',
              icon: ShieldCheck
            },
            {
              title: 'Dynamic Urgency Scoring',
              desc: '5-factor normalized urgency calculation (Asset Criticality, Defect Severity, Overdue Days, Anomaly Magnitude, Train Impact).',
              icon: BarChart3
            },
            {
              title: 'Human-in-the-Loop Approval',
              desc: 'Transparent AI reasoning with side-by-side timetable impact analysis. Controllers retain complete authorization authority.',
              icon: Users
            },
            {
              title: 'Weekly & Monthly Calendars',
              desc: 'Lookahead Gantt views showing planned versus completed blocks with automated corridor congestion forecasting.',
              icon: Calendar
            },
            {
              title: 'Dynamic Re-Planning for Emergencies',
              desc: 'Instant emergency injection triggers automated re-slotting of routine shadow blocks without human recalculation bottlenecks.',
              icon: AlertOctagon
            },
            {
              title: 'Management Analytics & Reports',
              desc: 'One-click executive PDF/CSV exports comparing before vs after AI block efficiency and asset availability trends.',
              icon: FileCheck
            }
          ].map((f, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-4 border border-slate-200">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{f.title}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Philosophy Banner */}
      <section id="architecture" className="bg-railway-navy text-white py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono mb-4 border border-amber-400/30">
            <ShieldCheck className="w-4 h-4" />
            <span>OPERATIONAL SAFETY ETHOS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            "AI recommends. Railway authorities validate."
          </h2>

          <p className="mt-4 text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            RailSamanvay AI provides intelligent synthesis and mathematical optimization, but strict railway safety protocols ensure that final corridor possession is only executed upon authorized officer review.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left text-xs font-mono">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <span className="text-amber-400 font-bold block">Isolation Forest</span>
              <span className="text-slate-400 text-[11px]">Unsupervised anomaly detection</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <span className="text-blue-400 font-bold block">DBSCAN Clustering</span>
              <span className="text-slate-400 text-[11px]">Chainage spatial grouping</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <span className="text-emerald-400 font-bold block">Domain Rule Engine</span>
              <span className="text-slate-400 text-[11px]">G&SR safety constraints</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <span className="text-purple-400 font-bold block">MIP Optimizer</span>
              <span className="text-slate-400 text-[11px]">Timetable slot solver</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 sm:py-12 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
              <TrainTrack className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">RailSamanvay AI</span>
              <p className="text-[11px] text-slate-500">Smart India Hackathon (SIH 2026) Initiative</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400">
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/planner" className="hover:text-white">Block Planner</Link>
            <Link to="/approval" className="hover:text-white">Approval Queue</Link>
            <Link to="/login" className="hover:text-white">Sign In</Link>
          </div>

          <div className="text-center sm:text-right text-[11px] font-mono text-slate-500">
            <div>Internal Enterprise System Mock</div>
            <div>Indian Railways Operating & Maintenance Prototype</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
