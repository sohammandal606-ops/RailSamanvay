import React, { useState, useMemo } from 'react';
import { useRailway } from '../context/RailwayContext';
import { MaintenanceTask, Department, Criticality, TaskStatus } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
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
  Flame
} from 'lucide-react';

export const TasksPage: React.FC = () => {
  const {
    tasks,
    setSelectedTaskForDrawer,
    setIsEmergencyModalOpen,
    runAiOptimization,
    isOptimizing
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Maintenance Task Management
            </h1>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              {filteredTasks.length} Active Tasks
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time feed integrated from Track Management (TMS), Signalling (SMMS) and Traction (TDMS)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Flame className="w-4 h-4" />
            <span>Emergency Request</span>
          </button>

          <button
            onClick={runAiOptimization}
            disabled={isOptimizing}
            className="px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Run AI Block Optimization</span>
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
              placeholder="Search Task ID, Asset, Location, Defect..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="ALL">All Departments (3)</option>
              <option value="Engineering">Engineering (TMS)</option>
              <option value="S&T">S&T (SMMS)</option>
              <option value="Traction">Traction (TDMS)</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={selectedPriority}
              onChange={e => setSelectedPriority(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="ALL">All Criticality Levels</option>
              <option value="Critical">Critical Only</option>
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
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending Slotting</option>
              <option value="Scheduled">Scheduled in Block</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Counts */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Showing {filteredTasks.length} of {tasks.length} tasks</span>
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
            Click any row to open AI Maintenance Priority Breakdown & Radar Analysis
          </div>
        </div>
      </div>

      {/* Mobile Tasks List View (Cards on phones & iPhones) */}
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
                  <span className="font-mono text-xs font-bold text-blue-600">[{task.assetId}]</span>
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
                <div className="flex items-center gap-1 text-blue-700 font-mono font-bold">
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
            <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Task / Asset</th>
                <th className="py-3 px-3">Dept & Source</th>
                <th className="py-3 px-3">Location (Chainage)</th>
                <th className="py-3 px-4">Defect Description</th>
                <th className="py-3 px-3">Criticality</th>
                <th
                  onClick={() => toggleSort('dueDate')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Due Date</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('durationMin')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Duration</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('aiUrgencyScore')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-200 transition-colors bg-blue-50/50"
                >
                  <div className="flex items-center gap-1 text-blue-900">
                    <BrainCircuit className="w-3.5 h-3.5 text-blue-600" />
                    <span>AI Urgency</span>
                    <ArrowUpDown className="w-3 h-3 text-blue-600" />
                  </div>
                </th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-500">
                    No maintenance tasks found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => setSelectedTaskForDrawer(task)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                  >
                    {/* Task / Asset */}
                    <td className="py-3.5 px-4 font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-900">{task.id}</span>
                      </div>
                      <span className="font-mono text-[11px] text-blue-600 block mt-0.5">
                        {task.assetId}
                      </span>
                    </td>

                    {/* Dept */}
                    <td className="py-3.5 px-3">
                      <StatusBadge status={task.department} variant="department" size="sm" />
                      <div className="mt-1">
                        <StatusBadge status={task.sourceSystem} variant="sourceSystem" size="sm" />
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-3 font-mono text-slate-700 font-medium">
                      {task.location}
                    </td>

                    {/* Defect */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-semibold text-slate-900 line-clamp-1">{task.defect}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {task.aiExplanation}
                      </p>
                    </td>

                    {/* Criticality */}
                    <td className="py-3.5 px-3">
                      <StatusBadge status={task.criticality} variant="criticality" size="sm" />
                    </td>

                    {/* Due Date */}
                    <td className="py-3.5 px-3 font-mono text-slate-600">
                      {task.dueDate}
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-3 font-mono text-slate-600">
                      {task.durationMin} min
                    </td>

                    {/* AI Score */}
                    <td className="py-3.5 px-4 bg-blue-50/30 font-mono font-bold text-blue-900">
                      <div className="flex items-center gap-1.5">
                        <span>{task.aiUrgencyScore}</span>
                        <span className="text-[10px] text-slate-400 font-normal">/100</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      <StatusBadge status={task.status} variant="taskStatus" size="sm" />
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTaskForDrawer(task);
                        }}
                        className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 group-hover:text-blue-600 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
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
