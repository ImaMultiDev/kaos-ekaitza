"use client";

import { Shield, Users, Globe, Music } from "lucide-react";
import { useTranslations } from "next-intl";

const PhilosophySection = () => {
  const t = useTranslations("Philosophy");

  const principles = [
    {
      icon: Shield,
      title: t("p1Title"),
      description: t("p1Desc"),
      color: "from-red-600 to-red-700",
    },
    {
      icon: Users,
      title: t("p2Title"),
      description: t("p2Desc"),
      color: "from-gray-800 to-black",
    },
    {
      icon: Globe,
      title: t("p3Title"),
      description: t("p3Desc"),
      color: "from-red-700 to-black",
    },
    {
      icon: Music,
      title: t("p4Title"),
      description: t("p4Desc"),
      color: "from-black to-red-600",
    },
  ];

  return (
    <section id="filosofia" className="hidden md:block py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="ska-stripes-horizontal h-2 w-32 mx-auto mb-6 rounded"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {t("titlePart1")}{" "}
            <span className="text-red-500">{t("titlePart2")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {principles.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <div
                key={index}
                className="group relative bg-black border border-gray-800 rounded-lg p-8 punk-hover overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${principle.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {principle.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 ska-stripes-horizontal opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        <div className="text-center bg-gradient-punk rounded-lg p-12">
          <blockquote className="text-2xl md:text-3xl font-bold text-white mb-6 italic">
            &ldquo;{t("blockquote")}&rdquo;
          </blockquote>
          <cite className="text-red-300 font-semibold text-lg">{t("cite")}</cite>

          <div className="ska-stripes h-1 w-48 mx-auto mt-8 rounded opacity-60"></div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
