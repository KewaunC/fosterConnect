let add = document.getElementsByClassName("add");
let drop = document.getElementsByClassName("drop");


Array.from(add).forEach(function(element) {
  element.addEventListener('click', function(e){
    const courseID = e.target.dataset.courseid
    const teacherID = e.target.dataset.teacherid
      fetch('/roster', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        courseID, teacherID    
      })
    }).then(function (response) {
      // window.location.reload()
    
    })
  });
});

Array.from(drop).forEach(function(element) {
  element.addEventListener('click', function(e){
    const courseID = e.target.dataset.courseid
    fetch('/roster', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        courseID
      })
    }).then(function (response) {
      // window.location.reload()
    
    })
  });
});