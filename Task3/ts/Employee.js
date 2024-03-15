"use strict";
let employData = JSON.parse(localStorage.getItem('arr') || '[]');
let filteredCharStatus = {};
let selectedCharCount = 0;
let arrayForSelectedFilters = Array.from(employData);
let charArrayForTable = Array.from(employData);
let deleteElementsArray = [];
let deletingElementsCount = 0;
let isAllEmployeesSelected = false;
let isCharFiltersReseted = true;
let filetersSelectedFor = [false, false, false];
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
