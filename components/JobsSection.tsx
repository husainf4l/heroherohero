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
      <section className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Loading Jobs...
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse shadow-sm"
              >
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Error Loading Jobs</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white py-16 px-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        {/* View All Button */}
        {jobs.length > 0 && (
          <div className="text-center mt-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-bold rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300">
              View All {jobs.length} Jobs →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsSection;
