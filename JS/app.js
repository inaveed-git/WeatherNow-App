console.log("working ");

let main = document.querySelector(".main");
let search = document.querySelector("#search");

let getWeather = async (city) => {
  try {
    container.innerHTML = "";
    main.innerHTML = "";

    let loader_container = document.createElement("div");
    loader_container.classList.add("loader-container");
    loader_container.innerHTML = `
        <div class="loader"></div>
        <p>Loading...</p>
    `;

    main.appendChild(loader_container);

    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95364f871dfdb7c2a4e579cfbf0d5b21&units=metric`
    );
    let data = await res.json();

    loader_container.style.display = "none";

    return showWeather(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

let container = document.createElement("div");
let showWeather = (weather) => {
  main.innerHTML = "";

  if (weather.cod == "404") {
    search.classList.add("searchHide");

    container.classList.add("hide");
    container.innerHTML = `
    <div class="sun"></div>
    <div class="cloud"></div>
    <h1>404</h1>
    <p>Weather Not Found</p>
    `;

    main.appendChild(container);
    return;
  }

  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="">
    <div class="wetherdetails">
        <h1>${weather.main.temp}<span> °C<sup></h1>
        <h2>${weather.weather[0].main}</h2>
    </div>
    `;
  main.appendChild(card);
};

getWeather("london");

search.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    getWeather(search.value);
  }
});
