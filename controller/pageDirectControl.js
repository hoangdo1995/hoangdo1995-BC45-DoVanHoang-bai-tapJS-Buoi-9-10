function goToAddEmployeePage(){
    var listNavLink = document.querySelectorAll('.nav-link');
    for (let i = 0; i < listNavLink.length; i++) {
        listNavLink[i].classList.remove('active');
    }
    document.querySelector('#v-pills-add-employee-tab').classList.add('active');


    var listTabPane = document.querySelectorAll('.tab-pane');
    for (let i = 0; i < listTabPane.length; i++) {
        listTabPane[i].classList.remove('active');
        listTabPane[i].classList.remove('show');
    }
    var tabAdd = document.querySelector('#v-pills-add-employee');
    tabAdd.classList.add('active');
    tabAdd.classList.add('show');
}

function goToHome(){
    var listNavLink = document.querySelectorAll('.nav-link');
    for (let i = 0; i < listNavLink.length; i++) {
        listNavLink[i].classList.remove('active');
    }
    document.querySelector('#v-pills-home-tab').classList.add('active');

    var listTabPane = document.querySelectorAll('.tab-pane');
    for (let i = 0; i < listTabPane.length; i++) {
        listTabPane[i].classList.remove('active');
        listTabPane[i].classList.remove('show');
    }
    var tabAdd = document.querySelector('#v-pills-home');
    tabAdd.classList.add('active');
    tabAdd.classList.add('show');
}

function goToManagerPage(){
    var listNavLink = document.querySelectorAll('.nav-link');
    for (let i = 0; i < listNavLink.length; i++) {
        listNavLink[i].classList.remove('active');
    }
    document.querySelector('#v-pills-add-employee-tab').classList.add('active');

    var listTabPane = document.querySelectorAll('.tab-pane');
    for (let i = 0; i < listTabPane.length; i++) {
        listTabPane[i].classList.remove('active');
        listTabPane[i].classList.remove('show');
    }
    var tabAdd = document.querySelector('#v-pills-manager');
    tabAdd.classList.add('active');
    tabAdd.classList.add('show');
}

function goToStatisticPage(event){
    var listNavLink = document.querySelectorAll('.nav-link');
    for (let i = 0; i < listNavLink.length; i++) {
        listNavLink[i].classList.remove('active');
    }
    document.querySelector('#v-pills-statistic-tab').classList.add('active');


    var listTabPane = document.querySelectorAll('.tab-pane');
    for (let i = 0; i < listTabPane.length; i++) {
        listTabPane[i].classList.remove('active');
        listTabPane[i].classList.remove('show');
    }
    var tabAdd = document.querySelector('#v-pills-statistic');
    tabAdd.classList.add('active');
    tabAdd.classList.add('show');
    
}