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
  Building2,
  PhoneCall,
  Lock,
  ExternalLink,
  Award
} from 'lucide-react';
import { GovMasthead } from '../components/common/GovMasthead';
import { GovEmblem } from '../components/common/GovEmblem';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans w-full max-w-full overflow-x-hidden">
      {/* Official Government of India & Ministry of Railways Masthead */}
      <GovMasthead variant="dark" />

      {/* Primary National Portal Header */}
      <header className="sticky top-0 z-40 bg-railway-navy text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Dual Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <GovEmblem size="md" variant="gold" className="shrink-0 sm:hidden" />
            <GovEmblem size="lg" variant="gold" className="shrink-0 hidden sm:inline-flex" />
            <div className="min-w-0 overflow-hidden">
              <div className="flex items-center gap-1.5 flex-nowrap">
                <span className="text-base sm:text-xl font-extrabold tracking-tight whitespace-nowrap">
                  RailSamanvay
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0 hidden sm:inline">
                  AI-OPS
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-400 font-medium truncate">
                रेल समन्वय • Auto Block Planning System
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300 shrink-0">
            <a href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</a>
            <a href="#architecture" className="hover:text-amber-400 transition-colors">Integrated Systems</a>
            <a href="#features" className="hover:text-amber-400 transition-colors">Safety & G&SR Rules</a>
            <a href="#benefits" className="hover:text-amber-400 transition-colors">Zonal Impacts</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/login"
              title="IR-SSO Login"
              className="text-xs font-semibold text-slate-200 hover:text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden md:inline">IR-SSO Login</span>
            </Link>
            <Link
              to="/dashboard"
              className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5 shrink-0 active:scale-95 whitespace-nowrap"
            >
              <span>Command Center</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </div>
      </header>

      {/* Official Government Breaking Ticker */}
      <div className="bg-slate-900 text-slate-300 text-xs px-3 sm:px-6 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono shrink-0 flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse" />
              LIVE DISPATCH
            </span>
            <span className="truncate text-slate-300 text-[11px] font-mono">
              Centralised Maintenance Coordination active across Eastern, Northern & Western Zonal Railways • G-48 Electronic Line Possession active.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-amber-400 shrink-0">
            <PhoneCall className="w-3 h-3" />
            <span>CRIS NOC: 139</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-railway-navy via-slate-900 to-slate-950 text-white pt-12 sm:pt-16 pb-16 sm:pb-24 px-3 sm:px-6 w-full max-w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ministry of Railways • SIH 2026 AI Operations Initiative</span>
            </div>

            <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight px-1 break-words">
              Automated Railway{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-300 to-blue-300">
                Block Planning & Coordination
              </span>
            </h1>

            <p className="mt-4 text-xs sm:text-base text-slate-300 leading-relaxed font-normal px-2 max-w-2xl mx-auto">
              Synthesizing Track Management (TMS), Signal Maintenance (SMMS), and Traction Distribution (TDMS) with Control Office Application (COA) live timetables to optimize railway asset uptime.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Access Operations Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all text-center active:scale-98 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Single Sign-On (IR-SSO)</span>
              </Link>
            </div>
          </div>

          {/* Interactive Stylized Hero Visualizer */}
          <div className="bg-slate-900/95 rounded-2xl border border-slate-700 p-3 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-md w-full max-w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-bold font-mono text-white text-[11px] sm:text-sm truncate">
                  LIVE CORRIDOR TELEMETRY: HOWRAH (HWH) — ASANSOL (ASN)
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-slate-400 shrink-0">
                <span className="text-amber-400 font-bold">● G-48 BLOCK SANCTIONED</span>
                <span>• CP-SAT SOLVER ACTIVE</span>
              </div>
            </div>

            {/* Visualizer Track diagram */}
            <div className="relative py-6 px-2 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-mono text-slate-400 mb-2">
                <span>HWH (KM 0)</span>
                <span>BWN (KM 106)</span>
                <span>DGR (KM 171)</span>
                <span>ASN (KM 200)</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full relative overflow-hidden flex">
                <div className="w-[40%] bg-emerald-600 h-full" title="Track Clear - Normal Running" />
                <div className="w-[30%] bg-amber-500 h-full animate-pulse" title="Caution Order Active - TSR 30 kmph" />
                <div className="w-[30%] bg-blue-600 h-full" title="Shadow Maintenance Block Active" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Civil Engineering (TMS)</span>
                  <span className="text-xs font-bold text-sky-400">Track Tamping (CSM-42)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Signal & Telecom (SMMS)</span>
                  <span className="text-xs font-bold text-amber-400">Point Machine Overhaul</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Electrical Traction (TDMS)</span>
                  <span className="text-xs font-bold text-purple-400">OHE Neutral Section Test</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 National Operational Impact Cards */}
      <section className="py-12 px-3 sm:px-6 max-w-7xl mx-auto -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-800 w-fit mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">42%</div>
            <p className="text-xs font-bold text-slate-800 mt-1">Downtime Reduction</p>
            <p className="text-[11px] text-slate-500 mt-0.5">By clustering multi-department maintenance into synchronized shadow windows.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800 w-fit mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">99.4%</div>
            <p className="text-xs font-bold text-slate-800 mt-1">Punctuality Retention</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Predictive conflict analysis eliminates unscheduled passenger train detentions.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 w-fit mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">5 Legacy Feeds</div>
            <p className="text-xs font-bold text-slate-800 mt-1">Unified Railway Data</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Automated ingestion from TMS, SMMS, TDMS, COA, and BDMS portals.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="p-2 rounded-lg bg-red-50 text-red-800 w-fit mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">100% G&SR</div>
            <p className="text-xs font-bold text-slate-800 mt-1">Human-in-the-Loop</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Mandatory authorization by Section Controllers and Sr. DOM before line possession.</p>
          </div>
        </div>
      </section>

      {/* Integrated Legacy Railway Systems Architecture */}
      <section id="architecture" className="py-16 px-3 sm:px-6 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase font-bold tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Enterprise Railway Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Integration with Indian Railways IT Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              RailSamanvay AI interfaces directly with established railway IT systems managed by the Centre for Railway Information Systems (CRIS).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">TMS</span>
                <h3 className="font-bold text-sm text-slate-900">Track Management System</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingests ultrasonic flaw detection (USFD) records, Oscillation Monitoring System (OMS) peak defect locations, and rail tamping requisitions across all P.Way divisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">SMMS</span>
                <h3 className="font-bold text-sm text-slate-900">Signal Maintenance Management</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coordinates electronic interlocking maintenance, point machine testing, track circuit validations, and axle counter calibrations without disrupting main line signals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded">TDMS</span>
                <h3 className="font-bold text-sm text-slate-900">Traction Distribution Management</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Synchronizes Overhead Equipment (OHE) power isolation requests, neutral section inspections, and tower wagon movements with civil engineering track blocks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & G&SR Rules Section */}
      <section id="features" className="py-16 px-3 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-railway-navy text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold mb-4">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Indian Railways G&SR Rule 1968 Compliant</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Safety First: Human Authority Remains Sovereign
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                Under Indian Railways General & Subsidiary Rules (G&SR), no algorithm can grant corridor possession or power block. RailSamanvay AI formulates the mathematically optimal plan, while final sanction rests exclusively with the authorized Section Controller and Sr. Divisional Operations Manager (Sr. DOM).
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/approval"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all"
                >
                  View Approval Workflow (HITL)
                </Link>
                <Link
                  to="/settings"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-all border border-slate-700"
                >
                  View Safety Buffer Thresholds
                </Link>
              </div>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
              <div className="text-amber-400 font-bold flex items-center gap-2 border-b border-slate-800 pb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>FORM G-48 BLOCK REQUISITION CHECKLIST</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span>1. Adjacent Track Caution Order (TSR):</span>
                  <span className="text-emerald-400 font-bold">VERIFIED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>2. OHE Power Isolation Clearance (TPC):</span>
                  <span className="text-emerald-400 font-bold">GRANTED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>3. S&T Disconnection Notice (S&T(T/351)):</span>
                  <span className="text-emerald-400 font-bold">ISSUED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>4. Section Controller Line Clear Grant:</span>
                  <span className="text-amber-400 font-bold">MANDATORY HITL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Official Government Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <GovEmblem size="md" variant="gold" />
              <div>
                <h4 className="text-white font-extrabold text-base tracking-tight">
                  RailSamanvay AI — Portal of Indian Railways
                </h4>
                <p className="text-xs text-amber-400 font-medium">
                  Ministry of Railways • Government of India
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Developed under the Smart India Hackathon (SIH 2026) in collaboration with the Centre for Railway Information Systems (CRIS) to revolutionize maintenance block planning across all 18 Zonal Railways.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2 font-mono">
              <span>GIGW 3.0 Compliant</span>
              <span>•</span>
              <span>W3C-WAI (WCAG 2.1)</span>
              <span>•</span>
              <span>NIC-CERT Secure</span>
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold uppercase text-[11px] tracking-wider mb-3">
              Official Portals
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li><a href="https://indianrailways.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ministry of Railways</a></li>
              <li><a href="https://cris.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Centre for Railway Information Systems (CRIS)</a></li>
              <li><a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Digital India</a></li>
              <li><a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">National Portal of India</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold uppercase text-[11px] tracking-wider mb-3">
              Emergency & Support
            </h5>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>RailMadad Toll-Free: 139</span>
              </div>
              <p className="text-slate-400">
                CRIS Helpdesk: (011) 2410-4525<br />
                Chanakyapuri, New Delhi - 110021
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="border-t border-slate-800 bg-black/50 py-4 px-3 sm:px-6 text-[11px] text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              © 2026 Ministry of Railways, Government of India. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <Link to="/settings" className="hover:text-slate-300">Privacy Policy</Link>
              <span>•</span>
              <Link to="/settings" className="hover:text-slate-300">Terms of Use</Link>
              <span>•</span>
              <Link to="/settings" className="hover:text-slate-300">Hyperlink Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
