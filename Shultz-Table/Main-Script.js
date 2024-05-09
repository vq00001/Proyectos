function generateTable(){
    let sqNum = document.getElementById("selectCellNumber").value;
    if(document.getElementById("shultzTable") !== null){
        document.getElementById("shultzTable").remove()
    }

    let table = document.createElement("table");
    let tblBody = document.createElement("tbody");


    let cellNumber;
    let positionArrNum = [];
    let sortedArr;

    function pickArrNum(){
        let numList = [];
        for(i = 1; i < sqNum + 1; i++){
            numList.push(i);
        };
       
        let arrPosition = Math.floor(Math.random()*sqNum);
        cellNumber = numList[arrPosition];
        // console.log("arrPosition: " + arrPosition);    

        let criteria;
        
        if(positionArrNum.filter(num => num === 0).length > 0 && arrPosition === 0){
            criteria = true;  
        } else if(positionArrNum.find(num => num === arrPosition)){
            criteria = true;
        } else {
            criteria = false;
        };
        
        

        // console.log("Criteria before: " + criteria);

        for(;criteria;){
            arrPosition = Math.floor(Math.random()* sqNum);
            if(positionArrNum.filter(num => num === 0).length > 0 && arrPosition === 0){
                criteria = true;  
            } else if(positionArrNum.find(num => num === arrPosition)){
                criteria = true;
            } else {
                criteria = false;
            };            
        };
        cellNumber = numList[arrPosition];
        // console.log("cellNumber: " + cellNumber);
        // console.log("Criteria after: " + criteria);
        positionArrNum.push(arrPosition);
        // console.log("positionArrNum: " + positionArrNum)
        // console.log("--------------------------")

        sortedArr = positionArrNum.sort(function(a, b) {
            return a - b;
          });
        
    }
    for(a = 0; a < Math.sqrt(sqNum); a++){
       let row = document.createElement("tr");

       for(b = 0; b < Math.sqrt(sqNum); b++){
           let cell = document.createElement("td");
           pickArrNum();
           
           let cellText = document.createTextNode(cellNumber);
           cell.appendChild(cellText);
           row.appendChild(cell);
           cellText = "";
       }

       tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
    document.getElementById("tblDiv").appendChild(table);
    // console.log(sortedArr);
    table.setAttribute("id", "shultzTable");
    
    changeFontSize(document.getElementById("fontSize").value);
    changeTablecolor(document.getElementById("shultzTblColor").value);
    changeTableSize(document.getElementById("tblSizeInput").value);
}
function showMenu(){
    document.getElementById("menuDiv").style.display = "block"; 
};
function hideMenu(){
    document.getElementById("menuDiv").style.display = "none"; 
};
function changeFontSize(size){
    document.getElementById("shultzTable").style.fontSize = size + "px"; 
};
function changeBackGcolor(color){
    document.body.style.backgroundColor = color; 
};
function changeTablecolor(color){
    document.getElementById("shultzTable").style.backgroundColor = color;
};

function changeTableSize(size){
    document.getElementById("shultzTable").style.height = size + "px";
    document.getElementById("shultzTable").style.width = size + "px";
};
