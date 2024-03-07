const $homeView = document.querySelector('[data-view="home"]');
if (!$homeView) throw new Error('The $homeView query failed');

const $favoriteView = document.querySelector('[data-view="favorites"]');
if (!$favoriteView) throw new Error('The $favoriteView query failed');

const $searchButtonForm = document.querySelector('form');
console.log($searchButtonForm);
if (!$searchButtonForm) throw new Error('The $searchButtonForm query failed');

const $cordInput = document.querySelector('input');
console.log($cordInput);
if (!$cordInput) throw new Error('The $cordInput query failed');
let apiData: any;
let lat: number;
let long: number;

const $sunsetInfo = document.querySelector('#sunset-info');
console.log($sunsetInfo);
if (!$sunsetInfo) throw new Error('The $sunsetInfo query failed');

$searchButtonForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const coordinates = $cordInput.value.trim();
  const latLong = coordinates.split(',');
  lat = Number(latLong[0]);
  console.log(lat);
  long = Number(latLong[1]);
  console.log(long);
  if (!coordinates) {
    console.log('Please enter coordinates.');
    $sunsetInfo.textContent = 'Please provide coordinates.';
    return; // Early return if no coordinates are entered
  }

  try {
    const response = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    apiData = await response.json();
    console.log('data:', apiData);
    $sunsetInfo.append(renderEntry(apiData.results, lat, long));
  } catch (error) {
    console.error('Error fetching breweries:', error);
  }
  $cordInput.value = '';
});

function renderEntry(entry: Entry, lat: number, long: number): HTMLLIElement {
  console.log(entry);
  const li = document.createElement('li');

  const row1 = document.createElement('div');
  row1.setAttribute('class', 'row');
  li.append(row1);

  const colFull1 = document.createElement('div');
  colFull1.setAttribute('class', 'column-full');
  row1.append(colFull1);

  const heading3 = document.createElement('h3');
  heading3.textContent = `Latitude: ${lat}  Longitude: ${long}`;
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
  description.append(textArea);

  const row4 = document.createElement('div');
  row4.setAttribute('class', 'row');
  li.append(row4);

  const colFull4 = document.createElement('div');
  colFull4.setAttribute('class', 'column-full');
  row4.append(colFull4);

  const addBtn = document.createElement('button');
  addBtn.setAttribute('class', 'addBtn');
  addBtn.textContent = 'Add Sunset';
  colFull4.append(addBtn);

  return li;
}

$sunsetInfo.addEventListener('click', function (e): void {
  const target = e.target as Element;

  if (target.tagName === 'BUTTON') {
    // dataObject.entries.push(apiData)
    console.log('here');
    console.log(lat);
    console.log(long);
    console.log(apiData);

    const $textArea = document.querySelector('textarea')?.value;
    console.log($textArea);

    const newSunset: Entry = {
      lat,
      long,
      textarea: $textArea,
      sunrise: apiData.results.sunrise,
      sunset: apiData.results.sunset,
    };

    console.log(newSunset);

    dataObject.entries.push(newSunset);
    $sunsetInfo.textContent = '';
  }
});

function viewSwap(view: string): void {
  // creating a view swap function
  if (view === 'home') {
    $homeView?.classList.remove('hidden');
    $favoriteView?.classList.add('hidden');
  } else if (view === 'favorites') {
    $homeView?.classList.add('hidden');
    $favoriteView?.classList.remove('hidden');
  }
}

const $newBtnLink = document.querySelector('.newBtn');

const $favoritesLink = document.querySelector('i');

$favoritesLink?.addEventListener('click', function () {
  dataObject.view = 'favorites';
  viewSwap('favorites');
});

$newBtnLink?.addEventListener('click', function () {
  dataObject.view = 'home';
  viewSwap('home');
});
