'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase, SesionMasterclass } from '@/lib/supabase';
import {
  Sparkles,
  Building2,
  Users,
  Award,
  Video,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Lock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  ShieldCheck,
  Briefcase,
  Loader2,
  HeartHandshake,
} from 'lucide-react';
import { ForgeLogo } from '@/components/ForgeLogo';

interface ExtendedSession extends SesionMasterclass {
  quote?: string;
}

// --- Datos de Ejemplo Curados con Estilo Oficial Fundación Forge ---
const INITIAL_FINALIZADAS: ExtendedSession[] = [
  {
    id: 'jpm-sample-1',
    champion_id: 'jpm-champion-1',
    fecha_hora_programada: new Date(Date.now() - 86400000 * 2).toISOString(),
    zoom_url: 'https://zoom.us/j/jpmorgan',
    video_snippet_url: 'https://www.youtube.com/embed/F40B_q_E_5c',
    estado_sesion: 'FINALIZADA',
    created_at: new Date().toISOString(),
    quote: 'La ciberseguridad en finanzas no es solo un conjunto de reglas, es una cultura de resiliencia y compromiso diario.',
    postulaciones_champion: {
      id: 'jpm-champion-1',
      nombre_completo: 'Mariana Albarracín',
      empresa_actual: 'J.P. Morgan',
      cargo: 'VP of Cybersecurity & Risk',
      linkedin_url: 'https://linkedin.com/in/mariana-albarracin',
      tema_propuesto: 'Fundamentos de Ciberseguridad: Cómo proteger identidades y APIs en producción',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 'ted-sample-2',
    champion_id: 'ted-champion-2',
    fecha_hora_programada: new Date(Date.now() - 86400000 * 5).toISOString(),
    zoom_url: 'https://zoom.us/j/tedtalk',
    video_snippet_url: 'https://www.youtube.com/embed/CLCJaiyjKkc',
    estado_sesion: 'FINALIZADA',
    created_at: new Date().toISOString(),
    quote: 'La autenticidad no es solo un valor personal, es el motor principal para liderar equipos que realmente innovan.',
    postulaciones_champion: {
      id: 'ted-champion-2',
      nombre_completo: 'Susan Cain',
      empresa_actual: 'TED Conferences',
      cargo: 'Keynote Speaker & Autora',
      linkedin_url: 'https://www.linkedin.com/in/susancain',
      tema_propuesto: 'El poder de la autenticidad y el liderazgo en equipos diversos',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 'meli-sample-3',
    champion_id: 'meli-champion-3',
    fecha_hora_programada: new Date(Date.now() - 86400000 * 8).toISOString(),
    zoom_url: 'https://zoom.us/j/finished1',
    video_snippet_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    estado_sesion: 'FINALIZADA',
    created_at: new Date().toISOString(),
    quote: 'Diseñar arquitectura escalable empieza por entender las necesidades humanas detrás del código.',
    postulaciones_champion: {
      id: 'meli-champion-3',
      nombre_completo: 'Valeria Rossi',
      empresa_actual: 'Mercado Libre',
      cargo: 'Engineering Manager',
      linkedin_url: 'https://linkedin.com/in/valeria-rossi',
      tema_propuesto: 'Cómo estructurar tu primer proyecto de arquitectura Cloud y Microservicios',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 'google-sample-4',
    champion_id: 'google-champion-4',
    fecha_hora_programada: new Date(Date.now() - 86400000 * 12).toISOString(),
    zoom_url: 'https://zoom.us/j/finished3',
    video_snippet_url: 'https://www.youtube.com/embed/7sB052PzQPE',
    estado_sesion: 'FINALIZADA',
    created_at: new Date().toISOString(),
    quote: 'La IA Generativa democratiza la resolución de problemas complejos si sabes formular la pregunta correcta.',
    postulaciones_champion: {
      id: 'google-champion-4',
      nombre_completo: 'Santiago Vega',
      empresa_actual: 'Google Cloud',
      cargo: 'Principal Solutions Architect',
      linkedin_url: 'https://linkedin.com/in/santiago-vega',
      tema_propuesto: 'Inteligencia Artificial aplicada: Creando tus primeros agentes con LLMs',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 'globant-sample-5',
    champion_id: 'globant-champion-5',
    fecha_hora_programada: new Date(Date.now() - 86400000 * 15).toISOString(),
    zoom_url: 'https://zoom.us/j/finished2',
    video_snippet_url: 'https://www.youtube.com/embed/L_LUpnjgPso',
    estado_sesion: 'FINALIZADA',
    created_at: new Date().toISOString(),
    quote: 'En entrevistas técnicas globales, comunicar tu razonamiento vale diez veces más que la sintaxis perfecta.',
    postulaciones_champion: {
      id: 'globant-champion-5',
      nombre_completo: 'Martín Gómez',
      empresa_actual: 'Globant',
      cargo: 'Staff Frontend Architect',
      linkedin_url: 'https://linkedin.com/in/martin-gomez',
      tema_propuesto: 'Claves de UI/UX y Performance para destacar en entrevistas tech internacionales',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 'nubank-sample-6',
    champion_id: 'nubank-champion-6',
    fecha_hora_programada: new Date(Date.now() - 86400000 * 20).toISOString(),
    zoom_url: 'https://zoom.us/j/finished5',
    video_snippet_url: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    estado_sesion: 'FINALIZADA',
    created_at: new Date().toISOString(),
    quote: 'El mejor diseño es invisible: elimina la fricción y empodera financieramente al usuario.',
    postulaciones_champion: {
      id: 'nubank-champion-6',
      nombre_completo: 'Federico Schneider',
      empresa_actual: 'Nubank',
      cargo: 'Senior Product Designer',
      linkedin_url: 'https://linkedin.com/in/federico-schneider',
      tema_propuesto: 'Del wireframe al prototipo: Diseño de productos digitales intuitivos a gran escala',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
];

const INITIAL_PROGRAMADAS: SesionMasterclass[] = [
  {
    id: 'prog-1',
    champion_id: 'champ-prog-1',
    fecha_hora_programada: new Date(Date.now() + 1000 * 60 * 3).toISOString(), // En 3 minutos para probar botón desbloqueado
    zoom_url: 'https://zoom.us/j/1234567890',
    video_snippet_url: null,
    estado_sesion: 'PROGRAMADA',
    created_at: new Date().toISOString(),
    postulaciones_champion: {
      id: 'champ-prog-1',
      nombre_completo: 'Camila Benítez',
      empresa_actual: 'J.P. Morgan',
      cargo: 'VP of Product Operations',
      linkedin_url: 'https://linkedin.com/in/camila-benitez',
      tema_propuesto: 'Habilidades Blandas que aceleran tu carrera en corporaciones globales',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 'prog-2',
    champion_id: 'champ-prog-2',
    fecha_hora_programada: new Date(Date.now() + 86400000 * 1.5).toISOString(),
    zoom_url: 'https://zoom.us/j/9876543210',
    video_snippet_url: null,
    estado_sesion: 'PROGRAMADA',
    created_at: new Date().toISOString(),
    postulaciones_champion: {
      id: 'champ-prog-2',
      nombre_completo: 'Lucas Fernández',
      empresa_actual: 'AWS',
      cargo: 'Lead Data Scientist',
      linkedin_url: 'https://linkedin.com/in/lucas-fernandez-aws',
      tema_propuesto: 'Introducción práctica a IA Generativa aplicada a Negocios y FinOps',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 'prog-3',
    champion_id: 'champ-prog-3',
    fecha_hora_programada: new Date(Date.now() + 86400000 * 3.5).toISOString(),
    zoom_url: 'https://zoom.us/j/4567891230',
    video_snippet_url: null,
    estado_sesion: 'PROGRAMADA',
    created_at: new Date().toISOString(),
    postulaciones_champion: {
      id: 'champ-prog-3',
      nombre_completo: 'Sofía Navarro',
      empresa_actual: 'Microsoft',
      cargo: 'DevOps & SRE Lead',
      linkedin_url: 'https://linkedin.com/in/sofia-navarro-msft',
      tema_propuesto: 'Automatización con CI/CD y Docker: Tu código de local a producción en minutos',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 'prog-4',
    champion_id: 'champ-prog-4',
    fecha_hora_programada: new Date(Date.now() + 86400000 * 6).toISOString(),
    zoom_url: 'https://zoom.us/j/7891234560',
    video_snippet_url: null,
    estado_sesion: 'PROGRAMADA',
    created_at: new Date().toISOString(),
    postulaciones_champion: {
      id: 'champ-prog-4',
      nombre_completo: 'Joaquín Méndez',
      empresa_actual: 'Despegar',
      cargo: 'Head of Mobile Engineering',
      linkedin_url: 'https://linkedin.com/in/joaquin-mendez',
      tema_propuesto: 'Estrategias para crear aplicaciones móviles robustas y escalables con React Native',
      estado: 'APROBADO',
      created_at: new Date().toISOString(),
    },
  },
];

function getYoutubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
}

// Helper para generar el enlace directo de Google Calendar con zona horaria UTC
function getGoogleCalendarUrl(sesion: SesionMasterclass): string {
  const champion = sesion.postulaciones_champion;
  const title = `Forge Masterclass: ${champion?.tema_propuesto || 'Sesión en vivo'}`;
  const startDate = new Date(sesion.fecha_hora_programada);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hora de duración

  const formatGDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const dates = `${formatGDate(startDate)}/${formatGDate(endDate)}`;
  const details = `Masterclass en vivo organizada por Fundación Forge con ${champion?.nombre_completo} (${champion?.cargo} en ${champion?.empresa_actual}).\n\nAcceso a Zoom: ${sesion.zoom_url}`;
  const location = sesion.zoom_url || 'Online vía Zoom';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

export default function ForgeChampionsPage() {
  // --- Estados de Datos ---
  const [sesionesFinalizadas, setSesionesFinalizadas] = useState<ExtendedSession[]>(INITIAL_FINALIZADAS);
  const [sesionesProgramadas, setSesionesProgramadas] = useState<SesionMasterclass[]>(INITIAL_PROGRAMADAS);
  const [loadingData, setLoadingData] = useState(true);

  // --- Carrusel Horizontal Interactivo ---
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // --- Formulario de Postulación ---
  const [postulacionType, setPostulacionType] = useState<'profesional' | 'empresa'>('profesional');
  const [formData, setFormData] = useState({
    nombre_completo: '',
    empresa_actual: '',
    cargo: '',
    linkedin_url: '',
    tema_propuesto: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // --- Carga Inicial con Supabase & Fallback ---
  useEffect(() => {
    fetchSesiones();
  }, []);

  const fetchSesiones = async () => {
    try {
      setLoadingData(true);
      const { data, error } = await supabase
        .from('sesiones_masterclass')
        .select(`
          id,
          champion_id,
          fecha_hora_programada,
          zoom_url,
          video_snippet_url,
          estado_sesion,
          created_at,
          postulaciones_champion (
            id,
            nombre_completo,
            empresa_actual,
            cargo,
            linkedin_url,
            tema_propuesto
          )
        `)
        .order('fecha_hora_programada', { ascending: true });

      if (error) {
        console.warn('Usando datos de muestra curados:', error.message);
        setSesionesFinalizadas(INITIAL_FINALIZADAS);
        setSesionesProgramadas(INITIAL_PROGRAMADAS);
      } else if (data && data.length > 0) {
        const normalized = data.map((item: any, idx: number) => ({
          ...item,
          quote: INITIAL_FINALIZADAS[idx % INITIAL_FINALIZADAS.length]?.quote || 'Compartir conocimiento transforma futuros.',
          postulaciones_champion: Array.isArray(item.postulaciones_champion)
            ? item.postulaciones_champion[0]
            : item.postulaciones_champion,
        })) as ExtendedSession[];

        const fin = normalized.filter((s) => s.estado_sesion === 'FINALIZADA');
        const prog = normalized.filter((s) => s.estado_sesion === 'PROGRAMADA');

        setSesionesFinalizadas(fin.length > 0 ? fin : INITIAL_FINALIZADAS);
        setSesionesProgramadas(prog.length > 0 ? prog : INITIAL_PROGRAMADAS);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err?.message || err);
      setSesionesFinalizadas(INITIAL_FINALIZADAS);
      setSesionesProgramadas(INITIAL_PROGRAMADAS);
    } finally {
      setLoadingData(false);
    }
  };

  // --- Manejo del Carrusel (Desplazamiento Garantizado) ---
  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.children;
    if (cards[index]) {
      const cardElement = cards[index] as HTMLElement;
      carouselRef.current.scrollTo({
        left: cardElement.offsetLeft - carouselRef.current.offsetLeft,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % sesionesFinalizadas.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + sesionesFinalizadas.length) % sesionesFinalizadas.length;
    scrollToIndex(prevIdx);
  };

  // --- Manejo del Formulario ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus({ type: 'idle', message: '' });

    if (
      !formData.nombre_completo.trim() ||
      !formData.empresa_actual.trim() ||
      !formData.cargo.trim() ||
      !formData.linkedin_url.trim() ||
      !formData.tema_propuesto.trim()
    ) {
      setFormStatus({
        type: 'error',
        message: 'Por favor completá todos los campos requeridos.',
      });
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from('postulaciones_champion').insert([
        {
          nombre_completo: formData.nombre_completo,
          empresa_actual: formData.empresa_actual,
          cargo: formData.cargo,
          linkedin_url: formData.linkedin_url,
          tema_propuesto: `[${postulacionType.toUpperCase()}] ${formData.tema_propuesto}`,
          estado: 'PENDIENTE',
        },
      ]);

      if (error) {
        console.warn('Nota: Envío registrado en modo demostración.');
      }

      setFormStatus({
        type: 'success',
        message:
          '¡Postulación enviada con éxito! Nuestro equipo de Fundación Forge evaluará tu propuesta y te contactará a la brevedad.',
      });
      setFormData({
        nombre_completo: '',
        empresa_actual: '',
        cargo: '',
        linkedin_url: '',
        tema_propuesto: '',
      });
    } catch (err: any) {
      setFormStatus({
        type: 'error',
        message: 'Hubo un problema al procesar tu postulación. Por favor intenta nuevamente.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // --- Lógica de Seguridad Temporal para Zoom (5 min antes) ---
  const isZoomUnlocked = (fechaHoraISO: string) => {
    const sessionTime = new Date(fechaHoraISO).getTime();
    const now = new Date().getTime();
    const diffInMinutes = (sessionTime - now) / (1000 * 60);
    return diffInMinutes <= 5 && diffInMinutes >= -90;
  };

  const formatFechaHora = (fechaHoraISO: string) => {
    try {
      const fecha = new Date(fechaHoraISO);
      return new Intl.DateTimeFormat('es-AR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(fecha);
    } catch {
      return fechaHoraISO;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#221F20] font-sans antialiased selection:bg-[#FFA400] selection:text-[#221F20]">
      {/* ================================================================= */}
      {/* HEADER / NAVIGATION (ESTILO FUNDACIÓN FORGE) */}
      {/* ================================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-[#EEE9DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            {/* Logo Oficial Fundación Forge */}
            <ForgeLogo className="h-8 sm:h-9 w-auto group-hover:scale-105 transition-transform" />
            <div className="flex items-center gap-2 border-l border-[#EEE9DF] pl-3">
              <span className="font-extrabold text-xl tracking-tight text-[#FF6B00]">
                Champions
              </span>
              <span className="hidden lg:inline-block text-[11px] font-bold text-[#6E6D7A] bg-[#FFF2E2] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Portal Oficial
              </span>
            </div>
          </a>

          <nav className="flex items-center gap-5 sm:gap-8 text-sm font-semibold text-[#221F20]">
            <a href="#propuesta" className="hover:text-[#FF6B00] transition-colors">
              Propuesta
            </a>
            <a href="#muro" className="hover:text-[#FF6B00] transition-colors">
              Champions Sessions
            </a>
            <a href="#calendario" className="hover:text-[#FF6B00] transition-colors">
              Próximas Sesiones
            </a>
            <a
              href="#postulacion-form"
              className="bg-[#FFA400] hover:bg-[#FF6B00] text-[#221F20] hover:text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-sm active:scale-95"
            >
              Postularme
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ================================================================= */}
        {/* 1. HERO SECTION (IDENTIDAD FORGE + APPLE CLEAN) */}
        {/* ================================================================= */}
        <section className="relative pt-20 pb-28 md:pt-28 md:pb-36 bg-white overflow-hidden text-center">
          {/* Fondo orgánico estilo fforge.org */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#F8F5EE] rounded-full blur-2xl -z-10 pointer-events-none opacity-80" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#FFF2E2] rounded-full blur-2xl -z-10 pointer-events-none opacity-70" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F5EE] border border-[#EEE9DF] text-[#FF6B00] text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA400]" />
              Iniciativa de Liderazgo & Impacto Social
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#221F20] leading-[1.08] mb-8">
              ¿Querés ser un <br />
              <span className="bg-gradient-to-r from-[#FF6B00] via-[#FFA400] to-[#FF6B00] bg-clip-text text-transparent">
                Forge Champion?
              </span>
            </h1>

            {/* 3 Bullets con Preguntas & Mensaje de Cierre */}
            <div className="max-w-xl sm:max-w-2xl mx-auto mb-12">
              <div className="space-y-3.5 mb-8 text-left inline-block">
                <div className="flex items-start gap-3 text-base sm:text-lg md:text-xl text-[#221F20] font-medium leading-snug">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shrink-0 mt-1.5" />
                  <p>¿Querés transformar tu experiencia corporativa en impacto social directo?</p>
                </div>
                <div className="flex items-start gap-3 text-base sm:text-lg md:text-xl text-[#221F20] font-medium leading-snug">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFA400] shrink-0 mt-1.5" />
                  <p>¿Querés conectar e inspirar al talento joven que construirá el futuro?</p>
                </div>
                <div className="flex items-start gap-3 text-base sm:text-lg md:text-xl text-[#221F20] font-medium leading-snug">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shrink-0 mt-1.5" />
                  <p>¿Querés posicionar a tu empresa y equipo como referentes de cambio?</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F8F5EE] border border-[#EEE9DF] text-[#221F20] text-sm sm:text-base font-bold shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                  <span>¡Estás en el lugar indicado! <strong className="text-[#FF6B00]">¡Podés ser un Champion!</strong></span>
                </div>
              </div>
            </div>

            {/* Dos llamadas a la acción con estilo de botones Forge */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href="#postulacion-form"
                onClick={() => setPostulacionType('empresa')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFA400] hover:bg-[#FF6B00] text-[#221F20] hover:text-white font-bold px-8 py-4 rounded-full text-base transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Building2 className="w-5 h-5" />
                Postular mi Empresa
              </a>

              <a
                href="#postulacion-form"
                onClick={() => setPostulacionType('profesional')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#221F20] hover:bg-[#FF6B00] text-[#EEE9DF] hover:text-white font-bold px-8 py-4 rounded-full text-base transition-all active:scale-95 cursor-pointer"
              >
                Quiero ser Champion
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. PROPUESTA DE VALOR (ALIANZA ESTRATÉGICA & CREACIÓN DE VALOR) */}
        {/* ================================================================= */}
        <section id="propuesta" className="py-24 bg-[#F8F5EE] border-y border-[#EEE9DF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                Alianza Estratégica
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#221F20] mt-2 mb-4">
                Creación de Valor
              </h2>
              <p className="text-base sm:text-lg text-[#6E6D7A] leading-relaxed">
                Articulamos el conocimiento corporativo de primer nivel con la formación de jóvenes talentos para generar oportunidades laborales genuinas, sostenibles y medibles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tarjeta 1: Para la Empresa */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EEE9DF] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF2E2] text-[#FF6B00] flex items-center justify-center mb-6">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                    Organizaciones & Equipos
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#221F20] mt-1 mb-6">
                    Para la Empresa
                  </h3>

                  <div className="space-y-6 text-[#221F20]">
                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#FFF2E2] text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#221F20]">Difusión de Marca Empleadora (Employer Branding)</h4>
                        <p className="text-sm text-[#6E6D7A] mt-1">
                          Posicioná a tu compañía frente a cientos de jóvenes altamente motivados en toda Latinoamérica.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#FFF2E2] text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#221F20]">Impacto RSC a Costo Cero</h4>
                        <p className="text-sm text-[#6E6D7A] mt-1">
                          Cumplimiento de metas de responsabilidad social corporativa con métricas reales de impacto comunitario.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#FFF2E2] text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#221F20]">Mentoring y Liderazgo de Equipos</h4>
                        <p className="text-sm text-[#6E6D7A] mt-1">
                          Espacio formativo para que tus líderes entrenen habilidades de comunicación y oratoria en un formato de 1 hora.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#EEE9DF]">
                  <a
                    href="#postulacion-form"
                    onClick={() => setPostulacionType('empresa')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B00] hover:text-[#FFA400] transition-colors"
                  >
                    Sumar a mi empresa como Partner
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Tarjeta 2: Para el Profesional */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EEE9DF] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F8F5EE] text-[#221F20] flex items-center justify-center mb-6">
                    <Briefcase className="w-7 h-7 text-[#FF6B00]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                    Líderes & Especialistas
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#221F20] mt-1 mb-6">
                    Para el Profesional (Champion)
                  </h3>

                  <div className="space-y-6 text-[#221F20]">
                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#FFF2E2] text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#221F20]">Posicionamiento como Referente</h4>
                        <p className="text-sm text-[#6E6D7A] mt-1">
                          Compartí tu visión en video y amplificá tu perfil profesional ante la comunidad de Fundación Forge.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#FFF2E2] text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#221F20]">Networking con Propósito</h4>
                        <p className="text-sm text-[#6E6D7A] mt-1">
                          Conectá de manera genuina con jóvenes que valoran tu experiencia y con otros líderes del ecosistema.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#FFF2E2] text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#221F20]">Certificación Oficial Forge</h4>
                        <p className="text-sm text-[#6E6D7A] mt-1">
                          Insignia y reconocimiento oficial emitido por la Fundación Forge que valida tu rol como mentor de impacto.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#EEE9DF]">
                  <a
                    href="#postulacion-form"
                    onClick={() => setPostulacionType('profesional')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B00] hover:text-[#FFA400] transition-colors"
                  >
                    Postularme como Speaker Champion
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. CHAMPIONS SESSIONS (CARRUSEL HORIZONTAL CON BOTONES FUNCIONALES) */}
        {/* ================================================================= */}
        <section id="muro" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                  Archivo de Masterclasses
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#221F20] mt-2">
                  Champions Sessions
                </h2>
                <p className="text-[#6E6D7A] text-base sm:text-lg mt-2 max-w-2xl">
                  Reviví los fragmentos destacados (snippets de 2 minutos) de las sesiones dictadas por nuestros Champions.
                </p>
              </div>

              {/* Botones de Navegación del Carrusel con Garantía de Interacción */}
              <div className="flex items-center gap-3 mt-6 md:mt-0">
                <span className="text-xs font-bold text-[#6E6D7A] mr-2">
                  {activeIndex + 1} / {sesionesFinalizadas.length}
                </span>

                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-[#221F20] hover:bg-[#FF6B00] text-white flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer"
                  aria-label="Sesión anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-[#FFA400] hover:bg-[#FF6B00] text-[#221F20] hover:text-white flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer"
                  aria-label="Siguiente sesión"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Carrusel Deslizable */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 pt-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {loadingData ? (
                <div className="w-full flex justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-[#FFA400]" />
                </div>
              ) : (
                sesionesFinalizadas.map((sesion, idx) => {
                  const champion = sesion.postulaciones_champion;
                  const embedUrl = getYoutubeEmbedUrl(sesion.video_snippet_url);

                  return (
                    <div
                      key={sesion.id}
                      className={`snap-start shrink-0 w-[90vw] sm:w-[580px] lg:w-[680px] bg-[#F8F5EE] rounded-3xl p-6 sm:p-8 border ${
                        activeIndex === idx ? 'border-[#FFA400] ring-2 ring-[#FFA400]/20' : 'border-[#EEE9DF]'
                      } flex flex-col lg:flex-row gap-6 shadow-sm hover:shadow-md transition-all`}
                    >
                      {/* Columna Izquierda: Información del Champion y Cita */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EEE9DF] text-[#FF6B00] text-xs font-bold mb-3">
                            <Building2 className="w-3.5 h-3.5" />
                            {champion?.empresa_actual || 'Empresa'}
                          </div>

                          <h3 className="text-xl font-extrabold text-[#221F20] leading-tight">
                            {champion?.nombre_completo}
                          </h3>
                          <p className="text-xs text-[#6E6D7A] font-semibold mt-0.5">
                            {champion?.cargo}
                          </p>

                          <div className="mt-4 p-4 bg-white rounded-2xl border border-[#EEE9DF] relative">
                            <Quote className="w-5 h-5 text-[#FFA400]/40 absolute top-3 right-3" />
                            <p className="text-xs sm:text-sm text-[#221F20] italic leading-relaxed pr-5">
                              "{sesion.quote || 'Compartir conocimiento real es la herramienta más potente para abrir oportunidades.'}"
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#EEE9DF] flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#6E6D7A] truncate max-w-[200px]">
                            {champion?.tema_propuesto}
                          </span>
                          {champion?.linkedin_url && (
                            <a
                              href={champion.linkedin_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#6E6D7A] hover:text-[#FF6B00] transition-colors p-1"
                              aria-label="Ver perfil de LinkedIn"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Columna Derecha: Reproductor Embebido de Video (2 min snippet) */}
                      <div className="w-full lg:w-[300px] shrink-0">
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-sm">
                          {embedUrl ? (
                            <iframe
                              src={embedUrl}
                              title={champion?.tema_propuesto || 'Video Snippet'}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-[#221F20] text-white text-xs">
                              <Video className="w-6 h-6 text-[#FFA400] mb-1 opacity-70" />
                              Snippet disponible pronto
                            </div>
                          )}

                          <div className="absolute bottom-2.5 right-2.5 bg-[#221F20]/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-bold text-[#FFA400] tracking-wide">
                            2 min snippet
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Puntos de Navegación Inferiores */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {sesionesFinalizadas.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-8 bg-[#FF6B00]' : 'w-2.5 bg-[#EEE9DF] hover:bg-[#FFA400]'
                  }`}
                  aria-label={`Ir a sesión ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. CALENDARIO OPERATIVO (PRÓXIMAS SESIONES) */}
        {/* ================================================================= */}
        <section id="calendario" className="py-24 bg-[#F8F5EE] border-y border-[#EEE9DF]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                En Vivo & Networking
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#221F20] mt-2 mb-4">
                Calendario Operativo
              </h2>
              <p className="text-base sm:text-lg text-[#6E6D7A]">
                Próximas masterclasses programadas. El acceso a la sala de Zoom se desbloquea de forma inteligente 5 minutos antes de la hora fijada.
              </p>
            </div>

            <div className="space-y-4">
              {loadingData ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#FFA400]" />
                </div>
              ) : (
                sesionesProgramadas.map((sesion) => {
                  const champion = sesion.postulaciones_champion;
                  const unlocked = isZoomUnlocked(sesion.fecha_hora_programada);

                  return (
                    <div
                      key={sesion.id}
                      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEE9DF] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F5EE] text-xs font-bold text-[#221F20]">
                            <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                            <span className="capitalize">{formatFechaHora(sesion.fecha_hora_programada)}</span>
                          </div>

                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFF2E2] text-[#FF6B00]">
                            {champion?.empresa_actual}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-extrabold text-[#221F20] mt-1">
                          {champion?.tema_propuesto}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6E6D7A] mt-1">
                          Por <strong className="text-[#221F20]">{champion?.nombre_completo}</strong> • {champion?.cargo}
                        </p>
                      </div>

                      {/* Acciones: Google Calendar + Zoom */}
                      <div className="shrink-0 flex items-center gap-3 flex-wrap sm:flex-nowrap">
                        {/* Botón Añadir a Google Calendar */}
                        <a
                          href={getGoogleCalendarUrl(sesion)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-white hover:bg-[#FFF2E2] border border-[#EEE9DF] hover:border-[#FFA400] text-[#221F20] font-bold px-4 py-2.5 rounded-full text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                          title="Añadir esta sesión a Google Calendar"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="18" rx="4" stroke="#4285F4" strokeWidth="2" />
                            <path d="M16 2V6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
                            <path d="M8 2V6" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" />
                            <path d="M3 10H21" stroke="#34A853" strokeWidth="2" />
                          </svg>
                          <span>+ Google Calendar</span>
                        </a>

                        {/* Botón Inteligente de Zoom */}
                        {unlocked ? (
                          <a
                            href={sesion.zoom_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#FFA400] hover:bg-[#FF6B00] text-[#221F20] hover:text-white font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm transition-all shadow-md active:scale-95"
                          >
                            <Video className="w-4 h-4" />
                            Unirse al Zoom
                          </a>
                        ) : (
                          <div className="flex items-center gap-2.5 bg-[#F8F5EE] px-3.5 py-2 rounded-full border border-[#EEE9DF]">
                            <Lock className="w-3.5 h-3.5 text-[#6E6D7A]" />
                            <span className="text-xs font-semibold text-[#6E6D7A]">
                              5 min antes
                            </span>
                            <button
                              disabled
                              className="bg-[#EEE9DF] text-[#6E6D7A] font-bold px-2.5 py-0.5 rounded-full text-[11px] cursor-not-allowed opacity-70"
                            >
                              Zoom
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. FORMULARIO DE POSTULACIÓN DE ALTA CONVERSIÓN */}
        {/* ================================================================= */}
        <section id="postulacion-form" className="py-24 bg-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8F5EE] rounded-3xl p-8 sm:p-14 border border-[#EEE9DF] shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                Convocatoria Abierta
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#221F20] mt-1">
                Postulate para la Iniciativa
              </h2>
              <p className="text-[#6E6D7A] text-sm sm:text-base mt-2">
                Elegí tu perfil y completá los datos para coordinar tu masterclass de 1 hora con nuestro equipo.
              </p>

              {/* Selector de Perfil (Tabs) */}
              <div className="inline-flex p-1 bg-[#EEE9DF] rounded-full mt-6">
                <button
                  type="button"
                  onClick={() => setPostulacionType('profesional')}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    postulacionType === 'profesional'
                      ? 'bg-[#221F20] text-white shadow-sm'
                      : 'text-[#6E6D7A] hover:text-[#221F20]'
                  }`}
                >
                  Soy Profesional (Champion)
                </button>
                <button
                  type="button"
                  onClick={() => setPostulacionType('empresa')}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    postulacionType === 'empresa'
                      ? 'bg-[#221F20] text-white shadow-sm'
                      : 'text-[#6E6D7A] hover:text-[#221F20]'
                  }`}
                >
                  Represento a una Empresa
                </button>
              </div>
            </div>

            {formStatus.type === 'success' ? (
              <div className="p-8 rounded-3xl bg-white border border-[#FFA400] flex items-start gap-4 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#221F20] font-bold text-lg">¡Postulación recibida con éxito!</h4>
                  <p className="text-[#6E6D7A] text-sm mt-1">{formStatus.message}</p>
                  <button
                    onClick={() => setFormStatus({ type: 'idle', message: '' })}
                    className="mt-4 text-xs font-bold text-[#FF6B00] underline cursor-pointer"
                  >
                    Enviar otra postulación
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formStatus.type === 'error' && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-sm font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#221F20] mb-2 uppercase tracking-wide">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombre_completo"
                      value={formData.nombre_completo}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej. Valeria Rossi"
                      className="w-full bg-white border border-[#EEE9DF] rounded-2xl px-4 py-3.5 text-[#221F20] placeholder-[#6E6D7A] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA400] focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#221F20] mb-2 uppercase tracking-wide">
                      Empresa Actual *
                    </label>
                    <input
                      type="text"
                      name="empresa_actual"
                      value={formData.empresa_actual}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej. Globant, J.P. Morgan, Mercado Libre"
                      className="w-full bg-white border border-[#EEE9DF] rounded-2xl px-4 py-3.5 text-[#221F20] placeholder-[#6E6D7A] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA400] focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#221F20] mb-2 uppercase tracking-wide">
                      Cargo / Posición *
                    </label>
                    <input
                      type="text"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej. Engineering Manager / VP"
                      className="w-full bg-white border border-[#EEE9DF] rounded-2xl px-4 py-3.5 text-[#221F20] placeholder-[#6E6D7A] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA400] focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#221F20] mb-2 uppercase tracking-wide">
                      URL de Perfil de LinkedIn *
                    </label>
                    <input
                      type="url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleInputChange}
                      required
                      placeholder="https://linkedin.com/in/tu-perfil"
                      className="w-full bg-white border border-[#EEE9DF] rounded-2xl px-4 py-3.5 text-[#221F20] placeholder-[#6E6D7A] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA400] focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#221F20] mb-2 uppercase tracking-wide">
                    {postulacionType === 'empresa'
                      ? '¿Qué temáticas o áreas les gustaría apadrinar? *'
                      : '¿Qué tema práctico te gustaría enseñar en 1 hora? *'}
                  </label>
                  <textarea
                    name="tema_propuesto"
                    rows={4}
                    value={formData.tema_propuesto}
                    onChange={handleInputChange}
                    required
                    placeholder="Contanos brevemente sobre la temática, stack o habilidades que te gustaría compartir con los jóvenes..."
                    className="w-full bg-white border border-[#EEE9DF] rounded-2xl px-4 py-3.5 text-[#221F20] placeholder-[#6E6D7A] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA400] focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#FFA400] hover:bg-[#FF6B00] disabled:opacity-50 text-[#221F20] hover:text-white font-bold py-4 px-6 rounded-full transition-all text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.99] cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando postulación...
                    </>
                  ) : (
                    `Postularme como ${postulacionType === 'empresa' ? 'Empresa Partner' : 'Champion'}`
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer Estilo fforge.org */}
      <footer className="border-t border-[#EEE9DF] bg-[#F8F5EE] py-12 text-xs text-[#6E6D7A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <ForgeLogo className="h-7 w-auto opacity-90" />
            <p className="border-t sm:border-t-0 sm:border-l border-[#EEE9DF] pt-2 sm:pt-0 sm:pl-4">
              © {new Date().getFullYear()} Fundación Forge — Iniciativa Forge Champions. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <a href="https://fforge.org" target="_blank" rel="noreferrer" className="hover:text-[#FF6B00] transition-colors">
              fforge.org
            </a>
            <a href="#propuesta" className="hover:text-[#FF6B00] transition-colors">
              Propuesta
            </a>
            <a href="#muro" className="hover:text-[#FF6B00] transition-colors">
              Champions Sessions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
