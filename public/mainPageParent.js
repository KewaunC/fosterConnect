let form = document.querySelector("form")
let input = document.getElementById("post")
let msg = document.getElementById("msg")
let post = document.getElementById("posts")

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    formValidation();

})

let formValidation = () => {
    if(input.value === "") {
        console.log("Failure");
        msg.innerHTML = "Post can not be blank";
    } else {
        console.log("Success");
        msg.innerHTML = "";
        acceptData();
    }
}

let data = {};

let acceptData = () => {
    data["text"] = input.value;
    console.log(data);
    createPost();
};

let createPost = () => {
    post.innerHTML += `<div>
                            <p>${data.text}</p>
                            <span class="options">
                                <i onClick = "updatePost(this)" class="fas fa-edit"></i>
                                <i onClick = "deletePost(this)" class="fas fa-trash-alt"></i>
                            </span>
                        </div>`
    input.value = ""
};

let updatePost = (e) => {
    input.value = e.parentElement.previousElementSibling.innerHTML
    e.parentElement.parentElement.remove();
};


let deletePost = (e) => {
    e.parentElement.parentElement.remove();
}
