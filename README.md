# Práctica de MongoDB y Mongoose

API REST con Node.js, Express, MongoDB y Mongoose para gestionar alumnos,
carreras, materias y legajos.

## Colecciones

- **Carrera**: nombre, duración en años.
- **Materia**: nombre, año.
- **Alumno**: nombre, apellido, email, dirección (embebida), carrera y materias.
- **Legajo**: número, fecha de ingreso y alumno.

## Justificación del diseño

### Propiedad embebida: 
Decidí ponerle en la dirección directo en el documento del alumno porque es un dato exclusivo de esa persona: nadie más la comparte y no tiene sentido consultarla por separado. Al estar ahí adentro, se trae de una sola consulta sin necesidad de hacer un populate.

### Relación 1:1: Alumno ↔ Legajo (referenciada)
Cada alumno tiene un legajo único. Lo separé en otra colección porque maneja información administrativa propia (como el número y la fecha de ingreso). Para asegurarme de que un alumno no pueda tener dos legajos, le puse la referencia con unique: true.

### Relación 1:N: Carrera → Alumno (referenciada)
Una carrera tiene muchos alumnos. Se guarda la referencia en el lado "muchos"
(Alumno) para evitar un array que crezca sin límite dentro de Carrera. Así la
carrera se puede modificar sin tocar a cada alumno.

### Relación N:M: Alumno ↔ Materia (referenciada)
Un alumno cursa varias materias y una materia tiene varios alumnos. No se
puede embeber, porque duplicaría la información de cada materia en cada
alumno. Se guarda un array de referencias (`materias`) en Alumno.

## Instalación

1. `npm install`
2. Copiar `.env.example` a `.env` y completar los valores.
3. `npm run dev`