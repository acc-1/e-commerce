// Ruta al archivo JSON
const productos = 'productos.json';

let carrito = []; // Variable global para llevar un seguimiento del carrito
// Función para cargar el archivo JSON y crear la lista de productos
function cargarProductos() {    
    fetch(productos)
        .then(response => response.json())
        .then(dat => {
            const productList = document.getElementById('product-list');
            dat.forEach(product => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h2>${product.nombreProducto}</h2>
                    <p>Código: ${product.codigo}</p>
                    <p>Descripción: ${product.descripcion}</p>
                    <p>Precio: $${product.precioUnitario}</p>
                    <p>Categoría: ${product.categoria}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>Disponibilidad: ${product.disponibilidad ? 'Disponible' : 'Agotado'}</p>
                    <img src="${product.img}" alt="${product.nombreProducto}">
                    <div class="div">
                    <button class="add-to-cart" data-product-code="${product.codigo}">Agregar al Carrito</button>
                    <a href="detalle.html?codigo=${product.codigo}" class="lupa">
                        <i class="fa-solid fa-magnifying-glass"></i> ver mas
                    </a></div>
                `;
                productList.appendChild(listItem);
            });

            // Agrega un evento de clic a los botones "Agregar al Carrito"
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', agregarAlCarrito);
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}
cargarProductos()

    

    
// Función para calcular y mostrar el total del carrito
function actualizarSumaCarrito() {
    // Calcular la suma de los precios en el carrito
    const suma = carrito.reduce((total, producto) => total + parseFloat(producto.precioUnitario), 0);

    // Mostrar la suma en el carrito
    const sumaCarritoElement = document.getElementById('suma-carrito');
    sumaCarritoElement.textContent = `Total: $${suma.toFixed(2)}`;
}



function agregarAlCarrito(event) {
    const productCode = event.target.getAttribute('data-product-code');
    
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const product = data.find(product => product.codigo == productCode);

            if (product) {
                // Agregar el producto al carrito
                carrito.push(product);

                // Guardar el carrito en localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));
                // Actualizar la suma del carrito
                actualizarSumaCarrito();

                // Crear un elemento de lista para el producto en el carrito
                const listItem = document.createElement('li');
                listItem.textContent = `${product.nombreProducto} - Precio: $${product.precioUnitario}`;
                listItem.innerHTML = `
                <h2>${product.nombreProducto}</h2>
                <p>- Precio: $${product.precioUnitario}</p>
                <img src="${product.img}" alt="${product.nombreProducto}">
               
                
            `;

                // Crear un botón para eliminar el producto del carrito
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    eliminarDelCarrito(product.codigo);
                    // Eliminar el elemento del DOM
                    carritoList.removeChild(listItem);
                });

                // Agregar el botón de eliminar al elemento de lista
                listItem.appendChild(deleteButton);

                const carritoList = document.getElementById('carrito-list');
               
                carritoList.appendChild(listItem);
            } else {
                console.error('Producto no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}


function eliminarDelCarrito(productCode) {
    // Busca el índice del producto en el arreglo del carrito
    const index = carrito.findIndex(product => product.codigo == productCode);

    if (index !== -1) {
        // Elimina el producto del carrito
        carrito.splice(index, 1);

        // Actualiza la suma del carrito
        actualizarSumaCarrito();
    } else {
        console.error('Producto no encontrado en el carrito');
    }
}




document.addEventListener('DOMContentLoaded', function () {
    const carritoList = document.getElementById('carrito-list');

    function actualizarCarritoDesdeLocalStorage() {
        // Recuperar el carrito desde localStorage
        const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));

        if (carritoLocalStorage && carritoLocalStorage.length > 0) {
            carritoList.innerHTML = ''; // Limpiar la lista del carrito

            carrito = carritoLocalStorage; // Actualizar la variable global

            carrito.forEach(product => {
                // Crear un elemento de lista para el producto en el carrito
                const listItem = document.createElement('li');
                listItem.textContent = `${product.nombreProducto} - Precio: $${product.precioUnitario}`;

                // Crear un botón para eliminar el producto del carrito
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    eliminarDelCarrito(product.codigo);
                    // Eliminar el elemento del DOM
                    carritoList.removeChild(listItem);
                });

                // Agregar el botón de eliminar al elemento de lista
                listItem.appendChild(deleteButton);

                carritoList.appendChild(listItem);
            });
        }
    }

    // Llama a la función para actualizar el carrito desde localStorage cuando se carga la página
    actualizarCarritoDesdeLocalStorage();
});
// script.js

// Variable global para llevar un seguimiento del carrito


document.addEventListener('DOMContentLoaded', function () {
    const carritoList = document.getElementById('carrito-list');
    const sumaCarritoElement = document.getElementById('suma-carrito');

    function actualizarCarritoDesdeLocalStorage() {
        // Recuperar el carrito desde localStorage
        const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));

        if (carritoLocalStorage && carritoLocalStorage.length > 0) {
            carrito = carritoLocalStorage; // Actualizar la variable global

            // Limpiar la lista del carrito
            carritoList.innerHTML = '';
            
            carrito.forEach(product => {
                // Crear un elemento de lista para el producto en el carrito
                const listItem = document.createElement('li');
                listItem.textContent = `${product.nombreProducto} - Precio: $${product.precioUnitario}`;

                // Crear un botón para eliminar el producto del carrito
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    eliminarDelCarrito(product.codigo);
                    // Eliminar el elemento del DOM
                    carritoList.removeChild(listItem);
                });

                // Agregar el botón de eliminar al elemento de lista
                listItem.appendChild(deleteButton);

                carritoList.appendChild(listItem);
            });
        }
    }

    // Llama a la función para actualizar el carrito desde localStorage cuando se carga la página
    actualizarCarritoDesdeLocalStorage();
    
    // Función para calcular y mostrar el total del carrito
    function actualizarSumaCarrito() {
        // Calcular la suma de los precios en el carrito
        const suma = carrito.reduce((total, producto) => total + parseFloat(producto.precioUnitario), 0);

        // Mostrar la suma en el carrito
        sumaCarritoElement.textContent = `Total: $${suma.toFixed(2)}`;
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(productCode) {
        // Busca el índice del producto en el arreglo del carrito
        const index = carrito.findIndex(product => product.codigo == productCode);

        if (index !== -1) {
            // Elimina el producto del carrito
            carrito.splice(index, 1);

            // Actualiza la suma del carrito
            actualizarSumaCarrito();

            // Actualiza el almacenamiento local con el carrito actualizado
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } else {
            console.error('Producto no encontrado en el carrito');
        }
    }

});


document.addEventListener('DOMContentLoaded', function () {
    const carritoList = document.getElementById('carrito-list');
    const sumaCarritoElement = document.getElementById('suma-carrito');
    const botonComprar = document.getElementById('boton-comprar');

    
    // Agregar un evento de clic al botón "Comprar"
    botonComprar.addEventListener('click', () => {
        // Simulación de compra: reiniciar el carrito y la suma del carrito
        carrito = []; // Vacía el carrito
        localStorage.removeItem('carrito'); // Elimina el carrito del almacenamiento local
        carritoList.innerHTML = ''; // Limpia la lista del carrito
        sumaCarritoElement.textContent = 'Total: $0.00'; // Reinicia la suma del carrito

        // Muestra una alerta de compra realizada correctamente
        
    });

  
});
// Obtén referencias a los elementos del DOM
const botonComprar = document.getElementById("boton-comprar");
const formularioCompra = document.getElementById("formulario-compra");
const realizarCompraButton = document.getElementById("realizar-compra");

// Agrega un evento al botón "Comprar" para mostrar el formulario
botonComprar.addEventListener("click", function() {
    formularioCompra.style.display = "block";
});

// Agrega un evento al botón "Realizar Compra" para ocultar el formulario y mostrar el mensaje de confirmación
realizarCompraButton.addEventListener("click", function() {
    formularioCompra.style.display = "none";
    mostrarConfirmacion();
});

// Función para mostrar el mensaje de confirmación
function mostrarConfirmacion() {
    // Puedes personalizar el mensaje de confirmación aquí
    const mensaje = "¡Compra realizada con éxito! Gracias por tu compra.";

    // Crea un elemento de párrafo para mostrar el mensaje
    const mensajeElement = document.createElement("p");
    mensajeElement.textContent = mensaje;

    // Agrega el mensaje de confirmación al cuerpo del documento
    document.body.appendChild(mensajeElement);
    alert('Compra realizada correctamente. Gracias por tu compra.');
}

