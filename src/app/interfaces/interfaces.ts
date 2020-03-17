export interface Ubicacion {
  id?;
  nombre?;
  equipos?: Equipo[];
  total?;
}
export interface Area {
  id?:number;
  nombre?:string;
  cotizacionId?:number;
  total?:number;
  equipos?: EquipoArea[];
  insertar_equipo?: boolean; // permite saber en cual area se insertará el equipo
}
export interface EquipoArea {
  id?: number;
  equipoId?: number;
  areaId?: number;
  precioEquipo?: number;
  porcentajeGanancia?: number;
  precioMaterialesEquipo?: number;
  materiales?: MaterialEquipoArea[];
  equipo?: Equipo;
  total?: number;
  precioTotalPersonalizado?: number;
  costoBTU?: number;
}
export interface MaterialEquipoArea {
  id?:number;
  materialId?:number;
  equiposAreaId?:number;
  cantidad?:number;
  precio?:number;
  porcentajeGanancia?:number;
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
  id?:number;
  descripcion?:number;
  cliente?: Cliente;
  fecha?:string;
}

export interface UnidadResponse {
  unidades: UnidadMedida[];
  totalRecords;
}
