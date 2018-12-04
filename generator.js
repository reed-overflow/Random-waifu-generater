const PI = Math.PI;
let wifeCounter = 0;
let wifeProps = [];
let storage = false;

$(document).ready(function () {
    initWifeProps();
    createExWivesTableHeader();
    try {
        storage = window.localStorage;
        retriveWives();
    } catch (error) {
        if (!storage) {
            alert("你正在使用隐身模式，或没有开启浏览器的LocalStorage功能，无法储存和读取你的老婆:P");
            $("#removeWivesBtn")[0].setAttribute("disabled", "");
        }
    }
});

function initWifeProps() {
    let rows = $("#wifeTable")[0].rows;
    for (let i = 0; i < rows.length; i++) {
        wifeProps.push(rows[i].cells[0].innerHTML);
    }
};

function createExWivesTableHeader() {
    let exWivesTableHeader = document.getElementById("exWivesTable").insertRow(0);
    wifeProps.forEach((prop, i) => {
        let cell = exWivesTableHeader.insertCell(i);
        cell.innerHTML = prop;
    });
}

function startGenerator() {
    insertExWife();
    generateBody();
    // generateAge();
    generateHair();
    generateEyes();
    generateAttribute();
    generateCharacter();
    generateCup();
    generateSkin();
    saveWives();
}

function generateCup() {
    randomData("cupsize",Cupsize_data);
}

function generateSkin() {
    randomData("skin",Skin_data);
}

function generateBody() {
    var height = normalDistribution(165, 5)
    height = Math.round(height);
    var text1 = document.getElementById("height");
    text1.innerHTML=height;
    var bmi = normalDistribution(20, 1);
    var weight = Math.round(bmi*(height/100)*(height/100));
    var text2 = document.getElementById("weight");
    text2.innerHTML = weight;
}
function generateAge() {
    var gH = Math.round(normalDistribution(20, 2));
    var text1 = document.getElementById("age");
    text1.innerHTML = gH;    
}
function generateHair() {
    randomData("hairstyle",Hair_data);
    var newColor = randomRGB();
    var text2 = document.getElementById("hairColor");
    text2.innerHTML = newColor;
    text2.style.backgroundColor = newColor;
}
function generateEyes() {
    var text1 = document.getElementById("eyeColor");
    var newColor = randomRGB();
    text1.innerHTML = newColor;
    text1.style.backgroundColor = newColor;
}
function generateAttribute() {
    randomData("attribute",Attribute_data);
}
function generateCharacter() {  
    randomData("character",Character_data);
}

function normalDistribution(u, v) {
    // Box-Muller
    var x1 = Math.random();
    var x2 = Math.random();
    var nD = Math.sqrt(-2*Math.log(x1))*Math.sin(2*PI*x2)*v+u;
    return nD;
}
function randomRGB() {
    var rValue = Math.round(Math.random()*255).toString(16);
    var gValue = Math.round(Math.random()*255).toString(16);
    var bValue = Math.round(Math.random()*255).toString(16);
    if(rValue.length <2)
        rValue = "0" + rValue;
    if(gValue.length <2)
        gValue = "0" + gValue;
    if(bValue.length <2)
        bValue = "0" + bValue;                
    return "#"+rValue+gValue+bValue;
}
function randomData(elementId,dataName) {
    var t1Num = Math.floor(Math.random()*dataName.length);
    var text1 = document.getElementById(elementId);
    text1.innerHTML = dataName[t1Num];    
}
function getCurrentWife() {
    let wifeTable = document.getElementById("wifeTable");
    let rows = wifeTable.rows;
    let propertyCount = wifeTable.rows.length;
    let wife = {};
    for (let i = 0; i < propertyCount; i++) {
        wife[rows[i].cells[0].innerHTML] = rows[i].cells[1].innerHTML;
    }
    return wife;
}
function insertExWife() {
    if(wifeCounter) {
        let exWife = getCurrentWife();
        insertExWifeToTable(exWife);
    }
    else {
        wifeCounter++;
        updateCounterText();
    }
}
function insertExWifeToTable(exWife) {
    let exWivesTable = document.getElementById("exWivesTable");
    let row = exWivesTable.insertRow(1);
    let propertyCount = wifeProps.length;

    
    wifeProps.forEach((prop,i) => {
        let cell = row.insertCell(i);
        cell.innerHTML = exWife[prop];
        if (exWife[prop].match(/#[\da-f]{6}/)) {
            cell.style.backgroundColor = exWife[prop];
        }
    });
    wifeCounter++;
    updateCounterText();
}
function updateCounterText() {
    let t = document.getElementById("wifeTable");
    t.caption.innerHTML = t.caption.innerHTML.replace(/\d+/, wifeCounter);
}
function saveWives() {
    if (!storage) {
        return;
    }
    let exWivesTable = $("#exWivesTable")[0];
    let wives = [];

    for (let i = 1; i < exWivesTable.rows.length; i++) {
        let row = exWivesTable.rows[i];
        let wife = {};
        wifeProps.forEach((element, i) => {
            wife[element] = row.cells[i].innerHTML
        });
        wives.push(wife);
    }
    storage.setItem("exwives", JSON.stringify(wives));
    let currWife = getCurrentWife();
    storage.setItem("currWife", JSON.stringify(currWife));
}
function retriveWives() {
    if (!storage) {
        return;
    }
    let exWives = JSON.parse(storage.getItem("exwives"));
    if (exWives) {
        exWives.reverse();
        exWives.forEach(wife => {
            insertExWifeToTable(wife);
        });
    }
    let currWife = JSON.parse(storage.getItem("currWife"));
    if (currWife) {
        setCurrWife(currWife);
        wifeCounter++;
        updateCounterText();
    }
}
function setCurrWife(currWife) {
    let table = $("#wifeTable")[0];
    wifeProps.forEach((prop, i) => {
        let cell = table.rows[i].cells[1]
        cell.innerHTML = currWife[prop];
        if (currWife[prop].match(/#[\da-f]{6}/)) {
            cell.style.backgroundColor = currWife[prop];
        }
    });
}
function onKillWivesPressed() {
    if (wifeCounter) {
        if (confirm("你确定要清除所有老婆吗？")) {
            killAllWives();
        }
    } else {
        alert("醒醒，你还没有老婆");
    }
}
function killAllWives() {
    storage.clear();
    let exWivesTable = $("#exWivesTable")[0];
    for (let i = exWivesTable.rows.length - 1; i > 0; i--) {
        exWivesTable.deleteRow(i);
    }
    let wifeTable = $("#wifeTable")[0];
    for (let i = 0; i < wifeTable.rows.length; i++) {
        wifeTable.rows[i].cells[1].innerHTML = "--";
        wifeTable.rows[i].cells[1].removeAttribute("style");
    }
    wifeCounter = 0;
    updateCounterText();
}