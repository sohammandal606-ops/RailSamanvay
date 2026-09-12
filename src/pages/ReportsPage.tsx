import React, { useState } from 'react';
import { useRailway } from '../context/RailwayContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { GovEmblem } from '../components/common/GovEmblem';
import { OfficialStamp } from '../components/common/OfficialStamp';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Layers,
  Sparkles,
  BarChart3,
  CheckCircle2,
  FileSpreadsheet,
  Printer,
  X,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { showToast, currentUser } = useRailway();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reportTypes = [
    {
      id: 'REP-G48-WEEKLY',
      title: 'Weekly Form G-48 Corridor Possession Master Plan',
      desc: 'Comprehensive multi-department timetable including civil track, signal, and traction possessions.',
      category: 'Operations (COA)',
      frequency: 'Weekly',
      lastGenerated: 'Today, 09:30 IST',
      format: 'PDF / CSV'
    },
    {
      id: 'REP-MONTHLY-MACRO',
      title: 'Monthly Block Macro Forecast & Zonal Outlook',
      desc: 'Lookahead 30-day corridor utilization, major track renewal schedules, and ballast tamping matrix.',
      category: 'Planning & Renewal',
      frequency: 'Monthly',
      lastGenerated: '01 Sep 2026',
      format: 'PDF / CSV'
    },
    {
      id: 'REP-TMS-PRIORITY',
      title: 'Asset Defect Register & Anomaly Severity Report',
      desc: 'Ranked list of all critical assets, TMS ultrasonic test results, and Isolation Forest anomaly flags.',
      category: 'Safety & Track Assets',
      frequency: 'Daily',
      lastGenerated: 'Today, 08:00 IST',
      format: 'PDF / CSV'
    },
    {
      id: 'REP-AVAILABILITY',
      title: 'Asset Availability & Downtime Reduction Audit',
      desc: 'Corridor-wise infrastructure availability percentage against divisional target SLAs.',
      category: 'Executive (Railway Board)',
      frequency: 'Monthly',
      lastGenerated: '04 Sep 2026',
      format: 'PDF / CSV'
    },
    {
      id: 'REP-BRANCH-SYNC',
      title: 'Department-wise Coordination Performance (Shadow Factor)',
      desc: 'Cross-functional participation rate of Engineering, S&T, and Traction in shared shadow blocks.',
      category: 'Branch Coordination',
      frequency: 'Weekly',
      lastGenerated: 'Yesterday, 18:00 IST',
      format: 'PDF / CSV'
    },
    {
      id: 'REP-GSR-AUDIT',
      title: 'CP-SAT AI Optimization & G&SR Safety Clearance Dossier',
      desc: 'Complete mathematical formulation trace, DBSCAN density metrics, and safety rule validation logs.',
      category: 'Statutory Safety Audit',
      frequency: 'On Demand',
      lastGenerated: 'Today, 09:15 IST',
      format: 'PDF / CSV'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Official Government Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <GovEmblem size="lg" variant="gold" className="shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Official Railway Reports & Statutory Export Center
              </h1>
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded border border-blue-300">
                FORM G-48 DOSSIERS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              भारतीय रेल आधिकारिक रिपोर्ट एवं निर्यात केंद्र • Generate, preview, and export official Indian Railways operational maintenance dossiers and block schedules
            </p>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map(rep => (
          <div
            key={rep.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold bg-railway-navy text-white px-2 py-0.5 rounded">
                  {rep.id}
                </span>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  {rep.frequency}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 mt-3 leading-snug">
                {rep.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {rep.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>Branch: {rep.category}</span>
                <span>{rep.lastGenerated}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedReport(rep.title)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Preview G-48</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => showToast('CSV Exported', `${rep.title} downloaded in CSV format.`, 'success')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CSV</span>
                </button>

                <button
                  onClick={() => showToast('PDF Generated', `${rep.title} compiled with digital IR signature token.`, 'success')}
                  className="px-3 py-1.5 rounded-lg bg-railway-navy hover:bg-railway-slate text-white text-xs font-bold flex items-center gap-1 shadow-xs border border-slate-800"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Preview Modal (If Open) */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-railway-navy text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold truncate max-w-lg">
                  Official Dossier Preview: {selectedReport}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Mock Preview */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto bg-slate-50 text-slate-900">
              <div className="bg-white p-8 border border-slate-300 rounded-lg shadow-xs space-y-6">
                
                {/* Official Letterhead */}
                <div className="text-center border-b-2 border-slate-800 pb-4">
                  <div className="flex justify-center mb-2">
                    <GovEmblem size="lg" variant="navy" />
                  </div>
                  <div className="font-bold text-xs uppercase tracking-widest text-slate-700">
                    भारत सरकार • रेल मंत्रालय | GOVERNMENT OF INDIA • MINISTRY OF RAILWAYS
                  </div>
                  <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900 mt-1">
                    {currentUser.zone || 'Eastern Railway'} • Operating & Maintenance Control Office
                  </h2>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Divisional Headquarters • Block Planning & Safety Section • Form G-48
                  </div>
                </div>

                {/* Report Title & Official Stamp */}
                <div className="flex justify-between items-center text-xs font-mono text-slate-600 border-b border-slate-200 pb-2">
                  <span>REF: IR/OPT-AI/G48/2026/09</span>
                  <span>DATE: 12-SEP-2026</span>
                  <OfficialStamp
                    status="Approved"
                    officerTitle="SR. DIVISIONAL OPERATIONS MANAGER"
                    sanctionRef="G48-2026-09"
                    size="sm"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold underline mb-2">
                    Subject: Formal Line Clear Authorization Schedule for Coordinated Shadow Block Possession
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-700">
                    In reference to the multi-source telemetry integrated from TMS (Permanent Way), SMMS (Signalling), and TDMS (Traction Distribution), the following coordinated maintenance blocks have passed automated G&SR Chapter IV rule validation and received formal operational clearance:
                  </p>
                </div>

                {/* Table Mock */}
                <table className="w-full text-left text-xs border border-slate-300">
                  <thead className="bg-slate-100 font-bold border-b border-slate-300">
                    <tr>
                      <th className="p-2 border-r border-slate-300">Form G-48 ID</th>
                      <th className="p-2 border-r border-slate-300">Corridor Section</th>
                      <th className="p-2 border-r border-slate-300">Time Window (IST)</th>
                      <th className="p-2 border-r border-slate-300">Branches</th>
                      <th className="p-2">G&SR Clearance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300 font-mono text-[11px]">
                    <tr>
                      <td className="p-2 border-r border-slate-300 font-bold">BLK-2026-0912-004</td>
                      <td className="p-2 border-r border-slate-300">BWN - DGR (KM 140-146)</td>
                      <td className="p-2 border-r border-slate-300">10:00 - 12:00 IST</td>
                      <td className="p-2 border-r border-slate-300">ENG + S&T + TRD</td>
                      <td className="p-2 text-emerald-700 font-bold">PASSED / G&SR VALID</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-300 font-bold">BLK-2026-0913-002</td>
                      <td className="p-2 border-r border-slate-300">DGR - ASN (KM 188-194)</td>
                      <td className="p-2 border-r border-slate-300">13:00 - 14:30 IST</td>
                      <td className="p-2 border-r border-slate-300">ENG + S&T</td>
                      <td className="p-2 text-emerald-700 font-bold">PASSED / G&SR VALID</td>
                    </tr>
                  </tbody>
                </table>

                {/* Sign-off */}
                <div className="pt-6 flex justify-between items-end text-xs text-slate-700 border-t border-slate-200">
                  <div>
                    <div className="font-mono text-[10px] text-slate-500">DIGITALLY GENERATED BY:</div>
                    <div className="font-bold">RailSamanvay AI Engine • CRIS New Delhi</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">Senior Divisional Operations Manager (Sr. DOM)</div>
                    <div className="text-slate-500 text-[11px]">{currentUser.zone || 'Eastern Railway'}</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                *Official Document Simulation for Indian Railways (SIH 2026)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    showToast('Document Printed', 'Exported to local printer queue.', 'success');
                    setSelectedReport(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-railway-navy hover:bg-railway-slate rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Print Formal Dossier</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
