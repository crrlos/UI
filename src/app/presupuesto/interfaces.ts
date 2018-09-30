export interface Ubicacion {
  codigo?;
  nombre?;
  isEditable?;
}
export interface Equipo {
  codigo?;
  ubicacion?;
  nombre?;
  capacidad?;
  precio?;
}
export interface EquipoUbicacion {
  codigo?;
  equipo?;
  ubicacion?;
}
export interface EquipoUbicacionMaterial {
  codigo;
  equipo_ubicacion: EquipoUbicacion;
  material: Material;
  cantidad;
}
export interface Material {
  codigo?;
  nombre?;
  precio?;
}
