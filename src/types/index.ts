export type Department = 'Engineering' | 'S&T' | 'Traction' | 'Control Office' | 'Administrator';

export type Criticality = 'Critical' | 'High' | 'Medium' | 'Low';

export type TaskStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed' | 'Deferred';

export type CorridorSectionState = 'Available' | 'Maintenance Planned' | 'Blocked' | 'Active Maintenance';

export type BlockApprovalStatus = 'Pending Approval' | 'Approved' | 'Rejected' | 'Modified' | 'Completed';

export type ExecutionStatus = 'Scheduled' | 'Block In Progress' | 'Delayed' | 'Completed' | 'Safety Sign-off Done';

export interface UrgencyBreakdown {
  assetCriticality: number; // max 30
  defectSeverity: number;   // max 25
  overdueFactor: number;    // max 20
  anomalyScore: number;     // max 15
  operationalImpact: number;// max 10
}

// 1. DATA SOURCES & INGESTION TYPES
export type SourceSystem = 'BDMS' | 'TMS' | 'SMMS' | 'TDMS' | 'COA';

export interface DataSourceStatus {
  id: SourceSystem;
  name: string;
  fullName: string;
  status: 'Connected' | 'Syncing' | 'Offline';
  dataType: string;
  records: number;
  lastSync: string;
  health: number; // percentage
  description: string;
}

export interface DataIngestionStats {
  recordsReceived: number;
  recordsValidated: number;
  corruptedDuplicatesDropped: number;
  lastIngestionTimestamp: string;
  ingestionPipelineStatus: 'Healthy' | 'Degraded' | 'Syncing';
}

export interface UnifiedDatabaseRecord {
  id: string;
  recordId: string;
  source: SourceSystem;
  department: Department;
  trackSection: string;
  chainageKm: string;
  assetType: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  suggestedBlockDurationMin: number;
  status: 'Ingested' | 'Normalized' | 'Clustered' | 'Scheduled';
  timestamp: string;
}

// 2. RESOURCE ALLOCATION & GEOSPATIAL
export interface ResourceAllocation {
  id: string;
  name: string;
  category: 'Track Machines' | 'Tower Wagons' | 'Workforce Teams' | 'Safety Escorts';
  totalAvailable: number;
  assigned: number;
  utilizationRate: number; // %
  currentBaseDepot: string;
  operationalStatus: 'Ready' | 'In Field' | 'Maintenance';
}

export interface GeoSpatialMarker {
  id: string;
  chainageKm: number;
  locationName: string;
  section: string;
  status: 'Normal' | 'Maintenance Active' | 'Block Scheduled' | 'Anomaly Detected';
  assignedMachines: string[];
  crewsAllocated: number;
  activeBlockWindow?: string;
  coordinates: { xPct: number; yPct: number };
}

// 3. AI & ML TYPES (DBSCAN + K-MEANS)
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
  coordinationStrategy: string;
}

export interface KMeansCluster {
  id: string;
  clusterName: string;
  centroidKm: number;
  kmRange: string;
  tasksCount: number;
  departments: Department[];
  optimalCorridorBlockWindow: string;
  sharedMachineSavingsMin: number;
  description: string;
}

// 4. MULTI-FACTOR DECISION SCORE SYSTEM
export interface CriticalityScoreBreakdown {
  assetImportance: number;       // max 30 (e.g. 30/30)
  networkDependency: number;     // max 25 (e.g. 25/25)
  safetyCriticality: number;     // max 20 (e.g. 20/20)
  failureConsequence: number;    // max 25 (e.g. 17/25)
  totalCriticalityScore: number; // e.g. 92/100
}

export interface UpdatedUrgencyBreakdown {
  domainRuleUrgency: number;   // max 35 (e.g. 30/35)
  anomalySeverity: number;     // max 25 (e.g. 20/25)
  clusterRelevance: number;    // max 20 (e.g. 16/20)
  overdueFactor: number;       // max 20 (e.g. 15/20)
  totalUrgencyScore: number;   // e.g. 81/100
}

export interface AssetAvailabilityImpact {
  currentAvailabilityPct: number;      // e.g. 94%
  postMaintenanceAvailabilityPct: number; // e.g. 98%
  downtimeRequiredMin: number;          // e.g. 120 min
  impactLevel: 'Low' | 'Medium' | 'High';
  availabilityScore: number;           // e.g. 78/100
}

export interface PriorityScore {
  finalPriorityScore: number; // e.g. 85/100
  formulaDescription: string;
  rankBadge: 'P1 - Immediate' | 'P2 - Coordinated Next 24h' | 'P3 - Weekly Window' | 'P4 - Routine';
}

// 5. CONSTRAINT ENGINE & SOLVER
export interface ConstraintCheck {
  id: string;
  ruleName: string;
  category: 'Resource' | 'Safety' | 'Train Schedule' | 'Crew Rest' | 'Power Isolation';
  passed: boolean;
  message: string;
  suggestedAlternative?: string;
}

export interface PlanningTrigger {
  id: string;
  eventType: 'Sudden Rail Fracture' | 'Track Geometry Anomaly' | 'Severe Weather Warning' | 'OHE Voltage Sag';
  timestamp: string;
  section: string;
  actionTaken: string;
  status: 'Resolved' | 'Triggered Re-Plan' | 'Monitoring';
}

// 6. HUMAN-IN-THE-LOOP & EXECUTION
export interface ExecutionRecord {
  blockId: string;
  corridor: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart?: string;
  actualEnd?: string;
  executionStatus: ExecutionStatus;
  authorizedOfficer: string;
  workCompletionPct: number;
  safetySignOffStatus: 'Pending' | 'Verified by S&T & ENG' | 'Overdue';
  notes: string;
}

export interface RejectedDecision {
  id: string;
  blockId: string;
  corridor: string;
  rejectedBy: string;
  rejectionReason: string;
  timestamp: string;
  replanStatus: 'Awaiting Re-Plan' | 'Re-Optimized' | 'Cancelled';
}

export interface PlanFeedback {
  id: string;
  blockId: string;
  submittedBy: string;
  timestamp: string;
  wasTimingAccurate: boolean;
  disruptionLevel: 'None' | 'Minimal' | 'Moderate' | 'Severe';
  notes: string;
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
  sourceSystem: SourceSystem;
  breakdown: UrgencyBreakdown;
  aiExplanation: string;
  recommendedBlockWindow?: string;
  assignedBlockId?: string;
  // Multi-factor scores
  criticalityBreakdown?: CriticalityScoreBreakdown;
  updatedUrgencyBreakdown?: UpdatedUrgencyBreakdown;
  availabilityImpact?: AssetAvailabilityImpact;
  priorityScore?: PriorityScore;
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
  // Extended Architecture Fields
  optimizationEngine?: 'OR-Tools CP-SAT' | 'Genetic Heuristic';
  alternativeBlockWindow?: {
    startTime: string;
    endTime: string;
    reason: string;
  };
  constraintChecks?: ConstraintCheck[];
  executionRecord?: ExecutionRecord;
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

export interface DynamicEventSimulation {
  id: string;
  title: string;
  description: string;
  affectedSection: string;
  suggestedAction: string;
  impactScore: number;
  active: boolean;
}
