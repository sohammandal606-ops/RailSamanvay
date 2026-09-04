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
  ExternalLink
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

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
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs h-16 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Mobile Toggle & Title/Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-md text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Instant Search */}
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
              placeholder="Search Asset (TRK-7821), Task (ENG-1042), Chainage..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100/80 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                Found {searchResults.length} Maintenance Assets & Tasks
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
      </div>

      {/* Right: Live Clock, AI Action, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Live IST Clock */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100/90 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700">
          <Clock className="w-4 h-4 text-blue-600" />
          <div className="text-right leading-tight">
            <span className="text-xs font-mono font-bold text-slate-900 block">{currentTime}</span>
            <span className="text-[10px] text-slate-500">{currentDate}</span>
          </div>
        </div>

        {/* AI Optimize Button */}
        <button
          onClick={runAiOptimization}
          disabled={isOptimizing}
          className="hidden sm:flex items-center gap-1.5 bg-railway-navy hover:bg-railway-slate text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs disabled:opacity-50"
        >
          <Zap className={`w-3.5 h-3.5 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
          <span>{isOptimizing ? 'Optimizing...' : 'Run AI Optimization'}</span>
        </button>

        {/* Active Department Pill */}
        <div className="hidden lg:block">
          <StatusBadge status={currentDepartment} variant="department" size="md" />
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-mono font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in duration-150">
              <div className="p-3 bg-railway-navy text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">Control Room Alerts</span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                    {unreadCount} Unread
                  </span>
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[10px] text-blue-300 hover:text-white font-medium underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No active notifications
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
                        !notif.read ? 'bg-blue-50/40' : ''
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
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 w-full"
                >
                  View Approval Queue & Plans
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
