'use strict';
let dataObject = {
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
