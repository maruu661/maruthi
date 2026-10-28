import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Megaphone, 
  Lightbulb, 
  ThumbsUp, 
  PlusCircle, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  X,
  MessageSquare
} from 'lucide-react';

export const CommunityHub: React.FC = () => {
  const { 
    announcements, 
    suggestions, 
    upvoteSuggestion, 
    addSuggestion, 
    language 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'announcements' | 'suggestions'>('announcements');
  const [showPostModal, setShowPostModal] = useState(false);

  // New suggestion form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Tourism & Heritage');
  const [newAuthor, setNewAuthor] = useState('');

  const handlePostSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;
    addSuggestion(newTitle, newDesc, newCategory, newAuthor);
    setNewTitle('');
    setNewDesc('');
    setNewAuthor('');
    setShowPostModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2 border border-indigo-200">
            <Users className="w-3.5 h-3.5" />
            <span>Citizen Voice & Public Notices</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'kn' ? 'ಸಮುದಾಯ ವೇದಿಕೆ & ಪ್ರಕಟಣೆಗಳು' : 'Tumakuru Community Hub'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Explore local civic notices, suggest smart enhancements for public spots, and co-create a cleaner Tumakuru.
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a Community Suggestion</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs text-xs font-semibold">
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'announcements' 
              ? 'bg-primary-600 text-white shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Official Announcements & Notices ({announcements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('suggestions')}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'suggestions' 
              ? 'bg-primary-600 text-white shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-300" />
          <span>Citizen Ideas & Suggestions ({suggestions.length})</span>
        </button>
      </div>

      {/* Announcements Feed */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 flex flex-col md:flex-row items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-200">
                    {ann.category}
                  </span>
                  {ann.officialBadge && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified Civic Notice
                    </span>
                  )}
                  {ann.isUrgent && (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 animate-pulse">
                      Urgent Advisory
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {ann.title}
                </h3>
                <p className="text-xs font-medium text-secondary-700 font-sans">
                  {ann.titleKn}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {language === 'kn' ? ann.contentKn : ann.content}
                </p>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5 shrink-0 pt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{ann.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Citizen Suggestions Grid */}
      {activeTab === 'suggestions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {suggestions.map((sug) => (
            <div
              key={sug.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    {sug.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100">
                    {sug.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {sug.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {sug.description}
                </p>

                <div className="text-[11px] text-slate-400">
                  Proposed by: <strong className="text-slate-700">{sug.author}</strong> • {sug.date}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => upvoteSuggestion(sug.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                    sug.hasVoted
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{sug.votes} Endorsements</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post Suggestion Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span>Submit a City / Tourism Idea</span>
              </h3>
              <button onClick={() => setShowPostModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSuggestion} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title of Your Suggestion</label>
                <input
                  type="text"
                  placeholder="e.g. Solar powered mobile charging stations at Amanikere Park"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Tourism & Heritage">Tourism & Heritage</option>
                  <option value="Public Facilities">Public Facilities</option>
                  <option value="Roads & Transport">Roads & Transport</option>
                  <option value="Accessibility">Accessibility</option>
                  <option value="Sanitation & Greenery">Sanitation & Greenery</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Explanation & Citizen Impact</label>
                <textarea
                  rows={3}
                  placeholder="Describe your idea and how it benefits residents or visiting tourists..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Name / Group (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Tumakuru Resident / Youth Forum"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-xs"
                >
                  Publish Suggestion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

