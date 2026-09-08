-- ==============================================================================
-- FORGE CHAMPIONS - SUPABASE DATABASE SCHEMA (MVP)
-- ==============================================================================

-- 1. Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Creación de tipos ENUM
DO $$ BEGIN
    CREATE TYPE estado_postulacion_enum AS ENUM ('PENDIENTE', 'APROBADO', 'RECHAZADO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE estado_sesion_enum AS ENUM ('PROGRAMADA', 'FINALIZADA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Tabla: postulaciones_champion
CREATE TABLE IF NOT EXISTS public.postulaciones_champion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_completo TEXT NOT NULL,
    empresa_actual TEXT NOT NULL,
    cargo TEXT NOT NULL,
    linkedin_url TEXT NOT NULL,
    tema_propuesto TEXT NOT NULL,
    estado estado_postulacion_enum NOT NULL DEFAULT 'PENDIENTE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Tabla: sesiones_masterclass
CREATE TABLE IF NOT EXISTS public.sesiones_masterclass (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    champion_id UUID NOT NULL REFERENCES public.postulaciones_champion(id) ON DELETE CASCADE,
    fecha_hora_programada TIMESTAMPTZ NOT NULL,
    zoom_url TEXT NOT NULL,
    video_snippet_url TEXT,
    estado_sesion estado_sesion_enum NOT NULL DEFAULT 'PROGRAMADA',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Índices para optimizar consultas del Frontend
CREATE INDEX IF NOT EXISTS idx_postulaciones_estado ON public.postulaciones_champion(estado);
CREATE INDEX IF NOT EXISTS idx_sesiones_estado_fecha ON public.sesiones_masterclass(estado_sesion, fecha_hora_programada);

-- 6. Habilitar Row Level Security (RLS)
ALTER TABLE public.postulaciones_champion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sesiones_masterclass ENABLE ROW LEVEL SECURITY;

-- 7. Políticas de Seguridad RLS (Permisivas para MVP)
CREATE POLICY "Permitir inserción pública de postulaciones"
    ON public.postulaciones_champion
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Permitir lectura pública de postulaciones"
    ON public.postulaciones_champion
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Permitir lectura pública de sesiones"
    ON public.sesiones_masterclass
    FOR SELECT
    TO public
    USING (true);

-- ==============================================================================
-- 8. SEED DATA
-- ==============================================================================
INSERT INTO public.postulaciones_champion (id, nombre_completo, empresa_actual, cargo, linkedin_url, tema_propuesto, estado)
VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Susan Cain', 'TED Conferences', 'Keynote Speaker & Autora', 'https://linkedin.com/in/susancain', 'El poder de la autenticidad y el liderazgo en equipos diversos', 'APROBADO'),
  ('b2222222-2222-2222-2222-222222222222', 'Valeria Rossi', 'Mercado Libre', 'Engineering Manager', 'https://linkedin.com/in/valeria-rossi', 'Cómo estructurar tu primer proyecto de arquitectura Cloud y Microservicios', 'APROBADO'),
  ('c3333333-3333-3333-3333-333333333333', 'Martín Gómez', 'Globant', 'Staff Frontend Architect', 'https://linkedin.com/in/martin-gomez', 'Claves de UI/UX y Performance para destacar en entrevistas tech internacionales', 'APROBADO'),
  ('d4444444-4444-4444-4444-444444444444', 'Santiago Vega', 'Google Cloud', 'Principal Solutions Architect', 'https://linkedin.com/in/santiago-vega', 'Inteligencia Artificial aplicada: Creando tus primeros agentes y pipelines con LLMs', 'APROBADO'),
  ('e5555555-5555-5555-5555-555555555555', 'Mariana Albarracín', 'J.P. Morgan', 'VP of Cybersecurity & Risk', 'https://linkedin.com/in/mariana-albarracin', 'Fundamentos de Ciberseguridad: Cómo proteger identidades y APIs en producción', 'APROBADO'),
  ('f6666666-6666-6666-6666-666666666666', 'Federico Schneider', 'Nubank', 'Senior Product Designer', 'https://linkedin.com/in/federico-schneider', 'Del wireframe al prototipo: Diseño de productos digitales intuitivos de alta escala', 'APROBADO'),
  ('g7777777-7777-7777-7777-777777777777', 'Camila Benítez', 'J.P. Morgan', 'VP of Product Operations', 'https://linkedin.com/in/camila-benitez', 'Habilidades Blandas que aceleran tu carrera en corporaciones globales', 'APROBADO'),
  ('h8888888-8888-8888-8888-888888888888', 'Lucas Fernández', 'AWS', 'Lead Data Scientist', 'https://linkedin.com/in/lucas-fernandez-aws', 'Introducción práctica a IA Generativa aplicada a Negocios y FinOps', 'APROBADO'),
  ('i9999999-9999-9999-9999-999999999999', 'Sofía Navarro', 'Microsoft', 'DevOps & SRE Lead', 'https://linkedin.com/in/sofia-navarro-msft', 'Automatización con CI/CD y Docker: Tu código de local a producción en minutos', 'APROBADO'),
  ('j0000000-0000-0000-0000-000000000000', 'Joaquín Méndez', 'Despegar', 'Head of Mobile Engineering', 'https://linkedin.com/in/joaquin-mendez', 'Estrategias para crear aplicaciones móviles robustas y escalables con React Native', 'APROBADO'),
  ('k1111111-2222-3333-4444-555555555555', 'Florencia Castro', 'Accenture', 'Agile Coach & Scrum Master', 'https://linkedin.com/in/florencia-castro', 'Metodologías Ágiles en la vida real: Cómo trabajar en squads de alto rendimiento', 'APROBADO'),
  ('l2222222-3333-4444-5555-666666666666', 'Esteban Rivas', 'Auth0 / Okta', 'Principal Security Engineer', 'https://linkedin.com/in/esteban-rivas', 'Autenticación moderna: OAuth 2.0, Passkeys y Single Sign-On explicados simple', 'APROBADO')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.sesiones_masterclass (id, champion_id, fecha_hora_programada, zoom_url, video_snippet_url, estado_sesion)
VALUES
  -- Finalizadas (Champions Sessions)
  ('fa111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'https://zoom.us/j/tedtalk', 'https://www.youtube.com/embed/CLCJaiyjKkc', 'FINALIZADA'),
  ('fa222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', NOW() - INTERVAL '5 days', 'https://zoom.us/j/finished1', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'FINALIZADA'),
  ('fa333333-3333-3333-3333-333333333333', 'c3333333-3333-3333-3333-333333333333', NOW() - INTERVAL '8 days', 'https://zoom.us/j/finished2', 'https://www.youtube.com/embed/L_LUpnjgPso', 'FINALIZADA'),
  ('fa444444-4444-4444-4444-444444444444', 'd4444444-4444-4444-4444-444444444444', NOW() - INTERVAL '12 days', 'https://zoom.us/j/finished3', 'https://www.youtube.com/embed/7sB052PzQPE', 'FINALIZADA'),
  ('fa555555-5555-5555-5555-555555555555', 'e5555555-5555-5555-5555-555555555555', NOW() - INTERVAL '15 days', 'https://zoom.us/j/finished4', 'https://www.youtube.com/embed/F40B_q_E_5c', 'FINALIZADA'),
  ('fa666666-6666-6666-6666-666666666666', 'f6666666-6666-6666-6666-666666666666', NOW() - INTERVAL '20 days', 'https://zoom.us/j/finished5', 'https://www.youtube.com/embed/c9Wg6Cb_YlU', 'FINALIZADA'),
  -- Próximas (Calendario Operativo)
  ('pr111111-1111-1111-1111-111111111111', 'g7777777-7777-7777-7777-777777777777', NOW() + INTERVAL '3 minutes', 'https://zoom.us/j/1234567890', NULL, 'PROGRAMADA'),
  ('pr222222-2222-2222-2222-222222222222', 'h8888888-8888-8888-8888-888888888888', NOW() + INTERVAL '1 day 4 hours', 'https://zoom.us/j/9876543210', NULL, 'PROGRAMADA'),
  ('pr333333-3333-3333-3333-333333333333', 'i9999999-9999-9999-9999-999999999999', NOW() + INTERVAL '3 days', 'https://zoom.us/j/4567891230', NULL, 'PROGRAMADA'),
  ('pr444444-4444-4444-4444-444444444444', 'j0000000-0000-0000-0000-000000000000', NOW() + INTERVAL '5 days', 'https://zoom.us/j/7891234560', NULL, 'PROGRAMADA'),
  ('pr555555-5555-5555-5555-555555555555', 'k1111111-2222-3333-4444-555555555555', NOW() + INTERVAL '7 days', 'https://zoom.us/j/3216549870', NULL, 'PROGRAMADA'),
  ('pr666666-6666-6666-6666-666666666666', 'l2222222-3333-4444-5555-666666666666', NOW() + INTERVAL '10 days', 'https://zoom.us/j/6549873210', NULL, 'PROGRAMADA')
ON CONFLICT (id) DO NOTHING;
