let passwordField=document.querySelector("#password");
let lengthField=document.querySelector("#length");
let slider=document.querySelector("[slide]");
let ucase=document.querySelector("#uppercase");
let lcase=document.querySelector("#lowercase");
let num=document.querySelector("#number");
let symbol=document.querySelector("#symbol");
let btn=document.querySelector(".btn");
let copyTool=document.querySelector(".toolkit");
let copyIcon=document.querySelector(".pcopy");
let checksArr=document.querySelectorAll(".checkboxes");
let symbolArr="!@#$%&*?+-*/"

let password="";
let passwordLength=10;
let checks=0;
sliderfun();

function sliderfun(){
    slider.value=passwordLength;
    lengthField.innerText=passwordLength;

}
async function copyText(){
    try{
        await navigator.clipboard.writeText(passwordField.value);
        copyTool.innerText="copied";
    }
    catch{
        copyTool.innerText="failed";
    }
    copyTool.classList.add("active");
        setTimeout(() => {
            copyTool.classList.remove('active');
        },3000)
}

function rdmInteger(min,max){
    let no=Math.floor(Math.random()*(max-min)+min);
    return no;
}
function getNumber(){
    return rdmInteger(1,9);
}
function getLowerCase(){

    return String.fromCharCode(rdmInteger(97,122));
}
function getUpperCase(){
    return String.fromCharCode(rdmInteger(65,90));
}
function getSymbol(){
    let index=rdmInteger(0,12);
    return symbolArr[index];
}

function countCheck(){
    checks=0;
    if(ucase.checked)
    checks++;
    if(lcase.checked)
    checks++;
    if(num.checked)
    checks++;
    if(symbol.checked)
    checks++;

    // special case
    if(passwordLength<checks){
        passwordLength=checks;
        sliderfun();
    }
}
slider.addEventListener("input",(event)=>{
    passwordLength=event.target.value;
    sliderfun();
})
copyIcon.addEventListener("click",copyText);

ucase.addEventListener('change',countCheck);
lcase.addEventListener('change',countCheck);
num.addEventListener('change',countCheck);
symbol.addEventListener('change',countCheck);

btn.addEventListener('click',()=>{
    password="";
    if(checks==0)
    return;
    // if(ucase.checked)
    // password+=getUpperCase();
    // if(lcase.checked)
    // password+=getLowerCase();
    // if(num.checked)
    // password+=getNumber();
    // if(symbol.checked)
    // password+=getSymbol();

    let checkFunc=[];
    if(ucase.checked)
    checkFunc.push(getUpperCase);
    if(lcase.checked)
    checkFunc.push(getLowerCase);
    if(num.checked)
    checkFunc.push(getNumber);
    if(symbol.checked)
    checkFunc.push(getSymbol);

    for(let i=0;i<checkFunc.length;i++){
        password+=checkFunc[i]();
    }

    for(let i=0;i<passwordLength-checkFunc.length;i++){
        let ind=rdmInteger(0,checkFunc.length);
        password+=checkFunc[ind]();
    }
    passwordField.value=password;

})
















