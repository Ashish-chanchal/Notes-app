shownotes();
// if user add notes
let addbtn = document.getElementById('addbtn');
let addTxt = document.getElementById('addtxt');
let addtitle = document.getElementById('notestitle');
let alt1 = document.getElementById("emtalert");
let alt2 = document.getElementById("su-alert");

addbtn.addEventListener('click', addfunk);
function addfunk() {
    if ((addTxt.value == "") || (addtitle.value == "")) {
        alt1.style.display = "block";
        alt2.style.display = "none";
    }
    else {
        let notes = localStorage.getItem("notes");
        let notestitle = localStorage.getItem('notesTitle');
        if ((notes == null) || (notestitle == null)) {
            let notesObj = [];
            let notestitleObj = [];
        }    
        else {
            notesObj = JSON.parse(notes);
            notestitleObj = JSON.parse(notestitle);
        }
        notesObj.push(addTxt.value);
        notestitleObj.push(addtitle.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        localStorage.setItem("notestitle", JSON.stringify(notestitleObj));
        addTxt.value = "";
        addtitle.value = "";
        alt1.style.display = "none";
        alt2.style.display = "block";
    }
    shownotes();
}
function shownotes() {
    let notes = localStorage.getItem("notes");
    let notestitle = localStorage.getItem('notestitle');
    if ((notes == null) || (notestitle == null)) {
        let notesObj = [];
        let notestitleObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        notestitleObj = JSON.parse(notestitle);
    }

    let html = "";
    for (let i = 0; i < notesObj.length; i++) {

        html += `       
       <div class="notecard my-2 mx-2 card" style="width: 18rem;">
           <div class="card-body">
             <h5 class="card-title">${notestitleObj[i]}</h5>
             <p id="mynote">${notesObj[i]}</p>
             <a onclick="deletenote(this.id)" id="${i}" class="btn btn-primary rembtn">Delete Note</a>
           </div>
   </div>`;
   console.log(i);
    }
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.textContent = `Nothing to show! Use "Add a Note" section to add notes`;
    }
}
function deletenote(index) {
    let notes = localStorage.getItem("notes");
    let notestitle = localStorage.getItem('notesTitle');
    if ((notes == null) || (notestitle == null)) {
        let notesObj = [];
        let notestitleObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        notestitleObj = JSON.parse(notestitle);
    }
    notesObj.splice(index, 1);
    notestitleObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputval = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("notecard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})