import React, { useState } from 'react';
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
  MapPin,
  Building2,
  Train
} from 'lucide-react';
import { useRailway } from '../../context/RailwayContext';
import { Department } from '../../types';
import { GovEmblem } from '../common/GovEmblem';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const {
    currentDepartment,
    setCurrentDepartment,
    currentUser,
    setCurrentUser,
    setIsEmergencyModalOpen,
    blockPlans,
    tasks
  } = useRailway();

  const navigate = useNavigate();

  const [selectedZone, setSelectedZone] = useState<string>('ER-HWH');

  const pendingApprovalsCount = blockPlans.filter(p => p.status === 'Pending Approval').length;
  const criticalTasksCount = tasks.filter(t => t.criticality === 'Critical').length;

  const navItems = [
    { to: '/dashboard', label: 'Operations Overview', icon: LayoutDashboard },
    { to: '/integration', label: 'Data Integration (TMS/COA)', icon: DatabaseZap },
    { to: '/tasks', label: 'Asset Defect Register', icon: Wrench, badge: criticalTasksCount > 0 ? criticalTasksCount : undefined, badgeVariant: 'critical' },
    { to: '/planner', label: 'Block Gantt Matrix', icon: CalendarRange, highlight: true },
    { to: '/approval', label: 'Sanctioning Authority (HITL)', icon: CheckSquare, badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined, badgeVariant: 'warning' },
    { to: '/corridors', label: 'Corridor & Track Status', icon: TrainTrack },
    { to: '/geospatial', label: 'GIS & Machinery Depot', icon: MapPin },
    { to: '/insights', label: 'AI Shadow Block Clustering', icon: BrainCircuit },
    { to: '/weekly', label: 'Weekly Possessions Plan', icon: Calendar },
    { to: '/monthly', label: 'Monthly Master Matrix', icon: Layers },
    { to: '/analytics', label: 'Zonal Analytics & KPIs', icon: BarChart3 },
    { to: '/reports', label: 'Official G-48 Reports', icon: FileText },
    { to: '/settings', label: 'G&SR Safety Rules & Config', icon: Settings },
  ];

  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDepartment(e.target.value as Department);
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedZone(val);
    const zoneMap: Record<string, string> = {
      'ER-HWH': 'Eastern Railway (ER) / Howrah Div',
      'NR-DLI': 'Northern Railway (NR) / Delhi Div',
      'WR-BCT': 'Western Railway (WR) / Mumbai Central Div',
      'SER-KGP': 'South Eastern Railway (SER) / Kharagpur Div',
      'SCR-SC': 'South Central Railway (SCR) / Secunderabad Div',
    };
    setCurrentUser(prev => ({
      ...prev,
      zone: zoneMap[val] || 'Eastern Railway (ER) / Howrah Div'
    }));
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
        {/* Top Branding & Navigation */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          {/* Official Indian Railways Header */}
          <div className="p-4 border-b border-slate-800/90 bg-slate-950/60 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GovEmblem size="md" variant="gold" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-white tracking-tight">
                      RailSamanvay
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      AI-OPS
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-400/90 font-medium">
                    रेल समन्वय • भारतीय रेल
                  </p>
                  <p className="text-[9px] text-slate-400 font-mono">
                    Ministry of Railways / CRIS
                  </p>
                </div>
              </div>

              {/* Close Button on Mobile */}
              <button
                onClick={onMobileClose}
                aria-label="Close sidebar"
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
              >
                <LogOut className="w-4 h-4 rotate-180" />
              </button>
            </div>

            {/* Zonal Railway & Division Selector */}
            <div className="mt-3.5 space-y-2">
              <div>
                <label className="text-[9px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between mb-1">
                  <span>Zonal Railway / Division</span>
                  <span className="text-emerald-400 text-[8px] font-mono">ONLINE</span>
                </label>
                <select
                  value={selectedZone}
                  onChange={handleZoneChange}
                  className="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="ER-HWH">Eastern Railway (ER) • Howrah</option>
                  <option value="NR-DLI">Northern Railway (NR) • Delhi</option>
                  <option value="WR-BCT">Western Railway (WR) • Mumbai Central</option>
                  <option value="SER-KGP">South Eastern Railway (SER) • Kharagpur</option>
                  <option value="SCR-SC">South Central Railway (SCR) • Secunderabad</option>
                </select>
              </div>

              {/* Department Selector */}
              <div>
                <label className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Branch / Department View
                </label>
                <select
                  value={currentDepartment}
                  onChange={handleDeptChange}
                  className="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Control Office">Control Office (COA / Operating)</option>
                  <option value="Engineering">Civil Engineering (TMS - P.Way)</option>
                  <option value="S&T">Signal & Telecom (SMMS - S&T)</option>
                  <option value="Traction">Electrical Traction (TDMS - OHE)</option>
                  <option value="Administrator">Administrator (CRIS / Railway Board)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency Block Button */}
          <div className="p-3 shrink-0">
            <button
              onClick={() => {
                if (onMobileClose) onMobileClose();
                setIsEmergencyModalOpen(true);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-red-700 hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all border border-red-500/50 hover:shadow-red-900/30 hover:shadow-md active:scale-98 min-h-[42px]"
            >
              <AlertOctagon className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>EMERGENCY BLOCK DISPATCH</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-1 space-y-0.5 flex-1">
            <div className="px-3 py-1 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
              Navigation Modules
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 min-h-[38px] ${
                    isActive
                      ? 'bg-blue-700 text-white font-bold shadow-xs border-l-3 border-l-amber-400'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  } ${item.highlight ? 'border border-amber-500/30 bg-amber-950/20' : ''}`
                }
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={`w-4 h-4 shrink-0 ${item.highlight ? 'text-amber-400' : ''}`} />
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

        {/* Bottom Section with G&SR Compliance and User Profile */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2.5 pb-safe shrink-0">
          {/* Integrated Systems Telemetry Pill */}
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px]">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="flex items-center gap-1 text-[10px]">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                Live Legacy Feeds
              </span>
              <span className="text-[9px] text-emerald-400 font-mono">5/5 SYNCED</span>
            </div>
            <div className="grid grid-cols-5 gap-1 text-[8px] font-mono text-center">
              <span className="bg-slate-800 text-emerald-300 rounded py-0.5" title="Block Demand Management System">BDMS</span>
              <span className="bg-slate-800 text-sky-300 rounded py-0.5" title="Track Management System">TMS</span>
              <span className="bg-slate-800 text-amber-300 rounded py-0.5" title="Signal Maintenance Management">SMMS</span>
              <span className="bg-slate-800 text-purple-300 rounded py-0.5" title="Traction Distribution Management">TDMS</span>
              <span className="bg-slate-800 text-teal-300 rounded py-0.5" title="Control Office Application">COA</span>
            </div>
          </div>

          {/* User Profile info */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden leading-tight">
                <p className="text-xs font-bold text-white truncate">{currentUser.name.split(',')[0]}</p>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-amber-400 font-mono font-semibold">
                    {currentUser.designation.split('/')[0]}
                  </span>
                  <span className="text-[8px] text-slate-400 font-mono">({currentUser.employeeId})</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onMobileClose) onMobileClose();
                navigate('/login');
              }}
              title="Sign Out / Switch Officer"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Official Compliance Footer Microtext */}
          <div className="text-[8px] text-slate-500 text-center font-mono pt-1 border-t border-slate-800/60 flex items-center justify-between">
            <span>G&SR RULE 1968</span>
            <span>e-OFFICE INTEGRATED</span>
          </div>
        </div>
      </aside>
    </>
  );
};
