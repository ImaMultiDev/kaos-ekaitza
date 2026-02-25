import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import {
  Mail,
  MapPin,
  Handshake,
  Instagram,
  Youtube,
  CloudLightning,
} from "lucide-react";
import { socialConfig } from "@/lib/social";

export const metadata: Metadata = {
  title: "Contacto - Kaos Ekaitza | Conecta con Nuestra Comunidad Ska-Punk",
  description:
    "Ponte en contacto con Kaos Ekaitza para colaboraciones, preguntas o simplemente para conectar con nuestra comunidad ska-punk antifascista. Únete a la revolución musical.",
  keywords: [
    "contacto kaos ekaitza",
    "colaboraciones ska-punk",
    "comunidad antifascista",
    "música consciente",
    "ska-punk colaboraciones",
    "contactar kaos ekaitza",
    "música comprometida",
  ],
  openGraph: {
    title: "Contacto - Kaos Ekaitza | Conecta con Nuestra Comunidad Ska-Punk",
    description:
      "Ponte en contacto con Kaos Ekaitza para colaboraciones, preguntas o simplemente para conectar con nuestra comunidad ska-punk antifascista.",
    url: "https://kaosekaitza.com/contacto",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto - Kaos Ekaitza | Conecta con Nuestra Comunidad Ska-Punk",
    description:
      "Ponte en contacto con Kaos Ekaitza para colaboraciones y conectar con nuestra comunidad ska-punk antifascista.",
  },
};

export default function ContactoPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "contact@kaosekaitza.com",
      description: "Para colaboraciones, preguntas o cualquier consulta",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      info: "Nafarroa",
      description: "La tormenta no entiende de fronteras",
    },
    {
      icon: Handshake,
      title: "Contratación",
      info: "Próximamente",
      description: "Esta información estará disponible muy pronto",
    },
  ];

  const socialLinks = [
    {
      icon: "instagram",
      name: "Instagram",
      url: socialConfig.social.instagram,
      color: "hover:text-pink-500",
    },
    {
      icon: "youtube",
      name: "YouTube",
      url: socialConfig.social.youtube,
      color: "hover:text-red-500",
    },
    {
      icon: "spotify",
      name: "Spotify",
      url: socialConfig.social.spotify,
      color: "hover:text-[#1DB954]",
    },
    {
      icon: "tiktok",
      name: "TikTok",
      url: socialConfig.social.tiktok,
      color: "hover:text-white",
    },
    {
      icon: "ekaitzaren-begia",
      name: "Ekaitzaren Begia",
      url: socialConfig.social.ekaitzarenBegia,
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
            ¿Tienes una consulta? ¿Tienes una propuesta? ¿Quieres colaborar?
            ¿Simplemente quieres saludar? <br />
            Nos encanta conectar con nuestra comunidad.
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
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-3 rounded-lg bg-black hover:bg-gray-800 text-gray-400 ${social.color} transition-all duration-300 group`}
                    >
                      {social.icon === "instagram" && (
                        <Instagram className="w-5 h-5" />
                      )}
                      {social.icon === "youtube" && (
                        <Youtube className="w-5 h-5" />
                      )}
                      {social.icon === "spotify" && (
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      )}
                      {social.icon === "tiktok" && (
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      )}
                      {social.icon === "ekaitzaren-begia" && (
                        <CloudLightning className="w-5 h-5" />
                      )}
                      <span className="font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
