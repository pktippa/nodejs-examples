// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2)
]);