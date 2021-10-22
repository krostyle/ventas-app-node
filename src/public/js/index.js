const tr_events = document.querySelectorAll('.tr-events');
tr_events.forEach(tr => {
    tr.addEventListener('click', async(e) => {
        e.preventDefault();
        if (e.target.classList.contains('btn-update')) {
            try {
                const res = await axios.put(`/api/clientes/${tr.id}`);
                const { cliente } = res.data;

                if (cliente.estado) {
                    await Swal.fire({
                        title: 'Activado',
                        text: `El cliente ${cliente.nombre} ha sido Activado`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    await Swal.fire({
                        title: 'Desactivado',
                        text: `El cliente ${cliente.nombre} ha sido Desactivado`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
                location.reload();
            } catch (error) {
                console.log(error);
                await Swal.fire({
                    title: 'Error',
                    text: 'No se pudo actualizar el cliente',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        };
        if (e.target.classList.contains('btn-ventas')) {
            try {
                window.location.href = `/api/ventas/${tr.id}`;
            } catch (error) {
                console.log(error);
                await Swal.fire({
                    title: 'Error',
                    text: 'No se pudo redireccionar a las ventas del cliente seleccionado',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }

        }
    });
});