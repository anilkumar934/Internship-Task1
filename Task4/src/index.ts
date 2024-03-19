import './custom.css';
import * as XLSX from 'xlsx';


class Employee {
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

    constructor(pic: string, user: string, loc: string, dep: string, role: string, email: string, emp_no: string, status: string, join_dt: string, mobileNo: string) {
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
}

// function fun(): void {
//     const arr: Employee[] = [];
//     const user: string[] = ['abhi a', 'ajay k', 'akash d', 'ashok n', 'dj l', 'dnil a', 'dkhil u', 'bik s', 'bat v', 'ball w', 'brown b', 'clash d', 'cash f', 'cover h', 'eagle t', 'earth g', 'enjoy j', 'fresh s', 'flower g', 'fever s', 'ground g', 'grand a', 'google w', 'glow y'];
//     const loc: string[] = ['Hyderabad', 'Banglore', 'Guntur'];
//     const dep: string[] = ['Product Engg.', 'UI/UX', 'QA'];
//     const role: string[] = ['UX Designer', 'Mobile App Developer', 'Full-Stack Developer'];
//     const sta: string[] = ['Active', 'In Active'];
//     const pic: string = "/Images/Search-bar/32.png";
//     const mail: string = 'Joe.a@tech.com';

//     for (let i = 0; i < 50; i++) {
//         const user_rand: number = Math.floor(Math.random() * user.length);
//         const loc_rand: number = Math.floor(Math.random() * loc.length);
//         const dep_rand: number = Math.floor(Math.random() * dep.length);
//         const role_rand: number = Math.floor(Math.random() * role.length);
//         const status_rand: number = Math.floor(Math.random() * sta.length);

//         arr[i] = new Employee(pic, user[user_rand], loc[loc_rand], dep[dep_rand], role[role_rand], mail, `TZ00234${i}`, sta[status_rand], `${i + 1}/03/2023`, `58667827${i + 10}`);
//     }
//     localStorage.setItem('arr', JSON.stringify(arr));
//     alert('Data is added');
// }

// fun()

let employData: Employee[] = JSON.parse(localStorage.getItem('arr') || "") || [];
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
interface ValidationRule {
    [key: string]: [string, string, RegExp, string];
}
let tempArray = ['active', 'inActive', 'hyderabad', 'banglore', 'guntur', 'ProductEngg', 'QA', 'uiux'];
let countChecked = 0;
let contentDisplay: string[] = ['employeeData', 'roles', 'roleDescription', 'addEmployeeForm', 'addRole'];
let inputValidateArray: string[] = ['employId', 'firstName', 'lastName', 'email', 'mobileNo', 'joinDate']
let sideBarContent: string[] = ['roles1', 'roles2', 'employeeData1', 'employeeData2', 'roleDescription1', 'roleDescription2', 'employeeData3', 'addEmployeeForm1'];
let validationSource: ValidationRule = {
    employId: ['empNo', 'errorEmpNo', /^TZ[0-9]{6}$/, "Emp No must be in this type 'TZ000000' ."],
    firstName: ['fName', 'errorFirstName', /^[a-zA-z]{2,9}$/, ' Name must be 2 to 9 alphabets .'],
    lastName: ['lName', 'errorLastName', /^[a-zA-z]{2,9}$/, ' Name must be 2 to 9 alphabets .'],
    email: ['email', 'errorEmail', /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid Email Format .'],
    mobileNo: ['mobileNo', 'errorMobileNo', /^[1-9]{1}[0-9]{9}$/, 'Enter valid number .'],
    joinDate: ['joinDate', 'errorJoinDate', /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[2-9]{1}[0-9]{3}$/, 'Enter date correctly .']
};
const sortedElementStatus: { [key: string]: boolean } = {
    user: true,
    loc: true,
    dep: true,
    status: true,
    join_dt: true,
    emp_no: true,
    role: true
};
function showRows(displayArray: Employee[]): void {
    let rowData: string = "";
    for (let ele of displayArray) {
        rowData += `<tr class="table-row" id="${ele.emp_no}">
        <td><input type="checkbox" id="${ele.emp_no}_check" class="employ-checkbox" name="all_check"></td>
        <td>
            <div class="emp-profile">
                <div><img src="${ele.pic}" class="admin-logo"></div>
                <div>
                    <p class="emp-name">${ele.user}</p>
                    <p class="emp-mailid">${ele.email}</p>
                </div>
            </div>
        </td>
        <td>${ele.loc}</td>
        <td>${ele.dep}</td>
        <td>${ele.role}</td>
        <td>${ele.emp_no}</td>`
        if (ele.status === 'Active') rowData += `<td><button type="button" class="emp-status">${ele.status}</button></td>`
        else rowData += `<td><button type="button" class="emp-status-inActive">${ele.status}</button></td>`
        rowData += `<td>${ele.join_dt}</td>
        <td class="ellipse-data">
            <img src="/Images/Table/dots-three-bold.svg" class="ellipse" id='ellipse${ele.emp_no}' alt="ellipse"/>
            <div class='ellipse-position' id='show${ele.emp_no}'>
                <button type='button' class='ellipse-button' id='${ele.emp_no}edit' value='Edit'>Edit</button>
                <button type='button' class='ellipse-button' id='${ele.emp_no}view' value='view Details'>View Details</button>
                <button type='button' class='ellipse-button' id='${ele.emp_no}delete' value='Edit'>Delete</button>
            </div>
        </td>
        </tr>`;
    }
    document.getElementById('rowData')!.innerHTML = rowData;
    reloadedData();
}

function exportDataToexcel(): void {
    let data = document.getElementById('employeeInformation') as HTMLElement;
    let clonedTable = data.cloneNode(true) as HTMLElement;
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

function exportDataToCSV(): void {
    let data = document.getElementById('employeeInformation') as HTMLElement;
    let clonedTable = data.cloneNode(true) as HTMLElement;
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


function setCharacters(): void {
    let charData = `<i class="ph ph-funnel char-filter" id="changeCharFilter"></i>`;
    for (let character = 65; character <= 90; character++) {
        let requiredCharacter = String.fromCharCode(character);
        let tempChar = 'char_' + requiredCharacter;
        charData += `<p id="${tempChar}" class="char-filter">${requiredCharacter}</p>`;
    }
    document.getElementById('chars')!.innerHTML = charData;
}

function applyAllFilters(char: string = ""): void {
    let arrayForFilters = Array.from(employData);
    if ((selectedCharCount > 0 || char !== "") && arrayForFilters.length > 0) arrayForFilters = selectEmployeeByChar(char, arrayForFilters);
    if (arrayForFilters.length > 0) arrayForFilters = applyFilter(arrayForFilters);
    arrayForSelectedFilters = Array.from(arrayForFilters);
    showRows(arrayForSelectedFilters);
}

function selectedCharactersStatus(): void {
    for (let i = 65; i < 91; i++) filteredCharStatus[String.fromCharCode(i)] = false;
}

function selectEmployeeByChar(c: string, tempArray: Employee[]): Employee[] {
    if (c !== "" && filteredCharStatus[c]) {
        document.getElementById('char_' + c)!.style.backgroundColor = '#EAEBEE';
        document.getElementById('char_' + c)!.style.color = '#6A6F74';
        filteredCharStatus[c] = false;
        selectedCharCount -= 1;
    }
    else if (c !== "") {
        filteredCharStatus[c] = true;
        document.getElementById('char_' + c)!.style.backgroundColor = '#F44848';
        document.getElementById('char_' + c)!.style.color = 'white';
        selectedCharCount += 1;
    }
    charArrayForTable = [];
    for (let st in filteredCharStatus) {
        if (!filteredCharStatus[st]) continue;
        for (let ele of tempArray) {
            let char = ele.user.charAt(0).toUpperCase();
            if (char === st) charArrayForTable.push(ele);
        }
    }
    if (selectedCharCount > 0) {
        tempArray = Array.from(charArrayForTable);
        document.getElementById('changeCharFilter')!.style.color = '#F44848';
        arrayForSelectedFilters = Array.from(charArrayForTable);
    }
    if (tempArray.length === 0 || selectedCharCount === 0) document.getElementById('changeCharFilter')!.style.color = 'black';
    return tempArray;
}

function resetCharFilter() {
    if (isCharFiltersReseted) {
        document.getElementById('changeCharFilter')!.style.color = 'black';
        for (let st in filteredCharStatus) {
            filteredCharStatus[st] = false;
            document.getElementById('char_' + st)!.style.backgroundColor = '#EAEBEE';
            document.getElementById('char_' + st)!.style.color = '#6A6F74';
        }
        selectedCharCount = 0;
        applyAllFilters();
    }
    document.getElementById("statusDisplay")!.style.display = 'none';
    document.getElementById("locationDisplay")!.style.display = 'none';
    document.getElementById("departmentDisplay")!.style.display = 'none';
}

function applyFilter(tempArray: Employee[]) {
    let sta = document.getElementsByClassName("status") as HTMLCollectionOf<HTMLInputElement>;
    let loc = document.getElementsByClassName("location") as HTMLCollectionOf<HTMLInputElement>;
    let dep = document.getElementsByClassName("department") as HTMLCollectionOf<HTMLInputElement>;
    let filteredArrayForTable: Employee[] = Array.from(tempArray);
    let array: string[] = [];
    for (let val of sta) {
        if (val.checked === true) array.push(val.value);
    }
    if (array.length > 0) {
        filteredArrayForTable = filteredArrayForTable.filter(function (ele) {
            for (let val of array) {
                if (ele.status === val) return true;
            }
            return false;
        });
        document.getElementById('selectStatus')!.innerHTML = `${array.length} Selected`;
    }
    else document.getElementById('selectStatus')!.innerHTML = `Status<img src="/Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    array = [];
    for (let val of loc) {
        if (val.checked === true) array.push(val.value);
    }
    if (array.length > 0) {
        filteredArrayForTable = filteredArrayForTable.filter(function (ele) {
            for (let val of array) {
                if (ele.loc === val) return true;
            }
            return false;
        });
        document.getElementById('selectLocation')!.innerHTML = `${array.length} Selected`;
    }
    else document.getElementById('selectLocation')!.innerHTML = `Location<img src="/Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    array = [];
    for (let val of dep) {
        if (val.checked === true) array.push(val.value);
    }
    if (array.length > 0) {
        filteredArrayForTable = filteredArrayForTable.filter(function (ele) {
            for (let val of array) {
                if (ele.dep === val) return true;
            }
            return false;
        });
        document.getElementById('selectDepartment')!.innerHTML = `${array.length} Selected`;
    }
    else document.getElementById('selectDepartment')!.innerHTML = `Department<img src="/Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
    tempArray = Array.from(filteredArrayForTable);
    document.getElementById("statusDisplay")!.style.display = 'none';
    document.getElementById("locationDisplay")!.style.display = 'none';
    document.getElementById("departmentDisplay")!.style.display = 'none';
    return tempArray;
}

function sortTable(byCategory: keyof Employee) {
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

function selectEmployee(empId: string) {
    console.log(empId);
    for (let check in deleteElementsArray) {
        if (deleteElementsArray[check].emp_no === empId) {
            deleteElementsArray.splice(parseInt(check), 1);
            const checkAllEmployees = document.getElementById("checkAllEmployees") as HTMLInputElement;
            checkAllEmployees.checked = false;
            document.getElementById(empId)!.style.backgroundColor = "white";
            isAllEmployeesSelected = false;
            deletingElementsCount -= 1;
            if (deletingElementsCount === 0) document.getElementById('deleteButton')!.style.backgroundColor = '#F89191';
            return;
        }
    }
    document.getElementById(empId)!.style.backgroundColor = "#FFF4F4";
    for (let check in arrayForSelectedFilters) {
        if (arrayForSelectedFilters[check].emp_no === empId) {
            deleteElementsArray.push(arrayForSelectedFilters[check]);
            break;
        }
    }
    deletingElementsCount += 1;
    document.getElementById('deleteButton')!.style.backgroundColor = '#F44848';
    if (deletingElementsCount === arrayForSelectedFilters.length) {
        const checkAllEmployees = document.getElementById("checkAllEmployees") as HTMLInputElement;
        checkAllEmployees.checked = true;
        isAllEmployeesSelected = true;
    }
}

function deleteEmployee() {
    if (deleteElementsArray.length > 0) {
        for (let check in deleteElementsArray) {
            for (let find in employData) {
                if (deleteElementsArray[check].emp_no === employData[find].emp_no) {
                    employData.splice(parseInt(find), 1);
                    break;
                }
            }
            for (let find in arrayForSelectedFilters) {
                if (deleteElementsArray[check].emp_no === arrayForSelectedFilters[find].emp_no) {
                    arrayForSelectedFilters.splice(parseInt(find), 1);
                    break;
                }
            }
        }
    }
    deleteElementsArray = [];
    deletingElementsCount = 0;
    showRows(arrayForSelectedFilters);
    document.getElementById('deleteButton')!.style.backgroundColor = '#F89191';
    const checkAllEmployees = document.getElementById("checkAllEmployees") as HTMLInputElement;
    checkAllEmployees.checked = false;
    isAllEmployeesSelected = false;
}

function selectAllEmployees() {
    const checks = document.getElementsByClassName("employ-checkbox") as HTMLCollectionOf<HTMLInputElement>;
    if (!isAllEmployeesSelected) {
        for (let check of checks) check.checked = true;
        isAllEmployeesSelected = true;
        deleteElementsArray = Array.from(arrayForSelectedFilters);
        for (let ele in arrayForSelectedFilters) document.getElementById(arrayForSelectedFilters[ele].emp_no)!.style.backgroundColor = "#FFF4F4";
    }
    else {
        for (let check of checks) check.checked = false;
        isAllEmployeesSelected = false;
        deleteElementsArray = [];
        for (let ele in arrayForSelectedFilters) document.getElementById(arrayForSelectedFilters[ele].emp_no)!.style.backgroundColor = "white";
    }
    deletingElementsCount = deleteElementsArray.length;
    if (deletingElementsCount) document.getElementById('deleteButton')!.style.backgroundColor = '#F44848';
    else document.getElementById('deleteButton')!.style.backgroundColor = '#F89191';
}
function viewDetailsOfEmployee(employeeId: string, mode: string) {
    const employData = JSON.parse(localStorage.getItem('arr') || "");
    for(let element of employData) {
        if (element.emp_no === employeeId) {
            if (element.status === 'In Active' && mode === 'Edit') {
                alert('You unable to edit Inactive Employee');
                return;
            }
            showContent('addEmployeeForm');
            (document.getElementById('updatePic') as HTMLImageElement).src = element.pic;
            const empNo = document.getElementById('empNo') as HTMLInputElement;
            empNo.value = element.emp_no;
            empNo.disabled = true;
            const name = element.user.split(' ');
            const fname = document.getElementById('fName') as HTMLInputElement;
            fname.value = name[0];
            const lname = document.getElementById('lName') as HTMLInputElement;
            lname.value = name[1];
            const mail = document.getElementById('email') as HTMLInputElement;
            mail.value = element.email;
            const mobile = document.getElementById('mobileNo') as HTMLInputElement;
            mobile.value = element.mobileNo;
            const joinDate = document.getElementById('joinDate') as HTMLInputElement;
            joinDate.value = element.join_dt;
            const location = document.getElementById('loc') as HTMLInputElement;
            location.value = element.loc;
            const jobTitle = document.getElementById('jobTitle') as HTMLInputElement;
            jobTitle.value = element.role;
            const department = document.getElementById('dep') as HTMLInputElement;
            department.value = element.dep;
            const cancel = document.getElementById('cancelDataSubmit');
            const addEmpBtn = document.getElementById('formSubmit');
            if (mode === 'View') {
                fname.disabled = true;
                lname.disabled = true;
                mail.disabled = true;
                mobile.disabled = true;
                joinDate.disabled = true;
                location.disabled = true;
                jobTitle.disabled = true;
                department.disabled = true;
                addEmpBtn!.style.display = 'none';
            }
            cancel!.addEventListener('click', function (event) {
                event.preventDefault();
                (document.getElementById('addEmployeeForm') as HTMLFormElement).reset();
                (document.getElementById('updatePic') as HTMLImageElement).src = "./Images/Table/download.jpg";
                empNo.disabled = false;
                fname.disabled = false;
                lname.disabled = false;
                mail.disabled = false;
                mobile.disabled = false;
                joinDate.disabled = false;
                location.disabled = false;
                jobTitle.disabled = false;
                department.disabled = false;
                if (mode === 'View') addEmpBtn!.style.display = 'block';
                else addEmpBtn!.innerHTML = 'Add Employee';
                setDefaultJoinDate();
                showContent('employeeData');
            });
            if (mode === 'Edit') addEmpBtn!.innerHTML = 'Update';
            return;
        }
    };
}

function displayEllipseOptions(employeeId: string) {
    const ellipse = document.getElementById(employeeId);
    if (!ellipse) return;
    if (ellipse!.style.display === "none" || ellipse.style.display === "") {
        for (const ele of arrayForSelectedFilters) {
            document.getElementById('show'+ele.emp_no)!.style.display = "none";
        }
        ellipse.style.display = 'flex';
    } else {
        ellipse.style.display = 'none';
    }
}

function deleteEmployeeById(employeeId: string) {
    const index1 = employData.findIndex((element) => element.emp_no === employeeId);
    const index2 = arrayForSelectedFilters.findIndex((element) => element.emp_no === employeeId);
    if (index1 !== -1 && index2 !== -1) {
        employData.splice(index1, 1);
        arrayForSelectedFilters.splice(index2,1);
    }
    showRows(arrayForSelectedFilters);
}

function showContent(choice: string) {
    for (let show of contentDisplay) {
        if (choice === show) {
            document.getElementById(show)!.classList.remove('hideThis');
            document.getElementById(show)!.classList.add('displayThis');
        } else {
            document.getElementById(show)!.classList.add('hideThis');
        }
    }
}

// It set default Date for Join date
function setDefaultJoinDate() {
    let date: Date = new Date();
    let dd: number = date.getDate();
    let mm: number = date.getMonth() + 1;
    let yy: number = date.getFullYear();
    let showDate: string = "";
    if (dd < 10) showDate += '0' + dd.toString() + '/';
    else showDate += dd.toString() + '/';
    if (mm < 10) showDate += '0' + mm.toString() + '/';
    else showDate += mm.toString() + '/';
    showDate += yy.toString();
    let ele: HTMLInputElement = document.getElementById('joinDate') as HTMLInputElement;
    ele.placeholder = showDate;
    ele.value = showDate;
}
function checkForRequiredField(errorAt: string): void {
    let error = document.getElementById(errorAt)!;
    error.innerHTML = `<img src="/Images/Table/warning-diamond-fill.svg"> This field is required`;
    error.classList.add('error-message');
    return;
}

// It sends the validation source to validateInput function
function sendInputToValidate(inputId: string): void {
    let tempArray = validationSource[inputId];
    validateInput(tempArray[0], tempArray[1], tempArray[2], tempArray[3]);
}

// It validates the input given by the user
function validateInput(inputId: string, inputerrorId: string, pattern: RegExp, errorMessage: string): void {
    let ele = document.getElementById(inputId) as HTMLInputElement;
    ele.addEventListener('blur', function (event) {
        event.preventDefault();
        let val = ele.value;
        let error = document.getElementById(inputerrorId)!;
        if (val === "") {
            error.innerHTML = `<img src="../Images/Table/warning-diamond-fill.svg"> This field is required`;
        } else {
            if (!pattern.test(val)) {
                error.innerHTML = `<img src="../Images/Table/warning-diamond-fill.svg"> ${errorMessage}`;
            } else {
                error.innerHTML = '';
            }
        }
        error.classList.add('error-message');
    });
}

// Adds the Employee information to main Data 
function addEmployeeToDB(newEmployee: any): void {
    let arr: any[] = JSON.parse(localStorage.getItem('arr') || '[]');
    let obj: any = {};
    obj.pic = (document.getElementById("updatePic") as HTMLImageElement).src;
    obj.user = newEmployee.fName + ' ' + newEmployee.lName;
    obj.loc = newEmployee.loc;
    obj.dep = newEmployee.dep;
    obj.role = newEmployee.jobTitle;
    obj.emp_no = newEmployee.empNo;
    obj.status = "Active";
    obj.join_dt = newEmployee.joinDate;
    obj.email = newEmployee.email;
    obj.mobileNo = newEmployee.mobileNo;
    let anyDuplicate = false;
    for (let ele in arr) {
        if (arr[ele].emp_no === obj.emp_no) {
            anyDuplicate = true;
            delete arr[ele];
            arr[ele] = obj;
            break;
        }
    }
    if (!anyDuplicate) arr.push(obj);
    localStorage.setItem('arr', JSON.stringify(arr));
    (document.getElementById('addEmployeeForm') as HTMLFormElement).reset();
}
function setDobPlaceholder() {
    let ele = (document.getElementById('dob') as HTMLInputElement).value;
    let changedDate = (document.getElementById('changeDob') as HTMLInputElement);
    changedDate.value = ele;
}
function reloadedData(){
    for (let ele of employData) {
        document.getElementById(ele.emp_no + '_check')?.addEventListener('click', function () {
            selectEmployee(ele.emp_no);
        });
        document.getElementById('ellipse' + ele.emp_no)?.addEventListener('click', function (event) {
            displayEllipseOptions('show'+ele.emp_no);
            event.stopPropagation();
        });
        document.getElementById(ele.emp_no+'edit')?.addEventListener('click',function(){
            viewDetailsOfEmployee(ele.emp_no,'Edit')
        });
        document.getElementById(ele.emp_no+'view')?.addEventListener('click',function(){
            viewDetailsOfEmployee(ele.emp_no,'View')
        });
        document.getElementById(ele.emp_no+'delete')?.addEventListener('click',function(){
            deleteEmployeeById(ele.emp_no);
        })
    }
}

function initialize() {
    showRows(employData);
    setCharacters();
    selectedCharactersStatus();
    setDefaultJoinDate();
    showContent('employeeData');
    for (let str of sideBarContent) {
        document.getElementById(str)?.addEventListener('click', function () {
            showContent(str.substring(0, str.length - 1));
        });
    }

    for (let str of inputValidateArray) {
        (document.getElementById(str) as HTMLInputElement).addEventListener('focusin', () => {
            console.log('ok');
            sendInputToValidate(str);
        });
    }
    for (let character = 65; character <= 90; character++) {
        let requiredCharacter = String.fromCharCode(character);
        let tempChar = 'char_' + requiredCharacter;
        document.getElementById(tempChar)?.addEventListener('click', function () {
            applyAllFilters(requiredCharacter);
        });
    }

    document.getElementById("filterReset")?.addEventListener('click', ()=> {
        document.getElementById('deleteButton')!.style.backgroundColor = "#F89191";
        document.getElementById('resetApplyContainer')!.style.display = 'none';
        document.getElementById('selectStatus')!.innerHTML = `Status<img src="./Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
        document.getElementById('selectDepartment')!.innerHTML = `Department<img src="/Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
        document.getElementById('selectLocation')!.innerHTML = `Location<img src="/Images/Table/caret-down-bold.svg" class="caret-down-filter">`;
        let sta = document.getElementsByClassName("status") as HTMLCollectionOf<HTMLInputElement>;
        let loc = document.getElementsByClassName("location") as HTMLCollectionOf<HTMLInputElement>;
        let dep = document.getElementsByClassName("department") as HTMLCollectionOf<HTMLInputElement>;
        for (let val of sta) {
            if (val.checked === true) val.checked = false;
        }
        for (let val of loc) {
            if (val.checked === true) val.checked = false;
        }
        for (let val of dep) {
            if (val.checked === true) val.checked = false;
        }
        for (let val in filetersSelectedFor) filetersSelectedFor[val] = false;
        applyAllFilters();
    });
    document.getElementById("searchLogo")?.addEventListener('click', ()=> {
        const val = (document.getElementById("searchEmployeeWithName") as HTMLInputElement).value.toUpperCase();
        const arrayOnSearch = arrayForSelectedFilters;
        const lengthOfVal = val.length;
        const arrayResult = arrayOnSearch.filter(function (ele) {
            for (let start = 0; start < ele.user.length - lengthOfVal + 1; start++) {
                if (ele.user.substring(start, start + lengthOfVal).toUpperCase() === val) return true;
            }
            return false;
        });
        showRows(arrayResult);
    });
    document.getElementById('excelFile')?.addEventListener('click', () => {
        exportDataToexcel();
    });

    document.getElementById('csvFile')?.addEventListener('click', ()=> {
        exportDataToCSV();
    });
    // It minimizes and maximizes side bar
    document.getElementById("contentMinimize")?.addEventListener('click', ()=> {
        document.getElementById("hideSideBar")!.style.display = "none";
        document.getElementById('showSideBar')!.style.display = "block";
    });
    document.getElementById("contentMaximize")?.addEventListener('click',  ()=> {
        document.getElementById("hideSideBar")!.style.display = "flex";
        document.getElementById('showSideBar')!.style.display = "none";
    })
    document.getElementById("changeCharFilter")?.addEventListener('click', ()=> {
        resetCharFilter();
    });
    // Event listener for status filter
    document.getElementById("selectStatus")!.addEventListener('click', function (event) {
        const statusDisplay = document.getElementById("statusDisplay")!;
        statusDisplay.style.display = filetersSelectedFor[0] ? 'none' : 'block';
        filetersSelectedFor[0] = !filetersSelectedFor[0];
        event.stopPropagation();
    });
    // Event listener for location filter
    document.getElementById("selectLocation")!.addEventListener('click', function (event) {
        const locationDisplay = document.getElementById("locationDisplay")!;
        locationDisplay.style.display = filetersSelectedFor[1] ? 'none' : 'block';
        filetersSelectedFor[1] = !filetersSelectedFor[1];
        event.stopPropagation();
    });
    // Event listener for department filter
    document.getElementById("selectDepartment")!.addEventListener('click', function (event) {
        const departmentDisplay = document.getElementById("departmentDisplay")!;
        departmentDisplay.style.display = filetersSelectedFor[2] ? 'none' : 'block';
        filetersSelectedFor[2] = !filetersSelectedFor[2];
        event.stopPropagation();
    });

    document.getElementById("filterApply")?.addEventListener('click', function () {
        applyAllFilters();
    });

    document.getElementById("deleteButton")?.addEventListener('click', function () {
        deleteEmployee();
    });

    document.getElementById("checkAllEmployees")?.addEventListener('click', function () {
        selectAllEmployees();
    });

    let ArrayToSort = ['userSort', 'locSort', 'depSort', 'roleSort', 'emp_noSort', 'statusSort', 'join_dtSort'];
    for (let ele of ArrayToSort) {
        let str = ele.substring(0, ele.length - 4)
        document.getElementById(ele)?.addEventListener('click', function () {
            // sortTable(str);
            console.log(str);
        });
    }

    document.getElementById('dob')?.addEventListener('click', function () {
        setDobPlaceholder();
    })
    // Event listeners for filter checkboxes
    for (let val of tempArray) {
        let k = document.getElementById(val) as HTMLInputElement;
        k.addEventListener('click', function (event) {
            if (k.checked) {
                document.getElementById("resetApplyContainer")!.style.display = 'flex';
                countChecked += 1;
            }
            else {
                countChecked -= 1;
                if (countChecked === 0) document.getElementById("resetApplyContainer")!.style.display = 'none';
            }
            event.stopImmediatePropagation();
        })
    }

    // Event listener for export options button
    document.getElementById("exportOptionsButton")!.addEventListener("click", function (event) {
        const exportData = document.getElementById('exportData')!;
        exportData.style.display = showExportBtn ? 'none' : 'flex';
        showExportBtn = !showExportBtn;
        event.stopPropagation();
    });

    // Event listener for body click
    document.getElementById('wholeBody')!.addEventListener('click', function (event) {
        const statusDisplay = document.getElementById("statusDisplay")!;
        statusDisplay.style.display = 'none';
        filetersSelectedFor[0] = false;
        const locationDisplay = document.getElementById("locationDisplay")!;
        locationDisplay.style.display = 'none';
        filetersSelectedFor[1] = false;
        const departmentDisplay = document.getElementById("departmentDisplay")!;
        departmentDisplay.style.display = 'none';
        filetersSelectedFor[2] = false;
        const exportData = document.getElementById('exportData')!;
        exportData.style.display = 'none';
        showExportBtn = false;
        for (const ele of employData) {
            document.getElementById('show'+ele.emp_no)!.style.display = "none";
        }
        event.stopImmediatePropagation();
    });
    let updatePIcEvent = document.getElementById('employPic')!;
    document.getElementById('employPic')!.addEventListener('change', function (event) {
        let ele = (updatePIcEvent as HTMLInputElement)?.files?.[0];
        let reader = new FileReader();
        reader.onload = function () {
            (document.getElementById("updatePic") as HTMLImageElement).src = reader.result as string;
        };
        if (ele instanceof File) {
            reader.readAsDataURL(ele);
        } else {
            console.error("Invalid file selected");
        }

    });

    document.getElementById("addEmployeeForm")!.addEventListener("submit", function (event) {
        event.preventDefault();
        let obj: any = {};
        let anyIssues = false;
        obj.pic = (document.getElementById("updatePic") as HTMLImageElement).src;
        obj.empNo = (document.getElementById('empNo') as HTMLInputElement).value;
        let emp = document.getElementById('formSubmit')!;
        if (obj.empNo === "") {
            checkForRequiredField('errorEmpNo');
            anyIssues = true;
        }
        else if (emp.innerHTML === 'Add Employee') {
            let employData = JSON.parse(localStorage.getItem('arr')!);
            employData.forEach((element: any) => {
                if (element.emp_no === obj.empNo) {
                    let ele = document.getElementById('errorEmpNo')!;
                    ele.innerHTML = 'This Employee ID is already Exist .';
                    ele.classList.add('error-message');
                    anyIssues = true;
                    return;
                }
            });
        }
        obj.fName = (document.getElementById('fName') as HTMLInputElement).value;
        if (obj.fName === "") {
            checkForRequiredField('errorFirstName');
            anyIssues = true;
        }
        obj.lName = (document.getElementById('lName') as HTMLInputElement).value;
        if (obj.lName === "") {
            checkForRequiredField('errorLastName');
            anyIssues = true;
        }
        obj.dob = (document.getElementById('dob') as HTMLInputElement).value;
        obj.email = (document.getElementById('email') as HTMLInputElement).value;
        if (obj.email === "") {
            checkForRequiredField('errorEmail');
            anyIssues = true;
        }
        obj.mobileNo = (document.getElementById('mobileNo') as HTMLInputElement).value;
        if (obj.mobileNo === "") {
            checkForRequiredField('errorMobileNo');
            anyIssues = true;
        }
        obj.joinDate = (document.getElementById('joinDate') as HTMLInputElement).value;
        obj.loc = (document.getElementById('loc') as HTMLInputElement).value;
        obj.jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
        obj.dep = (document.getElementById('dep') as HTMLInputElement).value;
        (document.getElementById('empNo') as HTMLInputElement).disabled = false;
        if (!anyIssues) {
            addEmployeeToDB(obj);
            if (emp.innerHTML === 'Update') alert('Employee Updated Successfully !');
            else alert("Employee Added Successfully !");
            emp.innerHTML = 'Add Employee';
            let employData = JSON.parse(localStorage.getItem('arr')!);
            showRows(employData);
            setDefaultJoinDate();
            showContent('employeeData');
            (document.getElementById('updatePic') as HTMLImageElement).src = "./Images/Table/download.jpg";
        }
    });

    document.getElementById('cancelDataSubmit')!.addEventListener('click', function (event) {
        event.preventDefault();
        (document.getElementById('addEmployeeForm') as HTMLFormElement).reset();
        setDefaultJoinDate();
        (document.getElementById('empNo') as HTMLInputElement).disabled = false;
        showContent('employeeData');
    });

    document.getElementById('addEmployeeForm')!.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });   
}
// Calling initialize function
initialize();