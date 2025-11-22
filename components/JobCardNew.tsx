'use client';

import React, { useState } from 'react';
import { Share2, Bookmark, Link2, Facebook, Linkedin, Check, ExternalLink, Clock, DollarSign, MapPin, Briefcase } from 'lucide-react';

interface JobCardProps {
  date: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  flag: string; // emoji or small png
  tags: string[];
  description: string;
  companyLogo?: string;
  applicants?: number;
  urgent?: boolean;
}

const JobCardNew: React.FC<JobCardProps> = ({
  date,
  title,
  company,
  salary,
  location,
  flag,
  tags,
  description,
  companyLogo,
  applicants,
  urgent = false,
}) => {
  const [showShare, setShowShare] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const truncateDescription = (text: string, maxLength: number = 190) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-blue-100">
      {/* Urgent Badge */}
      {urgent && (
        <div className="absolute -top-3 left-6 px-4 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Urgent Hiring
        </div>
      )}

      {/* Header - Date and Actions */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {companyLogo ? (
            <img src={companyLogo} alt={company} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {company.charAt(0)}
            </div>
          )}
          <div>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {date}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShare(!showShare)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-300 relative group/share hover:scale-110"
          >
            <Share2 className="w-5 h-5 text-gray-600 group-hover/share:text-blue-600" />
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <Bookmark
              className={`w-5 h-5 transition-all ${
                isBookmarked ? 'fill-blue-600 text-blue-600 scale-110' : 'text-gray-600'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Share Popup - Enhanced */}
      {showShare && (
        <div className="absolute top-20 right-6 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-20 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-300 group"
              title="Copy link"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Link2 className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
              )}
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                {copied ? 'Copied!' : 'Copy link'}
              </span>
            </button>
            <button
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-900 hover:to-gray-800 rounded-xl transition-all duration-300 group"
              title="Share on X"
            >
              <svg
                className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 group-hover:text-white">Share on X</span>
            </button>
            <button
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 group"
              title="Share on Facebook"
            >
              <Facebook className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-white">Facebook</span>
            </button>
            <button
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 group"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-white">LinkedIn</span>
            </button>
          </div>
        </div>
      )}

      {/* Job Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors cursor-pointer group-hover:translate-x-1 duration-300">
        {title}
      </h3>

      {/* Company */}
      <a
        href="#"
        className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-flex items-center gap-2 transition-all group/link"
      >
        {company}
        <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
      </a>

      {/* Stats Bar */}
      {applicants && (
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span className="font-medium">{applicants} applicants</span>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-bold">
              +
            </div>
          </div>
        </div>
      )}

      {/* Location and Salary Pills */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-100 hover:border-blue-300 transition-all">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-lg">{flag}</span>
          <span className="text-sm text-gray-700 font-semibold">{location}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-100 hover:border-emerald-300 transition-all">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span className="text-sm text-gray-700 font-semibold">{salary}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-semibold rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {truncateDescription(description)}
      </p>

      {/* Footer CTA */}
      <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
        <button className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2">
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </button>
        <button className="px-5 py-3 bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-md">
          Details
        </button>
      </div>

      {/* Backdrop for closing share popup */}
      {showShare && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowShare(false)}
        />
      )}
    </div>
  );
};

export default JobCardNew;
