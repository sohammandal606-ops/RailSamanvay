import {
  MaintenanceTask,
  CorridorSection,
  BlockPlan,
  AnomalyItem,
  DBSCANCluster,
  NotificationItem,
  EmergencyRequest,
  OptimizationMetrics
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
    recommendedBlockWindow: '10:00 – 12:00 (Integrated Window)'
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
    ]
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
    syncedSavingsDowntimeMin: 180
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
    syncedSavingsDowntimeMin: 120
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
    syncedSavingsDowntimeMin: 75
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'Critical Defect Detected (TMS)',
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
