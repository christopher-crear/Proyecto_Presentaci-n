function navegarSeccion(seccionId) {
            const seccion = document.getElementById(seccionId);
            if (seccion) {
                seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // Navegación con teclado (opcional)
        document.addEventListener('keydown', function (e) {
            const secciones = ['inicio', 'habilidades', 'galeria','mensajes','encabezado'];
            const seccionActual = obtenerSeccionActual();
            const indiceActual = secciones.indexOf(seccionActual);

            if (e.key === 'ArrowUp' && indiceActual > 0) {
                navegarSeccion(secciones[indiceActual - 1]);
            } else if (e.key === 'ArrowDown' && indiceActual < secciones.length - 1) {
                navegarSeccion(secciones[indiceActual + 1]);
            }
        });

        function obtenerSeccionActual() {
            const secciones = ['inicio', 'habilidades', 'galeria'];
            const scrollPos = window.scrollY + window.innerHeight / 2;

            for (let seccion of secciones) {
                const elemento = document.getElementById(seccion);
                if (elemento) {
                    const top = elemento.offsetTop;
                    const bottom = top + elemento.offsetHeight;
                    if (scrollPos >= top && scrollPos <= bottom) {
                        return seccion;
                    }
                }
            }
            return 'inicio';
        }