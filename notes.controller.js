const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added!'))
}

async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach((note) => {
        console.log(chalk.blue(note.id, note.title))
    })
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function removeNote(id) {
    const notes = await getNotes()

    const filtered = notes.filter((note) => note.id !== id)

    await saveNotes(filtered)
    console.log(chalk.red(`Note with id="${id}" has been removed.`))
}

async function editNote(id, title) {
    const notes = await getNotes()
    console.log(notes)
    console.log('id', id)
    console.log('title', title)

    const indexOfNote = notes.findIndex((note) => note.id === id)
    const indexOfTitle = notes.findIndex((note) => note.title === title)

    // const editedNote = notes.map((note) => {
    //     if (note.id === id) {
    //         note.title = title
    //     }
    // })
    console.log('Index of id', indexOfNote)
    console.log('Index of title', indexOfTitle)

    // await saveNotes(editedNote)
    console.log(chalk.red(`Note has been edited.`))
}

module.exports = {
    addNote,
    getNotes,
    printNotes,
    removeNote,
    editNote
}
