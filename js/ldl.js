// Seleccionar elementos del DOM el formulario, el contenedor del resultado y el botón de limpiar
const calculationForm = document.getElementById('calculationForm');
const resultValue = document.getElementById('resultValue');
const clearButton = document.getElementById('clearButton');

// Variable para rastrear si ya se realizó un cálculo
let calculationDone = false;

// Función para manejar el envío del formulario
calculationForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío estándar del formulario

    // Si el cálculo ya se realizó, activamos el botón "Limpiar"
    if (calculationDone) {
        clearForm();
        return;
    }

    // Rangos de las columnas (colesterol no HDL)
    const nonHDLColRanges = [99, 129, 159, 189, 219, 2000]; // Valores límites de los rangos de las columnas

    // Rangos de las filas (trigli)
    const trigliRowRanges = [49, 56, 61, 66, 71, 75, 79, 83, 87, 92, 96,
         100, 105, 110, 115, 120, 126, 132, 138, 146, 154, 163, 173, 185, 201,
         220, 247, 292, 399, 13975]; // Valores límites de los rangos de las filas

    // Matriz de valores para el factor (fact)
    const factMatrix = [
        [3.5, 3.4, 3.3, 3.3, 3.2, 3.1],
        [4.0, 3.9, 3.7, 3.6, 3.6, 3.4],
        [4.3, 4.1, 4.0, 3.9, 3.8, 3.6],
        [4.5, 4.3, 4.1, 4.0, 3.9, 3.9],
        [4.7, 4.4, 4.3, 4.2, 4.1, 3.9],
        [4.8, 4.6, 4.4, 4.2, 4.2, 4.1],
        [4.9, 4.6, 4.5, 4.3, 4.3, 4.2],
        [5.0, 4.8, 4.6, 4.4, 4.3, 4.2],
        [5.1, 4.8, 4.6, 4.5, 4.4, 4.3],
        [5.2, 4.9, 4.7, 4.6, 4.4, 4.3],
        [5.3, 5.0, 4.8, 4.7, 4.5, 4.4],
        [5.4, 5.1, 4.8, 4.7, 4.5, 4.3],
        [5.5, 5.2, 5.0, 4.7, 4.6, 4.5],
        [5.6, 5.3, 5.0, 4.8, 4.6, 4.5],
        [5.7, 5.4, 5.1, 4.9, 4.7, 4.5],
        [5.8, 5.5, 5.2, 5.0, 4.8, 4.6],
        [6.0, 5.5, 5.3, 5.0, 4.8, 4.6],
        [6.1, 5.7, 5.3, 5.1, 4.9, 4.7],
        [6.2, 5.8, 5.4, 5.2, 5.0, 4.7],
        [6.3, 5.9, 5.6, 5.3, 5.0, 4.8],
        [6.5, 6.0, 5.7, 5.4, 5.1, 4.8],
        [6.7, 6.2, 5.8, 5.4, 5.2, 4.9],
        [6.8, 6.3, 5.9, 5.5, 5.3, 5.0],
        [7.0, 6.5, 6.0, 5.7, 5.4, 5.1],
        [7.3, 6.7, 6.2, 5.8, 5.5, 5.2],
        [7.6, 6.9, 6.4, 6.0, 5.6, 5.3],
        [8.0, 7.2, 6.6, 6.2, 5.9, 5.4],
        [8.5, 7.6, 7.0, 6.5, 6.1, 5.6],
        [9.5, 8.3, 7.5, 7.0, 6.5, 5.9],
        [11.9, 10.0, 8.8, 8.1, 7.5, 6.7]
    ];
    
    // Funcion para determinar en que rango se encuentra un valor
    function findRangeIndex(value, ranges) {
        for (let i = 0; i < ranges.length; i++) {
            if (value <= ranges[i]) {
                return i; // Devuelve el índice del rango correspondiente
            }
        }
        return ranges.length - 1; // Si el valor es mayor que todos los rangos, devuelve el último índice
    }
    
    // Obtener los valores ingresados
    const colTotal = parseFloat(document.getElementById('colTotal').value);
    const trigli = parseFloat(document.getElementById('trigli').value);
    const HDL = parseFloat(document.getElementById('HDL').value);

    // Calcular colesterol no HDL
    const nonHDL = colTotal - HDL;

    // Determinar la posición en la matriz
    const colIndex = findRangeIndex(nonHDL, nonHDLColRanges); // Índice de la columna
    const rowIndex = findRangeIndex(trigli, trigliRowRanges); // Índice de la fila

    // Obtener el valor del factor desde la matriz
    const fact = factMatrix[rowIndex][colIndex];

    // Calcular LDL usando la fórmula
    const LDL = colTotal - (trigli / fact) - HDL;

    // Mostrar el resultado en la página
    resultValue.textContent = `LDL= ${LDL.toFixed(2)}`;

    // Cambiar el estado a "cálculo realizado"
    calculationDone = true;
});

// Función para limpiar el formulario
clearButton.addEventListener('click', clearForm);

// Función para limpiar el formulario y reiniciar el estado
function clearForm() {
    calculationForm.reset(); // Resetear los valores del formulario
    resultValue.textContent = 'Esperando datos...'; // Restablecer el resultado
    calculationDone = false; // Reiniciar el estado
    document.getElementById('colTotal').focus();
}