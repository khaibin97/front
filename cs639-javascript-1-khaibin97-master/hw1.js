
function p1() {
  console.log("Hello World!")
}

function p2() {
    console.log(document.getElementById("p2readme").innerHTML)
}

function p3() {
    var object = document.getElementsByClassName("p3editme")
    for(i = 0; i < object.length; i++){
        object[i].innerHTML = "I was changed!";
    }
}

function p4() {
    var object = document.getElementsByClassName("p4editme")
    for(i = 0; i < object.length; i++){
        if(object[i].innerHTML == "Z"){
            object[i].innerHTML = "A";
        } else {
            object[i].innerHTML = String.fromCharCode(object[i].innerHTML.charCodeAt(0) + 1);
        }
        
    }
}

function p5() {
    var input = document.getElementById("p5input").value;
    document.getElementById("p5editme").innerHTML = input;
}

var dirty = false;
function p6() {
    var temp = document.createElement("div");
    var node1 = document.getElementById("p6btn1");
    var node2 = document.getElementById("p6btn2");
    node1.parentNode.insertBefore(temp, node1);
    node2.parentNode.insertBefore(node1, node2);
    temp.parentNode.insertBefore(node2, temp);
    temp.parentNode.removeChild(temp);
    if(!dirty){
        node1.textContent = "Button 6-2";
        node2.textContent = "Button 6-1";
        dirty = true;
    } else {
        node1.textContent = "Button 6-1";
        node2.textContent = "Button 6-2";
        dirty = false;
    }
}


function p7() {
    document.getElementById("p7table").setAttribute("style", 
    "background-color:#f7f7f7; text-align: center; width:100%; box-shadow: 0 4px 8px 0 #d7dbde; border-collapse: collapse;");
    document.querySelector("header").setAttribute("style", "background-color:#d0d5d9;");

    var tableElements = document.querySelectorAll("tr, th, td");
    for(x in tableElements){
        console.log(tableElements[x].tagName)
        if(tableElements[x].tagName === "TH"){
            tableElements[x].setAttribute("style", "border-bottom: 1px solid #ddd; padding: 15px");
        }
        if(tableElements[x].tagName === "TD"){
            tableElements[x].setAttribute("style", "border-bottom: 1px solid #ddd; padding: 15px");
        }
        if(tableElements[x].tagName === "TR"){
            tableElements[x].setAttribute("style", "color: #3f4245;");
        }
    }
    
}
