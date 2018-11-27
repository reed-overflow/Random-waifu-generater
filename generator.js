const PI = 3.14159;
let wifeCounter = 0;

function startGenerator() {
    if (wifeCounter) {
        insertExWife(9);
    }
    generateBody();
    generateAge();
    generateHair();
    generateEyes();
    generateAttribute();
    generateCharacter();
    generateCup();
    generateSkin();
    wifeCounter++;
    updateCounterText();
    document.getElementById('findWaifu').disabled = "";
}

function generateCup() {
    randomData("cupsize", Cupsize_data);
}

function generateSkin() {
    randomData("skin", Object.keys(Skin_data));
}

function generateBody() {
    var height = normalDistribution(165, 5)
    height = Math.round(height);
    var text1 = document.getElementById("height");
    text1.innerHTML = height;
    var bmi = normalDistribution(20, 1);
    var weight = Math.round(bmi * (height / 100) * (height / 100));
    var text2 = document.getElementById("weight");
    text2.innerHTML = weight;
}

function generateAge() {
    var gH = Math.round(normalDistribution(20, 2));
    var text1 = document.getElementById("age");
    text1.innerHTML = gH;
}

function generateHair() {
    randomData("hairstyle", Object.keys(Hair_data));
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
    randomData("attribute", Attribute_data);
}

function generateCharacter() {
    randomData("character", Character_data);
}

function normalDistribution(u, v) {
    // Box-Muller
    var x1 = Math.random();
    var x2 = Math.random();
    var nD = Math.sqrt(-2 * Math.log(x1)) * Math.sin(2 * PI * x2) * v + u;
    return nD;
}

function randomRGB() {
    var rValue = Math.round(Math.random() * 255).toString(16);
    var gValue = Math.round(Math.random() * 255).toString(16);
    var bValue = Math.round(Math.random() * 255).toString(16);
    if (rValue.length < 2)
        rValue = "0" + rValue;
    if (gValue.length < 2)
        gValue = "0" + gValue;
    if (bValue.length < 2)
        bValue = "0" + bValue;
    return "#" + rValue + gValue + bValue;
}

function randomData(elementId, dataName) {
    var t1Num = Math.floor(Math.random() * dataName.length);
    var text1 = document.getElementById(elementId);
    text1.innerHTML = dataName[t1Num];
}
function insertExWife(cellCount) {
	let exWivesTable = document.getElementById("exWivesTable");
	let row = exWivesTable.insertRow(1);
	let wifeTable = document.getElementById("wifeTable");
	for (let i = 0; i <= cellCount; i++) {
	    let cell = row.insertCell(i);
	    cell.innerHTML = wifeTable.rows[i].cells[1].innerHTML;
	};
}
function updateCounterText() {
	let t = document.getElementById("wifeTable");
	t.caption.innerHTML = t.caption.innerHTML.replace(/\d+/, wifeCounter);
}
function findWaifu(hair, cup, skin) {
    let hairstyle = document.getElementById('hairstyle').innerText;
    let cupsize = document.getElementById('cupsize').innerText;
    let skincolor = document.getElementById('skin').innerText;
    let attribute = document.getElementById('attribute').innerText;
    let hairEng = Hair_data[hairstyle];
    let cupEng = Cupsize_map[cupsize];
    let skinEng = Skin_data[skincolor];
    let attrEng = Attribute_map[attribute];
    let qs = [hairEng, cupEng, skinEng, attrEng].filter(d => d).join('+');
    let url = 'https://chan.sankakucomplex.com/?tags=' + qs;
    window.open(url);
}