import React, { createContext, useContext, useState } from 'react';
import {
  Department,
  MaintenanceTask,
  CorridorSection,
  BlockPlan,
  AnomalyItem,
  DBSCANCluster,
  KMeansCluster,
  NotificationItem,
  EmergencyRequest,
  OptimizationMetrics,
  DataSourceStatus,
  DataIngestionStats,
  UnifiedDatabaseRecord,
  ResourceAllocation,
  GeoSpatialMarker,
  ConstraintCheck,
  PlanningTrigger,
  ExecutionRecord,
  RejectedDecision,
  PlanFeedback,
  DynamicEventSimulation,
  ExecutionStatus
} from '../types';
import {
  INITIAL_TASKS,
  INITIAL_CORRIDOR_SECTIONS,
  INITIAL_BLOCK_PLANS,
  INITIAL_ANOMALIES,
  INITIAL_CLUSTERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_EMERGENCIES,
  INITIAL_OPTIMIZATION_METRICS,
  INITIAL_DATA_SOURCES,
  INITIAL_INGESTION_STATS,
  INITIAL_UNIFIED_RECORDS,
  INITIAL_RESOURCES,
  INITIAL_GEOSPATIAL_MARKERS,
  INITIAL_KMEANS_CLUSTERS,
  INITIAL_CONSTRAINT_CHECKS,
  INITIAL_PLANNING_TRIGGERS,
  INITIAL_EXECUTION_RECORDS,
  INITIAL_REJECTED_DECISIONS,
  INITIAL_PLAN_FEEDBACK,
  INITIAL_DYNAMIC_EVENTS
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
  kMeansClusters: KMeansCluster[];
  notifications: NotificationItem[];
  emergencies: EmergencyRequest[];
  optimizationMetrics: OptimizationMetrics;
  dataSources: DataSourceStatus[];
  ingestionStats: DataIngestionStats;
  unifiedRecords: UnifiedDatabaseRecord[];
  resources: ResourceAllocation[];
  geoMarkers: GeoSpatialMarker[];
  constraintChecks: ConstraintCheck[];
  planningTriggers: PlanningTrigger[];
  executionRecords: ExecutionRecord[];
  rejectedDecisions: RejectedDecision[];
  planFeedback: PlanFeedback[];
  dynamicEvents: DynamicEventSimulation[];
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
  // Extended Architecture Operations
  updateExecutionStatus: (blockId: string, status: ExecutionStatus) => void;
  triggerDynamicEvent: (eventId: string) => void;
  replanRejectedBlock: (rejectionId: string) => void;
  submitFeedback: (fb: Omit<PlanFeedback, 'id' | 'timestamp'>) => void;
  triggerDataIngestionSync: () => void;
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
  const [kMeansClusters, setKMeansClusters] = useState<KMeansCluster[]>(INITIAL_KMEANS_CLUSTERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [emergencies, setEmergencies] = useState<EmergencyRequest[]>(INITIAL_EMERGENCIES);
  const [optimizationMetrics, setOptimizationMetrics] = useState<OptimizationMetrics>(INITIAL_OPTIMIZATION_METRICS);

  // New Architecture States
  const [dataSources, setDataSources] = useState<DataSourceStatus[]>(INITIAL_DATA_SOURCES);
  const [ingestionStats, setIngestionStats] = useState<DataIngestionStats>(INITIAL_INGESTION_STATS);
  const [unifiedRecords, setUnifiedRecords] = useState<UnifiedDatabaseRecord[]>(INITIAL_UNIFIED_RECORDS);
  const [resources, setResources] = useState<ResourceAllocation[]>(INITIAL_RESOURCES);
  const [geoMarkers, setGeoMarkers] = useState<GeoSpatialMarker[]>(INITIAL_GEOSPATIAL_MARKERS);
  const [constraintChecks, setConstraintChecks] = useState<ConstraintCheck[]>(INITIAL_CONSTRAINT_CHECKS);
  const [planningTriggers, setPlanningTriggers] = useState<PlanningTrigger[]>(INITIAL_PLANNING_TRIGGERS);
  const [executionRecords, setExecutionRecords] = useState<ExecutionRecord[]>(INITIAL_EXECUTION_RECORDS);
  const [rejectedDecisions, setRejectedDecisions] = useState<RejectedDecision[]>(INITIAL_REJECTED_DECISIONS);
  const [planFeedback, setPlanFeedback] = useState<PlanFeedback[]>(INITIAL_PLAN_FEEDBACK);
  const [dynamicEvents, setDynamicEvents] = useState<DynamicEventSimulation[]>(INITIAL_DYNAMIC_EVENTS);

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
                action: 'Final Block Authorization Granted (Human-in-the-Loop)',
                notes: notes || 'Authorized after verifying safety overlaps and machine availability.'
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

    // Add or update execution tracking record
    setExecutionRecords(prev => {
      const existing = prev.find(e => e.blockId === planId);
      if (existing) {
        return prev.map(e => e.blockId === planId ? { ...e, executionStatus: 'Scheduled', authorizedOfficer: currentUser.name } : e);
      }
      return [
        {
          blockId: planId,
          corridor: targetPlan?.corridor || 'Main Corridor',
          plannedStart: targetPlan?.startTime || '10:00 IST',
          plannedEnd: targetPlan?.endTime || '12:00 IST',
          executionStatus: 'Scheduled',
          authorizedOfficer: currentUser.name,
          workCompletionPct: 0,
          safetySignOffStatus: 'Pending',
          notes: notes || 'Authorized by Operating Controller. Ready for corridor possession.'
        },
        ...prev
      ];
    });

    showToast(
      'Block Plan Authorized',
      `Plan ${planId} formally authorized by ${currentUser.name}. Dispatched to Control Office execution queue.`,
      'success'
    );
  };

  const rejectBlockPlan = (planId: string, reason?: string) => {
    const targetPlan = blockPlans.find(p => p.id === planId);
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
                action: 'Block Plan Rejected / Returned for CP-SAT Re-Optimization',
                notes: reason || 'Timetable clearance or resource constraint conflict identified.'
              }
            ]
          };
        }
        return p;
      })
    );

    // Log to rejected decisions
    const newRejection: RejectedDecision = {
      id: `REJ-${Date.now().toString().slice(-4)}`,
      blockId: planId,
      corridor: targetPlan?.corridor || 'Eastern Railway Main Line',
      rejectedBy: currentUser.name,
      rejectionReason: reason || 'Timetable congestion or resource availability mismatch.',
      timestamp: `Today ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST`,
      replanStatus: 'Awaiting Re-Plan'
    };
    setRejectedDecisions(prev => [newRejection, ...prev]);

    showToast(
      'Block Plan Rejected',
      `Plan ${planId} returned to Re-Plan queue. You can run Re-Plan from the Human Approval page.`,
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
                action: 'Block Timing / Scope Adjusted by Controller'
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

  const replanRejectedBlock = (rejectionId: string) => {
    const targetRej = rejectedDecisions.find(r => r.id === rejectionId);
    if (!targetRej) return;

    setRejectedDecisions(prev =>
      prev.map(r => r.id === rejectionId ? { ...r, replanStatus: 'Re-Optimized' } : r)
    );

    // If block plan exists, switch to alternative window
    setBlockPlans(prev =>
      prev.map(p => {
        if (p.id === targetRej.blockId) {
          return {
            ...p,
            status: 'Pending Approval',
            startTime: p.alternativeBlockWindow ? p.alternativeBlockWindow.startTime : '14:00',
            endTime: p.alternativeBlockWindow ? p.alternativeBlockWindow.endTime : '16:00',
            history: [
              ...p.history,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actor: 'RailSamanvay CP-SAT Engine',
                action: 'Re-Optimized: Switched to Alternative Window (14:00 - 16:00)',
                notes: 'Re-solved with updated constraint weights; 0 train conflicts predicted.'
              }
            ]
          };
        }
        return p;
      })
    );

    showToast(
      'Re-Plan Generated',
      `Plan ${targetRej.blockId} has been rescheduled to alternative conflict-free window 14:00 – 16:00.`,
      'success'
    );
  };

  const updateExecutionStatus = (blockId: string, status: ExecutionStatus) => {
    setExecutionRecords(prev =>
      prev.map(e => {
        if (e.blockId === blockId) {
          const isComplete = status === 'Completed' || status === 'Safety Sign-off Done';
          return {
            ...e,
            executionStatus: status,
            workCompletionPct: isComplete ? 100 : status === 'Block In Progress' ? 55 : e.workCompletionPct,
            safetySignOffStatus: status === 'Safety Sign-off Done' ? 'Verified by S&T & ENG' : e.safetySignOffStatus,
            actualEnd: isComplete ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST' : e.actualEnd
          };
        }
        return e;
      })
    );

    showToast('Execution Status Updated', `Block ${blockId} status updated to: ${status}`, 'info');
  };

  const submitFeedback = (fb: Omit<PlanFeedback, 'id' | 'timestamp'>) => {
    const newFb: PlanFeedback = {
      id: `FB-${Date.now().toString().slice(-4)}`,
      ...fb,
      timestamp: `Today ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST`
    };
    setPlanFeedback(prev => [newFb, ...prev]);
    showToast('Feedback Recorded', 'Execution observations stored in Model Feedback Loop for future weight calibration.', 'success');
  };

  const triggerDynamicEvent = (eventId: string) => {
    setDynamicEvents(prev =>
      prev.map(ev => (ev.id === eventId ? { ...ev, active: !ev.active } : ev))
    );

    const eventObj = dynamicEvents.find(e => e.id === eventId);
    if (!eventObj) return;

    if (!eventObj.active) {
      // Triggering event
      showToast('Dynamic Re-Optimization Triggered', `Event: ${eventObj.title}. OR-Tools CP-SAT re-evaluating corridor schedule...`, 'warning');
      
      const newTrigger: PlanningTrigger = {
        id: `TRIG-${Date.now().toString().slice(-4)}`,
        eventType: 'Sudden Rail Fracture',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
        section: eventObj.affectedSection,
        actionTaken: eventObj.suggestedAction,
        status: 'Triggered Re-Plan'
      };
      setPlanningTriggers(prev => [newTrigger, ...prev]);
    } else {
      showToast('Dynamic Event Resolved', `Corridor cleared for normal CP-SAT block schedule.`, 'info');
    }
  };

  const triggerDataIngestionSync = () => {
    showToast('Ingesting Data Pipeline', 'Polling BDMS, TMS, SMMS, TDMS, COA APIs...', 'info');
    setTimeout(() => {
      setIngestionStats(prev => ({
        recordsReceived: prev.recordsReceived + 14,
        recordsValidated: prev.recordsValidated + 14,
        corruptedDuplicatesDropped: prev.corruptedDuplicatesDropped,
        lastIngestionTimestamp: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST`,
        ingestionPipelineStatus: 'Healthy'
      }));
      showToast('Data Ingestion Complete', '14 new block demands normalized and merged into Unified Database.', 'success');
    }, 1200);
  };

  const runAiOptimization = () => {
    setIsOptimizing(true);
    showToast(
      'Running CP-SAT Optimization Engine',
      'Ingesting BDMS, TMS, SMMS, TDMS & COA live streams with multi-objective constraint solving...',
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
        title: 'CP-SAT Multi-Objective Optimization Complete',
        message: 'Synthesized 5 coordinated shadow blocks across Howrah-Bardhaman-Durgapur. 180 min corridor downtime saved.',
        time: 'Just now',
        severity: 'success',
        read: false,
        linkTo: '/approval'
      };
      setNotifications(prev => [newNotif, ...prev]);

      showToast(
        'Optimization Completed',
        'CP-SAT Solver resolved multi-department schedule with 88% overall corridor block utilization.',
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
      aiExplanation: 'EMERGENCY REQUEST FILED: Critical asset condition requires immediate corridor possession or diversion protocol.',
      recommendedBlockWindow: 'Immediate Dispatch / Shadow Window'
    };

    setTasks(prev => [newTask, ...prev]);

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
        kMeansClusters,
        notifications,
        emergencies,
        optimizationMetrics,
        dataSources,
        ingestionStats,
        unifiedRecords,
        resources,
        geoMarkers,
        constraintChecks,
        planningTriggers,
        executionRecords,
        rejectedDecisions,
        planFeedback,
        dynamicEvents,
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
        updateExecutionStatus,
        triggerDynamicEvent,
        replanRejectedBlock,
        submitFeedback,
        triggerDataIngestionSync
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
