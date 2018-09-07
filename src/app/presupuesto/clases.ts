export interface Ubicacion {
  codigo?;
  nombre?;
  isEditable?;
}
export interface Equipo{
  codigo?;
  ubicacion?;
  nombre?;
  capacidad?;
  precio?;
}
export interface EquipoUbicacion {
  codigo;
  equipo;
  ubicacion;
}
export interface EquipoUbicacionMaterial{
  codigo;
  equipo_ubicacion;
  material;
  cantidad;
}
export interface Material{
  codigo?;
  nombre?;
  precio?;
}
