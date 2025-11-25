'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';

interface Job {
  id: string;
  titleEn: string;
  shortDescriptionEn: string;
  locationCity: string;
  locationCountry: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  employmentType: string;
  workType: string;
  jobLevel: string;
  skills: string[];
  deadline: string;
  companyId?: string;
}

export default function FloatingCard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://192.168.1.224:4005/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query Jobs {
                jobs {
                  id
                  titleEn
                  shortDescriptionEn
                  locationCity
                  locationCountry
                  salaryMin
                  salaryMax
                  salaryCurrency
                  employmentType
                  workType
                  jobLevel
                  skills
                  deadline
                  companyId
                }
              }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        if (data?.jobs && data.jobs.length > 0) {
          setJobs(data.jobs.slice(0, 6));
        } else {
          setError('No jobs found');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to mock data if server is unavailable
        const mockJobs: Job[] = [
          {
            id: '1',
            titleEn: 'Senior Full Stack Developer',
            shortDescriptionEn: 'Join our team to build cutting-edge web applications using modern technologies.',
            locationCity: 'Amman',
            locationCountry: 'Jordan',
            salaryMin: 3000,
            salaryMax: 5000,
            salaryCurrency: 'USD',
            employmentType: 'FULL_TIME',
            workType: 'REMOTE',
            jobLevel: 'SENIOR',
            skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
            deadline: '2025-12-31',
            companyId: '1'
          },
          {
            id: '2',
            titleEn: 'UI/UX Designer',
            shortDescriptionEn: 'Create beautiful and intuitive user interfaces for our products.',
            locationCity: 'Dubai',
            locationCountry: 'UAE',
            salaryMin: 2500,
            salaryMax: 4000,
            salaryCurrency: 'USD',
            employmentType: 'FULL_TIME',
            workType: 'HYBRID',
            jobLevel: 'MID_LEVEL',
            skills: ['Figma', 'Adobe XD', 'Prototyping'],
            deadline: '2025-12-25',
            companyId: '2'
          },
          {
            id: '3',
            titleEn: 'DevOps Engineer',
            shortDescriptionEn: 'Manage and optimize our cloud infrastructure and deployment pipelines.',
            locationCity: 'Riyadh',
            locationCountry: 'Saudi Arabia',
            salaryMin: 4000,
            salaryMax: 6000,
            salaryCurrency: 'USD',
            employmentType: 'FULL_TIME',
            workType: 'ON_SITE',
            jobLevel: 'SENIOR',
            skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
            deadline: '2025-12-20',
            companyId: '3'
          },
          {
            id: '4',
            titleEn: 'Mobile App Developer',
            shortDescriptionEn: 'Build native mobile applications for iOS and Android platforms.',
            locationCity: 'Cairo',
            locationCountry: 'Egypt',
            salaryMin: 2000,
            salaryMax: 3500,
            salaryCurrency: 'USD',
            employmentType: 'FULL_TIME',
            workType: 'REMOTE',
            jobLevel: 'MID_LEVEL',
            skills: ['React Native', 'Swift', 'Kotlin'],
            deadline: '2025-12-28',
            companyId: '4'
          },
          {
            id: '5',
            titleEn: 'Data Scientist',
            shortDescriptionEn: 'Analyze data and build machine learning models to drive business insights.',
            locationCity: 'Beirut',
            locationCountry: 'Lebanon',
            salaryMin: 3500,
            salaryMax: 5500,
            salaryCurrency: 'USD',
            employmentType: 'FULL_TIME',
            workType: 'HYBRID',
            jobLevel: 'SENIOR',
            skills: ['Python', 'TensorFlow', 'SQL', 'Pandas'],
            deadline: '2025-12-22',
            companyId: '5'
          },
          {
            id: '6',
            titleEn: 'Product Manager',
            shortDescriptionEn: 'Lead product strategy and work with cross-functional teams.',
            locationCity: 'Amman',
            locationCountry: 'Jordan',
            salaryMin: 3000,
            salaryMax: 4500,
            salaryCurrency: 'USD',
            employmentType: 'FULL_TIME',
            workType: 'ON_SITE',
            jobLevel: 'SENIOR',
            skills: ['Agile', 'Product Strategy', 'Analytics'],
            deadline: '2025-12-30',
            companyId: '6'
          }
        ];
        setJobs(mockJobs);
        setError(null); // Clear error when using mock data
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatSalary = (job: Job) => {
    if (!job?.salaryMin && !job?.salaryMax) return 'Competitive';
    const currency = job?.salaryCurrency || 'USD';
    if (job?.salaryMin && job?.salaryMax) {
      return `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${currency}`;
    }
    return job?.salaryMin 
      ? `From ${job.salaryMin.toLocaleString()} ${currency}` 
      : `Up to ${job?.salaryMax?.toLocaleString()} ${currency}`;
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

  if (loading) {
    return (
      <div className="relative w-full py-20 flex items-center justify-center bg-white px-6">
        <div className="text-gray-400">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full py-20 flex items-center justify-center bg-white px-6">
        <div className="max-w-md text-center">
          <div className="text-red-500 font-semibold mb-2">Error Loading Jobs</div>
          <div className="text-gray-600 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="relative w-full py-20 flex items-center justify-center bg-white px-6">
        <div className="text-gray-400">No jobs available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 px-6 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full text-sm font-semibold text-blue-600">
          🚀 Featured Opportunities
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Latest Job Openings
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover your next career move with top companies
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div 
              key={job.id}
              className="group relative w-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 antialiased border border-gray-200/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card content */}
              <div className="relative z-10 space-y-4">
          
                {/* Job Title */}
                <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {job.titleEn}
                </h3>

                {/* Company Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{job.locationCity}, {job.locationCountry}</span>
                </div>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 text-xs font-semibold rounded-full border border-blue-500/20">
                    {job.jobLevel.replace(/_/g, ' ')}
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 text-xs font-semibold rounded-full border border-purple-500/20">
                    {job.employmentType.replace(/_/g, ' ')}
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-700 text-xs font-semibold rounded-full border border-green-500/20">
                    {job.workType.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-bold text-gray-900">{formatSalary(job)}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {job.shortDescriptionEn}
                </p>

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="px-3 py-1 text-gray-500 text-xs font-medium">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Deadline */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Deadline: {formatDeadline(job.deadline)}</span>
                </div>

                {/* Apply Button */}
                <button className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-95">
                  Apply Now
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
