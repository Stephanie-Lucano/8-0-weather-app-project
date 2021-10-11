document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const userInput = event.target.location.value
    const url = `https://wttr.in/${userInput}?format=j1`
    fetch(url)
    .then((response) => response.json())
    .then((result) => {
        document.querySelector("#location").value = ""
        const sectionQuickSummary = document.querySelector(".quick-summary")
        const sectionThreeDayForecast = document.querySelector(".three-day-forecast")
        if (sectionQuickSummary && sectionThreeDayForecast) {
            sectionQuickSummary.remove()
            sectionThreeDayForecast.remove()
        }
        document.querySelector(".display").append(quickSummary(result));
        document.querySelector(".display").append(threeDayForecast(result));
        document.querySelector(".history").append(previousSearches(url, userInput, result))
    })
    .catch((error) => {
        console.log(error)
    })
})

function createHeading(description, value) {
    const heading = document.createElement("h3");
    heading.textContent = `${description}: ${value}`
    return heading
}

function quickSummary(result) {
    const rmHeading = document.querySelector(".display h2")
    rmHeading.style.display = "none"

    const section = document.createElement("section")
    section.classList.add("quick-summary")

    const heading = document.createElement("h2");
    heading.textContent = result.nearest_area[0].areaName[0].value;
    section.append(heading)
    
    const area = createHeading("Area", result.nearest_area[0].areaName[0].value)
    section.append(area)

    const region = createHeading("Region", result.nearest_area[0].region[0].value)
    section.append(region)

    const country = createHeading("Country", result.nearest_area[0].country[0].value)
    section.append(country)

    const currently = createHeading("Currently", `Feels Like ${result.current_condition[0].FeelsLikeF}°F`)
    section.append(currently)
    
    return section;
}

function threeDayForecast(result) {
    const section = document.createElement("section")
    section.classList.add("three-day-forecast")

    const today = document.createElement("h2");
    today.textContent = "Today"
    section.append(today)

    const averageTemperature1 = createHeading("Average Temperature", `${result.weather[0].avgtempF}°F`)
    section.append(averageTemperature1)

    const maxTemperature1 = createHeading("Max Temperature", `${result.weather[0].maxtempF}°F`)
    section.append(maxTemperature1)

    const minTemperature1 = createHeading("Min Temperature", `${result.weather[0].mintempF}°F`)
    section.append(minTemperature1)

    const tomorrow = document.createElement("h2");
    tomorrow.textContent = "Tomorrow"
    section.append(tomorrow)

    const averageTemperature2 = createHeading("Average Temperature", `${result.weather[1].avgtempF}°F`)
    section.append(averageTemperature2)

    const maxTemperature2 = createHeading("Max Temperature", `${result.weather[1].maxtempF}°F`)
    section.append(maxTemperature2)

    const minTemperature2 = createHeading("Min Temperature", `${result.weather[1].mintempF}°F`)
    section.append(minTemperature2)

    const dayAfterTomorrow = document.createElement("h2");
    dayAfterTomorrow.textContent = "Day After Tomorrow"
    section.append(dayAfterTomorrow)

    const averageTemperature3 = createHeading("Average Temperature", `${result.weather[2].avgtempF}°F`)
    section.append(averageTemperature3)

    const maxTemperature3 = createHeading("Max Temperature", `${result.weather[2].maxtempF}°F`)
    section.append(maxTemperature3)

    const minTemperature3 = createHeading("Min Temperature", `${result.weather[2].mintempF}°F`)
    section.append(minTemperature3)
    
    return section;
}

function previousSearches(url, userInput, result) {
    const section = document.createElement("section")
    section.classList.add("item$")

    const unorderedList = document.createElement("ul");
    section.append(unorderedList)

    const listItem = document.createElement("li")
    unorderedList.append(listItem)

    const link = document.createElement("a")
    listItem.append(link)

    link.setAttribute("href", "#");
    link.textContent = `${userInput}`

    const textNode = document.createTextNode(` - ${result.current_condition[0].FeelsLikeF}°F`)
    link.after(textNode)

    link.addEventListener("click", () => {
        // const url = `https://wttr.in/${userInput}?format=j1`
        fetch(url)
        .then((response) => response.json())
        .then((result) => {
            document.querySelector("#location").value = ""
            const sectionQuickSummary = document.querySelector(".quick-summary")
            const sectionThreeDayForecast = document.querySelector(".three-day-forecast")
            if (sectionQuickSummary && sectionThreeDayForecast) {
                sectionQuickSummary.remove()
                sectionThreeDayForecast.remove()
            }
            document.querySelector(".display").append(quickSummary(result));
            document.querySelector(".display").append(threeDayForecast(result));
        })
        .catch((error) => {
            console.log(error)
        })
        })
    
    return section
}