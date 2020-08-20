function p1Button1() {
    console.log("color: rgb(255, 255, 255)\nbackground-color: rgb(204, 37, 37)\nwidth: 100px\nheight: 40px");
}

function p1Button2() {
    console.log("color: rgb(204, 37, 37)\nbackground-color: rgb(255, 255, 255)\nwidth: 100px\nheight: 40px");
}

function p2() {
    var x = document.getElementById("counter").innerHTML;
    document.getElementById("counter").innerHTML = ++x;
}

var swapped = false;
function p3() {
    var classone = document.getElementsByClassName("ClassOne");
    var classtwo = document.getElementsByClassName("ClassTwo");

    if(swapped){
        classone[0].style.display = "block";
        classtwo[0].style.display = "none";
        swapped = false;
    } else {
        classtwo[0].style.display = "block";
        classone[0].style.display = "none";
        swapped = true;
    }
}

function p4NewAdd() {
    var strings = ["Doe, a deer, a female deer",
                    "Ray, a drop of golden sun",
                    "Me, a name I call myself",
                    "Far, a long, long way to run",
                    "Sew, a needle pulling thread",
                    "La, a note to follow Sew",
                    "Tea, a drink with jam and bread"];
    
    var ul = document.getElementById("dynamicList");
    ul.innerHTML += '<li>' + strings[Math.floor(Math.random()*7)] + ' <button class="deleting" onclick="p4Remove(this);">\tDelete</button> </li>'
}

function p4Remove(elementId) {
    elementId.parentNode.parentNode.removeChild(elementId.parentNode);
}
