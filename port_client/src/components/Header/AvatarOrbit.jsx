import { motion, useMotionValue, useTransform } from "framer-motion";

const AvatarOrbit = () => {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [12, -12]);
  const rotateY = useTransform(mouseX, [-150, 150], [-12, 12]);

  const handleMouseMove = (e) => {

    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (

    <motion.div
      onMouseMove={handleMouseMove}
      style={{ perspective: 800 }}
      className="relative w-[360px] h-[360px] flex items-center justify-center"
    >

      {/* Nebula Glow */}

      <div className="absolute w-[340px] h-[340px] rounded-full bg-blue-500/20 blur-3xl"></div>


      {/* Orbit Rings */}

      <div className="absolute w-[320px] h-[320px] rounded-full border border-cyan-400/30"></div>

      <div className="absolute w-[250px] h-[250px] rounded-full border border-white/10"></div>

      <div className="absolute w-[180px] h-[180px] rounded-full border border-white/10"></div>



      {/* Avatar */}

      <motion.div
        style={{ rotateX, rotateY }}
        animate={{
          borderRadius: [
            "60% 40% 30% 70%",
            "30% 60% 70% 40%",
            "60% 40% 30% 70%"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="relative w-48 h-48 overflow-hidden border-4 border-white shadow-xl z-10"
      >
        <img
          src="/images/author.png"
          alt="author"
          className="w-full h-full object-cover"
        />
      </motion.div>



      {/* React Planet */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="absolute w-[320px] h-[320px] flex items-start justify-center"
        style={{ rotateX, rotateY }}
      >
        <img
          src="/images/react.png"
          alt="react"
          className="w-12 hover:scale-110 transition"
        />
      </motion.div>



      {/* Node Planet */}

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        className="absolute w-[250px] h-[250px] flex items-center justify-end"
        style={{ rotateX, rotateY }}
      >
        <img
          src="/images/node.png"
          alt="node"
          className="w-12 hover:scale-110 transition"
        />
      </motion.div>



      {/* Mongo Planet */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
        className="absolute w-[320px] h-[320px] flex items-end justify-center"
        style={{ rotateX, rotateY }}
      >
        <img
          src="/images/mongo.png"
          alt="mongo"
          className="w-12 hover:scale-110 transition"
        />
      </motion.div>



      {/* Express Planet */}

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute w-[250px] h-[250px] flex items-center justify-start"
        style={{ rotateX, rotateY }}
      >
        <img
          src="/images/express.png"
          alt="express"
          className="w-12 hover:scale-110 transition"
        />
      </motion.div>

    </motion.div>

  );
};

export default AvatarOrbit;