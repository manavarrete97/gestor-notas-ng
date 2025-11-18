# Gestor de Notas - Frontend

Este proyecto es el frontend para la aplicación de gestión de notas, desarrollado con Angular.

## Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y [Angular CLI](https://cli.angular.io/).

## Configuración del Backend

Antes de iniciar el frontend, es crucial que el backend esté en funcionamiento. La API debe estar disponible en `https://localhost:7206`.

## Instalación

1.  Clona este repositorio o descarga el código fuente.
2.  Abre una terminal en la raíz del proyecto.
3.  Instala las dependencias necesarias con el siguiente comando:

    ```bash
    npm install
    ```

## Servidor de Desarrollo

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté en marcha, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si modificas algún archivo de código fuente.

Este proyecto utiliza un proxy para redirigir las llamadas a la API y evitar problemas de CORS. La configuración del proxy se encuentra en `proxy.conf.json`.

## Funcionalidades

La aplicación permite gestionar estudiantes, materias y notas.

### Estudiantes

-   **Listar estudiantes**: Muestra una lista de todos los estudiantes existentes.
-   **Agregar estudiante**: Permite añadir un nuevo estudiante.
-   **Editar estudiante**: Permite modificar el nombre de un estudiante existente.
-   **Eliminar estudiante**: Elimina un estudiante de la lista.

### Materias

-   **Listar materias**: Muestra una lista de todas las materias.
-   **Agregar materia**: Permite añadir una nueva materia, asignándole un profesor.
-   **Editar materia**: Permite modificar el nombre y el profesor de una materia existente.
-   **Eliminar materia**: Elimina una materia de la lista.

### Notas

-   **Filtrar por estudiante y materia**: Permite seleccionar un estudiante y una materia para ver las notas correspondientes.
- a   **Listar notas**: Muestra las notas del estudiante en la materia seleccionada.
-   **Agregar nota**: Permite añadir una nueva nota para el estudiante y la materia seleccionados.
-   **Editar nota**: Permite modificar el valor de una nota existente.
-   **Eliminar nota**: Elimina una nota de la lista.

## Estructura del Proyecto

-   `src/app/components`: Contiene los componentes de Angular para cada una de las vistas (estudiantes, materias, notas y navegación).
-   `src/app/services`: Contiene los servicios de Angular que se comunican con la API del backend.
-   `src/app/app.routes.ts`: Define las rutas de la aplicación.
-   `proxy.conf.json`: Archivo de configuración del proxy para las llamadas a la API.
-   `angular.json`: Archivo de configuración de Angular CLI, donde se especifica el uso del proxy.

## Compilación

Para compilar el proyecto para producción, ejecuta:

```bash
ng build --prod
```

Los artefactos de la compilación se guardarán en el directorio `dist/`.
