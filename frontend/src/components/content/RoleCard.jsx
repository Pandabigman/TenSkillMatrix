import React from 'react';
import { motion } from 'framer-motion';

const RoleCard = ({ title, overview, progress, imageUrl, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="min-w-[320px] max-w-[320px] bg-white rounded-2xl shadow-sm border border-emerald-100 cursor-pointer flex flex-col transition-shadow hover:shadow-md overflow-hidden"
    >
      {/* New Image Banner */}
      {imageUrl && (
        <div className="h-32 w-full bg-gray-200 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-3 mt-2 leading-relaxed">
          {overview}
        </p>
      </div>

      
      <div className="mt-auto pt-4">
        <div className="flex justify-between items-center text-sm font-semibold text-emerald-700 mb-2">
          <span>Overall Progress</span>
          <span>{progress}%</span>
        </div>
        
        {/* Progress Bar Background */}
        <div className="h-2.5 w-full bg-emerald-50 rounded-full overflow-hidden">
          {/* Animated Progress Fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-emerald-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RoleCard;