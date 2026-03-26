const productos = [
    { id: 1, nombre: "Camisa", precio: 50000 },
    { id: 2, nombre: "Pantalón", precio: 80000 },
    { id: 3, nombre: "Zapatos", precio: 120000 }
];

const listaProductos = document.getElementById("lista-productos");

productos.forEach(producto => {
    const div = document.createElement("div");
    div.innerHTML = `
        <p>${producto.nombre} - $${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
    `;
    listaProductos.appendChild(div);
});

let carrito = [];

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    mostrarCarrito();
}
function mostrarCarrito() {
    const carritoHTML = document.getElementById("carrito");
    carritoHTML.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio} 
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoHTML.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}