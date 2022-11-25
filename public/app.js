document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }

    // if (event.target.dataset.type === 'edit') {
    //     const id = event.target.dataset.id
    //     const title = event.target.dataset.title
    //     const newTitle = prompt('Введите новое название', title)
    //     if (newTitle !== null) {
    //         update({ id, title: newTitle }).then(() => {
    //             event.target.closest('li').querySelector('span').innerText =
    //                 newTitle
    //         })
    //     }
    // }

    if (event.target.dataset.type === 'update') {
        const id = event.target.dataset.id
        const title = event.target.dataset.title

        event.target.closest('li').innerHTML = `
            <input
                type="text"
                name="title"
                value="${title}"
                required
            />
            <div>
                <button
                    class="btn btn-success"
                    data-type="save"
                    data-id="${id}"
                    >
                        Сохранить
                </button>
                <button
                    class="btn btn-danger"
                    data-type="cancel"
                    data-id="${id}"
                    data-title="${title}"
                    >
                        Отменить
                </button>
            </div>`
    }

    if (event.target.dataset.type === 'cancel') {
        const id = event.target.dataset.id
        const title = event.target.dataset.title

        event.target.closest('li').innerHTML = `
        <span>${title}</span>
        <div>
            <button
                class="btn btn-primary"
                data-type="update"
                data-id="${id}"
                data-title="${title}"
            >
                Обновить
            </button>
            <button
                class="btn btn-danger"
                data-type="remove"
                data-id="${id}"
            >
                &times;
            </button>
        </div>
        `
    }

    if (event.target.dataset.type === 'save') {
        const id = event.target.dataset.id
        const title = event.target.closest('li').querySelector('input').value
        console.log(id, title)

        if (title) {
            update({ id, title }).then(() => {
                event.target.closest('li').innerHTML = `
        <span>${title}</span>
        <div>
            <button
                class="btn btn-primary"
                data-type="update"
                data-id="${id}"
                data-title="${title}"
            >
                Обновить
            </button>
            <button
                class="btn btn-danger"
                data-type="remove"
                data-id="${id}"
            >
                &times;
            </button>
        </div>
        `
            })
        } else {
            alert('Заполните поле')
        }
    }
})

async function update(newNote) {
    await fetch(`/${newNote.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
    })
}

async function remove(id) {
    await fetch(`/${id}`, { method: 'DELETE' })
}
