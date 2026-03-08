import { motion } from "framer-motion";

const Service = () => {

  const services = [
    {
      icon: "⚛️",
      title: "Frontend Development",
      desc: "Modern React UI with Tailwind, responsive layouts, and smooth animations."
    },
    {
      icon: "🧠",
      title: "MERN Stack Apps",
      desc: "Full-stack apps with Node.js, MongoDB, APIs, authentication, and dashboards."
    },
    {
      icon: "🎨",
      title: "UI to Code",
      desc: "Convert Figma or design files into clean, scalable React components."
    },
    {
      icon: "🚀",
      title: "SaaS MVP",
      desc: "Build startup MVP products quickly with scalable architecture."
    }
  ];

  return (
    <section
      id="service"
      className="py-24 bg-[var(--primary-color)] relative"
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          What I Can Help You With
        </motion.h2>

        <p className="text-center text-gray-500 mb-14">
          Services tailored for startups, founders, and businesses
        </p>



        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="
              bg-white/80 backdrop-blur-xl
              border border-gray-200
              p-8 rounded-2xl
              shadow-md hover:shadow-xl
              transition duration-300
              flex flex-col items-start gap-3
              "
            >

              <div className="text-4xl">
                {service.icon}
              </div>

              <h3 className="text-lg font-semibold">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Service;