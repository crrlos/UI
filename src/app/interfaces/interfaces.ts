export interface Ubicacion {
  id?;
  nombre?;
  equipos?: Equipo[];
  total?;
}
export interface Area {
  id?;
  nombre?;
  id_cotizacion?;
  total?;
  equipos?: EquipoArea[];
}
export interface EquipoArea {
  id?;
  id_equipo?;
  id_area?;
  precio_equipo?;
  porcentaje_ganancia?;
  precio_materiales_equipo?;
  materiales?: MaterialEquipoArea[];
  equipo?: Equipo;
  total?;
}
export interface MaterialEquipoArea {
  id?;
  id_material?;
  id_equipo_area?;
  cantidad?;
  precio?;
  porcentaje_ganancia?;
  material?: Material;
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
  total_materiales_modificado?;
  tipo?: TipoUnidad;
}
export interface Material {
  id?;
  codigo?;
  nombre?;
  cantidad?;
  precio?;
  porcentaje?;
  tipo?: TipoUnidad;
  unidad_medida?: UnidadMedida;
}
export interface TipoUnidad {
  id?;
  nombre;
}
export interface UnidadMedida {
  id?;
  nombre?;
  abreviatura?;
}
