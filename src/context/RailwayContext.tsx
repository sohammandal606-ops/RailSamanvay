import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Department,
  MaintenanceTask,
  CorridorSection,
  BlockPlan,
  AnomalyItem,
  DBSCANCluster,
  NotificationItem,
  EmergencyRequest,
  OptimizationMetrics
} from '../types';
import {
  INITIAL_TASKS,
  INITIAL_CORRIDOR_SECTIONS,
  INITIAL_BLOCK_PLANS,
  INITIAL_ANOMALIES,
  INITIAL_CLUSTERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_EMERGENCIES,
  INITIAL_OPTIMIZATION_METRICS
} from '../mockData/initialData';

interface ToastInfo {
  id: string;
  title: string;
  desc: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface RailwayContextType {
  currentDepartment: Department;
  setCurrentDepartment: (dept: Department) => void;
  currentUser: { name: string; designation: string; employeeId: string; zone: string };
  setCurrentUser: React.Dispatch<React.SetStateAction<{ name: string; designation: string; employeeId: string; zone: string }>>;
  tasks: MaintenanceTask[];
  corridors: CorridorSection[];
  blockPlans: BlockPlan[];
  anomalies: AnomalyItem[];
  clusters: DBSCANCluster[];
  notifications: NotificationItem[];
  emergencies: EmergencyRequest[];
  optimizationMetrics: OptimizationMetrics;
  isOptimizing: boolean;
  selectedTaskForDrawer: MaintenanceTask | null;
  setSelectedTaskForDrawer: (task: MaintenanceTask | null) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isOptimizationModalOpen: boolean;
  setIsOptimizationModalOpen: (open: boolean) => void;
  activeEmergencyAlert: EmergencyRequest | null;
  toast: ToastInfo | null;
  showToast: (title: string, desc: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  approveBlockPlan: (planId: string, notes?: string) => void;
  rejectBlockPlan: (planId: string, reason?: string) => void;
  modifyBlockPlan: (planId: string, updatedFields: Partial<BlockPlan>) => void;
  runAiOptimization: () => void;
  submitEmergencyRequest: (req: {
    assetId: string;
    department: Department;
    location: string;
    defectType: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    estimatedDurationMin: number;
    submittedBy: string;
  }) => void;
  dismissEmergencyAlert: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const RailwayContext = createContext<RailwayContextType | undefined>(undefined);

export const RailwayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDepartment, setCurrentDepartment] = useState<Department>('Control Office');
  const [currentUser, setCurrentUser] = useState({
    name: 'Rajesh Sharma, IRTS',
    designation: 'Chief Block Planner & Controller (Operating)',
    employeeId: 'IR-OP-7492',
    zone: 'Eastern Railway (ER) / Howrah Div'
  });

  const [tasks, setTasks] = useState<MaintenanceTask[]>(INITIAL_TASKS);
  const [corridors, setCorridors] = useState<CorridorSection[]>(INITIAL_CORRIDOR_SECTIONS);
  const [blockPlans, setBlockPlans] = useState<BlockPlan[]>(INITIAL_BLOCK_PLANS);
  const [anomalies, setAnomalies] = useState<AnomalyItem[]>(INITIAL_ANOMALIES);
  const [clusters, setClusters] = useState<DBSCANCluster[]>(INITIAL_CLUSTERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [emergencies, setEmergencies] = useState<EmergencyRequest[]>(INITIAL_EMERGENCIES);
  const [optimizationMetrics, setOptimizationMetrics] = useState<OptimizationMetrics>(INITIAL_OPTIMIZATION_METRICS);

  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [selectedTaskForDrawer, setSelectedTaskForDrawer] = useState<MaintenanceTask | null>(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isOptimizationModalOpen, setIsOptimizationModalOpen] = useState<boolean>(false);
  const [activeEmergencyAlert, setActiveEmergencyAlert] = useState<EmergencyRequest | null>(null);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, title, desc, type });
    setTimeout(() => {
      setToast(prev => (prev?.id === id ? null : prev));
    }, 4500);
  };

  const approveBlockPlan = (planId: string, notes?: string) => {
    setBlockPlans(prev =>
      prev.map(p => {
        if (p.id === planId) {
          return {
            ...p,
            status: 'Approved',
            history: [
              ...p.history,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actor: `${currentUser.name} (${currentDepartment})`,
                action: 'Final Block Authorization Granted',
                notes: notes || 'Approved with standard safety precautions.'
              }
            ]
          };
        }
        return p;
      })
    );

    // Update tasks linked to this block to Scheduled
    const targetPlan = blockPlans.find(p => p.id === planId);
    if (targetPlan) {
      setTasks(prev =>
        prev.map(t => (targetPlan.taskIds.includes(t.id) ? { ...t, status: 'Scheduled', assignedBlockId: planId } : t))
      );
    }

    showToast(
      'Block Plan Approved',
      `Plan ${planId} has been authorized for corridor possession. Handed to Control Office.`,
      'success'
    );
  };

  const rejectBlockPlan = (planId: string, reason?: string) => {
    setBlockPlans(prev =>
      prev.map(p => {
        if (p.id === planId) {
          return {
            ...p,
            status: 'Rejected',
            history: [
              ...p.history,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actor: `${currentUser.name} (${currentDepartment})`,
                action: 'Plan Rejected / Returned to Planning Queue',
                notes: reason || 'Timetable clearance / resource conflict indicated.'
              }
            ]
          };
        }
        return p;
      })
    );

    showToast(
      'Block Plan Rejected',
      `Plan ${planId} returned to AI re-planning queue for slot readjustment.`,
      'error'
    );
  };

  const modifyBlockPlan = (planId: string, updatedFields: Partial<BlockPlan>) => {
    setBlockPlans(prev =>
      prev.map(p => {
        if (p.id === planId) {
          return {
            ...p,
            ...updatedFields,
            status: 'Pending Approval',
            history: [
              ...p.history,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actor: `${currentUser.name} (${currentDepartment})`,
                action: 'Block Timing / Scope Modified by Planner'
              }
            ]
          };
        }
        return p;
      })
    );

    showToast(
      'Block Modified',
      `Plan ${planId} updated and awaiting final re-authorization.`,
      'info'
    );
  };

  const runAiOptimization = () => {
    setIsOptimizing(true);
    showToast(
      'Running AI Optimization Engine',
      'Integrating TMS, SMMS, TDMS & COA live telemetry with DBSCAN and rule constraints...',
      'info'
    );

    setTimeout(() => {
      setIsOptimizing(false);
      setIsOptimizationModalOpen(true);

      setOptimizationMetrics(prev => ({
        beforeSeparateBlocks: 8,
        beforeTotalDowntimeMin: 540,
        beforeUtilizationPct: 61,
        afterSeparateBlocks: 5,
        afterTotalDowntimeMin: 360,
        afterUtilizationPct: 88,
        downtimeReductionPct: 33.3,
        utilizationIncreasePct: 27.0,
        blocksReductionPct: 37.5,
        lastRunTimestamp: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST`
      }));

      // Add a fresh notification
      const newNotif: NotificationItem = {
        id: `NOTIF-${Date.now()}`,
        title: 'AI Multi-Department Optimization Finished',
        message: 'Optimized 5 coordinated shadow blocks across Howrah-Bardhaman corridor. 180 min downtime saved.',
        time: 'Just now',
        severity: 'success',
        read: false,
        linkTo: '/approval'
      };
      setNotifications(prev => [newNotif, ...prev]);

      showToast(
        'Optimization Completed',
        'AI synthesized 3 new coordinated shadow blocks with 88% overall utilization.',
        'success'
      );
    }, 1800);
  };

  const submitEmergencyRequest = (req: {
    assetId: string;
    department: Department;
    location: string;
    defectType: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    estimatedDurationMin: number;
    submittedBy: string;
  }) => {
    const newEmergency: EmergencyRequest = {
      id: `EMG-${Date.now().toString().slice(-6)}`,
      ...req,
      submittedAt: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST`,
      status: 'Queued for AI Re-planning'
    };

    setEmergencies(prev => [newEmergency, ...prev]);
    setActiveEmergencyAlert(newEmergency);

    // Also add to maintenance tasks
    const newTask: MaintenanceTask = {
      id: `EMG-${Math.floor(1000 + Math.random() * 9000)}`,
      assetId: req.assetId,
      department: req.department,
      location: req.location,
      defect: `EMERGENCY: ${req.defectType}`,
      criticality: 'Critical',
      dueDate: 'IMMEDIATE',
      durationMin: req.estimatedDurationMin,
      aiUrgencyScore: 99,
      status: 'Pending',
      sourceSystem: req.department === 'Engineering' ? 'TMS' : req.department === 'S&T' ? 'SMMS' : 'TDMS',
      breakdown: {
        assetCriticality: 30,
        defectSeverity: 25,
        overdueFactor: 20,
        anomalyScore: 15,
        operationalImpact: 9,
      },
      aiExplanation: 'EMERGENCY REQUEST FILED: Track/Asset hazard requires immediate shadow block slotting or emergency corridor restriction.',
      recommendedBlockWindow: 'Immediate Dispatch / Shadow Window'
    };

    setTasks(prev => [newTask, ...prev]);

    // Add alert notification
    const emgNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: `CRITICAL EMERGENCY: ${req.assetId}`,
      message: `${req.defectType} reported at ${req.location}. AI Re-planning triggered.`,
      time: 'Just now',
      severity: 'critical',
      read: false,
      linkTo: '/tasks'
    };
    setNotifications(prev => [emgNotif, ...prev]);

    showToast(
      'Emergency Task Added',
      'Emergency request queued into AI Engine. Existing block plan requires re-optimization.',
      'error'
    );
  };

  const dismissEmergencyAlert = () => {
    setActiveEmergencyAlert(null);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <RailwayContext.Provider
      value={{
        currentDepartment,
        setCurrentDepartment,
        currentUser,
        setCurrentUser,
        tasks,
        corridors,
        blockPlans,
        anomalies,
        clusters,
        notifications,
        emergencies,
        optimizationMetrics,
        isOptimizing,
        selectedTaskForDrawer,
        setSelectedTaskForDrawer,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isOptimizationModalOpen,
        setIsOptimizationModalOpen,
        activeEmergencyAlert,
        toast,
        showToast,
        approveBlockPlan,
        rejectBlockPlan,
        modifyBlockPlan,
        runAiOptimization,
        submitEmergencyRequest,
        dismissEmergencyAlert,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </RailwayContext.Provider>
  );
};

export const useRailway = (): RailwayContextType => {
  const context = useContext(RailwayContext);
  if (!context) {
    throw new Error('useRailway must be used within a RailwayProvider');
  }
  return context;
};
