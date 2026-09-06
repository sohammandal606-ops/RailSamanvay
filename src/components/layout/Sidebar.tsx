import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Wrench,
  CalendarRange,
  TrainTrack,
  BrainCircuit,
  CheckSquare,
  BarChart3,
  FileText,
  Settings,
  Calendar,
  Layers,
  AlertOctagon,
  LogOut,
  ShieldCheck,
  Zap,
  Radio,
  DatabaseZap,
  MapPin
} from 'lucide-react';
import { useRailway } from '../../context/RailwayContext';
import { Department } from '../../types';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const {
    currentDepartment,
    setCurrentDepartment,
    currentUser,
    setIsEmergencyModalOpen,
    blockPlans,
    tasks
  } = useRailway();

  const navigate = useNavigate();

  const pendingApprovalsCount = blockPlans.filter(p => p.status === 'Pending Approval').length;
  const criticalTasksCount = tasks.filter(t => t.criticality === 'Critical').length;

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/integration', label: 'Data Integration', icon: DatabaseZap },
    { to: '/tasks', label: 'Maintenance Tasks', icon: Wrench, badge: criticalTasksCount > 0 ? criticalTasksCount : undefined, badgeVariant: 'critical' },
    { to: '/planner', label: 'Block Planner', icon: CalendarRange, highlight: true },
    { to: '/approval', label: 'Human Approval (HITL)', icon: CheckSquare, badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined, badgeVariant: 'warning' },
    { to: '/corridors', label: 'Corridor Status', icon: TrainTrack },
    { to: '/geospatial', label: 'Resources & Geo-Spatial', icon: MapPin },
    { to: '/insights', label: 'AI Insights & Clustering', icon: BrainCircuit },
    { to: '/weekly', label: 'Weekly Plan', icon: Calendar },
    { to: '/monthly', label: 'Monthly Matrix', icon: Layers },
    { to: '/analytics', label: 'Analytics & KPIs', icon: BarChart3 },
    { to: '/reports', label: 'Reports & Export', icon: FileText },
    { to: '/settings', label: 'Settings & Config', icon: Settings },
  ];

  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDepartment(e.target.value as Department);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-railway-navy text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Branding & Navigation (Scrollable container) */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-md border border-blue-400/40 shrink-0">
                  <TrainTrack className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-base font-extrabold text-white tracking-tight">
                      RailSamanvay <span className="text-blue-400 font-mono">AI</span>
                    </h1>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      IR-OPS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">
                    Automatic Block Planner
                  </p>
                </div>
              </div>

              {/* Close Button on Mobile */}
              <button
                onClick={onMobileClose}
                aria-label="Close sidebar"
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
              >
                <LogOut className="w-4 h-4 rotate-180" />
              </button>
            </div>

            {/* Department Selector */}
            <div className="mt-3">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Active Department View
              </label>
              <select
                value={currentDepartment}
                onChange={handleDeptChange}
                className="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-md px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Control Office">Control Office (COA)</option>
                <option value="Engineering">Engineering (TMS - P.Way)</option>
                <option value="S&T">S&T (SMMS - Signals)</option>
                <option value="Traction">Traction (TDMS - OHE)</option>
                <option value="Administrator">Administrator (System)</option>
              </select>
            </div>
          </div>

          {/* Emergency Button */}
          <div className="p-3 shrink-0">
            <button
              onClick={() => {
                if (onMobileClose) onMobileClose();
                setIsEmergencyModalOpen(true);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all border border-red-500/50 hover:shadow-red-900/30 hover:shadow-md active:scale-98 min-h-[44px]"
            >
              <AlertOctagon className="w-4 h-4 animate-pulse" />
              <span>EMERGENCY BLOCK REQUEST</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-1 space-y-0.5 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 lg:py-2 rounded-md text-xs font-semibold transition-all duration-150 min-h-[40px] ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  } ${item.highlight ? 'border border-blue-500/30' : ''}`
                }
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                      item.badgeVariant === 'critical'
                        ? 'bg-red-500 text-white'
                        : 'bg-amber-400 text-slate-950'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section with Safe Area Padding for iPhone Home Indicator */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 space-y-3 pb-safe shrink-0">
          {/* Integrated Systems Telemetry Pill */}
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px]">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                Live Data Feeds
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">5/5 SYNCED</span>
            </div>
            <div className="grid grid-cols-5 gap-1 text-[9px] font-mono text-center">
              <span className="bg-slate-800 text-emerald-300 rounded py-0.5">BDMS</span>
              <span className="bg-slate-800 text-sky-300 rounded py-0.5">TMS</span>
              <span className="bg-slate-800 text-amber-300 rounded py-0.5">SMMS</span>
              <span className="bg-slate-800 text-purple-300 rounded py-0.5">TDMS</span>
              <span className="bg-slate-800 text-teal-300 rounded py-0.5">COA</span>
            </div>
          </div>

          {/* User Profile info */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{currentUser.name.split(',')[0]}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentUser.employeeId}</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (onMobileClose) onMobileClose();
                navigate('/login');
              }}
              title="Sign Out / Switch User"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
