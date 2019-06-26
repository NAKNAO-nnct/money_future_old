

document.getElementById("body").onchange = function () {
    display_money();
}

document.getElementById("body").onload = function () {
    display_money();
}

function display_money() {
    var balance = parseInt(document.getElementById("balance").innerHTML);
    // var out_money = document.getElementsByClassName("out_money");
    // var in_money = document.getElementsByClassName("in_money");
    var money = document.getElementsByClassName("money");
    var sum = document.getElementsByClassName("sum");
    for (let i = 0; i < document.getElementsByClassName("budget").length; i++) {
        sum[i].innerHTML = balance + parseInt(money[i].innerHTML);
        balance += parseInt(money[i].innerHTML);
        // sum[i].parentElement;
    }
}

// 反映
function check_button(button) {
    console.log(button.parentNode.parentNode.parentNode.parentNode.style[0] == "opacity");
    if (button.parentNode.parentNode.parentNode.parentNode.style[0] == "opacity") {
        button.parentNode.parentNode.parentNode.parentNode.style = "";
    }
    else {
        button.parentNode.parentNode.parentNode.parentNode.style = "opacity: 0.3;";
    }


}
// var check_button = document.getElementsByClassName("check-botton");
// for (let i = 0; i < check_button.length; i++) {
//     check_button[i].onclick = function () {
//         this.classList.toggle("is-outlined");
//     }
// }

// delete
function delete_card() {

}

// vue
new Vue({
    el: "#app",
    data: {
        items: [
            {
                name: '家を買う', money: '-100', date: '2019/06/19', type: 'out'
            },
            {
                name: 'BD買う', money: '-2000', date: '2019/03/09', type: 'out'
            },
            {
                name: '初田家買収', money: '-30', date: '2019/09/12', type: 'out'
            },
            {
                name: 'Apple売却', money: '30000', date: '2019/11/12', type: 'in'
            }
        ]
    }
});