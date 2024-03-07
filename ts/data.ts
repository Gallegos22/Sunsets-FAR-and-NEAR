/* exported data */
// interface Entry {
//   lat: number;
//   long: number;
//   textarea: string | undefined;
//   sunset: string;
//   sunrise: string;
// }

// interface Data {
//   view: string;
//   entries: Entry [];
//   editing: null | Entry
//   nextEntryId: number
// }

// let dataObject : Data = {
//   view: '',
//   entries: [],
//   editing: null,
//   nextEntryId: 1
// }

// const previousSunsetJSON = localStorage.getItem('sunsets-local-storage')

// if (previousSunsetJSON !=== null) {
//   dataObject.entries = JSON.parse(previousSunsetJSON)
// }

// window.addEventListener('beforeunload', function (event) {
//   const sunsetsJSON = JSON.stringify(dataObject.entries)
//   localStorage.setItem('sunsets-local-storage', sunsetsJSON)
// })
