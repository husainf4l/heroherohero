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
    <div className="relative w-full py-20 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="relative w-full bg-white rounded-sm p-5 antialiased border-2 border-white shadow-lg"
              style={{
                boxShadow: `
                  0 10px 40px -10px rgba(0, 0, 0, 0.1),
                  0 0 0 1px rgba(229, 231, 235, 0.5)
                `,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `
                  0 20px 60px -10px rgba(0, 0, 0, 0.15),
                  0 0 0 1px rgba(229, 231, 235, 0.5)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `
                  0 10px 40px -10px rgba(0, 0, 0, 0.1),
                  0 0 0 1px rgba(229, 231, 235, 0.5)
                `;
              }}
            >
              
              {/* Card content - compact spacing */}
              <div className="relative z-10 space-y-3">
          
          {/* Job Title */}
          <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
            {job.titleEn}
          </h3>

          {/* Company Info */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <MapPin className="w-3 h-3" />
            <span>{job.locationCity}, {job.locationCountry}</span>
          </div>

          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-medium rounded">
              {job.jobLevel}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-medium rounded">
              {job.employmentType.replace(/_/g, ' ')}
            </span>
          </div>

                {/* Salary */}
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3 text-gray-500" />
                  <span className="text-xs font-medium text-gray-900">{formatSalary(job)}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {job.shortDescriptionEn}
                </p>

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 2).map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 2 && (
                      <span className="px-2 py-0.5 text-gray-500 text-[10px]">
                        +{job.skills.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Apply Button */}
                <button className="w-full h-9 bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-xs rounded-sm transition-all duration-200">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
