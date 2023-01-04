const $ = document
const searchInput = $.querySelector(".search-box")
const mainContainer = $.querySelector("main")
let cityElem = $.querySelector(".city")
let dateElem = $.querySelector(".date")
let tempElem = $.querySelector(".temp")
let weatherElem = $.querySelector(".weather")
let hi_LowElem = $.querySelector(".hi-low")

const fetchURL = "http://api.weatherstack.com/current?access_key="
let cityName = null
const apiKey = "bf2a9580b7c71ddedcea83a6c9861925"

searchInput.addEventListener("keyup", event =>{
	let {keyCode, target:input} = event
	if(keyCode === 13){
		cityName = input.value
		weatherData(cityName)
	}
})

function weatherData(CityName) {
	fetch(`${fetchURL}${apiKey}&query=${CityName}`)
		.then(res => res.json())
		.then(cityData => {
		 	console.log(cityData)
			cityElem.innerHTML = `${cityData.location.name}, ${cityData.location.country}`
		 	dateElem.innerHTML = mainDate()
		 	
		 	tempElem.innerHTML = `${cityData.current.temperature}<span>°c</span>`
		 	weatherElem.innerHTML = `${cityData.current.weather_descriptions[0]}<img src="${cityData.current.weather_icons[0]}" alt="weather_icon" title="${cityData.current.weather_descriptions[0]}">`
		 	
		 	hi_LowElem.innerHTML = `${cityData.current.temperature}°c / ${cityData.current.feelslike}°c`
		})
		.catch(err => alert("city not found"))
}

function mainDate() {
	let weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	let localDate = new Date()
	let day = localDate.getDate()
	let week =  weekArray[localDate.getDay()]
	let month = monthArray[localDate.getMonth()]
	let year = localDate.getFullYear()
	return `${week} ${day} ${month} ${year}`
}
