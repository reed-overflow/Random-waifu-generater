
function startGenerater() {
    generateBody();
    generateAge();
    generateHair();
}

function generateBody() {
    var height = Math.round(Math.random()*40)+140;
    var text1=document.getElementById("height");
    text1.innerHTML=height;
    var bmi = (Math.random()*6)+18;
    var weight = Math.round(bmi*(height/100)*(height/100));
    var text2=document.getElementById("weight");
    text2.innerHTML=weight;
}

function generateAge() {
    var gH = Math.round(Math.random()*26)+14;
    var text1=document.getElementById("age");
    text1.innerHTML=gH;    
}

function generateHair() {
    var t1Num = Math.floor(Math.random()*HairData.styleCount);
    var text1=document.getElementById("hairstyle");
    text1.innerHTML=HairData.style[t1Num];
    var t2Num = Math.floor(Math.random()*ColorData.colorCount);
    var text2=document.getElementById("hairColor");
    text2.innerHTML=ColorData.color[t2Num];
}

function generate() {
    
}