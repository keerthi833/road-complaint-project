const button = document.getElementById("submit");
const complaints = document.getElementById("complaints");

// page load ayyaka data load
window.onload = function(){
    let saved = JSON.parse(localStorage.getItem("complaints")) || [];
    saved.forEach(data => createCard(data.name, data.text, data.time, data.image));
};

button.addEventListener("click", function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const complaint = document.getElementById("complaint").value;
const photo = document.getElementById("photo").files[0];

if(name === "" || complaint === ""){
    alert("Please fill all fields");
    return;
}

const time = new Date().toLocaleString();

const reader = new FileReader();

reader.onload = function(){

let data = {
    name: name,
    text: complaint,
    time: time,
    image: reader.result
};

let old = JSON.parse(localStorage.getItem("complaints")) || [];
old.push(data);
localStorage.setItem("complaints", JSON.stringify(old));

createCard(name, complaint, time, reader.result);

};

if(photo){
    reader.readAsDataURL(photo);
}

document.getElementById("name").value = "";
document.getElementById("complaint").value = "";

});

// card create function
function createCard(name, complaint, time, image){

const card = document.createElement("div");

card.innerHTML = `
<h3>${name}</h3>
<p>${complaint}</p>
<p><b>Time:</b> ${time}</p>
<img src="${image}" width="250">
<br><br>
<button class="delete">Delete</button>
`;

complaints.appendChild(card);

card.querySelector(".delete").addEventListener("click", function(){
    card.remove();
});

}