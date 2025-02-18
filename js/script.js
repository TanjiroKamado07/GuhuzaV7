document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    mobileMenuButton.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});




// Open and Close Modal
const modal = document.getElementById("auth-modal");
const closeModal = document.querySelector(".close");
const signInBtn = document.querySelector(".btn-signin");
const signUpBtn = document.querySelector(".btn-signup");
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const logoutBtn = document.getElementById("logout-btn");

// Open Login Modal
signInBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "flex";

    // Ensure login form is active
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");

    // Set tab active state
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
});

// Open Sign Up Modal
signUpBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "flex";

    // Ensure sign-up form is active
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    // Set tab active state
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
});

// Close modal on "X" click
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Toggle Login and Sign Up Forms
loginTab.addEventListener("click", function () {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");

    // Set tab active state
    this.classList.add("active");
    signupTab.classList.remove("active");
});

signupTab.addEventListener("click", function () {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    // Set tab active state
    this.classList.add("active");
    loginTab.classList.remove("active");
});

// Close Modal on Outside Click
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

async function signupUser() {
    const fullName = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!fullName || !email || !password) {
        showToast("Please fill in all fields!", "error");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            showToast("Signup Successful! 🎉 You can now log in.");
            modal.style.display = "none"; // Close modal after signup
        } else {
            showToast(data.msg || "Signup failed!", "error");
        }
    } catch (error) {
        showToast("Network error. Please try again later.", "error");
    }
}


//  Login User Function
async function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Please enter all fields.");
        return;
    }

    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        updateUI();
        modal.style.display = "none";
    } else {
        alert(data.msg || "Login failed.");
    }
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); // Remove user name on logout
    alert("Logged out successfully!");
    updateUI();
}


//  Update UI Based on Login Status
function updateUI() {
    const token = localStorage.getItem("token");

    if (token) {
        signInBtn.style.display = "none";
        signUpBtn.style.display = "none";
        logoutBtn.classList.remove("hidden");
    } else {
        signInBtn.style.display = "block";
        signUpBtn.style.display = "block";
        logoutBtn.classList.add("hidden");
    }
}

//  Check User Login Status on Page Load
document.addEventListener("DOMContentLoaded", updateUI);


document.addEventListener("DOMContentLoaded", function () {
    updateUI();
});

async function loginUser() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
        showToast("Please enter all fields!", "error");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.user.fullName);
            showToast("Login Successful! 🎉");
            updateUI();
            modal.style.display = "none";
        } else {
            showToast(data.msg || "Login failed!", "error");
        }
    } catch (error) {
        showToast("Network error. Please try again later.", "error");
    }
}


function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    showToast("✅ Logged out successfully! 👋", "success");

    //  Redirect to home page if on advanced, intermediate, or beginner pages
    setTimeout(() => {
        if (
            window.location.pathname.includes("quizindex.html") ||
            window.location.pathname.includes("level.html") ||
            window.location.pathname.includes("intermediate.html") ||
            window.location.pathname.includes("advancedlevel.html")
        ) { 
            window.location.href = "index.html"; // Redirect to home page
        } else {
            updateUI(); // Just update UI if on other pages
        }
    }, 2000); // 2s delay to show toast before redirect
}




function updateUI() {


    console.log("🔄 Running updateUI()"); //  Debugging log
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userNameDisplay = document.getElementById("user-name");

    if (token && userName) {
        if (loginBtn) loginBtn.style.display = "none"; // Hide login button
        if (signupBtn) signupBtn.style.display = "none"; // Hide signup button
        if (logoutBtn) logoutBtn.classList.remove("hidden"); // Show logout button
        
        if (userNameDisplay) {
            userNameDisplay.textContent = `Welcome, ${userName}!`;
            userNameDisplay.style.display = "block"; //  Show username
        }
    } else {
        if (loginBtn) loginBtn.style.display = "block"; // Show login button
        if (signupBtn) signupBtn.style.display = "block"; // Show signup button
        if (logoutBtn) logoutBtn.classList.add("hidden"); // Hide logout button

        if (userNameDisplay) {
            userNameDisplay.textContent = "";
            userNameDisplay.style.display = "none"; //  Hide username
        }
    }
}



async function signupUser() {
    const fullName = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    //  Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address!", "error");
        return;
    }

    // Validate Password Strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        showToast("Password must be at least 8 characters, include an uppercase, lowercase, number, and special character!", "error");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            showToast("Signup Successful! 🎉 You can now log in.");
            modal.style.display = "none"; // Close modal after signup
        } else {
            showToast(data.msg || "Signup failed!", "error");
        }
    } catch (error) {
        showToast("Network error. Please try again later.", "error");
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("auth-modal");
    const closeModal = document.querySelector(".close");
    const signInBtn = document.querySelector(".btn-signin");
    const signUpBtn = document.querySelector(".btn-signup");
    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const logoutBtn = document.getElementById("logout-btn");

    if (signInBtn) {
        signInBtn.addEventListener("click", (event) => {
            event.preventDefault();
            modal.style.display = "flex";
            loginForm.classList.remove("hidden");
            signupForm.classList.add("hidden");
            loginTab.classList.add("active");
            signupTab.classList.remove("active");
        });
    }

    if (signUpBtn) {
        signUpBtn.addEventListener("click", (event) => {
            event.preventDefault();
            modal.style.display = "flex";
            signupForm.classList.remove("hidden");
            loginForm.classList.add("hidden");
            signupTab.classList.add("active");
            loginTab.classList.remove("active");
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (loginTab && signupTab) {
        loginTab.addEventListener("click", function () {
            loginForm.classList.remove("hidden");
            signupForm.classList.add("hidden");
            loginTab.classList.add("active");
            signupTab.classList.remove("active");
        });

        signupTab.addEventListener("click", function () {
            signupForm.classList.remove("hidden");
            loginForm.classList.add("hidden");
            signupTab.classList.add("active");
            loginTab.classList.remove("active");
        });
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    updateUI();
});

function showToast(message, type = "success") {
    let toast = document.createElement("div");
    toast.className = `toast ${type === "error" ? "error" : ""}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}



document.getElementById("signup-password").addEventListener("input", function () {
    const password = this.value;
    const requirements = document.getElementById("password-requirements");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        requirements.style.display = "block";
    } else {
        requirements.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("play-button");

    if (playButton) {
        playButton.addEventListener("click", function (event) {
            const token = localStorage.getItem("token");

            if (!token) {
                event.preventDefault(); //  Stops the link from opening
                showToast("⚠️ You must be logged in to play!", "error"); //  Show a warning
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("play-button");

    if (playButton) {
        playButton.addEventListener("click", function (event) {
            const token = localStorage.getItem("token");

            if (!token) {
                event.preventDefault(); //  Prevents navigation
                showToast("⚠️ You must be logged in to play!", "error"); //  Show a warning
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", updateUI);
