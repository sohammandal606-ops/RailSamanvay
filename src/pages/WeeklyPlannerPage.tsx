import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Sparkles,
  Zap,
  Clock,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Wrench,
  Radio,
  Layers,
  ArrowRight
} from 'lucide-react';

export const WeeklyPlannerPage: React.FC = () => {
  const { runAiOptimization, isOptimizing, showToast } = useRailway();
  const navigate = useNavigate();

  const daysOfWeek = ['Monday (12 Sep)', 'Tuesday (13 Sep)', 'Wednesday (14 Sep)', 'Thursday (15 Sep)', 'Friday (16 Sep)', 'Saturday (17 Sep)', 'Sunday (18 Sep)'];

  const weeklySchedule = [
    {
      dept: 'Engineering (Track)',
      icon: Wrench,
      color: 'bg-blue-600',
      schedule: [
        { id: 'ENG-1042', title: 'Rail Renewal KM 142', time: '10:00 - 12:00', status: 'Pending Approval', blockId: 'BLK-2026-0912-004' },
        { id: 'ENG-1088', title: 'Ballast Tamping KM 144', time: '13:00 - 14:30', status: 'Approved', blockId: 'BLK-2026-0913-002' },
        { id: 'ENG-1102', title: 'AT Weld Replace KM 12', time: '08:00 - 10:30', status: 'Pending Approval', blockId: 'BLK-2026-0914-001' },
        { id: 'ENG-1140', title: 'USFD Ultrasonic Scan', time: '02:00 - 04:00', status: 'Planned', blockId: 'BLK-2026-0915-003' },
        { id: 'ENG-1199', title: 'Turnout Switch Overhaul', time: '11:00 - 12:30', status: 'Planned', blockId: 'BLK-2026-0916-002' },
        { id: 'ENG-1220', title: 'Bridge Guard Rail Check', time: '09:00 - 10:30', status: 'Planned', blockId: 'BLK-2026-0917-001' },
        { id: 'ENG-1250', title: 'Yard Clearance & Packing', time: '14:00 - 16:00', status: 'Planned', blockId: 'BLK-2026-0918-001' },
      ]
    },
    {
      dept: 'S&T (Signalling)',
      icon: Radio,
      color: 'bg-amber-600',
      schedule: [
        { id: 'SIG-2041', title: 'Relay Check KM 145', time: '10:00 - 12:00', status: 'Pending Approval', blockId: 'BLK-2026-0912-004' },
        { id: 'SIG-2144', title: 'Point Machine 114B', time: '13:00 - 14:30', status: 'Approved', blockId: 'BLK-2026-0913-002' },
        null,
        { id: 'SIG-2099', title: 'Axle Counter Sensor', time: '02:00 - 04:00', status: 'Planned', blockId: 'BLK-2026-0915-003' },
        { id: 'SIG-2201', title: 'Signal Aspect LED Lamp', time: '11:00 - 12:30', status: 'Planned', blockId: 'BLK-2026-0916-002' },
        null,
        { id: 'SIG-2280', title: 'Electronic Interlocking', time: '14:00 - 16:00', status: 'Planned', blockId: 'BLK-2026-0918-001' },
      ]
    },
    {
      dept: 'Traction (OHE TRD)',
      icon: Zap,
      color: 'bg-purple-600',
      schedule: [
        { id: 'TRA-3022', title: 'OHE Stagger KM 141', time: '10:00 - 12:00', status: 'Pending Approval', blockId: 'BLK-2026-0912-004' },
        null,
        { id: 'TRA-3081', title: 'Cantilever Insulator KM 218', time: '08:00 - 10:30', status: 'Pending Approval', blockId: 'BLK-2026-0914-001' },
        null,
        { id: 'TRA-3110', title: 'Contact Wire Dropper Check', time: '11:00 - 12:30', status: 'Planned', blockId: 'BLK-2026-0916-002' },
        { id: 'TRA-3150', title: 'Substation Neutral Section', time: '09:00 - 10:30', status: 'Planned', blockId: 'BLK-2026-0917-001' },
        null,
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Weekly Maintenance Block Calendar
            </h1>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              WEEK 37 (12 SEP – 18 SEP 2026)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Departmental multi-track schedule synchronized with passenger timetable buffers
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              showToast('Schedule Exported', 'Weekly master block plan downloaded as CSV.', 'success');
            }}
            className="flex-1 sm:flex-initial px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-98"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden xs:inline">Export Master Plan</span>
            <span className="xs:hidden">Export</span>
          </button>

          <button
            onClick={runAiOptimization}
            disabled={isOptimizing}
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isOptimizing ? 'Optimizing...' : 'Generate Plan'}</span>
          </button>
        </div>
      </div>

      {/* Legend & Summary Metrics */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-amber-400" />
            <span className="font-semibold text-slate-700">Pending Approval</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-emerald-500" />
            <span className="font-semibold text-slate-700">Approved & Cleared</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-blue-500" />
            <span className="font-semibold text-slate-700">Planned Routine</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-purple-500" />
            <span className="font-semibold text-slate-700">Integrated Multi-Dept</span>
          </div>
        </div>

        <div className="font-mono text-slate-500 text-[10px] sm:text-[11px]">
          19 Scheduled Blocks • 0 Punctuality Violations
        </div>
      </div>

      {/* Weekly Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Mobile Swipe Hint */}
        <div className="sm:hidden px-3 py-1.5 bg-blue-50/80 border-b border-blue-100 flex items-center justify-between text-[11px] text-blue-700 font-medium">
          <span>↔ Swipe table horizontally to see full week</span>
          <span className="font-mono text-[10px] bg-blue-100 px-1.5 py-0.5 rounded">7 Days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[1000px]">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-44">Department</th>
                {daysOfWeek.map((day, idx) => (
                  <th key={idx} className="py-3 px-3 text-center border-l border-slate-200">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {weeklySchedule.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-900 bg-slate-50/80 border-r border-slate-200">
                    <div className="flex items-center gap-2">
                      <row.icon className="w-4 h-4 text-blue-600" />
                      <span>{row.dept}</span>
                    </div>
                  </td>
                  {row.schedule.map((slot, cIdx) => (
                    <td key={cIdx} className="py-3 px-2 border-l border-slate-100 align-top">
                      {slot ? (
                        <div
                          onClick={() => slot.blockId && navigate(`/approval/${slot.blockId}`)}
                          className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all hover:scale-102 hover:shadow-sm ${
                            slot.status === 'Pending Approval'
                              ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                              : slot.status === 'Approved'
                              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                              : 'bg-blue-50/60 border-blue-200 text-blue-950'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                            <span>{slot.id}</span>
                            <span className="text-[9px] bg-white/80 px-1 rounded">{slot.time}</span>
                          </div>
                          <p className="font-semibold text-xs mt-1 line-clamp-2 leading-snug">
                            {slot.title}
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[10px]">
                            <span className="font-bold">{slot.status}</span>
                            <span className="underline text-blue-600">Review</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[70px] flex items-center justify-center text-slate-300 text-[11px] font-mono italic">
                          Clear
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
