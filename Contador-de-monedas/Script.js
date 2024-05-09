
function addOne(place){
    let x = place.value;
    x = x*1;
    place.value = x + 1; 
};

function highlightCoin(place){
    place.style.backgroundColor = "#aaffc2"; 
    setTimeout(() => {place.style.backgroundColor = "white"}, 500);
};

function addCoinsByKeyboard(event){
    switch(event.key){
        case "q": 
            addOne(document.getElementById("moneda-10"));
            highlightCoin(document.getElementById("moneda-10"));
        break;
        case "w": 
            addOne(document.getElementById("moneda-50")); 
            highlightCoin(document.getElementById("moneda-50")); 
        break;
        case "e": 
            addOne(document.getElementById("moneda-100")); 
            highlightCoin(document.getElementById("moneda-100")); 
        break;
        case "r": 
            addOne(document.getElementById("moneda-500")); 
            highlightCoin(document.getElementById("moneda-500")); 
        break;


        case "a": 
            addOne(document.getElementById("billete-mil")); 
            highlightCoin(document.getElementById("billete-mil")); 
        break;
        case "s": 
            addOne(document.getElementById("billete-dos-mil")); 
            highlightCoin(document.getElementById("billete-dos-mil")); 
        break;
        case "d": 
            addOne(document.getElementById("billete-cinco-mil")); 
            highlightCoin(document.getElementById("billete-cinco-mil")); 
        break;
        case "f": 
            addOne(document.getElementById("billete-diez-mil")); 
            highlightCoin(document.getElementById("billete-diez-mil")); 
        break;
        case "g": 
            addOne(document.getElementById("billete-veinte-mil"));
            highlightCoin(document.getElementById("billete-veinte-mil"));
        break;
    }
};

window.addEventListener("keydown", addCoinsByKeyboard);

let table = document.createElement("table");
table.setAttribute("id", "tablaExcel")
let totalCount;

let exportDiv = document.getElementById("export-table-div")
function makeRows(place, optional,  name, amount){
    let row = document.createElement("tr");

    function makeTextNodeCells(text){
        let cellText = document.createTextNode(text);
        let cell = document.createElement("td");
        cell.appendChild(cellText);
        row.appendChild(cell);
    }

    makeTextNodeCells(optional);
    makeTextNodeCells(name); 
    

    if(optional === "Total"){
        makeTextNodeCells("")
        makeTextNodeCells(totalCount)
    }else{
        makeTextNodeCells(place.value);
        makeTextNodeCells(place.value * amount);
    }

    totalCount += place.value * amount; 
    table.appendChild(row);
}

function crearTablaCursos(){
    totalCount = 0; 
    let titleRow = document.createElement("tr"); 

    let titleRowCurso = document.createElement("th"); 
    let cursoText = document.createTextNode(document.getElementById("selector-grado").value + " " + document.getElementById("selector-paralelo").value);
    titleRowCurso.appendChild(cursoText); 

    let titleRowMonedasBilletes = document.createElement("th"); 
    let monedasBilletesText = document.createTextNode("Monedas/Billetes");
    titleRowMonedasBilletes.appendChild(monedasBilletesText); 

    let titleRowCantidad = document.createElement("th"); 
    let cantidadText = document.createTextNode("Cantidad");
    titleRowCantidad.appendChild(cantidadText); 

    let titleRowTotal = document.createElement("th"); 
    let totalText = document.createTextNode("Total");
    titleRowTotal.appendChild(totalText); 

    titleRow.appendChild(titleRowCurso);
    titleRow.appendChild(titleRowMonedasBilletes);
    titleRow.appendChild(titleRowCantidad);
    titleRow.appendChild(titleRowTotal);

    table.appendChild(titleRow);

    makeRows(document.getElementById("moneda-10"), "Monedas", "10 pesos", 10);
    makeRows(document.getElementById("moneda-50"), "", "50 pesos", 50);
    makeRows(document.getElementById("moneda-100"), "", "100 pesos", 100);
    makeRows(document.getElementById("moneda-500"), "", "500 pesos", 500);

    makeRows(document.getElementById("billete-mil"), "Billetes", "1.000 pesos", 1000);
    makeRows(document.getElementById("billete-dos-mil"), "", "2.000 pesos", 2000);
    makeRows(document.getElementById("billete-cinco-mil"), "", "5.000 pesos", 5000);
    makeRows(document.getElementById("billete-diez-mil"), "", "10.000 pesos", 10000);
    makeRows(document.getElementById("billete-veinte-mil"), "", "20.000 pesos", 20000);
    
    makeRows("", "Total", "", 1);
    
    exportDiv.appendChild(table);
};

function eraseValues(){
    document.getElementById("moneda-10").value = 0; 
    document.getElementById("moneda-50").value = 0; 
    document.getElementById("moneda-100").value = 0; 
    document.getElementById("moneda-500").value = 0; 
    
    document.getElementById("billete-mil").value = 0; 
    document.getElementById("billete-dos-mil").value = 0; 
    document.getElementById("billete-cinco-mil").value = 0; 
    document.getElementById("billete-diez-mil").value = 0; 
    document.getElementById("billete-veinte-mil").value = 0; 
}

function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}