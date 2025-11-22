'use client';

import React, { useState } from 'react';
import { Share2, Bookmark, MapPin, DollarSign, Clock, ExternalLink, Link2, Facebook, Linkedin, Check, Briefcase } from 'lucide-react';

interface JobCardProps {
  id: string;
  titleEn: string;
  titleAr?: string;
  shortDescriptionEn: string;
  shortDescriptionAr?: string;
  locationCity: string;
  locationCountry: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string;
  employmentType: string;
  workType: string;
  jobLevel: string;
  industry: string;
  department: string;
  skills: string[];
  deadline: string;
  slug: string;
  companyId?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  titleEn,
  shortDescriptionEn,
  locationCity,
  locationCountry,
  salaryMin,
  salaryMax,
  salaryCurrency,
  employmentType,
  workType,
  jobLevel,
  industry,
  department,
  skills,
  deadline,
  slug,
  companyId,
}) => {
  const [showShare, setShowShare] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatEmploymentType = (type: string) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatSalary = () => {
    if (!salaryMin && !salaryMax) return 'Salary not disclosed';
    const currency = salaryCurrency || 'USD';
    if (salaryMin && salaryMax) {
      return `${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()} ${currency}`;
    }
    return salaryMin 
      ? `From ${salaryMin.toLocaleString()} ${currency}` 
      : `Up to ${salaryMax?.toLocaleString()} ${currency}`;
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `${diffDays} days left`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + '/' + slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <div className="group relative bg-gradient-to-br from-white via-sky-50/40 to-blue-50/40 rounded-2xl p-4 shadow-[0_1px_8px_rgba(14,165,233,0.1)] hover:shadow-[0_4px_20px_rgba(14,165,233,0.2)] transition-all duration-300 hover:-translate-y-0.5 border border-sky-100 hover:border-sky-200 overflow-hidden">
      {/* Decorative gradient overlays */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-sky-200/30 to-blue-200/30 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-cyan-200/20 to-sky-200/20 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-400" />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header - Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-sky-100 to-blue-100 rounded-full border border-sky-200/50">
            <Clock className="w-3 h-3 text-sky-700" />
            <span className="text-[10px] font-bold text-sky-800">{formatDeadline(deadline)}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowShare(!showShare)}
              className="p-1.5 hover:bg-sky-100 rounded-full transition-all duration-200 relative group/share"
              aria-label="Share job"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-600 group-hover/share:text-sky-700 transition-colors" />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-1.5 hover:bg-sky-100 rounded-full transition-all duration-200"
              aria-label="Bookmark job"
            >
              <Bookmark
                className={`w-3.5 h-3.5 transition-all duration-200 ${
                  isBookmarked ? 'fill-sky-600 text-sky-600' : 'text-sky-600 hover:text-sky-700'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Share Popup */}
        {showShare && (
          <div className="absolute top-11 right-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-sky-200 p-1.5 min-w-[140px] z-30 animate-fadeIn">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 rounded-lg transition-all duration-200 group"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-[10px] font-bold text-gray-600 group-hover:text-sky-700">Copy Link</span>
                </>
              )}
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 rounded-lg transition-all duration-200 group">
              <Linkedin className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-[10px] font-bold text-gray-600 group-hover:text-sky-700">LinkedIn</span>
            </button>
          </div>
        )}

        {/* Job Title */}
        <h3 className="text-sm font-bold text-gray-800 mb-2.5 leading-tight group-hover:text-sky-700 transition-colors duration-300 cursor-pointer line-clamp-2">
          {titleEn}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="px-2.5 py-1 bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 text-[9px] font-bold rounded-full border border-sky-200/60">
            {jobLevel}
          </span>
          <span className="px-2.5 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-[9px] font-bold rounded-full border border-blue-200/60">
            {formatEmploymentType(employmentType)}
          </span>
          <span className="px-2.5 py-1 bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-700 text-[9px] font-bold rounded-full border border-cyan-200/60">
            {workType}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 leading-relaxed line-clamp-2">
          {truncateDescription(shortDescriptionEn)}
        </p>

        {/* Location & Salary */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-sky-100">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="p-1 bg-sky-100 rounded-full">
              <MapPin className="w-3 h-3 text-sky-600 flex-shrink-0" />
            </div>
            <span className="text-[10px] text-gray-700 font-semibold truncate">{locationCity}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-sky-300 flex-shrink-0" />
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="p-1 bg-emerald-100 rounded-full">
              <DollarSign className="w-3 h-3 text-emerald-600 flex-shrink-0" />
            </div>
            <span className="text-[10px] text-gray-700 font-semibold truncate">{formatSalary()}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="px-2.5 py-1 bg-white text-gray-700 text-[9px] font-semibold rounded-lg border border-gray-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all duration-200 shadow-sm"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-2.5 py-1 text-sky-600 text-[9px] font-bold">
                +{skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex items-center gap-2">
          <button className="flex-1 px-3 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-[10px] font-bold rounded-xl transition-all duration-300 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 hover:-translate-y-0.5 flex items-center justify-center gap-1.5">
            <span>Apply Now</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <button className="px-3 py-2.5 bg-white hover:bg-sky-50 text-gray-700 hover:text-sky-700 text-[10px] font-bold rounded-xl transition-all duration-200 border border-gray-200 hover:border-sky-300 shadow-sm">
            Details
          </button>
        </div>

        {/* Backdrop for closing share popup */}
        {showShare && (
          <div
            className="fixed inset-0 z-20"
            onClick={() => setShowShare(false)}
          />
        )}
      </div>
    </div>
  );
};

export default JobCard;
