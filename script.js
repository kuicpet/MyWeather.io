const form = document.querySelector('.form');
const input = document.querySelector('.form-control');
const msg = document.querySelector('.msg');
const list = document.querySelector('.cities');
const apiKey = "88a6af7f63b548fda6d8de54338f3369";

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputVal = input.value;

    //Checkif there is already a City
    const listItems = list.querySelectorAll('.ajax-section .city');
    const listItemsArray = Array.from(listItems);
    if(listItemsArray.length >0){
        const filteredArray = listItemsArray.filter((el) => {
            let content = "";
            if(inputVal.includes(",") ){
                if(inputVal.split(",")[1].length > 2){
                    inputVal = inputVal.split(",")[0];
                    content = el.querySelector('.city-name span')
                    .textContent.toLowerCase();
                } else {
                    content = el.querySelector('.city-name').dataset.name.toLowerCase();
                }
            } else {
                content = el.querySelector('.city-name span').textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });
        if(filteredArray.length > 0){
            msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent}...
            Otherwise be more specific by adding a country code as well.`;
            form.reset();
            input.focus;
            return; 
        }
    }

    //Ajax
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const { main, name, sys, weather} = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
            weather[0]["icon"]
          }.svg`;
        const li = document.createElement('li');
        li.classList.add('city');
        const markup = `<h2 class ="city-name" data-name = "${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure><img class="city-icon" src="${icon}" alt="${weather[0]['description']}"
        <figcaption>${weather[0]["description"]}</figcaption></figure>`;
        li.innerHTML = markup;
        list.appendChild(li);
    })
    .catch(() => {
        msg.textContent = "please search for a Valid City!";
    });
    msg.textContent = "";
    form.reset();
    input.focus();
});




