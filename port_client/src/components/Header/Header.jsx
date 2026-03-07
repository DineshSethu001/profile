import { Typewriter } from "react-simple-typewriter";
import AvatarOrbit from "./AvatarOrbit";
import GalaxyBackground from "./GalaxyBackground";
import ShootingStars from "./ShootingStars";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden
      bg-gradient-to-br from-[#020617] via-[#020024] to-black text-white"
    >

      {/* Nebula background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute w-[700px] h-[700px] bg-purple-600/20 blur-[150px] rounded-full top-[-250px] left-[-200px]" />

        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full bottom-[-200px] right-[-150px]" />

        <div className="absolute w-[400px] h-[400px] bg-cyan-400/10 blur-[140px] rounded-full top-[30%] left-[40%]" />

      </div>

      <GalaxyBackground />
      <ShootingStars />

      <div className="relative z-10 grid md:grid-cols-2 w-full px-8 md:px-20 lg:px-28 items-center gap-16">

        {/* LEFT SIDE — AVATAR ORBIT */}

        <div className="flex justify-center md:justify-start">
          <AvatarOrbit />
        </div>



        {/* RIGHT SIDE — CONTENT */}

        <div className="flex flex-col gap-7 text-center md:text-left">

          {/* Name */}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">

            Player: <span className="text-cyan-400">Dinesh Thanigaivel</span> 👋

          </h1>



          {/* Typing animation */}

          <h2 className="text-xl md:text-2xl text-gray-300 font-medium">

            <Typewriter
              words={[
                "Level: MERN Stack Developer",
                "Skill: React Frontend Developer",
                "Skill: Node.js Backend Developer",
                "Building Scalable Web Applications"
              ]}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={2000}
            />

          </h2>



          {/* Tech Icons */}

          <div className="flex justify-center md:justify-start gap-6 mt-3">

            {[
              "/images/mongo.png",
              "/images/express.png",
              "/images/react.png",
              "/images/node.png"
            ].map((icon, i) => (

              <motion.img
                key={i}
                src={icon}
                className="w-12"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />

            ))}

          </div>



          {/* Mission */}

          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">

            Mission: Build fast, scalable web applications using the MERN stack
            and help startups transform ideas into real digital products with
            modern UI, clean architecture, and high performance.

          </p>



          {/* CTA Buttons */}

          <div className="flex flex-wrap justify-center md:justify-start gap-5 pt-3">

            <a
              href="#contact"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500
              rounded-full font-medium hover:scale-105 transition shadow-lg"
            >
              🚀 Start Mission
            </a>

            <a
              href="/images/Dinesh_T.pdf"
              className="px-8 py-3 border border-gray-500 rounded-full
              hover:bg-white hover:text-black transition"
            >
              📜 Skill Scroll
            </a>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Header;