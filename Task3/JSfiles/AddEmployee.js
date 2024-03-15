let isSideBarMinimized = false;

let contentDisplay = ['employeeData','roles','roleDescription','addEmployeeForm','addRole'];

function showContent(choice){
    for(let show of contentDisplay){
        if(choice === show) {
            document.getElementById(show).classList.remove('hideThis');
            document.getElementById(show).classList.add('displayThis');
        }
        else document.getElementById(show).classList.add('hideThis');
    }
}

let validationSource = {
    employId: ['empNo', 'errorEmpNo', /^TZ[0-9]{6}$/, "Emp No must be in this type 'TZ000000' ."],
    firstName: ['fName', 'errorFirstName', /^[a-zA-z]{2,9}$/, ' Name must be 2 to 9 alphabets .'],
    lastName: ['lName', 'errorLastName', /^[a-zA-z]{2,9}$/, ' Name must be 2 to 9 alphabets .'],
    email: ['email', 'errorEmail', /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid Email Format .'],
    mobileNo: ['mobileNo', 'errorMobileNo', /^[1-9]{1}[0-9]{9}$/, 'Enter valid number .'],
    joinDate: ['joinDate','errorJoinDate',/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[2-9]{1}[0-9]{3}$/,'Enter date correctly .']
}

//It minimizes and maximizes side bar
function minimizeMaximizeSideBar() {
    if (!isSideBarMinimized) {
        isSideBarMinimized = true;
        document.getElementById("hideSideBar").style.display = "none";
        document.getElementById('showSideBar').style.display = "block";
    }
    else {
        document.getElementById("hideSideBar").style.display = "flex";
        document.getElementById('showSideBar').style.display = "none";
        isSideBarMinimized = false;
    }
}


//It set default Date for Join date
function setDefaultJoinDate() {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear();
    let showDate = "";
    if (dd < 10) showDate += '0' + dd.toString() + '/';
    else showDate += dd.toString() + '/';
    if (mm < 10) showDate += '0' + mm.toString() + '/';
    else showDate += mm.toString() + '/';
    showDate += yy.toString();
    let ele = document.getElementById('joinDate');
    ele.placeholder = showDate;
    ele.value = showDate;
}

//EventListener for submit button
function checkForRequiredField(errorAt) {
    let error = document.getElementById(errorAt);
    error.innerHTML = `<img src="../Images/Table/warning-diamond-fill.svg"> This field is required`;
    error.classList.add('error-message');
    return;
}

//It sends the validation source to validateInput function
function sendInputToValidate(inputId) {
    let tempArray = validationSource[inputId];
    validateInput(tempArray[0], tempArray[1], tempArray[2], tempArray[3]);
}

// It validate the input given by user
function validateInput(inputId, inputerrorId, pattern, errorMessage) {
    let ele = document.getElementById(inputId);
    ele.addEventListener('blur', function (event) {
        event.preventDefault();
        let val = ele.value;
        let error = document.getElementById(inputerrorId);
        if (val === "") {
            error.innerHTML = `<img src="../Images/Table/warning-diamond-fill.svg"> This field is required`;
        }
        else {
            if (!pattern.test(val)) {
                error.innerHTML = `<img src="../Images/Table/warning-diamond-fill.svg"> ${errorMessage}`;
            }
            else {
                error.innerHTML = '';
            }
        }
        error.classList.add('error-message');
    });
}

//Add's the Employee information to main Data 
function addEmployeeToDB(newEmployee) {
    let arr = JSON.parse(localStorage.getItem('arr'));
    let obj = new Object();
    obj.pic = document.getElementById("updatePic").src;
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
    for(let ele in arr){
        if(arr[ele].emp_no === obj.emp_no){
            anyDuplicate =true;
            delete arr[ele];
            arr[ele] = obj;
            break;
        }
    }
    if(! anyDuplicate) arr.push(obj);
    localStorage.setItem('arr', JSON.stringify(arr));
    document.getElementById('addEmployeeForm').reset();
}

//Sets the DOB of a employee 
function setDobPlaceholder() {
    let ele = document.getElementById('dob').value;
    let changedDate = document.getElementById('changeDob');
    changedDate.value = ele;
}

//It initializes the Required functions and events
function initialize() {
    let updatePIcEvent = document.getElementById('employPic');
    document.getElementById('employPic').addEventListener('change',function(event){
        let ele = updatePIcEvent.files[0];
        let reader = new FileReader();
        reader.onload = function(){
            document.getElementById("updatePic").src=reader.result;
        }
        reader.readAsDataURL(ele);
    });

    document.getElementById("addEmployeeForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let obj = new Object();
        let anyIssues = false;
        obj.pic = document.getElementById("updatePic").src;
        obj.empNo = document.getElementById('empNo').value;
        let emp = document.getElementById('formSubmit');
        if (obj.empNo === "") {
            checkForRequiredField('errorEmpNo');
            anyIssues = true;
        }
        else if(emp.innerHTML === 'Add Employee') {
            let employData = JSON.parse(localStorage.getItem('arr'));
            employData.forEach(element => {
                if(element.emp_no === obj.empNo){
                    let ele = document.getElementById('errorEmpNo');
                    ele.innerHTML='This Employee ID is already Exist .';
                    ele.classList.add('error-message');
                    anyIssues = true;
                    return;
                }
            });
        }
        obj.fName = document.getElementById('fName').value;
        if (obj.fName === "") {
            checkForRequiredField('errorFirstName');
            anyIssues = true;
        }
        obj.lName = document.getElementById('lName').value;
        if (obj.lName === "") {
            checkForRequiredField('errorLastName');
            anyIssues = true;
        }
        obj.dob = document.getElementById('dob').value;
        obj.email = document.getElementById('email').value;
        if (obj.email === "") {
            checkForRequiredField('errorEmail');
            anyIssues = true;
        }
        obj.mobileNo = document.getElementById('mobileNo').value;
        if (obj.mobileNo === "") {
            checkForRequiredField('errorMobileNo');
            anyIssues = true;
        }
        obj.joinDate = document.getElementById('joinDate').value;
        obj.loc = document.getElementById('loc').value;
        obj.jobTitle = document.getElementById('jobTitle').value;
        obj.dep = document.getElementById('dep').value;
        // obj.manager = document.getElementById('manager').value;
        // obj.proj = document.getElementById('proj').value;
        document.getElementById('empNo').disabled = false;
        if (!anyIssues) {
            addEmployeeToDB(obj);
            if(emp.innerHTML === 'Update') alert('Employee Updated Successfully !');
            else alert("Employee Added Successfully !");
            emp.innerHTML = 'Add Employee';
            let employData = JSON.parse(localStorage.getItem('arr'));
            showRows(employData);
            setDefaultJoinDate();
            showContent('employeeData');
            document.getElementById('updatePic').src = "./Images/Table/download.jpg";
        }
    });

    document.getElementById('cancelDataSubmit').addEventListener('click',function(event){
        event.preventDefault();
        document.getElementById('addEmployeeForm').reset();
        setDefaultJoinDate();
        empNo.disabled = false;
        showContent('employeeData');
    });
    
    document.getElementById('addEmployeeForm').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    setDefaultJoinDate();
    showContent('employeeData');
}

initialize();