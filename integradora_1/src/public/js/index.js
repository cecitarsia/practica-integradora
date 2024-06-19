const socket = io()

// Funcionalidad y métodos del cliente
socket.emit('message', "Comunicando desde WebSocket")


/// Chat ///

const messages = document.getElementById('messages')
const btnSend = document.getElementById('btn-send')

btnSend.addEventListener('click', () => {
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;
    socket.emit('addMessage', { user, message});

})

socket.on('messages', messages => {
    messages.innerHTML = ``;
    messages.forEach(message => {
        const newMessage = document.createElement('li');
        newMessage.innerHTML = `<strong>Usuario: </strong>${message.user}, <p>Mensaje: </p>${message.message}`;
        messages.appendChild(newMessage);
    });
})

/// realtimeproducts ///
const form = document.getElementById("form")
const addButton = document.getElementById('btn-add')

form.addEventListener('submit', () => {
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const price = document.getElementById('price').value
    const stock = document.getElementById('stock').value
    const category = document.getElementById('category').value

    socket.emit('addProduct', { title, description, code, price, stock, category})

})

socket.on('realTimeProducts', products => {

    const realTimeList = document.getElementById('realTimeProducts')

    realTimeList.innerHTML = ``;
    products.forEach(product => {
        const newProduct = document.createElement('li');
        const deleteButton = document.createElement('button');

        deleteButton.innerHTML = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            socket.emit('deleteProduct', product.id)
            console.log(product.id);
        });
        newProduct.innerHTML = 
        `<strong>Título: </strong>${product.title}, 
        <strong>Descripcion: </strong>${product.description},
        <strong>Codigo: </strong>${product.code},
        <strong>Precio: </strong>${product.price},
        <strong>Stock: </strong>${product.stock},
        <strong>Categoría: </strong>${product.category}`;
        realTimeList.appendChild(newProduct);
        realTimeList.appendChild(deleteButton);
    });
})