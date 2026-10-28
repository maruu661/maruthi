import React, { useState } from 'react';
import { Facility } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, AlertTriangle, XCircle, ThumbsUp, Send } from 'lucide-react';

interface ConditionUpdateModalProps {
  facility: Facility | null;
  onClose: () => void;
}

export const ConditionUpdateModal: React.FC<ConditionUpdateModalProps> = ({ facility, onClose }) => {
  const { updateFacilityCondition, language } = useApp();
  const [selectedCondition, setSelectedCondition] = useState<'clean' | 'fair' | 'needs_maintenance'>('clean');
  const [userComment, setUserComment] = useState('');

  if (!facility) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFacilityCondition(facility.id, selectedCondition);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              {language === 'kn' ? 'ಸೌಲಭ್ಯದ ಸ್ಥಿತಿ ನವೀಕರಿಸಿ' : 'Update Facility Condition'}
            </h3>
            <p className="text-xs text-slate-500 truncate max-w-[260px]">{facility.name}</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-slate-600">
            How was the condition of this facility during your visit? Your feedback helps fellow citizens and city sanitation teams.
          </p>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedCondition('clean')}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                selectedCondition === 'clean'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-xs">Clean & Working</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCondition('fair')}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                selectedCondition === 'fair'
                  ? 'border-amber-500 bg-amber-50 text-amber-800 font-bold ring-2 ring-amber-500/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-xs">Fair / Moderate</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCondition('needs_maintenance')}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                selectedCondition === 'needs_maintenance'
                  ? 'border-rose-500 bg-rose-50 text-rose-800 font-bold ring-2 ring-rose-500/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <XCircle className="w-5 h-5 text-rose-600" />
              <span className="text-xs">Needs Repair</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Add a brief comment (optional):
            </label>
            <textarea
              rows={2}
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="e.g. Water pressure was good, clean surroundings..."
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Community Vote</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
