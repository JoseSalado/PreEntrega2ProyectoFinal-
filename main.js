let sorrentinos = [
    {id:1 , sabor:"Jamon y Queso", precio: 500},
    {id:2 , sabor: "Ternera y Queso", precio: 550},
    {id:3 , sabor: "Calabaza y Queso", precio: 450}
]
let carrito =[];
let carritoContenedor = document.querySelector(".carrito")
let vaciarCarrito = document.querySelector("#vaciarCarrito")
let precioTotal = document.querySelector("#precioTotal")

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

vaciarCarrito.addEventListener(`click`,()=>{
    carrito.length = 0;
    actualizarCarrito();

})
const dibujarProductos = ()=>{
let contenedor = document.querySelector(".tarjetaIndex");
sorrentinos.forEach((producto)=> {
    let tarjeta = document.createElement("div");     
    tarjeta.innerHTML = `<div><img class="imgIndex" src="./assets/img/sorrentinosVenta.png" alt=""></div>
    <h4>Sorrentino x12u</h4>
    <h5>$ ${producto.sabor}</h5>
    <h6>$ ${producto.precio}</h6>
    <button id ="agregar${producto.id}" class="btnIndex">Agregar</button>`
    contenedor.appendChild(tarjeta);

    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener(`click`,()=>{
        agregarAlCarrito(producto.id);
     
    })
})

}
dibujarProductos();

const agregarAlCarrito = (prodId)=>{
    const existe = carrito.some (producto=> producto.id === prodId) 
    if(existe){
        const produ = carrito.map (producto=>{
            if (producto.id === prodId) {
                producto.cantidad++
            }
        })
    }else{
        const item = sorrentinos.find((prod) => prod.id === prodId);
        carrito.push(item);
    }

   
    actualizarCarrito();
}

const eliminarDelCarrito = (prodId)=>{
    const item = carrito.find((producto) => producto.id === prodId);
    const indice = carrito.indexOf(item); 
    carrito.splice (indice ,1);
    actualizarCarrito();

}

const actualizarCarrito = ( ) =>{
    carritoContenedor.innerHTML = ""
    carrito.forEach((producto) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${producto.sabor}</p>
        <p>Precio:$${producto.precio}</p>
        <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar">Eliminar</button>
        `

        carritoContenedor.appendChild(div);

        localStorage.setItem('carrito', JSON.stringify(carrito));
})

precioTotal.innerText =carrito.reduce((acc,producto)=> acc + producto.precio, 0) 

}