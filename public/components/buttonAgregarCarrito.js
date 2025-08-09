const actualizarContadorCarrito = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const contador = document.getElementById('cart-count')
    if (contador) {
        const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0)
        contador.textContent = totalItems
    }
}

const agregarAlCarrito = (cart, producto, cant) => {
    const productsCart = cart.find(item => item.codigo === producto.codigo)
    if (productsCart) {
        productsCart.cantidad += cant
    } else {
        cart.push({ codigo: producto.codigo, cantidad: cant })
    }
    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(cart));

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
        customClass: {
            popup: 'my-toast'
        }
    });

    actualizarContadorCarrito()
}