import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // Limpiar datos existentes
  await prisma.comment.deleteMany();
  await prisma.song.deleteMany();
  await prisma.album.deleteMany();
  await prisma.post.deleteMany();
  await prisma.subscriber.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.galleryItem.deleteMany();

  console.log("🗑️ Datos anteriores eliminados");

  // Crear álbum principal
  const album = await prisma.album.create({
    data: {
      title: "Kaos Ekaitza - Ska Punk Antifascista",
      description:
        "Álbum principal de Kaos Ekaitza. Ska-punk combativo con alma libertaria, directo desde el ruido del pueblo.",
      releaseDate: new Date("2024-01-15"),
      coverImage: "/album-kaos-ekaitza.jpg",
      spotifyUrl: "https://open.spotify.com/artist/kaosekaitza",
      bandcampUrl: "https://kaosekaitza.bandcamp.com",
      youtubeUrl: "https://www.youtube.com/channel/kaosekaitza",
    },
  });

  console.log("💿 Álbum creado:", album.title);

  // Crear canción real: Mentiras de Bandera
  const song1 = await prisma.song.create({
    data: {
      title: "Mentiras de Bandera - Kaos Ekaitza (Ska Punk Antifascista)",
      duration: "4:12", // Ajusta según la duración real
      lyrics: `[Verso 1]
Vienen de traje, con cruz y rosario,
gritan "libertad" y siembran calvario,
bandera en mano, odio en la boca,
pero su discurso siempre provoca.

Dicen que aman a su nación,
pero odian si no tienes su color,
con Trump aplauden cada locura,
apuntan al pobre y juran "es cultura".

[Estribillo]
¡Fascistas del siglo 21!
Con corbata y cara de cordero,
VOX, mentiras de bandera,
quieren guerra en nombre del dinero.
Israel bombardea y aplauden de pie,
¿defender niños? ¡Eso no se ve!
Racismo, odio, manipulación,
su discurso es solo destrucción.

[Verso 2]
Cazan votos con miedo y censura,
hablan de "honor" y usan tortura,
quieren España de blanco y cruz,
pero su patria se pudre en su luz.

Apoyan muros, apoyan metralla,
prefieren guerra antes que batalla,
hablan de Dios y son mercenarios,
títeres ruines de intereses contrarios.

[Pre-Coro]
¿Dónde está la justicia social?
¿Dónde quedó la dignidad?
La ultraderecha vende moral,
pero su alma es criminal.

[Estribillo]
¡Fascistas del siglo 21!
Con corbata y cara de cordero,
VOX, mentiras de bandera,
quieren guerra en nombre del dinero.
Israel bombardea y aplauden de pie,
¿defender niños? ¡Eso no se ve!
Racismo, odio, manipulación,
su discurso es solo destrucción.

[Puente]
Mienten en TV, gritan en el bar,
miran hacia Gaza y no quieren mirar,
niegan la historia, fabrican temor,
pero el pueblo ya conoce su olor.

[Verso 3]
Si eres mujer, inmigrante o gay,
para ellos solo eres ley,
la ley que odia, la ley que encierra,
la ley fascista que busca guerra.

[Coro Final]
¡Fascistas del siglo XXI!
Con corbata y cara de cordero,
VOX, mentiras de bandera,
quieren guerra en nombre del dinero.
Trump les guía, Netanyahu también,
hijos del odio que infectan el bien.
Pero el ska no se calla jamás,
la calle canta: ¡no pasarán!

[Outro]
Mentiras que matan, discursos de horror,
pero el pueblo unido levanta su voz,
ska-punk sonando en cada rincón,
¡contra el fascismo, rebelión!`,
      audioUrl: null,
      spotifyUrl: "https://open.spotify.com/track/mentiras-de-bandera",
      youtubeUrl: "https://www.youtube.com/watch?v=bkTN9n-O0f8",
      coverImage:
        "https://res.cloudinary.com/dzt73baf9/image/upload/v1754948539/ChatGPT_Image_7_ago_2025_11_31_24_sy8hbg.png",
      message:
        '"Mentiras de Bandera" es una canción de denuncia contra la ultraderecha, el racismo institucional, y el uso de la patria como arma para justificar la guerra, el odio y la opresión. Ska-punk combativo con alma libertaria, directo desde el ruido del pueblo.',
      albumId: album.id,
    },
  });

  console.log("🎵 Canción creada:", song1.title);

  // Crear canción real: Tendrán que Matarme
  const song2 = await prisma.song.create({
    data: {
      title: "Tendrán que Matarme - Kaos Ekaitza (Ska Punk Antifascista)",
      duration: "4:15", // Ajusta según la duración real
      lyrics: `[Verso 1]
Quieren tapar mi voz con muros de plomo,
firmar mi condena, borrarme del todo.
Pero mi grito atraviesa la metralla,
y en cada calle la rabia estalla.

Se venden como jueces de la verdad,
pero sus manos sangran impunidad.
Sonrisa de hierro, bandera manchada,
con fuego y mentiras la historia inventada.

[Pre-Coro]
No me callarán ni arrancándome el alma,
soy eco que rompe cadenas y balas.

[Coro]
¡Tendrán que matarme para hacerme callar!
Ni su muro, ni su miedo me van a frenar.
Y aunque caiga, otros vendrán,
con el puño en alto, con el mismo cantar.
¡Tendrán que matarme para hacerme callar!
Que el pueblo despierte, que vuelva a soñar.

[Verso 2]
Desde Gaza hasta cualquier esquina,
sus bombas pintan la noche asesina.
Dicen "paz" mientras siembran ruinas,
pero no callan las voces que caminan.

Niños sin techo, madres que lloran,
tierras robadas que nunca devuelven.
Somos los que no bajan la mirada,
somos la chispa que su miedo enciende.

[Pre-Coro]
No me callarán ni arrancándome el alma,
soy eco que rompe cadenas y balas.

[Coro]
¡Tendrán que matarme para hacerme callar!
Ni su muro, ni su miedo me van a frenar.
Y aunque caiga, otros vendrán,
con el puño en alto, con el mismo cantar.
¡Tendrán que matarme para hacerme callar!
Que el pueblo despierte, que vuelva a soñar.

[Puente – Spoken Word con instrumental suave]
No lucho por odio, lucho por vida,
por el niño que ríe aunque todo se pierda,
por la mujer que enfrenta tanques con piedras,
por el anciano que guarda la llave de su casa destruida.
Si quieren silencio, tendrán que enfrentarse
a un millón de voces que no conocen el miedo.

[Break – Riff ska/punk rápido con coros de fondo]
¡No callarán!
¡No pasarán!
El grito del pueblo no se va a apagar.
¡No callarán!
¡No pasarán!
Palestina vive, no la borrarán.

[Coro Final – con más fuerza]
¡Tendrán que matarme para hacerme callar!
Ni su muro, ni su miedo me van a frenar.
Y aunque caiga, otros vendrán,
con el puño en alto, con el mismo cantar.
¡Tendrán que matarme para hacerme callar!
Que el pueblo despierte, que vuelva a soñar.

[Outro]
Y cuando piensen que todo ha terminado,
escucharán mi voz en cada soldado del pueblo,
en cada madre, en cada hermano.
Porque no hay muerte que mate la verdad,
ni poder que entierre la libertad.`,
      audioUrl: null,
      spotifyUrl: "https://open.spotify.com/track/tendran-que-matarme",
      youtubeUrl: "https://www.youtube.com/watch?v=DUt6ehKdw0w",
      coverImage:
        "https://res.cloudinary.com/dzt73baf9/image/upload/v1754948524/ChatGPT_Image_11_ago_2025_21_49_54_ygnmyq.png",
      message:
        '"Tendrán que Matarme" es una poderosa canción de Kaos Ekaitza que nace como respuesta al intento de silenciar voces que luchan por la libertad y la justicia. Con un estilo ska punk antiautoritario, esta canción denuncia la represión, la impunidad y la resistencia del pueblo frente a la opresión.',
      albumId: album.id,
    },
  });

  console.log("🎵 Canción creada:", song2.title);

  // Crear canción real: Que mi nombre no se borre de la historia
  const song3 = await prisma.song.create({
    data: {
      title:
        '"Que mi nombre no se borre de la historia" - Kaos Ekaitza (Ska Punk Antifascista)',
      duration: "4:08", // Ajusta según la duración real
      lyrics: `En Madrid tronó el silencio,
la derrota se firmó con sangre y odio.
Trece voces en la sombra,
trece rosas brillan en nuestra memoria.

No empuñaron rifles ni puñales,
eran libros, eran ideales.
Pero el miedo necesita un castigo,
y el fascismo nunca deja testigos.

[Pre-Coro]
Las tapias del Este recuerdan su voz,
no hay bala que mate lo que nace del amor.

[Coro]
¡Que mi nombre no se borre de la historia!
Gritó Julia antes de morir.
Cayeron trece, florecieron mil,
con su memoria vamos a resistir.
¡Que mi nombre no se borre de la historia!
Ni tu cárcel, ni tu dictador,
Trece Rosas, trece valor,
la dignidad es revolución.

[Verso 2]
18 años, apenas una vida,
pero el régimen firmó su despedida.
Uniformes, juicios, papel sellado,
condena escrita antes del pecado.

No eran terroristas, ni criminales,
eran jóvenes libres, eran inmortales.
Con la cabeza alta, sin llorar,
dejaron su verdad antes de volar.

[Pre-Coro]
Nunca pidieron perdón al poder,
prefirieron morir que retroceder.

[Coro]
¡Que mi nombre no se borre de la historia!
Gritó Julia antes de partir.
Cayeron trece, florecieron mil,
con su memoria vamos a resistir.
¡Que mi nombre no se borre de la historia!
Ni tu cárcel, ni tu dictador,
Trece Rosas, con mucho valor,
la dignidad es revolución.

[Puente – Spoken Word con instrumental suave]
Hoy las recordamos una por una:
Julia, Elena, Blanca, Victoria,
Joaquina, Pilar, Martina, Carmen,
Adelina, Virtudes, Ana, Dionisia y Luisa, con sangre escribieron memoria.

No fueron mártires, fueron faro.
No fueron débiles, fueron valor.
Fusiladas por pensar,
por amar la libertad.

[Break – Riff ska rápido con coros de fondo]
¡No pasarán!
¡No callarán!
Las trece rosas vuelven a cantar.
¡No pasarán!
¡No callarán!
Nunca sus nombres van a borrar.

[Coro Final – con más fuerza]
¡Que mi nombre no se borre de la historia!
Gritó Julia antes de morir.
Cayeron trece, florecieron mil,
con su memoria vamos a resistir.
¡Que mi nombre no se borre de la historia!
Ni tu cárcel, ni tu dictador,
Trece Rosas, trece valor,
la dignidad es revolución.

[Outro]
Que su voz nos siga ardiendo,
como llama eterna, como ejemplo vivo.
Porque cuando olvidamos, ellos ganan.
Y aquí seguimos… luchando, resistiendo.`,
      audioUrl: null,
      spotifyUrl: "https://open.spotify.com/track/que-mi-nombre-no-se-borre",
      youtubeUrl: "https://www.youtube.com/watch?v=nLxYbAVjspc",
      coverImage:
        "https://res.cloudinary.com/dzt73baf9/image/upload/v1754948539/Que_mi_nombre_no_se_borre_de_la_historia_20250807_103408_0000_dg6jxl.png",
      message:
        "Una canción de ska punk combativo en memoria de Las 13 Rosas, trece jóvenes fusiladas por la dictadura franquista el 5 de agosto de 1939. Este tema rinde homenaje a su valentía, a la lucha antifascista, y a todos los pueblos que no olvidan.",
      albumId: album.id,
    },
  });

  console.log("🎵 Canción creada:", song3.title);

  console.log("✅ Seed completado exitosamente!");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
