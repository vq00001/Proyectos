let answerP = document.querySelector("#answerP");
function showAnswer(){
    answerP.style.display = "block"; 
};
function hideAnswer(){
    answerP.style.display = "none"; 
};

function changeBackgroundColor(color){
    document.body.style.backgroundColor = color; 
};

let problem;
let answerNum;  
function answerAndProblem(){
    let selectionValue = document.getElementById("operationOptions").value;
    let digitsOne = document.getElementById("numberOfDigitsOne").value;
    let digitsTwo = document.getElementById("numberOfDigitsTwo").value;

    if(digitsOne.toString().length === 0 | digitsTwo.toString().length === 0){
        return;
    };

    if(digitsOne > 20 | digitsTwo > 20){
        alert("Please choose numbers up to 20.")
        return;
    };

    let firstNumber = Math.floor(Math.random()*Math.pow(10,digitsOne));
    let secondNumber = Math.floor(Math.random()*Math.pow(10,digitsTwo));
    
    while(firstNumber.toString().length < digitsOne | firstNumber === 0){
        firstNumber = Math.floor(Math.random()*Math.pow(10,digitsOne));
    };

    while(secondNumber.toString().length < digitsTwo | secondNumber === 0){
        secondNumber = Math.floor(Math.random()*Math.pow(10,digitsTwo));
    };
    
    function createAnswer(){
        answerNum
        switch(selectionValue){
            case "addition":
                answerNum  = firstNumber + secondNumber;
                break;
            case "subtraction":
                answerNum  = firstNumber - secondNumber;
                break;
            case "multiplication":
                answerNum  = firstNumber * secondNumber;
                break;
            case "division":
                answerNum  = firstNumber / secondNumber;
                break;
        };  

        document.getElementById("answerP").innerHTML = answerNum;
        
    };

    function createProblem(){
        let operator;
        switch(selectionValue){
            case "addition":
                operator  = "+";
                break;
            case "subtraction":
                operator  = "-";
                break;
            case "multiplication":
                operator  = "×";
                break;
            case "division":
                operator  = "÷";
                break;
        };  

        problem = firstNumber + operator + secondNumber;

        document.getElementById("problemP").innerHTML = problem;
    };
    createAnswer();
    createProblem();    
};

function displaySettings(){
    document.getElementById("menuDiv").style.display = "block";
};

function closeSettings(){
    document.getElementById("menuDiv").style.display = "none";
};

function checkAnswer(){
    setTimeout(() =>{
        let inputAnswer = document.getElementById("userAnswer").value; 

        let inputBox = document.getElementById("userAnswer");
        if(inputAnswer == answerNum){
            document.body.style.backgroundColor = "green";
            setTimeout(() => {
                inputBox.style.backgroundColor = "white";
            }, 3000)
        } else {
            document.body.style.backgroundColor = "red";
            setTimeout(() => {
                inputBox.style.backgroundColor = "white";
            }, 3000);
        }
    }, 1000)
};



function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
};

let timeOut;
let stop = false;
let timeS = "00:00";
let s = 0;
let m = 0;

function startTimer(){  
    s++;  
    if(s > 59){
        m++;
        s = 0;
    }
    if(s < 10){
        s = "0"+ s
    }
  
    if(m < 10){
        timeS = "0" + m + ":" + s; 
    } else if(m > 9){
        timeS = m + ":" + s;
    } 
    
    document.getElementById("timerP").innerHTML = timeS;

    if (stop) {
        let row = document.createElement("tr");

        let cellDate = document.createElement("td");
        let currentDate = new Date();
        let formattedDate = currentDate.getFullYear() + "-" + appendLeadingZeroes(currentDate.getMonth() + 1) + "-" + appendLeadingZeroes(currentDate.getDate()) + " " + appendLeadingZeroes(currentDate.getHours()) + ":" + appendLeadingZeroes(currentDate.getMinutes()) + ":" + appendLeadingZeroes(currentDate.getSeconds());
        let dateNode = document.createTextNode(formattedDate);       
        cellDate.append(dateNode);
        row.append(cellDate);
        
        function createCell(value){
            let cell = document.createElement("td");
            let textNode = document.createTextNode(value);
        
            cell.append(textNode);
         row.append(cell);
        }

        createCell(document.getElementById("operationOptions").value);
        createCell(document.getElementById("numberOfDigitsOne").value);
        createCell(document.getElementById("numberOfDigitsTwo").value);
        createCell(timeS);
        
        document.getElementById("recordTblBody").append(row); 
        
        
        return; 
    } else {
       timeOut = setTimeout(startTimer, 1000);  
    }
};

function stopTimer(){
    stop = true; 
};

function resetTime(){
    clearTimeout(timeOut);
    stop = false; 
    timeS = "00:00";
    s = 0;
    m = 0;
};

function exportToExcel(tableID, filename = ''){
    let downloadLink;
    let dataType = "application/vnd.ms-excel";
    let tableSelect = document.getElementById(tableID);
    let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    filename = filename? filename + 'xls' : 'excel_data.xls';

    downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        let blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);

    } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        downloadLink.download = filename;

        downloadLink.click();
    }
};





