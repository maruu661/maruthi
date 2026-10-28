import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CivicReport, CivicStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  ShieldCheck, 
  BarChart3, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  Edit3, 
  Send, 
  Layers, 
  Sparkles,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    reports, 
    updateReportStatus, 
    userRole, 
    setUserRole, 
    setCurrentPage, 
    facilities, 
    language 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | CivicStatus>('All');
  const [selectedReportForAction, setSelectedReportForAction] = useState<CivicReport | null>(null);

  // Status update form state
  const [newStatus, setNewStatus] = useState<CivicStatus>('In Progress');
  const [officerNote, setOfficerNote] = useState('');
  const [internalNote, setInternalNote] = useState('');

  // Metrics
  const total = reports.length;
  const submittedCount = reports.filter((r) => r.status === 'Submitted').length;
  const reviewCount = reports.filter((r) => r.status === 'Under Review').length;
  const inProgressCount = reports.filter((r) => r.status === 'In Progress').length;
  const resolvedCount = reports.filter((r) => r.status === 'Resolved').length;

  const filteredReports = reports.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchRef = r.referenceNo.toLowerCase().includes(q);
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDept = r.assignedDepartment.toLowerCase().includes(q);
      if (!matchRef && !matchTitle && !matchDept) return false;
    }
    return true;
  });

  const handleOpenActionModal = (report: CivicReport) => {
    setSelectedReportForAction(report);
    setNewStatus(report.status);
    setOfficerNote('');
    setInternalNote('');
  };

  const handleSaveStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReportForAction) return;
    const noteText = officerNote.trim() || `Status updated to ${newStatus} by field operations command.`;
    updateReportStatus(selectedReportForAction.id, newStatus, noteText, internalNote.trim() || undefined);
    setSelectedReportForAction(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header with Security Clearance Notice */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Authorized Municipal Operations Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Tumakuru Smart City Command Center
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Dispatch rapid-action field engineering teams, verify photographic evidence, resolve civic tickets, and supervise tourism corridor cleanliness.
          </p>
        </div>

        {/* Role toggle indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setUserRole('citizen');
              setCurrentPage('dashboard');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Exit to Citizen View
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Total Work Orders</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{total}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-blue-700 block">New Submissions</span>
          <span className="text-2xl font-black text-blue-700 mt-1 block">{submittedCount}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-amber-700 block">Under Review</span>
          <span className="text-2xl font-black text-amber-700 mt-1 block">{reviewCount}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-indigo-200 bg-indigo-50/20 shadow-xs">
          <span className="text-[11px] font-bold uppercase text-indigo-700 block">Field Action</span>
          <span className="text-2xl font-black text-indigo-700 mt-1 block">{inProgressCount}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold uppercase text-emerald-700 block">Verified Resolved</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">{resolvedCount}</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search reference, title, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'Submitted', 'Under Review', 'In Progress', 'Resolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="text-[11px] font-bold uppercase text-slate-400 bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Ref No</th>
                <th className="py-3 px-4">Issue Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary-700">
                    {rep.referenceNo}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="font-bold text-slate-900 block truncate">{rep.title}</span>
                    <span className="text-[11px] text-slate-500 block truncate">{rep.locationName}</span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-700">{rep.categoryLabel}</span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                    {rep.assignedDepartment}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={rep.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpenActionModal(rep)}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors inline-flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Update</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Dialog / Status Change Modal */}
      {selectedReportForAction && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 font-mono">
                  {selectedReportForAction.referenceNo}
                </span>
                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  Officer Action Console
                </h3>
              </div>
              <button 
                onClick={() => setSelectedReportForAction(null)} 
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatusUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Issue Under Review</label>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-800 font-medium">
                  {selectedReportForAction.title}
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Update Status To</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as CivicStatus)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                >
                  <option value="Under Review">Under Review</option>
                  <option value="In Progress">In Progress (Field Team Dispatched)</option>
                  <option value="Resolved">Resolved (Work Completed & Verified)</option>
                  <option value="Rejected">Rejected / Out of Municipal Scope</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Public Officer Milestone Remark</label>
                <textarea
                  rows={2}
                  value={officerNote}
                  onChange={(e) => setOfficerNote(e.target.value)}
                  placeholder="e.g. Cold-mix patch applied; road opened for regular vehicular transit."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-[10px] text-slate-400">
                  Visible on the citizen's vertical tracking timeline.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Internal Department Note (Optional)</label>
                <input
                  type="text"
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="e.g. Reconcile contractor invoice #SC-449"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedReportForAction(null)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-xs"
                >
                  Save Milestone & Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

