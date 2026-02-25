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

  // Crear primer álbum: Gritos en la Tormenta
  const album1 = await prisma.album.create({
    data: {
      title: "Gritos en la Tormenta",
      description:
        "Primer álbum de Kaos Ekaitza. Ska-punk combativo con alma libertaria, directo desde el ruido del pueblo. 10 temas cargados de denuncia social, resistencia y memoria histórica.",
      releaseDate: new Date("2024-01-15"),
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1765958585/%C3%81lbum_01_Portada_wbnc55.png",
      spotifyUrl:
        "https://open.spotify.com/intl-es/artist/1reWo4KzVQLgqOwNXrVgr4",
      bandcampUrl: "https://kaosekaitza.bandcamp.com",
      youtubeUrl:
        "https://www.youtube.com/playlist?list=PLQbq30ffRAmi-FyBqK2_9Eeom_DeJ9eKX",
    },
  });

  console.log("💿 Álbum creado:", album1.title);

  // Crear segundo álbum: Revienta el Silencio
  const album2 = await prisma.album.create({
    data: {
      title: "Revienta el Silencio",
      description:
        "Segundo álbum de Kaos Ekaitza. Ska-punk rebelde que rompe el silencio con mensajes de resistencia, solidaridad y lucha por la justicia social.",
      releaseDate: new Date("2025-09-05"),
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1765958639/album_2_caratula_fuudzy.png",
      spotifyUrl:
        "https://open.spotify.com/intl-es/artist/1reWo4KzVQLgqOwNXrVgr4",
      bandcampUrl: "https://kaosekaitza.bandcamp.com",
      youtubeUrl:
        "https://www.youtube.com/playlist?list=PLQbq30ffRAmjJ4F9gFUAhwtFLG1BB2LTW",
    },
  });

  console.log("💿 Álbum creado:", album2.title);

  // Crear comunicado/noticia
  // POST 1
  const post1 = await prisma.post.create({
    data: {
      title: "Kaos Ekaitza rompe el silencio: el proyecto da un nuevo paso",
      slug: "kaos-ekaitza-rompe-el-silencio",
      excerpt:
        "El proyecto musical antifascista Kaos Ekaitza inicia una nueva etapa y refuerza su compromiso con la calle.",
      content: `Kaos Ekaitza nace como un proyecto musical digital, pero nunca fue solo música.

Tras meses de trabajo, canciones y apoyo colectivo, el proyecto da un nuevo paso adelante. La tormenta empieza a organizarse para salir a la calle.

Este comunicado marca el inicio de una nueva etapa en la que la música, el mensaje y la comunidad caminarán juntas. Seguimos adelante, sin ruido vacío, sin postureo y sin miedo.

Si quieren silencio, tendrán que arrancarlo.`,
      featuredImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1765996532/Completo_mkmb6y.png",
      instagramUrl: "https://www.instagram.com/p/DRugyVEiCwQ/?img_index=1",
      tags: ["antifascismo", "comunicado", "musica", "kaos-ekaitza"],
      published: true,
      publishedAt: new Date("2025-12-01T00:00:00"),
    },
  });

  console.log("📰 Comunicado creado:", post1.title);
  // POST 2
  const post2 = await prisma.post.create({
    data: {
      title: "¡NO! al Viña Rock",
      slug: "no-al-vina-rock",
      excerpt:
        "Kaos Ekaitza denuncia la vinculación del Viña Rock con intereses empresariales ligados a la guerra y la injusticia.",
      content: `El 11/12 pondrán a la venta los abonos del Viña Rock.
  Y volverán a intentar que el rock se arrodille ante las armas, la mentira y el odio.
  
  Hoy el festival forma parte de una estructura empresarial cuyo beneficio alimenta intereses que nada tienen que ver con el pueblo, ni con la música, ni con la justicia.
  
  Nosotros no miramos hacia otro lado.
  Nosotros no olvidamos para quién nació esta música.
  
  EL ROCK NACIÓ PARA DENUNCIAR LA INJUSTICIA,
  NO PARA FINANCIARLA.
  
  🔥 ¡NO! al Viña Rock.
  🔥 ¡NO! a vivir de rodillas.
  🌩️ La tormenta no destruye, reivindica.`,
      featuredImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1765997508/VI%C3%91A_ROCK_01_e0bkws.png",
      instagramUrl: "https://www.instagram.com/p/DSF2TyLjQ55/?img_index=1",
      tags: ["antifascismo", "boikot", "musica", "vina-rock"],
      published: true,
      publishedAt: new Date("2025-12-10T00:00:00"),
    },
  });

  console.log("📰 Comunicado creado:", post2.title);

  // POST 3
  const post3 = await prisma.post.create({
    data: {
      title: "Boikot a Spotify",
      slug: "boikot-a-spotify",
      excerpt:
        "Kaos Ekaitza anuncia el boikot a Spotify por la inversión de su fundador en armamento militar.",
      content: `La música no se vende.
  La dignidad no se negocia.
  
  🔥 BOIKOT A SPOTIFY 🔥
  
  Kaos Ekaitza retira su música de Spotify como acto de coherencia política y ética, debido a la inversión del fundador de la plataforma en armamento militar vinculado al Estado de Israel.
  
  No queremos que nuestra música financie la guerra, la ocupación ni la muerte de pueblos inocentes.
  
  La música es del pueblo.
  La música es resistencia.`,
      featuredImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1764209807/BoikotSpotify_jyh5je.png",
      instagramUrl: "https://www.instagram.com/p/DRh0GTIDca8/",
      tags: ["boikot", "spotify", "palestina", "antifascismo"],
      published: true,
      publishedAt: new Date("2025-11-26T00:00:00"),
    },
  });

  console.log("📰 Comunicado creado:", post3.title);
  // POST 4
  const post4 = await prisma.post.create({
    data: {
      title: "Se buscan músicos en Pamplona",
      slug: "se-buscan-musicos-en-pamplona",
      excerpt:
        "Kaos Ekaitza abre un llamado para formar banda real en Pamplona y alrededores.",
      content: `🔥 KAOS EKAITZA CRECE 🔥
  
  Buscamos músicos en Pamplona y alrededores que sientan el mensaje, la energía y las ganas de gritar con fuerza.
  
  Rock / Punk / Ska con conciencia.
  
  Pero más que músicos, buscamos personas con ideales.
  Con voz, con mensaje y con respeto por lo que representamos.
  
  ✊ La música es resistencia.
  
  Si entiendes la lucha y quieres formar parte:
  📩 contact@kaosekaitza.com
  🌐 www.kaosekaitza.com
  📸 @kaosekaitza`,
      featuredImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1765997306/SE_BUSCAN2_hjjfwz.png",
      instagramUrl: "https://www.instagram.com/p/DQ6YIAsDcAT/?img_index=1",
      tags: ["banda", "pamplona", "musica", "kaos-ekaitza"],
      published: true,
      publishedAt: new Date("2025-11-11T00:00:00"),
    },
  });

  console.log("📰 Comunicado creado:", post4.title);

  // POST 5
  const post5 = await prisma.post.create({
    data: {
      title: "Alerta Antifascista en Pamplona",
      slug: "alerta-antifascista-pamplona",
      excerpt:
        "Llamado a la movilización antifascista frente a la presencia de símbolos que atacan la memoria y la dignidad.",
      content: `🗓️ 30 de octubre de 2025
  🕕 18:00
  
  El 30/10, a las 18:00, la UNAV fue escenario de símbolos que intentaron e intentan borrar nuestras raíces, nuestro idioma y nuestro pueblo.
  
  Defendamos la memoria, la verdad y la dignidad.
  Porque aquello por lo que nuestros antepasados dieron sus vidas, hoy nos toca cuidarlo con voz y con conciencia.
  
  Esto fue una llamada a la tormenta antifascista. 🌩️🔥
  ¡No pasarán! ✊🏼`,
      featuredImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1765997154/alertaAntifascista30Oct_gxixb1.jpg",
      instagramUrl: "https://www.instagram.com/p/DQXqHKnDGGJ/",
      tags: ["antifascismo", "pamplona", "movilizacion"],
      published: true,
      publishedAt: new Date("2025-10-28T00:00:00"),
    },
  });

  console.log("📰 Comunicado creado:", post5.title);

  // Crear canción real: Mentiras de Bandera
  const song1 = await prisma.song.create({
    data: {
      title: "Mentiras de Bandera - Kaos Ekaitza",
      duration: "3:20", // Ajusta según la duración real
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
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/3UVVZDSkXLuqMEruawYZDw",
      youtubeUrl: "https://www.youtube.com/watch?v=bkTN9n-O0f8",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022829/Mentiras_de_Bandera_wzpizy.png",
      message:
        '"Mentiras de Bandera" es una canción de denuncia contra la ultraderecha, el racismo institucional, y el uso de la patria como arma para justificar la guerra, el odio y la opresión. Ska-punk combativo con alma libertaria, directo desde el ruido del pueblo.',
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song1.title);

  // Crear canción real: Tendrán que Matarme
  const song2 = await prisma.song.create({
    data: {
      title: "Tendrán que Matarme - Kaos Ekaitza",
      duration: "3:24", // Ajusta según la duración real
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
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/0EIKOmFzFqHCnw085fQj0s",
      youtubeUrl: "https://www.youtube.com/watch?v=DUt6ehKdw0w",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022840/Tendr%C3%A1n_que_Matarme_ckjaf8.png",
      message:
        '"Tendrán que Matarme" es una poderosa canción de Kaos Ekaitza que nace como respuesta al intento de silenciar voces que luchan por la libertad y la justicia. Con un estilo ska punk antiautoritario, esta canción denuncia la represión, la impunidad y la resistencia del pueblo frente a la opresión.',
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song2.title);

  // Crear canción real: Que mi nombre no se borre de la historia
  const song3 = await prisma.song.create({
    data: {
      title: '"Que mi nombre no se borre de la historia" - Kaos Ekaitza',
      duration: "3:44", // Ajusta según la duración real
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
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/7JUsgno0NjfnIl51TVqbTJ",
      youtubeUrl: "https://www.youtube.com/watch?v=nLxYbAVjspc",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022830/Que_mi_Nombre_no_se_Borre_qvgaec.png",
      message:
        "Una canción combativa en memoria de Las 13 Rosas, trece jóvenes fusiladas por la dictadura franquista el 5 de agosto de 1939. Este tema rinde homenaje a su valentía, a la lucha antifascista, y a todos los pueblos que no olvidan.",
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song3.title);

  // Crear canción real: Herederos de Sangre
  const song4 = await prisma.song.create({
    data: {
      title: "Herederos de Sangre - Kaos Ekaitza",
      duration: "4:05",
      lyrics: `[Verso 1]
No nacieron estas letras de mi pluma,
vienen de cartas que dejó la bruma,
de muros donde alguien grabó con sangre y sudor
su última verdad, alzamos su voz.

Somos su palabra, que guarda el silencio,
la voz que el tiempo creía olvidada,
para gritar lo que ellos escribieron
brotamos de sus lágrimas, sepultadas en escombros.

[Pre-Coro]
¡No somos autores, somos herederos!
¡De todos los gritos verdaderos!

[Coro]
¡Herederos de sangre, portavoces del dolor!
Cantamos lo que escribió aquel que luchó,
cada verso viene de una verdad distinta,
de quien grabó su historia con tinta.
¡No inventamos nada, solo transmitimos!
Las palabras que del silencio recibimos,
¡Esta música es de quienes ya no están!
¡Sus testimonios vivos resonarán!

[Verso 2]
En diarios rotos, en paredes frías,
dejaron escritas sus rebeldías,
el minero, la madre, el fusilado,
cada uno su historia, su legado.

Nosotros somos solo el altavoz
de quien nunca pudo alzar su voz,
los hijos que cantan aquello que ocultaron,
los ecos de quienes se rebelaron.

[Pre-Coro]
¡No somos autores, somos herederos!
¡De todos los gritos verdaderos!

[Coro]
¡Herederos de sangre, portavoces del dolor!
Cantamos lo que escribió aquel que luchó,
cada verso viene de una verdad distinta,
de quien grabó su historia con tinta.
¡No inventamos nada, solo transmitimos!
Las palabras que del silencio recibimos,
¡esta música es de quienes ya no están!
¡Sus testimonios vivos resonarán!

[Puente - Spoken Word reverencial]
Cada canción que escucháis
nació en una celda,
en una trinchera,
en el exilio de una guerra.
La escribió alguien que existió,
que sangró, que resistió.
Nosotros solo somos
los mensajeros del tiempo,
los que damos sonido
a lo que quedó en el olvido.
No somos los creadores,
somos los herederos
de una voz ancestral.

[Break - Riff emotivo y potente]
¡Sus palabras!
¡Nuestras voces!
¡Su dolor!
¡Nuestros acordes!
¡Su memoria!
¡Nuestra historia!
¡Su verdad!
¡Nuestro objetivo!

[Verso 3]
Por eso recordad siempre que la escucháis,
es la más auténtica, porque es de raíz,
son décadas de historias por contar
que ahora por fin, pueden resonar.

Somos la nueva generación
que hereda su revolución,
que canta lo que ellos escribieron
cuando por la verdad murieron.

[Coro Final - con toda la pasión]
¡Herederos de sangre, portavoces del dolor!
Cantamos lo que escribió aquel que luchó,
cada verso viene de una verdad distinta,
de quien grabó su historia con tinta.
¡No inventamos nada, solo transmitimos!
Las palabras que del silencio recibimos,
¡esta música es de quienes ya no están!
¡Sus testimonios vivos resonarán!

[Outro]
Y cuando pregunten de dónde suena el eco,
decidles que viene de muy lejos,
de cartas perdidas, de muros quebrados,
de corazones nunca callados.
¡Herederos de sangre!
¡Portavoces de memoria!
¡Cantamos por sus almas!
¡Gritamos sus historias!`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/06j9gzGz2chajdkqmMaVlm",
      youtubeUrl: "https://www.youtube.com/watch?v=gHtZTxwWr8s",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022835/Herederos_de_Sangre_k7i1g7.png",
      message:
        '"Herederos de Sangre" recoge la voz de quienes ya no están, pero dejaron huella con su lucha y su palabra. Con un estilo ska-punk rebelde y emocional, se convierte en un puente entre pasado y presente, recordándonos que somos portavoces de los mensajes escritos con sacrificio, memoria y esperanza.',
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song4.title);

  // Crear canción real: Sangre y Palabra
  const song5 = await prisma.song.create({
    data: {
      title: "Sangre y Palabra - Kaos Ekaitza",
      duration: "3:56",
      lyrics: `[Verso 1]
Nos cortaron la lengua a golpe de bota,
cuarenta años de silencio, la historia rota,
pero el euskera vive en cada latido,
sangre ancestral que nunca se ha rendido.

Fusilaron maestros por enseñar verdades,
quemaron libros, borraron ciudades,
pero en los bosques y cuevas, en noches oscuras,
grabamos con fuego nuestra cultura

[Pre-Coro]
¡No somos su bandera, no somos su cruz!
Somos la llama que danza en la hoguera

[Coro]
¡Odol eta hizkuntza! ¡Sangre y palabra!
Los hijos del bosque nunca caerán.
¡gora gudari! ¡gora euskera!
¡Contra el fascismo, Askatasuna!

[Verso 2]
Desde Guernica, aún se oyen los gritos,
la misma mano que nos destruyó
vuelve con otra cara pero el mismo olor,
fragancia que apesta, la misma mierda,

VOX gruñe cual cerdos de Franco,
"una España" que quiso borrarnos,
ahora nuestros hijos hablan dos lenguas,
y eso les quema, les pudre por dentro.

[Pre-Coro]
¡No somos su bandera, no somos su cruz!
Somos la llama que danza en la hoguera

[Coro]
¡Odol eta hizkuntza! ¡Sangre y palabra!
Los hijos del bosque nunca se rinden.
¡gora gudari! ¡gora euskera!
¡Nafarroa Askatasuna!

[Puente - Spoken Word con instrumental agresivo]
Nos quieren muertos por hablar nuestra lengua,
nos criminalizaron por amar nuestra tierra,
torturaron cuerpos pero no pudieron
con el alma de un pueblo entero.
Somos los hijos de quienes resistieron
en sótanos, cárceles, en el exilio,
y ahora que vuelven los mismos discursos,
¡que sepan que seguimos aquí!

[Break - Riff ska-punk brutal con coros de guerra]
¡Que sepan que somos!
¡El pueblo ancestral!
¡Ez gara!
¡No somos!
¡Débiles ni temerosos!

[Verso 3]
Cataluña sangrando, Galicia callada,
cada pueblo aplastado, cada voz cortada,
pero las raíces resuena en cada rincón,
gritando verdades sin sumisión.
Que vengan con guardias, con jueces, con todo,
tenemos los cojones de guardar el modo
de resistir sin doblar la rodilla,
¡Euskal Herria askatasuna!

[Coro Final - con furia total]
¡Odol eta hizkuntza! ¡Sangre y palabra!
Los hijos del bosque nunca se rinden.
¡gora gudari! ¡gora euskera!
¡Nafarroa Askatasuna!

Y cuando piensen que pueden vencernos,
escuchar el mensaje del pueblo eterno,
en cada protesta, en cada canción,
¡porque somos hijos del fuego, somos rebelión!
Odol eta hizkuntza, sangre y palabra,
¡Somos los hijos del bosque y esta es nuestra casa!`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/1JKWCxYIJLfFJaqWvoV22Z",
      youtubeUrl: "https://www.youtube.com/watch?v=Na27XrfUNuI",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022832/Sangre_y_Palabra_sb1jko.png",
      message:
        '"Sangre y Palabra" es una canción de Kaos Ekaitza que alza la voz contra quienes intentaron silenciar al euskera y borrar una cultura entera. Con un estilo ska-punk rebelde y combativo, la canción es un grito de resistencia, memoria y dignidad frente al fascismo y la represión.',
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song5.title);

  // Crear canción real: Aquí sigo
  const song6 = await prisma.song.create({
    data: {
      title: "Aquí sigo - Kaos Ekaitza",
      duration: "3:54",
      lyrics: `[Verso 1]
Me despierto y ya no está mi casa,
me despierto y ya no está mi padre,
me despierto y sigo respirando
aunque todo reviente y parezca acabado.

Voy a buscar agua para mi madre,
voy a buscar algo que comer,
paso por donde estaba mi escuela
y ya no queda nada que ver.

[Pre-Coro]
Pero aquí estoy, aquí sigo,
no me han podido quebrar,
aunque me quiten todo
yo no me voy a callar.

[Coro]
¡Aquí sigo de pie!
¡Aunque todo se joda!
¡Aquí sigo de pie!
¡Cada puta mañana!

¡No me vais a parar!
¡No me vais a vencer!
¡Mientras pueda gritar
voy a hacerme escuchar!

[Verso 2]
Reparto lo que tengo con el que no tiene nada,
abrazo la vida aunque no haya esperanza,
porque si no lo hago y me rindo, me callo,
no quedará nadie para contar la historia.

Cada bomba que cae me hace más fuerte,
cada día que pasa aprendo a sobrevivir,
y cuando llega la noche y todo duele
me prometo que mañana voy a resistir.

[Pre-Coro]
Porque aquí estoy, aquí sigo,
no me han podido quebrar,
aunque me quiten todo
yo no me voy a callar.

[Coro]
¡Aquí sigo de pie!
¡Aunque todo se joda!
¡Aquí sigo de pie!
¡Cada puta mañana!

¡No me vais a parar!
¡No me vais a vencer!
¡Mientras pueda gritar
voy a hacerme escuchar!

[Puente - Spoken word directo]
A todos los que veis las noticias
y cambiáis de canal porque os molesta,
a todos los que pensáis que esto no va con vosotros,
a todos los que creéis que estoy muy lejos:

Yo estoy aquí, sigo aquí,
y no me voy a mover,
y no me voy a callar,
y vais a tener que verme.

[Coro Final - Más agresivo]
¡Aquí sigo de pie!
¡Y os jode que esté vivo!
¡Aquí sigo de pie!
¡Contra todo pronóstico!

¡No me habéis podido parar!
¡No me habéis podido vencer!
¡Y mientras pueda gritar
me vais a tener que ver!`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/4zzDtLxlGeLuY8JLuNI8ff",
      youtubeUrl: "https://www.youtube.com/watch?v=DPk1ah1HVvc",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022836/Aqu%C3%AD_Sigo_nm4ujd.png",
      message:
        '"Aquí Sigo" da voz a la resistencia inquebrantable de un niño que se niega a rendirse ante la guerra y la destrucción. La canción es un grito de supervivencia, dignidad y resistencia frente a la opresión y el olvido.',
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song6.title);

  // Crear canción real: Trolls Fascistas
  const song7 = await prisma.song.create({
    data: {
      title: "Trolls Fascistas - Kaos Ekaitza",
      duration: "3:19",
      lyrics: `[Verso 1]
Ahí están otra vez, los putos fascistas,
rascándose los huevos y siendo racistas,
todo el día en las redes echando veneno,
vomitando mierda desde su agujero.

Patriotas de mierda que no han dado un palo,
defendiendo España desde su teclado,
con la barriga hinchada de cerveza y odio,
diciendo estupideces en cada episodio.

[Pre-Coro]
¿Dónde coño están cuando hay que currar?
¿Dónde coño están cuando hay que luchar?
Solo saben escupir desde el ordenador,
cobardes de mierda sin ningún honor.

[Coro]
¡Trolls fascistas, hijos de puta!
¡Que os jodan a todos en vuestra disputa!
Mientras lloráis detrás de la pantalla,
nosotros ganamos cada batalla.

¡Vox de mierda, gente sin cerebro!
¡Perdiendo el tiempo con vuestro delirio!
El pueblo os odia, el pueblo os desprecia,
¡y vuestro fascismo se va a la mierda!

[Verso 2]
Se creen muy machos insultando en la red,
pero en las calles necesitan ser cien,
nazis de salón con complejo de macho,
atentos subnormales, así es como os despacho!

Copian y pegan como putos robots,
y aun así su castellano parece marciano,
su único objetivo es querer callarnos,
y callamos sí, solo pa' descojonarnos.

[Pre-Coro]
¿Dónde están cuando hay que luchar?
¿Dónde coño están a la hora de currar?
Dejar la careta de payaso,
Fantasmas de salón, haceros un favor, y callaros copón.

[Coro]
¡Trolls fascistas, hijos de puta!
¡Que os jodan a todos en vuestra disputa!
Mientras lloráis detrás de la pantalla,
nosotros ganamos cada batalla.

¡Vox de mierda, gente sin cerebro!
¡Perdiendo el tiempo con vuestro delirio!
El pueblo os odia, el pueblo os desprecia,
¡y vuestro fascismo se va a la mierda!

[Puente - Spoken Word agresivo]
Escuchad bien, putos fascistas:
Podéis seguir llorando cada uno de vuestros días,
podéis seguir odiando desde el puto teclado,
pero el pueblo os desprecia y eso es lo que os quema.

Sois basura, sois escoria,
no tenéis futuro, no tenéis gloria,
mientras vosotros os pudrís de rabia,
nosotros construimos, creamos un futuro

[Coro Final - más agresivo]
¡Trolls fascistas, hijos de puta!
¡Que os jodan a todos en vuestra disputa!
Seguid llorando detrás del cristal,
que vuestro tiempo llega a su final.

¡Vox de mierda, nazis de salón!
¡Os vamos a joder en cada canción!
Kaos Ekaitza no se calla jamás,
¡Este es nuestro estilo!
¡Y así es como os lo dedico!

[Outro]
Que se jodan todos los fascistas,
que se jodan todos los racistas,
el pueblo grita contra el odio y la opresión,
¡música rebelde, pura insurrección!`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/4hrAsh1YhN6IGwKNNvR4Um",
      youtubeUrl: "https://www.youtube.com/watch?v=ZS5_zxKjpN4",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022832/Trolls_Fascistas_qpt4ut.png",
      message:
        '"Trolls Fascistas" desenmascara a los cobardes del odio digital: esos personajes que se esconden tras una pantalla para escupir racismo, machismo y fascismo mientras jamás dan la cara en la vida real. La canción es una bofetada sonora contra la intolerancia y la cobardía.',
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song7.title);

  // Crear canción real: Que Suerte Tienes
  const song8 = await prisma.song.create({
    data: {
      title: "Que Suerte Tienes - Kaos Ekaitza",
      duration: "5:22",
      lyrics: `[Verso 1]
Te levantas y tienes agua en el grifo,
te levantas y tu casa sigue ahí,
te levantas y tu familia respira,
pero te quejas porque llueve y no puedes salir.


Tienes comida en la nevera que se pudre,
tienes ropa en el armario sin estrenar,
tienes un techo, tienes cama, lo tienes todo,
pero sigues protestando sin parar.


[Pre-Coro]
Mientras tú lloras por tonterías,
otros rezan por vivir un día más,
mientras tú buscas nuevos problemas,
otros luchan por respirar en paz.

[Coro]
¡Qué suerte tienes!
¡Y no lo sabes!
¡Qué suerte tienes!
¡De no saber lo que es perder!

¡Qué bonita es tu vida!
¡Aunque te duela admitir!
¡Qué bonita es tu vida!
¡Comparado con morir!

[Verso 2]
Él se acuesta sin saber si amanecerá,
él se acuesta con el miedo en el pecho,
él se acuesta recordando lo que fue,
cuando tenía lo que tú das por hecho.

Ella camina buscando entre la basura
algo que pueda calmar su dolor,
mientras tú tiras la comida que no te gusta
y te inventas una nueva depresión.

[Pre-Coro]
Mientras tú lloras por tonterías,
otros rezan por vivir un día más,
mientras tú buscas nuevos dramas,
otros luchan por encontrar la paz.

[Coro]
¡Qué suerte tienes!
¡Y no lo sabes!
¡Qué suerte tienes!
¡De no saber lo que es perder!

¡Qué bonita es tu vida!
¡Aunque te cueste verlo!
¡Qué bonita es tu vida!
¡Comparado con su infierno!

[Puente - Spoken word emotivo con instrumental más suave]
Ponte en su lugar por un segundo,
imagínate sin nada que perder,
imagínate que cada día es un milagro
porque has conseguido sobrevivir hasta ayer.

Imagínate que no tienes a nadie,
que el mundo te ha dado la espalda,
que tu único crimen fue nacer
en el lugar equivocado del mapa.

¿Seguirías quejándote del tráfico?
¿Seguirías llorando por el WiFi?
¿Seguirías inventándote problemas
cuando sabrías lo que es sufrir?

[Coro Final - Más intenso]
¡Qué suerte tienes!
¡Y ya es hora que lo sepas!
¡Qué suerte tienes!
¡De dormir sin que te despierten las balas!

¡Qué hermosa es tu vida!
¡Aunque no la valores!
¡Qué hermosa es tu vida!
¡Mientras otros mueren de hambre y dolores!

¡Despierta de una vez!
¡Abre bien los ojos!
¡Tu vida es un regalo
que otros pagarían con sangre!

[Outro]
La vida es hermosa cuando la tienes,
la vida es un lujo cuando puedes vivirla,
pero hay millones que darían todo
por tener tu peor día de mierda.`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/3eh08DKPGmZPQwd1IudsBV",
      youtubeUrl: "https://www.youtube.com/watch?v=aeshG7nSrVI",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022838/Que_Suerte_Tienes_vwm4lz.png",
      message:
        '"Que Suerte Tienes" desnuda la contradicción entre la comodidad cotidiana y la tragedia global que millones viven a diario. La canción es un espejo incómodo que refleja cómo muchas veces olvidamos el privilegio de lo que tenemos, mientras otros luchan por sobrevivir.',
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song8.title);

  // Crear canción real: Cheto Rizo Trump
  const song9 = await prisma.song.create({
    data: {
      title: "Cheto Rizo Trump - Kaos Ekaitza",
      duration: "2:49",
      lyrics: `[Verso 1]
Ahí viene otra vez, el payaso naranja,
con su tupé de plástico y su asquerosa cara.
Promete muros, cadenas y odio,
se cree Jesucristo sentado en su trono.

Un ricachón de feria, un cartoon barato,
con manos de niño y cerebro en formato.
Cheto rizo Trump, rey de la mentira,
vende humo podrido y el pueblo conspira.

[Pre-Coro]
¿Dónde está tu gloria, magnate de cartón?
Sólo eres un meme con traje de león.

[Coro]
¡Cheto rizo Trump, caricatura infernal!
Un payaso de circo con ego nuclear.
¡Cheto rizo Trump, muñeco de cartón!
Te bailamos este ska mientras se hunde tu ilusión.

[Verso 2]
Grita “América First” con voz de niñato,
pero en la cocina solo hay McDonald’s barato.
Sueña con tanques, con bombas nucleares,
con que todos se arrodillen como putos anormales

Tuitea su rabia como un adolescente,
su ejército de trolls lo llama “presidente”.
Pero el mundo lo ve como un show decadente,
un rey de mentira, un payaso indecente.

[Pre-Coro]
¿Dónde está tu fuerza, ladrón del salón?
Solo eres un muppet con cara de limón.

[Coro]
¡Cheto rizo Trump, caricatura infernal!
Un payaso de circo con ego nuclear.
¡Cheto rizo Trump, muñeco de cartón!
Te bailamos este ska mientras se hunde tu ilusión.

[Puente – Spoken Word sarcástico/violento]
Escucha, cheto rizo:
Tus casinos quebraron, tu imperio se hundió,
y aún así pretendes ser el puto Dios.

Eres más falso que tu bronceado,
más ridículo que tu peinado.
South Park te dibuja y la risa estalla,
¡pero aquí en las calles empieza la batalla!

[Break – ska/punk acelerado con coros]
Oh-oh-oh, ¡payaso Trump!
Oh-oh-oh, cheto de cartón.
Oh-oh-oh, tu circo cayó,
¡el pueblo te grita: que te jodan, cabrón!

[Coro Final – más agresivo]
¡Cheto rizo Trump, caricatura infernal!
Un payaso de circo con ego nuclear.
¡Cheto rizo Trump, muñeco de cartón!
Te bailamos este ska mientras se hunde tu ilusión.

[Outro]
Cheto rizo Trump, marioneta imperial,
te manda a la mierda la voz popular.
Y cuando tu ego se caiga al vacío,
¡serás solo un chiste podrido y hundido!`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/3ZpGbmIsORsjZ52w54DKWy",
      youtubeUrl: "https://www.youtube.com/watch?v=ELazjVhCk-8",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022831/Cheto_Rizo_Trump_xvyzcb.png",
      message:
        '"Cheto Rizo Trump" convierte en sátira a uno de los símbolos del poder corrupto y grotesco. Un ska-punk mordaz y burlón que desarma la figura del magnate convertido en político, ridiculizando su ego desmesurado, su discurso vacío y su caricatura de líder autoritario.',
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song9.title);

  // Crear canción real: Flotilla Libertad
  const song10 = await prisma.song.create({
    data: {
      title: "Flotilla Libertad - Kaos Ekaitza",
      duration: "02:57",
      lyrics: `[Intro]
¡Arriad las velas, que ruja el tambor!
¡Contra el silencio navegamos hoy!

[Verso 1]
Barcos libres cruzando la marea,
traen vida y coraje, justicia que pelea.
El mar retumba con gritos de verdad,
¡si calla la ONU, la flota hablará!

[Pre-Coro]
Al abordaje del miedo y la rabia,
¡héroes del pueblo, la lucha no falla!

[Coro]
¡Flotilla libertad, no nos podrán parar!
¡Con valor y coraje, la marea va a ganar!
¡Flotilla libertad, tu ejemplo vivirá!
Si el mundo se esconde, la memoria gritará.

[Verso 2]
Bloquean las rutas, cadenas de hierro,
pero en nuestras manos no hay más que un anhelo.
Pan y medicinas, bandera de honor,
¡somos la tormenta que hunde al opresor!

[Pre-Coro]
Sin oro ni gloria, solo dignidad,
¡héroes del pueblo, justicia naval!

[Coro]
¡Flotilla libertad, héroes del mar!
¡Con valor y coraje, la marea va a ganar!
¡Flotilla libertad, tu ejemplo vivirá!
Si el mundo se esconde, la memoria gritará.

[Puente – estilo taberna marinera, voz grave + coros]
Eh-oh, eh-oh, ¡los mares rugirán!
Eh-oh, eh-oh, ¡al tirano hundirán!

[Break – ska-punk acelerado, como motín]
¡Eh-oh-oh! ¡Eh-oh-oh!
¡Héroes del mar contra el invasor!
¡Eh-oh-oh! ¡Eh-oh-oh!
¡La flota del pueblo jamás se rindió!

[Coro Final – más épico, doble velocidad]
¡Flotilla libertad, no nos podrán parar!
¡Con valor y coraje, la marea va a ganar!
¡Flotilla libertad, tu ejemplo vivirá!
Si el mundo se esconde, la memoria gritará.

[Outro – voz rasposa, lenta]
Levanta tu vaso, recuerda su andar,
¡héroes del pueblo, justicia en el mar!`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/5IGw7PP2KYxieX061kY58L",
      youtubeUrl: "https://www.youtube.com/watch?v=mJgfg_RXqtU",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022833/Flotilla_Libertad_kdyxci.png",
      message:
        '"Flotilla Libertad" rinde homenaje a l@s héroes del mar que arriesgan sus vidas llevando ayuda humanitaria al pueblo palestino. Con un estilo punk-rock intenso, combativo y cargado de emoción, la canción se convierte en un grito de solidaridad y resistencia frente a la pasividad de los poderes internacionales.',
      albumId: album1.id,
    },
  });

  console.log("🎵 Canción creada:", song10.title);

  // Crear canción real: Levántate (Album 2)
  const song11 = await prisma.song.create({
    data: {
      title: "Levántate - Kaos Ekaitza",
      duration: "3:34",
      lyrics: `[Intro]
Cuando la vida te presente razones para llorar, demuéstrale que tienes mil y una razones para reír.

Levantate...

[Verse 1]
Se que caíste otra vez, se que te dolió hasta el alma,
caíste tan fuerte que debilitó tu llama.
Miraste al suelo, sin aire, sin fe,
pero no te rendiste y te alzaste otra vez.

La vida te exprime, te dobla, te parte,
te enseña a sufrir para hacerte más grande.
No hay gloria sin golpes, ni luz sin dolor,
Recuerda ¡cada herida forja el valor!

[Pre-Chorus]
Porque nadie dijo que fuera fácil,
nadie prometió que sería justo,
pero piensa siempre en lo más importante,
un nuevo día te espera, adelante.

[Chorus]
¡Levántate! ¡aunque duela el cuerpo!
¡Levántate! ¡aunque el miedo te venza por dentro!
¡cada caída enseña!
¡que no hay victoria sin pena!

¡Levántate! ¡aunque el suelo te llame!
¡Levántate! ¡aunque el alma sangre!
¡Levántate! ¡siempre hacía la victoria!
¡Levántate! ¡y escribe tu historia!

[Verse 2]
Caerás mil veces, eso es seguro,
pero te levantarás más fuerte, más duro.
atravesamos el fuego, esquivamos la bruma,
nos follamos al miedo cuando brilla la luna.

La vida te empuja, te pone a prueba,
te rompe los huesos, te roba las fuerzas.
Pero si caes, y te vuelves a alzar,
Recuerda ¡es la vida queriendo enseñar!

[Pre-Chorus]
Porque el poder quiere verte roto,
sumiso, callado, tirado en el suelo,
pero tú no dejas que eso te afecte,
¡Levanta la cabeza y mira al frente!

[Chorus]
¡Levántate! ¡aunque duela el cuerpo!
¡Levántate! ¡aunque el miedo te venza por dentro!
¡cada caída enseña!
¡que no hay victoria sin pena!

¡Levántate! ¡aunque el suelo te llame!
¡Levántate! ¡aunque el alma sangre!
¡Levántate! ¡que la vida te reta!
¡Levántate! ¡Tu lucha te espera!

[Bridge]
Vas a caer.
Y va a doler.
Vas a pensar que no puedes más,
que todo fue en vano.

Pero ahí, justo ahí,
cuando todo arde,
cuando nadie te mira,
cuando sientes que no queda nada,
¡recuerda quién eres!
¡recuerda porqué empezaste!
¡y levántate una y mil veces más!

[Final Chorus]
¡Levántate! ¡aunque duela el cuerpo!
¡Levántate! ¡aunque el miedo te venza por dentro!
¡cada caída enseña!
¡que no hay victoria sin pena!

¡Levántate! ¡por los que ya no pueden!
¡Levántate! ¡por los que vienen delante!
¡Levántate! ¡que despierte tu llama!
¡Levántate! ¡Y devora el mañana!

[Outro]
Y si mañana vuelves a caer…
recuerda esto:
¡No hay derrota si te vuelves a poner en pie!
¡Levántate!`,

      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/2bu7ecSy4ST9x8RoHjdhdv",
      youtubeUrl: "https://www.youtube.com/watch?v=KrpL9PHmEX4",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022831/Lev%C3%A1ntate_wczimo.png",
      message:
        '"Levántate" es un llamado a la resiliencia y a la fuerza interior, una canción que convierte el dolor en motivación y la caída en aprendizaje. Con un sonido poderoso y lleno de energía, Kaos Ekaitza transforma el miedo, la derrota y la adversidad en un grito de esperanza y superación que toca el corazón de quien escucha.',
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song11.title);

  // Crear canción real: Enemigos de la Tempestad (Album 2)
  const song12 = await prisma.song.create({
    data: {
      title: "Enemigos de la Tempestad - Kaos Ekaitza",
      duration: "3:17",
      lyrics: `[Intro]
Nos quisieron en calma,
pero nacimos trueno.
Y ahora que retumba la garganta,
vienen a comprar silencio.

[Verso 1]
Nos criaron a hostias y sermones,
escuchando su veneno de oraciones,
a coser las cicatrices con canciones,
a vestir la rabia, a prohibir las opiniones.

Aprendimos que de bueno estás jodido,
que la lluvia no moja a quien ya se ha hundido,
que en el barro cualquier sueño se ha perdido,
y todo, hasta el silencio huele a ruido.

[Pre-Coro]
Nos quisieron dóciles, pero salimos fieras.
Nos llamaron locos, pero nos crecieron alas.
Y mientras la tempestad empuña un arma,
la tormenta aprende a bailar sobre su bruma.

[Coro]
¡Somos la tormenta, los hijos del trueno!
¡La voz que no calla, el puño del pueblo!
¡Qué tiemble su calma, que caiga su altar!
¡Somos la furia que no se deja domar!

[Verso]
Nos juraron verdades con la boca llena de billetes,
pero solo balas y mentiras escupen sus cañones.
Y aunque al pueblo le derrumben los dientes,
seguiremos cantando entre ruinas y prisiones.

No hay dios que apague esta llamarada,
ni rey que compre la dignidad.
Somos los perros que tanto ladran,
perros salvajes nos dirán.

[Coro]
¡Somos la tormenta, los hijos del trueno!
¡La voz que no calla, el puño del pueblo!
¡Que tiemble su calma, que rompa su altar!
¡Somos la furia que no se deja domar!

[Puente]
La tempestad sale de caza, con la mentira, y el rezo.
Nosotros somos lo que queda cuando se rompe el espejo.
Y si hemos de arder,
que sea gritando juntos,
hasta que el viento nos eche a volar.

[Coro Final]
¡Somos la tormenta que no se arrodilla!
¡Enemigos de la tempestad!
¡Nos duele el alma, pero brilla!
¡Arde calcinando la oscuridad!

[Outro]
Y si el trueno muere, que muera de pie.
Sólo los necios, se rinden a su merced.

Somos la tormenta perfecta... enemigos de la tempestad.
`,

      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/0xaSgrEJc1O82TH2HtiJp2",
      youtubeUrl: "https://youtu.be/FYPgoojC9FQ?si=1koZSV1agLtQ4qis",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022832/Enemigos_de_la_Tempestad_qkmly2.png",
      message:
        '"Enemigos de la Tempestad" es una declaración de guerra al engaño, un estruendo contra los falsos profetas del poder que visten de tormenta mientras pudren el mundo con mentiras. En un tiempo donde el ruido confunde y las sombras se disfrazan de luz, Kaos Ekaitza levanta su voz para recordar que no toda tormenta destruye. Porque la nuestra truena por la verdad, por la paz y por los que ya no tienen voz.',
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song12.title);

  // Crear canción real: El Pueblo Despierta (Album 2)
  const song13 = await prisma.song.create({
    data: {
      title: "El Pueblo Despierta - Kaos Ekaitza",
      duration: "3:50",
      lyrics: `¡ARABAKO INDARRA! 
¡FORÇA BARCELONA! 

¡EL PUEBLO DESPIERTA!
¡NO PASARÁN!

[Spoken Intro]
 Dicen que el silencio es paz…
 Pero en ocasiones el silencio debe cesar.
 Cuando el odio amenaza en las calles,
 ¡la voz del pueblo nos vuelve inmortales!

[Introduction]
 Pájaros libres surcan el aire,
 la tormenta anuncia la lucha,
 el pueblo despierta,
 ¡y el miedo se derrumba!

[Verse 1]
 Desde Vitoria hasta Barcelona,
 el fuego del pueblo ya no perdona.
 Bandas de odio buscan dividir,
 pero hay un latido que no va a morir.
 Que ruja el trueno, puños en alto,
 la calle arde, ya no hay descanso.
 La juventud levanta su voz,
 contra el fascista y su falso dios.

[Pre-Chorus]
 ¡Ni un paso atrás! ¡Ni un paso atrás!
 Que tiemblen los muros, no van a pasar.

[Chorus]
 ¡Despierta el pueblo, despierta ya!
 En cada calle, la dignidad.
 ¡Despierta el fuego, no pasarán!
 La historia es nuestra, no nos vencerán.

[Verse 2]
 Intentan vendernos miedo y frontera,
 pero el odio nunca será bandera.
 Nos quieren sumisos, mirando al suelo,
 pero la lucha aumenta, incendiemos el cielo.

 Las plazas llenas, la libertad unida,
 es el rugido de la vida.
 Vitoria se levanta, Barcelona no cede,
 fascistas asquerosos… ¡ya nadie os teme!

[Pre-Chorus]
 ¡No pasarán! ¡No pasarán!
 El odio muere frente al mar.

[Chorus]
 ¡Despierta el pueblo, despierta ya!
 ¡Rompe el silencio, no pasarán!
 ¡Despierta el fuego, en cada ciudad!
 ¡La lucha avanza, no nos vencerán!

[Bridge]
 No hay banderas que tapen el sol,
 ni mordazas para el corazón.
 El antifascismo no es una opción,
 es defensa, es revolución.

[Chorus]
 ¡Despierta el pueblo, despierta ya!
 ¡En cada calle, la dignidad!
 ¡Despierta el fuego, no pasarán!
 ¡La historia es nuestra… no nos vencerán!

[Outro]
 No hay paz sin justicia.
 No hay justicia sin memoria.
 Y el pueblo… no olvida la historia.

[Final Chorus]
 ¡Despierta el pueblo, despierta ya!
 ¡En cada calle, la dignidad!
 ¡Despierta el fuego, no pasarán!
 ¡La historia es nuestra… no nos vencerán!`,

      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/4Wlgm5ATn0G8KxwreE8MI1",
      youtubeUrl: "https://youtu.be/YXkuEXndiUE?si=g3emH1c_yktPZPnM",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022831/Despierta_el_Pueblo_cpiavw.png",
      message:
        '"Despierta el Pueblo" es un himno a la resistencia y la dignidad frente al odio y la provocación. Inspirada por los recientes actos de firmeza del pueblo vasco y catalán, la canción rinde homenaje a Vitoria-Gasteiz y Barcelona, ciudades que se han alzado contra el fascismo y la intolerancia.',
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song13.title);

  // Crear canción real: Intifada (Album 2)
  const song14 = await prisma.song.create({
    data: {
      title: "Intifada - Kaos Ekaitza",
      duration: "3:09",
      lyrics: `[Intro]
Esta va por los más grandes, ¡Skape!

[Verse 1]
Veintitrés años gritando unidos,
la voz resuena en cada latido.
David fue Goliat, la historia no acaba,
el pueblo resiste, la lucha no falla.

El mundo levanta cadenas de hierro,
expulsan familias, condenan a pueblos.
El odio se esconde tras leyes y rezos,
¡la mentira gobierna, la verdad es su miedo!

[Pre-Chorus]
¡Ooohooh! El grito no muere,
El mundo lo siente.
¡Ooohooh! La lucha no acaba,
Palestina se levanta.

[Chorus - Powerful]
¡Intifada! ¡intifada!
La voz del pueblo nunca se apaga.
¡Intifada! ¡liberación!
Contra el genocidio, ¡revolución!
[ska-punk break]

[Verse 2]
Skape lo cantó, y hoy lo repetimos,
de la sangre inocente somos los testigos.
De Gaza a Cisjordania, de norte a sur,
la vida persiste, David aún resiste.

No hay dios ni bandera que justifique,
que un niño muera y el mundo lo evite.
La voz de la calle desata tormentas,
la lucha del pueblo no tiene fronteras.

[Pre-Chorus]
¡Ooohooh! Que tiemble la tierra,
Romper las cadenas.
¡Ooohooh! La lucha es eterna,
Palestina resiste!

[Chorus]
¡Intifada! ¡intifada!
La voz del pueblo nunca se apaga.
¡Intifada! ¡liberación!
Contra el genocidio, ¡revolución!
[ska-punk break]

[Bridge]
No podrán callar el rugido del viento,
ni borrar la historia plasmada en el lienzo.
Por cada silencio, mil voces despiertan,
¡la lucha del pueblo no tiene fronteras!

No hay muro que encierre la dignidad,
ni bala que apague la libertad.
Del polvo renace la llama encendida,
¡la tierra respira, la vida resiste!

[Final Chorus]
¡Intifada! ¡intifada!
La voz del pueblo nunca se apaga.
¡Intifada! ¡liberación!
La verdad florece entre la opresión.

¡Intifada! ¡intifada!
Del fuego renace la esperanza.
¡Intifada! ¡liberación!
El grito del pueblo es revolución.
[ska-punk break]

[Outro]
Intifada…
la voz del mañana.
Intifada…
la llama no se apaga.
Intifada…
de pie, corazón,
porque el pueblo vive en cada canción.`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/59ezue1JUS2tX03D6ECJL9",
      youtubeUrl: "https://youtu.be/osTGRJD95zc?si=HL0J_t59qbTorKdh",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022827/Intifada_alhmeu.png",
      message:
        '"Intifada" es un grito de resistencia, una canción que une música y memoria para rendir homenaje a la lucha del pueblo palestino. Con un sonido ska-punk combativo y emotivo, Kaos Ekaitza transforma la rabia y la impotencia en energía colectiva, en un canto de esperanza que atraviesa fronteras y desafía la opresión.',
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song14.title);

  // Crear canción real: Lluvia de Mentiras (Album 2)
  const song15 = await prisma.song.create({
    data: {
      title: "Lluvia de Mentiras - Kaos Ekaitza",
      duration: "5:15",
      lyrics: `[Verso 1]
Una madre está aterrada en la noche,
ya no recuerda desde cuando no duerme,
teme que al cerrar los ojos el demonio se acerque,
y la lluvia de fuego a sus hijos se lleve.

Un niño respira y ya es juzgado,
como un terrorista, nació condenado.
El mundo ha sucumbido en la oscuridad,
le niega la vida, destruyen su verdad

[Pre-Coro]
En las pantallas dibujan pecados,
con tinta de sangre, con hilos comprados.
Fabrican monstruos, inventan guerras,
y sus mentiras cubren los ojos con vendas.

[Coro]
¡Lluvia de mentiras¡ !procedentes de Israel!
¡Manos inocentes marcadas con hiel!
Dicen que el enemigo es quien nace sin nada,
Mientras los verdugos se jactan con saña.
¡Yo no voy a callar,
yo no voy a ceder!
¡Los gritos de los niños despertaron la razón!
¡La tormenta ya está encima, la verdad se reveló¡

[Verso 2]
Él juega en ruinas, juguetes de piedra,
ella susurra canciones, su alma tiembla,
El futuro es oscuro, el presente una herida,
infancia prohibida, esperanza perdida.

La verdad se esconde detrás de banderas,
la mentira avanza vestida de sedas.
Cada discurso que excusa la muerte
es otra bala que siempre revierte.

[Pre-Coro]
En tu salón consumes su cuento,
te venden culpables, disfrazan el viento.
Te roban la mente, te roban el corazón,
quieren que asumas que es suya la razón.

[Coro]
¡Lluvia de mentiras¡ !procedentes de Israel!
¡Manos inocentes marcadas con hiel!
Dicen que el enemigo es quien nace sin nada,
Mientras los verdugos se jactan con saña.
¡Yo no voy a callar,
yo no voy a ceder!
¡Los gritos de los niños despertaron la razón!
¡La tormenta ya está encima, la verdad se reveló¡

[Puente]
Acércate a ese niño y dile que es culpable.
Míra sus ojos, dile que es el responsable
Muestrale tu odio mientras el hambre se lo lleva,
Recuerda cuál fué tu posición cuando caiga el telón.

[Coro Final]
¡Lluvia de mentiras¡ !procedentes de Israel!
¡Manos inocentes marcadas con hiel!
Dicen que el enemigo es quien nace sin nada,
Mientras los verdugos se jactan con saña.
¡Yo no voy a callar,
yo no voy a ceder!
¡Los gritos de los niños despertaron la razón!
¡La tormenta ya está encima, la verdad se reveló¡

[Outro]
esperanzas prohibidas, llantos de sangre,
pueblo que grita, la muerte no cesa.
Las mentiras crecen tras el cristal,
pero la tormenta estalla, despertando la verdad`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/6s8uuSzkqiRugJm54twoa5",
      youtubeUrl: "https://youtu.be/aIsLcyxvmgI?si=KRvC3Ne4KDaw2sQI",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022828/Lluvia_de_Mentiras_noefl5.png",
      message:
        '"Lluvia de Mentiras" es una canción de Kaos Ekaitza que desenmascara la manipulación de los medios de comunicación y denuncia cómo las narrativas oficiales sirven para justificar guerras, ocultar genocidios y sembrar odio contra los pueblos más vulnerables.',
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song15.title);

  // Crear canción real: Fuego y Raíz (Album 2)
  const song16 = await prisma.song.create({
    data: {
      title: "Fuego y Raíz - Kaos Ekaitza",
      duration: "3:12",
      lyrics: `[Introduction]
Fuego y raíz, del barrio al corazón,
la tormenta despierta, al ritmo del león.

[Verse 1]
Caminos que hablan, raíces que arden,
las voces del pueblo no pueden taparse.
Del humo y la hierba renace ese olor,
la tierra respira, la lucha es amor.

[Pre-Chorus]
Que se escuche la voz de la verdad,
La tormenta llama a la unidad.

[Chorus]
¡Get up! (get up) ¡Stand up! (stand up) que retumbe la conciencia,
¡One love! (one love) ¡One heart! (one heart) la esperanza es resistencia,
Fuego y raíz, del alma a la ciudad,
Bob encendió la llama de la libertad.

[Verse 2]
No hay cadenas que frenen nuestros pasos,
la tormenta avanza, sin descanso.
De Trench Town al barrio, la historia cantó,
el humo en el viento, al pueblo unió.

[Pre-Chorus]
Que resuenen los tambores de paz,
Que el trueno del pueblo deslumbre verdad.

[Chorus]
¡Get up! (get up) ¡Stand up! (stand up) que retumbe la conciencia,
¡One love! (one love) ¡One heart! (one heart) la esperanza es resistencia,
Fuego y raíz, del alma a la ciudad,
Bob sembró la llama de la libertad.

[Verse 3]
Que el humo se eleve, que el ritmo nos una,
que el odio se apague, que el alma perdura.
De norte a sur, del trueno al clamor,
la calle despierta, rugiendo en su honor.

[Bridge]
Que las nubes se alcen, y la lluvia reviente,
que el grito del pueblo despierte a la gente.
Y si el miedo se aferra, le haremos saber:
¡no hay fuerza más pura que un pueblo en pie!

[Final Chorus]
¡Get up! (get up) ¡Stand up! (stand up) que retumbe la conciencia,
¡One love! (one love) ¡One heart! (one heart) la esperanza es resistencia,
Fuego y raíz, del alma a la ciudad,
Bob sembró la llama de la libertad.

[Repeat]
Fuego y raíz, del alma a la ciudad,
Kaos y Marley, por la misma verdad.

¡Get up! (get up) ¡Stand up! (stand up) que retumbe la conciencia,
¡One love! (one love) ¡One heart! (one heart) la esperanza es resistencia,
Fuego y raíz, del alma a la ciudad,
Bob sembró la llama de la libertad.`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/3ifrC11a0FgMKRCM48xzUh",
      youtubeUrl: "https://youtu.be/e8NMr6Cj-Bc?si=CPtqOQJOLwND-Pca",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022835/Fuego_y_Ra%C3%ADz_og09ge.png",
      message:
        '"Fuego y Raíz" es un homenaje a la esencia que nunca muere, al fuego que enciende la conciencia y a las raíces que nos mantienen firmes frente al viento. Una canción donde Kaos Ekaitza une el reggae, el ska y el punk en un mismo grito de libertad, inspirada en el legado eterno de Bob Marley y en la fuerza del pueblo que no se rinde.',
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song16.title);

  // Crear canción real: Miss Nuclear (Album 2)
  const song17 = await prisma.song.create({
    data: {
      title: "Miss Nuclear - Kaos Ekaitza",
      duration: "3:54",
      lyrics: `[Spoken Intro]
 Y desde el corazón del desastre global…
 ¡Démosle la bienvenida a la reina del desfile!
 Brillando con uranio,
 luciendo su sonrisa radiactiva…
 ¡Ella es… Miss Nuclear!

[Introduction]
 Pies de hierro sobre el asfalto,
 Los bosques tiemblan a su paso.
 Luces, discursos, flores, color…
 La guerra desfila con traje de honor.

[Verse 1]
 Miss Nuclear camina entre humo y metralla,
 sus tacones resuenan como bombas en batalla.
 El mundo la mira, rendido y servil,
 le ponen corona… de uranio febril.

Su sonrisa brilla, en la televisión,
 un millón de almas sin conexión.
 Desfila la muerte, envuelta en cristal,
 con un beso pintado, artificial.

[Pre-Chorus]
 Y el jurado de la historia aplaude de pie,
 por la belleza del poder.

[Chorus]
 ¡Miss Nuclear, reina del final!
 ¡Tu fuego baila, el ritmo letal!
 ¡Miss Nuclear, madre del dolor!
 ¡Tu luz nos abrasa, nos roba el color!

[Verse 2]
 Bajo el desfile hay rostros con anhelo,
 sus ojos desean ver arder el cielo.
 Pero ella sonríe, radiante y feliz,
 no ve nada más allá de su nariz.

Las potencias beben del mismo vaso,
 brindan por paz… en su propio ocaso.
 El humo del tiempo lo cubre todo,
 los demonios planean el nuevo éxodo

[Pre-Chorus]
 Y el jurado de la historia vuelve a aplaudir,
 sin saber… que todos van a morir.

[Chorus]
 ¡Miss Nuclear, reina del final!
 ¡Tu fuego baila, el ritmo letal!
 ¡Miss Nuclear, madre del dolor!
 ¡Tu luz nos abrasa, nos roba el color!

[Bridge]
 ¿Quién la coronó?
 ¿Quién le dio su voz?
 ¿Quién la vistió con miedo y esplendor?
 En su espejo no hay belleza ni fe,
 solo el reflejo… del infierno y su poder.

[Final Chorus]
 ¡Miss Nuclear, reina del final!
 ¡Tu trono es humo, tu reino irreal!
 ¡Miss Nuclear, madre del dolor!
 ¡Enemiga de la vida, solo traerás horror!

[Outro]
 Y en el silencio que deja a su paso,
 solo proyecta… un mundo en pedazos

[Chorus]
 ¡Miss Nuclear, reina del final!
 ¡Tu fuego baila, el ritmo letal!
 ¡Miss Nuclear, madre del dolor!
 ¡Tu luz nos abrasa, nos roba el color!`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/4VfNMSMrK04dfORCLSekvl",
      youtubeUrl: "https://youtu.be/g-JD-5XMpwQ?si=eHrC3c3xR14tQn3b",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022828/Miss_Nuclear_uwvunb.png",
      message:
        '"Miss Nuclear" es una radiografía sarcástica del delirio de las potencias: un desfile donde la muerte viste de gala y el miedo se aplaude como espectáculo. La canción retrata ese tóxico culto moderno a la destrucción que se esconde tras la palabra "defensa".',
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song17.title);

  // Crear canción real: Renace (Album 2)
  const song18 = await prisma.song.create({
    data: {
      title: "Renace - Kaos Ekaitza",
      duration: "3:18",
      lyrics: `[Intro] 
Consumieron tu llama, pero aún respiras. 
Y mientras arda el aliento, seguirá encendida. 

[Verse 1] 
Te dijeron que no podías, y dudaste, 
te hundieron el alma, y te callaste. 
Pero el fuego duerme, nunca muere, 
espera el momento en que renace. 

Entre las ruinas de tus intentos, 
hay semillas creciendo en silencio.
Cada lágrima que pensaste perdida, 
riega la senda que te devuelve la vida. 

[Pre-Chorus] 
No hay caída eterna, 
solo la tiniebla ciega. 
Y aunque duela el paso, truena, 
se la luz de la tormenta. 

[Chorus] 
¡Renace! ¡Desde tus propias cenizas! 
¡Que el dolor cicatriza! 
¡No hay invierno que dure en tu pecho, 
ni pesadillas viviendo en tu lecho! 

[Verse 2] 
Te hicieron creer que eras derrota, 
pero fuiste tormenta, pesadilla del déspota. 
El miedo rugió, pero no te venció, 
porque el fuego no teme: ¡renace! 

Tu senda te espera tras el derrumbe, 
latido en silencio, pero nunca se hunde. 
Y si tiemblas, que tiemble contigo el suelo, 
que el cielo se parta, y responda el trueno. 

[Pre-Chorus] 
No mires atrás, 
no busques más penas, 
si algo te ató… 
ya corren libres tus piernas. 

[Chorus] 
¡Renace! 
¡Desde tus propias cenizas! 
¡Que el miedo agoniza! 
¡No hay sombra que apague tu nombre, 
ni sueños que teman ser libres! 

[Bridge] 
La sombra te quiso pisar, pero no lo logró. 
Cada vez que sangraste, nació un color. 
Y si un día el cielo vuelve a caer, 
recuerda lo que eres: 

Eres fuego, 
¡Fuego que siempre vuelve a prender! 

[Final Chorus] 
¡Renace! ¡Por los tuyos, por ti! 
¡Por todo lo que queda aquí! 
¡Que tiemble la noche, que ruja el dolor, 
del polvo renace el valor! ¡Renace! 

¡Que el mundo despierte! ¡Renace! 
¡Que el miedo tiemble! 
¡Que tu grito reviente el silencio! ¡Renace! 
¡Libre, loco y eterno! 

[Outro]
No hay final… 
solo una chispa que surca el viento, 
para volver a arder 
con cada aliento.

Renace...
Renace...
Renace...`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/4XToDcT2UTq5yv1BjgsHyr",
      youtubeUrl: "https://www.youtube.com/watch?v=k3Rr440bVt0",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022831/Renace_psa4re.png",
      message:
        "“Renace” es un canto a la transformación, una declaración de que incluso después de perderlo todo, sigue existiendo algo que arde dentro: la voluntad de volver a empezar. En este tema, Kaos Ekaitza convierte las cicatrices en símbolos de poder y las caídas en el impulso que enciende una nueva vida.",
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song18.title);

  // Crear canción real: Memoria que Truena (Album 2)
  const song19 = await prisma.song.create({
    data: {
      title: "Memoria que Truena - Kaos Ekaitza",
      duration: "4:22",
      lyrics: `[Intro]
No pedimos odio.
Pedimos verdad.
Que cada nombre caído
regrese, se vuelva a alzar.
Que la tormenta no sea amenaza,
sino casa… despertar.

[Verso 1]
Vuelven viejas sombras con sonrisa nueva,
prometen descanso, traen la cuerda.
Pero en la grieta crece la raíz,
y en cada raíz despierta una voz.
No es odio lo que nos levanta,
es la dignidad que nunca descansa.
Si la mentira quiere mandar,
que hable la lluvia al reventar.

[Pre-Coro]
Junta tu aliento con el mío,
que el miedo se quede frío.
Cuando una voz se vuelve dos,
tiembla la noche… y nace el sol.

[Coro]
Por quienes ya no vuelven: ¡memoria que truena!
Por quienes aún resisten: la lluvia nos guía.
Carlos vive. Las Rosas respiran.
Gernika no olvida. La lucha camina.

[Verso 2]
Vi cuartos vacíos, tazas en la mesa,
fotos torcidas que nadie endereza.
Vi calles sin risas, manos de sal,
vi promesas rotas en un portal.
Pero también vi a la vecina abrir,
compartir pan, enseñar a vivir.
Vi niñas cantar “nunca jamás”,
y el corazón volver a andar.

[Pre-Coro]
Si tropiezas, toma mi paso,
si me rompo, dame tu abrazo.
Que no haya cuerpo fuera del fuego
que a los vivos reúne de nuevo.

[Coro]
Por quienes ya no vuelven: ¡memoria que truena!
Por quienes aún resisten: la lluvia nos guía.
Carlos vive. Las Rosas respiran.
Gernika no olvida. La lucha camina.

[Puente]
No pedimos calma: pedimos verdad.
No queremos venganza:
sino libertad.
Que cada fosa encuentre su nombre,
que cada nombre encuentre su casa.
Que nadie vuelva a temer la noche,
que nadie venda la esperanza.

[Interludio]
Gernika bajo el relámpago.
Madrid con su herida abierta.
Los nombres susurrados en las cunetas.
Carlos en un andén que no calla.
Trece Rosas amaneciendo.
Manos que sostienen la tierra.
El viento trae su verdad:
seguimos.

[Break]
¿Qué nos sostiene? La memoria viva.
¿Qué nos reúne? La voz compartida.
¿Qué nos defiende? La verdad que brilla.
¿Qué nos empuja? La tormenta unida.

[Coro]
Por quienes ya no vuelven: ¡memoria que truena!
Por quienes aún resisten: la lluvia nos guía.
Carlos vive. Las Rosas respiran.
Gernika no olvida. La lucha camina.

[Outro]
Que nadie nos compre, que nadie nos mida,
si estamos juntas… la noche termina.
Carlos vive. Las Rosas respiran.
Gernika no olvida. La lucha camina.

Cuando el trueno se apague,
que siga el latido.
La tormenta no muere:
cambia de sitio.
Y vuelve a empezar… contigo.`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/1bKhe48ijZvv5zElrYAnTq",
      youtubeUrl: "https://www.youtube.com/watch?v=0HcD7LXaqVE",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022829/Memoria_que_Truena_lc1ag2.png",
      message:
        "“Memoria que Truena” es una canción que nace del eco de los que ya no están, pero siguen respirando en cada gesto de dignidad.",
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song19.title);

  // Crear canción real: Renace (Album 2)
  const song20 = await prisma.song.create({
    data: {
      title: "La Tormenta - Kaos Ekaitza",
      duration: "3:24",
      lyrics: `Subí a la colina con mis penas y lamentos,
y la noche me respondió trayendo truenos.
Creí estar solo, la calma me encontraba,
pero fue la tormenta quien me hablaba.

Lluvia cayendo sobre mi pena,
cada gota, una verdad ajena.
El cielo rugía por los olvidados,
por los que luchan y no son nombrados.

Yo le mostraba en la oscuridad mi problema,
y ella me devolvía con fuerza su condena.
No hay soledad cuando duele el mundo,
solo silencio… y un corazón profundo.

Y entendí del trueno la verdad en su interior:
mis penas eran un lujo al lado de su dolor.

¡Cuando habla la tormenta, muestra la herida!
¡Rompe las sombras, diluvia la vida!
¡Su caos nos ha unido en un mismo camino,
la tormenta ha forjado en las calles su grito!

Los rayos pintaban el horizonte,
mostrando rostros bajo el monte.
Vivos sin techo, muertos sin suelo,
ojos que buscan esperanza y consuelo.

Y supe entonces que no era azar:
era el mundo pidiendo hablar.
La tormenta no destruye, reivindica;
muestra su dolor, desnuda la mentira.

No temas al trueno,
es un grito de esperanza.
La lluvia no cae sin razón:
pelea por la vida sin condición.

¡Cuando habla la tormenta, muestra la herida!
¡Rompe las sombras, diluvia la vida!
¡Su caos nos ha unido en un mismo camino,
la tormenta ha forjado en las calles su grito!

¡Cuando el cielo reviente, no corras más!
¡Ábrele el alma… y escucha su verdad!
`,
      audioUrl: null,
      spotifyUrl:
        "https://open.spotify.com/intl-es/track/54mCB4n7A7bRtyfo4BALGB",
      youtubeUrl: "https://www.youtube.com/watch?v=LzFqpR6t9As",
      coverImage:
        "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771022827/La_Tormenta_sjax7l.png",
      message:
        "La Tormenta nace del dolor, de lo olvidado,de los que siguen resistiendo cuando el mundo se cae.",
      albumId: album2.id,
    },
  });

  console.log("🎵 Canción creada:", song20.title);

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
