const addBtn = document.querySelector('#addBtn')
const main = document.querySelector('#main')

addBtn.addEventListener('click',addNote)

function addNote() {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <div>
        <i class="fa-solid fa-clipboard"></i>
        <span>Note</span>
        </div>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea></textarea>
    `

    const trash = note.querySelector(".trash");
    const textarea = note.querySelector("textarea");

    textarea.addEventListener('input',saveNotes);
    trash.addEventListener('click', ()=> {
        note.remove();
        saveNotes();
    })
    main.appendChild(note)
}

function saveNotes() {
    const notes = document.querySelectorAll('.note textarea');
    const data = Array.from(notes).map(note => note.value).filter(a => a!=="");
    
    if(data.length===0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes",JSON.stringify(data))
    }
}

function loadNotes() {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if(lsNotes!==null) {
        lsNotes.forEach(note => {
            addNote();
            const notes = document.querySelectorAll('.note textarea');
            const lastNote = notes[notes.length-1];
            lastNote.value = note;
        })
    } else {
        addNote();
    }
}

loadNotes();