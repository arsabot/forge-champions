# 🚀 Forge Champions — Portal & Landing MVP
> **Iniciativa de la Fundación Forge**  
> Plataforma para conectar la experiencia corporativa de alto nivel con el talento joven del futuro a través de masterclasses en vivo y contenido educativo.

---

## 📋 Tabla de Contenidos
1. [Stack Tecnológico](#-stack-tecnológico)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Cómo Funciona la Arquitectura (Frontend + Backend + Supabase)](#-cómo-funciona-la-arquitectura)
4. [Guía de Ejecución](#-guía-de-ejecución)
   - [Opción A: Ver la App en el Servidor Remoto (AWS EC2)](#opción-a-ver-la-app-en-el-servidor-remoto-aws-ec2)
   - [Opción B: Correr en tu Computadora Local](#opción-b-correr-en-tu-computadora-local-mac--windows)
   - [Opción C: Túnel SSH](#opción-c-túnel-ssh-si-la-ip-directa-está-restringida)
5. [Configuración de Base de Datos (Supabase)](#-configuración-de-base-de-datos-supabase)
6. [Módulos y Funcionalidades Clave](#-módulos-y-funcionalidades-clave)
7. [Comandos de Administración con PM2](#-comandos-de-administración-con-pm2)

---

## 🛠️ Stack Tecnológico

- **Frontend & Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19, TypeScript).
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) con diseño responsive, paleta corporativa y animaciones suaves.
- **Iconos:** [Lucide React](https://lucide.dev/).
- **Base de Datos & BaaS:** [Supabase](https://supabase.com/) (PostgreSQL con Row Level Security y API REST automática).
- **Process Manager en Producción:** [PM2](https://pm2.keymetrics.io/) para ejecución persistente 24/7 en segundo plano.

---

## 📂 Estructura del Proyecto

```
Team-7/
├── 📂 app/
│   ├── layout.tsx              # Layout raíz con metadatos SEO y tipografía
│   ├── page.tsx                # Página principal con todos los componentes interactivos
│   └── globals.css             # Configuración base de Tailwind CSS
├── 📂 lib/
│   └── supabase.ts             # Cliente de conexión e interfaces TypeScript (CRUD)
├── 📂 supabase/
│   └── schema.sql              # Script SQL con esquemas, ENUMs, tablas, RLS y Seed Data
├── .env.local.example          # Plantilla para variables de entorno de Supabase
├── next.config.js              # Configuración de Next.js
├── package.json                # Dependencias del proyecto
├── postcss.config.js           # Plugins de PostCSS
├── tailwind.config.js          # Configuración de selectores y tema de Tailwind
├── tsconfig.json               # Configuración de TypeScript
├── Team-7.pem                  # Llave SSH para acceso al servidor AWS EC2
├── Team-7_Server_Details.txt   # Credenciales e IP del servidor
└── README.md                   # Esta documentación
```

---

## 🧠 ¿Cómo Funciona la Arquitectura?

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Cliente)                      │
│  React 19 + Next.js (app/page.tsx)                          │
└───────────────┬─────────────────────────────▲───────────────┘
                │                             │
    1. Form Submit (INSERT)      2. Consultas (SELECT)
    3. Validación de Zoom                     │
                │                             │
                ▼                             │
┌─────────────────────────────────────────────┴───────────────┐
│               SUPABASE (PostgreSQL + PostgREST)             │
│  - API REST generada automáticamente sobre las tablas       │
│  - Seguridad por fila (RLS Policies)                        │
│  - Tablas: postulaciones_champion, sesiones_masterclass    │
└─────────────────────────────────────────────────────────────┘
```

### ¿Dónde está el CRUD?
En arquitecturas modernas con **Supabase**, la base de datos PostgreSQL expone una capa de API REST nativa. Por lo tanto, no hace falta crear un servidor Node.js/Express tradicional desde cero:

1. **Lectura (READ):** En `app/page.tsx`, `fetchSesiones()` ejecuta una consulta `supabase.from('sesiones_masterclass').select(...)` con relación `JOIN` a las postulaciones.
2. **Escritura (CREATE):** Al enviar el formulario, `handleSubmit()` ejecuta `supabase.from('postulaciones_champion').insert(...)`.
3. **Manejo Offline / Fallback:** Si las variables de Supabase aún no están configuradas, la app incluye datos de muestra realistas (charla TED de Susan Cain, ingenieros de Mercado Libre, Google, AWS, Globant, etc.) para que la interfaz siempre funcione.

---

## 💻 Guía de Ejecución

### Opción A: Ver la App en el Servidor Remoto (AWS EC2)

La aplicación ya está compilada y corriendo en vivo con **PM2** en el servidor de AWS.

- **URL de acceso directo:**  
  👉 **[http://ec2-52-90-35-158.compute-1.amazonaws.com:3000](http://ec2-52-90-35-158.compute-1.amazonaws.com:3000)**

*(Nota: Asegúrate de estar conectado a la red/VPN requerida de JPMC para acceder a la IP).*

---

### Opción B: Correr en tu Computadora Local (Mac / Windows)

Si prefieres levantar el proyecto en tu propia máquina:

1. **Entrar a la carpeta del proyecto:**
   ```bash
   cd ~/Desktop/forge-champions
   # o bien: cd /Users/Ariel/.gemini/antigravity-ide/scratch/forge-champions
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en tu navegador:**
   ```
   http://localhost:3000
   ```

---

### Opción C: Túnel SSH (Si la IP directa está restringida)

Si tu red corporativa bloquea el puerto 3000 hacia el exterior, puedes hacer un túnel seguro desde tu Mac hacia el servidor remoto:

1. En tu terminal de Mac ejecuta:
   ```bash
   ssh -L 3000:localhost:3000 -i /Users/Ariel/.gemini/antigravity/scratch/Team-7/Team-7.pem force@ec2-52-90-35-158.compute-1.amazonaws.com
   ```
2. Mientras dejes esa terminal abierta, entra en tu navegador a:
   👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🗄️ Configuración de Base de Datos (Supabase)

Para conectar tu propia base de datos en la nube de Supabase:

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. Ve al **SQL Editor** y pega todo el contenido de [`supabase/schema.sql`](supabase/schema.sql).
3. Haz clic en **Run** para crear:
   - Extensión `uuid-ossp`.
   - Tipos ENUM (`estado_postulacion_enum`, `estado_sesion_enum`).
   - Tablas `postulaciones_champion` y `sesiones_masterclass`.
   - Políticas de seguridad RLS.
   - Datos iniciales (Seed Data).
4. Copia tu **Project URL** y **Anon Public Key** desde *Project Settings > API*.
5. Crea tu archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```

---

## 🌟 Módulos y Funcionalidades Clave

### 1. Hero Section ("El Gancho")
- Título inspirador y llamado a la acción con scroll suave hacia el formulario.

### 2. Propuesta de Valor (Dualidad de Impacto)
- Comparativa en 2 columnas:
  - **Para la Empresa:** Impacto ESG a costo cero, marca empleadora (Employer Branding), desarrollo de liderazgo y formato ágil (1 hora puntual).
  - **Para la ONG & Jóvenes:** Penetración en el ecosistema corporativo, reducción de asimetría de información y acceso a referentes reales de la industria.

### 3. Formulario de Postulación (Fricción Controlada)
- Captura de datos con validaciones: Nombre, Empresa, Cargo, URL de LinkedIn y Tema propuesto.
- Feedback interactivo con estados de carga (`Loader2`), mensajes de error y pantalla de confirmación exitosa.

### 4. Champions Sessions (Archivo de Snippets)
- Grid con clases grabadas de referentes (ej. Charla TED de Susan Cain, ingenieros de Google, Mercado Libre, Globant, etc.).
- Reproductor de video responsivo que convierte automáticamente enlaces de YouTube a formato embebido seguro.

### 5. Calendario Operativo (Próximas Sesiones)
- Listado ordenado cronológicamente de las próximas masterclasses.
- **Lógica de Seguridad Temporal:** El botón "Unirse al Zoom" permanece bloqueado mostrando *"Habilitado 5 min antes"* y se desbloquea dinámicamente en tiempo real cuando faltan menos de 5 minutos para el inicio.

---

## ⚙️ Comandos de Administración con PM2

Cuando estés conectado por SSH al servidor (`ssh -i Team-7.pem force@ec2-52-90-35-158.compute-1.amazonaws.com`):

| Comando | Descripción |
|---|---|
| `pm2 status` | Ver estado del proceso (CPU, memoria, uptime) |
| `pm2 logs forge-champions` | Ver los logs en tiempo real |
| `pm2 restart forge-champions` | Reiniciar la aplicación tras hacer cambios |
| `pm2 stop forge-champions` | Detener la aplicación temporalmente |
| `pm2 delete forge-champions` | Eliminar el proceso de PM2 |

---

<p align="center">
  <b>Desarrollado para la Iniciativa Forge Champions — Fundación Forge</b>
</p>