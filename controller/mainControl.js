var arrNhanVien = [];

//reder danh sách nhân viên khi load web
getDataStorage();
renderNhanVien();

// Nhập nhân viên mới
document.querySelector('#btnAddNhanVien').onclick = function(event){
    event.preventDefault();

    var listCV = document.querySelector('#position').children;

    //Lấy giá trị index select của chức vụ để kiêm tra nhập liệu
    var positionIndexSelect = -1;
    for(let i = 0; i < listCV.length; i++){
        if(listCV[i].selected){
            positionIndexSelect = i;
            break;
        }
    }

    //nhập giá trị người dùng nhập vào input
    var nv = getInputNhanVien();

    // validate dử liệu
    var valid = (nullValidate(nv.account,'account')?(accountValidate(nv.account,'account')?repeatAccountValidate(nv.account,'account'):false):false)&(nullValidate(nv.name,'name')?nameValidate(nv.name,'name'):false)&(nullValidate(nv.email,'email')?emailValidate(nv.email,'email'):false)&(nullValidate(nv.password,'password')?passwordValidate(nv.password,'password'):false)&nullValidate(nv.workDay,'day-work')&(nullValidate(nv.salary,'base-salary')?baseSalaryValidate(nv.salary,'base-salary'):false)&nullValidate(positionIndexSelect,'position')&(nullValidate(nv.timesMonth,'times-month')?timesMonthValidate(nv.timesMonth,'times-month'):false);

    if(!valid){
        return;
    }

    //lấy mảng nhân viên từ storage và lưu nhân viên mới vào sau đó lưu lại vào storage
    getDataStorage();
    arrNhanVien.push(nv);
    saveStorage();

    // render lại danh sách nhân viên và clear trường nhập liệu
    renderNhanVien();
    clearInput();

}

document.querySelector('#btnEditEmployee').onclick = function(){
    event.preventDefault();
    var listCV = document.querySelector('#position').children;
    //Lấy giá trị index select của chức vụ để kiêm tra nhập liệu
    var positionIndexSelect = -1;
    for(let i = 0; i < listCV.length; i++){
        if(listCV[i].selected){
            positionIndexSelect = i;
            break;
        }
    }
    //nhập giá trị người dùng nhập vào input
    var nv = getInputNhanVien();
    // validate dử liệu
    var valid = (nullValidate(nv.account,'account')?accountValidate(nv.account,'account'):false)&(nullValidate(nv.name,'name')?nameValidate(nv.name,'name'):false)&(nullValidate(nv.email,'email')?emailValidate(nv.email,'email'):false)&(nullValidate(nv.password,'password')?passwordValidate(nv.password,'password'):false)&nullValidate(nv.workDay,'day-work')&(nullValidate(nv.salary,'base-salary')?baseSalaryValidate(nv.salary,'base-salary'):false)&nullValidate(positionIndexSelect,'position')&(nullValidate(nv.timesMonth,'times-month')?timesMonthValidate(nv.timesMonth,'times-month'):false);

    if(!valid){
        return;
    }
    var indexEdit = getIndexNhanVienByAccount(nv.account);
    //lấy mảng nhân viên từ storage và lưu nhân viên mới vào sau đó lưu lại vào storage
    getDataStorage();
    arrNhanVien.splice(indexEdit,1,nv);
    saveStorage();
    // render lại danh sách nhân viên và clear trường nhập liệu
    renderNhanVien();
    clearInput();
    //điều hướng giao diện
    goToManagerPage();
    document.querySelector('#btnAddNhanVien').disabled = false;
    document.querySelector('#btnEditEmployee').disabled = true;
    document.querySelector('#account').disabled = false;
    document.querySelector('#account').style.background = 'rgba(255, 255, 255, 0.61)';
}

document.querySelector('#positionSearch').onchange = function(){
    getDataStorage();
    
    var arrSoSanh = [];
    var arr = [];
    if(document.querySelector('#rankSearch').selectedIndex!==0){
        arrSoSanh = getEmployeesByRank(arrNhanVien,document.querySelector('#rankSearch')[document.querySelector('#rankSearch').selectedIndex].innerHTML);
    }
    else{
        arrSoSanh = arrNhanVien;
    }
    if(this.selectedIndex !== 0){
        arr = getEmployeesByPosition(arrSoSanh,this.children[this.selectedIndex].innerHTML);
        renderNhanVienToUser(arr,'#tableNhanVienSearch');
        
    }else{
        renderNhanVienToUser(arrSoSanh,'#tableNhanVienSearch');
    }
}
document.querySelector('#rankSearch').onchange = function(){
    getDataStorage();
    var arrSoSanh = [];
    var arr = [];
    if(document.querySelector('#positionSearch').selectedIndex!==0){
        arrSoSanh = getEmployeesByPosition(arrNhanVien,document.querySelector('#positionSearch')[document.querySelector('#positionSearch').selectedIndex].innerHTML);
    }
    else{
        arrSoSanh = arrNhanVien;
    }
    if(this.selectedIndex !== 0){
        arr = getEmployeesByRank(arrSoSanh,this.children[this.selectedIndex].innerHTML);
        renderNhanVienToUser(arr,'#tableNhanVienSearch');
    }else{
        renderNhanVienToUser(arrSoSanh,'#tableNhanVienSearch');
    }
}

function renderNhanVien(){
    document.querySelector('#tableDanhSach').innerHTML ='';
    var strRender = '';
    for (let i = 0; i < arrNhanVien.length; i++) {
        var nvTempt = new nhanVien();
        nvTempt = Object.assign(nvTempt,arrNhanVien[i]);

        strRender += `
            <tr>
                <td>${nvTempt.account}</td>
                <td>${nvTempt.name}</td>
                <td>${nvTempt.email}</td>
                <td>${nvTempt.workDay}</td>
                <td>${nvTempt.position}</td>
                <td>${nvTempt.earn()}</td>
                <td>${nvTempt.rank()}</td>
                <td><button class='btn btn-warning' onclick = 'suaNhanVien("${nvTempt.account}")'>Sửa</button></td>
                <td><button class='btn btn-danger' onclick = 'xoaNhanVien("${nvTempt.account}")'>xóa</button></td>
            </tr>
        `;
    }

    document.querySelector('#tableDanhSach').innerHTML = strRender;
}

function renderNhanVienToUser(arr,target){
    document.querySelector(target).innerHTML ='';
    var strRender = '';
    for (let i = 0; i < arr.length; i++) {
        var nvTempt = new nhanVien();
        nvTempt = Object.assign(nvTempt,arrNhanVien[i]);
        var nvTempt = arr[i];
        strRender += `
            <tr>
                <td>${nvTempt.account}</td>
                <td>${nvTempt.name}</td>
                <td>${nvTempt.email}</td>
                <td>${nvTempt.workDay}</td>
                <td>${nvTempt.position}</td>
                <td>${nvTempt.earn()}</td>
                <td>${nvTempt.rank()}</td>
            </tr>
        `;
    }

    document.querySelector(target).innerHTML = strRender;
}


/**
 * Hàm xử lý lưu dư liệu vào storage của trình duyệt
 */
function saveStorage() {
    var sArrNhanVien = JSON.stringify(arrNhanVien); //Biến đổi arrSinhVien => chuổi
    localStorage.setItem('arrNhanVien', sArrNhanVien);
}

/**
 * Hàm xử lý lấy dư liệu ra từ storage của trình duyệt
 */
function getDataStorage() {
    if (localStorage.getItem('arrNhanVien')) {
        var stringArrNhanVien = localStorage.getItem('arrNhanVien');
        arrNhanVien = JSON.parse(stringArrNhanVien);
        console.log(arrNhanVien);
    }
}

/**
 * hàm xóa nhân viên khỏi arrNhanViên dựa vào account của nhân viên
 * @param {*} accountClick account của nhân viên cần xóa
 */
function xoaNhanVien(accountClick){
    let index = -1;
    for (let i = 0; i < arrNhanVien.length; i++) {
        if(arrNhanVien[i].account == accountClick){
            index = i;
            break;
        }
    }
    if(index !== -1){
        arrNhanVien.splice(index,1);
        console.log('index xoa',index);
        renderNhanVien();
        saveStorage();
    }   
}


/**
 * hàm xử hiển thị nội dung của trang chỉnh sưa nhân viên
 * @param {*} accountClick 
 */
function suaNhanVien(accountClick){
    goToAddEmployeePage();
    document.querySelector('#btnAddNhanVien').disabled = true;
    document.querySelector('#btnEditEmployee').disabled = false;

    //xóa các alert nhập liệu nếu có
    let listAlert = document.querySelectorAll('#tbInput p.color-danger');
    for (let i = 0; i < listAlert.length; i++) {
        listAlert[i].innerHTML = '';
    }

    var nvEdit = getNhanVienByAccount(accountClick);
    
    nvEdit = assignNhanVien(nvEdit);

    //Hien thi nhan vien edit
    document.querySelector('#account').value = nvEdit.account;
    document.querySelector('#account').disabled = true;
    document.querySelector('#account').style.background = '#FFD1B8';
    document.querySelector('#name').value = nvEdit.name;
    document.querySelector('#password').value = nvEdit.password;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#day-work').value = nvEdit.workDay;
    document.querySelector('#base-salary').value = nvEdit.salary;
    //lấy chức vụ
    var listCV = document.querySelector('#position').children;
    for (let i = 0; i < listCV.length; i++) {
        if(listCV[i].innerHTML === nvEdit.position){
            listCV[i].selected = true;
        }
    }
    document.querySelector('#times-month').value = nvEdit.timesMonth;
}


/**
 * hàm làm trống các trường nhập liệu trong bảng nhập nhân viên
 */
function clearInput(){
    document.querySelector('#account').value = '';
    document.querySelector('#name').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#day-work').value = '';
    document.querySelector('#base-salary').value = '';
    var listCV = document.querySelector('#position').children;
    listCV[0].selected = true;
    document.querySelector('#times-month').value ='';
}

/**
 * hàm lấy về nhân viên dựa trên account
 * @param {*} account 
 * @returns đối tượng nhanVien được tim thấy hoặc trả về -1 nếu không tìm thấy kết quả nào
 */
function getNhanVienByAccount(account){
    getDataStorage();
    var nv = -1;
    for (let i = 0; i < arrNhanVien.length; i++) {
        if(arrNhanVien[i].account === account){
            nv = arrNhanVien[i];
            break;
        }
    }
    return nv;
}

/**
 * hàm lấy về index của nhanVien dựa trên account
 * @param {*} account 
 * @returns tra về index của nhanVien cần tiềm hoặc trả về -1 nếu không tìm thấy
 */
function getIndexNhanVienByAccount(account){
    getDataStorage();
    var index = -1;
    for (let i = 0; i < arrNhanVien.length; i++) {
        if(arrNhanVien[i].account === account){
            index = i;
            break;
        }
    }
    return index;
}

/**
 * tạo đối tượng nhanVien dựa trên đối tương trả về từ JSON
 * @param {*} nv đối tường được parse từ JSON
 * @returns đới tượng kiểu nhanVien
 */
function assignNhanVien(nv){
    var target = new nhanVien();
    target = Object.assign(target,nv);
    return target;
}

/**
 * lấy đối tượng trả về từ form nhập liệu
 * @returns Object nhanVien
 */
function getInputNhanVien(){
    var nv = new nhanVien();
    nv.account = document.querySelector('#account').value.trim();
    nv.name = document.querySelector('#name').value.trim();
    nv.password = document.querySelector('#password').value.trim();
    nv.email = document.querySelector('#email').value.trim();
    nv.workDay = document.querySelector('#day-work').value.trim();
    nv.salary = +document.querySelector('#base-salary').value.trim();
    var listCV = document.querySelector('#position').children;
    var positionIndexSelect = -1;
    for(let i = 0; i < listCV.length; i++){
        if(listCV[i].selected){
            positionIndexSelect = i;
            break;
        }
    }
    nv.position = listCV[positionIndexSelect].innerHTML;
    nv.timesMonth = +document.querySelector('#times-month').value.trim();
    return nv;
}

/**
 * tìm đối tượng dựa vào chucVu trên mảng nhanVien arr
 * @param {*} arr 
 * @param {*} position 
 * @returns các đối tưởng có chucVu position trong mảng arr
 */
function getEmployeesByPosition(arr,position){
    var arrPosition = [];
    for (let i = 0; i < arr.length; i++) {
        let nv = new nhanVien();
        nv = Object.assign(nv,arr[i]);
        if(nv.position === position){
            arrPosition.push(nv);
        }
    }
    return arrPosition;
}


/**
 * tìm đối tượng dựa vào xepLoai trên mảng nhanVien arr
 * @param {*} arr 
 * @param {*} rank 
 * @returns các đối tưởng có xepLoai position trong mảng arr
 */
function getEmployeesByRank(arr,rank){
    var arrRank = [];
    for (let i = 0; i < arr.length; i++) {
        let nv = new nhanVien();
        nv = Object.assign(nv,arr[i]);
        if(nv.rank() === rank){
            arrRank.push(nv);
        }
    }
    return arrRank;
}


/**
 * tiềm kiếm các nhanVien dựa trên nhanVien.name đã được chuyển đổi sang kiểu ko dấu alias
 * @param {*} name mảng các nhanVien tương ứng với dử liệu tìm kiếm
 */
function searchNhanVienByName(name){
    event.preventDefault();
    getDataStorage();
    var arrNew = [];

    for (let i = 0; i < arrNhanVien.length; i++) {
        let nvNew = new nhanVien();
        nvNew = Object.assign(nvNew,arrNhanVien[i]);
        nvNew.alias = ChangeToSlug(nvNew.name);
        arrNew.push(nvNew);
    }
    
    var arrRessult = [];
    for (let i = 0; i < arrNew.length; i++) {
        if(arrNew[i].alias.search(ChangeToSlug(name.trim()))!==-1){
            arrRessult.push(arrNew[i]);
        }
    }
    console.log(arrRessult);
    renderNhanVienToUser(arrRessult,'#tableSearch');
}


/**
 * hàm kiềm tra xác thực dử liệu cho trường account ko trùng lặp với các account đang hiện có
 * @param {*} account 
 * @param {*} name 
 * @returns trả về true nếu không có account nào trùng lặp, trả về false nếu có account trùng lặp
 */
function repeatAccountValidate(account,name){
    for (let i = 0; i < arrNhanVien.length; i++) {
        if(arrNhanVien[i].account === account){
            document.querySelector(`#error-repeat-${name}`).innerHTML = `${name} đã tồn tại`;
            return false;
        }
    }
    document.querySelector(`#error-repeat-${name}`).innerHTML = ``;
    return true;
}

/**
 * xử lý sự kiên cho nut btnShowMenu
 * @param {*} btn 
 */
function showMenu(btn){
    var menu = document.querySelector('#v-pills-tab');
    var menuIconShow = document.querySelector('.fa-bars');
    var menuIconHide = document.querySelector('.fa-plus');
    if(menu.style.display !=='block'){
        menu.style.display = 'block';
        menuIconShow.style.display = 'none';
        menuIconHide.style.display = 'inline-block';
        btn.style.background = '#F5B998';
    }
    else{
        menu.style.display = 'none';
        menuIconShow.style.display = 'inline-block';
        menuIconHide.style.display = 'none';
        btn.style.background = '#A87558';
    }
}

