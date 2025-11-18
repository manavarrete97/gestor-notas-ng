# Gestor de Notas NG

Este proyecto es una aplicación construida con Angular para gestionar notas de estudiantes. Permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para estudiantes, materias y notas.

## Requisitos Previos

Asegúrate de tener las siguientes herramientas instaladas en tu sistema:

*   **Node.js**: Versión 20.x o superior. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
*   **Angular CLI**: Versión 20.3.8 o superior. Puedes instalarlo globalmente usando npm:
    ```bash
    npm install -g @angular/cli
    ```

## Instalación

1.  Clona el repositorio a tu máquina local:
    ```bash
    git clone https://github.com/manavarrete97/gestor-notas-ng.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd gestor-notas-ng
    ```
3.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

## Servidor de Desarrollo

Para ejecutar la aplicación en un entorno de desarrollo, utiliza el siguiente comando:

```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos de origen.

## Configuración del Backend

Esta aplicación frontend está diseñada para funcionar con un backend API. La configuración de la URL del backend se encuentra en el archivo `proxy.conf.json`.

```json
{
    "/api": {
      "target": "https://localhost:7206",
      "secure": false,
      "changeOrigin": true
    }
}
```

Si tu backend se está ejecutando en un puerto diferente, asegúrate de actualizar el valor de `target` en este archivo para que coincida con la URL de tu backend.

## Funcionalidad

El Gestor de Notas NG proporciona las siguientes características:

*   **Gestión de Estudiantes**: Crea, visualiza, edita y elimina estudiantes.
*   **Gestión de Materias**: Crea, visualiza, edita y elimina materias.
*   **Gestión de Notas**: Asigna, actualiza y elimina las notas de los estudiantes para diferentes materias.
*   **Notificaciones**: Notificaciones en tiempo real para las acciones del usuario.
*   **Efecto Confeti**: Una pequeña celebración cuando se crea una nueva nota con una calificación perfecta.

## Autor

*   **Mateo Navarrete Rua**

¡Gracias por usar Gestor de Notas!
