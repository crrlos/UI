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
  insertar_equipo?: boolean; // permite saber en cual area se insertará el equipo
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
  insertar_material?: boolean;
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
  equipo_codigo?;
  equipo_nombre?;
  capacidad?;
  equipo_precio?;
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
  tipo_nombre;
}

export interface Marca {
  id?;
  marca_nombre?;
}
export interface UnidadMedida {
  id?;
  nombre?;
  abreviatura?;
}
export interface EquiposResponse {
  equipos: Equipo[];
  totalRecords;
}
