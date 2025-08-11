import { Metadata } from "next";
import { Music, Heart, Shield, Users, Target, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros - Kaos Ekaitza",
  description:
    "Conoce la historia, misión y valores del canal ska-punk antifascista Kaos Ekaitza. Nuestra lucha por la justicia social a través de la música.",
};

export default function SobreNosotrosPage() {
  const valores = [
    {
      icon: Shield,
      title: "Antifascismo",
      description:
        "Creemos firmemente en la resistencia pacífica contra toda forma de fascismo y opresión. Nuestra música es un grito de libertad.",
    },
    {
      icon: Heart,
      title: "Paz y Amor",
      description:
        "Promovemos el cambio social a través del amor, la comprensión y la no violencia. La música es nuestro lenguaje de paz.",
    },
    {
      icon: Users,
      title: "Comunidad",
      description:
        "Construimos una comunidad inclusiva donde todas las personas son bienvenidas, sin importar su origen, género u orientación.",
    },
    {
      icon: Globe,
      title: "Justicia Global",
      description:
        "Luchamos por los derechos humanos y la justicia social en todo el mundo. Los problemas globales requieren solidaridad global.",
    },
  ];

  const historia = [
    {
      año: "2023",
      evento: "Fundación de Kaos Ekaitza",
      descripcion:
        "Nace nuestro proyecto musical con la misión de combinar ska-punk con mensaje social antifascista.",
    },
    {
      año: "2024",
      evento: "Álbum Principal: 'Kaos Ekaitza'",
      descripcion:
        "Lanzamos nuestro trabajo discográfico principal con temas que definen nuestra identidad musical ska-punk antifascista.",
    },
    {
      año: "2023",
      evento: "Primera colaboración",
      descripcion:
        "Colaboramos con artistas antifascistas europeos en el proyecto 'Voces Unidas'.",
    },
    {
      año: "2024",
      evento: "Álbum 'Voces de Resistencia'",
      descripcion:
        "Nuestro trabajo más maduro hasta la fecha, con 5 temas que profundizan en la resistencia pacífica.",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-punk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Somos más que una banda. Somos un movimiento de resistencia pacífica
            que utiliza el ska-punk como herramienta de transformación social.
          </p>
        </div>
      </section>

      {/* Misión Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="ska-stripes-horizontal h-2 w-32 mx-auto mb-6 rounded"></div>
            <h2 className="text-4xl font-black text-white mb-8">
              Nuestra <span className="text-red-500">Misión</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                ¿Quiénes Somos?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Kaos Ekaitza es un canal musical ska-punk nacido de la
                convicción de que la música puede ser una poderosa herramienta
                de cambio social. Combinamos la energía y la rebeldía del
                ska-punk con mensajes de resistencia pacífica, antifascismo y
                justicia social.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nuestro nombre refleja nuestra esencia: &ldquo;Kaos&rdquo;
                representa la ruptura con las estructuras opresivas, mientras
                que &ldquo;Ekaitza&rdquo; (tormenta en euskera) simboliza la
                fuerza transformadora de nuestro mensaje.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Creemos firmemente que la verdadera revolución se hace desde el
                corazón, con amor, comprensión y respeto por la diversidad
                humana.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-red-500 mr-3" />
                  <h4 className="text-xl font-bold text-white">
                    Nuestro Objetivo
                  </h4>
                </div>
                <p className="text-gray-300">
                  Crear una comunidad global unida por la música consciente,
                  donde el ska-punk sea el vehículo para promover la paz, la
                  justicia y la resistencia pacífica.
                </p>
              </div>

              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Music className="w-8 h-8 text-red-500 mr-3" />
                  <h4 className="text-xl font-bold text-white">
                    Nuestra Música
                  </h4>
                </div>
                <p className="text-gray-300">
                  Cada canción es una declaración de principios. Combinamos
                  ritmos ska-punk con letras que inspiran, educan y movilizan
                  hacia un mundo más justo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-8">
              Nuestros <span className="text-red-500">Valores</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Los principios que guían cada acorde, cada letra y cada decisión
              que tomamos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valores.map((valor, index) => {
              const IconComponent = valor.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-8 punk-hover group"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                      {valor.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {valor.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-8">
              Nuestra <span className="text-red-500">Historia</span>
            </h2>
            <p className="text-xl text-gray-300">
              El camino que nos ha llevado hasta aquí.
            </p>
          </div>

          <div className="space-y-8">
            {historia.map((momento, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 bg-black border border-gray-800 rounded-lg p-6 punk-hover group"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                    <span className="text-white font-black text-xl">
                      {momento.año}
                    </span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                    {momento.evento}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {momento.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-punk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            ¡Forma Parte del Movimiento!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            La revolución musical necesita tu voz. Únete a nuestra comunidad y
            ayúdanos a construir un mundo más justo a través del ska-punk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contacto" className="btn-punk">
              Contáctanos
            </a>
            <a
              href="/album"
              className="btn-punk-outline text-white border-white hover:bg-white hover:text-black"
            >
              Escucha Nuestra Música
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
