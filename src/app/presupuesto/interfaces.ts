export interface Ubicacion {
  codigo?;
  nombre?;
  equipos?: Equipo[];
  total?;
}
export interface Equipo {
  codigo?;
  nombre?;
  capacidad?;
  precio?;
  porcentaje?;
  materiales?: Material[];
  total?;
}
export interface Material {
  codigo?;
  nombre?;
  cantidad?;
  precio?;
}
