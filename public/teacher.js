const button = document.querySelectorAll('.delete')

Array.from(button).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(this.parentNode.childNodes[1], "check here")
    const title = this.parentNode.childNodes[1].innerText
    fetch('removeClass', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'classTitle': title,
            })
    }).then(function (response) {
      // window.location.reload()
    
    })
  });
});

const editButton = this.parentNode.parentNode
    console.log(editButton)
    editButton.setAttribute('hidden', 'true');
    editButton.nextElementSibling.removeAttribute('hidden', 'true');
    console.log(editButton.nextElementSibling)
    const noteId = this.parentNode.parentNode.parentNode.parentNode.getAttribute('data-noteId')
    console.log(noteId)

    editButton.nextElementSibling.addEventListener('click', function () {
      let note = {
        title: titleInput.value,
        msg: messageInput.value
      }
      editNote(noteId, note)
    })