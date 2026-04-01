import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Service = () => {

const services = [
  {
    icon: "⚛️",
    title: "Frontend Development",
    desc: "I build fast, responsive, and visually engaging interfaces that keep users hooked and turn visits into real engagement."
  },
  {
    icon: "🧠",
    title: "MERN Stack Apps",
    desc: "From idea to deployment, I develop scalable full-stack applications with clean architecture, secure APIs, and smooth user experience."
  },
  {
    icon: "🎨",
    title: "UI to Code",
    desc: "I transform Figma designs into pixel-perfect, production-ready React code that’s clean, reusable, and built to scale."
  },
  {
    icon: "🚀",
    title: "SaaS MVP",
    desc: "Launch your startup faster with a powerful MVP built to validate ideas, attract users, and impress investors."
  },
  {
    icon: "📢",
    title: "Social Media Ads",
    desc: "I create scroll-stopping ad campaigns that increase reach, drive clicks, and convert attention into paying customers."
  },
  {
    icon: "🌐",
    title: "Website Development",
    desc: "Modern, high-performance websites designed to build trust, rank on search engines, and convert visitors into clients."
  },
  {
    icon: "🎬",
    title: "Video Editing",
    desc: "Engaging videos crafted for reels, ads, and promotions that capture attention instantly and keep your audience watching."
  }
];

  const [active, setActive] = useState(0);

  // 🔁 Auto move left → right
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 2500); // speed control

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[var(--primary-color)] overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What I Can Help You With
        </h2>

        <p className="text-gray-500 mb-14">
          Services tailored for startups, founders, and businesses
        </p>

        {/* Carousel */}
        <div className="relative h-[350px] flex items-center justify-center">

          {services.map((service, i) => {

            const offset =
              (i - active + services.length) % services.length;

            // keep values in range [-3,3]
            const position =
              offset > services.length / 2
                ? offset - services.length
                : offset;

            return (
              <motion.div
                key={i}
                animate={{
                  y: position * 260, // horizontal movement
                  scale: position === 0 ? 1.15 : 0.8, // 🔥 zoom center
                  opacity: position === 0 ? 1 : 0,
                  zIndex: position === 0 ? 10 : 1
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="
                  absolute w-[360px] 
                  bg-white/80 backdrop-blur-xl
                  border border-gray-200
                  p-6 rounded-2xl
                  shadow-lg
                "
              >

                <div className="text-3xl mb-2">
                  {service.icon}
                </div>

                <h3 className="font-semibold text-lg mb-1">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {service.desc}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Service;