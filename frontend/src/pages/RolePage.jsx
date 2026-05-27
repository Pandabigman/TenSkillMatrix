import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import mockData from '../api/mockEnrolledTracks.json'; // Simulated API response for track details

const RolePage = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [trackData, setTrackData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      await new Promise(resolve => setTimeout(resolve, 400)); 
      const foundTrack = mockData.find(t => t.id === parseInt(trackId));
      setTrackData(foundTrack);
      setIsLoading(false);
    };

    fetchTrack();
  }, [trackId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!trackData) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-800">Role not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-emerald-600 underline">Return to Dashboard</button>
      </div>
    );
  }

  // --- Smart Target Calculations ---
  // Find the user's current level object to see what is pending
  const currentLevelData = trackData.levels.find(l => l.level_number === trackData.current_level);
  
  // Count how many resources are not yet completed in their current level
  const pendingResources = currentLevelData 
    ? currentLevelData.resources.filter(r => r.status !== 'completed').length 
    : 0;

  const isTrackComplete = trackData.overallProgress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="min-h-screen bg-gray-50 py-10"
    >
      <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        
        {/* Header & Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="text-emerald-600 hover:text-emerald-800 text-sm font-medium mb-6 flex items-center gap-2 transition-colors"
        >
          &larr; Back to Dashboard
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{trackData.name} Path</h1>
          <p className="text-gray-600 mb-6">{trackData.overview}</p>
          
          {/* Overall Progress Tracker */}
          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl mb-6">
            <div className="flex justify-between items-center text-sm font-bold text-emerald-800 mb-2">
              <span>Overall Completion</span>
              <span>{trackData.overallProgress}%</span>
            </div>
            <div className="h-3 w-full bg-emerald-200/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${trackData.overallProgress}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-emerald-600 rounded-full"
              />
            </div>
          </div>

          {/* --- SMART TARGET BANNER --- */}
          {!isTrackComplete && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-5 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl text-white shadow-md flex items-center gap-5"
            >
              <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-1">
                  Smart Target
                </h3>
                <p className="text-lg font-semibold leading-tight mb-1">
                  Complete Level {trackData.current_level} in 2 weeks
                </p>
                <p className="text-sm text-emerald-50 opacity-90">
                  You have <span className="font-bold text-white">{pendingResources}</span> resources left to finish this level. Keep up the momentum!
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* The Levels Matrix */}
        <div className="space-y-8">
          {trackData.levels.map((level, index) => (
            <motion.div 
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-xl p-6 transition-colors ${
                level.level_number === trackData.current_level 
                  ? 'border-emerald-200 bg-emerald-50/30' 
                  : 'border-gray-100 bg-gray-50/50'
              }`}
            >
              <div className="mb-4 border-b border-gray-200 pb-3 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    Level {level.level_number}
                  </span>
                  <h2 className="text-xl font-bold text-gray-800 mt-1">{level.title}</h2>
                </div>
                {/* Highlight current level tag */}
                {level.level_number === trackData.current_level && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                    Current Focus
                  </span>
                )}
              </div>

              {/* Resources for this Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {level.resources.map((resource) => (
                  <div 
                    key={resource.id} 
                    className={`p-4 rounded-xl border flex items-start gap-4 transition-colors ${
                      resource.status === 'completed' 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : resource.status === 'in_progress'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-white border-gray-200 shadow-sm hover:border-emerald-300 cursor-pointer'
                    }`}
                  >
                    {/* Status Checkbox / Icon */}
                    <div className={`mt-0.5 h-6 w-6 rounded-full flex-shrink-0 border-2 flex items-center justify-center ${
                      resource.status === 'completed' 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : resource.status === 'in_progress'
                        ? 'bg-transparent border-amber-500 text-amber-500'
                        : 'border-gray-300 bg-gray-100'
                    }`}>
                      {resource.status === 'completed' && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {resource.status === 'in_progress' && (
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800 leading-snug">{resource.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{resource.overview}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase bg-gray-200 px-2 py-0.5 rounded-full">
                          {resource.resource_type}
                        </span>
                        {resource.is_mandatory && (
                           <span className="text-[10px] font-bold text-rose-500 uppercase bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                             Required
                           </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </motion.div>
  );
};

export default RolePage;