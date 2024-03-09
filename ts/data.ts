/* exported data */
interface Entry {
  lat: number;
  long: number;
  textarea: string | undefined | null;
  sunset: string;
  sunrise: string;
}

interface Data {
  view: string;
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}

let dataObject: Data = {
  view: '',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', () => {
  const sunsetsJSON = JSON.stringify(dataObject);
  localStorage.setItem('sunsets-local-storage', sunsetsJSON);
});

const previousSunsetJSON = localStorage.getItem('sunsets-local-storage');

if (previousSunsetJSON != null) {
  dataObject = JSON.parse(previousSunsetJSON);
}
