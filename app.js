var notes = [];

// Registering all the event handlers when the page loads
document.addEventListener("DOMContentLoaded", (event) => {
  const existingNotes = localStorage.getItem("notes");
  if (existingNotes) {
    notes = JSON.parse(existingNotes);
  }
  renderNotes();

  let bipEvent = null;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    bipEvent = event;
  });

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.querySelector("textarea").value;
    if (note.length == 0) {
      alert("You didn't input any content");
    } else {
      notes.push(note);
      save();
      renderNotes();
      document.querySelector("textarea").value = "";
    }
  });

  document.querySelector("#btnLearn").addEventListener("click", (event) => {
    location.href = "https://frontendmasters.com";
  });

  document.querySelector("#btnShare").addEventListener("click", (event) => {
    const notesString = notes.reduce((acc, cur) => acc + " | " + cur, "");
    try {
      navigator.share({
        title: "Codepad Masters",
        text: notesString,
      });
    } catch (error) {}
  });

  document.querySelector("#btnInstall").addEventListener("click", (event) => {
    if (bipEvent) bipEvent.prompt();
    else alert("To install the app use the browser menu");
  });
});

// Render the notes on the DOM
function renderNotes() {
  const ul = document.querySelector("#notes");
  ul.innerHTML = "";
  notes.forEach((note, index) => {
    // Create the note LI
    const li = document.createElement("li");
    li.innerHTML = note;
    // Delete element for each note
    const deleteButton = document.createElement("a");
    deleteButton.innerHTML = '<span class="icon">delete</span>';
    deleteButton.addEventListener("click", (event) => {
      if (confirm("Do you want to delete this note?")) {
        notes.splice(index, 1);
        save();
        renderNotes();
      }
    });
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
}

function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
