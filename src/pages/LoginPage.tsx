import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRailway } from '../context/RailwayContext';
import { Department } from '../types';
import {
  ShieldCheck,
  Lock,
  User,
  Building2,
  ArrowRight,
  Zap,
  Radio,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  KeyRound,
  RefreshCw
} from 'lucide-react';
import { GovEmblem } from '../components/common/GovEmblem';
import { GovMasthead } from '../components/common/GovMasthead';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentDepartment, setCurrentUser, showToast } = useRailway();

  const [employeeId, setEmployeeId] = useState('IR-OP-7492');
  const [password, setPassword] = useState('••••••••••••');
  const [department, setDepartment] = useState<Department>('Control Office');
  const [rememberMe, setRememberMe] = useState(true);
  const [captchaInput, setCaptchaInput] = useState('8K42');
  const [authMode, setAuthMode] = useState<'password' | 'dsc'>('password');

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
      'Official Credential Verified',
      `Authenticated as ${demoName} (${demoDesig}).`,
      'info'
    );
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between font-sans selection:bg-blue-800 selection:text-white">
      {/* Top Government Masthead */}
      <GovMasthead variant="dark" />

      {/* Main Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-950">
          
          {/* Left Branding Side */}
          <div className="bg-gradient-to-br from-railway-navy via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-10 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GovEmblem size="lg" variant="gold" />
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight">
                    RailSamanvay <span className="text-amber-400 font-mono">AI</span>
                  </h1>
                  <p className="text-xs text-amber-400/90 font-medium">
                    भारतीय रेल • INDIAN RAILWAYS
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Ministry of Railways / CRIS Single Sign-On
                  </p>
                </div>
              </div>

              <div className="space-y-3 my-6 text-xs text-slate-300 leading-relaxed">
                <p className="font-semibold text-white">
                  Mission-Critical Block Sanction & Planning Gateway
                </p>
                <p className="text-slate-400 text-[11px]">
                  Secure operational access for Section Controllers, Divisional Engineers, and Traction Power Controllers under the Indian Railways General & Subsidiary Rules (G&SR 1968).
                </p>

                <div className="pt-2 space-y-2 border-t border-slate-800 text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>e-Office / Parichay Authentication Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sky-400">
                    <Database className="w-3.5 h-3.5" />
                    <span>Real-time Sync: TMS, SMMS, TDMS, COA</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Digital Signature Certificate (DSC) Enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Security Disclaimer */}
            <div className="p-3 bg-red-950/40 rounded-lg border border-red-800/40 text-[10px] text-red-300">
              <div className="font-bold flex items-center gap-1.5 mb-0.5">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                <span>STATUTORY WARNING</span>
              </div>
              <p className="leading-snug text-[9px] text-slate-400">
                Unauthorized access to Indian Railways operational scheduling systems is an offence under Section 174 of the Railways Act, 1989 and the IT Act, 2000. All sessions are cryptographically logged.
              </p>
            </div>
          </div>

          {/* Right Form Side */}
          <div className="bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Officer Sign-In (IR-SSO)
                  </h2>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                    CRIS AUTH v2.4
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your Railway Employee Number & Department Credentials
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex border border-slate-200 rounded-lg p-1 bg-slate-100 mb-5 text-xs">
                <button
                  type="button"
                  onClick={() => setAuthMode('password')}
                  className={`flex-1 py-1.5 font-bold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                    authMode === 'password'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Password / OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('dsc')}
                  className={`flex-1 py-1.5 font-bold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                    authMode === 'dsc'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  <span>Digital Token (DSC)</span>
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Employee ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Railway Employee / PF No.
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={employeeId}
                      onChange={e => setEmployeeId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Branch / Department */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Operating Branch / Cadre
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={department}
                      onChange={e => setDepartment(e.target.value as Department)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                    >
                      <option value="Control Office">Control Office — Operating (IRTS / COA)</option>
                      <option value="Engineering">Civil Engineering — P.Way (IRSE / TMS)</option>
                      <option value="S&T">Signal & Telecom — S&T (IRSSE / SMMS)</option>
                      <option value="Traction">Electrical Traction — TRD (IRSEE / TDMS)</option>
                      <option value="Administrator">Administrator — CRIS / Railway Board</option>
                    </select>
                  </div>
                </div>

                {/* Password / DSC Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {authMode === 'password' ? 'Password / Security PIN' : 'Class-3 DSC Token Status'}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Security Captcha (Government Standard) */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Security Code
                    </label>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                  <div className="bg-slate-100 border border-slate-300 px-4 py-2 rounded-lg text-slate-800 font-mono font-black text-sm tracking-widest select-none line-through mt-5">
                    8K42
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>Remember terminal</span>
                  </label>
                  <a href="#help" className="text-blue-600 hover:text-blue-800 font-medium text-[11px]">
                    Forgot PIN / Reset DSC?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-railway-navy hover:bg-railway-slate text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authorize & Enter Portal</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>

              {/* Quick Demo Officer Switcher */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Quick Switch: Role-Based Test Access (SIH 2026 Evaluation)
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Control Office', 'IRTS-901', 'Rajesh Sharma, IRTS', 'Chief Block Controller / Operating')}
                    className="p-1.5 rounded text-[10px] text-left border border-slate-200 hover:border-blue-400 hover:bg-blue-50 font-medium truncate"
                  >
                    <span className="font-bold block text-slate-900">Control (COA)</span>
                    <span className="text-slate-500">Sr. DOM / Section Ctrl</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Engineering', 'IRSE-412', 'Arunav Sengupta, IRSE', 'Senior Divisional Engineer / Track')}
                    className="p-1.5 rounded text-[10px] text-left border border-slate-200 hover:border-blue-400 hover:bg-blue-50 font-medium truncate"
                  >
                    <span className="font-bold block text-slate-900">Engineering (TMS)</span>
                    <span className="text-slate-500">Sr. DEN / P.Way</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('S&T', 'IRSSE-824', 'Vikramjit Roy, IRSSE', 'Senior Divisional Signal Engineer')}
                    className="p-1.5 rounded text-[10px] text-left border border-slate-200 hover:border-blue-400 hover:bg-blue-50 font-medium truncate"
                  >
                    <span className="font-bold block text-slate-900">Signals (SMMS)</span>
                    <span className="text-slate-500">Sr. DSTE / Interlocking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Traction', 'IRSEE-561', 'Debashis Mukherjee, IRSEE', 'Senior Divisional Electrical Engineer')}
                    className="p-1.5 rounded text-[10px] text-left border border-slate-200 hover:border-blue-400 hover:bg-blue-50 font-medium truncate"
                  >
                    <span className="font-bold block text-slate-900">Traction (TDMS)</span>
                    <span className="text-slate-500">Sr. DEE / OHE Power</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Footer */}
      <footer className="text-center py-3 text-[11px] text-slate-400 border-t border-slate-800 bg-slate-950">
        © 2026 Ministry of Railways, Government of India • Centre for Railway Information Systems (CRIS)
      </footer>
    </div>
  );
};
