import { motion } from "framer-motion";

const ShootingStars = () => {

  const stars = Array.from({ length: 6 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {stars.map((_, i) => (

        <motion.span
          key={i}
          className="absolute w-[2px] h-[80px] bg-white rounded-full opacity-70"
          style={{
            top: `${Math.random()*60}%`,
            left: `${Math.random()*100}%`,
          }}
          animate={{
            x: [0, -400],
            y: [0, 200],
            opacity: [0,1,0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: Math.random()*8
          }}
        />

      ))}

    </div>
  );
};

export default ShootingStars;