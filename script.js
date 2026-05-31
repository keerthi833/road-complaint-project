const form = document.getElementById("complaintForm");
const complaints = document.getElementById("complaints");

// load saved complaints
window.onload = function () {
    let saved = JSON.parse(localStorage.getItem("complaints")) || [];

    saved.forEach(item => {
        showComplaint(item.name, item.complaint);
    });
};

form.addEventListener("submit", function (e) {
    e.preventDefault(); // ❗ STOP REFRESH

    const name = document.getElementById("name").value.trim();
    const complaint = document.getElementById("complaint").value.trim();

    if (name === "" || complaint === "") {
        alert("Please fill all fields");
        return;
    }

    let saved = JSON.parse(localStorage.getItem("complaints")) || [];

    saved.push({
        name: name,
        complaint: complaint
    });

    localStorage.setItem("complaints", JSON.stringify(saved));

    showComplaint(name, complaint);

    form.reset();
});

function showComplaint(name, complaint) {
    const card = document.createElement("div");

    card.innerHTML = `
        <h3>${name}</h3>
        <p>${complaint.replace(/\n/g, "<br>")}</p>
        <hr>
    `;

    complaints.appendChild(card);
}