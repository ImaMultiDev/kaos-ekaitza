import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, Hash } from "lucide-react";
import { getPostBySlug, getPosts } from "@/lib/database";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, true);

  if (!post) {
    return {
      title: "Comunicado no encontrado - Kaos Ekaitza",
    };
  }

  return {
    title: `${post.title} - Kaos Ekaitza | Comunicado`,
    description: post.excerpt || "Comunicado oficial de Kaos Ekaitza.",
    openGraph: {
      title: post.title,
      description: post.excerpt || "Comunicado oficial de Kaos Ekaitza.",
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, true);

  if (!post) {
    notFound();
  }

  const date = post.publishedAt ?? post.createdAt;
  const contentBlocks = post.content
    ? post.content.split(/\n\s*\n/).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black">
        {post.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
        )}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-4">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Noticias</span>
          </Link>
          <p className="text-sm uppercase tracking-[0.25em] text-red-500">
            Comunicado
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-white/75 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(date)}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-600/20 text-red-300 border border-red-600/40"
                >
                  <Hash className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="ska-stripes-horizontal h-2 w-full"></div>
      </section>

      {/* Contenido */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-4 text-white/90 leading-relaxed">
            {contentBlocks.length > 0 ? (
              contentBlocks.map((block, idx) => (
                <p key={idx} className="text-lg">
                  {block}
                </p>
              ))
            ) : (
              <p className="text-lg text-white/70">
                Sin contenido disponible.
              </p>
            )}
          </div>

          {post.instagramUrl && post.instagramUrl !== "#" && (
            <div>
              <a
                href={post.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-punk inline-flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Ver en Instagram</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

