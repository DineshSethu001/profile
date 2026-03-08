import { motion } from "framer-motion";
import { infoList } from "../data/infoList";
import { toolsData } from "../data/toolsData";

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full py-20 flex justify-center bg-[var(--secondary-color)]"
    >
      <div className="w-[92%] max-w-7xl bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-lg">

        {/* Section title */}

        <div className="text-center mb-12">

          <h4 className="text-gray-500 text-lg">
            Introduction
          </h4>

          <h2 className="text-4xl font-bold">
            About Me
          </h2>

        </div>



        <div className="grid lg:grid-cols-3 gap-10 items-center">

          {/* LEFT - INFO CARDS */}

          <div className="grid gap-6">

            {infoList.map(({ icon, title, description }, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg transition"
              >

                <img src={icon} alt={title} className="w-7 mb-3" />

                <h3 className="font-semibold text-lg mb-1">
                  {title}
                </h3>

                <p className="text-sm text-gray-600">
                  {description}
                </p>

              </motion.div>

            ))}

          </div>



          {/* CENTER - PROFILE */}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >

            <img
              src="/images/author.png"
              alt="Author"
              className="w-64 rounded-3xl shadow-xl"
            />

            <p className="mt-6 text-gray-600 max-w-sm">

              I'm a MERN Stack Developer passionate about building modern
              web applications with clean UI, scalable architecture,
              and high performance.

            </p>

            <p className="mt-3 text-indigo-700 font-medium">

              I enjoy solving real problems and helping startups launch faster.

            </p>

          </motion.div>



          {/* RIGHT - TOOLS */}

          <div>

            <h3 className="text-xl font-semibold mb-6 text-center">
              Tools I Use
            </h3>

            <div className="grid grid-cols-4 gap-4">

              {toolsData.map((tool, index) => (

                <motion.div
                  key={index}
                  whileHover={{ scale: 1.15 }}
                  className="flex items-center justify-center p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
                >

                  <img
                    src={tool}
                    alt="tool"
                    className="w-7"
                  />

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;