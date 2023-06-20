let $form = document.querySelector("#frmAge");
let $dayObjectiveInp = document.querySelector("#dayObjective")
let $monthObjectiveInp = document.querySelector("#monthObjective")
let $yearObjectiveInp = document.querySelector("#yearObjective")

function validateDay (day) {
    if(day.length === 0) return {'status': true, 'msg': 'This field is required'} 
    
    if(Number(day) > 31 || Number(day) < 1) return {'status': true, 'msg': 'Day must be from 1 to 31'}
}

function validateMonth (month ) {
    if(month.length === 0) return {'status': true, 'msg': 'This field is required'}

    if(Number(month) > 12 || Number(month) < 1) return {'status': true, 'msg': 'Month must be from 1 to 12'}
}

function validateYear (year) {
    let curr_date = new Date();
    let curr_year = curr_date.getFullYear();

    if(year.length === 0) return {'status': true, 'msg': 'This field is required'}

    if(Number(year) > curr_year) return {'status': true,'msg': 'Year must be in the past'}
}

function getDaysInMonth (year, month) {
    return new Date(year, month, 0).getDate()
}

function validateDate (day, month, year) {
    if(Number(day.value) > getDaysInMonth(year.value, month.value)) {
        return [
            {'status': true, 'msg': 'Must be a valid date', input: day},
            {'status': true, 'msg': '', input: month},
            {'status': true, 'msg': '', input: year}
        ]
    }
}

const getFirstParent = (htmlElement) => htmlElement.parentElement

const getSiblingElement = (htmlElement) => htmlElement.nextElementSibling

const showError = (msg, inputHTML) => {
    let parent = getFirstParent(inputHTML);
    let sibling = getSiblingElement(inputHTML);
    parent.classList.add("error");
    sibling.textContent = msg;
    sibling.classList.remove("d-none")
}

const resetError = (arrInputs) => {
    arrInputs.forEach((input) => {
        let parent = input.parentElement;
        let sibling = input.nextElementSibling;
        sibling.textContent = "";
        sibling.classList.add("d-none")
        parent.classList.remove("error");
    })
}

const getDifferenceTime = (date = "1970-01-01") => {
    const YEAR_UNIVERSAL_COMPUTER = 1970;
    const now = new Date();
    const birthday = new Date(date);
    let parseTime = new Date(Math.abs(now - birthday));

    return {
        'years': parseTime.getUTCFullYear() - YEAR_UNIVERSAL_COMPUTER,
        'months': parseTime.getUTCMonth(),
        'days': parseTime.getUTCDay(),
    }
}


$form.addEventListener("submit", (e) => {
    e.preventDefault();
    let $inpDay = e.target.querySelector("input[name='day']");
    let $inpMonth = e.target.querySelector("input[name='month']");
    let $inpYear = e.target.querySelector("input[name='year']");
    let errors = [];

    if(validateDay($inpDay.value)) errors.push({...validateDay($inpDay.value), input: $inpDay})
    
    if (validateMonth($inpMonth.value)) errors.push({...validateMonth($inpMonth.value), input: $inpMonth})

    if(validateYear($inpYear.value)) errors.push({...validateYear($inpYear.value), input: $inpYear})

    if( validateDay($inpDay.value) == undefined
        && validateMonth($inpMonth.value) == undefined
        && validateYear($inpYear.value) == undefined 
        && validateDate($inpDay, $inpMonth, $inpYear)) errors.push(...validateDate($inpDay, $inpMonth, $inpYear))

    if(errors.length > 0){
        for (const error of errors) {
            showError(error.msg, error.input)
        }
    } else { 
        const {years, months, days} = getDifferenceTime(`${$inpYear.value}-${$inpMonth.value}-${$inpDay.value}`);
        resetError([$inpDay, $inpMonth, $inpYear]);
        $yearObjectiveInp.textContent = years;
        $monthObjectiveInp.textContent = months;
        $dayObjectiveInp.textContent = days;
    }
});