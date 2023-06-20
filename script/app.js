let $form = document.querySelector("#frmAge")

function validateDay (day) {
    if(day.length === 0) {
        return {
            'error': true,
            'msg': 'This field is required'
        }
    } 
    
    if(Number(day) > 31 || Number(day) < 1) {
        return {
            'error': true,
            'msg': 'Day will be from 1 to 31'
        }
    }
}

function validateMonth (month ) {
    if(month.length === 0) {
        return {
            'error': true,
            'msg': 'This field is required'
        }
    } 
    
    if(Number(month) > 12 || Number(month) < 1) {
        return {
            'error': true,
            'msg': 'Month will be from 1 to 12'
        }
    }
}


$form.addEventListener("submit", (e) => {
    e.preventDefault();
    let $inpDay = e.target.querySelector("input[name='day']");
    let $inpMonth = e.target.querySelector("input[name='month']");
    let $inpYear = e.target.querySelector("input[name='year']");
    let error = false;

    if(validateDay($inpDay.value).error) {
        let dataError = validateDay($inpDay.value);
        error = true;
        $inpDay.nextElementSibling.textContent = dataError.msg;
        $inpDay.classList.add("error");
        $inpDay.nextElementSibling.classList.remove("d-none");
    } 
    
    if (validateMonth($inpMonth.value).error) {
        let dataError = validateMonth($inpMonth.value);
        console.log(dataError);
        error = true;
        $inpMonth.classList.add("error");
        $inpMonth.nextElementSibling.textContent = dataError.msg;
        $inpMonth.nextElementSibling.classList.remove("d-none");
    }

    if(error === false) {
        error = false;
        console.log('hola');
        console.log(error);
    }
});