import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { useNavigate } from 'react-router-dom';
import { GovEmblem } from '../components/common/GovEmblem';
import {
  Sparkles,
  Zap,
  Download,
  Wrench,
  Radio,
  Layers,
  FileCheck2,
  Clock,
  ShieldCheck,
  CalendarCheck,
  ChevronRight,
  Printer
} from 'lucide-react';

export const WeeklyPlannerPage: React.FC = () => {
  const { runAiOptimization, isOptimizing, showToast } = useRailway();
  const navigate = useNavigate();

  const daysOfWeek = [
    { day: 'Monday', date: '12 Sep', code: 'MON' },
    { day: 'Tuesday', date: '13 Sep', code: 'TUE' },
    { day: 'Wednesday', date: '14 Sep', code: 'WED' },
    { day: 'Thursday', date: '15 Sep', code: 'THU' },
    { day: 'Friday', date: '16 Sep', code: 'FRI' },
    { day: 'Saturday', date: '17 Sep', code: 'SAT' },
    { day: 'Sunday', date: '18 Sep', code: 'SUN' },
  ];

  const weeklySchedule = [
    {
      dept: 'Engineering (P-Way)',
      deptHi: 'अभियांत्रिकी विभाग',
      icon: Wrench,
      code: 'ENG',
      color: 'bg-blue-700',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      schedule: [
        { id: 'ENG-1042', title: 'Rail Renewal KM 142', time: '10:00 - 12:00', status: 'Pending Approval', blockId: 'BLK-2026-0912-004', priority: 'High' },
        { id: 'ENG-1088', title: 'Ballast Tamping KM 144', time: '13:00 - 14:30', status: 'Approved', blockId: 'BLK-2026-0913-002', priority: 'Routine' },
        { id: 'ENG-1102', title: 'AT Weld Replace KM 12', time: '08:00 - 10:30', status: 'Pending Approval', blockId: 'BLK-2026-0914-001', priority: 'Urgent' },
        { id: 'ENG-1140', title: 'USFD Ultrasonic Scan', time: '02:00 - 04:00', status: 'Planned', blockId: 'BLK-2026-0915-003', priority: 'Routine' },
        { id: 'ENG-1199', title: 'Turnout Switch Overhaul', time: '11:00 - 12:30', status: 'Planned', blockId: 'BLK-2026-0916-002', priority: 'Routine' },
        { id: 'ENG-1220', title: 'Bridge Guard Rail Check', time: '09:00 - 10:30', status: 'Planned', blockId: 'BLK-2026-0917-001', priority: 'Routine' },
        { id: 'ENG-1250', title: 'Yard Clearance & Packing', time: '14:00 - 16:00', status: 'Planned', blockId: 'BLK-2026-0918-001', priority: 'Routine' },
      ]
    },
    {
      dept: 'S&T (Signalling)',
      deptHi: 'संकेत एवं दूरसंचार',
      icon: Radio,
      code: 'SIG',
      color: 'bg-amber-600',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      schedule: [
        { id: 'SIG-2041', title: 'Relay Check KM 145', time: '10:00 - 12:00', status: 'Pending Approval', blockId: 'BLK-2026-0912-004', priority: 'Joint' },
        { id: 'SIG-2144', title: 'Point Machine 114B', time: '13:00 - 14:30', status: 'Approved', blockId: 'BLK-2026-0913-002', priority: 'Routine' },
        null,
        { id: 'SIG-2099', title: 'Axle Counter Sensor', time: '02:00 - 04:00', status: 'Planned', blockId: 'BLK-2026-0915-003', priority: 'Routine' },
        { id: 'SIG-2201', title: 'Signal Aspect LED Lamp', time: '11:00 - 12:30', status: 'Planned', blockId: 'BLK-2026-0916-002', priority: 'Routine' },
        null,
        { id: 'SIG-2280', title: 'Electronic Interlocking', time: '14:00 - 16:00', status: 'Planned', blockId: 'BLK-2026-0918-001', priority: 'Routine' },
      ]
    },
    {
      dept: 'Traction (OHE TRD)',
      deptHi: 'विद्युत संकर्षण (कर्षण)',
      icon: Zap,
      code: 'TRD',
      color: 'bg-purple-700',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      schedule: [
        { id: 'TRA-3022', title: 'OHE Stagger KM 141', time: '10:00 - 12:00', status: 'Pending Approval', blockId: 'BLK-2026-0912-004', priority: 'Joint' },
        null,
        { id: 'TRA-3081', title: 'Cantilever Insulator KM 218', time: '08:00 - 10:30', status: 'Pending Approval', blockId: 'BLK-2026-0914-001', priority: 'Urgent' },
        null,
        { id: 'TRA-3110', title: 'Contact Wire Dropper Check', time: '11:00 - 12:30', status: 'Planned', blockId: 'BLK-2026-0916-002', priority: 'Routine' },
        { id: 'TRA-3150', title: 'Substation Neutral Section', time: '09:00 - 10:30', status: 'Planned', blockId: 'BLK-2026-0917-001', priority: 'Routine' },
        null,
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Official Government Header Banner */}
      <div className="gov-card p-5 border-l-4 border-railway-saffron">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <GovEmblem size="lg" className="shrink-0 drop-shadow-sm" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-railway-maroon tracking-wider uppercase font-hindi">
                  भारतीय रेल • पूर्व रेलवे (हावड़ा मंडल)
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
                  G&SR RULE 1968 COMPLIANT
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex flex-wrap items-center gap-2.5 mt-0.5">
                <span>साप्ताहिक ब्लॉक संचलन समय-सारणी</span>
                <span className="text-slate-400 font-light hidden sm:inline">|</span>
                <span className="text-base sm:text-lg font-bold text-slate-800">
                  Weekly Corridor Possession Timetable
                </span>
              </h1>
              <p className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2 font-medium">
                <span>Master Timetable synchronized with Howrah – Bardhaman – Asansol Quadruple Corridor</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="font-mono text-railway-navy font-bold">Week 37: 12 Sep – 18 Sep 2026</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <button
              onClick={() => {
                showToast('Master Roster Exported', 'Weekly G-48 possession plan downloaded as CSV & PDF.', 'success');
              }}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export Roster (G-48)</span>
            </button>

            <button
              onClick={runAiOptimization}
              disabled={isOptimizing}
              className="px-4 py-2 bg-railway-navy hover:bg-railway-slate text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isOptimizing ? 'Synthesizing Roster...' : 'AI Optimization'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Room Telemetry & Legend Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400 border border-amber-500" />
            <span className="font-bold text-slate-700">Pending Sr. DOM Sanction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 border border-emerald-600" />
            <span className="font-bold text-slate-700">Form G-48 Sanctioned & Cleared</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-500 border border-blue-600" />
            <span className="font-bold text-slate-700">Planned Routine Possession</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-500 border border-purple-600" />
            <span className="font-bold text-slate-700">Integrated Multi-Dept Possession</span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600">
          <span className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-bold">
            19 Total Blocks Scheduled
          </span>
          <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded border border-emerald-200 font-bold">
            0 Punctuality Violations
          </span>
        </div>
      </div>

      {/* Weekly Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Department / Corridor Masthead banner */}
        <div className="px-4 py-3 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-railway-gold" />
            <span className="font-bold tracking-wide uppercase">
              DIVISIONAL SECTION TIMETABLE MATRIX • HWH-BWN CHORD & MAIN
            </span>
          </div>
          <div className="text-[11px] text-slate-300 font-mono">
            Possession Windows Synchronized with Coaching Operations
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden px-3 py-1.5 bg-blue-50/80 border-b border-blue-100 flex items-center justify-between text-[11px] text-blue-700 font-medium">
          <span>↔ Swipe table horizontally to view full 7-day schedule</span>
          <span className="font-mono text-[10px] bg-blue-100 px-1.5 py-0.5 rounded">7 Days</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[1050px]">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-52 bg-slate-200/70 border-r border-slate-200">Department / Discipline</th>
                {daysOfWeek.map((d, idx) => (
                  <th key={idx} className="py-3 px-3 text-center border-l border-slate-200">
                    <div className="font-extrabold text-slate-900">{d.day}</div>
                    <div className="text-[10px] text-slate-500 font-mono font-semibold">{d.date}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {weeklySchedule.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 bg-slate-50/80 border-r border-slate-200">
                    <div className="flex items-start gap-2.5">
                      <div className={`p-1.5 rounded-md ${row.color} text-white shrink-0 mt-0.5`}>
                        <row.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{row.dept}</div>
                        <div className="text-[10px] font-hindi text-slate-500 font-medium">{row.deptHi}</div>
                        <span className={`inline-block text-[9px] font-mono font-bold mt-1 px-1.5 py-0.2 rounded border ${row.badgeColor}`}>
                          CODE: {row.code}
                        </span>
                      </div>
                    </div>
                  </td>
                  {row.schedule.map((slot, cIdx) => (
                    <td key={cIdx} className="py-3 px-2 border-l border-slate-100 align-top">
                      {slot ? (
                        <div
                          onClick={() => slot.blockId && navigate(`/approval/${slot.blockId}`)}
                          className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all hover:scale-102 hover:shadow-md ${
                            slot.status === 'Pending Approval'
                              ? 'bg-amber-50/90 border-amber-300 text-amber-950 hover:border-amber-400'
                              : slot.status === 'Approved'
                              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 hover:border-emerald-400'
                              : 'bg-blue-50/70 border-blue-200 text-blue-950 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                            <span className="text-slate-800">{slot.id}</span>
                            <span className="text-[9px] bg-white/90 border border-slate-200/80 px-1 py-0.5 rounded text-slate-700">
                              {slot.time}
                            </span>
                          </div>
                          <p className="font-bold text-xs mt-1.5 line-clamp-2 leading-snug">
                            {slot.title}
                          </p>
                          <div className="mt-2.5 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                            <span className={`font-bold px-1.5 py-0.5 rounded text-[9px] ${
                              slot.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-900'
                                : slot.status === 'Pending Approval'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-blue-100 text-blue-900'
                            }`}>
                              {slot.status === 'Approved' ? '✓ SANCTIONED' : slot.status === 'Pending Approval' ? '⏱ PENDING G-48' : 'PLANNED'}
                            </span>
                            <span className="font-bold text-blue-700 flex items-center gap-0.5 hover:underline">
                              G-48 <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[80px] flex flex-col items-center justify-center text-slate-300 text-[11px] font-mono">
                          <span className="text-slate-400 font-bold">CLEAR</span>
                          <span className="text-[9px] text-slate-400">Timetable open</span>
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
