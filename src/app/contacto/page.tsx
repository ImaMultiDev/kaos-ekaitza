import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone, Instagram, Youtube } from "lucide-react";

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
      info: "imanol@kaosekaitza.com",
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
    /*{
      icon: Facebook,
      name: "Facebook",
      url: "#",
      color: "hover:text-blue-500",
    },*/
    /*{
      icon: Twitter,
      name: "Twitter",
      url: "#",
      color: "hover:text-blue-400",
    },*/
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/kaosekaitza/",
      color: "hover:text-pink-500",
    },
    {
      icon: Youtube,
      name: "YouTube",
      url: "https://www.youtube.com/@KaosEkaitza",
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
