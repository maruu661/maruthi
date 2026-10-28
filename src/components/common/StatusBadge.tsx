import React from 'react';
import { CivicStatus } from '../../types';
import { CheckCircle2, Clock, AlertCircle, RefreshCw, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: CivicStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Submitted':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <Clock className="w-3.5 h-3.5" />,
          labelEn: 'Submitted',
          labelKn: 'ಸಲ್ಲಿಸಲಾಗಿದೆ'
        };
      case 'Under Review':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          labelEn: 'Under Review',
          labelKn: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ'
        };
      case 'In Progress':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          icon: <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />,
          labelEn: 'In Progress',
          labelKn: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ'
        };
      case 'Resolved':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          labelEn: 'Resolved',
          labelKn: 'ಪರಿಹರಿಸಲಾಗಿದೆ'
        };
      case 'Rejected':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: <XCircle className="w-3.5 h-3.5" />,
          labelEn: 'Closed / Rejected',
          labelKn: 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: <Clock className="w-3.5 h-3.5" />,
          labelEn: status,
          labelKn: status
        };
    }
  };

  const config = getBadgeConfig();
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs font-medium px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2'
  }[size];

  return (
    <span className={`inline-flex items-center rounded-full border shadow-sm ${config.bg} ${sizeClasses}`}>
      {config.icon}
      <span>{config.labelEn}</span>
    </span>
  );
};

