'use client';

import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

interface Job {
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
}

const JobsSection: React.FC = () => {
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
                  titleAr
                  shortDescriptionEn
                  shortDescriptionAr
                  locationCity
                  locationCountry
                  salaryMin
                  salaryMax
                  salaryCurrency
                  employmentType
                  workType
                  jobLevel
                  industry
                  department
                  skills
                  deadline
                  slug
                }
              }
            `,
          }),
        });

        const data = await response.json();
        
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        // Filter out invalid jobs (like the test job with "sdsadsadasd")
        const validJobs = data.data.jobs.filter((job: Job) => 
          job.titleEn && 
          job.titleEn.length > 5 && 
          !job.titleEn.includes('Enable Auto Interview')
        );

        setJobs(validJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full text-sm font-semibold text-blue-600">
              ⚡ Loading Opportunities
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Finding Perfect Matches
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 animate-pulse shadow-xl"
              >
                <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 mb-4"></div>
                <div className="h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="text-4xl font-black text-red-600 mb-4 tracking-tight">Error Loading Jobs</h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">{error}</p>
            <button className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 px-6 overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/20 via-purple-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-300/20 via-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full text-sm font-semibold text-blue-600">
            💼 All Opportunities
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Explore All Positions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through {jobs.length} carefully curated opportunities from top employers
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobs.map((job, index) => (
            <div 
              key={job.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-fade-in-up"
            >
              <JobCard {...job} />
            </div>
          ))}
        </div>

        {/* Enhanced View All Button */}
        {jobs.length > 0 && (
          <div className="text-center mt-16">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                View All {jobs.length} Jobs
                <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsSection;
