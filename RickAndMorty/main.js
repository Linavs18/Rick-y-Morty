$(document).ready(function(){
    $.ajax({
        url: "https://rickandmortyapi.com/api/character",
        type: "GET",
        dataType: "json",
        success: function(data){
        let filas = "";
        data.results.forEach(p => {
            filas += `
            <tr>
                <td class="text-center">${p.name}</td>
                <td class="text-center">${p.species}</td>
                <td class="text-center">${p.status}</td>
                <td class="text-center">
                <button class="btn btn-success verDetalles" data-id="${p.id}">
                    <i class="bi bi-eye-fill"></i>
                </button>
                </td>
            </tr>`;
        });
        $("#tablaPersonajes tbody").html(filas);
        $("#tablaPersonajes").DataTable();
        }
    });
});

$(document).on("click",".verDetalles",function(){
    const id = $(this).data("id");
    $.ajax({
        url: `https://rickandmortyapi.com/api/character/${id}`,
        type: "GET",
        dataType: "json",
        success: function(p){
            const contenido = `
                <img src="${p.image}" alt="${p.name}" class="img-fluid rounded mb-3">
                <p><strong>Especie:</strong> ${p.species}</p>
                <p><strong>Estado:</strong> ${p.status}</p>
                <p><strong>Origen:</strong> ${p.origin.name}</p>
                <p><strong>Ubicación:</strong> ${p.location.name}</p>
                <p><strong>Tipo:</strong> ${p.type || "No especificado"}</p>
            `;
            $("#modalPersonaje .modal-title").text(p.name);
            $("#modalPersonaje .modal-body").html(contenido);

            const modal = new bootstrap.Modal(document.getElementById('modalPersonaje'));
            modal.show();
        }
    });
});