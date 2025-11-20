import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Actualizando imagen del álbum 'Revienta el Silencio'...");

  const updatedAlbum = await prisma.album.updateMany({
    where: {
      title: "Revienta el Silencio",
    },
    data: {
      coverImage:
        "https://res.cloudinary.com/dzt73baf9/image/upload/v1763659843/ChatGPT_Image_18_nov_2025_18_32_41_gan64r.png",
    },
  });

  console.log(`✅ Álbum actualizado: ${updatedAlbum.count} registro(s) modificado(s)`);
}

main()
  .catch((e) => {
    console.error("❌ Error actualizando el álbum:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

