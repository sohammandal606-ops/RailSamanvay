import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Settings,
  User,
  Building2,
  Bell,
  Cpu,
  ShieldCheck,
  Server,
  Layers,
  CheckCircle2,
  Save,
  Radio,
  Clock,
  Sparkles
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentUser, currentDepartment, setCurrentDepartment, showToast } = useRailway();

  const [activeTab, setActiveTab] = useState<'profile' | 'aiConfig' | 'rules' | 'system'>('profile');
  const [enablePmsAlerts, setEnablePmsAlerts] = useState(true);
  const [emergencySiren, setEmergencySiren] = useState(true);
  const [autoReplanOnEmergency, setAutoReplanOnEmergency] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Preferences Saved', 'Operational parameters updated successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              System Configuration & AI Engine Telemetry
            </h1>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full border border-slate-300">
              IR-SYS-V2.4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise RBAC profiles, mathematical engine status, and railway domain safety thresholds
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-bold">
        {[
          { id: 'profile', label: 'Controller Profile & Department', icon: User },
          { id: 'aiConfig', label: 'AI Engine Architecture & Status', icon: Cpu },
          { id: 'rules', label: 'Domain Safety Rules (G&SR)', icon: ShieldCheck },
          { id: 'system', label: 'Data Source Integrations', icon: Server },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Profile & Dept */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-3xl">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Employee Full Name & Service
                </label>
                <input
                  type="text"
                  disabled
                  value={currentUser.name}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Employee PIN / CRIS ID
                </label>
                <input
                  type="text"
                  disabled
                  value={currentUser.employeeId}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Operational Designation
              </label>
              <input
                type="text"
                disabled
                value={currentUser.designation}
                className="w-full text-xs font-mono px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Active Controlling Department
              </label>
              <select
                value={currentDepartment}
                onChange={e => setCurrentDepartment(e.target.value as any)}
                className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Control Office">Control Office (COA / Operating)</option>
                <option value="Engineering">Engineering (TMS - P.Way)</option>
                <option value="S&T">S&T (SMMS - Signalling & Telecom)</option>
                <option value="Traction">Traction (TDMS - 25kV OHE)</option>
                <option value="Administrator">Administrator (CRIS / System)</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Operational Alert Notifications
              </h4>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enablePmsAlerts}
                  onChange={e => setEnablePmsAlerts(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Receive instant desktop notification on critical TMS ultrasonic flaw detection</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emergencySiren}
                  onChange={e => setEmergencySiren(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Visual red banner priority on emergency maintenance dispatch</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Save Profile Preferences</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: AI Engine Architecture (Informational Only - Section 19 Requirement) */}
      {activeTab === 'aiConfig' && (
        <div className="space-y-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-500" />
                    Isolation Forest Anomaly Engine
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Unsupervised track geometry degradation detector</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>Trees: 100 • Contamination: 0.05</div>
                <div>Features: Ultrasonic Flaw, TQI, Rain Coefficient, Jumper Delta</div>
                <div>Status: Online (Zero Drift Detected)</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-500" />
                    DBSCAN Spatial Clustering
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Geographic multi-department cluster synthesizer</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>Epsilon: 3.5 KM • Min Samples: 2 Tasks</div>
                <div>Metric: Euclidean Railway Chainage Distance</div>
                <div>Status: Online (3 Clusters Active)</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Domain Rule Engine (G&SR)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Safety boundaries & 25kV power isolation rules</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>Rule Base: 48 Safety Invariants</div>
                <div>Timetable Slack: Min 15m buffer before mail/express</div>
                <div>Status: 100% Passing Constraints</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    MIP Corridor Block Optimizer
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Mixed-Integer Linear Programming timetable solver</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>Objective: Min Downtime + Max Utilization</div>
                <div>Solver Time: 1,840ms Average</div>
                <div>Status: Converged (Optimal Solution Found)</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Domain Rules */}
      {activeTab === 'rules' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-4xl space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Active Railway Safety Invariants
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">G&SR Chapter IV - Block Possession Duration Limit</div>
                <p className="text-slate-600 mt-0.5">Maximum daytime block without Divisional Railway Manager (DRM) sanction is capped at 180 minutes.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">OHE 25kV Traction Power Isolation Safety Buffer</div>
                <p className="text-slate-600 mt-0.5">Power isolation permits require confirmed earth pole fitment 15 minutes prior to track machine deployment.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">Premium Passenger Timetable Non-Detention Rule</div>
                <p className="text-slate-600 mt-0.5">Zero tolerance for detention of Vande Bharat, Rajdhani, or Shatabdi Express services; shadow blocks must clear 20 min prior.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: System Integrations */}
      {activeTab === 'system' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-4xl space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Connected Legacy Enterprise Systems
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
              <span className="font-bold text-sky-900 block">TMS (Track)</span>
              <span className="text-[10px] text-sky-700">P.Way Geometry Feed</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-2">● LIVE SYNC</span>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="font-bold text-amber-900 block">SMMS (Signals)</span>
              <span className="text-[10px] text-amber-700">Relay & Point Feed</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-2">● LIVE SYNC</span>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <span className="font-bold text-purple-900 block">TDMS (Traction)</span>
              <span className="text-[10px] text-purple-700">25kV OHE & Substation</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-2">● LIVE SYNC</span>
            </div>

            <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
              <span className="font-bold text-teal-900 block">COA (Control)</span>
              <span className="text-[10px] text-teal-700">Live Train Timetable</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-2">● LIVE SYNC</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
