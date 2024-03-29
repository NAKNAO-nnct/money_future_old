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

    setTimeout("get_card_order()", 2000);

    // setTimeout("vue_cons[0].update()", 2000);
    vue_cons[0].$forceUpdate();
}

// カード並び順を取得
function get_card_order() {

    // vue_cons[0].$destroy();
    var cards = document.getElementsByClassName("id-card plans");
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
    user_data.items = tmp_user_data.slice();

    insert_db();
    display_money();
}

// 予算表示
function display_money() {
    var balance = parseInt(document.getElementById("balance").innerHTML);
    // var out_money = document.getElementsByClassName("out_money");
    // var in_money = document.getElementsByClassName("in_money");
    var money = document.getElementsByClassName("money");
    var sum = document.getElementsByClassName("sum");
    j = 0;
    for (let i = 0; i < document.getElementsByClassName("budget").length; i++) {
        sum[i].innerHTML = balance + parseInt(money[j].innerHTML);
        balance += parseInt(money[j].innerHTML);
        j += 2;
    }

    setTimeout("vue_cons[0].$forceUpdate()", 1000);
}

// 詳細表示
function details(btn) {
    btn.parentNode.parentNode.children[2].classList.toggle("plans");
}

// 反映
function check_button(btn) {
    btn.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.toggle("card-disable");
}

// Web storage
// init
(function init_db() {
    // localstorageにデータがなければデータを挿入
    if (localStorage[database_key] != undefined) {
        get_data();
    } else {
        localStorage[database_key] = JSON.stringify(user_data);
    }

    // vue
    vue_cons[0] = new Vue({
        el: "#app",
        data: user_data,
        methods: {
            update_list: function () {
                get_data();
                this.$nextTick(() => {
                    this.$forceUpdate();
                })
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
                    vue_cons[1].$forceUpdate();
                    display_money();
                }
            }
        }
    })
    display_money();
    Vue.component('todo-item', {
        template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
        props: ['title']
    })

    new Vue({
        el: '#todo-list-example',
        data: {
            newTodoText: '',
            addNewMoney: '',
            todos: [
                {
                    id: 1, title: '家を買う', money: '-100', date: '2019/06/19', type: 'out', memo: '', isChecked: true
                },
                {
                    id: 2, title: 'BD買う', money: '-2000', date: '2019/03/09', type: 'out', memo: '', isChecked: true
                },
                {
                    id: 3, title: '初田家買収', money: '-30', date: '2019/09/12', type: 'out', memo: '', isChecked: true
                },
                {
                    id: 4, title: 'Apple売却', money: '30000', date: '2019/11/12', type: 'in', memo: '', isChecked: true
                },
                {
                    id: 5, title: 'MS購入', money: '-20000', date: '2019/12/04', type: 'out', memo: '', isChecked: true
                }
            ],
            nextTodoId: 4
        },
        methods: {
            addNewTodo: function () {
                this.todos.push({
                    id: this.nextTodoId++,
                    title: this.newTodoText,
                    money: this.todos
                })
                this.newTodoText = '';
                console.log(this.todos);
            }
        }
    })
    // let body = document.getElementById('todo-list-example');
    Sortable.create(apps, {
        handle: '.my-handle',
        animation: 400
    });

    // var accordions = bulmaExtensions.bulmaAccordion.attach();

}());

// insert
function insert_db() {
    localStorage[database_key] = JSON.stringify(user_data);
}

// get
function get_data() {
    user_data = JSON.parse(localStorage[database_key]);
};

// delete
function delete_data(id) {
    modal_open('warning-modal');
    var n;
    for (let i = 0; i < user_data["items"].length; i++) {
        if (user_data["items"][i]["id"] == id) {
            delete user_data["items"][i];
            n = i;
        }
    }

    user_data["items"] = user_data["items"].filter(n => n !== 1);
    insert_db();

    vue_cons[0].$forceUpdate();
}

// 強制初期化
function forcibly_initializing() {
    localStorage.clear();
    window.location.reload();
}

// modle画面のOn/off
function modal_open(modal_name, id) {
    document.getElementById(modal_name).classList.toggle("is-active");
    if (id != null) {
        document.getElementById(modal_name).children[1].children[0].children[1].children[0].onclick = function () { delete_data(id) };
    }
}

// 予算の追加
function add_plans() { }

function a() {
    // get_data();
    // user_data.items[1].name = "ぼけてよ";
    // insert_db();
    // setTimeout("vue_cons[0].$forceUpdate()", 1000);
    vue_cons[0].$destroy();
}

// var btn = document.getElementsByClassName("button");
// for (let i = 0; i < btn.length; i++) {
//     btn[i].onclick = function () {
//         alert("fff");
//     }
// }

