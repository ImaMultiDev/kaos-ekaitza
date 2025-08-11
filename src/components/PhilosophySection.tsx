import { Shield, Users, Globe, Music } from "lucide-react";

const PhilosophySection = () => {
  const principles = [
    {
      icon: Shield,
      title: "Resistencia Pacífica",
      description:
        "Creemos en la resistencia no violenta como forma de cambio social. La música es nuestro escudo contra la injusticia.",
      color: "from-red-600 to-red-700",
    },
    {
      icon: Users,
      title: "Inclusión y Diversidad",
      description:
        "Nuestro espacio es seguro para todas las personas, sin importar su origen, género, orientación o creencias.",
      color: "from-gray-800 to-black",
    },
    {
      icon: Globe,
      title: "Justicia Social",
      description:
        "Luchamos por los derechos humanos, la igualdad y un mundo más justo para todas las personas.",
      color: "from-red-700 to-black",
    },
    {
      icon: Music,
      title: "Música Consciente",
      description:
        "El ska-punk es nuestro vehículo para transmitir mensajes de esperanza, resistencia y transformación social.",
      color: "from-black to-red-600",
    },
  ];

  return (
    <section id="filosofia" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="ska-stripes-horizontal h-2 w-32 mx-auto mb-6 rounded"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Nuestra <span className="text-red-500">Filosofía</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Más que música, somos un movimiento. Creemos en el poder
            transformador del ska-punk para construir un mundo más justo,
            inclusivo y libre de fascismo.
          </p>
        </div>

        {/* Principios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {principles.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <div
                key={index}
                className="group relative bg-black border border-gray-800 rounded-lg p-8 punk-hover overflow-hidden"
              >
                {/* Gradiente de fondo */}
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

                {/* Borde ska */}
                <div className="absolute bottom-0 left-0 w-full h-1 ska-stripes-horizontal opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Mensaje inspiracional */}
        <div className="text-center bg-gradient-punk rounded-lg p-12">
          <blockquote className="text-2xl md:text-3xl font-bold text-white mb-6 italic">
            &ldquo;La música tiene el poder de unir a las personas, de despertar
            conciencias y de plantar las semillas del cambio social.&rdquo;
          </blockquote>
          <cite className="text-red-300 font-semibold text-lg">
            - Filosofía Kaos Ekaitza
          </cite>

          {/* Separador ska */}
          <div className="ska-stripes h-1 w-48 mx-auto mt-8 rounded opacity-60"></div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
