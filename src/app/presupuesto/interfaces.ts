export interface Ubicacion {
  id?;
  nombre?;
  equipos?: Equipo[];
  total?;
}
export interface Equipo {
  id?;
  codigo?;
  nombre?;
  capacidad?;
  precio?;
  porcentaje?;
  materiales?: Material[];
  total?;
}
export interface Material {
  id?;
  codigo?;
  nombre?;
  cantidad?;
  precio?;
}
