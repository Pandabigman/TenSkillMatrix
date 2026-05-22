import React from 'react';
import { motion } from 'framer-motion';
import RoleCard from './RoleCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const SkillsCarousel = ({ enrolledTracks, onRoleSelect }) => {
  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold text-white-800 mb-6 px-4 md:px-8">
        Your Career Tracks
      </h2>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex gap-6 overflow-x-auto pb-8 px-4 md:px-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
      >
        {enrolledTracks.map((track) => (
          <motion.div key={track.id} variants={itemVariants} className="snap-start">
            <RoleCard
              title={track.name}
              overview={track.overview}
              progress={track.progressPercentage} 
              imageUrl={track.imageUrl} // <-- THIS is required for the image to pass down
              onClick={() => onRoleSelect(track.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsCarousel;