function formatearDinero(cantidad) {
    return cantidad.toLocaleString('un-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export {
    formatearDinero
}