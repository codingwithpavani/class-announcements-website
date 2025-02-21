

function postAnnouncement() {
    let input = document.getElementById("announcement-input");
    let text = input.value.trim();
    
    if (text === "") {
        alert("Please enter an announcement.");
        return;
    }

    let list = document.getElementById("announcement-list");
    let listItem = document.createElement("li");
    listItem.textContent = text;

    list.appendChild(listItem);
    input.value = "";  // Clear input after posting
}
// Load announcements from local storage when the page loads
/*document.addEventListener("DOMContentLoaded", loadAnnouncements);

function postAnnouncement() {
    let input = document.getElementById("announcement-input");
    let text = input.value.trim();
    
    if (text === "") {
        alert("Please enter an announcement.");
        return;
    }

    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements.push(text);
    localStorage.setItem("announcements", JSON.stringify(announcements));

    displayAnnouncements();
    input.value = ""; // Clear input after posting
}

function displayAnnouncements() {
    let list = document.getElementById("announcement-list");
    list.innerHTML = ""; // Clear the list before displaying

    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements.forEach((text, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = text;

        // Add delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = function() {
            deleteAnnouncement(index);
        };

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });
}

function deleteAnnouncement(index) {
    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements.splice(index, 1);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    displayAnnouncements();
}

function loadAnnouncements() {
    displayAnnouncements();
}*/
// Load announcements on page load
document.addEventListener("DOMContentLoaded", loadAnnouncements);

function postAnnouncement() {
    let textInput = document.getElementById("announcement-input");
    let linkInput = document.getElementById("link-input");
    let imageInput = document.getElementById("image-input");

    let text = textInput.value.trim();
    let link = linkInput.value.trim();
    let imageFile = imageInput.files[0];

    if (text === "" && !imageFile) {
        alert("Please enter an announcement or upload an image.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
        let announcements = JSON.parse(localStorage.getItem("announcements")) || [];

        let announcement = {
            text: text,
            link: link,
            image: imageFile ? event.target.result : null
        };

        announcements.push(announcement);
        localStorage.setItem("announcements", JSON.stringify(announcements));

        displayAnnouncements();
        textInput.value = "";
        linkInput.value = "";
        imageInput.value = "";
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        reader.onload(); // Call immediately if there's no image
    }
}

function displayAnnouncements() {
    let list = document.getElementById("announcement-list");
    list.innerHTML = "";

    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements.forEach((announcement, index) => {
        let listItem = document.createElement("li");

        // Add text
        if (announcement.text) {
            let textNode = document.createElement("p");
            textNode.textContent = announcement.text;
            listItem.appendChild(textNode);
        }

        // Add link
        if (announcement.link) {
            let linkNode = document.createElement("a");
            linkNode.href = announcement.link;
            linkNode.textContent = "Click here";
            linkNode.target = "_blank";
            listItem.appendChild(linkNode);
        }

        // Add image
        if (announcement.image) {
            let imageNode = document.createElement("img");
            imageNode.src = announcement.image;
            imageNode.style.maxWidth = "200px";
            listItem.appendChild(imageNode);
        }

        // Add delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = function () {
            deleteAnnouncement(index);
        };

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });
}

function deleteAnnouncement(index) {
    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements.splice(index, 1);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    displayAnnouncements();
}

function loadAnnouncements() {
    displayAnnouncements();
}
function addResource() {
    let title = document.getElementById("resource-title").value.trim();
    let link = document.getElementById("resource-link").value.trim();
    if (title === "" || link === "") {
        alert("Please enter both title and link.");
        return;
    }

    let resources = JSON.parse(localStorage.getItem("studyResources")) || [];
    resources.push({ title, link });
    localStorage.setItem("studyResources", JSON.stringify(resources));

    displayResources();
}
function addResource() {
    let title = document.getElementById("resource-title").value.trim();
    let link = document.getElementById("resource-link").value.trim();
    if (title === "" || link === "") {
        alert("Please enter both title and link.");
        return;
    }

    let resources = JSON.parse(localStorage.getItem("studyResources")) || [];
    resources.push({ title, link });
    localStorage.setItem("studyResources", JSON.stringify(resources));

    displayResources();
    document.getElementById("resource-title").value = "";
    document.getElementById("resource-link").value = "";
}

function displayResources() {
    let list = document.getElementById("resource-list");
    list.innerHTML = "";

    let resources = JSON.parse(localStorage.getItem("studyResources")) || [];
    resources.forEach((resource, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${resource.link}" target="_blank">${resource.title}</a> 
            <button class="delete-btn" onclick="deleteResource(${index})">❌</button>`;
        list.appendChild(listItem);
    });
}

function deleteResource(index) {
    let resources = JSON.parse(localStorage.getItem("studyResources")) || [];
    resources.splice(index, 1);
    localStorage.setItem("studyResources", JSON.stringify(resources));
    displayResources();
}

document.addEventListener("DOMContentLoaded", displayResources);
function postAnnouncement() {
    let text = document.getElementById("announcement-input").value.trim();
    let link = document.getElementById("link-input").value.trim();
    let isPinned = document.getElementById("pin-checkbox").checked;

    if (text === "") {
        alert("Please enter an announcement.");
        return;
    }

    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    let announcement = { text, link, isPinned };

    if (isPinned) {
        announcements.unshift(announcement);
    } else {
        announcements.push(announcement);
    }

    localStorage.setItem("announcements", JSON.stringify(announcements));
    displayAnnouncements();
}

function createPoll() {
    let question = document.getElementById("poll-question").value.trim();
    if (question === "") {
        alert("Please enter a question.");
        return;
    }

    let poll = { question, votes: { Yes: 0, No: 0 } };
    localStorage.setItem("poll", JSON.stringify(poll));

    displayPoll();
    document.getElementById("poll-question").value = "";
}

function displayPoll() {
    let pollContainer = document.getElementById("poll-container");
    pollContainer.innerHTML = "";

    let poll = JSON.parse(localStorage.getItem("poll"));
    if (!poll) return;

    let questionEl = document.createElement("h3");
    questionEl.textContent = poll.question;

    let yesButton = document.createElement("button");
    yesButton.textContent = `Yes (${poll.votes.Yes})`;
    yesButton.onclick = function () { vote("Yes"); };

    let noButton = document.createElement("button");
    noButton.textContent = `No (${poll.votes.No})`;
    noButton.onclick = function () { vote("No"); };

    pollContainer.appendChild(questionEl);
    pollContainer.appendChild(yesButton);
    pollContainer.appendChild(noButton);
}

function vote(option) {
    let poll = JSON.parse(localStorage.getItem("poll"));
    if (!poll) return;

    poll.votes[option]++;
    localStorage.setItem("poll", JSON.stringify(poll));

    displayPoll();
}

document.addEventListener("DOMContentLoaded", displayPoll);



