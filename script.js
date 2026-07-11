const employee_add_btn = document.getElementById("employee_add");
const add_employee_section = document.getElementById("add_employee_form");
const add_employee_form = document.getElementById("employee_form");
const hamburger_btn = document.getElementById("hamburger_btn");
const aside = document.querySelector("aside");
const aside_buttons = document.querySelectorAll(".aside-btn");

employee_add_btn.addEventListener("click", function() {
    add_employee_section.style.display = "flex";
})

const employee_close_btn = document.getElementById("cancel-btn");
employee_close_btn.addEventListener("click", function(){
    add_employee_section.style.display = "none";
})

if (hamburger_btn && aside) {
    hamburger_btn.addEventListener("click", function() {
        aside.classList.toggle("open");
        document.body.classList.toggle("menu-open");
    });

    aside_buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            if (window.innerWidth <= 430) {
                aside.classList.remove("open");
                document.body.classList.remove("menu-open");
            }
        });
    });

    document.addEventListener("click", function(event) {
        if (window.innerWidth <= 430 && aside.classList.contains("open") && !aside.contains(event.target) && !hamburger_btn.contains(event.target)) {
            aside.classList.remove("open");
            document.body.classList.remove("menu-open");
        }
    });

    window.addEventListener("resize", function() {
        if (window.innerWidth > 430) {
            aside.classList.remove("open");
            document.body.classList.remove("menu-open");
        }
    });
}

add_employee_form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(add_employee_form);
    const data = {
        name: formData.get("name")?.toString().trim() || "",
        role: formData.get("role")?.toString().trim() || "",
        department: formData.get("department")?.toString().trim() || "",
        email: formData.get("email")?.toString().trim() || "",
        date_of_joining: formData.get("date_of_joining")?.toString() || ""
    };

    fetch("http://127.0.0.1:8000/api/add_employee", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        const text = await response.text();
        let responseData = {};

        try {
            responseData = text ? JSON.parse(text) : {};
        } catch (error) {
            responseData = { raw: text };
        }

        if (!response.ok) {
            throw new Error(response.status + ": " + JSON.stringify(responseData));
        }

        return { responseData, ok: response.ok };
    })
    .then(({ responseData, ok }) => {
        const message = responseData.message || responseData.detail || responseData.error || "";
        const isSuccess = ok || responseData.success === true || /success/i.test(message);

        if (isSuccess) {
            alert("Employee added successfully!");
            add_employee_section.style.display = "none";
            add_employee_form.reset();
        } else {
            alert("Error adding employee: " + (message || JSON.stringify(responseData)));
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while adding the employee.");
    });
});