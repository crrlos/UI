export interface Ubicacion {
  id?;
  nombre?;
  equipos?: Equipo[];
  total?;
}
export interface Area {
  area_id?;
  nombre?;
  id_cotizacion?;
  total?;
  equipos?: EquipoArea[];
  insertar_equipo?: boolean; // permite saber en cual area se insertará el equipo
}
export interface EquipoArea {
  equipo_area_id?: number;
  id_equipo?: number;
  id_area?: number;
  precio_equipo?: number;
  porcentaje_ganancia?: number;
  precio_materiales_equipo?: number;
  materiales?: MaterialEquipoArea[];
  equipo?: Equipo;
  total?: number;
  precio_total_personalizado?: number;
  costo_btu?: number;
}
export interface MaterialEquipoArea {
  material_equipo_area_id?;
  id_material?;
  id_equipo_area?;
  cantidad?;
  precio?;
  porcentaje_ganancia?;
  material?: Material;
}
export interface Equipo {
  equipo_id?;
  equipo_codigo?;
  equipo_nombre?;
  capacidad?;
  equipo_precio?;
  porcentaje?;
  total?;
  total_materiales_modificado?;
  tipo?: TipoUnidad;
  marca?: Marca;
  voltaje?;
  tecnologia?: Tecnologia;
  gas?: Gas;
}
export interface Material {
  material_id?;
  material_codigo?;
  material_nombre?;
  material_cantidad?;
  material_precio?;
  porcentaje?;
  tipo?: TipoUnidad;
  marca?: Marca;
  unidad_medida?: UnidadMedida;
  material_activo?;
}
export interface Voltaje {
  name;
  code;
}
export interface TipoUnidad {
  tipo_id?;
  tipo_nombre?;
}

export interface Marca {
  marca_id?;
  marca_nombre?;
}
export interface Gas {
  gas_id?;
  gas_nombre?;
}
export interface Tecnologia {
  tecnologia_id?;
  tecnologia_nombre?;
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
export interface ClienteResponse {
  clientes: Cliente[];
  totalRecords;
}
export interface MarcaResponse {
  marcas: Marca[];
  totalRecords;
}
export interface TipoResponse {
  tipos: TipoUnidad[];
  totalRecords;
}
export interface TecnologiaResponse {
  tecnologias: Tecnologia[];
  totalRecords;
}
export interface GasResponse {
  gases: Gas[];
  totalRecords;
}
export interface CotizacionResponse {
  cotizaciones: Cotizacion[];
  totalRecords;
}

export interface MaterialResponse {
  materiales: Material[];
  totalRecords;
}
export interface Cliente {
  cliente_id?;
  nombre?;
  direccion?;
  telefono?;
}
export interface Cotizacion {
  cotizacion_id?;
  descripcion?;
  cliente?: Cliente;
  fecha?;
}
