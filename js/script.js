// vue
var vue_cons = [0];

// storage
var database_key = "money_future";
var user_data = {
    items: [
        {
            id: 1, name: '家を買う', money: '-100', date: '2019/06/19', type: 'out'
        },
        {
            id: 2, name: 'BD買う', money: '-2000', date: '2019/03/09', type: 'out'
        },
        {
            id: 3, name: '初田家買収', money: '-30', date: '2019/09/12', type: 'out'
        },
        {
            id: 4, name: 'Apple売却', money: '30000', date: '2019/11/12', type: 'in'
        }
    ],
    have: {
        balance: 500
    }
};

window.onchange = function(){
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
    
    button.parentNode.parentNode.parentNode.classList.toggle("card-disable");
}
// var check_button = document.getElementsByClassName("check-botton");
// for (let i = 0; i < check_button.length; i++) {
//     check_button[i].onclick = function () {
//         this.classList.toggle("is-outlined");
//     }
// }

// Web storage
// init
(function init_db(){
    // localstorageにデータがなければデータを挿入
    if(localStorage[database_key] != undefined){
        user_data = JSON.parse(localStorage[database_key]);
    }else{
        localStorage[database_key] = JSON.stringify(user_data);
    }
    console.log(user_data);
    // vue
    vue_cons[0] = new Vue({
        el: "#app",
        data: user_data,
        methods: {
            update: function(){
                this.$forceUpdate();
                display_money();
            }
        },
    });


    vue_cons[1] = new Vue({
        el: '#balance_area',
        data: user_data,
        methods: {
            update: function () {
                const balance = parseInt(document.getElementById("balance_money").value);
                if(!isNaN(balance)){
                    user_data["have"].balance = balance;
                    this.$forceUpdate();
                    display_money();
                }
            }
        }
    })
    display_money();
}());

// insert
function insert_db(insert_data){}

// get
function get_data(){
    console.log(localStorage[database_key]);
};

// delete
function delete_data(id) {
    var n;
    for(let i=0; i<user_data["items"].length; i++){
        if(user_data["items"][i]["id"] == id){
            delete user_data["items"][i];
            n = i;
        }
    }
    
    user_data["items"] = user_data["items"].filter(n => n !== 1);
    console.log(user_data["items"]);
    vue_cons[0].update();
}

// 強制初期化
function forcibly_initializing(){
    localStorage.clear();
    vue_cons[0].update();
}

