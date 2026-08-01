const formulario = document.getElementById("productForm");
const mensaje = document.getElementById("mensaje");

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

});