let registros = [];

function agregarRegistro() {
    const clave = document.getElementById("clave").value;
    const fechaIngreso = document.getElementById("fechaIngreso").value;
    const fechaEgreso = document.getElementById("fechaEgreso").value;
    const tipo = document.getElementById("tipo").value;

    registros.push({ clave, fechaIngreso, fechaEgreso, tipo });
    mostrarRegistros();
}

function mostrarRegistros() {
    const tabla = document.getElementById("registroTabla");
    tabla.innerHTML = "";
    registros.forEach(registro => {
        const fila = `<tr>
            <td>${registro.clave}</td>
            <td>${registro.fechaIngreso}</td>
            <td>${registro.fechaEgreso || "N/A"}</td>
            <td>${registro.tipo === "1" ? "Activo" : "Licencia"}</td>
        </tr>`;
        tabla.innerHTML += fila;
    });
}

async function calcularAntiguedad() {
    const response = await fetch('/CalculadoraAntiguedadServlet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registros)
    });
    const data = await response.json();
    document.getElementById("resultadoTexto").innerText = `Activo: ${data.activo} - Licencia: ${data.licencia}`;
}
