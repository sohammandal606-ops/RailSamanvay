import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRailway } from '../context/RailwayContext';
import { Department } from '../types';
import {
  TrainTrack,
  ShieldCheck,
  Lock,
  User,
  Building2,
  ArrowRight,
  Zap,
  Radio,
  Layers,
  Database,
  CheckCircle2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentDepartment, setCurrentUser, showToast } = useRailway();

  const [employeeId, setEmployeeId] = useState('IR-OP-7492');
  const [password, setPassword] = useState('••••••••••••');
  const [department, setDepartment] = useState<Department>('Control Office');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentDepartment(department);

    let designation = 'Chief Block Controller (Operating)';
    let name = 'Rajesh Sharma, IRTS';

    if (department === 'Engineering') {
      designation = 'Senior Divisional Engineer / Track (Sr.DEN/TMS)';
      name = 'Arunav Sengupta, IRSE';
    } else if (department === 'S&T') {
      designation = 'Senior Divisional Signal Engineer (Sr.DSTE/SMMS)';
      name = 'Vikramjit Roy, IRSSE';
    } else if (department === 'Traction') {
      designation = 'Senior Divisional Electrical Engineer / TRD (Sr.DEE/TDMS)';
      name = 'Debashis Mukherjee, IRSEE';
    } else if (department === 'Administrator') {
      designation = 'Chief Technology Officer / CRIS Systems';
      name = 'Priya Banerjee, IRS';
    }

    setCurrentUser({
      name,
      designation,
      employeeId,
      zone: 'Eastern Railway (ER) / Howrah Div'
    });

    showToast(
      'Enterprise Authentication Verified',
      `Welcome, ${name} (${designation}). Connected to Live Zone Server.`,
      'success'
    );

    navigate('/dashboard');
  };

  const handleQuickDemo = (demoDept: Department, demoId: string, demoName: string, demoDesig: string) => {
    setDepartment(demoDept);
    setEmployeeId(demoId);
    setCurrentDepartment(demoDept);
    setCurrentUser({
      name: demoName,
      designation: demoDesig,
      employeeId: demoId,
      zone: 'Eastern Railway (ER) / Howrah Div'
    });
    showToast(
      'Demo Role Switch',
      `Logged in as ${demoName} (${demoDept}).`,
      'info'
    );
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
        
        {/* Left Branding Side */}
        <div className="bg-gradient-to-br from-railway-navy via-slate-900 to-slate-950 p-8 sm:p-10 text-white flex flex-col justify-between border-r border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg border border-blue-400/40">
                <TrainTrack className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">
                  RailSamanvay <span className="text-blue-400 font-mono">AI</span>
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  Automatic Block Planning System
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <p className="leading-relaxed">
                Indian Railways Enterprise Single Sign-On (SSO) gateway for Section Controllers, Track Engineers, S&T Officers, and Traction Power Controllers.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>TMS, SMMS, TDMS & COA Cross-Department Sync</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>DBSCAN Spatial Clustering & Anomaly Detection</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict Human-in-the-Loop Safety Authorization</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
            <div>Zone: Eastern Railway (ER) • Howrah Division</div>
            <div>Server Node: ER-HWH-OPS-PROD-01</div>
          </div>
        </div>

        {/* Right Login Card Side */}
        <div className="bg-white p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Enterprise Sign In
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your IR employee credentials to access the block controller console
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department
                </label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value as Department)}
                    className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white"
                  >
                    <option value="Control Office">Control Office (Operating / COA)</option>
                    <option value="Engineering">Engineering (Track / TMS)</option>
                    <option value="S&T">S&T (Signalling & Telecom / SMMS)</option>
                    <option value="Traction">Traction (TRD / OHE / TDMS)</option>
                    <option value="Administrator">System Administrator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Employee ID / CRIS PIN
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={e => setEmployeeId(e.target.value)}
                    placeholder="e.g. IR-OP-7492"
                    className="w-full text-xs font-mono pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password / Passcode
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full text-xs font-mono pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span>Remember session</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password Reset', 'Contact CRIS System Administrator (Ext: 4421)', 'info'); }} className="text-blue-600 hover:underline font-medium">
                  Forgot PIN?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-railway-navy hover:bg-railway-slate text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In to RailSamanvay Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick 1-Click Demo Profiles for Hackathon Evaluators */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">
              Quick 1-Click Demo Switcher
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => handleQuickDemo('Control Office', 'IR-OP-7492', 'Rajesh Sharma, IRTS', 'Chief Block Controller')}
                className="p-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 text-left text-[11px] font-medium text-slate-700"
              >
                <div className="font-bold text-teal-800">Control Office</div>
                <div className="text-[10px] text-slate-500">Chief Planner</div>
              </button>

              <button
                onClick={() => handleQuickDemo('Engineering', 'IR-ENG-1044', 'Arunav Sengupta, IRSE', 'Sr.DEN (P.Way)')}
                className="p-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left text-[11px] font-medium text-slate-700"
              >
                <div className="font-bold text-blue-800">Engineering</div>
                <div className="text-[10px] text-slate-500">Track Maintenance</div>
              </button>

              <button
                onClick={() => handleQuickDemo('S&T', 'IR-SIG-3312', 'Vikramjit Roy, IRSSE', 'Sr.DSTE (Signals)')}
                className="p-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-left text-[11px] font-medium text-slate-700"
              >
                <div className="font-bold text-amber-800">S&T Dept</div>
                <div className="text-[10px] text-slate-500">Signalling & Telecom</div>
              </button>

              <button
                onClick={() => handleQuickDemo('Traction', 'IR-TRD-5501', 'Debashis Mukherjee, IRSEE', 'Sr.DEE (TRD)')}
                className="p-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-300 text-left text-[11px] font-medium text-slate-700"
              >
                <div className="font-bold text-purple-800">Traction TRD</div>
                <div className="text-[10px] text-slate-500">25kV OHE Power</div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
