# 🚆 RailSamanvay AI
### AI-Powered Multi-Department Automatic Block Planning & Optimization System for Indian Railways

> **Smart India Hackathon (SIH) Initiative**  
> Streamlining coordination between Engineering (TMS), S&T (SMMS), Traction (TDMS), and Operating Control Office (COA).

---

## 🌟 Overview

**RailSamanvay** is an enterprise-grade intelligent railway block planning and corridor management platform designed for Indian Railways high-density routes. It eliminates departmental silos by automatically consolidating track possession requests from multiple departments into unified, rule-validated "shadow blocks".

---

## 🚀 Key Features

- **Multi-Source Data Integration**: Ingestion pipelines aggregating telemetry from Track Management (TMS), Signalling (SMMS), Traction Distribution (TDMS), and Control Office Application (COA).
- **AI Anomaly Detection & Clustering**:
  - **Isolation Forest**: Identifies hidden track geometry degradation and signal relay anomaly signatures before critical failures.
  - **DBSCAN Spatial Clustering**: Automatically groups co-located maintenance work orders along the same chainage kilometer markers.
- **Dynamic Urgency Scoring**: 5-factor normalized urgency scoring algorithm (*Asset Criticality, Defect Severity, Overdue Factors, Anomaly Score, Operational Impact*).
- **Domain Rule Engine & Safety Invariants**: Strictly enforces 25kV OHE power isolation protocols, safety buffers, and G&SR constraints.
- **Human-in-the-Loop Approval System**: Real-time conflict detection and side-by-side timetable simulation giving section controllers full authorization authority.
- **Dynamic Emergency Injection**: One-click emergency block insertion with instant automatic timetable rescheduling.
- **Interactive Multi-Level Planners**:
  - Daily Live Corridor View
  - Weekly Schedule Matrix
  - 30-Day Monthly Corridor Heatmap
- **Operations Analytics & Audit Reports**: Comparative before/after metrics, downtime reduction radar charts, and downloadable compliance reports.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **Data Visualization**: Recharts (Bar, Line, Radar charts)
- **Build Tool**: Vite
- **Routing**: React Router DOM v6

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/sohammandal606-ops/RailSamanvay.git

# Navigate to project directory
cd RailSamanvay

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will run locally on `http://localhost:3000/`.

---

## 🔒 Safety & Operations Ethos
> *"AI recommends. Railway authorities validate."*  
> RailSamanvay adheres strictly to Indian Railways General & Subsidiary Rules (G&SR). Final corridor possession is executed only upon authorized officer review.
