const btn_eliminar = document.querySelectorAll('.btn-eliminar');
btn_eliminar.forEach(async(btn) => {
    btn.addEventListener('click', async(e) => {
        e.preventDefault();
        try {
            const confirmDeleteProduct = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¡No podrás revertir esto!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, eliminar!',
                cancelButtonText: 'Cancelar'
            });
            if (confirmDeleteProduct.isConfirmed) {
                const id = btn.id
                await axios.delete(`/api/productos/${id}`);
                await Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El producto ha sido eliminado.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                location.reload();
            }
        } catch (error) {
            console.log(error);
            await Swal.fire({
                icon: 'error',
                title: 'No se pudo eliminar el producto',
                text: 'El producto se encuentra en una transacción en curso',
            });
        }

    });
});