export interface habits {
  id: number;
  nome: string;
  descricao: string;
  created_at: Date;
  is_deleted: boolean;
}

export interface habits_track {
  id: number;
  created_at: Date;
  id_habits: number
  is_deleted: boolean;
}