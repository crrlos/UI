import { Equipo, Material } from './interfaces';

export const equipos: Equipo[] = [{
    id: 1,
    codigo: 'EQ1012',
    nombre: 'Mini Split',
    precio: 1200,
    porcentaje: 1,
    capacidad: '10000 BTU',
    materiales: []
},
{
    id: 2,
    codigo: 'EQ1013',
    nombre: 'Mini Split',
    precio: 3000,
    porcentaje: 1,
    capacidad: '10000 BTU',
    materiales: []
},
{
    id: 3,
    codigo: 'EQ1014',
    nombre: 'Mini Split',
    precio: 500,
    porcentaje: 1,
    capacidad: '10000 BTU',
    materiales: []
}];

export const materiales: Material[] = [{
    id: 1,
    codigo: 'M-0101',
    nombre: 'material 1',
    cantidad: 10,
    precio: 100
}];
