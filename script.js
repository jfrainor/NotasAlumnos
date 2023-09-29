 // Función para agregar un alumno a la tabla
function agregarAlumno() {
  const cedula = document.getElementById("cedula").value;
  const nombre = document.getElementById("nombre").value;
  const matematicas = parseFloat(document.getElementById("matematicas").value);
  const fisica = parseFloat(document.getElementById("fisica").value);
  const programacion = parseFloat(document.getElementById("programacion").value);

  const table = document.getElementById("alumnosTable");
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  cell1.innerHTML = cedula;
  cell2.innerHTML = nombre;
  cell3.innerHTML = matematicas;
  cell4.innerHTML = fisica;
  cell5.innerHTML = programacion;

  // Calcula y actualiza los resultados
  calcularResultados();
}

// Función para calcular los resultados
function calcularResultados() {
  const notas = [];
  const table = document.getElementById("alumnosTable");
  const rows = table.getElementsByTagName("tr");

  // Itera a través de las filas para recoger las notas
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    const matematicas = parseFloat(cells[2].innerHTML);
    const fisica = parseFloat(cells[3].innerHTML);
    const programacion = parseFloat(cells[4].innerHTML);
    notas.push({ matematicas, fisica, programacion });
  }

  // Calcula el promedio, aprobados, aplazados y máxima nota para cada materia
  const promedioMatematicas = calcularPromedio(notas, "matematicas");
  const promedioFisica = calcularPromedio(notas, "fisica");
  const promedioProgramacion = calcularPromedio(notas, "programacion");
  const aprobadosMatematicas = contarAprobados(notas, "matematicas");
  const aprobadosFisica = contarAprobados(notas, "fisica");
  const aprobadosProgramacion = contarAprobados(notas, "programacion");
  const aplazadosMatematicas = contarAplazados(notas, "matematicas");
  const aplazadosFisica = contarAplazados(notas, "fisica");
  const aplazadosProgramacion = contarAplazados(notas, "programacion");
  const maximaMatematicas = calcularMaxima(notas, "matematicas");
  const maximaFisica = calcularMaxima(notas, "fisica");
  const maximaProgramacion = calcularMaxima(notas, "programacion");

  // Actualiza los resultados en la tabla de resultados
  document.getElementById("promedioMatematicas").textContent = promedioMatematicas.toFixed(2);
  document.getElementById("aprobadosMatematicas").textContent = aprobadosMatematicas;
  document.getElementById("aplazadosMatematicas").textContent = aplazadosMatematicas;
  document.getElementById("maximaMatematicas").textContent = maximaMatematicas.toFixed(2);

  document.getElementById("promedioFisica").textContent = promedioFisica.toFixed(2);
  document.getElementById("aprobadosFisica").textContent = aprobadosFisica;
  document.getElementById("aplazadosFisica").textContent = aplazadosFisica;
  document.getElementById("maximaFisica").textContent = maximaFisica.toFixed(2);

  document.getElementById("promedioProgramacion").textContent = promedioProgramacion.toFixed(2);
  document.getElementById("aprobadosProgramacion").textContent = aprobadosProgramacion;
  document.getElementById("aplazadosProgramacion").textContent = aplazadosProgramacion;
  document.getElementById("maximaProgramacion").textContent = maximaProgramacion.toFixed(2);

  // Calcula el promedio, aprobados, aplazados y máxima nota en todas las materias
  const promedioTotal = (promedioMatematicas + promedioFisica + promedioProgramacion) / 3;
  const aprobadosTotal = contarAprobadosTotales(notas);
  const aplazadosTotal = contarAplazadosTotales(notas);
  const maximaTotal = Math.max(maximaMatematicas, maximaFisica, maximaProgramacion);

  // Actualiza los resultados en la tabla de resultados totales
  document.getElementById("promedioTotal").textContent = promedioTotal.toFixed(2);
  document.getElementById("aprobadosTotal").textContent = aprobadosTotal;
  document.getElementById("aplazadosTotal").textContent = aplazadosTotal;
  document.getElementById("maximaTotal").textContent = maximaTotal.toFixed(2);
}

// Función para calcular el promedio de una materia
function calcularPromedio(notas, materia) {
  const sum = notas.reduce((total, nota) => total + nota[materia], 0);
  return sum / notas.length;
}

// Función para contar el número de aprobados en una materia
function contarAprobados(notas, materia) {
  return notas.filter(nota => nota[materia] >= 10).length;
}

// Función para contar el número de aplazados en una materia
function contarAplazados(notas, materia) {
  return notas.filter(nota => nota[materia] < 10).length;
}

// Función para calcular la máxima nota en una materia
function calcularMaxima(notas, materia) {
  return Math.max(...notas.map(nota => nota[materia]));
}

// Función para contar el número de alumnos que aprobaron todas las materias
function contarAprobadosTotales(notas) {
  return notas.filter(nota => nota.matematicas >= 10 && nota.fisica >= 10 && nota.programacion >= 10).length;
}

// Agrega el evento de envío del formulario para agregar alumnos
document.getElementById("alumnoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  agregarAlumno();
});
