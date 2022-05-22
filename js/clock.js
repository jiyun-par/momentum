function getCurrentTime() {
	setInterval(setClock, 1000);
}

function setClock() {
	const today = new Date();
	let hours = String(today.getHours()).padStart(2, "0");
	let minutes = String(today.getMinutes()).padStart(2, "0");
	let seconds = String(today.getSeconds()).padStart(2, "0");
	let day = today.getDay();
	let dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	clock.innerText = `${hours} : ${minutes} : ${seconds} ${dayName[day]}`;
}
