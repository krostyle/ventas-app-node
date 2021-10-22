const tr_events = document.querySelectorAll('.tr-events');
//Eliminar Modificar Venta
tr_events.forEach(tr => {
    tr.addEventListener('click', async(e) => {
        e.preventDefault();
        try {
            if (e.target.classList.contains('btn-eliminar')) {
                const total = e.target.parentElement.parentElement.children[4].innerText;
                const confirmDeleteVenta = await Swal.fire({
                    title: `¿Estas seguro de eliminar la venta ${tr.id} por ${total}?`,
                    text: "No podrás revertir esta acción",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'Cancelar'
                });
                if (confirmDeleteVenta.isConfirmed) {
                    await axios.delete(`/api/ventas/${tr.id}`);
                    await Swal.fire(
                        `Venta ${tr.id} Eliminada Correctamente`,
                        `Has eliminado una venta por un total de ${total}`,
                        'success'
                    )
                    location.reload();
                } else {
                    Swal.fire(
                        'Cancelado',
                        'No se ha eliminado la venta',
                        'error'
                    )
                }
            } else if (e.target.classList.contains('btn-editar')) {
                window.location.href = `/api/detalles/${tr.id}`;
            }

        } catch (error) {
            console.log(error);
            await Swal.fire(
                'No puedes eliminar ventas con transacciones en curso',
                'Debes eliminar los detalles para poder eliminar la venta',
                'error'
            )
        }

    });
});

//Crear venta
const btn_venta = document.querySelector('.btn-venta');
btn_venta.addEventListener('click', async(e) => {
    e.preventDefault();
    const fecha = moment(new Date()).format('YYYY-MM-DD');
    const cliente_id = btn_venta.getAttribute('id');
    const data = {
        fecha,
        cliente_id
    };
    try {
        const clienteNombre = btn_venta.getAttribute('nombre-cliente');
        const confirmVenta = await Swal.fire({
            title: `Estas seguro de registrar una venta a nombre de ${clienteNombre}`,
            text: "Podrás modificar o eliminar el registro en el futuro",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Crear!',
            cancelButtonText: 'Cancelar'
        })
        if (confirmVenta.isConfirmed) {
            const resCreateVenta = await axios.post(`/api/ventas/`, data);
            const { venta } = resCreateVenta.data;
            console.log(venta);
            await Swal.fire(
                `Registro de venta ${venta.id} creado correctamente`,
                'Serás redireccionado a la sección de productos',
                'success'
            )
            window.location.href = `/api/detalles/${venta.id}`;
        } else {
            Swal.fire(
                'Operación cancelada',
                'No se registró la venta',
                'error'
            )
        }
    } catch (error) {
        console.log(error);
        await Swal.fire(
            '¡Ah caray! Ha ocurrido un problema',
            'No se ha podido registrar la venta',
            'error'
        )
    }
});