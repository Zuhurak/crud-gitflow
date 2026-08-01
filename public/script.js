const buscador = document.getElementById("buscar");
let productoEditando = null;

const formulario = document.getElementById("productForm");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("tablaProductos");

let listaProductos = [];

async function cargarProductos() {

    const respuesta = await fetch("/api/products");

    listaProductos = await respuesta.json();

    mostrarProductos(listaProductos);

}

function mostrarProductos(productos) {

    tabla.innerHTML = "";

    productos.forEach(producto => {

        tabla.innerHTML += `

        <tr>

            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>

            <td>

                <button onclick="editarProducto(${producto.id})">
                    Editar
                </button>

                <button onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>

            </td>

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

    if (productoEditando) {

        await fetch(`/api/products/${productoEditando}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(producto)

        });

        mensaje.innerHTML = "Producto actualizado.";

        productoEditando = null;

        formulario.querySelector("button").textContent = "Agregar Producto";

    } else {

        const respuesta = await fetch("/api/products", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(producto)

        });

        const datos = await respuesta.json();

        mensaje.innerHTML = `Producto agregado: ${datos.nombre}`;

    }

    formulario.reset();

    cargarProductos();

});

function editarProducto(id) {

    const producto = listaProductos.find(p => p.id === id);

    if (!producto) return;

    productoEditando = id;

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("cantidad").value = producto.cantidad;

    formulario.querySelector("button").textContent = "Actualizar Producto";

}

async function eliminarProducto(id) {

    const confirmar = confirm("¿Desea eliminar este producto?");

    if (!confirmar) {
        return;
    }

    const respuesta = await fetch(`/api/products/${id}`, {

        method: "DELETE"

    });

    if (respuesta.ok) {

        mensaje.innerHTML = "Producto eliminado.";

        cargarProductos();

    } else {

        mensaje.innerHTML = "No se pudo eliminar el producto.";

    }

}

buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase();

    const resultado = listaProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(resultado);

});

cargarProductos();