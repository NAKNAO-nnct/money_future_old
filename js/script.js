// vue
var vue_cons = [0];

// storage
var database_key = "money_future";
var user_data = {
    items: [
        {
            id: 1, name: '家を買う', money: '-100', date: '2019/06/19', type: 'out', memo: ''
        },
        {
            id: 2, name: 'BD買う', money: '-2000', date: '2019/03/09', type: 'out', memo: ''
        },
        {
            id: 3, name: '初田家買収', money: '-30', date: '2019/09/12', type: 'out', memo: ''
        },
        {
            id: 4, name: 'Apple売却', money: '30000', date: '2019/11/12', type: 'in', memo: ''
        },
        {
            id: 5, name: 'MS購入', money: '-20000', date: '2019/12/04', type: 'out', memo: ''
        }
    ],
    have: {
        balance: 500
    }
};

// 画面に変更が加わるごとに表示金額計算と並び順を保存
window.onchange = function () { reload(); }

function reload() {
    // window.location.reload();
    // display_money();
    setTimeout("get_card_order()", 5000);
    // get_card_order();


    vue_cons[0].update();
}

// window.onmousemove = function () {
//     console.warn("==========================");
//     for (let i = 0; i < 4; i++) {
//         // user_data.items[i] = _user_data.items[cards[i].value];
//         console.log(user_data.items[i].name);
//     }
// }

// カード並び順を取得
function get_card_order() {
    var cards = document.getElementsByClassName("plans");
    var tmp_user_data = new Array();

    // var user_data = JSON.parse(localStorage[database_key]);
    get_data();

    for (let i = 0; i < cards.length; i++) {
        tmp_user_data[i] = new Object();
        user_data.items.forEach(function (item) {
            if (cards[i].value == item.id) {
                tmp_user_data[i] = Object.assign({}, item);
            }
        })
    }
    user_data.items = new Array();
    console.log(tmp_user_data);
    user_data.items = tmp_user_data.slice();
    console.log(user_data);

    insert_db();
}

// 予算表示
function display_money() {
    var balance = parseInt(document.getElementById("balance").innerHTML);
    // var out_money = document.getElementsByClassName("out_money");
    // var in_money = document.getElementsByClassName("in_money");
    var money = document.getElementsByClassName("money");
    var sum = document.getElementsByClassName("sum");
    for (let i = 0; i < document.getElementsByClassName("budget").length; i++) {
        sum[i].innerHTML = balance + parseInt(money[i].innerHTML);
        balance += parseInt(money[i].innerHTML);
    }
}

// 反映
function check_button(button) {
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
(function init_db() {
    // localstorageにデータがなければデータを挿入
    if (localStorage[database_key] != undefined) {
        get_data();
    } else {
        localStorage[database_key] = JSON.stringify(user_data);
    }
    console.log(user_data);
    // vue
    vue_cons[0] = new Vue({
        el: "#app",
        data: user_data,
        methods: {
            update: function () {
                this.$forceUpdate();
                display_money();
            }
        }
    });

    vue_cons[1] = new Vue({
        el: '#balance_area',
        data: user_data,
        methods: {
            update: function () {
                const balance = parseInt(document.getElementById("balance_money").value);
                if (!isNaN(balance)) {
                    user_data["have"].balance = balance;
                    this.$forceUpdate();
                    display_money();
                }
            }
        }
    })
    display_money();

    Sortable.create(app, {
        handle: '.my-handle',
        animation: 1000
    });

}());

// insert
function insert_db() {
    localStorage[database_key] = JSON.stringify(user_data);
}

// get
function get_data() {
    // console.log(localStorage[database_key]);
    user_data = JSON.parse(localStorage[database_key]);
};

// delete
function delete_data(id) {
    var n;
    for (let i = 0; i < user_data["items"].length; i++) {
        if (user_data["items"][i]["id"] == id) {
            delete user_data["items"][i];
            n = i;
        }
    }
    user_data["items"] = user_data["items"].filter(n => n !== 1);
    insert_db();

    // setTimeout("vue_cons[0].update()", 800);
}

// 強制初期化
function forcibly_initializing() {
    localStorage.clear();
    vue_cons[0].update();
    location.reload();
}

// modle画面のOn/off
function modal_open(modal_name){
    document.getElementById(modal_name).classList.toggle("is-active");
}



// var btn = document.getElementsByClassName("button");
// for (let i = 0; i < btn.length; i++) {
//     btn[i].onclick = function () {
//         alert("fff");
//     }
// }