// Hardcoded admin credentials (You can use a backend for security)
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

// Function to handle login
function login() {
    let username = document.getElementById("admin-username").value;
    let password = document.getElementById("admin-password").value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        alert("Login successful!");
        document.getElementById("login-container").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
        localStorage.setItem("isAdmin", "true"); // Store session
    } else {
        alert("Invalid credentials! Please try again.");
    }
}

// Function to check if the admin is already logged in
window.onload = function () {
    if (localStorage.getItem("isAdmin") === "true") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
    }
};

// Function to log out
function logout() {
    localStorage.removeItem("isAdmin");
    document.getElementById("admin-panel").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}