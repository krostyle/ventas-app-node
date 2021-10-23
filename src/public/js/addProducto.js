const btn_agregar = document.querySelector('.btn-agregar');
btn_agregar.addEventListener('click', async(e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    const data = {
        nombre,
        precio,
        cantidad
    };
    try {
        const confirmAddProduct = await Swal.fire({
            title: '¿Estas seguro de agregar este producto?',
            text: `Nombre: ${nombre} \nPrecio: ${precio} \nCantidad: ${cantidad}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, agregar!',
            cancelButtonText: 'Cancelar'
        });
        if (confirmAddProduct.isConfirmed) {
            const res = await axios.post(`/api/productos/add/nuevoProducto`, data);
            await Swal.fire({
                title: 'Producto agregado',
                text: 'El producto se ha agregado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            window.location.href = '/api/productos';
        }
    } catch (error) {
        await Swal.fire({
            title: 'Error',
            text: 'No se pudo agregar el producto',
            icon: 'error'
        });
    }
});