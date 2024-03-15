// function fun(){
//     const arr = [];
//     function obj(pic,user, loc, dep, role,email, emp_no, status, join_dt,mobileNo) {
//         this.pic = pic;
//         this.user = user;
//         this.loc = loc;
//         this.dep = dep;
//         this.role = role;
//         this.email = email;
//         this.emp_no = emp_no;
//         this.status = status;
//         this.join_dt = join_dt;
//         this.mobileNo = mobileNo;
//     }

//     const user = ['abhi a', 'ajay k', 'akash d', 'ashok n','dj l', 'dnil a', 'dkhil u','bik s','bat v','ball w','brown b','clash d','cash f','cover h','eagle t','earth g','enjoy j','fresh s','flower g','fever s','ground g','grand a','google w','glow y'];
//     const loc = ['Hyderabad', 'Banglore', 'Guntur'];
//     const dep = ['Product Engg.', 'UI/UX', 'QA'];
//     const role = ['UX Designer', 'Mobile App Developer', 'Full-Stack Developer'];
//     const sta = ['Active', 'In Active'];
//     const pic = "../Images/Search-bar/32.png";
//     const mail = 'Joe.a@tech.com'; 

//     for (i = 0; i < 50; i++) {
//         const user_rand = Math.floor(Math.random() * user.length);
//         const loc_rand = Math.floor(Math.random() * loc.length);
//         const dep_rand = Math.floor(Math.random() * dep.length);
//         const role_rand = Math.floor(Math.random() * role.length);
//         const status_rand = Math.floor(Math.random() * sta.length);

//         arr[i] = new obj(pic,user[user_rand], loc[loc_rand], dep[dep_rand], role[role_rand],mail,`TZ00234${i}`, sta[status_rand], `${i+1}/03/2023`,`58667827${i+10}`);
//     }
//     localStorage.setItem('arr',JSON.stringify(arr));
//     alert('Data is added');
// }
// fun();

let employData = JSON.parse(localStorage.getItem('arr'));
let filteredCharStatus = {};
let selectedCharCount = 0;
let arrayForSelectedFilters = Array.from(employData);
let charArrayForTable = Array.from(employData);
let deleteElementsArray = [];
let deletingElementsCount = 0;
let isAllEmployeesSelected = false;
let isCharFiltersReseted = true;
let filetersSelectedFor = [false,false,false];
let showExportBtn = false;

let sortedElementStatus = {
    user: true,
    loc: true,
    dep: true,
    status: true,
    join_dt: true,
    emp_no: true,
    role: true
};

// show Rows in the Employee table

function showRows(displayArray) {
    let rowData = "";
    for (let ele in displayArray) {
        rowData += `<tr class="table-row" id="${displayArray[ele].emp_no}">
        <td><input type="checkbox" class="employ-checkbox" name="all_check"  onclick="selectEmployee('${displayArray[ele].emp_no}')"></td>
        <td>
            <div class="emp-profile">
                <div><img src=${displayArray[ele].pic} class="admin-logo"></div>
                <div>
                    <p class="emp-name">${displayArray[ele].user}</p>
                    <p class="emp-mailid">${displayArray[ele].email}</p>
                </div>
            </div>
        </td>
        <td>${displayArray[ele].loc}</td>
        <td>${displayArray[ele].dep}</td>
        <td>${displayArray[ele].role}</td>
        <td>${displayArray[ele].emp_no}</td>`
        if (displayArray[ele].status === 'Active') rowData += `<td><button type="button" class="emp-status">${displayArray[ele].status}</button></td>`
        else rowData += `<td><button type="button" class="emp-status-inActive">${displayArray[ele].status}</button></td>`
        rowData += `<td>${displayArray[ele].join_dt}</td>
        <td class="ellipse-data">
            <img src="./Images/Table/dots-three-bold.svg" class="ellipse" onclick="displayEllipseOptions('show${displayArray[ele].emp_no}')" alt="ellipse"/>
            <div class='ellipse-position' id='show${displayArray[ele].emp_no}'>
                <button type='button' class='ellipse-button' onclick='viewDetailsOfEmployee("${displayArray[ele].emp_no}","Edit")' value='Edit'>Edit</button>
                <button type='button' class='ellipse-button' onclick='viewDetailsOfEmployee("${displayArray[ele].emp_no}","View")' value='view Details'>View Details</button>
                <button type='button' class='ellipse-button' onclick='deleteEmployeeById("${displayArray[ele].emp_no}")' value='Edit'>Delete</button>
            </div>
        </td>
        </tr>
        `
    }
    document.getElementById('rowData').innerHTML = rowData;
}

// Export data to excel

function exportDataToexcel(){
    let data = document.getElementById('employeeInformation');
    let clonedTable = data.cloneNode(true);
    let rows = clonedTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        rows[i].deleteCell(0); 
        rows[i].deleteCell(cells.length - 1); 
    }
    let excelFile = XLSX.utils.table_to_book(clonedTable, { sheet: "sheet1" });
    XLSX.writeFile(excelFile, 'ExcelFile.xlsx');
}

// Export data to CSV

function exportDataToCSV() {
    let data = document.getElementById('employeeInformation');
    let clonedTable = data.cloneNode(true);
    let rows = clonedTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        rows[i].deleteCell(0); 
        rows[i].deleteCell(cells.length - 1); 
    }
    let excelFile = XLSX.utils.table_to_book(clonedTable, { sheet: "sheet1" });
	let csvContent = XLSX.utils.sheet_to_csv(excelFile.Sheets[excelFile.SheetNames[0]]);
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "CSVFile.csv");
    document.body.appendChild(link);
    link.click();
}

//Display the characters from A to Z

function setCharacters() {
    let charData = `<i class="ph ph-funnel char-filter" id="changeCharFilter" onclick="resetCharFilter()"></i>`;
    for (let character = 65; character <= 90; character++) {
        let requiredCharacter = String.fromCharCode(character);
        let tempChar = 'char_' + requiredCharacter;
        charData += `<p id="${tempChar}" class="char-filter" onclick="applyAllFilters('${requiredCharacter}')">${requiredCharacter}</p>`
    }
    document.getElementById('chars').innerHTML = charData;
}

//Array stores the selected characters status

function applyAllFilters(char = "") {
    let arrayForFilters = Array.from(employData);
    if ((selectedCharCount > 0 || char !== "") && arrayForFilters.length > 0) arrayForFilters = selectEmployeeByChar(char, arrayForFilters);
    if (arrayForFilters.length > 0) arrayForFilters = applyFilter(arrayForFilters);
    arrayForSelectedFilters = Array.from(arrayForFilters);
    showRows(arrayForSelectedFilters);
}

// status of characters to show are they selected or not

function selectedCharactersStatus() {
    for (let i = 65; i < 91; i++) filteredCharStatus[String.fromCharCode(i)] = false;
}

// Display data by first character of user name 

function selectEmployeeByChar(c, tempArray) {
    if (c !== "" && filteredCharStatus[c]) {
        document.getElementById('char_' + c).style.backgroundColor = '#EAEBEE';
        document.getElementById('char_' + c).style.color = '#6A6F74';
        filteredCharStatus[c] = false;
        selectedCharCount -= 1;
    }
    else if (c !== "") {
        filteredCharStatus[c] = true;
        document.getElementById('char_' + c).style.backgroundColor = '#F44848';
        document.getElementById('char_' + c).style.color = 'white';
        selectedCharCount += 1;
    }
    charArrayForTable = [];
    for (let st in filteredCharStatus) {
        if (!filteredCharStatus[st]) continue;
        for (let ele in tempArray) {
            let char = tempArray[ele].user.charAt(0);
            char = char.toUpperCase();
            if (char === st) charArrayForTable.push(tempArray[ele]);
        }
    }
    if (selectedCharCount > 0) {
        tempArray = Array.from(charArrayForTable);
        document.getElementById('changeCharFilter').style.color = '#F44848';
        arrayForSelectedFilters = Array.from(charArrayForTable);
    }
    if(tempArray.length === 0  || selectedCharCount === 0) document.getElementById('changeCharFilter').style.color = 'black';
    return tempArray;
}

// Reset the all characters selected

function resetCharFilter() {
    if (isCharFiltersReseted) {
        document.getElementById('changeCharFilter').style.color = 'black';
        for (st in filteredCharStatus) {
            filteredCharStatus[st] = false;
            document.getElementById('char_' + st).style.backgroundColor = '#EAEBEE';
            document.getElementById('char_' + st).style.color = '#6A6F74';
        }
        selectedCharCount = 0;
        applyAllFilters();
    }
    document.getElementById("statusDisplay").style.display='none';
    document.getElementById("locationDisplay").style.display='none';
    document.getElementById("departmentDisplay").style.display='none';
}

// Filter the table 

function applyFilter(tempArray) {
    let sta = document.getElementsByClassName("status");
    let loc = document.getElementsByClassName("location");
    let dep = document.getElementsByClassName("department");
    filteredArrayForTable = Array.from(tempArray);
    let array = [];
    for(let val of sta){
        if(val.checked === true) array.push(val.value);
    }
    if ( array.length > 0) {
        filteredArrayForTable = filteredArrayForTable.filter(function (ele) {
            for(let val of array){
                if(ele.status === val) return true;
            }
            return false;
        });
        document.getElementById('selectStatus').innerHTML =`${array.length} Selected`;
    }
    else document.getElementById('selectStatus').innerHTML =`Status<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    array = [];
    for(let val of loc){
        if(val.checked === true) array.push(val.value);
    }
    if ( array.length > 0) {
        filteredArrayForTable = filteredArrayForTable.filter(function (ele) {
            for(let val of array){
                if(ele.loc === val) return true;
            }
            return false;
        });
        document.getElementById('selectLocation').innerHTML =`${array.length} Selected`;
    }
    else document.getElementById('selectLocation').innerHTML = `Location<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    array = [];
    for(let val of dep){
        if(val.checked === true) array.push(val.value);
    }
    if ( array.length > 0) {
        filteredArrayForTable = filteredArrayForTable.filter(function (ele) {
            for(let val of array){
                if(ele.dep === val) return true;
            }
            return false;
        });
        document.getElementById('selectDepartment').innerHTML =`${array.length} Selected`;
    }
    else document.getElementById('selectDepartment').innerHTML = `Department<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    tempArray = Array.from(filteredArrayForTable);
    document.getElementById("statusDisplay").style.display='none';
    document.getElementById("locationDisplay").style.display='none';
    document.getElementById("departmentDisplay").style.display='none';
    return tempArray;
}

// Reset the filters selected

function resetFilter() {
    document.getElementById('deleteButton').style.backgroundColor = "#F89191";
    document.getElementById('resetApplyContainer').style.display = 'none';
    document.getElementById('selectStatus').innerHTML = `Status<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    document.getElementById('selectDepartment').innerHTML = `Department<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    document.getElementById('selectLocation').innerHTML = `Location<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    let sta = document.getElementsByClassName("status");
    let loc = document.getElementsByClassName("location");
    let dep = document.getElementsByClassName("department");
    for(let val of sta){
        if(val.checked === true) val.checked = false;
    }
    for(let val of loc){
        if(val.checked === true) val.checked = false;
    }
    for(let val of dep){
        if(val.checked === true) val.checked = false;
    }
    for(let val in filetersSelectedFor) filetersSelectedFor[val] = false;
    applyAllFilters();
}

// Sort the table with respect to provided category

function sortTable(byCategory) {
    let descendingSort = -1, ascendingSort = 1;
    if (sortedElementStatus[byCategory]) {
        descendingSort = 1;
        ascendingSort = -1;
    }
    let sortArray = Array.from(arrayForSelectedFilters);
    sortArray.sort(function (a, b) {
        if (a[byCategory].toUpperCase() < b[byCategory].toUpperCase()) return ascendingSort;
        else return descendingSort;
    });
    showRows(sortArray);
    sortedElementStatus[byCategory] = !sortedElementStatus[byCategory];
}

// Stores the data of employee selected on checkbox

function selectEmployee(empId) {
    for (let check in deleteElementsArray) {
        if (deleteElementsArray[check].emp_no === empId) {
            deleteElementsArray.splice(check, 1);
            document.getElementById("checkAllEmployees").checked = false;
            document.getElementById(empId).style.backgroundColor = "white";
            isAllEmployeesSelected = false;
            deletingElementsCount -= 1;
            if (deletingElementsCount === 0) document.getElementById('deleteButton').style.backgroundColor = '#F89191';
            return;
        }
    }
    document.getElementById(empId).style.backgroundColor = "#FFF4F4";
    for (let check in arrayForSelectedFilters) {
        if (arrayForSelectedFilters[check].emp_no === empId) {
            deleteElementsArray.push(arrayForSelectedFilters[check]);
            break;
        }
    }
    deletingElementsCount += 1;
    document.getElementById('deleteButton').style.backgroundColor = '#F44848';
    if (deletingElementsCount === arrayForSelectedFilters.length) {
        document.getElementById("checkAllEmployees").checked = true;
        isAllEmployeesSelected = true;
    }
}

// Delete the selected employees

function deleteEmployee() {
    if (deleteElementsArray.length > 0) {
        for (let check in deleteElementsArray) {
            for (let find in employData) {
                if (deleteElementsArray[check].emp_no === employData[find].emp_no) {
                    employData.splice(find, 1);
                    break;
                }
            }
            for (let find in arrayForSelectedFilters) {
                if (deleteElementsArray[check].emp_no === arrayForSelectedFilters[find].emp_no) {
                    arrayForSelectedFilters.splice(find, 1);
                    break;
                }
            }
        }
    }
    deleteElementsArray = [];
    deletingElementsCount = 0;
    showRows(arrayForSelectedFilters);
    document.getElementById('deleteButton').style.backgroundColor = '#F89191';
    document.getElementById("checkAllEmployees").checked = false;
    isAllEmployeesSelected = false;
}

// select and stores the all employee data in the table to delete

function selectAllEmployees() {
    checks = document.getElementsByClassName("employ-checkbox");
    if (!isAllEmployeesSelected) {
        for (let check of checks) check.checked = true;
        isAllEmployeesSelected = true;
        deleteElementsArray = Array.from(arrayForSelectedFilters);
        for (ele in arrayForSelectedFilters) document.getElementById(arrayForSelectedFilters[ele].emp_no).style.backgroundColor = "#FFF4F4";
    }
    else {
        for (let check of checks) check.checked = false;
        isAllEmployeesSelected = false;
        deleteElementsArray = [];
        for (ele in arrayForSelectedFilters) document.getElementById(arrayForSelectedFilters[ele].emp_no).style.backgroundColor = "white";
    }
    deletingElementsCount = deleteElementsArray.length;
    if (deletingElementsCount) document.getElementById('deleteButton').style.backgroundColor = '#F44848';
    else document.getElementById('deleteButton').style.backgroundColor = '#F89191';
}

// function fillDataInForm(employeeId){
//     let employData = JSON.parse(localStorage.getItem('arr'));
//             employData.forEach(element => {
//                 if(element.emp_no === employeeId){
//                     if(element.status === 'In Active'){
//                         alert('You unable to edit Inactive Employee');
//                         return;
//                     }
//                     showContent('addEmployeeForm');
//                     document.getElementById('updatePic').src = element.pic;
//                     let empNo = document.getElementById('empNo');
//                     empNo.value = element.emp_no;
//                     empNo.disabled = true;
//                     let name = element.user.split(' ');
//                     document.getElementById('fName').value = name[0];
//                     document.getElementById('lName').value = name[1];
//                     // document.getElementById('changeDob').value = element.dob;
//                     document.getElementById('email').value = element.email;
//                     document.getElementById('mobileNo').value = element.mobileNo;
//                     document.getElementById('joinDate').value = element.join_dt;
//                     document.getElementById('loc').value = element.loc;
//                     document.getElementById('jobTitle').value = element.role;
//                     document.getElementById('dep').value = element.dep;
//                     // document.getElementById('manager').value = element.manager;
//                     // document.getElementById('proj').value = element.project;
//                     let cancel = document.getElementById('cancelDataSubmit');
//                     let update = document.getElementById('formSubmit');
//                     cancel.addEventListener('click',function(event){
//                         event.preventDefault();
//                         document.getElementById('addEmployeeForm').reset();
//                         document.getElementById('updatePic').src = "./Images/Table/download.jpg";
//                         update.innerHTML = 'Add Employee';
//                         empNo.disabled = false;
//                         setDefaultJoinDate();
//                         showContent('employeeData');
//                     });
//                     update.innerHTML = 'Update';
//                     return;
//                 }
//             });
// }

function viewDetailsOfEmployee(employeeId,mode){
    let employData = JSON.parse(localStorage.getItem('arr'));
            employData.forEach(element => {
                if(element.emp_no === employeeId){
                    if(element.status === 'In Active' && mode === 'Edit'){
                        alert('You unable to edit Inactive Employee');
                        return;
                    }
                    showContent('addEmployeeForm');
                    document.getElementById('updatePic').src = element.pic;
                    let empNo = document.getElementById('empNo');
                    empNo.value = element.emp_no;
                    empNo.disabled = true;
                    let name = element.user.split(' ');
                    let fname = document.getElementById('fName');
                    fname.value = name[0];
                    let lname = document.getElementById('lName');
                    lname.value = name[1];
                    let mail = document.getElementById('email');
                    mail.value = element.email;
                    let mobile = document.getElementById('mobileNo');
                    mobile.value = element.mobileNo;
                    let joinDate = document.getElementById('joinDate');
                    joinDate.value = element.join_dt;
                    let location = document.getElementById('loc');
                    location.value = element.loc;
                    let jobTitle = document.getElementById('jobTitle');
                    jobTitle.value = element.role;
                    let department = document.getElementById('dep');
                    department.value = element.dep;
                    let cancel = document.getElementById('cancelDataSubmit');
                    let addEmpBtn = document.getElementById('formSubmit');
                    if(mode === 'View'){
                        fname.disabled = true;
                        lname.disabled = true;
                        mail.disabled = true;
                        mobile.disabled = true;
                        joinDate.disabled = true;
                        location.disabled = true;
                        jobTitle.disabled = true;
                        department.disabled = true;
                        addEmpBtn.style.display='none';
                    }
                    cancel.addEventListener('click',function(event){
                        event.preventDefault();
                        document.getElementById('addEmployeeForm').reset();
                        document.getElementById('updatePic').src = "./Images/Table/download.jpg";
                        empNo.disabled = false;
                        fname.disabled = false;
                        lname.disabled = false;
                        mail.disabled = false;
                        mobile.disabled = false;
                        joinDate.disabled = false;
                        location.disabled = false;
                        jobTitle.disabled = false;
                        department.disabled = false;
                        if(mode === 'View') addEmpBtn.style.display='block';
                        else addEmpBtn.innerHTML = 'Add Employee';
                        setDefaultJoinDate();
                        showContent('employeeData');
                    });
                    if(mode === 'Edit') addEmpBtn.innerHTML = 'Update';
                    return;
                }
            });
}

function displayEllipseOptions(employeeId){
    let ellipse = document.getElementById(employeeId);
        if (ellipse.style.display === "none" || ellipse.style.display === "") {
            for(let ele in employData) document.getElementById(`show${employData[ele].emp_no}`).style.display = "none";
            ellipse.style.display = 'flex';
        } else {
            ellipse.style.display = 'none';
        }
}

function deleteEmployeeById(employeeId){
    for (let find in employData) {
        if (employeeId === employData[find].emp_no) {
            employData.splice(find, 1);
            break;
        }
    }
    showRows(employData);
}

function searchEmployeeByText(){
    let val = document.getElementById("searchEmployeeWithName").value;
    val = val.toUpperCase();
    let arrayOnSearch = arrayForSelectedFilters;
    let lengthOfVal = val.length;
    arrayOnSearch = arrayOnSearch.filter(function(ele){
        for(let start = 0;start < ele.user.length - lengthOfVal + 1 ; start++) if(ele.user.substr(start,lengthOfVal).toUpperCase() === val) return true;
        return false;
    });
    // arrayForSelectedFilters = arrayOnSearch;
    showRows(arrayOnSearch);
}

function initialize() {
    showRows(employData);
    setCharacters();
    selectedCharactersStatus();
    document.getElementById("selectStatus").addEventListener('click',function(event){
        if(filetersSelectedFor[0]) document.getElementById("statusDisplay").style.display='none';
        else document.getElementById("statusDisplay").style.display='block';
        filetersSelectedFor[0] = ! filetersSelectedFor[0];
        event.stopPropagation();
    });
    document.getElementById("selectLocation").addEventListener('click',function(event){
        if(filetersSelectedFor[1]) document.getElementById("locationDisplay").style.display='none';
        else document.getElementById("locationDisplay").style.display='block';
        filetersSelectedFor[1] = ! filetersSelectedFor[1];
        event.stopPropagation();
    });
    document.getElementById("selectDepartment").addEventListener('click',function(event){
        if(filetersSelectedFor[2]) document.getElementById("departmentDisplay").style.display='none';
        else document.getElementById("departmentDisplay").style.display='block';
        filetersSelectedFor[2] = ! filetersSelectedFor[2];
        event.stopPropagation();
    });
    let tempArray = ['active','inActive','hyderabad','banglore','guntur','ProductEngg','QA','uiux'];
    let countChecked = 0;
    for(let val of tempArray){
        let k = document.getElementById(val);
        k.addEventListener('click',function(event){
            if(k.checked){
                document.getElementById("resetApplyContainer").style.display = 'flex';
                countChecked +=1;
            }
            else {
                countChecked -=1;
                if(countChecked === 0) document.getElementById("resetApplyContainer").style.display = 'none';
            }
            event.stopImmediatePropagation();
        })
    }
    document.getElementById("exportOptionsButton").addEventListener("click",function(event){
        if(showExportBtn) document.getElementById('exportData').style.display = 'none';
        else document.getElementById('exportData').style.display = 'flex';
        showExportBtn = ! showExportBtn;
        event.stopPropagation();
    });
    document.getElementById('wholeBody').addEventListener('click',function(event){
        document.getElementById("statusDisplay").style.display='none';
        filetersSelectedFor[0] = false;
        document.getElementById("locationDisplay").style.display='none';
        filetersSelectedFor[1] = false;
        document.getElementById("departmentDisplay").style.display='none';
        filetersSelectedFor[2] = false;
        document.getElementById('exportData').style.display = 'none';
        showExportBtn = false;
        event.stopImmediatePropagation();
    });
}

//Calling initialize function

initialize();
