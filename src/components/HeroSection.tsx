import Image from "next/image";

const BAND_IMAGE =
  "https://res.cloudinary.com/dzuug3ahf/image/upload/v1774606840/KaosEkaitza-2026c_rapkbz.png";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-black overflow-hidden max-md:pt-8">
      {/* Móvil: contenido arriba (sin justify-end sobre min-h alto). Desktop: banda abajo del bloque alto como antes */}
      <div className="relative flex w-full flex-col max-md:min-h-0 max-md:justify-start md:min-h-[80vh] lg:min-h-[85vh] md:justify-end">
        {/* Logo: en móvil usa vh para subirlo bajo el navbar; en md+ % del contenedor */}
        <div
          className="pointer-events-none absolute left-1/2 z-0 w-[min(92vw,22rem)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(88vw,26rem)] md:w-[min(52vw,30rem)] lg:w-[min(36rem,40vw)] max-md:top-[min(26vh,9.5rem)] sm:max-md:top-[min(28vh,10.25rem)] md:top-[38%] lg:top-[40%]"
          aria-hidden
        >
          <div className="relative aspect-square overflow-hidden rounded-full bg-red-600 shadow-[0_24px_70px_rgba(0,0,0,0.65)] ring-2 ring-red-900/50">
            <Image
              src="/logo-512.png?v=2"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 92vw, 36rem"
            />
          </div>
        </div>

        <div className="relative z-10 w-full leading-none max-md:pt-14 max-md:translate-y-6 md:translate-y-0 md:pt-6">
          <Image
            src={BAND_IMAGE}
            alt="Kaos Ekaitza"
            width={2400}
            height={1350}
            className="w-full h-auto block object-contain max-md:object-center md:object-bottom"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      <div className="h-1 w-full ska-stripes-horizontal shrink-0" aria-hidden />
    </section>
  );
};

export default HeroSection;
