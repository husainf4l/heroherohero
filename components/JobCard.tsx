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
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 hover:border-blue-500/30 overflow-hidden">
      {/* Enhanced gradient overlays */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-blue-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-400/15 via-blue-400/15 to-purple-400/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header - Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-bold text-blue-700">{formatDeadline(deadline)}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowShare(!showShare)}
              className="p-2 hover:bg-blue-100 rounded-full transition-all duration-200 relative group/share"
              aria-label="Share job"
            >
              <Share2 className="w-4 h-4 text-blue-600 group-hover/share:text-blue-700 transition-colors" />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 hover:bg-blue-100 rounded-full transition-all duration-200"
              aria-label="Bookmark job"
            >
              <Bookmark
                className={`w-4 h-4 transition-all duration-200 ${
                  isBookmarked ? 'fill-blue-600 text-blue-600' : 'text-blue-600 hover:text-blue-700'
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
        <h3 className="text-base font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300 cursor-pointer line-clamp-2">
          {titleEn}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 text-xs font-bold rounded-full border border-blue-500/20">
            {jobLevel.replace(/_/g, ' ')}
          </span>
          <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 text-xs font-bold rounded-full border border-purple-500/20">
            {formatEmploymentType(employmentType)}
          </span>
          <span className="px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-700 text-xs font-bold rounded-full border border-green-500/20">
            {workType.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 leading-relaxed line-clamp-2">
          {truncateDescription(shortDescriptionEn)}
        </p>

        {/* Location & Salary */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-700 font-semibold">{locationCity}, {locationCountry}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200/50">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-900 font-bold">{formatSalary()}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-3 py-1.5 text-blue-600 text-xs font-bold">
                +{skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex items-center gap-2">
          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95">
            <span>Apply Now</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          <button className="px-4 py-3 bg-white/80 hover:bg-blue-50 text-gray-700 hover:text-blue-700 text-sm font-bold rounded-xl transition-all duration-200 border border-gray-300 hover:border-blue-400 shadow-sm">
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
