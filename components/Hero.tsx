import Scene from './Scene'

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Main Heading */}
        <h2 className="text-6xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight">
          <span className="text-black">Land Your Dream</span>{' '}
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Job 10x Faster</span>
        </h2>

        {/* Description */}
        <p className="text-xl text-slate-600 mb-12 max-w-2xl">
          Stop endless scrolling through job boards. Our AI matches you with roles that fit your skills, 
          experience, and career goals in seconds.
        </p>

        {/* Call to Action */}
        <button className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  )
}
