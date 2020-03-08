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
  id?: number;
  codigo? :string;
  nombre?:string;
  capacidad?:any;
  precio? :number ;
  porcentaje? :number;
  total? :number;
  totalMaterialesModificado? : number;
  tipo?: TipoUnidad;
  marca?: Marca;
  voltaje? : string;
  tecnologia?: Tecnologia;
  gas?: Gas;
}
export interface Material {
  id?:number;
  codigo?:string;
  nombre?:string;
  cantidad?:number;
  precio?:number;
  porcentaje?:number;
  tipo?: TipoUnidad;
  tipoId?:number;
  marcaId?:number;
  marca?: Marca;
  unidadMedidaId?:number;
  unidadMedida?: UnidadMedida;
  material_activo?;
}
export interface Voltaje {
  name;
  code;
}
export interface TipoUnidad {
  id? :number;
  nombre? :string;
}

export interface Marca {
  id?:number;
  nombre?:string;
}
export interface Gas {
  id?:number;
  nombre?: string;
}
export interface Tecnologia {
  id?:number;
  nombre?:string;
}
export interface UnidadMedida {
  id?: number;
  nombre?: string;
  abreviatura?: string;
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
  id?:number;
  nombre?:string;
  direccion?:string;
  telefono?:string;
}
export interface Cotizacion {
  cotizacion_id?;
  descripcion?;
  cliente?: Cliente;
  fecha?;
}

export interface UnidadResponse {
  unidades: UnidadMedida[];
  totalRecords;
}
