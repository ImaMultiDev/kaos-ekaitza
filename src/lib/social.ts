// Social Media Configuration
export const socialConfig = {
  name: "Kaos Ekaitza",
  description:
    "Canal musical ska-punk antifascista que promueve la resistencia pacífica y la justicia social",
  url: "https://kaosekaitza.com",
  logo: "/logo-512.png",
  logo192: "/logo-192.png",
  themeColor: "#dc2626",
  backgroundColor: "#000000",

  // Social Media URLs
  social: {
    facebook:
      "https://www.facebook.com/people/Kaos-Ekaitza/pfbid02XLgEadZn5SHcrMH4UgCEaKUjd911vZmy1NSF58EV3aoAdyij9sX6NyDmJdTLtocul/",
    youtube: "https://www.youtube.com/@KaosEkaitza",
    spotify: "https://open.spotify.com/intl-es/artist/1reWo4KzVQLgqOwNXrVgr4",
    instagram: "https://www.instagram.com/kaosekaitza/",
    tiktok: "https://www.tiktok.com/@kaos_ekaitza",
    ekaitzarenBegia: "https://kaosekaitza.carrd.co/",
  },

  // Hashtags recomendados para redes sociales
  hashtags: [
    "#KaosEkaitza",
    "#SkaPunk",
    "#Antifascista",
    "#MúsicaConsciente",
    "#ResistenciaPacífica",
    "#JusticiaSocial",
    "#SkaPunkAntifascista",
    "#MúsicaProtesta",
    "#RockComprometido",
    "#MúsicaSocial",
  ],

  // Mensajes para compartir en redes sociales
  shareMessages: {
    default:
      "🎵 Descubre la música consciente de Kaos Ekaitza - NAFARROA que lucha por la justicia social 🎵",
    music:
      "🎵 Nueva música de Kaos Ekaitza - Ska-Punk con mensaje social y resistencia pacífica 🎵",
    philosophy:
      "💪 Conoce la filosofía de Kaos Ekaitza - Música como herramienta de cambio social 💪",
    community:
      "🤝 Únete a la comunidad Kaos Ekaitza - Unidos por la música y la justicia social 🤝",
  },
};

// Función para generar enlaces de compartir
export const generateShareUrl = (
  platform: string,
  url: string,
  text: string,
) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${socialConfig.hashtags.join(
        ",",
      )}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    case "telegram":
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    default:
      return url;
  }
};
