
const date = new Date();
const dateString = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
//console.log(dateString)
document.getElementById('date').innerHTML=dateString;