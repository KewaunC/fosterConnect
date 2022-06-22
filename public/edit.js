const submit = document.getElementById("submit")

submit.addEventListener('click', function(e){
  e.preventDefault()
  const id = submit.dataset.id
  const form = document.getElementsByClassName('formInput')
  const obj = {}
  for(let i = 0; i < form.length; i++){
    obj[form[i].getAttribute('name')] = form[i].value
  }
  console.log(obj)
  fetch('/edit/' + id, {method:'PUT', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(obj)})
  .then(response => response.json())
  .then(data => console.log(data));
})