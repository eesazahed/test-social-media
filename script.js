// Save and load the username and status
document.querySelector('.local-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (document.getElementById("pass").value.length >= 8 && document.getElementById("status").value.length >= 5 && document.getElementById("text").value.length >= 4 && document.getElementById("text").value.length <= 12) {
        localStorage.setItem("FOLLOW-EESAZAHED-ON-GITHUB-pass", document.getElementById("pass").value);
        localStorage.setItem("FOLLOW-EESAZAHED-ON-GITHUB-status", document.getElementById("status").value);
        localStorage.setItem("FOLLOW-EESAZAHED-ON-GITHUB-username", document.getElementById("text").value);
        $(".prevUser").text(localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-username"));
        $("#currentUser").text(localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-username"));
        $(".status").text(localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-status"));
    } else {
        alert("Error");
    }
});
// Save and load the users profile picture
let fileInput = document.querySelector('input[type="file"]');
let preview = document.querySelector('.preview');
let reader = new FileReader();
const handleEvent = (event) => {
    if (event.type === "load") {
        localStorage.setItem("FOLLOW-EESAZAHED-ON-GITHUB-saved", reader.result);
        preview.src = reader.result;
    }
}
const addListeners = (x) => {
    x.addEventListener('loadstart', handleEvent);
    x.addEventListener('load', handleEvent);
    x.addEventListener('loadend', handleEvent);
}
const handleSelected = () => {
    let selectedFile = fileInput.files[0];
    addListeners(reader);
    reader.readAsDataURL(selectedFile);
}
fileInput.addEventListener('change', handleSelected);
// Add posts
const allPosts = document.querySelector("#addmoreposts");
const createPost = (content) => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    let ampm;
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (year < 10) {
        year = "0" + year;
    }
    if (hour > 12) {
        ampm = " PM"
    }
    if (hour < 12) {
        hour = hour
        ampm = " AM"
    }
    if (hour < 10) {
        hour = hour + "0"
        ampm = " AM"
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    let formatted = day + "/" + month + "/" + year + " @ " + hour + ":" + minute + ":" + second + ampm + " " + new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
    $(allPosts).prepend(`<div class="post"> <span class="usernameDisplay"> @${localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-username")} </span>
    <br> <br> <span class="postDisplay"> ${content} </span><br> <br> <span class="timeDisplay"> ${formatted} </span> </div>`);
}
const submitForm = () => {
    if (document.querySelector("textarea").value !== "") {
        createPost(document.querySelector("textarea").value);
        localStorage.setItem("FOLLOW-EESAZAHED-ON-GITHUB-allposts", allPosts.innerHTML);
        document.querySelector("textarea").value = "";
    }
}
if (localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-pass") !== null) {
    $("#currentUser").text(localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-username"));
    document.querySelector("#pass").value = localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-pass");
    $(".prevUser").text(localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-username"));
    $(".status").text(localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-status"));
    preview.src = localStorage.getItem("FOLLOW-EESAZAHED-ON-GITHUB-saved");
}