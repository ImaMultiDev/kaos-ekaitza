# 🎵 Kaos Ekaitza - Canal Musical Ska-Punk Antifascista

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Railway-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
</div>

## 🌟 Sobre el Proyecto

**Kaos Ekaitza** es una aplicación web completa para un canal musical ska-punk antifascista que promueve la resistencia pacífica, la justicia social y el cambio positivo a través de la música.

El nombre refleja nuestra esencia: **"Kaos"** representa la ruptura con las estructuras opresivas, mientras que **"Ekaitza"** (tormenta en euskera) simboliza la fuerza transformadora de nuestro mensaje.

## ⚡ Características Principales

- 🎵 **Reproductor de música integrado** con controles completos
- 🎨 **Diseño ska-punk auténtico** con paleta negro/rojo y bandas características
- 📱 **Totalmente responsive** y optimizado para todos los dispositivos
- 🖼️ **Galería multimedia** con lightbox para fotos, videos y audio
- 📰 **Sistema de noticias** y blog integrado
- 💌 **Formulario de contacto** y suscripción al newsletter
- 🎭 **Páginas informativas** sobre la filosofía y valores del canal
- 🔒 **Base de datos robusta** con Prisma y PostgreSQL

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 15** con App Router y Server Components
- **React 19** con Hooks modernos
- **TypeScript** para seguridad de tipos
- **Tailwind CSS v4** con variables CSS personalizadas
- **Lucide React** para iconografía
- **Framer Motion** para animaciones

### Backend & Base de Datos

- **Prisma ORM** para manejo de base de datos
- **PostgreSQL** desplegado en Railway
- **Modelo de datos completo** (Albums, Songs, Posts, Comments, etc.)

### Herramientas

- **ESLint** con configuración Next.js
- **TypeScript** con strict mode
- **Git** para control de versiones

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone [URL_DEL_REPO]
cd kaos_ekaitza
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz:

```env
DATABASE_URL="postgresql://usuario:password@host:puerto/database"
NEXTAUTH_SECRET="tu-secreto-seguro"
```

### 4. Configurar base de datos

```bash
# Generar cliente de Prisma
npx prisma generate

# Sincronizar esquema con la base de datos
npx prisma db push

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📁 Estructura del Proyecto

```
kaos_ekaitza/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── album/             # Página de discografía
│   │   ├── contacto/          # Página de contacto
│   │   ├── galeria/           # Galería multimedia
│   │   ├── sobre-nosotros/    # Información del canal
│   │   ├── globals.css        # Estilos globales ska-punk
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   ├── components/            # Componentes reutilizables
│   │   ├── AlbumGrid.tsx      # Grid de álbumes
│   │   ├── ContactForm.tsx    # Formulario de contacto
│   │   ├── Footer.tsx         # Footer del sitio
│   │   ├── GalleryGrid.tsx    # Galería con lightbox
│   │   ├── HeroSection.tsx    # Sección principal
│   │   ├── LatestMusic.tsx    # Últimas canciones
│   │   ├── MusicPlayer.tsx    # Reproductor musical
│   │   ├── Navbar.tsx         # Navegación principal
│   │   ├── NewsSection.tsx    # Sección de noticias
│   │   └── PhilosophySection.tsx # Filosofía del canal
│   └── lib/
│       ├── prisma.ts          # Cliente de Prisma
│       └── utils.ts           # Utilidades compartidas
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
└── public/                    # Archivos estáticos
```

## 🎨 Filosofía de Diseño

El diseño visual está inspirado en la cultura ska-punk y el movimiento antifascista:

- **Paleta de colores**: Negro dominante con rojo intenso para elementos de acción
- **Tipografía**: Inter para legibilidad con pesos bold para títulos
- **Patrones ska**: Bandas diagonales y horizontales características
- **Efectos hover**: Transiciones suaves con feedback visual
- **Responsive**: Mobile-first con breakpoints adaptativos

## 🌍 Valores y Misión

- **🛡️ Antifascismo**: Resistencia pacífica contra toda forma de opresión
- **❤️ Paz y Amor**: Promovemos la unidad y el respeto por la diversidad
- **🌍 Justicia Social**: Luchamos por un mundo más justo e igualitario
- **🎵 Música Consciente**: La música como herramienta de cambio social

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Configuración de Producción

```env
DATABASE_URL="tu-url-de-railway"
NEXTAUTH_URL="https://tu-dominio.vercel.app"
NEXTAUTH_SECRET="secreto-de-produccion"
```

## 🤝 Contribuir

Este proyecto promueve valores de paz, justicia y resistencia pacífica. Las contribuciones son bienvenidas siempre que respeten estos principios.

1. Fork del proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🎵 Créditos

Desarrollado con 💚 para promover el cambio social a través de la música ska-punk.

_"La música es el arma más poderosa para el cambio social pacífico"_

---

<div align="center">
  <strong>🔴⚫ No al fascismo, sí a la música ⚫🔴</strong>
</div>
