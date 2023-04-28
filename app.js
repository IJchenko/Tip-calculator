const inputHandlerCount = e => {
    e.value = e.value.replace(/[^\d.]/g,"");
    e.value = e.value.replace(/^\./g,"");
    e.value = e.value.replace(/\.{2,}/g,"");
    e.value = e.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    document.querySelector(".sector_input-amount").classList.remove("error-input");
    document.querySelector(".input-amount").classList.remove("error-input");
}
const inputHandlerPeople = e => {
    e.value = e.value.replace(/^\.|\D/g,"");
    document.querySelector(".sector_input-number-of-people").classList.remove("error-input");
    document.querySelector(".input-number-of-people").classList.remove("error-input");
}
const inputHandlerPercent = e =>{
    e.value = e.value.replace(/^\.|\D/g, "");
    e.value = e.value.replace(/\d{5}/g, "");
    document.querySelector(".button-custom-input").classList.remove("error-input");
}
const buttons = document.querySelectorAll(".grid-item");
buttons.forEach(function (item){
    item.addEventListener('click', activeButton)
})
function activeButton(){
    buttons.forEach(function (item){
        item.classList.remove("grid-item--active");
    })
    this.classList.add("grid-item--active");
    document.querySelector(".button-custom-input").value = "";
}
document.querySelector('.button_reset').addEventListener('click',calculate);
function calculate(){
    let bill = document.querySelector(".input-amount").value;
    if(bill==0){
        document.querySelector(".sector_input-amount").classList.add("error-input");
        document.querySelector(".input-amount").classList.add("error-input");
        return;
    }
    let people = document.querySelector(".input-number-of-people").value;
    if(people==0){
        document.querySelector(".sector_input-number-of-people").classList.add("error-input");
        document.querySelector(".input-number-of-people").classList.add("error-input");
        return;
    }
    let percent = document.querySelector(".grid-item--active").innerText.slice(0,-1);
    let custom_percent = document.querySelector(".button-custom-input").value;

    if(percent==""){
        if(custom_percent==""){
            console.log("empty");
            document.querySelector(".button-custom-input").classList.add("error-input");
            return;
        }
        else if(custom_percent==0){
            console.log(0);
            document.querySelector(".button-custom-input").classList.add("error-input");
            return;
        }
        else {
            percent = custom_percent;
        }
    }

    let amount = bill + "*" + "(" + percent + "/100)";
    let total = bill + "+" + amount;

    let total_person = eval(total + "/" + people);
    let tip_amount = eval("(" + bill + "*" + "(" + percent + "/100)" + ")" + "/" + people);

    document.querySelector(".result_tip-amount").textContent = "$"+( Math.floor( tip_amount * 100 ) / 100 );
    document.querySelector(".result_total-person").textContent = "$"+( Math.floor( total_person * 100 ) / 100 );
}
// bill = 142,55
// tip = 15%
// number = 5
// bill * tip = 142.55 * (15/100) = 21,3825
// total = 163,9325
// total(person) = total / peoples = 32,7865
// tip amount = (bill * tip) / number = 21,3825 / 5 = 4,2765