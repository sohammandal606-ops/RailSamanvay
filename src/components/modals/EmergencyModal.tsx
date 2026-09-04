import React, { useState } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { Department, Criticality } from '../../types';
import { X, AlertOctagon, Flame, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { submitEmergencyRequest, currentDepartment } = useRailway();

  const [assetId, setAssetId] = useState('TRK-7821');
  const [department, setDepartment] = useState<Department>(
    currentDepartment === 'Control Office' || currentDepartment === 'Administrator' ? 'Engineering' : currentDepartment
  );
  const [location, setLocation] = useState('KM 142/6 (BWN-DGR Section)');
  const [defectType, setDefectType] = useState('Rail Flange Defect / Joint Weld Fracture');
  const [severity, setSeverity] = useState<Criticality>('Critical');
  const [description, setDescription] = useState('Urgent ultrasonic flaw confirmation detected by track patrolman. Immediate speed restriction / emergency shadow block required.');
  const [estimatedDurationMin, setEstimatedDurationMin] = useState<number>(60);
  const [submittedBy, setSubmittedBy] = useState('Section Engineer (P.Way) Bardhaman');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEmergencyRequest({
      assetId,
      department,
      location,
      defectType,
      severity,
      description,
      estimatedDurationMin,
      submittedBy,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-red-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-red-700 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-800/80 border border-red-500">
              <AlertOctagon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Create Emergency Maintenance Request</h3>
              <p className="text-xs text-red-100 mt-0.5">
                Immediate AI Queue Escalation & Dynamic Re-planning
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-red-200 hover:text-white hover:bg-red-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border-b border-red-200 px-5 py-2.5 flex items-center gap-2 text-xs text-red-800">
          <Flame className="w-4 h-4 text-red-600 shrink-0" />
          <span>
            Emergency requests bypass routine weekly queues and immediately flag existing block plans for re-optimization.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Asset ID / Track Code
              </label>
              <input
                type="text"
                required
                value={assetId}
                onChange={e => setAssetId(e.target.value)}
                placeholder="e.g. TRK-7821 or OHE-112"
                className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value as Department)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="Engineering">Engineering (Track / TMS)</option>
                <option value="S&T">S&T (Signalling / SMMS)</option>
                <option value="Traction">Traction (OHE / TDMS)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location / Chainage
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. KM 142/6"
                className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Duration (Minutes)
              </label>
              <input
                type="number"
                min="15"
                max="360"
                required
                value={estimatedDurationMin}
                onChange={e => setEstimatedDurationMin(Number(e.target.value))}
                className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Defect Classification
              </label>
              <input
                type="text"
                required
                value={defectType}
                onChange={e => setDefectType(e.target.value)}
                placeholder="e.g. Rail Fracture, Signal Blanking"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={e => setSeverity(e.target.value as Criticality)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none font-semibold text-red-700"
              >
                <option value="Critical">Critical (Immediate Halt/Caution)</option>
                <option value="High">High (Resolve within 24h)</option>
                <option value="Medium">Medium (Slot in Shadow Window)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Field Engineer Description / Site Observation
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Reporting Authority
            </label>
            <input
              type="text"
              required
              value={submittedBy}
              onChange={e => setSubmittedBy(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded-md shadow-sm flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4" />
              Dispatch Emergency Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
