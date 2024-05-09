function adnToStuff() {
    console.log("Script2")
    let userInput = document.getElementById("theAdn").value; // 
    console.log(userInput);

    let regex = /[^a-zA-Z ]/g; // match for non letter characters
    if(userInput.match(regex) === null || userInput.length < 3){ 
    
        let dnaStr = userInput.replaceAll(/ */gi, ""); // clean spaces?    
        dnaStr = dnaStr.toUpperCase();

        let replaceChar = {"A":"U", "T":"A", "C":"G", "G":"C"};  // for replacing each letter with its reciprocate
        let rnaStr = dnaStr.replace(/[ATGC]/gi, m => replaceChar[m]); // the equivalent to the rna messenger used 
        
    
        let rna3ChunkArray = []; 
    
        while (rnaStr) {

            rna3ChunkArray.push(rnaStr.substr(0, 3));
            rnaStr = rnaStr.substr(3);
            /*if (rnaStr.length < 3) {
                rna3ChunkArray.push(rnaStr);
                break;
            }
            else {
                
            }*/
        };
        
        console.log(rna3ChunkArray);
        let aminoacid = []; 
    
        function matchAminoacid(arr){
            switch(arr[0]){
                case "U":
                    switch(arr[1]){
                        case "U": 
                            if(arr[2] === "U" | "C"){
                                aminoacid.push("Phe");
                            }else{
                                aminoacid.push("Leu");
                            };                
                        break;
                        case "C":
                            aminoacid.push("Ser");                       
                        break;
                        case "A":
                            if(arr[2] === "U" | "C"){
                                aminoacid.push("Tyr");
                            }else{aminoacid.push("Stop")};
                        break;
                        case "G":
                            if(arr[2] === "U" | "C"){
                                aminoacid.push("Cys");
                            }else if (arr[2] === "A"){
                                aminoacid.push("Stop"); 
                            } else {
                                aminoacid.push("Try");
                            };
                        break;  
                    };
                break;                   
                case "C":
                    switch(arr[1]){
                        case "U":
                            aminoacid.push("Leu");                
                        break;
                        case "C":
                            aminoacid.push("Pro");
                        break;
                        case "A":
                            if(arr[2] === "U" | "C"){
                                aminoacid.push("His")
                            }else{
                                aminoacid.push("Gln")
                            };
                        break;
                        case "G":
                            aminoacid.push("Arg")
                        break;
                    }
                break;
    
                case "A":
                    switch(arr[1]){
                        case "U": 
                            if(arr[2] === "G"){
                                aminoacid.push("Met");
                            }else{
                                aminoacid.push("Iso");
                            };                
                        break;
                        case "C":
                            aminoacid.push("Thr");
                        break;
                        case "A":
                            if(arr[2] === "U" | "C"){
                                aminoacid.push("Asn");
                            }else{
                                aminoacid.push("Lys")
                            };
                        break;
                        case "G":
                            if(arr[2] === "U" | "C"){
                                aminoacid.push("Ser");
                        }else{
                            aminoacid.push("Arg")
                        };
                        break;
                    }
                break;
    
                case "G": 
                switch(arr[1]){
                    case "U": 
                        aminoacid.push("Val");         
                    break;
                    case "C":
                        aminoacid.push("Ala");
                    break;
                    case "A":
                        if(arr[2] === "U" | "C"){
                            aminoacid.push("Asp");
                        }else{
                            aminoacid.push("Glu");
                        };
                    break;
                    case "G":
                         aminoacid.push("Gly");
                    break;
                }
                break;
            };
        }; 
    
        rna3ChunkArray.forEach(matchAminoacid); 
        let formattedAminoacidStr = aminoacid.join(", ") + "."; 
        
        let para = document.createElement("p");
        let node = document.createTextNode(formattedAminoacidStr);
        para.appendChild(node); 
        let element = document.getElementById("divOne");
        element.appendChild(para);
        
        //console.log("Composición de la proteína: " + formattedAminoacidStr + ".");
        // document.getElementById("AdnDiv").appendChild(formattedAminoacidStr);
        
    } else {
        alert("number or non-letter character found"); 
    }        
}     

function erase(){
    let div = document.getElementById("divOne");
    let matches = div.querySelectorAll("p");
    matches.forEach(x => x.remove());
}