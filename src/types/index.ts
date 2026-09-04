export type Department = 'Engineering' | 'S&T' | 'Traction' | 'Control Office' | 'Administrator';

export type Criticality = 'Critical' | 'High' | 'Medium' | 'Low';

export type TaskStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed' | 'Deferred';

export type CorridorSectionState = 'Available' | 'Maintenance Planned' | 'Blocked' | 'Active Maintenance';

export type BlockApprovalStatus = 'Pending Approval' | 'Approved' | 'Rejected' | 'Modified' | 'Completed';

export interface UrgencyBreakdown {
  assetCriticality: number; // max 30
  defectSeverity: number;   // max 25
  overdueFactor: number;    // max 20
  anomalyScore: number;     // max 15
  operationalImpact: number;// max 10
}

export interface MaintenanceTask {
  id: string;
  assetId: string;
  department: Department;
  location: string;
  defect: string;
  criticality: Criticality;
  dueDate: string;
  durationMin: number;
  aiUrgencyScore: number; // 0 - 100
  status: TaskStatus;
  sourceSystem: 'TMS' | 'SMMS' | 'TDMS';
  breakdown: UrgencyBreakdown;
  aiExplanation: string;
  recommendedBlockWindow?: string;
  assignedBlockId?: string;
}

export interface CorridorSection {
  id: string;
  name: string;
  from: string;
  to: string;
  kmStart: number;
  kmEnd: number;
  status: CorridorSectionState;
  nextAvailableWindow: string;
  activeTrains: number;
  plannedMaintenance: number;
  blockDurationMin: number;
  speedRestrictionKmph?: number;
  notes: string;
}

export interface TrainConflict {
  trainNumber: string;
  trainName: string;
  trainType: 'Express / Mail' | 'Vande Bharat / Premium' | 'Suburban EMU' | 'Freight / Goods';
  scheduledTime: string;
  impactLevel: 'Low' | 'Medium' | 'High';
  mitigationAction: string;
}

export interface BlockPlan {
  id: string;
  corridor: string;
  sectionId: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMin: number;
  departments: Department[];
  tasksCount: number;
  taskIds: string[];
  aiConfidence: number; // %
  blockUtilization: number; // %
  estimatedAssetDowntimeMin: number;
  trainImpact: 'Low' | 'Medium' | 'High';
  safetyValidation: 'PASSED' | 'REVIEW_NEEDED';
  ruleValidation: 'PASSED' | 'WARNING';
  status: BlockApprovalStatus;
  isIntegrated: boolean;
  aiReasoning: {
    summary: string;
    coordinationRationale: string;
    savingsAnalysis: string;
  };
  validationRules: {
    name: string;
    description: string;
    passed: boolean;
  }[];
  trainConflicts: TrainConflict[];
  history: {
    timestamp: string;
    actor: string;
    action: string;
    notes?: string;
  }[];
}

export interface AnomalyItem {
  id: string;
  assetId: string;
  department: Department;
  location: string;
  defectCount30d: number;
  anomalyScore: number; // e.g. 0.91
  reason: string;
  riskFactor: 'Severe' | 'Elevated' | 'Moderate';
  lastInspected: string;
}

export interface DBSCANCluster {
  id: string;
  clusterName: string;
  departments: Department[];
  kmRange: string;
  tasksCount: number;
  potentialCombinedBlock: boolean;
  densityScore: number;
  estimatedWindowMin: number;
  syncedSavingsDowntimeMin: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  read: boolean;
  linkTo?: string;
}

export interface EmergencyRequest {
  id: string;
  assetId: string;
  department: Department;
  location: string;
  defectType: string;
  severity: Criticality;
  description: string;
  estimatedDurationMin: number;
  submittedAt: string;
  submittedBy: string;
  status: 'Queued for AI Re-planning' | 'Integrated into Block' | 'Dispatched';
}

export interface OptimizationMetrics {
  beforeSeparateBlocks: number;
  beforeTotalDowntimeMin: number;
  beforeUtilizationPct: number;
  afterSeparateBlocks: number;
  afterTotalDowntimeMin: number;
  afterUtilizationPct: number;
  downtimeReductionPct: number;
  utilizationIncreasePct: number;
  blocksReductionPct: number;
  lastRunTimestamp: string;
}
