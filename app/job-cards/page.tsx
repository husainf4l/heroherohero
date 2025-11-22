import JobCardNew from '@/components/JobCardNew'

export default function JobCardDemo() {
  const sampleJobs = [
    {
      date: '2 days ago',
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      salary: '$95,000+',
      location: 'Brussels, Belgium',
      flag: '🇧🇪',
      tags: ['Remote', 'Full Time', 'React', 'TypeScript'],
      description:
        'We are looking for a talented Senior Frontend Developer to join our growing team. You will be responsible for building scalable web applications using modern technologies like React, Next.js, and TypeScript. This is a fantastic opportunity to work with a dynamic team on cutting-edge projects.',
      applicants: 47,
      urgent: true,
    },
    {
      date: '1 week ago',
      title: 'Product Designer',
      company: 'Creative Studios Ltd.',
      salary: '$85,000+',
      location: 'Amsterdam, Netherlands',
      flag: '🇳🇱',
      tags: ['Hybrid', 'Full Time', 'Design', 'Mid-level'],
      description:
        'Join our creative team as a Product Designer where you will shape the future of our digital products. You will work closely with developers and product managers to create intuitive and beautiful user experiences that delight our customers and drive business success.',
      applicants: 23,
    },
    {
      date: '3 days ago',
      title: 'Backend Engineer',
      company: 'Cloud Solutions Co.',
      salary: '$110,000+',
      location: 'Berlin, Germany',
      flag: '🇩🇪',
      tags: ['Remote', 'Full Time', 'Node.js', 'AWS'],
      description:
        'As a Backend Engineer, you will design and implement robust, scalable backend systems that power our cloud infrastructure. You will work with cutting-edge technologies including Node.js, Python, and AWS to build high-performance APIs and microservices.',
      applicants: 68,
      urgent: true,
    },
    {
      date: '5 days ago',
      title: 'Data Scientist',
      company: 'Analytics Pro',
      salary: '$105,000+',
      location: 'London, UK',
      flag: '🇬🇧',
      tags: ['Remote', 'Full Time', 'Python', 'ML'],
      description:
        'We are seeking a Data Scientist to join our analytics team. You will work on exciting machine learning projects, analyze complex datasets, and deliver actionable insights that drive business decisions. Experience with Python, TensorFlow, and statistical modeling is required.',
      applicants: 34,
    },
    {
      date: '1 day ago',
      title: 'DevOps Engineer',
      company: 'Infrastructure Systems',
      salary: '$98,000+',
      location: 'Paris, France',
      flag: '🇫🇷',
      tags: ['Hybrid', 'Full Time', 'Kubernetes', 'Docker'],
      description:
        'Join our DevOps team to build and maintain our cloud infrastructure. You will work with cutting-edge technologies including Kubernetes, Docker, and CI/CD pipelines to ensure our systems run smoothly and efficiently at scale.',
      applicants: 29,
      urgent: true,
    },
    {
      date: '4 days ago',
      title: 'Mobile Developer',
      company: 'App Creators Ltd.',
      salary: '$92,000+',
      location: 'Barcelona, Spain',
      flag: '🇪🇸',
      tags: ['Remote', 'Full Time', 'React Native', 'iOS'],
      description:
        'We are looking for an experienced Mobile Developer to create beautiful, performant mobile applications. You will work with React Native and native iOS/Android code to deliver exceptional user experiences across multiple platforms.',
      applicants: 41,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full">
            <span className="text-blue-700 text-sm font-bold tracking-wider uppercase">Premium Design</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Enhanced Job Cards
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern, minimal, and premium job card design with advanced features
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-4xl font-black text-blue-600 mb-2">{sampleJobs.length}</div>
            <div className="text-gray-600 font-medium">Available Positions</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-4xl font-black text-emerald-600 mb-2">
              {sampleJobs.filter(j => j.urgent).length}
            </div>
            <div className="text-gray-600 font-medium">Urgent Hiring</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-4xl font-black text-purple-600 mb-2">
              {Math.round(sampleJobs.reduce((acc, j) => acc + (j.applicants || 0), 0) / sampleJobs.length)}
            </div>
            <div className="text-gray-600 font-medium">Avg. Applicants</div>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleJobs.map((job, index) => (
            <JobCardNew key={index} {...job} />
          ))}
        </div>
      </div>
    </div>
  )
}
