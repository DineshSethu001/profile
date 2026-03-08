import { Typewriter } from "react-simple-typewriter";
import AvatarOrbit from "./AvatarOrbit";
import GalaxyBackground from "./GalaxyBackground";
import ShootingStars from "./ShootingStars";
import { motion } from "framer-motion";

const Header = () => {

  const techIcons = [
    "/images/mongo.png",
    "/images/express.png",
    "/images/react.png",
    "/images/node.png"
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#020617] via-[#020024] to-black text-white overflow-hidden"
    >

      {/* Space Background */}

      <GalaxyBackground />
      <ShootingStars />

      <div className="absolute inset-0 -z-10">

        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full top-[-200px] left-[-150px]" />

        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full bottom-[-150px] right-[-100px]" />

      </div>



      {/* Main Container */}

      <div className="w-[92%] max-w-7xl grid lg:grid-cols-3 gap-8 items-center">

        {/* LEFT CARD */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10
          rounded-3xl p-8 flex flex-col gap-6"
        >

          <h3 className="text-lg text-gray-400">
            Welcome 👋
          </h3>

          <h1 className="text-4xl font-bold leading-tight">

            Dinesh
            <span className="text-cyan-400"> Thanigaivel</span>

          </h1>

          <p className="text-gray-400">

            Building scalable digital products and modern web experiences.

          </p>

          <div className="flex gap-4 flex-wrap">

            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
            >
              Hire Me
            </a>

            <a
              href="/images/Dinesh_T.pdf"
              className="px-6 py-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
            >
              Resume
            </a>

          </div>

        </motion.div>



        {/* CENTER CARD — AVATAR */}

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex justify-center"
        >

          <AvatarOrbit />

        </motion.div>



        {/* RIGHT CARD */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10
          rounded-3xl p-8 flex flex-col gap-6"
        >

          <h2 className="text-2xl font-semibold text-cyan-400">

            <Typewriter
              words={[
                "MERN Stack Developer",
                "React Frontend Developer",
                "Node.js Backend Developer",
                "Full Stack Web Engineer"
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

          <div className="flex gap-5">

            {techIcons.map((icon, i) => (

              <motion.img
                key={i}
                src={icon}
                className="w-12"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />

            ))}

          </div>



          <p className="text-gray-400 leading-relaxed">

            Mission: Build high performance web applications using the MERN
            stack and help startups turn ideas into scalable products.

          </p>

        </motion.div>

      </div>

    </section>
  );

};

export default Header;