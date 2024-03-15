// function fun(){
//     const arr = [];
//     function obj(user, loc, dep, role, emp_no, status, join_dt) {
//         this.user = user;
//         this.loc = loc;
//         this.dep = dep;
//         this.role = role;
//         this.emp_no = emp_no;
//         this.status = status;
//         this.join_dt = join_dt;
//     }

//     const user = ['abhi', 'ajay', 'akash', 'ashok', 'anil', 'akhil','bik','bat','ball','brown','clash','cash','cover'];
//     const loc = ['madh', 'hyd', 'high_tech', 'kammam'];
//     const dep = ['product engg.', 'IT', 'UIUX', 'sales'];
//     const role = ['full-stack', 's/w developer', 'QA'];
//     const sta = ['Active', 'In Active'];

//     for (i = 0; i < 20; i++) {
//         const user_rand = Math.floor(Math.random() * user.length);
//         const loc_rand = Math.floor(Math.random() * loc.length);
//         const dep_rand = Math.floor(Math.random() * dep.length);
//         const role_rand = Math.floor(Math.random() * role.length);
//         const status_rand = Math.floor(Math.random() * sta.length);

//         arr[i] = new obj(user[user_rand], loc[loc_rand], dep[dep_rand], role[role_rand], `TZ00234${i}`, sta[status_rand], `0${i}/03/2023`);
//         console.log(arr[i]);
//     }
//     localStorage.setItem('arr',JSON.stringify(arr));
//     alert('Data is added');
// }




// 
let employData = JSON.parse(localStorage.getItem('arr'));


// Display Rows in the Employee table
function displayRows(displayArray) {
    let rowData = "";
    for (let ele in displayArray) {
        rowData += `<tr class="table-row" id="${displayArray[ele].emp_no}">
        <td><input type="checkbox" class="employ-checkbox" name="all_check"  onclick="selctEmployee('${displayArray[ele].emp_no}')"></td>
        <td>
            <div class="emp-profile">
                <div><img src="../Images/32.png" class="admin-logo"></div>
                <div>
                    <p class="emp-name">${displayArray[ele].user}</p>
                    <p class="emp-mailid">email.com</p>
                </div>
            </div>
        </td>
        <td>${displayArray[ele].loc}</td>
        <td>${displayArray[ele].dep}</td>
        <td>${displayArray[ele].role}</td>
        <td>${displayArray[ele].emp_no}</td>
        <td><button type="button" class="emp-status">${displayArray[ele].status}</button></td>
        <td>${displayArray[ele].join_dt}</td>
        <td class="three-dots"><i class="ph-bold ph-dots-three"></i></td>
        </tr>`
    }
    document.getElementById('rowData').innerHTML = rowData;
}
displayRows(employData);



//Display the characters from A to Z
function characterGenerator(){
    let charData = `<i class="ph ph-funnel char-filter" id="changeCharFilter" onclick="charFilterReset()"></i>`;
    for(let character=65;character<=90;character++){
        let requiredCharacter = String.fromCharCode(character);
        let tempChar = 'char_'+requiredCharacter;
        charData +=`<p id="${tempChar}" onclick="selectEmployeeByChar('${requiredCharacter}')">${requiredCharacter}</p>`
    }
    document.getElementById('chars').innerHTML = charData;
}
characterGenerator();

let def=[0,0];
//Array stores the selected characters status
let charFilterStatus = new Object();
for (let i = 65; i < 91; i++) charFilterStatus[String.fromCharCode(i)] = false;
let charSelectedCount = 0;

// Display data by first character of user name 
let arrayForSelectedFilters = employData.slice();
let charFilterColor = false;
let charArrayforTable = employData.slice();
let charArray;
function selectEmployeeByChar(c) {
    if (charFilterStatus[c]) {
        document.getElementById('char_' + c).style.backgroundColor = '#EAEBEE';
        document.getElementById('char_' + c).style.color = '#6A6F74';
        charFilterStatus[c] = false;
        charSelectedCount -= 1;
    }
    else {
        charFilterStatus[c] = true;
        document.getElementById('char_' + c).style.backgroundColor = '#F44848';
        document.getElementById('char_' + c).style.color = 'white';
        charSelectedCount += 1;
    }
    let tempArray = employData.slice();
    charArrayforTable=[];
    charArray=[];
    for (st in charFilterStatus) {
        if (!charFilterStatus[st]) continue;
        for (let ele in filterArrayForTable) {
            let char = filterArrayForTable[ele].user.charAt(0);
            char = char.toUpperCase();
            if (char === st) charArray.push(filterArrayForTable[ele]);
        }
        for (let ele in tempArray) {
            let char = tempArray[ele].user.charAt(0);
            char = char.toUpperCase();
            if (char === st) charArrayforTable.push(tempArray[ele]);
        }

    }
    if (charSelectedCount) {
        arrayForSelectedFilters = charArray.slice();
        displayRows(charArray);
        document.getElementById('changeCharFilter').style.color = '#F44848';
        charFilterColor = true;
    }
    else {
        arrayForSelectedFilters = filterArrayForTable.slice();
        displayRows(arrayForSelectedFilters);
    }
}


// Reset the all characters selected
function charFilterReset() {
    if (charFilterColor) {
        document.getElementById('change').style.color = 'black'; charFilterColor = false;
        for (st in charFilterStatus) {
            charFilterStatus[st] = false;
            document.getElementById('char_' + st).style.backgroundColor = '#EAEBEE';
            document.getElementById('char_' + st).style.color = '#6A6F74';
        }
        charArrayforTable = employData.slice();
        arrayForSelectedFilters = filterArrayForTable.slice();
        displayRows(arrayForSelectedFilters);
    }
}



// Filter the table 
let filterArray;
let filterArrayForTable = employData.slice();
function applyFilter() {
    let status = document.getElementById('selectStatus').value;
    let loc = document.getElementById('selectLocation').value;
    let dep = document.getElementById('selectDepartment').value;
    debugger;
    filterArray = charArrayforTable.slice();
    filterArrayForTable = employData.slice();
    for (ele in filterArray) {
        if (status !=='none') {
            filterArray = filterArray.filter(function (ele){
                return ele.status === status;
            })
            filterArrayForTable = filterArrayForTable.filter(function (ele){
                return ele.status === status;
            })
        }
        if (loc !== 'none') {
            filterArray = filterArray.filter(function (ele){
                return ele.loc === loc;
            })
            filterArrayForTable = filterArrayForTable.filter(function (ele){
                return ele.loc === loc;
            })
        }
        if (dep !== 'none') {   
            filterArray = filterArray.filter(function (ele){
                return ele.dep === dep;
            })
            filterArrayForTable = filterArrayForTable.filter(function (ele){
                return ele.dep === dep;
            })
        }
    }
    arrayForSelectedFilters = filterArray.slice();
    displayRows(filterArray);
}


// Reset the filters selected
function resetFilter() {
    document.getElementById("selectStatus").selectedIndex = 0;
    document.getElementById("selectLocation").selectedIndex = 0;
    document.getElementById("selectDepartment").selectedIndex = 0;
    document.getElementById('deleteButton').style.backgroundColor = "#F89191";
    deleteArray = [];
    filterArrayForTable = employData.slice();
    if(charSelectedCount > 0) arrayForSelectedFilters = charArrayforTable.slice();
    else{
        arrayForSelectedFilters = employData.slice();
        charArrayforTable = employData.slice();
    }
    displayRows(arrayForSelectedFilters);
}


// Sort the table with respect to provided data
let sortedElementStatus = {
    user: 0,
    loc: 0,
    dep: 0,
    status: 0,
    join_dt: 0,
    emp_no: 0,
    role: 0
};

function sortTable(byCategory) {
    let descendingSort = -1, ascendingSort = 1;
    if (sortedElementStatus[byCategory] % 2) {
        descendingSort = 1;
        ascendingSort = -1;
    }
    let sortArray = arrayForSelectedFilters.slice();
    sortArray.sort(function (a, b) {
        if (a[byCategory].toUpperCase() < b[byCategory].toUpperCase()) return descendingSort;
        if (a[byCategory].toUpperCase() > b[byCategory].toUpperCase()) return ascendingSort;
        return 0;
    });
    displayRows(sortArray);
    sortedElementStatus[byCategory] += 1;
}


// Stores the data of employe selected on checkbox
let deleteArray = [];
let countOfElemntsToDelete = 0;
let selectAllEmployeesStatus = false;
function selctEmployee(emp_id) {
    
    for (let check in deleteArray) {
        if (deleteArray[check].emp_no === emp_id) {
            delete deleteArray[check];
            let allEmployees = document.getElementsByClassName("check_all_employees");
            document.getElementById(emp_id).style.backgroundColor = "white";
            for (let check of allEmployees) check.checked = false;
            selectAllEmployeesStatus = false;
            countOfElemntsToDelete -= 1;
            if (!countOfElemntsToDelete) document.getElementById('deleteButton').style.backgroundColor = '#F89191';
            return;
        }
    }
    document.getElementById(emp_id).style.backgroundColor = "#FFF4F4";
    for (let check in arrayForSelectedFilters) {
        if (arrayForSelectedFilters[check].emp_no === emp_id) {
            deleteArray.push(arrayForSelectedFilters[check]); 
            break; 
        }
    }
    console.log(deleteArray);
    countOfElemntsToDelete += 1;
    document.getElementById('deleteButton').style.backgroundColor = '#F44848';
}


// Delete the selected employees
function deleteEmployee() {
    if (deleteArray.length) {
        for (let check in deleteArray) {
            for (let find in employData) {
                if (deleteArray[check].emp_no === employData[find].emp_no) { 
                    delete employData[find]; 
                    break; 
                }
            }
            for (let find in arrayForSelectedFilters) {
                if (deleteArray[check].emp_no === arrayForSelectedFilters[find].emp_no) { 
                    delete arrayForSelectedFilters[find]; 
                    break; 
                }
            }
            for (let find in charArrayforTable) {
                if (deleteArray[check].emp_no === charArrayforTable[find].emp_no) { 
                    delete charArrayforTable[find]; 
                    break; 
                }
            }
            for (let find in filterArrayForTable) {
                if (deleteArray[check].emp_no === filterArrayForTable[find].emp_no) { 
                    delete filterArrayForTable[find]; 
                    break; 
                }
            }
        }
    }
    displayRows(arrayForSelectedFilters);
    document.getElementById('deleteButton').style.backgroundColor = '#F89191';
}


// select and stores the all employee data in the table to delete
function selectAllEmployees() {
    checks = document.getElementsByClassName("employ-checkbox");
    if (!selectAllEmployeesStatus) {
        for (let check of checks) check.checked = true;
        selectAllEmployeesStatus = !selectAllEmployeesStatus;
        countOfElemntsToDelete = employData.length;
        document.getElementById('deleteButton').style.backgroundColor = '#F44848';
        deleteArray = arrayForSelectedFilters.slice();
        for(ele in arrayForSelectedFilters){
            document.getElementById(arrayForSelectedFilters[ele].emp_no).style.backgroundColor = "#FFF4F4";
        }
    }
    else {
        for (let check of checks) check.checked = false;
        selectAllEmployeesStatus = !selectAllEmployeesStatus;
        countOfElemntsToDelete = 0;
        document.getElementById('deleteButton').style.backgroundColor = '#F89191';
        deleteArray = [];
        for(ele in arrayForSelectedFilters){
            document.getElementById(arrayForSelectedFilters[ele].emp_no).style.backgroundColor = "white";
        }
    }
}