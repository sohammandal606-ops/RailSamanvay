import {
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
  DynamicEventSimulation
} from '../types';

export const INITIAL_CORRIDOR_SECTIONS: CorridorSection[] = [
  {
    id: 'SEC-HWH-BWN',
    name: 'Howrah – Bardhaman Chord / Main',
    from: 'HOWRAH (HWH)',
    to: 'BARDHAMAN (BWN)',
    kmStart: 0,
    kmEnd: 95,
    status: 'Maintenance Planned',
    nextAvailableWindow: 'Today 10:00 – 12:00 IST',
    activeTrains: 6,
    plannedMaintenance: 3,
    blockDurationMin: 120,
    speedRestrictionKmph: 75,
    notes: 'Heavy suburban traffic; high-density quadruple line with coordinated power block scheduled.'
  },
  {
    id: 'SEC-BWN-DGR',
    name: 'Bardhaman – Durgapur Section',
    from: 'BARDHAMAN (BWN)',
    to: 'DURGAPUR (DGR)',
    kmStart: 95,
    kmEnd: 158,
    status: 'Active Maintenance',
    nextAvailableWindow: 'Today 14:30 – 16:30 IST',
    activeTrains: 3,
    plannedMaintenance: 4,
    blockDurationMin: 90,
    speedRestrictionKmph: 45,
    notes: 'Joint track renewal and OHE contact wire adjustment underway between KM 141 and KM 145.'
  },
  {
    id: 'SEC-DGR-ASN',
    name: 'Durgapur – Asansol Industrial Line',
    from: 'DURGAPUR (DGR)',
    to: 'ASANSOL (ASN)',
    kmStart: 158,
    kmEnd: 200,
    status: 'Available',
    nextAvailableWindow: 'Today 22:00 – 02:00 IST (Night Window)',
    activeTrains: 8,
    plannedMaintenance: 1,
    blockDurationMin: 0,
    speedRestrictionKmph: 110,
    notes: 'High freight traffic feeding Raniganj coalfields and IISCO steel plant; clear for operations.'
  },
  {
    id: 'SEC-ASN-DHN',
    name: 'Asansol – Dhanbad Grand Chord',
    from: 'ASANSOL (ASN)',
    to: 'DHANBAD (DHN)',
    kmStart: 200,
    kmEnd: 260,
    status: 'Blocked',
    nextAvailableWindow: 'Tomorrow 08:00 – 10:00 IST',
    activeTrains: 2,
    plannedMaintenance: 2,
    blockDurationMin: 180,
    speedRestrictionKmph: 30,
    notes: 'Urgent point-machine replacement and turnout packing at KM 218/4.'
  }
];

export const INITIAL_TASKS: MaintenanceTask[] = [
  {
    id: 'ENG-1042',
    assetId: 'TRK-7821',
    department: 'Engineering',
    location: 'KM 142/6 (BWN-DGR)',
    defect: 'Rail tongue wear & gauge variation (>4mm)',
    criticality: 'Critical',
    dueDate: '12 Sep 2026',
    durationMin: 90,
    aiUrgencyScore: 94,
    status: 'Pending',
    sourceSystem: 'TMS',
    breakdown: {
      assetCriticality: 30,
      defectSeverity: 25,
      overdueFactor: 18,
      anomalyScore: 12,
      operationalImpact: 9,
    },
    aiExplanation: 'High urgency is primarily due to critical asset classification on a 130 kmph mainline section, severe defect condition, and overdue ultrasonic rail testing (USFD) confirmation.',
    recommendedBlockWindow: '10:00 – 12:00 (Integrated Window)',
    criticalityBreakdown: {
      assetImportance: 30,
      networkDependency: 25,
      safetyCriticality: 20,
      failureConsequence: 17,
      totalCriticalityScore: 92
    },
    updatedUrgencyBreakdown: {
      domainRuleUrgency: 30,
      anomalySeverity: 20,
      clusterRelevance: 16,
      overdueFactor: 15,
      totalUrgencyScore: 81
    },
    availabilityImpact: {
      currentAvailabilityPct: 94,
      postMaintenanceAvailabilityPct: 98,
      downtimeRequiredMin: 120,
      impactLevel: 'High',
      availabilityScore: 78
    },
    priorityScore: {
      finalPriorityScore: 85,
      formulaDescription: 'Weighted Multi-Objective: Criticality (35%) + Urgency (35%) + Availability Impact (30%)',
      rankBadge: 'P1 - Immediate'
    }
  },
  {
    id: 'SIG-2041',
    assetId: 'SIG-331',
    department: 'S&T',
    location: 'KM 145/2 (BWN-DGR)',
    defect: 'Signal relay abnormality & track circuit drop',
    criticality: 'High',
    dueDate: '14 Sep 2026',
    durationMin: 60,
    aiUrgencyScore: 87,
    status: 'Pending',
    sourceSystem: 'SMMS',
    breakdown: {
      assetCriticality: 28,
      defectSeverity: 22,
      overdueFactor: 16,
      anomalyScore: 12,
      operationalImpact: 9,
    },
    aiExplanation: 'Potential false occupancy alarm risk causing signal failures in automatic block territory; S&T team needs 60 minutes for joint electronic interlocking check.',
    recommendedBlockWindow: '10:00 – 12:00 (Integrated Window)'
  },
  {
    id: 'TRA-3022',
    assetId: 'OHE-112',
    department: 'Traction',
    location: 'KM 141/8 (BWN-DGR)',
    defect: 'OHE contact wire stagger & dropper inspection overdue',
    criticality: 'Medium',
    dueDate: '18 Sep 2026',
    durationMin: 45,
    aiUrgencyScore: 71,
    status: 'Pending',
    sourceSystem: 'TDMS',
    breakdown: {
      assetCriticality: 24,
      defectSeverity: 18,
      overdueFactor: 14,
      anomalyScore: 9,
      operationalImpact: 6,
    },
    aiExplanation: 'Located within 1 km of Track Maintenance ENG-1042. AI recommendation combines this with ENG-1042 into an integrated power block to avoid a duplicate shutdown tomorrow.',
    recommendedBlockWindow: '10:00 – 12:00 (Integrated Window)'
  },
  {
    id: 'ENG-1088',
    assetId: 'TRK-4921',
    department: 'Engineering',
    location: 'KM 144/1 (BWN-DGR)',
    defect: 'Sleeper renewal and ballast tamping required',
    criticality: 'High',
    dueDate: '13 Sep 2026',
    durationMin: 75,
    aiUrgencyScore: 84,
    status: 'Pending',
    sourceSystem: 'TMS',
    breakdown: {
      assetCriticality: 26,
      defectSeverity: 21,
      overdueFactor: 17,
      anomalyScore: 11,
      operationalImpact: 9,
    },
    aiExplanation: 'Track quality index (TQI) degraded past caution threshold. Machine tamping can be synchronized during traction power cutoff.',
    recommendedBlockWindow: '10:00 – 12:00 (Integrated Window)'
  },
  {
    id: 'SIG-2099',
    assetId: 'SIG-452',
    department: 'S&T',
    location: 'KM 82/4 (HWH-BWN)',
    defect: 'Axle counter sensor calibration drift',
    criticality: 'Medium',
    dueDate: '16 Sep 2026',
    durationMin: 40,
    aiUrgencyScore: 68,
    status: 'Scheduled',
    sourceSystem: 'SMMS',
    breakdown: {
      assetCriticality: 22,
      defectSeverity: 16,
      overdueFactor: 14,
      anomalyScore: 8,
      operationalImpact: 8,
    },
    aiExplanation: 'Intermittent signal flicker recorded in COA log during heavy evening EMU peak.',
    recommendedBlockWindow: 'Tomorrow 02:00 – 03:00'
  },
  {
    id: 'TRA-3081',
    assetId: 'OHE-221',
    department: 'Traction',
    location: 'KM 218/4 (ASN-DHN)',
    defect: 'Cantilever insulator flashover risk / carbon soot',
    criticality: 'Critical',
    dueDate: '11 Sep 2026',
    durationMin: 60,
    aiUrgencyScore: 92,
    status: 'Pending',
    sourceSystem: 'TDMS',
    breakdown: {
      assetCriticality: 29,
      defectSeverity: 24,
      overdueFactor: 19,
      anomalyScore: 12,
      operationalImpact: 8,
    },
    aiExplanation: 'Imminent traction tripping risk under coal dust pollution. Emergency power block recommended before monsoon thunderstorm cycle.',
    recommendedBlockWindow: 'Tomorrow 08:00 – 10:00'
  },
  {
    id: 'ENG-1102',
    assetId: 'TRK-9014',
    department: 'Engineering',
    location: 'KM 12/2 (HWH-BWN)',
    defect: 'Weld collar micro-fissure detected during USFD run',
    criticality: 'High',
    dueDate: '15 Sep 2026',
    durationMin: 50,
    aiUrgencyScore: 81,
    status: 'Pending',
    sourceSystem: 'TMS',
    breakdown: {
      assetCriticality: 25,
      defectSeverity: 20,
      overdueFactor: 16,
      anomalyScore: 11,
      operationalImpact: 9,
    },
    aiExplanation: 'High traffic density near Howrah yard approaches requires immediate clamp fitment or AT weld replacement during non-peak hours.'
  },
  {
    id: 'SIG-2144',
    assetId: 'SIG-887',
    department: 'S&T',
    location: 'KM 189/6 (DGR-ASN)',
    defect: 'Point machine 114B overload current during throw',
    criticality: 'Low',
    dueDate: '22 Sep 2026',
    durationMin: 30,
    aiUrgencyScore: 49,
    status: 'Scheduled',
    sourceSystem: 'SMMS',
    breakdown: {
      assetCriticality: 15,
      defectSeverity: 12,
      overdueFactor: 10,
      anomalyScore: 6,
      operationalImpact: 6,
    },
    aiExplanation: 'Routine lubrication and motor gear check; low risk of failure before next cycle.'
  }
];

export const INITIAL_BLOCK_PLANS: BlockPlan[] = [
  {
    id: 'BLK-2026-0912-004',
    corridor: 'Howrah – Bardhaman – Durgapur (KM 140–146)',
    sectionId: 'SEC-BWN-DGR',
    date: '12 September 2026',
    startTime: '10:00',
    endTime: '12:00',
    durationMin: 120,
    departments: ['Engineering', 'S&T', 'Traction'],
    tasksCount: 7,
    taskIds: ['ENG-1042', 'SIG-2041', 'TRA-3022', 'ENG-1088'],
    aiConfidence: 92,
    blockUtilization: 89,
    estimatedAssetDowntimeMin: 120,
    trainImpact: 'Low',
    safetyValidation: 'PASSED',
    ruleValidation: 'PASSED',
    status: 'Pending Approval',
    isIntegrated: true,
    aiReasoning: {
      summary: 'Combined 3 separate department requests into a single unified 120-minute shadow window between scheduled EMU slots.',
      coordinationRationale: 'Track renewal (TMS) and OHE inspection (TDMS) share the same physical section KM 141-145, allowing simultaneous line and power cutoff without multiplying downtime.',
      savingsAnalysis: 'Saves 180 minutes of total corridor downtime and eliminates 2 redundant speed restriction cycles.'
    },
    validationRules: [
      { name: 'Block Duration Valid', description: 'Proposed 120 min duration is sufficient for maximum single task (ENG-1042: 90 min) plus 30 min safety buffer.', passed: true },
      { name: 'No Premium Timetable Conflict', description: 'Vande Bharat Ex (22301) and Rajdhani Ex (12301) pass clear before 09:40 and after 12:45.', passed: true },
      { name: 'Multi-Department Coordination', description: 'Engineering, S&T, and Traction division officers assigned to joint site supervision.', passed: true },
      { name: 'Required Power Isolation Verified', description: 'Traction feeder substation 25kV OHE isolation plan mapped and confirmed via TDMS.', passed: true },
      { name: 'Safety Buffer Constraints Satisfied', description: 'Minimum 15-minute operational buffer preserved before next Up freight path.', passed: true },
    ],
    trainConflicts: [
      {
        trainNumber: '13029',
        trainName: 'HWH-MKA Doon Express',
        trainType: 'Express / Mail',
        scheduledTime: '10:45 IST',
        impactLevel: 'Low',
        mitigationAction: 'Regulated via 3rd line / Chord route with 6 min permissible slack.'
      },
      {
        trainNumber: '37824',
        trainName: 'Bardhaman - Howrah Local (EMU)',
        trainType: 'Suburban EMU',
        scheduledTime: '11:15 IST',
        impactLevel: 'Low',
        mitigationAction: 'Diverted via Main Line; passengers notified via Passenger Information System (PIS).'
      },
      {
        trainNumber: 'BTPN-401',
        trainName: 'IOCL POL Petroleum Rake',
        trainType: 'Freight / Goods',
        scheduledTime: '11:30 IST',
        impactLevel: 'Low',
        mitigationAction: 'Held at Bardhaman goods siding loop for 25 min; zero passenger penalty.'
      }
    ],
    history: [
      { timestamp: '09:15 AM', actor: 'RailSamanvay AI Engine v2.4', action: 'Multi-Source DBSCAN Block Generated' },
      { timestamp: '09:22 AM', actor: 'Chief Block Planner (Control Office)', action: 'Preliminary Safety Review Completed' },
      { timestamp: '09:30 AM', actor: 'System Verification', action: 'Rule Engine Validation: 5/5 PASSED' },
      { timestamp: '09:45 AM', actor: 'Operating Dept Queue', action: 'Status set to: Awaiting Human Authorization' },
    ],
    optimizationEngine: 'OR-Tools CP-SAT',
    alternativeBlockWindow: {
      startTime: '14:00',
      endTime: '16:00',
      reason: 'Alternative conflict-free slot with zero freight crossings and 100% OHE power isolation alignment'
    }
  },
  {
    id: 'BLK-2026-0913-002',
    corridor: 'Durgapur – Asansol (KM 188–194)',
    sectionId: 'SEC-DGR-ASN',
    date: '13 September 2026',
    startTime: '13:00',
    endTime: '14:30',
    durationMin: 90,
    departments: ['Engineering', 'S&T'],
    tasksCount: 3,
    taskIds: ['SIG-2144', 'ENG-1102'],
    aiConfidence: 88,
    blockUtilization: 82,
    estimatedAssetDowntimeMin: 90,
    trainImpact: 'Low',
    safetyValidation: 'PASSED',
    ruleValidation: 'PASSED',
    status: 'Approved',
    isIntegrated: true,
    aiReasoning: {
      summary: 'Turnout maintenance and track testing integrated during scheduled freight consolidation gap.',
      coordinationRationale: 'Combines point machine calibration with ultrasonic rail inspection.',
      savingsAnalysis: 'Reduces separate track possession from 150 min to 90 min.'
    },
    validationRules: [
      { name: 'Block Duration Valid', description: '90 min window matches combined task profile.', passed: true },
      { name: 'No Timetable Conflict', description: 'No mail/express services scheduled in this slot.', passed: true },
      { name: 'Safety Constraints Satisfied', description: 'Caution order of 30 kmph pre-programmed into TMS.', passed: true }
    ],
    trainConflicts: [
      {
        trainNumber: 'BOXN-882',
        trainName: 'Coal Empty Freight Rake',
        trainType: 'Freight / Goods',
        scheduledTime: '13:40 IST',
        impactLevel: 'Low',
        mitigationAction: 'Re-routed via Andal bypass line without detention.'
      }
    ],
    history: [
      { timestamp: 'Yesterday 16:10', actor: 'RailSamanvay AI Engine', action: 'Block Recommended' },
      { timestamp: 'Yesterday 17:30', actor: 'Sr. DOM / Divisional Operations Manager', action: 'Approved with full safety clearance' }
    ]
  },
  {
    id: 'BLK-2026-0914-001',
    corridor: 'Asansol – Dhanbad Grand Chord (KM 216–222)',
    sectionId: 'SEC-ASN-DHN',
    date: '14 September 2026',
    startTime: '08:00',
    endTime: '10:30',
    durationMin: 150,
    departments: ['Traction', 'Engineering'],
    tasksCount: 4,
    taskIds: ['TRA-3081'],
    aiConfidence: 94,
    blockUtilization: 91,
    estimatedAssetDowntimeMin: 150,
    trainImpact: 'Medium',
    safetyValidation: 'PASSED',
    ruleValidation: 'PASSED',
    status: 'Pending Approval',
    isIntegrated: true,
    aiReasoning: {
      summary: 'Critical OHE insulator replacement coordinated with turnout overhaul at KM 218.',
      coordinationRationale: 'Requires 25kV power cut; Engineering will execute machine packing simultaneously under OHE shadow.',
      savingsAnalysis: 'Avoids a second 2.5-hour corridor closure later in the week.'
    },
    validationRules: [
      { name: 'Safety Isolation Approved', description: 'Sectioning post SP-4 and feeding post FP-2 lock-out/tag-out mapped.', passed: true },
      { name: 'Timetable Impact Mitigated', description: 'Freight regulation notice published 48h in advance.', passed: true }
    ],
    trainConflicts: [
      {
        trainNumber: '12313',
        trainName: 'Sealdah - New Delhi Rajdhani Express',
        trainType: 'Vande Bharat / Premium',
        scheduledTime: '07:25 IST (Cleared before block)',
        impactLevel: 'Low',
        mitigationAction: 'Section fully handed back 35 min prior to Rajdhani path.'
      }
    ],
    history: [
      { timestamp: '08:00 AM Today', actor: 'RailSamanvay AI Engine', action: 'Cluster Identified' },
      { timestamp: '08:45 AM Today', actor: 'Traction Power Controller (TPC)', action: 'Safety Isolation Plan Verified' }
    ]
  }
];

export const INITIAL_ANOMALIES: AnomalyItem[] = [
  {
    id: 'ANOM-01',
    assetId: 'TRK-7821',
    department: 'Engineering',
    location: 'KM 142/6 (BWN-DGR)',
    defectCount30d: 7,
    anomalyScore: 0.91,
    reason: 'Unusual 280% spike in track geometry gauge defect frequency during the last 30 days under heavy monsoon axle loads.',
    riskFactor: 'Severe',
    lastInspected: '02 Sep 2026'
  },
  {
    id: 'ANOM-02',
    assetId: 'SIG-331',
    department: 'S&T',
    location: 'KM 145/2 (BWN-DGR)',
    defectCount30d: 5,
    anomalyScore: 0.84,
    reason: 'Frequent transient track circuit drops (12 events) correlated with heavy rainfall and ballast resistance degradation.',
    riskFactor: 'Severe',
    lastInspected: '01 Sep 2026'
  },
  {
    id: 'ANOM-03',
    assetId: 'OHE-221',
    department: 'Traction',
    location: 'KM 218/4 (ASN-DHN)',
    defectCount30d: 4,
    anomalyScore: 0.79,
    reason: 'Infrared thermography detected temperature delta of +28°C on contact wire jumper clamp.',
    riskFactor: 'Elevated',
    lastInspected: '28 Aug 2026'
  },
  {
    id: 'ANOM-04',
    assetId: 'TRK-4921',
    department: 'Engineering',
    location: 'KM 144/1 (BWN-DGR)',
    defectCount30d: 3,
    anomalyScore: 0.74,
    reason: 'Accelerated track settlement index observed on approach span to bridge No. 42.',
    riskFactor: 'Elevated',
    lastInspected: '30 Aug 2026'
  }
];

export const INITIAL_CLUSTERS: DBSCANCluster[] = [
  {
    id: 'CLUST-01',
    clusterName: 'Cluster 1: KM 140–146 Triple Coordinated Zone',
    departments: ['Engineering', 'S&T', 'Traction'],
    kmRange: 'KM 140.0 – KM 145.8',
    tasksCount: 7,
    potentialCombinedBlock: true,
    densityScore: 0.94,
    estimatedWindowMin: 120,
    syncedSavingsDowntimeMin: 180,
    coordinationStrategy: 'Simultaneous OHE 25kV de-energization and dual-line tamping during EMU midday slack window'
  },
  {
    id: 'CLUST-02',
    clusterName: 'Cluster 2: KM 216–220 Asansol Yard & Chord',
    departments: ['Traction', 'Engineering'],
    kmRange: 'KM 216.5 – KM 221.2',
    tasksCount: 4,
    potentialCombinedBlock: true,
    densityScore: 0.88,
    estimatedWindowMin: 150,
    syncedSavingsDowntimeMin: 120,
    coordinationStrategy: 'Turnout point motor renewal coordinated with catenary replacement under common yard block'
  },
  {
    id: 'CLUST-03',
    clusterName: 'Cluster 3: KM 80–84 Bardhaman Outer Approvals',
    departments: ['Engineering', 'S&T'],
    kmRange: 'KM 80.2 – KM 84.6',
    tasksCount: 3,
    potentialCombinedBlock: true,
    densityScore: 0.81,
    estimatedWindowMin: 90,
    syncedSavingsDowntimeMin: 75,
    coordinationStrategy: 'Axle counter sensor calibration synchronized with USFD ultrasonic flaw scanning'
  },
  {
    id: 'CLUST-04',
    clusterName: 'Cluster 4: KM 202–208 Asansol – Sitarampur Chord',
    departments: ['Engineering', 'S&T', 'Traction'],
    kmRange: 'KM 202.4 – KM 208.1',
    tasksCount: 5,
    potentialCombinedBlock: true,
    densityScore: 0.91,
    estimatedWindowMin: 90,
    syncedSavingsDowntimeMin: 110,
    coordinationStrategy: 'Combined ballast screening (BCM-12) and signal cable trenching across quad line'
  }
];

// 1. DATA SOURCES STATUS
export const INITIAL_DATA_SOURCES: DataSourceStatus[] = [
  {
    id: 'BDMS',
    name: 'BDMS',
    fullName: 'Block Demand Management System',
    status: 'Connected',
    dataType: 'Block Requests & Division Demands',
    records: 142,
    lastSync: '3 mins ago',
    health: 99.4,
    description: 'Centralized portal for departmental traffic block requisitions across Asansol & Howrah divisions.'
  },
  {
    id: 'TMS',
    name: 'TMS',
    fullName: 'Track Management System',
    status: 'Connected',
    dataType: 'Track Defects, USFD & Geometry',
    records: 486,
    lastSync: '1 min ago',
    health: 98.9,
    description: 'Permanent Way condition monitoring, ultrasonic flaw detections, OMS rail acceleration peaks.'
  },
  {
    id: 'SMMS',
    name: 'SMMS',
    fullName: 'Signal Maintenance Management System',
    status: 'Connected',
    dataType: 'Interlocking, Point Machines & Signals',
    records: 238,
    lastSync: '4 mins ago',
    health: 97.8,
    description: 'Electronic Interlocking telemetry, track circuit health, and point machine load signatures.'
  },
  {
    id: 'TDMS',
    name: 'TDMS',
    fullName: 'Traction Distribution Management System',
    status: 'Connected',
    dataType: 'OHE Catenary & Substation Isolation',
    records: 194,
    lastSync: '2 mins ago',
    health: 99.1,
    description: '25kV Overhead Equipment wire wear, insulator test logs, and feeding post switching schedules.'
  },
  {
    id: 'COA',
    name: 'COA',
    fullName: 'Control Office Application',
    status: 'Connected',
    dataType: 'Live Train Paths & Timetable Headway',
    records: 220,
    lastSync: 'Live (WebSocket)',
    health: 100.0,
    description: 'Real-time train positioning, section occupancy times, slack margins, and rake paths.'
  }
];

// 2. DATA INGESTION STATS
export const INITIAL_INGESTION_STATS: DataIngestionStats = {
  recordsReceived: 1280,
  recordsValidated: 1248,
  corruptedDuplicatesDropped: 32,
  lastIngestionTimestamp: 'Today at 09:35:12 IST',
  ingestionPipelineStatus: 'Healthy'
};

// 3. UNIFIED DATABASE RECORDS
export const INITIAL_UNIFIED_RECORDS: UnifiedDatabaseRecord[] = [
  {
    id: 'UDB-001',
    recordId: 'REQ-BDMS-891',
    source: 'BDMS',
    department: 'Engineering',
    trackSection: 'Bardhaman – Durgapur',
    chainageKm: 'KM 142.6',
    assetType: 'Switch Expansion Joint (SEJ)',
    urgency: 'Critical',
    suggestedBlockDurationMin: 90,
    status: 'Clustered',
    timestamp: '09:20 IST'
  },
  {
    id: 'UDB-002',
    recordId: 'TMS-DF-4401',
    source: 'TMS',
    department: 'Engineering',
    trackSection: 'Bardhaman – Durgapur',
    chainageKm: 'KM 144.1',
    assetType: 'Prestressed Concrete Sleeper Bed',
    urgency: 'High',
    suggestedBlockDurationMin: 75,
    status: 'Scheduled',
    timestamp: '09:18 IST'
  },
  {
    id: 'UDB-003',
    recordId: 'SMMS-ALM-102',
    source: 'SMMS',
    department: 'S&T',
    trackSection: 'Bardhaman – Durgapur',
    chainageKm: 'KM 145.2',
    assetType: 'Point Machine 42A Motor Relay',
    urgency: 'High',
    suggestedBlockDurationMin: 60,
    status: 'Clustered',
    timestamp: '09:15 IST'
  },
  {
    id: 'UDB-004',
    recordId: 'TDMS-OHE-771',
    source: 'TDMS',
    department: 'Traction',
    trackSection: 'Bardhaman – Durgapur',
    chainageKm: 'KM 141.8',
    assetType: '25kV Contact Wire Dropper #18',
    urgency: 'Medium',
    suggestedBlockDurationMin: 45,
    status: 'Clustered',
    timestamp: '09:12 IST'
  },
  {
    id: 'UDB-005',
    recordId: 'COA-TRN-12301',
    source: 'COA',
    department: 'Control Office',
    trackSection: 'Howrah – Bardhaman',
    chainageKm: 'KM 62.0',
    assetType: 'Rajdhani Priority Path Corridor',
    urgency: 'Critical',
    suggestedBlockDurationMin: 0,
    status: 'Normalized',
    timestamp: 'Live'
  },
  {
    id: 'UDB-006',
    recordId: 'REQ-BDMS-904',
    source: 'BDMS',
    department: 'Traction',
    trackSection: 'Asansol – Dhanbad',
    chainageKm: 'KM 218.4',
    assetType: 'Traction Substation Feeder Bay',
    urgency: 'Critical',
    suggestedBlockDurationMin: 150,
    status: 'Scheduled',
    timestamp: '08:50 IST'
  },
  {
    id: 'UDB-007',
    recordId: 'TMS-USFD-982',
    source: 'TMS',
    department: 'Engineering',
    trackSection: 'Asansol – Dhanbad',
    chainageKm: 'KM 220.1',
    assetType: 'Weld Joint Ultrasonic Flaw Echo',
    urgency: 'High',
    suggestedBlockDurationMin: 60,
    status: 'Normalized',
    timestamp: '08:44 IST'
  },
  {
    id: 'UDB-008',
    recordId: 'SMMS-SIG-559',
    source: 'SMMS',
    department: 'S&T',
    trackSection: 'Howrah – Bardhaman',
    chainageKm: 'KM 81.3',
    assetType: 'Digital Axle Counter (DAC) Head',
    urgency: 'Medium',
    suggestedBlockDurationMin: 45,
    status: 'Ingested',
    timestamp: '08:30 IST'
  }
];

// 4. RESOURCE ALLOCATION POOL
export const INITIAL_RESOURCES: ResourceAllocation[] = [
  {
    id: 'RES-TM-01',
    name: 'Ballast Cleaning Machine (BCM-08)',
    category: 'Track Machines',
    totalAvailable: 4,
    assigned: 3,
    utilizationRate: 75,
    currentBaseDepot: 'Bardhaman Machine Siding',
    operationalStatus: 'Ready'
  },
  {
    id: 'RES-TM-02',
    name: 'Continuous Tamping Machine (CSM-42)',
    category: 'Track Machines',
    totalAvailable: 6,
    assigned: 5,
    utilizationRate: 83,
    currentBaseDepot: 'Panagarh Maintenance Depot',
    operationalStatus: 'In Field'
  },
  {
    id: 'RES-TM-03',
    name: 'Duomatic Tamping Express (DUO-14)',
    category: 'Track Machines',
    totalAvailable: 3,
    assigned: 2,
    utilizationRate: 67,
    currentBaseDepot: 'Asansol Marshalling Yard',
    operationalStatus: 'Ready'
  },
  {
    id: 'RES-TW-01',
    name: '8-Wheeler High-Speed Tower Wagon (TW-8W-03)',
    category: 'Tower Wagons',
    totalAvailable: 5,
    assigned: 4,
    utilizationRate: 80,
    currentBaseDepot: 'Durgapur Traction Depot',
    operationalStatus: 'Ready'
  },
  {
    id: 'RES-TW-02',
    name: '4-Wheeler Quick Response Tower Wagon (TW-4W-11)',
    category: 'Tower Wagons',
    totalAvailable: 4,
    assigned: 3,
    utilizationRate: 75,
    currentBaseDepot: 'Sitarampur Traction Base',
    operationalStatus: 'In Field'
  },
  {
    id: 'RES-WF-01',
    name: 'P-Way Gang 04 (Track Renewal Team)',
    category: 'Workforce Teams',
    totalAvailable: 12,
    assigned: 10,
    utilizationRate: 83,
    currentBaseDepot: 'Mankar Permanent Way Office',
    operationalStatus: 'In Field'
  },
  {
    id: 'RES-WF-02',
    name: 'S&T Interlocking Mobile Unit (SI-02)',
    category: 'Workforce Teams',
    totalAvailable: 8,
    assigned: 6,
    utilizationRate: 75,
    currentBaseDepot: 'Bardhaman Signal Lab',
    operationalStatus: 'Ready'
  },
  {
    id: 'RES-SE-01',
    name: 'Certified Railway Safety Escort & Flagmen Unit',
    category: 'Safety Escorts',
    totalAvailable: 16,
    assigned: 14,
    utilizationRate: 88,
    currentBaseDepot: 'Howrah Operating Control',
    operationalStatus: 'Ready'
  }
];

// 5. GEOSPATIAL CORRIDOR CHAINAGE MARKERS (Howrah -> Durgapur)
export const INITIAL_GEOSPATIAL_MARKERS: GeoSpatialMarker[] = [
  {
    id: 'GEO-01',
    chainageKm: 0,
    locationName: 'Howrah Junction (HWH)',
    section: 'Howrah Terminal',
    status: 'Normal',
    assignedMachines: ['TW-4W-01'],
    crewsAllocated: 6,
    coordinates: { xPct: 5, yPct: 48 }
  },
  {
    id: 'GEO-02',
    chainageKm: 42,
    locationName: 'Bandel Outer Chord (BDC)',
    section: 'Howrah – Bardhaman',
    status: 'Normal',
    assignedMachines: ['CSM-12'],
    crewsAllocated: 8,
    coordinates: { xPct: 22, yPct: 46 }
  },
  {
    id: 'GEO-03',
    chainageKm: 95,
    locationName: 'Bardhaman Junction (BWN)',
    section: 'Bardhaman Node',
    status: 'Block Scheduled',
    assignedMachines: ['BCM-08', 'TW-8W-03'],
    crewsAllocated: 18,
    activeBlockWindow: 'Tomorrow 01:00 – 04:00',
    coordinates: { xPct: 44, yPct: 52 }
  },
  {
    id: 'GEO-04',
    chainageKm: 130,
    locationName: 'Mankar Station (MNAE)',
    section: 'Bardhaman – Durgapur',
    status: 'Normal',
    assignedMachines: ['DUO-14'],
    crewsAllocated: 6,
    coordinates: { xPct: 60, yPct: 45 }
  },
  {
    id: 'GEO-05',
    chainageKm: 142.6,
    locationName: 'Panagarh – Rajbandh (KM 142.6)',
    section: 'Bardhaman – Durgapur',
    status: 'Maintenance Active',
    assignedMachines: ['CSM-42', 'TW-8W-03', 'P-Way Gang 04'],
    crewsAllocated: 24,
    activeBlockWindow: 'Active: 10:00 – 12:00 IST',
    coordinates: { xPct: 72, yPct: 40 }
  },
  {
    id: 'GEO-06',
    chainageKm: 158,
    locationName: 'Durgapur Industrial Complex (DGR)',
    section: 'Durgapur Terminal Area',
    status: 'Normal',
    assignedMachines: ['TW-4W-11'],
    crewsAllocated: 12,
    coordinates: { xPct: 88, yPct: 48 }
  },
  {
    id: 'GEO-07',
    chainageKm: 178,
    locationName: 'Andal Marshalling Yard (UDL)',
    section: 'Durgapur – Asansol',
    status: 'Anomaly Detected',
    assignedMachines: ['BCM-04'],
    crewsAllocated: 10,
    coordinates: { xPct: 95, yPct: 55 }
  }
];

// 6. K-MEANS CENTROID-BASED CLUSTERS
export const INITIAL_KMEANS_CLUSTERS: KMeansCluster[] = [
  {
    id: 'KM-CLUST-01',
    clusterName: 'Zone A: Suburban Core (Howrah – Bandel)',
    centroidKm: 34.5,
    kmRange: 'KM 0.0 – KM 68.0',
    tasksCount: 6,
    departments: ['Engineering', 'S&T'],
    optimalCorridorBlockWindow: 'Night Window: 00:30 – 03:30 (Post-EMU cessation)',
    sharedMachineSavingsMin: 140,
    description: 'High commuter density centroid; machine staging optimized at Liluah yard to avoid suburban peak block restrictions.'
  },
  {
    id: 'KM-CLUST-02',
    clusterName: 'Zone B: Mid-Corridor Mainline (Memari – Bardhaman)',
    centroidKm: 88.2,
    kmRange: 'KM 70.0 – KM 115.0',
    tasksCount: 8,
    departments: ['Engineering', 'S&T', 'Traction'],
    optimalCorridorBlockWindow: 'Midday Slot: 11:30 – 13:45 (Shadowed behind Down Express)',
    sharedMachineSavingsMin: 165,
    description: 'Quadruple line centroid allowing traffic diversion to reverse lines while tamping and OHE tensioning run in parallel.'
  },
  {
    id: 'KM-CLUST-03',
    clusterName: 'Zone C: High-Speed Test Section (Panagarh – Durgapur)',
    centroidKm: 144.0,
    kmRange: 'KM 125.0 – KM 165.0',
    tasksCount: 9,
    departments: ['Engineering', 'Traction'],
    optimalCorridorBlockWindow: 'Standard Integrated Slot: 10:00 – 12:00 or 14:00 – 16:00',
    sharedMachineSavingsMin: 195,
    description: '130 kmph high-speed stretch with urgent tongue wear and OHE contact wire adjustments sharing common track possession.'
  },
  {
    id: 'KM-CLUST-04',
    clusterName: 'Zone D: Industrial Heavy Haul (Durgapur – Asansol)',
    centroidKm: 184.6,
    kmRange: 'KM 166.0 – KM 210.0',
    tasksCount: 5,
    departments: ['Engineering', 'Traction'],
    optimalCorridorBlockWindow: 'Freight Gap Slot: 14:15 – 16:45 (Between coal rake departures)',
    sharedMachineSavingsMin: 120,
    description: 'Heavy 25-tonne axle load coal corridor requiring BCM deep screening and siding turnouts synchronization.'
  }
];

// 7. CONSTRAINT ENGINE RULES & CHECKS
export const INITIAL_CONSTRAINT_CHECKS: ConstraintCheck[] = [
  {
    id: 'RULE-01',
    ruleName: 'Minimum Maintenance Block Duration',
    category: 'Safety',
    passed: true,
    message: 'Requested 120 min duration satisfies the minimum 90-minute physical threshold for mechanized tamping.'
  },
  {
    id: 'RULE-02',
    ruleName: 'Machine Relocation Transit Window',
    category: 'Resource',
    passed: true,
    message: 'CSM-42 transit from Panagarh Depot (KM 138) to KM 142.6 requires 18 mins; well within mobilization buffer.'
  },
  {
    id: 'RULE-03',
    ruleName: 'Workforce Mandatory Rest Period',
    category: 'Crew Rest',
    passed: true,
    message: 'P-Way Gang 04 crew completed mandatory 8-hour rest interval following previous night shift.'
  },
  {
    id: 'RULE-04',
    ruleName: '25kV OHE Power Isolation Clearance',
    category: 'Power Isolation',
    passed: true,
    message: 'Substation isolation boundary from Mankar to Panagarh verified with zero traction backfeed.'
  },
  {
    id: 'RULE-05',
    ruleName: 'High-Density Suburban EMU Headway',
    category: 'Train Schedule',
    passed: true,
    message: 'Down EMU trains diverted via Loop Line 3; headway remains above statutory 12-minute safety limit.'
  },
  {
    id: 'RULE-06',
    ruleName: 'Premium Passenger Non-Disruption Guarantee',
    category: 'Train Schedule',
    passed: true,
    message: 'Vande Bharat Ex (22301) clears section at 09:38; next scheduled premium (12301) passes at 12:48.'
  },
  {
    id: 'RULE-07',
    ruleName: 'Adjacent Track Safety Clearance',
    category: 'Safety',
    passed: true,
    message: 'Speed restriction of 50 kmph applied to adjacent Up Main Line during heavy machine operations.'
  },
  {
    id: 'RULE-08',
    ruleName: 'Speed Restriction Recovery Buffer',
    category: 'Safety',
    passed: true,
    message: 'Post-block caution order allows 6 minutes recovery buffer in Section Sectional Working Rules (SWR).'
  },
  {
    id: 'RULE-09',
    ruleName: 'Daylight vs Night Lighting Feasibility',
    category: 'Safety',
    passed: true,
    message: '10:00–12:00 window falls within optimal natural daylight; auxiliary lighting towers on standby.',
    suggestedAlternative: 'If 10:00–12:00 faces freight congestion, optimal alternative slot is 14:00 – 16:00 (100% verified).'
  }
];

// 8. PLANNING TRIGGERS
export const INITIAL_PLANNING_TRIGGERS: PlanningTrigger[] = [
  {
    id: 'TRIG-01',
    eventType: 'Sudden Rail Fracture',
    timestamp: '09:02 IST',
    section: 'KM 142/6 (BWN-DGR)',
    actionTaken: 'Triggered Immediate P1 Emergency AI Re-plan queue',
    status: 'Triggered Re-Plan'
  },
  {
    id: 'TRIG-02',
    eventType: 'Track Geometry Anomaly',
    timestamp: '08:41 IST',
    section: 'KM 178/2 (UDL-ASN)',
    actionTaken: 'Flagged by TMS OMS sensor; grouped into K-Means Zone D next block',
    status: 'Resolved'
  },
  {
    id: 'TRIG-03',
    eventType: 'Severe Weather Warning',
    timestamp: '07:15 IST',
    section: 'Howrah – Bardhaman',
    actionTaken: 'High crosswinds forecast; speed restriction protocol enabled',
    status: 'Monitoring'
  },
  {
    id: 'TRIG-04',
    eventType: 'OHE Voltage Sag',
    timestamp: '06:50 IST',
    section: 'KM 218 Traction Substation',
    actionTaken: 'TDMS automated alert; feeder inspection scheduled',
    status: 'Resolved'
  }
];

// 9. EXECUTION RECORDS
export const INITIAL_EXECUTION_RECORDS: ExecutionRecord[] = [
  {
    blockId: 'BLK-2026-0912-004',
    corridor: 'Howrah – Bardhaman – Durgapur (KM 140–146)',
    plannedStart: '10:00 IST',
    plannedEnd: '12:00 IST',
    actualStart: '10:03 IST',
    executionStatus: 'Block In Progress',
    authorizedOfficer: 'Chief Controller / Asansol (S. Roy)',
    workCompletionPct: 65,
    safetySignOffStatus: 'Pending',
    notes: 'CSM tamping underway on KM 142/6; OHE dropper inspection synchronized.'
  },
  {
    blockId: 'BLK-2026-0911-002',
    corridor: 'Bardhaman Yard Turnout Area',
    plannedStart: '01:00 IST',
    plannedEnd: '03:30 IST',
    actualStart: '01:05 IST',
    actualEnd: '03:22 IST',
    executionStatus: 'Safety Sign-off Done',
    authorizedOfficer: 'Senior Divisional Engineer (Cord)',
    workCompletionPct: 100,
    safetySignOffStatus: 'Verified by S&T & ENG',
    notes: 'Point machine replaced, track leveled, caution order removed at 03:28.'
  },
  {
    blockId: 'BLK-2026-0910-008',
    corridor: 'Asansol – Dhanbad (KM 224)',
    plannedStart: '14:00 IST',
    plannedEnd: '16:00 IST',
    executionStatus: 'Delayed',
    actualStart: '14:35 IST',
    authorizedOfficer: 'Dy. Chief Operating Manager',
    workCompletionPct: 30,
    safetySignOffStatus: 'Pending',
    notes: 'Delayed by 35 mins due to delayed coal rake clearing from siding loop.'
  }
];

// 10. REJECTED DECISIONS
export const INITIAL_REJECTED_DECISIONS: RejectedDecision[] = [
  {
    id: 'REJ-01',
    blockId: 'BLK-2026-0909-007',
    corridor: 'Howrah – Bardhaman (KM 45–50)',
    rejectedBy: 'Chief Controller (Operating)',
    rejectionReason: 'Suburban peak passenger evening rush hour cannot absorb proposed 45-min train slowing.',
    timestamp: 'Yesterday 17:30 IST',
    replanStatus: 'Awaiting Re-Plan'
  },
  {
    id: 'REJ-02',
    blockId: 'BLK-2026-0908-003',
    corridor: 'Durgapur Industrial Line',
    rejectedBy: 'Divisional Safety Officer',
    rejectionReason: 'Tower wagon unavailable due to emergency maintenance at Andal depot.',
    timestamp: '2 days ago 11:20 IST',
    replanStatus: 'Re-Optimized'
  }
];

// 11. PLAN FEEDBACK
export const INITIAL_PLAN_FEEDBACK: PlanFeedback[] = [
  {
    id: 'FB-01',
    blockId: 'BLK-2026-0911-002',
    submittedBy: 'Section Engineer (P.Way)',
    timestamp: 'Today 04:10 IST',
    wasTimingAccurate: true,
    disruptionLevel: 'Minimal',
    notes: 'The joint possession saved 40 minutes of separate power cutoff. Machine transit timing was spot on.'
  },
  {
    id: 'FB-02',
    blockId: 'BLK-2026-0910-001',
    submittedBy: 'Section Controller (Movement)',
    timestamp: 'Yesterday 20:15 IST',
    wasTimingAccurate: false,
    disruptionLevel: 'Moderate',
    notes: 'Freight diversion took 12 mins longer than predicted due to signal overlap locking.'
  }
];

// 12. DYNAMIC EVENT SIMULATIONS
export const INITIAL_DYNAMIC_EVENTS: DynamicEventSimulation[] = [
  {
    id: 'SIM-01',
    title: 'Sudden Rail Fracture on Down Main Line',
    description: 'Ultrasonic sensor at KM 142/6 reports instant fissure. Immediate line cutoff required.',
    affectedSection: 'Bardhaman – Durgapur (KM 142.6)',
    suggestedAction: 'CP-SAT triggered: inject immediate P1 emergency window and divert freight to loop.',
    impactScore: 94,
    active: false
  },
  {
    id: 'SIM-02',
    title: 'Goods Train BTPN-401 Overstaying Loop',
    description: 'Petroleum rake delayed by 25 minutes due to brake pipe pressure drop at Sitarampur.',
    affectedSection: 'Asansol – Dhanbad (KM 218)',
    suggestedAction: 'Shift maintenance block start from 11:00 to alternative window 14:00 – 16:00.',
    impactScore: 78,
    active: false
  },
  {
    id: 'SIM-03',
    title: 'Tower Wagon TW-8W-03 Hydraulic Sensor Warning',
    description: 'Catenary inspection crane hydraulic pressure dropped 15% during pre-dispatch check.',
    affectedSection: 'Durgapur Traction Depot',
    suggestedAction: 'Reassign 4-Wheeler TW-4W-11 from Andal and extend planned block by 15 mins.',
    impactScore: 65,
    active: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'Critical Defect Detected (TMS & BDMS)',
    message: 'TRK-7821 rail wear severity index 94/100 at KM 142/6 requires urgent block scheduling.',
    time: '8 mins ago',
    severity: 'critical',
    read: false,
    linkTo: '/tasks'
  },
  {
    id: 'NOTIF-02',
    title: 'New Integrated Block Awaiting Approval',
    message: 'AI Engine created BLK-2026-0912-004 combining Engineering, S&T, and Traction tasks.',
    time: '24 mins ago',
    severity: 'warning',
    read: false,
    linkTo: '/approval'
  },
  {
    id: 'NOTIF-03',
    title: 'AI Optimization Run Completed',
    message: '33% reduction in corridor downtime achieved across Eastern Railway Zone block forecast.',
    time: '1 hour ago',
    severity: 'success',
    read: false,
    linkTo: '/planner'
  },
  {
    id: 'NOTIF-04',
    title: 'Timetable Conflict Cleared',
    message: 'Goods train BTPN-401 loop path confirmed for upcoming 10:00 block window.',
    time: '2 hours ago',
    severity: 'info',
    read: true,
    linkTo: '/approval'
  }
];

export const INITIAL_EMERGENCIES: EmergencyRequest[] = [
  {
    id: 'EMG-2026-0904-01',
    assetId: 'TRK-7821',
    department: 'Engineering',
    location: 'KM 142/6 (BWN-DGR)',
    defectType: 'Rail Flange Fracture Risk',
    severity: 'Critical',
    description: 'Visual patrol reported deep ultrasonic flaw echo on right rail head near fishplate joint.',
    estimatedDurationMin: 90,
    submittedAt: 'Today, 09:12 IST',
    submittedBy: 'Section Engineer (P.Way) Bardhaman',
    status: 'Queued for AI Re-planning'
  }
];

export const INITIAL_OPTIMIZATION_METRICS: OptimizationMetrics = {
  beforeSeparateBlocks: 8,
  beforeTotalDowntimeMin: 540,
  beforeUtilizationPct: 61,
  afterSeparateBlocks: 5,
  afterTotalDowntimeMin: 360,
  afterUtilizationPct: 88,
  downtimeReductionPct: 33.3,
  utilizationIncreasePct: 27.0,
  blocksReductionPct: 37.5,
  lastRunTimestamp: 'Today at 09:15:30 IST'
};

