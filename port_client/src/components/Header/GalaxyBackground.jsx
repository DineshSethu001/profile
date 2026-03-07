import { motion } from "framer-motion";
import { useMemo } from "react";

const GalaxyBackground = () => {

  const stars = useMemo(() => {

    return Array.from({ length: 120 }).map(() => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3
    }));

  }, []);

  return (

    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">

      {stars.map((star, i) => (

        <motion.span
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.top}%`,
            left: `${star.left}%`
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity
          }}
        />

      ))}

    </div>

  );
};

export default GalaxyBackground;