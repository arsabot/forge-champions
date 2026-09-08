import { createClient } from '@supabase/supabase-js';

export type EstadoPostulacion = 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
export type EstadoSesion = 'PROGRAMADA' | 'FINALIZADA';

export interface PostulacionChampion {
  id: string;
  nombre_completo: string;
  empresa_actual: string;
  cargo: string;
  linkedin_url: string;
  tema_propuesto: string;
  estado: EstadoPostulacion;
  created_at: string;
}

export interface SesionMasterclass {
  id: string;
  champion_id: string;
  fecha_hora_programada: string;
  zoom_url: string;
  video_snippet_url: string | null;
  estado_sesion: EstadoSesion;
  created_at: string;
  postulaciones_champion?: PostulacionChampion;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
