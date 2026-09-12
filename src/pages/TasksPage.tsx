import React, { useState, useMemo } from 'react';
import { useRailway } from '../context/RailwayContext';
import { MaintenanceTask, Department, Criticality, TaskStatus } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { GovEmblem } from '../components/common/GovEmblem';
import {
  Search,
  Filter,
  ArrowUpDown,
  Wrench,
  BrainCircuit,
  Clock,
  Sparkles,
  ChevronRight,
  PlusCircle,
  Download,
  Flame,
  FileSpreadsheet,
  Layers,
  ShieldAlert
} from 'lucide-react';

export const TasksPage: React.FC = () => {
  const {
    tasks,
    setSelectedTaskForDrawer,
    setIsEmergencyModalOpen,
    runAiOptimization,
    isOptimizing,
    showToast
  } = useRailway();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'aiUrgencyScore' | 'dueDate' | 'durationMin'>('aiUrgencyScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch =
          task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.defect.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDept = selectedDept === 'ALL' || task.department === selectedDept;
        const matchesPriority = selectedPriority === 'ALL' || task.criticality === selectedPriority;
        const matchesStatus = selectedStatus === 'ALL' || task.status === selectedStatus;

        return matchesSearch && matchesDept && matchesPriority && matchesStatus;
      })
      .sort((a, b) => {
        if (sortField === 'aiUrgencyScore') {
          return sortOrder === 'desc' ? b.aiUrgencyScore - a.aiUrgencyScore : a.aiUrgencyScore - b.aiUrgencyScore;
        }
        if (sortField === 'durationMin') {
          return sortOrder === 'desc' ? b.durationMin - a.durationMin : a.durationMin - b.durationMin;
        }
        return sortOrder === 'desc' ? b.dueDate.localeCompare(a.dueDate) : a.dueDate.localeCompare(b.dueDate);
      });
  }, [tasks, searchQuery, selectedDept, selectedPriority, selectedStatus, sortField, sortOrder]);

  const toggleSort = (field: 'aiUrgencyScore' | 'dueDate' | 'durationMin') => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleExportCSV = () => {
    showToast('Asset Defect Register Exported', 'Downloaded Form G-48 Defect Inventory (CSV Format)', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Official Government Register Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Asset Defect & Maintenance Register
              </h1>
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded border border-blue-300">
                {filteredTasks.length} Active Requisitions
              </span>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
                TMS / SMMS / TDMS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              भारतीय रेल परिसंपत्ति दोष रजिस्टर • Permanent Way (TMS), Signalling (SMMS) and Traction (TDMS) asset defect inventory
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-initial px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-300"
            title="Export CSV Register"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export Register</span>
          </button>

          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex-1 sm:flex-initial px-3.5 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all border border-red-800 active:scale-98"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Emergency Request</span>
          </button>

          <button
            onClick={runAiOptimization}
            disabled={isOptimizing}
            className="flex-1 sm:flex-initial px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all border border-slate-800 disabled:opacity-50 active:scale-98"
          >
            <Sparkles className={`w-4 h-4 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Optimizing...' : 'Run Block Optimizer'}</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Task ID (ENG-1042), Asset (TRK-7821), Location (KM 142)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white font-medium"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="ALL">All Departments (3 Branches)</option>
              <option value="Engineering">Civil Engineering (TMS - Track)</option>
              <option value="S&T">Signal & Telecom (SMMS - S&T)</option>
              <option value="Traction">Electrical Traction (TDMS - OHE)</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={selectedPriority}
              onChange={e => setSelectedPriority(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="ALL">All Criticality Levels</option>
              <option value="Critical">Critical Only (&lt;24h)</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="ALL">All Possession Statuses</option>
              <option value="Pending">Pending Sanction</option>
              <option value="Scheduled">Scheduled in Block</option>
              <option value="In Progress">In Progress (Possessed)</option>
              <option value="Completed">Completed & Signed-off</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Counts */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Showing {filteredTasks.length} of {tasks.length} maintenance requisitions</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:underline text-[11px]"
              >
                Clear Search
              </button>
            )}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Click any row to open AI Multi-Factor Scoring Breakdown & RDSO Compliance Radar
          </div>
        </div>
      </div>

      {/* Mobile Tasks List View */}
      <div className="md:hidden space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
            No maintenance tasks found matching your filters.
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              onClick={() => setSelectedTaskForDrawer(task)}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-300 hover:shadow-md active:bg-blue-50/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                    {task.id}
                  </span>
                  <span className="font-mono text-xs font-bold text-blue-700">[{task.assetId}]</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusBadge status={task.criticality} variant="criticality" size="sm" />
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-snug">{task.defect}</h4>
              <p className="text-[11px] text-slate-500 font-mono mt-1">{task.location}</p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <StatusBadge status={task.department} variant="department" size="sm" />
                  <span className="text-[10px] text-slate-500 font-mono">Due: {task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-800 font-mono font-bold">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>{task.aiUrgencyScore}/100</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Main Tasks Table (Tablets & Desktop) */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Task / Asset ID</th>
                <th className="py-3 px-3">Branch & System</th>
                <th className="py-3 px-3">Chainage Location</th>
                <th className="py-3 px-4">Defect Description</th>
                <th className="py-3 px-3">
                  <button
                    onClick={() => toggleSort('durationMin')}
                    className="flex items-center gap-1 hover:text-slate-900"
                  >
                    <span>Duration</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-3">Criticality</th>
                <th className="py-3 px-3">
                  <button
                    onClick={() => toggleSort('aiUrgencyScore')}
                    className="flex items-center gap-1 text-blue-800 hover:text-blue-900"
                  >
                    <span>AI Urgency</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500">
                    No maintenance tasks found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredTasks.map(task => (
                  <tr
                    key={task.id}
                    onClick={() => setSelectedTaskForDrawer(task)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">{task.id}</div>
                      <div className="text-[10px] text-blue-700 font-mono">[{task.assetId}]</div>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={task.department} variant="department" size="sm" />
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{task.sourceSystem}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 text-[11px]">
                      {task.location}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="truncate font-semibold text-slate-800">{task.defect}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{task.aiExplanation}</p>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {task.durationMin} min
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={task.criticality} variant="criticality" size="sm" />
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              task.aiUrgencyScore >= 80 ? 'bg-red-600' :
                              task.aiUrgencyScore >= 60 ? 'bg-amber-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${task.aiUrgencyScore}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-slate-900">{task.aiUrgencyScore}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={task.status} variant="taskStatus" size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTaskForDrawer(task);
                        }}
                        className="text-blue-700 hover:text-blue-900 text-xs font-bold flex items-center gap-0.5 justify-end"
                      >
                        <span>Audit</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
