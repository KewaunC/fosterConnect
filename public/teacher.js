const button = document.querySelector("#submit");
const className = document.querySelector("#className")
const category = document.querySelector("#category")
const capacity = document.querySelector("#capacity")
const courseLength = document.querySelector("#courseLength")
const description = document.querySelector("#description")

button.addEventListener("click", async (e) =>{
  e.preventDefault()
  try{ await fetch("/addCourse", {
    method:"POST",
    headers:{'Content-Type':"application/json"}
    ,body:JSON.stringify( {
      className: className.value, 
      capacity: capacity.value,
      category: category.value,
      courseLength: courseLength.value,
      description: description.value
    }) 
  })}
 catch(err){
  console.log("Not working")
 }
})