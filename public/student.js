const button = document.querySelectorAll('.drop')
const add = document.querySelectorAll('.add')

Array.from(button).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(this.parentNode.id, "check here")
    const course = this.parentNode.id
    fetch('removeClass', {
      method: 'delete', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': course,
            })
    }).then(data => {
      console.log(data)
      window.location.reload()
    })
  });
});

Array.from(add).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(this.parentNode.childNodes[1].id, "check here")
    const course = this.parentNode.id
    fetch('addClass', {
      method: 'put', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': course,
            })
    }).then(data => {
      console.log(data)
      window.location.reload()
    })
  });
});