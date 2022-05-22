const profilePhoto = document.querySelector(".photo .circle");
const advice = document.querySelector(".advice-text");
const clock = document.querySelector("#clock");
const body = document.querySelector("body");
const logout = document.querySelector("#logout");
const HIDDEN_CLASSNAME = "hidden";
const bgCount = 11;
const bg = Math.floor(Math.random() * bgCount) + 1;

window.addEventListener("load", function () {
	login();
	setClock();
	getCurrentTime();
	getAdvice();
	logout.addEventListener("click", function () {
		const checkLogout = confirm("Are you sure logout?");
		if (checkLogout) {
			sessionStorage.clear();
			location.reload();
		}
	});
	body.style.background = `url(./img/${bg}.jpg)no-repeat center / 100% 100vh`;
});
function getAdvice() {
	fetch("https://api.adviceslip.com/advice")
		.then((response) => response.json())
		.then((data) => (advice.innerText = data.slip.advice));
}
