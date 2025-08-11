import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto - Kaos Ekaitza",
  description:
    "Ponte en contacto con Kaos Ekaitza. Colaboraciones, preguntas o simplemente para conectar con nuestra comunidad ska-punk antifascista.",
};

export default function ContactoPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "info@kaosekaitza.com",
      description: "Para colaboraciones, preguntas o cualquier consulta",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      info: "España",
      description: "Nuestra música viaja por todo el mundo",
    },
    {
      icon: Phone,
      title: "Redes Sociales",
      info: "Síguenos",
      description: "Mantente conectado con nuestra comunidad",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "#",
      color: "hover:text-blue-500",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "#",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "#",
      color: "hover:text-pink-500",
    },
    {
      icon: Youtube,
      name: "YouTube",
      url: "#",
      color: "hover:text-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-punk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Contacto
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            ¿Tienes una propuesta? ¿Quieres colaborar? ¿Simplemente quieres
            saludar? Nos encanta conectar con nuestra comunidad ska-punk.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-black text-white mb-4">
                  Envíanos un <span className="text-red-500">Mensaje</span>
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Completa el formulario y nos pondremos en contacto contigo lo
                  antes posible. Todas las consultas son importantes para
                  nosotros.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black text-white mb-8">
                  Otras Formas de{" "}
                  <span className="text-red-500">Contactar</span>
                </h2>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gray-900 border border-gray-800 rounded-lg p-6 punk-hover group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                            {contact.title}
                          </h3>
                          <p className="text-red-500 font-semibold">
                            {contact.info}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {contact.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Media */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Síguenos en Redes Sociales
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className={`flex items-center space-x-3 p-3 rounded-lg bg-black hover:bg-gray-800 text-gray-400 ${social.color} transition-all duration-300 group`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-punk rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Newsletter
                </h3>
                <p className="text-white/90 mb-4 text-sm">
                  Suscríbete para recibir nuestras últimas canciones y noticias.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="flex-grow px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                  />
                  <button className="btn-punk-outline text-white border-white hover:bg-white hover:text-black text-sm">
                    Suscribirse
                  </button>
                </div>
              </div>

              {/* Collaboration Info */}
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  ¿Interesado en Colaborar?
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Siempre estamos abiertos a colaboraciones con artistas que
                  compartan nuestros valores de justicia social y antifascismo.
                </p>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Colaboraciones musicales</li>
                  <li>• Eventos y conciertos solidarios</li>
                  <li>• Proyectos de arte y resistencia</li>
                  <li>• Iniciativas comunitarias</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-6">
              Preguntas <span className="text-red-500">Frecuentes</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                pregunta: "¿Están disponibles para conciertos?",
                respuesta:
                  "Sí, estamos abiertos a tocar en eventos que compartan nuestros valores de justicia social y resistencia pacífica.",
              },
              {
                pregunta: "¿Cómo puedo usar su música en mi proyecto?",
                respuesta:
                  "Contacta con nosotros para discutir el uso de nuestra música. Somos flexibles con proyectos que promuevan valores similares a los nuestros.",
              },
              {
                pregunta: "¿Aceptan demos de otros artistas?",
                respuesta:
                  "Siempre estamos interesados en escuchar a artistas comprometidos con el cambio social. Envíanos tu material.",
              },
              {
                pregunta: "¿Organizan eventos comunitarios?",
                respuesta:
                  "Sí, regularmente organizamos eventos solidarios y comunitarios. Síguenos en redes sociales para estar al día.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-lg p-6 punk-hover"
              >
                <h3 className="text-lg font-bold text-white mb-3">
                  {faq.pregunta}
                </h3>
                <p className="text-gray-300">{faq.respuesta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
