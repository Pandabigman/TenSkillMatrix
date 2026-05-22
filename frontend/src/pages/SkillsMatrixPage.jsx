import React from 'react';
import { motion } from 'framer-motion';

const SkillsMatrixPage = ({ trackData, onBack }) => {
  // Assume trackData matches your CareerTrackOut schema, enhanced with progress status

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto p-6 md:p-8"
    >
      {/* Header Section */}
      <button 
        onClick={onBack}
        className="text-emerald-600 hover:text-emerald-800 text-sm font-medium mb-6 flex items-center gap-2 transition-colors"
      >
        ← Back to Dashboard
      </button>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{trackData.name} Matrix</h1>
        <p className="text-gray-600 mb-6">{trackData.overview}</p>
        
        {/* Track Overall Progress */}
        <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl">
          <div className="flex justify-between items-center text-sm font-bold text-emerald-800 mb-2">
            <span>Overall Completion</span>
            <span>{trackData.overallProgress}%</span>
          </div>
          <div className="h-3 w-full bg-emerald-200/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${trackData.overallProgress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-emerald-600 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Levels Matrix */}
      <div className="space-y-8">
        {trackData.levels.map((level, index) => (
          <motion.div 
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="border-b border-gray-100 pb-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                Level {level.level_number}
              </span>
              <h2 className="text-xl font-bold text-gray-800 mt-1">{level.title}</h2>
            </div>

            {/* Resources / Skills List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {level.resources.map((resource) => (
                <div 
                  key={resource.id} 
                  className={`p-4 rounded-xl border flex items-start gap-4 transition-colors ${
                    resource.status === 'completed' 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className={`mt-0.5 h-5 w-5 rounded-full flex-shrink-0 border-2 ${
                    resource.status === 'completed' 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    {resource.status === 'completed' && (
                      <svg className="w-full h-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800">{resource.title}</h4>
                    <span className="text-xs font-medium text-gray-500 uppercase mt-1 inline-block">
                      {resource.resource_type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsMatrixPage;