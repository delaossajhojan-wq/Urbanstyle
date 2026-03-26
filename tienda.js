
const productos = [
    { id: 1, nombre: "Camiseta oversized", precio: 20000, categoria: "Camiseta", img: "Oversized1.jpg" },
    { id: 2, nombre: "Pantalón", precio: 67000, categoria: "Pantalón", img: "pantalon.jpg" },
    { id: 3, nombre: "Chaqueta de cuero", precio: 80000, categoria: "Chaqueta", img: "chaqueta hombre.jpg" },
    { id: 4, nombre: "Camiseta", precio: 28000, categoria: "Camiseta", img: "CamisetasBasic.jpg" },
    { id: 5, nombre: "Jean blue", precio: 55000, categoria: "Pantalón", img: "panta.jpg" },
    { id: 6, nombre: "Chaqueta", precio: 67000, categoria: "Chaqueta", img: "chaqueta marron.jpg" },
    { id: 7, nombre: "Camiseta", precio: 20000, categoria: "Camiseta", img: "negra.jpg" },
    { id: 8, nombre: "Pantalón", precio: 46000, categoria: "Pantalón", img: "Pantalon1.jpg" },
    { id: 9, nombre: "Chaqueta de jean", precio: 38000, categoria: "Chaqueta", img: "66b6e473fd5e4aa1b627e1bbc432f033.jpg" }
];


let carrito = [];
let pedidos = [];


const contenedor = document.getElementById("lista-productos");
const inputBusqueda = document.getElementById("input-busqueda");
const filtroCategoria = document.getElementById("filtro-categoria");
const contadorVisitas = document.getElementById("contador-visitas");


let visitas = localStorage.getItem("visitas") || 0;
visitas = parseInt(visitas) + 1;
localStorage.setItem("visitas", visitas);
if (contadorVisitas) contadorVisitas.textContent = visitas;


function mostrarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach((p) => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${p.img}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p>$${p.precio}</p>
                <button onclick="agregarCarrito(${p.id})">Comprar</button>
            </div>
        `;
    });
}


function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}


function actualizarCarrito() {
    const lista = document.getElementById("items-carrito");
    const total = document.getElementById("total");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach((p, index) => {
        suma += p.precio;
        lista.innerHTML += `
            <li>
                ${p.nombre} - $${p.precio}
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </li>
        `;
    });

    total.textContent = suma;
    contador.textContent = carrito.length;
}


function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}


function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}


document.getElementById("carrito-btn").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("oculto");
});


function realizarPago() {
    if (carrito.length === 0) {
        alert("El carrito está vacío ❌");
        return;
    }
    pedidos.push([...carrito]);
    mostrarPedidos();
    alert("Pago realizado con éxito 💳");
    carrito = [];
    actualizarCarrito();
}


function mostrarPedidos() {
    const lista = document.getElementById("lista-pedidos");
    lista.innerHTML = "";
    pedidos.forEach((pedido, i) => {
        lista.innerHTML += `<li>Pedido ${i + 1} - ${pedido.length} productos</li>`;
    });
}


if (inputBusqueda) {
    inputBusqueda.addEventListener("input", () => {
        const texto = inputBusqueda.value.toLowerCase();
        filtrarYMostrar(texto, filtroCategoria.value);
    });
}


if (filtroCategoria) {
    filtroCategoria.addEventListener("change", () => {
        filtrarYMostrar(inputBusqueda.value.toLowerCase(), filtroCategoria.value);
    });
}


function filtrarYMostrar(texto, categoria) {
    let filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    if (categoria !== "todos") {
        filtrados = filtrados.filter(p => p.categoria === categoria);
    }
    mostrarProductos(filtrados);
}


mostrarProductos(productos);
