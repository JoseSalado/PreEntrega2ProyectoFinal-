let sorrentinos = [
    {sabor:"Jamon y Queso", precio: 500},
    {sabor: "Ternera y Queso", precio: 550},
    {sabor: "Calabaza y Queso", precio: 450}
]

const dibujarProductos = ()=>{
let contenedor = document.querySelector(".tarjetaIndex");
sorrentinos.forEach((producto, indice)=> {
    let tarjeta = document.createElement("div");     
    tarjeta.innerHTML = `<div><img class="imgIndex" src="./assets/img/sorrentinosVenta.png" alt=""></div>
    <h4>Sorrentino x12u</h4>
    <h5>$ ${producto.sabor}</h5>
    <h6>$ ${producto.precio}</h6>
    <button class="btnIndex" onClick = "agregarCarrito() ">Comprar</button>`
    contenedor.appendChild(tarjeta);
})

}
dibujarProductos();

const agregarCarrito = ()=>{
    alert("Producto agregado al Carrito");
}