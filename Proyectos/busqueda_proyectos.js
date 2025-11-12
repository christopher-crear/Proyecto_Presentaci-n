function buscarProductos() {
            // Obtiene el texto del buscador en minúsculas
            const textoBuscar = document.getElementById('termino-busqueda').value.toLowerCase();

            // Selecciona TODAS las filas de productos
            const filas = document.querySelectorAll('.fila-producto');

            // Obtiene el elemento del mensaje "sin resultados"
            const sinResultado = document.getElementById('sin-resultado');

            // Variable contador
            let total = 0;

            // Recorre cada fila de producto
            filas.forEach(fila => {
                // Busca la tarjeta dentro de esa fila
                const tarjeta = fila.querySelector('.tarjeta-producto');

                // Obtiene el texto de la tarjeta en minúsculas
                const texto = tarjeta.innerText.toLowerCase();

                // Si el buscador está vacío O el texto está en el producto:
                if (textoBuscar.length === 0 || texto.indexOf(textoBuscar) > -1) {
                    // Muestra la tarjeta
                    tarjeta.classList.remove('oculto');
                    // Suma 1 al contador
                    total++;
                } else {
                    // Si no coincide, oculta la tarjeta
                    tarjeta.classList.add('oculto');
                }
            });

            // Quita la clase "alerta" del mensaje
            sinResultado.classList.remove('alerta');

            // Si el buscador está vacío:
            if (textoBuscar === "") {
                // Oculta el mensaje
                sinResultado.classList.add('oculto');

                // Si encontró coincidencias:
            } else if (total > 0) {
                // Oculta el mensaje
                sinResultado.classList.add('oculto');

                // Si NO encontró coincidencias:
            } else {
                // Muestra el mensaje
                sinResultado.classList.remove('oculto');
                // Lo pone en rojo
                sinResultado.classList.add('alerta');
                // Escribe el mensaje
                sinResultado.innerHTML = "No se han encontrado coincidencias.";
            }
        }