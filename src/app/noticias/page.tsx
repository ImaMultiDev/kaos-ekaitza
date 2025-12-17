import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/database";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Noticias - Kaos Ekaitza | Comunicados oficiales",
  description:
    "Comunicados oficiales de Kaos Ekaitza: novedades, lanzamientos y mensajes antifascistas.",
};

export default async function NoticiasPage() {
  const posts = await getPosts(true);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="py-16 bg-gradient-punk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-white/80 mb-3">
            Comunicados
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Noticias oficiales de Kaos Ekaitza
          </h1>
          <p className="text-lg text-white/85 max-w-3xl mx-auto">
            Actualizaciones directas del proyecto. Sin relleno, solo lo que
            importa.
          </p>
        </div>
        <div className="ska-stripes-horizontal h-2 w-full"></div>
      </section>

      {/* Listado */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center text-white/70">
              Aún no hay comunicados publicados.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => {
                const date = post.publishedAt ?? post.createdAt;

                return (
                  <Link
                    key={post.id}
                    href={`/noticias/${post.slug}`}
                    className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden punk-hover flex flex-col"
                  >
                    <div className="relative h-56 bg-gradient-punk">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/40">
                          KAOS EKAITZA
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30"></div>
                    </div>

                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <div className="flex items-center text-white/70 text-sm gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(date)}</span>
                      </div>
                      <h2 className="text-2xl font-black text-white leading-tight">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-red-500 font-semibold mt-auto">
                        <span>Leer comunicado</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
