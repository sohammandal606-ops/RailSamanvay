import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useRailway } from '../../context/RailwayContext';
import { EmergencyModal } from '../modals/EmergencyModal';
import { OptimizationResultModal } from '../modals/OptimizationResultModal';
import { TaskUrgencyDrawer } from '../drawers/TaskUrgencyDrawer';
import {
  AlertTriangle,
  Flame,
  X,
  CheckCircle2,
  Info,
  ShieldAlert,
  Zap,
  ArrowRight
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} onMobileClose={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar onMenuToggle={() => setIsMobileOpen(true)} />

        {/* Global Emergency Alert Banner */}
        {activeEmergencyAlert && (
          <div className="bg-red-600 text-white px-4 py-2.5 flex items-center justify-between shadow-md text-xs z-20 animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2 overflow-hidden">
              <Flame className="w-5 h-5 text-amber-300 shrink-0 animate-bounce" />
              <div className="truncate">
                <span className="font-bold uppercase tracking-wider">
                  Active Emergency Alert [{activeEmergencyAlert.id}]:
                </span>{' '}
                <span>
                  {activeEmergencyAlert.defectType} on Asset {activeEmergencyAlert.assetId} at {activeEmergencyAlert.location}.
                </span>
                <span className="ml-2 font-semibold underline text-amber-200">
                  AI Re-planning required.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/planner"
                className="bg-white text-red-700 font-bold px-2.5 py-1 rounded text-[11px] hover:bg-red-50 transition-colors shadow-xs"
              >
                Open Planner
              </Link>
              <button
                onClick={dismissEmergencyAlert}
                className="p-1 rounded text-red-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* AI Optimization In-Progress Overlay Banner */}
        {isOptimizing && (
          <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-center gap-2 text-xs shadow-md z-20 animate-pulse">
            <Zap className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="font-bold">
              AI Optimization Engine Running... Correlating TMS, SMMS, TDMS and Live COA Train Timetables.
            </span>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Global Enterprise Footer */}
        <footer className="border-t border-slate-200 bg-white py-3 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">RailSamanvay AI</span>
            <span>• Indian Railways Automatic Block Planning System</span>
            <span className="text-slate-400 hidden sm:inline">| SIH 2026 Operations Prototype</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[11px] font-mono">
            <span>Security: RBAC-G&SR Enforced</span>
            <span>Version: 2.4.0-PROD</span>
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
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
          <div className="flex-1">
            <h4 className="text-xs font-bold text-white">{toast.title}</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-snug">{toast.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};
