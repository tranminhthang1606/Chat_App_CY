const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
//
const btnSignIn = document.querySelector("#signIn-btn");
const emailSignIn = document.getElementById("emailSignIn");
const passwordSignIn = document.getElementById("passwordSignIn");
//
const emailSignUp = document.querySelector("#email");
const nameSignUp = document.getElementById("nameSignUp");
const passwordSignUp = document.querySelector("#passwordSignUp");
const btnSignUp = document.getElementById("signUp-btn");
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// error
function showError(inputElement, message) {
  let errorSpan = inputElement.nextElementSibling;

  if (!errorSpan || !errorSpan.classList.contains("error-message")) {
    errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message", "text-red-500", "text-sm");
    inputElement.insertAdjacentElement("afterend", errorSpan);
  }

  errorSpan.textContent = message;
}
function clearError(inputElement) {
  const errorSpan = inputElement.nextElementSibling;
  if (errorSpan && errorSpan.classList.contains("error-message")) {
    errorSpan.textContent = "";
  }
}

const url = "http://127.0.0.1:8000/api";
//http://127.0.0.1:8000 http://192.168.1.183:8000/api/user
// sigup
btnSignUp.addEventListener("click", async (e) => {
  e.preventDefault();
  clearError(nameSignUp);
  clearError(emailSignUp);
  clearError(passwordSignUp);
  let isValid = true;
  if (nameSignUp.value.trim() === "") {
    showError(nameSignUp, "Name cannot be empty.");
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailSignUp.value.trim() === "") {
    showError(emailSignUp, "Email cannot be empty.");
    isValid = false;
  } else if (!emailPattern.test(emailSignUp.value.trim())) {
    showError(emailSignUp, "Invalid email format.");
    isValid = false;
  }

  if (passwordSignUp.value.trim() === "") {
    showError(passwordSignUp, "Password cannot be empty.");
    isValid = false;
  } else if (passwordSignUp.value.length < 6) {
    showError(passwordSignUp, "Password must be at least 6 characters.");
    isValid = false;
  }
  if (isValid) {
    try {
      const res = await fetch(url + '/user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameSignUp.value,
          email: emailSignUp.value.trim(),
          password: passwordSignUp.value.trim(),
        }),
      });
      const data = await res.json();
      console.log(data);

      fetch(url + '/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: null, // Nếu là chat 1-1, để trống name
          user_id: data.user.id,
        })
      }).then(response => response.json())
        .then(data => {
          console.log(data);
          
        })
        .catch(error => {
          console.error('Lỗi:', error);
        });
      console.log("Đăng ký thành công:", data);
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
    }
  }
});

// Đăng Nhập
btnSignIn.addEventListener("click", async (e) => {
  e.preventDefault();
  clearError(emailSignIn);
  clearError(passwordSignIn);
  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailSignIn.value.trim() === "") {
    showError(emailSignIn, "Email cannot be empty.");
    isValid = false;
  } else if (!emailPattern.test(emailSignIn.value.trim())) {
    showError(emailSignIn, "Invalid email format.");
    isValid = false;
  }

  if (passwordSignIn.value.trim() === "") {
    showError(passwordSignIn, "Password cannot be empty.");
    isValid = false;
  } else if (passwordSignIn.value.length < 6) {
    showError(passwordSignIn, "Password must be at least 6 characters.");
    isValid = false;
  }
  if (isValid) {
    try {
      const response = await fetch(url + '/user', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const users = await response.json();
      const user = users.find(
        (user) =>
          user.email === emailSignIn.value.trim() &&
          user.password === passwordSignIn.value.trim()
      );
      if (user) {
        console.log("Đăng nhập thành công:", user);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "./html/main.html"; // Redirect to dashboard page
      } else {
        alert("Tài khoản không tồn tại hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  }


});
