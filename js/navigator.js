const API_KEY = "85e24aff1478aee31379ddaea1a52ac8";
const locateText = document.querySelector(".locate");
const loading = document.querySelector(".loading");
const weatherStatus = document.querySelector(".status");
const weatherIcon = document.querySelector(".weather-icon");
const currentTemp = document.querySelector(".current-temp");
const minMaxTemp = document.querySelector(".min-max-temp");

navigator.geolocation.getCurrentPosition(onGeoSucess, onGeoError);

function onGeoSucess(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			loading.innerText = "";
			const location = data.name;
			const temp = Math.floor(data.main.temp);
			const maxTemp = Math.floor(data.main.temp_max);
			const minTemp = Math.floor(data.main.temp_min);
			const status = data.weather[0].main;

			const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
			weatherStatus.innerText = status;
			weatherIcon.setAttribute("src", icon);
			locateText.innerText = location;
			currentTemp.innerText = `${temp} °C`;
			minMaxTemp.innerHTML = `Max ${maxTemp} °C <br> Min ${minTemp} °C`;
		});
}
function onGeoError() {
	alert("Can't find you. No weather for you.");
}
