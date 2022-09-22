let sorrentinos = [
    {id:1 , sabor:"Jamon y Queso", precio: 500},
    {id:2 , sabor: "Ternera y Queso", precio: 550},
    {id:3 , sabor: "Calabaza y Queso", precio: 450}
]

let carrito =[];
let total = 0;

const contenedorProductos = document.getElementById("tarjetaIndex")
const carritoActualizado  = document.getElementById("carrito")
const botonVaciarCarrito = document.getElementById("vaciarCarrito")
const precioTotal = document.getElementById("precioTotal")
const botonComprar = document.getElementById("botonComprar")

botonComprar.addEventListener(`click`,()=>{

    finalizarCompra()
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciarCarrito.addEventListener(`click`,()=>{
    carrito.length = 0
    actualizarCarrito()
})

sorrentinos.forEach((producto,prodId)=>{
    const div = document.createElement(`div`)
    div.classList.add(`producto`)
    div.innerHTML = `<div><img class="imgIndex" src="./assets/img/sorrentinosVenta.png" alt=""></div>
    <h4>Sorrentino x12u</h4>
    <h5>$ ${producto.sabor}</h5>
    <h6>$ ${producto.precio}</h6>
    <button id ="agregar${producto.id}" class="btnIndex">Agregar</button>`
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener(`click`, ()=>{
        agregarAlCarrito(prodId)
        alert(`Producto agregado al carrito`)
    })
    
})

const agregarAlCarrito = (prodId)=>{
    const indiceEncontrado = carrito.findIndex((producto)=>{
        return producto.id === sorrentinos[prodId].id
    })
    if(indiceEncontrado === -1){
        const agregarProducto = sorrentinos[prodId]
        agregarProducto.cantidad = 1
        carrito.push(agregarProducto)
        actualizarCarrito()
    }else{
        carrito[indiceEncontrado].cantidad +=1
        actualizarCarrito()

    }
    

}

const actualizarCarrito = ()=>{

    carritoActualizado.innerHTML =""
    carrito.forEach ((prod) => {
        const div = document.createElement(`div`)
        div.className = (`productoEnCarrito`)
        div.innerHTML = `
        <p>${prod.sabor}</p>
        <p>Precio: ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})">Eliminar</button>
         `
         carritoActualizado.appendChild(div)
         
         localStorage.setItem('carrito', JSON.stringify(carrito))

})
precioTotal.innerText = carrito.reduce((acc,prod) => acc + (prod.precio * prod.cantidad), 0)
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice , 1)
    actualizarCarrito()
}

const finalizarCompra =()=>{
    
    carritoActualizado.innerHTML =""
    const finCompra = `<h1>GRACIAS POR SU COMPRA</h1>`
    carritoActualizado.innerHTML = finCompra
}

