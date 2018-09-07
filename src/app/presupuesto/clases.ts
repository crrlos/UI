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
