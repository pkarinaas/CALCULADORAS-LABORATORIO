// Variable global para almacenar el resultado del primer formulario
let resultFromForm1;

// Seleccionar elementos del DOM el formulario, el contenedor del resultado y el botón de limpiar
const calculationFormClCr = document.getElementById('calculationFormClCr');
const resultValue1 = document.getElementById('resultValue1');
const clearButton1 = document.getElementById('clearButton1');

// Variable para rastrear si ya se realizó un cálculo
let calculationDoneForm1 = false;

// Función para manejar el envío del formulario
calculationFormClCr.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío estándar del formulario

    // Si el cálculo ya se realizó, activamos el botón "Limpiar"
    if (calculationDoneForm1) {
        clearForm1();
        return;
    }

    // Obtener los valores ingresados
    const creaUr = parseFloat(document.getElementById('creaUr').value);
    const creaPl = parseFloat(document.getElementById('creaPl').value);
    const diuresis = parseFloat(document.getElementById('diuresis').value);

    // Calcular Volumen minuto
    const volMin = diuresis / 1440;

    // Calcular Clearence de creainina
    const ClearenceCreati = creaUr / creaPl * volMin

    // Mostrar el resultado en la página
    resultValue1.textContent = `Clearence de Creatinina (mL/min)= ${ClearenceCreati.toFixed(2)}`;

    // Almacena el resultado en la variable global
    resultFromForm1 = ClearenceCreati;

    // Cambiar el estado a "cálculo realizado"
    calculationDoneForm1 = true;

    // Enfoca el primer campo del siguiente form
    document.getElementById('peso').focus();
});

// Función para limpiar el formulario
clearButton1.addEventListener('click', clearForm1);

// Función para limpiar el formulario y reiniciar el estado
function clearForm1() {
    calculationFormClCr.reset(); // Limpia el primer formulario
    resultValue1.textContent = 'Esperando datos...'; // Restablece el resultado
    document.getElementById('creaUr').focus(); // Enfoca el primer campo
}

// Seleccionar elementos del DOM el formulario, el contenedor del resultado y el botón de limpiar
const calculationFormClCrCorregido = document.getElementById('calculationFormClCrCorregido');
const resultValue2 = document.getElementById('resultValue2');
const clearButton2 = document.getElementById('clearButton2');

// Variable para rastrear si ya se realizó un cálculo
let calculationDoneForm2 = false;

// Función para manejar el envío del formulario
calculationFormClCrCorregido.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío estándar del formulario

    // Si el cálculo ya se realizó, activamos el botón "Limpiar"
    if (calculationDoneForm2) {
        clearForm2();
        return;
    }

    // Obtener los valores ingresados
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Calcular Superfice corporal
    const superficieCorporal = Math.sqrt(peso * altura / 3600);;

    // Calcular Clearence de creainina corregido
    const ClearenceCreatiCorregido = resultFromForm1 * 1.73 / superficieCorporal

    // Mostrar el resultado en la página
    resultValue2.textContent = `Clearence de Creatinina Corregido (mL/min)= ${ClearenceCreatiCorregido.toFixed(2)}`;

    // Cambiar el estado a "cálculo realizado"
    calculationDoneForm2 = true;

});

// Función para limpiar el formulario
clearButton2.addEventListener('click', clearForm2);

// Función para limpiar el formulario y reiniciar el estado
function clearForm2() {
    calculationFormClCrCorregido.reset(); // Limpia el segundo formulario
    resultValue2.textContent = 'Esperando datos...'; // Restablece el resultado
    calculationDoneForm2 = false;

    calculationFormClCr.reset(); // Limpia el primer formulario
    resultValue1.textContent = 'Esperando datos...'; // Restablece el resultado
    calculationDoneForm1 = false;

    // Establece el enfoque donde lo necesites (puedes elegir el formulario inicial)
    document.getElementById('creaUr').focus();
}


