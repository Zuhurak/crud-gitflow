const formulario = document.getElementById("productForm");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("tablaProductos");

async function cargarProductos() {

    const respuesta = await fetch("/api/products");

    const productos = await respuesta.json();

    tabla.innerHTML = "";

    productos.forEach(producto => {

        tabla.innerHTML += `

            <tr>

                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>

            </tr>

        `;

    });

}

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const producto = {

        nombre: document.getElementById("nombre").value,
        precio: Number(document.getElementById("precio").value),
        cantidad: Number(document.getElementById("cantidad").value)

    };

    const respuesta = await fetch("/api/products", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(producto)

    });

    const datos = await respuesta.json();

    mensaje.innerHTML = `Producto agregado: ${datos.nombre}`;

    formulario.reset();

    cargarProductos();

});

cargarProductos();