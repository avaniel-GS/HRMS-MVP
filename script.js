const employee_add_btn = document.getElementById("employee_add");
const add_employee_form = document.getElementById("add_employee_form");
employee_add_btn.addEventListener("click", function() {
    add_employee_form.style.display = "flex";
})

const employee_close_btn = document.getElementById("cancel-btn");
employee_close_btn.addEventListener("click", function(){
    add_employee_form.style.display = "none";
})