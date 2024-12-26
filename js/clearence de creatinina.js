// Seleccionar elementos del DOM el formulario, el contenedor del resultado y el botón de limpiar
const calculationFormClCr = document.getElementById('calculationFormClCr');
const resultValue = document.getElementById('resultValue');
const clearButton = document.getElementById('clearButton');

// Variable para rastrear si ya se realizó un cálculo
let calculationDone = false;

// Función para manejar el envío del formulario
calculationFormClCr.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío estándar del formulario

    // Si el cálculo ya se realizó, activamos el botón "Limpiar"
    if (calculationDone) {
        clearForm();
        return;
    }

    // Obtener los valores ingresados
    const creaUr = parseFloat(document.getElementById('creaUr').value);
    const creaPl = parseFloat(document.getElementById('creaPl').value);
    const diuresis = parseFloat(document.getElementById('diuresis').value);

    // Calcular Volumen minuto
    const volMin = diuresis / 1440;

    // Calcular Clearence de creainina

    const ClrearenceCreati = creaUr / creaPl * volMin

    // Mostrar el resultado en la página
    resultValue.textContent = `Clearence de Creatinina = ${ClrearenceCreati.toFixed(2)}`;

    // Cambiar el estado a "cálculo realizado"
    calculationDone = true;

});

// Función para limpiar el formulario
clearButton.addEventListener('click', clearForm);

// Función para limpiar el formulario y reiniciar el estado
function clearForm() {
    calculationFormClCr.reset(); // Resetear los valores del formulario
    resultValue.textContent = 'Esperando datos...'; // Restablecer el resultado
    calculationDone = false; // Reiniciar el estado
    document.getElementById('creaUr').focus();
}