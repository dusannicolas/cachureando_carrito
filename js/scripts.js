
/* Alerta de envío exitoso con función
let botonEnviarMje = document.getElementById("botonEnviarMje");

function confirmaEnvio(){
    alert("¡Tu mensaje ha sido enviado con éxito! Te responderemos a la brevedad.");
}

botonEnviarMje.addEventListener("click", confirmaEnvio);*/

// Anula envío si faltan campos usando validación de Bootstrap 5. No compatible con script anterior.
(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()