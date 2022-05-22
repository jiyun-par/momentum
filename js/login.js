const loginBox = document.querySelector("#login-box");
const loginForm = document.querySelector("#login-form");
const momentum = document.querySelector("#momentum");
const greeting = document.querySelector("#greeting");
const loginId = loginForm.querySelector("#login-id");
const loginPw = loginForm.querySelector("#login-pw");
const loginButton = loginForm.querySelector("#login-form button");
const registerBtn = document.querySelector("#register");
const popRegister = document.querySelector("#pop-register");
const registerBox = document.querySelector(".register-box");
const registerForm = document.querySelector("#register-form");
const registerId = document.querySelector("#register-form #id");
const registerPw = document.querySelector("#register-form #password");
const resultID = document.querySelector(".result-box");
const confirmBtn = document.querySelector("#confirm");
const dim = document.querySelector("#dim");
const closeRegister = document.querySelector("#close-btn");
const currentTime = new Date().getHours();
let greetingText = "";
if (currentTime >= 6 && currentTime < 12) {
	greetingText = "Good morning";
} else if (currentTime >= 12 && currentTime < 18) {
	greetingText = "Good afternoon";
} else if (currentTime >= 18 && currentTime < 24) {
	greetingText = "Good evening";
} else if (currentTime >= 0 && currentTime < 6) {
	greetingText = "Good dawn";
}

registerForm.addEventListener("submit", handleRegisterInput);
registerBtn.addEventListener("click", handleRegisterClick);
confirmBtn.addEventListener("click", handleConfirmClick);
closeRegister.addEventListener("click", handleCloseClick);
loginForm.addEventListener("submit", handleLogin);
loginButton.addEventListener("click", handleLogin);

function login() {
	const getSession = sessionStorage.getItem("login");
	if (getSession) {
		momentum.classList.remove(HIDDEN_CLASSNAME);
		momentum.style.display = "flex";
		greeting.innerHTML = `${greetingText} <br> ${getSession}`;
	} else {
		loginBox.classList.remove(HIDDEN_CLASSNAME);
	}
}

function handleRegisterClick() {
	popRegister.classList.remove(HIDDEN_CLASSNAME);
	dim.classList.remove(HIDDEN_CLASSNAME);
}

function handleConfirmClick() {
	let IDvalue = registerId.value;
	let Passwordvalue = registerPw.value;

	if (localStorage.getItem(IDvalue)) {
		alert("The ID is already exist! Please write another ID!");
		registerId.value = "";
		registerPw.value = "";
	} else {
		if (IDvalue === "" || IDvalue.trim() === "") {
			alert("It's empty! Please write your ID.");
			return;
		} else {
			localStorage.setItem(
				IDvalue,
				JSON.stringify({ id: IDvalue, pw: Passwordvalue })
			);
			registerBox.classList.add(HIDDEN_CLASSNAME);
			resultID.classList.remove(HIDDEN_CLASSNAME);
			resultID.innerHTML = `Registered your ID <b>"${IDvalue}!"</b><br> Please login.`;
		}
	}
}

function handleCloseClick() {
	registerId.value = "";
	registerPw.value = "";
	popRegister.classList.add(HIDDEN_CLASSNAME);
	dim.classList.add(HIDDEN_CLASSNAME);
	registerBox.classList.remove(HIDDEN_CLASSNAME);
	resultID.classList.add(HIDDEN_CLASSNAME);
	resultID.innerHTML = "";
}

function handleRegisterInput(e) {
	e.preventDefault();
}

function handleLogin(e) {
	e.preventDefault();
	const userName = loginId.value;
	const userPw = loginPw.value;
	const getID = JSON.parse(localStorage.getItem(userName));
	if (localStorage.getItem(userName)) {
		if (getID.id === userName && getID.pw === userPw) {
			setLocalTodo(userName);
			sessionStorage.setItem("login", userName);
			momentum.style.display = "flex";
			momentum.classList.remove(HIDDEN_CLASSNAME);
			loginBox.classList.add(HIDDEN_CLASSNAME);
			greeting.innerHTML = `${greetingText} <br> ${userName}`;
		} else {
			alert("ID or Password is not correct. Please check again!");
			loginId.focus();
		}
	} else {
		alert("The ID is not exist. Please register your ID!");
	}
}
