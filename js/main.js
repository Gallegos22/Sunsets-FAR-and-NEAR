"use strict";
const $homeView = document.querySelector('[data-view="home"]');
if (!$homeView)
    throw new Error('The $homeView query failed');
const $heading3 = document.querySelector('#heading3');
if (!$heading3)
    throw new Error('The $heading3 query failed');
const $favoriteView = document.querySelector('[data-view="favorites"]');
if (!$favoriteView)
    throw new Error('The $favoriteView query failed');
const $searchButtonForm = document.querySelector('form');
if (!$searchButtonForm)
    throw new Error('The $searchButtonForm query failed');
const $sunriseApi = document.querySelector('.sunriseApi');
if (!$sunriseApi)
    throw new Error('The $sunriseApi query failed');
const $sunsetApi = document.querySelector('.sunsetApi');
if (!$sunsetApi)
    throw new Error('The $sunsetApi query failed');
const $cordInput = document.querySelector('input');
if (!$cordInput)
    throw new Error('The $cordInput query failed');
let apiData; // setting variables from line 31 - 33 as global data so we can re-use them in multiple functions
let lat;
let long;
const $sunsetInfo = document.querySelector('#sunset-info');
if (!$sunsetInfo)
    throw new Error('The $sunsetInfo query failed');
const $favoritesList = document.querySelector('#favoritesList');
if (!$favoritesList)
    throw new Error('The $favoritesList query failed');
const $addSunsetBtn = document.querySelector('.addBtn');
if (!$addSunsetBtn)
    throw new Error('The $addSunsetBtn query failed');
const $noSunsets = document.querySelector('.no-sunsets');
if (!$noSunsets)
    throw new Error('The $noSunsets query failed');
const $textArea = document.getElementById('notes');
if (!$textArea)
    throw new Error('The $textArea query failed');
document.addEventListener('DOMContentLoaded', () => {
    toggleNoEntries(); // if there is no entries my function will initiate
    viewSwap(dataObject.view); // this makes sure that whenever we refresh the page we stay on whatever page we are currently on
    favoriteSunsetGenerator(); // this will generate every single data in my object
});
$searchButtonForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // this will prevent data from being erased if we refresh our page
    const coordinates = $cordInput.value.trim(); // we are grabbing the whatever value we place and cleaning it up using trim()
    const latLong = coordinates.split(','); // we are splitting the coordinates into two separate strings
    lat = Number(latLong[0]); // targeting the first index of my string
    long = Number(latLong[1]); // targeting the second index of my string
    if (!coordinates) {
        $sunsetInfo.textContent = 'Please provide coordinates.';
        return; // Early return if no coordinates are entered
    }
    try { // my try block will run first so long as there is no exception
        const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}`); // using await to fetch the data 'lat' and 'long'
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } // if the response is not okay we will throw an error followed by the status error
        apiData = await response.json(); // so long as we were able to fetch a promise, we are now going to convert it to json (an object)
        console.log('here', apiData);
        renderEntry(apiData.results, lat, long); // call our function with arguments to get the information needed
    }
    catch (error) { // if there is an exception my catch block will be executed
        console.error('Error fetching breweries:', error);
    }
    $cordInput.value = ''; // reset our search box so the numbers no longer show
    $sunsetInfo.classList.remove('hidden'); // remove our class so we can visually see the box
});
// $searchButtonForm.addEventListener('submit', async function (e) {
//   e.preventDefault();
//   const addressElement = document.querySelector('#address') as HTMLInputElement;
//   const address = addressElement?.value.trim();
//   if (!address) {
//     console.log('Please enter an address.');
//     $sunsetInfo.textContent = 'Please provide an address.';
//     return; // Early return if no address is entered
//   }
//   getCoordinatesFromAddress(address);
// });
// async function getCoordinatesFromAddress(address: any):Promise<any> {
//   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data && data.length > 0) {
//       lat = parseFloat(data[0].lat);
//       long = parseFloat(data[0].lon);
//       fetchSunriseSunset(lat, long);
//     } else {
//       console.log('No coordinates found for the given address.');
//     }
//   } catch (error) {
//     console.error('Error fetching coordinates:', error);
//   }
// }
// async function fetchSunriseSunset(lat: number, long: number):Promise<any> {
//   try {
//     const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     apiData = await response.json();
//     console.log('Sunrise-Sunset data:', apiData);
//     renderEntry(apiData.results, lat, long);
//   } catch (error) {
//     console.error('Error fetching sunrise-sunset data:', error);
//   }
//   $sunsetInfo?.classList.remove('hidden');
// }
// // function convertUTCtoPST(utcDate: Date): string {
// //     // Options for formatting the date and time
// //     const options: Intl.DateTimeFormatOptions = {
// //         timeZone: 'America/Los_Angeles', // Pacific Time Zone
// //         timeZoneName: 'short'
// //     };
// //     // Convert UTC time to PST
// //     const pstTimeString = utcDate.toLocaleString('en-US', options);
// //     return pstTimeString;
// // }
function renderEntry(entry, lat, long) {
    console.log('entry', entry);
    console.log('lat', lat);
    console.log('long', long);
    if (!$heading3 || !$sunriseApi || !$sunsetApi)
        throw new Error('The queries for the API info are undefined');
    $heading3.textContent = `Latitude: ${lat}  Longitude: ${long}`;
    const utcSunriseTimeString = entry.sunset; // taking string
    console.log('utcSunriseTimeString:', utcSunriseTimeString);
    const sunrise = new Date(utcSunriseTimeString); // format into sunrise
    console.log('sunrise:', sunrise);
    sunrise.setTime(sunrise.getTime() - (4 * 60 * 60 * 1000));
    const options = {
        timeZone: 'America/Los_Angeles',
        year: 'numeric', // Corrected type
        month: 'numeric', // Corrected type
        day: 'numeric', // Corrected type
        hour: 'numeric', // Corrected type
        minute: 'numeric', // Corrected type
        second: 'numeric', // Corrected type
    };
    const formattedSunrise = sunrise.toLocaleString('en-US', options); // use en-Us to pass in options ,
    console.log('formattedSunrise:', formattedSunrise);
    $sunriseApi.textContent = formattedSunrise;
    const utcSunsetTimeString = entry.sunrise;
    console.log('utcSunsetTimeString:', utcSunsetTimeString);
    const sunset = new Date(utcSunsetTimeString);
    console.log('sunset:', sunset);
    sunset.setTime(sunset.getTime() - (4 * 60 * 60 * 1000));
    const formattedSunset = sunset.toLocaleString('en-US', options);
    console.log('formattedSunset:', formattedSunset);
    $sunsetApi.textContent = formattedSunset;
}
// function renderEntry(entry: Entry, lat: number, long: number): void { // renders our functions information
//   console.log('entry', entry);
//   console.log('lat', lat);
//   console.log('long', long);
//   if (!$heading3 || !$sunriseApi || !$sunsetApi)
//     throw new Error('The queries for the API info are undefined');
//   $heading3.textContent = `Latitude: ${lat}  Longitude: ${long}`; // visually applies our given lat and long
//   $sunriseApi.textContent = entry.sunrise; // visually applies my sunrise
//   $sunsetApi.textContent = entry.sunset; // visually applies my sunset
// }
$addSunsetBtn.addEventListener('click', function () {
    toggleNoEntries();
    console.log('here');
    const newSunset = {
        lat,
        long,
        textarea: $textArea.value,
        sunrise: apiData.results.sunrise,
        sunset: apiData.results.sunset,
        entryId: dataObject.nextEntryId,
    };
    console.log(newSunset);
    dataObject.nextEntryId++;
    dataObject.entries.unshift(newSunset);
    $favoritesList.prepend(renderFavoriteSunset(newSunset)); //
    $textArea.value = '';
    $sunsetInfo.classList.add('hidden');
});
function viewSwap(view) {
    if (view === 'home') {
        dataObject.view = 'home';
        $homeView?.classList.remove('hidden');
        $favoriteView?.classList.add('hidden');
        $addSunsetBtn?.classList.remove('hidden');
    }
    else if (view === 'favorites') {
        dataObject.view = 'favorites';
        $homeView?.classList.add('hidden');
        $favoriteView?.classList.remove('hidden');
        $sunsetInfo?.classList.add('hidden');
        $addSunsetBtn?.classList.add('hidden');
    }
}
const $newBtnLink = document.querySelector('.newBtn');
const $favoritesLink = document.querySelector('i');
$favoritesLink?.addEventListener('click', function () {
    toggleNoEntries();
    viewSwap('favorites');
});
$newBtnLink?.addEventListener('click', function () {
    viewSwap('home');
    $textArea.textContent = '';
});
function favoriteSunsetGenerator() {
    // this function only calls once, when we first load the page (or refresh it) it checks what we have in  our dataObject entries array and renders it if anything is inside
    // loop over data.entries. That is where you stored your sunsets when the user saved them on main page
    for (let i = 0; i < dataObject.entries.length; i++) {
        // render a DOM tree for each of the sunsets in data.entries
        const favSunset = renderFavoriteSunset(dataObject.entries[i]);
        // append that DOM tree to the ul element
        $favoritesList?.append(favSunset);
    }
}
function renderFavoriteSunset(entry) {
    const li = document.createElement('li');
    li.setAttribute('class', 'listed-Item');
    li.setAttribute('data-entry-id', entry.entryId.toString());
    const row1 = document.createElement('div');
    row1.setAttribute('class', 'row');
    li.append(row1);
    const colFull1 = document.createElement('div');
    colFull1.setAttribute('class', 'column-full');
    row1.append(colFull1);
    const heading3 = document.createElement('h3');
    heading3.textContent = `Latitude: ${entry.lat}  Longitude: ${entry.long}`;
    colFull1.append(heading3);
    const row2 = document.createElement('div');
    row2.setAttribute('class', 'row');
    li.append(row2);
    const colFull2 = document.createElement('div');
    colFull2.setAttribute('class', 'column-full');
    row2.append(colFull2);
    const image1 = document.createElement('img');
    image1.setAttribute('src', './images/Sunrise.png');
    colFull2.append(image1);
    const paragraph1 = document.createElement('p');
    paragraph1.setAttribute('class', 'sunriseApi');
    paragraph1.textContent = entry.sunrise;
    colFull2.append(paragraph1);
    const image2 = document.createElement('img');
    image2.setAttribute('src', './images/Sunset.png');
    colFull2.append(image2);
    const paragraph2 = document.createElement('p');
    paragraph2.setAttribute('class', 'sunsetApi');
    paragraph2.textContent = entry.sunset;
    colFull2.append(paragraph2);
    const row3 = document.createElement('div');
    row3.setAttribute('class', 'row');
    li.append(row3);
    const colFull3 = document.createElement('div');
    colFull3.setAttribute('class', 'row');
    row3.append(colFull3);
    const description = document.createElement('div');
    description.setAttribute('class', 'description');
    colFull3.append(description);
    const label = document.createElement('label');
    label.textContent = 'Notes About The Sunset & Sunrise:';
    description.append(label);
    const breaker = document.createElement('br');
    description.append(breaker);
    const textArea = document.createElement('textarea');
    textArea.setAttribute('name', 'sunset-description');
    textArea.setAttribute('id', 'notes');
    textArea.setAttribute('cols', '30');
    textArea.setAttribute('rows', '10');
    textArea.value = entry.textarea ?? ''; // using nullish coalescing operator to make sure it isn't null or undefined, If it is pass in empty string
    description.append(textArea);
    const row4 = document.createElement('div');
    row4.setAttribute('class', 'row');
    li.append(row4);
    const colFull4 = document.createElement('div');
    colFull4.setAttribute('class', 'column-full');
    row4.append(colFull4);
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.textContent = 'Delete Sunset';
    colFull4.append(deleteBtn);
    const editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'editBtn');
    editBtn.textContent = 'Edit Sunset';
    colFull4.append(editBtn);
    return li;
}
function toggleNoEntries() {
    if (dataObject.entries.length === 0) {
        $noSunsets?.classList.remove('no-sunsets');
    }
    else {
        $noSunsets?.classList.add('no-sunsets');
    }
}
const $dismissModal = document.querySelector('.dismiss-modal');
if (!$dismissModal)
    throw new Error('The $dismiss query failed');
const $dialog = document.querySelector('dialog');
if (!$dialog)
    throw new Error('The $dialog query failed');
$favoritesList.addEventListener('click', (event) => {
    const $eventTarget = event.target;
    if ($eventTarget.className !== 'editBtn') {
        return;
    }
    const $closestLi = $eventTarget.closest('[data-entry-id]');
    console.log($closestLi);
    const $textArea = $closestLi.querySelector('textarea');
    console.log($textArea);
    if (!$closestLi)
        throw new Error('The $closestLi query failed');
    const entryId = Number($closestLi.dataset.entryId);
    for (let i = 0; i < dataObject.entries.length; i++) {
        if (dataObject.entries[i].entryId === entryId) {
            console.log('string matched');
            dataObject.entries[i].textarea = $textArea?.value;
            console.log('dataObject.entries[i]:', dataObject.entries[i]);
            console.log($textArea?.value);
        }
    }
    $dialog.showModal();
});
$dismissModal.addEventListener('click', () => {
    $dialog.close();
});
$favoritesList.addEventListener('click', (event) => {
    const $eventTarget = event.target;
    if ($eventTarget.className !== 'deleteBtn') {
        return;
    }
    const $closestLi = $eventTarget.closest('[data-entry-id]');
    console.log($closestLi);
    const entryId = Number($closestLi.dataset.entryId);
    for (let i = 0; i < dataObject.entries.length; i++) {
        if (dataObject.entries[i].entryId === entryId) {
            dataObject.entries.splice(i, 1);
        }
    }
    $closestLi.remove();
    if (dataObject.entries.length === 0) {
        toggleNoEntries();
    }
});
