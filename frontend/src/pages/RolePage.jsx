import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
//import mockData from './mockEnrolledTracks.json';

const RolePage = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [trackData, setTrackData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mockData = [
  {
    "id": 1,
    "track_id": 101,
    "name": "DevOps Engineer",
    "overview": "Master the art of CI/CD, cloud infrastructure, containerization, and automation to streamline software delivery.",
    "imageUrl": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=600",
    "current_level": 2,
    "progressPercentage": 45,
    "overallProgress": 45,
    "levels": [
      {
        "id": 1001,
        "track_id": 101,
        "level_number": 1,
        "title": "Linux & Networking Fundamentals",
        "resources": [
          {
            "id": 5001,
            "level_id": 1001,
            "resource_type": "course",
            "title": "Linux Command Line Basics",
            "overview": "Learn essential terminal commands and file permissions.",
            "status": "completed"
          },
          {
            "id": 5002,
            "level_id": 1001,
            "resource_type": "article",
            "title": "Understanding TCP/IP and DNS",
            "overview": "Core networking concepts for sysadmins.",
            "status": "completed"
          }
        ]
      },
      {
        "id": 1002,
        "track_id": 101,
        "level_number": 2,
        "title": "Containerization (Docker)",
        "resources": [
          {
            "id": 5003,
            "level_id": 1002,
            "resource_type": "video",
            "title": "Docker in 100 Seconds",
            "overview": "Quick overview of images, containers, and volumes.",
            "status": "in_progress"
          },
          {
            "id": 5004,
            "level_id": 1002,
            "resource_type": "certification",
            "title": "Docker Certified Associate",
            "overview": "Official certification preparation.",
            "status": "not_started"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "track_id": 102,
    "name": "Backend Engineer",
    "overview": "Build scalable APIs, design efficient database schemas, and master server-side architecture using Python and Postgres.",
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    "current_level": 1,
    "progressPercentage": 15,
    "overallProgress": 15,
    "levels": [
      {
        "id": 2001,
        "track_id": 102,
        "level_number": 1,
        "title": "API Design & FastAPI",
        "resources": [
          {
            "id": 6001,
            "level_id": 2001,
            "resource_type": "video",
            "title": "FastAPI Crash Course",
            "overview": "Setting up routers, dependencies, and Pydantic schemas.",
            "status": "completed"
          },
          {
            "id": 6002,
            "level_id": 2001,
            "resource_type": "article",
            "title": "RESTful API Best Practices",
            "overview": "Status codes, standard methods, and pagination.",
            "status": "not_started"
          }
        ]
      }
    ]
  }
];



  useEffect(() => {
    // Simulate fetching track data by ID
    const fetchTrack = async () => {
      // In production: await fetch(`/api/tracks/${trackId}`)
      await new Promise(resolve => setTimeout(resolve, 400)); // fake network delay
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
          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl">
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
        </div>

        {/* The 5 Levels Matrix */}
        <div className="space-y-8">
          {trackData.levels.map((level, index) => (
            <motion.div 
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-100 rounded-xl p-6 bg-gray-50/50"
            >
              <div className="mb-4 border-b border-gray-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                  Level {level.level_number}
                </span>
                <h2 className="text-xl font-bold text-gray-800 mt-1">{level.title}</h2>
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
                        : 'bg-white border-gray-200 shadow-sm'
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