let expression = "";

const result = document.getElementById("result");
const history = document.getElementById("history");

function append(value){
    expression += value;
    result.innerText = expression;
}

function clearDisplay(){
    expression = "";
    history.innerText = "";
    result.innerText = "0";
}

function backspace(){
    expression = expression.slice(0,-1);
    result.innerText = expression || "0";
}

function calculate(){

    try{

        history.innerText = expression;

        let answer = eval(expression);

        if(!isFinite(answer)){
            result.innerText = "Error";
            return;
        }

        result.innerText =
        Number(answer).toLocaleString("en-US",{
            maximumFractionDigits:10
        });

        saveHistory(
            expression + " = " + answer
        );

        expression = answer.toString();

    }
    catch{
        result.innerText = "Error";
    }
}

function square(){

    try{
        expression =
        (eval(expression)**2).toString();

        result.innerText = expression;
    }
    catch{}
}

function cube(){

    try{
        expression =
        (eval(expression)**3).toString();

        result.innerText = expression;
    }
    catch{}
}

function sqrt(){

    try{
        expression =
        Math.sqrt(eval(expression))
        .toString();

        result.innerText = expression;
    }
    catch{}
}

function sin(){

    try{
        expression =
        Math.sin(eval(expression)
        * Math.PI/180)
        .toString();

        result.innerText = expression;
    }
    catch{}
}

function cos(){

    try{
        expression =
        Math.cos(eval(expression)
        * Math.PI/180)
        .toString();

        result.innerText = expression;
    }
    catch{}
}

function tan(){

    try{
        expression =
        Math.tan(eval(expression)
        * Math.PI/180)
        .toString();

        result.innerText = expression;
    }
    catch{}
}

function saveHistory(item){

    let historyData =
    JSON.parse(
        localStorage.getItem("history")
    ) || [];

    historyData.unshift(item);

    if(historyData.length > 10){
        historyData.pop();
    }

    localStorage.setItem(
        "history",
        JSON.stringify(historyData)
    );
}

document.addEventListener("keydown",e=>{

    if(
        !isNaN(e.key) ||
        ['+','-','*','/','.','(',')']
        .includes(e.key)
    ){
        append(e.key);
    }

    if(e.key==="Enter"){
        calculate();
    }

    if(e.key==="Backspace"){
        backspace();
    }

    if(e.key==="Escape"){
        clearDisplay();
    }
});

function toggleTheme(){
    document.body.classList.toggle("light-mode");
}