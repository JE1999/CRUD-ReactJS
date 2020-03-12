import Swal from 'sweetalert2'

const alertDanger = () => {

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un problema!',
      })

}

export default alertDanger