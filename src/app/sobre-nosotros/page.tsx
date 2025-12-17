import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Disc, Radio, Waves, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros - Kaos Ekaitza | Manifiesto Ska-Punk Antifascista",
  description:
    "Conoce el manifiesto de Kaos Ekaitza: origen en Navarra, fases 2025-2026, territorio, comunidad y compromiso antifascista. Tormenta colectiva de ska-punk.",
  keywords: [
    "kaos ekaitza",
    "ska-punk",
    "antifascista",
    "navarra",
    "manifiesto",
    "punk",
    "resistencia",
    "tormenta",
  ],
  openGraph: {
    title: "Sobre Nosotros - Kaos Ekaitza | Manifiesto Ska-Punk Antifascista",
    description:
      "Manifiesto vivo de Kaos Ekaitza: origen, fases, territorio y compromiso antifascista.",
    url: "https://kaosekaitza.com/sobre-nosotros",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotros - Kaos Ekaitza | Manifiesto Ska-Punk Antifascista",
    description:
      "Manifiesto vivo de Kaos Ekaitza: origen, fases, territorio y compromiso antifascista.",
  },
};

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero - Manifiesto vivo */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-10">
          <div className="ska-stripes h-full w-full"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-4">
            Manifiesto vivo
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Kaos Ekaitza es tormenta colectiva.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Kaos Ekaitza es un proyecto musical antifascista nacido desde la
            periferia, desde el pueblo y desde la necesidad de alzar la voz
            cuando el silencio empieza a doler. Musicalmente se mueve entre el
            punk rock y el ska-punk, pero su identidad va más allá del estilo:
            es grito del pueblo, ruido con sentido y resistencia organizada. El
            nombre significa tormenta. No como destrucción vacía, sino como
            fuerza colectiva. La tormenta que nace cuando muchas voces deciden
            no callar más.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Radio className="w-5 h-5" />
              <span>Escuchar</span>
            </Link>
            <Link
              href="/contacto"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <Zap className="w-5 h-5" />
              <span>Contactar</span>
            </Link>
          </div>
        </div>
        <div className="ska-stripes-horizontal h-2 w-full"></div>
      </section>

      {/* Origen */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-[1.6fr,1fr] items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-3">
              Origen
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Verano de 2025. Navarra. Un monte. Una tormenta.
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                El proyecto nace en el verano de 2025, en Navarra, desde un
                pueblo pequeño. En un momento de soledad y oscuridad personal,
                la escritura y la música se convierten en refugio. Pero la
                tormenta no mira solo hacia dentro. Llega una conciencia clara:
                las preocupaciones personales, siendo reales, no son nada
                comparadas con el sufrimiento de quienes viven bajo guerras,
                ocupaciones, hambre o represión.{" "}
              </p>
              <p>
                Una noche, lejos de casa, me quedé en soledad contemplando una
                gran tormenta en medio del monte. Entonces entendí que mi pena
                era un lujo frente al dolor de quienes luchan cada día por
                sobrevivir. Ahí Kaos Ekaitza toma forma: la rabia deja de ser
                individual y se convierte en voz colectiva.
              </p>
            </div>
          </div>
          <div className="bg-black border border-gray-800 rounded-lg p-6 space-y-3">
            <p className="text-white font-black text-xl">En síntesis</p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <Disc className="w-4 h-4 text-red-500" />
                Verano 2025 · Navarra · Pueblo pequeño
              </li>
              <li className="flex items-center gap-2">
                <Disc className="w-4 h-4 text-red-500" />
                Oscuridad personal → conciencia global
              </li>
              <li className="flex items-center gap-2">
                <Disc className="w-4 h-4 text-red-500" />
                La rabia se vuelve voz colectiva
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fase 1 · Proyecto digital */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-3">
              Fase 1 · 2025
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-white">
              Proyecto digital, mensaje directo.
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
              <p className="text-white/80 leading-relaxed">
                Kaos Ekaitza comienza como un proyecto musical digital. Sin
                banda, sin escenario, pero con un sonido real y un mensaje
                directo. Las primeras canciones hablan de memoria histórica,
                antifascismo y resistencia. Desde Las Trece Rosas hasta “Tendrán
                que matarme”, el proyecto conecta con un contexto marcado por el
                resurgir del fascismo y la manipulación de la juventud.
              </p>
              <p className="text-white/80 leading-relaxed">
                Llegan canciones sobre Palestina, sobre la infancia robada,
                sobre el privilegio y la ceguera de quien no quiere mirar más
                allá. Letras incómodas, necesarias, que empiezan a tocar a mucha
                gente.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-3">
              <p className="text-white font-black text-lg">
                Sin banda, pero real
              </p>
              <p className="text-white/80 leading-relaxed">
                En esta fase no existe un plan para formar una banda. Existe el
                sueño, pero no la estructura. Kaos Ekaitza es conciencia,
                mensaje y acumulación de fuerza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* El salto */}
      <section className="py-12 gradient-punk">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h4 className="text-2xl md:text-3xl font-black text-white mb-3">
            La comunidad empuja el proyecto fuera de lo digital.
          </h4>
          <p className="text-white/90 max-w-3xl mx-auto">
            El cambio no nace tanto de mí como de la gente que apoya el
            proyecto. Seguidores, músicos y personas del entorno musical
            empiezan a decir lo mismo: esto no puede quedarse en digital. Muchos
            ya tratan Kaos Ekaitza como una banda real. Cuando la comunidad
            convierte el proyecto en algo compartido, deja de ser solo una idea
            y se transforma en responsabilidad.
          </p>
        </div>
      </section>

      {/* Fase 2 · La tormenta en la calle */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.6fr,1fr] items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-3">
              Fase 2 · 2026
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
              La tormenta en la calle.
            </h3>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Tras veinte canciones digitales, Kaos Ekaitza cierra su primera
                etapa. La Tormenta marca el final de una fase y el inicio de
                otra. Se forma una banda real en Navarra, con base en Iruña y
                pueblos de alrededor. Ocho personas unidas no por la fama, sino
                por el compromiso, el nivel musical y una identidad antifascista
                clara.
              </p>
              <p>
                La fase 2 es calle, conciertos, comunidad y ruido con sentido.
                Es llevar el mensaje al cuerpo, al sudor y al directo.
              </p>
            </div>
          </div>
          <div className="bg-black border border-gray-800 rounded-lg p-6 space-y-3">
            <p className="text-white font-black text-lg">Panel de tormenta</p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-red-500" />
                20 canciones digitales cerradas
              </li>
              <li className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-red-500" />
                Base en Iruña y pueblos de alrededor
              </li>
              <li className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-red-500" />
                Calle, conciertos, comunidad y sudor
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Territorio y Comunidad */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-3">
              Territorio y comunidad
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-white">
              Raíz vasca, alcance sin fronteras.
            </h3>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed max-w-5xl mx-auto text-center">
            <p>
              Kaos Ekaitza nace en Navarra, desde pueblos pequeños y desde la
              periferia, pero no se queda ahí. El proyecto representa a personas
              de distintos territorios y ha cruzado fronteras, llegando a
              diferentes puntos del Estado y a muchos lugares de Latinoamérica.
            </p>
            <p>
              La raíz es vasca. Aunque no siempre aparezca en las letras,
              portamos el euskera en el corazón. El grito es común, compartido,
              y no entiende de fronteras.
            </p>
            <p className="text-white font-semibold">
              Quien sigue Kaos Ekaitza no es público: es parte de la tormenta.
              Cada persona es un trueno, una voz más gritando por la justicia,
              la libertad y la paz.
            </p>
          </div>
        </div>
      </section>

      {/* Compromiso */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black border border-gray-800 rounded-lg p-8 space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-red-500">
              Compromiso
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-white">
              Si quieren silencio, tendrán que arrancarlo.
            </h3>
            <ul className="mt-4 grid gap-4 md:grid-cols-3 text-white/90">
              <li className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                Entrega total a quien camina con nosotros.
              </li>
              <li className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                Llevar esta música a las calles, que suene y que sirva.
              </li>
              <li className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                Ruido con sentido al servicio de la justicia y la paz.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h4 className="text-2xl md:text-3xl font-black text-white">
            Súmate a la tormenta.
          </h4>
          <p className="text-white/80 max-w-2xl mx-auto">
            Escucha, suscríbete, contacta o apoya. Cada paso hace más fuerte a
            la comunidad y a la música que la sostiene.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Radio className="w-5 h-5" />
              <span>Escuchar</span>
            </Link>
            <Link
              href="/contacto"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <Zap className="w-5 h-5" />
              <span>Suscribirse</span>
            </Link>
            <Link
              href="/contacto"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Contactar</span>
            </Link>
            <Link
              href="/merchandising"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Waves className="w-5 h-5" />
              <span>Apoyar</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
