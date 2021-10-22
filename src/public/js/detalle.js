const btn_agregar = document.querySelector('.btn-agregar');
const productoElement = document.getElementById('producto');
const cantidadElement = document.getElementById('cantidad');
const subtotalElement = document.getElementById('subtotal');
const btn_eliminar = document.querySelectorAll('.btn-eliminar');
const descuentoInputElement = document.getElementById('descuentoInput');
const descuentoElement = document.getElementById('descuento');
const totalElement = document.getElementById('total');
const subtotalVentaElement = document.getElementById('subtotalVenta');
const btn_descuento = document.querySelector('.btn-descuento');
const btn_finalizarVenta = document.querySelector('.btn-finalizar');

const optiosPesos = {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
}
const formatPesos = new Intl.NumberFormat('es-CL', optiosPesos);

const obtenerPrecioStock = () => {
    const producto = productoElement.value;
    const cantidad = cantidadElement.value;
    const precio = producto * cantidad;
    subtotalElement.textContent = formatPesos.format(precio);
}


productoElement.addEventListener('change', obtenerPrecioStock);
cantidadElement.addEventListener('change', obtenerPrecioStock);
btn_descuento.addEventListener('click', async(e) => {
    e.preventDefault();
    const confirmDescuento = await Swal.fire({
        title: '¿Está seguro de aplicar descuento?',
        text: "Se aplicará el descuento sobre el total de la venta",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, aplicar descuento',
        cancelButtonText: 'Cancelar'
    });
    if (confirmDescuento.isConfirmed) {
        await Swal.fire(
            'Descuento aplicado!',
            'El descuento se aplicó correctamente',
            'success'
        )
        const subtotal = subtotalVentaElement.getAttribute('value');
        const descuento = descuentoInputElement.value;
        const descuentoAplicado = subtotal * descuento / 100;
        const total = subtotal - descuentoAplicado;
        totalElement.textContent = formatPesos.format(total);
        descuentoElement.textContent = formatPesos.format(descuentoAplicado);
        descuentoElement.setAttribute('value', descuentoAplicado);
        totalElement.setAttribute('value', total);
    } else {
        await Swal.fire(
            'Cancelado',
            'El descuento no se aplicó',
            'error'
        )
    }
});

btn_agregar.addEventListener('click', async(e) => {
    e.preventDefault();
    try {

        //GET ID PRODUCTO
        const productElementId = productoElement.options[productoElement.selectedIndex].id;
        const resProducto = await axios.get(`/api/productos/${productElementId}`);
        const { producto } = resProducto.data;
        if (producto.cantidad >= cantidadElement.value) {
            const data = {
                cantidad: cantidadElement.value,
                subtotal: cantidadElement.value * producto.precio,
                venta_id: btn_agregar.id,
                producto_id: producto.id
            }
            const confirmProduct = await Swal.fire({
                title: '¿Está seguro?',
                text: `Se agregarán ${cantidadElement.value} unidades del stock de ${producto.nombre} de un total de ${producto.cantidad} a la venta`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, agregar'
            });
            if (confirmProduct.isConfirmed) {
                const resCreateDetalle = await axios.post('/api/detalles', data);
                const resProducto = resCreateDetalle.data.producto;
                await Swal.fire(
                    'Agregado!',
                    `Se han añadido ${producto.cantidad-resProducto.cantidad} unidades de ${resProducto.nombre}`,
                    'success'
                )
                location.reload();
            } else {
                await Swal.fire('Cancelado', 'El producto no fue agregado', 'error');
            }
        } else {
            await Swal.fire('Error',
                `No hay suficientes unidades, solo quedan ${producto.cantidad} unidades de ${producto.nombre}`,
                'error');
        }

    } catch (error) {
        await Swal.fire(
            '¡Ah caray! Ha ocurrido un problema',
            'No se ha podido obtner el producto, asegurese de que el producto existe',
            'error'
        )
    }
})

btn_eliminar.forEach(btn => {
    btn.addEventListener('click', async(e) => {
        e.preventDefault();
        try {

            const detalleId = btn.id;
            const productoId = btn.getAttribute('producto-id');
            const productoCantidad = btn.getAttribute('producto-cantidad');
            const ventaId = btn.getAttribute('venta-id');
            const productoNombre = btn.getAttribute('producto-nombre');
            const productoSubtotal = btn.getAttribute('producto-subtotal');
            const data = {
                detalle_id: detalleId,
                producto_id: productoId,
                cantidad: productoCantidad,
                venta_id: ventaId
            }
            const confirmDeleteVenta = await Swal.fire({
                title: `¿Estas seguro de eliminar el producto ${productoNombre} por ${productoSubtotal}?`,
                text: "El producto volera al stock",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'Cancelar'
            });
            if (confirmDeleteVenta.isConfirmed) {
                await axios.delete(`/api/detalles/${btn.id}`, { data });
                await Swal.fire(
                    'Eliminado!',
                    `Se ha eliminado ${productoCantidad} unidades de ${productoNombre} de la venta`,
                    'success'
                )
                location.reload();
            } else {
                await Swal.fire('Cancelado', 'El producto no fue eliminado', 'error');
            }

        } catch (error) {
            await Swal.fire(
                '¡Ah caray! Ha ocurrido un problema',
                'No se ha podido eliminar el producto',
                'error'
            )
        }
    })
});

btn_finalizarVenta.addEventListener('click', async(e) => {
    e.preventDefault();
    const id = btn_finalizarVenta.id;
    const total = totalElement.getAttribute('value');
    const descuento = descuentoElement.getAttribute('value');
    const cliente_id = btn_finalizarVenta.getAttribute('cliente-id');
    const data = {
        total,
        descuento,
        cliente_id
    }
    try {
        const confirmFinalizarVenta = await Swal.fire({
            title: '¿Está seguro?',
            text: `Se finalizará la venta con un total de ${formatPesos.format(total)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Finalizar',
            cancelButtonText: 'Cancelar'
        });
        if (confirmFinalizarVenta.isConfirmed) {
            await axios.put(`/api/ventas/${id}`, data);
            await Swal.fire(
                'Finalizado!',
                'La venta ha sido finalizada',
                'success'
            )
            window.location.href = `/api/ventas/${cliente_id}`;
        }
    } catch (error) {
        console.log(error);
        await Swal({
            title: '¡Ah caray! Ha ocurrido un problema',
            text: 'No se ha podido finalizar la venta',
            icon: 'error'
        })

    }



});

const modal = async() => {
    await await Swal.fire({
        title: `Recuerde Finalizar/Actualizar`,
        text: "De lo contrario los montos no se verán reflejados en la venta",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
    });
};
document.addEventListener('DOMContentLoaded', () => {
    let booleanModal = false
    if (localStorage.getItem('modal') === 'true') {
        booleanModal = true
    } else {
        booleanModal = false
    }

    if (!booleanModal) {
        modal();
        localStorage.setItem('modal', 'true');
    }
});