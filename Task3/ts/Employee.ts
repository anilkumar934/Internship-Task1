interface Employee {
    pic: string;
    user: string;
    loc: string;
    dep: string;
    role: string;
    email: string;
    emp_no: string;
    status: string;
    join_dt: string;
    mobileNo: string;
}

function fun(): void {
    const arr: Employee[] = [];
    function obj(pic: string, user: string, loc: string, dep: string, role: string, email: string, emp_no: string, status: string, join_dt: string, mobileNo: string): void {
        this.pic = pic;
        this.user = user;
        this.loc = loc;
        this.dep = dep;
        this.role = role;
        this.email = email;
        this.emp_no = emp_no;
        this.status = status;
        this.join_dt = join_dt;
        this.mobileNo = mobileNo;
    }
    const user: string[] = ['abhi a', 'ajay k', 'akash d', 'ashok n','dj l', 'dnil a', 'dkhil u','bik s','bat v','ball w','brown b','clash d','cash f','cover h','eagle t','earth g','enjoy j','fresh s','flower g','fever s','ground g','grand a','google w','glow y'];
    const loc: string[] = ['Hyderabad', 'Banglore', 'Guntur'];
    const dep: string[] = ['Product Engg.', 'UI/UX', 'QA'];
    const role: string[] = ['UX Designer', 'Mobile App Developer', 'Full-Stack Developer'];
    const sta: string[] = ['Active', 'In Active'];
    const pic: string = "../Images/Search-bar/32.png";
    const mail: string = 'Joe.a@tech.com'; 
    for (let i = 0; i < 50; i++) {
        const user_rand: number = Math.floor(Math.random() * user.length);
        const loc_rand: number = Math.floor(Math.random() * loc.length);
        const dep_rand: number = Math.floor(Math.random() * dep.length);
        const role_rand: number = Math.floor(Math.random() * role.length);
        const status_rand: number = Math.floor(Math.random() * sta.length);
        arr[i] = new obj(pic, user[user_rand], loc[loc_rand], dep[dep_rand], role[role_rand], mail, `TZ00234${i}`, sta[status_rand], `${i+1}/03/2023`, `58667827${i+10}`);
    }
    localStorage.setItem('arr', JSON.stringify(arr));
    alert('Data is added');
}

fun();

let employData: Employee[] = JSON.parse(localStorage.getItem('arr'));
let filteredCharStatus: { [key: string]: boolean } = {};
let selectedCharCount: number = 0;
let arrayForSelectedFilters: Employee[] = Array.from(employData);
let charArrayForTable: Employee[] = Array.from(employData);
let deleteElementsArray: Employee[] = [];
let deletingElementsCount: number = 0;
let isAllEmployeesSelected: boolean = false;
let isCharFiltersReseted: boolean = true;
let filetersSelectedFor: boolean[] = [false, false, false];
let showExportBtn: boolean = false;
let sortedElementStatus: { [key: string]: boolean } = {
    user: true,
    loc: true,
    dep: true,
    status: true,
    join_dt: true,
    emp_no: true,
    role: true
};

// show Rows in the Employee table
function showRows(displayArray: Employee[]): void {
    let rowData: string = "";
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
function exportDataToexcel(): void {
    let data: HTMLElement = document.getElementById('employeeInformation');
    let clonedTable: HTMLElement = data.cloneNode(true) as HTMLElement;
    let rows: HTMLCollectionOf<HTMLTableRowElement> = clonedTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells: HTMLCollectionOf<HTMLTableCellElement> = rows[i].getElementsByTagName('td');
        rows[i].deleteCell(0); 
        rows[i].deleteCell(cells.length - 1); 
    }
    let excelFile: XLSX.WorkBook = XLSX.utils.table_to_book(clonedTable, { sheet: "sheet1" });
    XLSX.writeFile(excelFile, 'ExcelFile.xlsx');
}

// Export data to CSV
function exportDataToCSV(): void {
    let data: HTMLElement = document.getElementById('employeeInformation');
    let clonedTable: HTMLElement = data.cloneNode(true) as HTMLElement;
    let rows: HTMLCollectionOf<HTMLTableRowElement> = clonedTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells: HTMLCollectionOf<HTMLTableCellElement> = rows[i].getElementsByTagName('td');
        rows[i].deleteCell(0); 
        rows[i].deleteCell(cells.length - 1); 
    }
    let excelFile: XLSX.WorkBook = XLSX.utils.table_to_book(clonedTable, { sheet: "sheet1" });
    let csvContent: string = XLSX.utils.sheet_to_csv(excelFile.Sheets[excelFile.SheetNames[0]]);
    const encodedUri: string = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link: HTMLAnchorElement = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "CSVFile.csv");
    document.body.appendChild(link);
    link.click();
}

//Display the characters from A to Z
function setCharacters(): void {
    let charData: string = `<i class="ph ph-funnel char-filter" id="changeCharFilter" onclick="resetCharFilter()"></i>`;
    for (let character = 65; character <= 90; character++) {
        let requiredCharacter: string = String.fromCharCode(character);
        let tempChar: string = 'char_' + requiredCharacter;
        charData += `<p id="${tempChar}" class="char-filter" onclick="applyAllFilters('${requiredCharacter}')">${requiredCharacter}</p>`
    }
    document.getElementById('chars').innerHTML = charData;
}

//Array stores the selected characters status
function applyAllFilters(char: string = ""): void {
    let arrayForFilters: Employee[] = Array.from(employData);
    if ((selectedCharCount > 0 || char !== "") && arrayForFilters.length > 0) arrayForFilters = selectEmployeeByChar(char, arrayForFilters);
    if (arrayForFilters.length > 0) arrayForFilters = applyFilter(arrayForFilters);
    arrayForSelectedFilters = Array.from(arrayForFilters);
    showRows(arrayForSelectedFilters);
}

// status of characters to show are they selected or not
function selectedCharactersStatus(): void {
    for (let i = 65; i < 91; i++) filteredCharStatus[String.fromCharCode(i)] = false;
}

// Display data by first character of user name 
function selectEmployeeByChar(c: string, tempArray: Employee[]): Employee[] {
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
            let char: string = tempArray[ele].user.charAt(0);
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
function resetCharFilter(): void {
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
function applyFilter(tempArray: Employee[]): Employee[] {
    let sta: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("status") as HTMLCollectionOf<HTMLInputElement>;
    let loc: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("location") as HTMLCollectionOf<HTMLInputElement>;
    let dep: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("department") as HTMLCollectionOf<HTMLInputElement>;
    filteredArrayForTable = Array.from(tempArray);
    let array: string[] = [];
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
function resetFilter(): void {
    document.getElementById('deleteButton').style.backgroundColor = "#F89191";
    document.getElementById('resetApplyContainer').style.display = 'none';
    document.getElementById('selectStatus').innerHTML = `Status<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    document.getElementById('selectDepartment').innerHTML = `Department<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    document.getElementById('selectLocation').innerHTML = `Location<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    let sta: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("status") as HTMLCollectionOf<HTMLInputElement>;
    let loc: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("location") as HTMLCollectionOf<HTMLInputElement>;
    let dep: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("department") as HTMLCollectionOf<HTMLInputElement>;
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
function sortTable(byCategory: string): void {
    let descendingSort: number = -1, ascendingSort: number = 1;
    if (sortedElementStatus[byCategory]) {
        descendingSort = 1;
        ascendingSort = -1;
    }
    let sortArray: Employee[] = Array.from(arrayForSelectedFilters);
    sortArray.sort(function (a, b) {
        if (a[byCategory].toUpperCase() < b[byCategory].toUpperCase()) return ascendingSort;
        else return descendingSort;
    });
    showRows(sortArray);
    sortedElementStatus[byCategory] = !sortedElementStatus[byCategory];
}

// Stores the data of employee selected on checkbox
function selectEmployee(empId: string): void {
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
function deleteEmployee(): void {
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
function selectAllEmployees(): void {
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


