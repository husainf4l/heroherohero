import Scene from './Scene'

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-white/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Badge/Tag */}
        <div className="mb-6 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full">
          <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            ✨ AI-Powered Job Matching
          </span>
        </div>

        {/* Main Heading with modern styling */}
        <h1 className="text-6xl md:text-8xl font-black mb-8 max-w-5xl leading-[1.1] tracking-tight">
          <span className="text-slate-900">Land Your</span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
            Dream Job
          </span>
          <br />
          <span className="text-slate-900">10x Faster</span>
        </h1>

        {/* Description with modern styling */}
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed font-medium">
          Stop endless scrolling through job boards. Our AI matches you with roles that fit your skills, 
          experience, and career goals in <span className="text-blue-600 font-semibold">seconds</span>.
        </p>

        {/* CTA Buttons - Modern glass-morphism style */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="group relative px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105 hover:-translate-y-1">
            <span className="relative z-10">Get Started Free</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="px-10 py-5 text-lg font-bold text-slate-700 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-lg transform hover:scale-105">
            Watch Demo
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex items-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">10,000+ Success Stories</span>
          </div>
          <div className="h-4 w-px bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">No Credit Card Required</span>
          </div>
        </div>
      </div>
    </div>
  )
}
