import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useRailway } from '../../context/RailwayContext';
import { EmergencyModal } from '../modals/EmergencyModal';
import { OptimizationResultModal } from '../modals/OptimizationResultModal';
import { TaskUrgencyDrawer } from '../drawers/TaskUrgencyDrawer';
import { GovEmblem } from '../common/GovEmblem';
import {
  AlertTriangle,
  Flame,
  X,
  CheckCircle2,
  Info,
  ShieldAlert,
  Zap,
  ArrowRight,
  Radio,
  FileCheck,
  ShieldCheck,
  Building2,
  PhoneCall
} from 'lucide-react';

export const Layout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const {
    activeEmergencyAlert,
    dismissEmergencyAlert,
    isEmergencyModalOpen,
    setIsEmergencyModalOpen,
    isOptimizationModalOpen,
    setIsOptimizationModalOpen,
    selectedTaskForDrawer,
    setSelectedTaskForDrawer,
    toast,
    isOptimizing
  } = useRailway();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-800 selection:text-white">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} onMobileClose={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen overflow-x-hidden">
        {/* Navbar (Includes GovMasthead) */}
        <Navbar onMenuToggle={() => setIsMobileOpen(true)} />

        {/* Official Operational Notice / Circular Strip */}
        <div className="bg-slate-900 text-slate-300 text-[11px] px-3 sm:px-6 py-1.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1 font-bold text-amber-400 shrink-0 uppercase tracking-wider text-[10px]">
              <Radio className="w-3 h-3 text-red-500 animate-pulse" />
              CIRCULAR NOTICE:
            </span>
            <p className="truncate text-slate-300 font-mono text-[10px] sm:text-[11px]">
              Daily Maintenance Windows: Howrah – Barddhaman (Chord) & Burdwan – Asansol Section scheduled under G-48. Caution Order TSR-48 (30 kmph) at KM 122/10.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 shrink-0 text-[10px] text-slate-400 font-mono">
            <span>SR. DOM SANCTION ACTIVE</span>
            <span className="text-emerald-400">● LIVE TIMETABLE SYNC</span>
          </div>
        </div>

        {/* Global Emergency Alert Banner */}
        {activeEmergencyAlert && (
          <div className="bg-red-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between shadow-md text-xs z-20 animate-in slide-in-from-top duration-300 border-b border-red-800">
            <div className="flex items-center gap-2 overflow-hidden min-w-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0 animate-bounce" />
              <div className="truncate min-w-0">
                <span className="font-extrabold uppercase tracking-wider hidden xs:inline bg-red-900/60 px-1.5 py-0.5 rounded mr-1">
                  EMERGENCY DISPATCH [{activeEmergencyAlert.id}]:
                </span>{' '}
                <span className="font-semibold">
                  {activeEmergencyAlert.defectType} — Asset {activeEmergencyAlert.assetId} ({activeEmergencyAlert.location})
                </span>
                <span className="ml-1 font-medium text-amber-200 hidden sm:inline">
                  • Automated CP-SAT Corridor Re-planning triggered.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <Link
                to="/planner"
                className="bg-white text-red-800 font-bold px-2.5 py-1 rounded text-[11px] hover:bg-amber-100 transition-colors whitespace-nowrap shadow-xs"
              >
                <span className="hidden sm:inline">Open Block Gantt</span>
                <span className="sm:hidden">Planner</span>
              </Link>
              <button
                onClick={dismissEmergencyAlert}
                className="p-1 rounded text-red-200 hover:text-white min-w-[28px] min-h-[28px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* AI Optimization In-Progress Overlay Banner */}
        {isOptimizing && (
          <div className="bg-blue-800 text-white px-4 py-2 flex items-center justify-center gap-2 text-xs shadow-md z-20 animate-pulse border-b border-blue-900">
            <Zap className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="font-bold">
              OR-Tools CP-SAT Solver Running: Correlating TMS Defects, SMMS Signals, TDMS OHE Neutral Sections with Live COA Train Paths...
            </span>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 max-w-7xl w-full mx-auto overflow-x-hidden">
          <Outlet />
        </main>

        {/* Official Indian Railways / Government of India Enterprise Footer */}
        <footer className="border-t border-slate-300 bg-white text-xs text-slate-600">
          {/* Main Footer Info */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <GovEmblem size="sm" variant="navy" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                    RailSamanvay AI — Automatic Block Planning System
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Ministry of Railways • Centre for Railway Information Systems (CRIS)
                  </p>
                </div>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed max-w-lg">
                Official AI-assisted railway asset availability optimization engine integrating TMS, SMMS, TDMS, and COA.
                Compliant with Indian Railways General & Subsidiary Rules (G&SR 1968) and Operating Manuals.
              </p>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                Integrated Systems
              </h4>
              <ul className="space-y-1 text-slate-600 font-mono text-[10px]">
                <li>• TMS — Track Management System</li>
                <li>• SMMS — Signal Maintenance Mgmt</li>
                <li>• TDMS — Traction Distribution Mgmt</li>
                <li>• COA — Control Office Application</li>
                <li>• FOIS — Freight Operations Info</li>
              </ul>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                Official Help & Compliance
              </h4>
              <div className="space-y-1 text-slate-600 text-[11px]">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <PhoneCall className="w-3 h-3 text-amber-600" />
                  <span>RailMadad Helpline: 139</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  For operational support contact CRIS RailSamanvay NOC: 011-24104525
                </p>
                <div className="pt-1 flex items-center gap-1 text-[10px] font-mono text-emerald-700">
                  <ShieldCheck className="w-3 h-3" />
                  <span>STQC / GIGW 3.0 Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Security Notice */}
          <div className="border-t border-slate-200 bg-slate-100 py-2.5 px-3 sm:px-6 text-[10px] sm:text-[11px] text-slate-500 flex flex-col xs:flex-row flex-wrap items-center justify-between gap-1.5 pb-safe">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center xs:justify-start">
              <span className="font-bold text-slate-800">© 2026 Ministry of Railways, Government of India.</span>
              <span>All Rights Reserved.</span>
              <span className="text-slate-400 hidden lg:inline">| Designed & Maintained by CRIS</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-[10px] font-mono">
              <span>SECURITY: RESTRICTED ACCESS (OFFICIAL USE ONLY)</span>
              <span className="font-bold text-slate-800">v2.4.0-PROD</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals & Drawers */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <OptimizationResultModal
        isOpen={isOptimizationModalOpen}
        onClose={() => setIsOptimizationModalOpen(false)}
      />

      <TaskUrgencyDrawer
        task={selectedTaskForDrawer}
        onClose={() => setSelectedTaskForDrawer(null)}
      />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 w-[calc(100vw-1.5rem)] max-w-sm bg-slate-900 text-white p-3.5 sm:p-4 rounded-xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0 mt-0.5" />}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{toast.title}</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-snug line-clamp-2">{toast.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};
