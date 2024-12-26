// Seleccionar elementos del DOM el formulario, el contenedor del resultado y el botón de limpiar
const calculationFormClUr = document.getElementById('calculationFormClUr');
const resultValue = document.getElementById('resultValue');
const clearButton = document.getElementById('clearButton');

// Variable para rastrear si ya se realizó un cálculo
let calculationDone = false;

// Función para manejar el envío del formulario
calculationFormClUr.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío estándar del formulario

    // Si el cálculo ya se realizó, activamos el botón "Limpiar"
    if (calculationDone) {
        clearForm();
        return;
    }

    // Obtener los valores ingresados
    const ureaUr = parseFloat(document.getElementById('ureaUr').value);
    const ureaPl = parseFloat(document.getElementById('ureaPl').value);
    const diuresis = parseFloat(document.getElementById('diuresis').value);

    // Calcular Volumen minuto
    const volMin = diuresis / 1440;

    // Calcular Clearence de creainina

    const ClrearenceUrea = ureaUr / ureaPl * volMin

    // Mostrar el resultado en la página
    resultValue.textContent = `Clearence de Urea (mL/min)= ${ClrearenceUrea.toFixed(2)}`;

    // Cambiar el estado a "cálculo realizado"
    calculationDone = true;

});

// Función para limpiar el formulario
clearButton.addEventListener('click', clearForm);

// Función para limpiar el formulario y reiniciar el estado
function clearForm() {
    calculationFormClUr.reset(); // Resetear los valores del formulario
    resultValue.textContent = 'Esperando datos...'; // Restablecer el resultado
    calculationDone = false; // Reiniciar el estado
    document.getElementById('ureaUr').focus();
}