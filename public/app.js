document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        const editedNote = prompt('Введите новое название', [
            event.target.dataset.title.trim()
        ])
        editNote(id, editedNote)
    }
})

async function editNote(id, title) {
    await fetch(`/${id}/${title}`, { method: 'PUT' })
}

async function remove(id) {
    await fetch(`/${id}`, { method: 'DELETE' })
}
