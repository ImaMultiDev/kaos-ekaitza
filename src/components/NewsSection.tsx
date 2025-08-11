"use client";

import { Calendar } from "lucide-react";

const NewsSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="ska-stripes-horizontal h-2 w-32 mx-auto mb-6 rounded"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Últimas <span className="text-red-500">Noticias</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mantente al día con nuestras últimas actividades, lanzamientos y
            eventos. Siempre comprometidos con la música consciente y el cambio
            social.
          </p>
        </div>

        {/* Mensaje de próximamente */}
        <div className="text-center mb-12">
          <div className="bg-black border border-gray-800 rounded-lg p-12 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Próximamente</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Estamos preparando contenido real y auténtico para compartir
              contigo. Noticias sobre nuestros próximos lanzamientos, conciertos
              y actividades estarán disponibles muy pronto.
            </p>
            <div className="ska-stripes h-2 w-32 mx-auto mb-4 rounded"></div>
            <p className="text-red-400 text-sm font-medium">
              Mientras tanto, disfruta de nuestra música y mantente atento a las
              novedades
            </p>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="bg-gradient-punk rounded-lg p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¡Mantente Informado!
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter para recibir las últimas noticias,
            lanzamientos musicales y información sobre eventos directamente en
            tu correo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="btn-punk-outline text-white border-white hover:bg-white hover:text-black">
              Suscribirse
            </button>
          </div>

          <p className="text-white/70 text-xs mt-4">
            Respetamos tu privacidad. Puedes cancelar la suscripción en
            cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
