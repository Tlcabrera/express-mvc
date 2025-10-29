

new DataTable('#table', {
    pageLength: 5, // Define la cantidad predeterminada de registros por página
    lengthMenu: [5, 10, 25, 50, 100], // Opciones disponibles para el usuario
    language: {
        search: 'Buscar',
        info: 'Página _PAGE_ de _PAGES_',
        infoEmpty: 'No hay información para paginar',
        emptyTable: 'No hay usuarios registrados aún',
        infoFiltered: '(filtered from _MAX_ total records)',
        lengthMenu: 'Mostrar _MENU_ registrospor página',
        zeroRecords: 'No hay resultados que coincidan'
    }
});

function deleteMessageUser(id, user = { name: "" }) {
    Swal.fire({
        title: 'Eliminar Usuario',
        text: `¿Estas seguro de eliminar al usuario ${user.name}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            requestDeleteUser(id)
        }
    })
}

function requestDeleteUser(id) {
    fetch(`/delete/usuarios/${id}`, {
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            Swal.fire("Usuario Eliminado de forma exitosa", "", "success").then((result) => {
                if (result.isConfirmed || result.isConfirmed == false) {
                    window.location.reload();
                }
            });
        } else {
            Swal.fire("Hubo un error al intentar eliminar el usuario!", "", "error");
        }
    }).catch(error => {
        Swal.fire("Hubo un error al intentar eliminar el usuario!", "", "error");
    });
}
const buttonFormRegisterUser = document.getElementById("btnRegisterUser");
buttonFormRegisterUser.addEventListener("click", validateFields)

function validateFields() {
    let numberErrors = 0
    const inputs = document.querySelectorAll("input");
    const selectRole = document.getElementById("role");
    inputs.forEach((input) => {
        if (!input.value) {
            console.log(`error-${input.id}`);
            
            document.getElementById(`error-${input.id}`).style.display = "inline";
        }
    })
    if (!selectRole.value) {
        document.getElementById("error-role").style.display = "inline";
        numberErrors += 1;
    }
    sendRequestRegisterUser(numberErrors)
}

function sendRequestRegisterUser(numberErrors) {
    if (numberErrors > 0) {
        Swal.fire("", "Algunos campos no se han completado correctamente. Por favor, revisa la información ingresada y vuelve a intentarlo", "error");
        return
    }
    const formRegister = document.getElementById("formRegisterUser")
    formRegister.submit()
}