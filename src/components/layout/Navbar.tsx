import React, { useState, useEffect } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Clock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  X,
  ExternalLink,
  ShieldCheck,
  Radio,
  FileText
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { GovMasthead } from '../common/GovMasthead';
import { GovEmblem } from '../common/GovEmblem';

interface NavbarProps {
  onMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const {
    currentDepartment,
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    runAiOptimization,
    isOptimizing,
    tasks,
    setSelectedTaskForDrawer
  } = useRailway();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' IST'
      );
      setCurrentDate(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Search results calculation
  const searchResults = searchQuery.trim()
    ? tasks.filter(
        t =>
          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.defect.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchResultClick = (task: typeof tasks[0]) => {
    setSelectedTaskForDrawer(task);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const getNotifIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />;
      default:
        return <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs flex flex-col">
      {/* Official Government of India & Ministry of Railways Masthead */}
      <GovMasthead variant="dark" />

      {/* Railway Operations Command Bar */}
      <div className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 lg:px-6 bg-white">
        {/* Left: Mobile Toggle & Government Subtitle / Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl">
          <button
            onClick={onMenuToggle}
            aria-label="Open Navigation Menu"
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden active:bg-slate-200 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Operational Zonal Identity Tag */}
          <div className="hidden xl:flex items-center gap-2 pr-3 border-r border-slate-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="leading-tight">
              <span className="text-[10px] font-bold font-mono text-slate-800 uppercase block tracking-wider">
                {currentUser.zone || 'EASTERN RAILWAY (HOWRAH DIV)'}
              </span>
              <span className="text-[9px] text-slate-400 font-mono">
                LIVE SEC: HWH-BWN-ASN
              </span>
            </div>
          </div>

          {/* Global Instant Search (Desktop/Tablet) */}
          <div className="relative w-full max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search Asset ID (TRK-7821), Task (ENG-1042), Station..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-100/90 border border-slate-300/80 rounded-lg text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-lg shadow-xl border border-slate-200 max-h-80 overflow-y-auto z-50 p-2">
                <div className="text-[10px] uppercase font-bold text-slate-500 px-2 py-1 flex items-center justify-between border-b border-slate-100 mb-1">
                  <span>Found {searchResults.length} Maintenance Assets & Tasks</span>
                  <span className="font-mono text-blue-600">CRIS-TMS/SMMS</span>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-500">
                    No matching assets or tasks found for "{searchQuery}".
                  </div>
                ) : (
                  <div className="space-y-1">
                    {searchResults.map(task => (
                      <div
                        key={task.id}
                        onClick={() => handleSearchResultClick(task)}
                        className="p-2 rounded-md hover:bg-slate-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-slate-200 transition-colors"
                      >
                        <div className="overflow-hidden pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 font-mono">{task.id}</span>
                            <span className="text-xs font-mono text-blue-600">[{task.assetId}]</span>
                            <StatusBadge status={task.criticality} variant="criticality" size="sm" />
                          </div>
                          <p className="text-[11px] text-slate-600 truncate mt-0.5">{task.defect}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{task.location}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-bold text-slate-800">{task.aiUrgencyScore}/100</span>
                          <span className="text-[9px] text-slate-400 block">AI Score</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 sm:hidden"
            aria-label="Toggle Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-28 left-0 right-0 p-3 bg-white border-b border-slate-200 shadow-lg sm:hidden z-40">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Asset, Task, Location..."
                className="w-full pl-9 pr-8 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {searchQuery.trim().length > 0 && (
              <div className="mt-2 max-h-60 overflow-y-auto divide-y divide-slate-100">
                {searchResults.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-500">
                    No assets or tasks found
                  </div>
                ) : (
                  searchResults.map(task => (
                    <div
                      key={task.id}
                      onClick={() => handleSearchResultClick(task)}
                      className="py-2 px-1 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-mono font-bold text-slate-900">{task.id} • {task.assetId}</div>
                        <div className="text-[11px] text-slate-600 truncate max-w-[220px]">{task.defect}</div>
                      </div>
                      <span className="font-mono font-bold text-blue-600">{task.aiUrgencyScore}/100</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Right: Live Clock, AI Action, Notifications, Active Department */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* AI Optimize Button */}
          <button
            onClick={runAiOptimization}
            disabled={isOptimizing}
            className="flex items-center gap-1.5 bg-railway-navy hover:bg-railway-slate text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all shadow-xs border border-blue-900 disabled:opacity-50 active:scale-95 shrink-0"
            title="Run AI Optimization"
          >
            <Zap className={`w-3.5 h-3.5 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isOptimizing ? 'Optimizing Schedule...' : 'Run CP-SAT Optimizer'}</span>
            <span className="hidden xs:inline sm:hidden">{isOptimizing ? '...' : 'Optimize'}</span>
          </button>

          {/* Active Department Pill */}
          <div className="hidden lg:block">
            <StatusBadge status={currentDepartment} variant="department" size="md" />
          </div>

          {/* Notifications Popover (Control Room Alerts) */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="Open Notifications"
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition-colors border border-slate-200/60"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-mono font-bold flex items-center justify-center animate-pulse shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotifOpen && (
              <>
                <div
                  onClick={() => setIsNotifOpen(false)}
                  className="fixed inset-0 z-40 sm:hidden bg-slate-900/30 backdrop-blur-xs"
                />
                <div className="fixed sm:absolute right-2 sm:right-0 top-24 sm:top-full sm:mt-2 w-[calc(100vw-1rem)] max-w-xs sm:max-w-sm sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in duration-150">
                  <div className="p-3 bg-railway-navy text-white flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-xs font-bold block">Control Room Bulletin</span>
                        <span className="text-[9px] text-slate-400 font-mono">
                          Indian Railways Dispatches
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">
                        {unreadCount} New
                      </span>
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[10px] text-blue-300 hover:text-white font-medium underline"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 sm:max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No active dispatches or bulletins
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            if (notif.linkTo) navigate(notif.linkTo);
                            setIsNotifOpen(false);
                          }}
                          className={`p-3 text-xs hover:bg-slate-50 cursor-pointer flex items-start gap-2.5 transition-colors ${
                            !notif.read ? 'bg-amber-50/40 border-l-2 border-l-amber-500' : ''
                          }`}
                        >
                          {getNotifIcon(notif.severity)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">{notif.title}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{notif.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-1 leading-snug">{notif.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setIsNotifOpen(false);
                        navigate('/approval');
                      }}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center justify-center gap-1 w-full py-1"
                    >
                      Review Formal Approval Queue & Sanctions
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
