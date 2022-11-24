document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        const note = event.target.dataset.title
        const editedNote = prompt('Введите новое название', [note])

        if (editedNote) {
            editNote(id, editedNote).then(() => {
                event.target.closest(
                    'li'
                ).firstElementChild.textContent = `${editedNote}`
            })
        }
    }
})

async function editNote(id, title) {
    await fetch(`/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, title: title })
    })
}

async function remove(id) {
    await fetch(`/${id}`, { method: 'DELETE' })
}
