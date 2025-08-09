const getNav1 = () => {
    const nav = document.createElement('nav')
    nav.style.backgroundColor = 'black'

    const navList = document.createElement('ul')
    navList.style.listStyle = 'none'
    navList.classList.add('navList')

    const createNavBarItem = (titulo, link) => {
        const navItem = document.createElement('li')
        const item = document.createElement('a')
        item.textContent = titulo
        item.href = link
        item.classList.add('itemNav')
        navItem.appendChild(item)
        navList.appendChild(navItem)
        nav.appendChild(navList)
    }

    createNavBarItem('Inicio', '/inicio.html')

    const inputBuscador = document.createElement('input')
    inputBuscador.type = 'text'
    inputBuscador.placeholder = '    Buscar producto...'
    inputBuscador.classList.add('inputBuscador')
    navList.appendChild(inputBuscador)

    const getCart = () => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    let cart = getCart()

    const navItemCart = document.createElement('li')
    const cantCart = document.createElement('p')
    cantCart.id = 'cart-count'
    cantCart.textContent = cart.reduce((acc, item) => acc + item.cantidad, 0)
    cantCart.style.color = 'white'
    const itemCart = document.createElement('a')
    const imgCart = document.createElement('img')
    imgCart.classList.add('imgCart')
    imgCart.src = './img/cart.png'
    imgCart.alt = 'carrito'
    itemCart.href = '/cart.html'
    itemCart.appendChild(imgCart)
    itemCart.classList.add('itemNav')
    navItemCart.appendChild(itemCart)
    navItemCart.appendChild(cantCart)
    navItemCart.classList.add('divCart')
    navList.appendChild(navItemCart)
    nav.appendChild(navList)

    inputBuscador.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const texto = e.target.value.trim()

            try {
                window.location.href = `/productos.html?title=${texto}`

            } catch (error) {
                console.error(error)
                divProductPadre.innerHTML = `<p style="text-align:center">No se encontraron productos</p>`
            }
        }
    })
    return nav
}

const getNav2 = () => {

    const nav = document.createElement('nav')

    const navList = document.createElement('ul')
    navList.classList.add('secondNavList')

    const createSecondNavBarItem = (titulo, link) => {
        const navItem = document.createElement('li')
        const item = document.createElement('a')
        item.textContent = titulo
        item.href = link
        item.classList.add('secondNavItem')
        navItem.appendChild(item)
        navList.appendChild(navItem)
        nav.appendChild(navList)

    }

    createSecondNavBarItem('Productos', '/productos.html')
    createSecondNavBarItem('Envios', '/productos.html')
    createSecondNavBarItem('Ubicacion', '/productos.html')
    createSecondNavBarItem('Medios de pago', '/productos.html')


    return nav
}

