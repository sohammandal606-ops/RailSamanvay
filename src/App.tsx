import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RailwayProvider } from './context/RailwayContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { BlockPlannerPage } from './pages/BlockPlannerPage';
import { HumanApprovalPage } from './pages/HumanApprovalPage';
import { ApprovalDetailPage } from './pages/ApprovalDetailPage';
import { AiInsightsPage } from './pages/AiInsightsPage';
import { WeeklyPlannerPage } from './pages/WeeklyPlannerPage';
import { MonthlyPlannerPage } from './pages/MonthlyPlannerPage';
import { CorridorStatusPage } from './pages/CorridorStatusPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <RailwayProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Authenticated Internal Enterprise Console */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/planner" element={<BlockPlannerPage />} />
            <Route path="/approval" element={<HumanApprovalPage />} />
            <Route path="/approval/:id" element={<ApprovalDetailPage />} />
            <Route path="/corridors" element={<CorridorStatusPage />} />
            <Route path="/insights" element={<AiInsightsPage />} />
            <Route path="/weekly" element={<WeeklyPlannerPage />} />
            <Route path="/monthly" element={<MonthlyPlannerPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </RailwayProvider>
  );
}

export default App;
