// document.addEventListener("DOMContentLoaded", function () {
//     const chatMessages = document.querySelector('.flex-1.overflow-y-auto.p-8.pb-36'); 
//     const messageInput = document.getElementById('messageInput');
//     const sendButton = document.getElementById('sendButton'); 

//     sendButton.addEventListener('click', function () {
//         const messageText = messageInput.value.trim(); 
//         if (messageText !== '') {
//             const messageDiv = document.createElement('div');
//             messageDiv.classList.add('flex', 'justify-end', 'mb-4');
//             const messageBubble = document.createElement('div');
//             messageBubble.classList.add('flex', 'max-w-96', 'bg-blue-500', 'text-white', 
//                 'rounded-lg', 'p-3', 'gap-3', 'mr-3');
//             messageBubble.textContent = messageText; 
//             messageDiv.appendChild(messageBubble);
//             chatMessages.appendChild(messageDiv); 
//             chatMessages.scrollTop = chatMessages.scrollHeight;
//             messageInput.value = '';
//         }
//     });


//     messageInput.addEventListener('keypress', function (event) {
//         if (event.key === 'Enter') {
//             sendButton.click(); 
//         }
//     });
// });
let helloUser = document.querySelector('#helloUser');
let checkRole = localStorage.getItem('user');
if (!checkRole) {
    window.location.href = '../authorize.html'
}

helloUser.innerHTML = `<h2 class="text-2xl">Chào, ${JSON.parse(localStorage.getItem('user')).name}!</h2>`;

let contact_list = document.querySelector('#contact_list');
let current_user = JSON.parse(localStorage.getItem('user'));
let inputMessage = document.querySelector('#inputMessage');
let sentBtn = document.querySelector('#sentBtn');
const attachFileBtn = document.getElementById('attachFile');
const fileInput = document.getElementById('fileInput');
console.log(current_user);
let conversation_id;
const url = "http://127.0.0.1:8000/api";
//http://127.0.0.1:8000 http://192.168.1.183:8000/

function openPopup() {
    document.getElementById('popup').classList.remove('hidden');
    document.getElementById('popup-overlay').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
    document.getElementById('popup-overlay').classList.add('hidden');
}

// Form submit handler
document.getElementById('create-group-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const groupName = document.querySelector('#groupName').value;
    const members = document.querySelector('#friendEmail').value;

    fetch(`${url}/group_conversation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: groupName,
            members: members.split(',').map(id => ({ id }))
        })
    }).then(res => res.json()).then(res => alert('Nhóm đã được tạo thành công !!'));

});
const handleFile = (conversations) => {
    attachFileBtn.addEventListener('click', function () {
        // Mở cửa sổ chọn file
        fileInput.click();
    });

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        console.log(file);

        if (file) {
            // Thực hiện gửi file qua API hoặc Form
            console.log('File selected:', JSON.stringify({
                user_id: current_user.id,
                conversation_id: conversations,
                message: file.name,
                file_path: file
            }));

            fetch(`${url}/conversation/${conversations}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: {
                    user_id: current_user.id,
                    conversation_id: conversations,
                    message: file.name,
                    file_path: file
                }
            })
        }
    });
}

let renderGroupList = async function () {
    let data = await fetch(url + '/group_conversation');
    data = await data.json();
    console.log(data);
    contact_list.innerHTML = '';
    let check;
    let arrayData = [];
    data.forEach(element => {
        check = element.users.filter(user => user.id == current_user.id);
        console.log(check);
        if (check.length != 0) {
            arrayData.push(element);
        }

    });
    console.log(arrayData);

    arrayData.forEach(group => {
        console.log(group);

        let contact = document.createElement('div');
        contact.addEventListener('click', async function (e) {
            let conversations = group.id;
            conversation_id = conversations;


            loadMessages(conversations);

            // handleFile(conversations)



        })
        contact.classList.add('flex', 'items-center', 'mb-4', 'cursor-pointer', 'hover:bg-gray-100', 'p-2', 'rounded-md');
        contact.innerHTML = `
        <div>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar" class="d-flex align-self-center me-3 mr-3" width="60">
        <span class="badge bg-success badge-dot"></span>
        </div>
        <div class="flex-1 ">
            <h2 class="text-lg font-semibold ">${group.name}</h2>
            <p class="text-gray-600"></p>
                </div>
               <div>
        <p class="small text-muted mb-1"></p>
         </div>
        `;

        contact_list.appendChild(contact)
    });

}
let renderContactList = async function () {
    let data = await fetch(url + '/user');
    data = await data.json();
    let friends = data.filter(item => item.id !== current_user.id)
    contact_list.innerHTML = '';
    friends.forEach(friend => {
        let contact = document.createElement('div');
        contact.addEventListener('click', async function (e) {

            fetch(`${url}/user/${current_user.id}/${friend.id}/conversations`)
                .then(response => response.json())
                .then(conversations => {
                    console.log(conversations);
                    conversation_id = conversations;
                    loadMessages(conversations);

                    handleFile(conversations)


                })
        })
        contact.classList.add('flex', 'items-center', 'mb-4', 'cursor-pointer', 'hover:bg-gray-100', 'p-2', 'rounded-md');
        contact.innerHTML = `
        <div>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar" class="d-flex align-self-center me-3 mr-3" width="60">
        <span class="badge bg-success badge-dot"></span>
        </div>
        <div class="flex-1 ">
            <h2 class="text-lg font-semibold ">${friend.name}</h2>
            <p class="text-gray-600"></p>
                </div>
               <div>
        <p class="small text-muted mb-1"></p>
         </div>
        `;

        contact_list.appendChild(contact)
    })
    console.log(friends);
}

sentBtn.addEventListener('click', async function () {
    let messages = inputMessage.value;
    console.log({
        user_id: current_user.id,
        conversation_id: conversation_id,
        message: messages
    });

    fetch(`${url}/conversation/${conversation_id}/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: current_user.id,
            conversation_id: conversation_id,
            message: messages
        })
    }).then(res => res.json())
        .then((res) => {
            console.log(res);
            loadMessages(conversation_id);
        }).catch(error => {
            console.error('Lỗi:', error);
        });
    chatBox.scrollTop = chatBox.scrollHeight;
    inputMessage.value = '';
})



const Logout = () => {
    localStorage.removeItem('user');
    window.location.href = '../authorize.html';
}

let chatBox = document.querySelector('#chat-box');
let chat_friend_name = document.querySelector('#chat_friend_name');
function loadMessages(conversationId) {

    fetch(`${url}/conversation/${conversationId}/messages`)
        .then(response => response.json())
        .then(res => {
            let messages = res.messages
            let conversation = res.conversation[0]
            console.log(messages, conversation);

            if (conversation.name != null) {
                chat_friend_name.textContent = conversation.name;
            } else {
                let friendName = conversation.users.find(item => item.id != current_user.id).name
                chat_friend_name.textContent = friendName
            }

            // const list = document.getElementById('messagesList');
            // list.innerHTML = ''; // Xóa danh sách cũ
            chatBox.innerHTML = '';
            messages.forEach(message => {
                let messageDiv = document.createElement('div');
                if (message.user_id == current_user.id) {
                    messageDiv.classList.add('flex', 'justify-end', 'mb-4', 'cursor-pointer');
                    messageDiv.innerHTML = `<div class="flex max-w-96 bg-custom-gradient text-white rounded-lg p-3 gap-3 mr-3"><p>${message.message}</p></div><div><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"alt="avatar" class="d-flex align-self-center me-3 " width="50"><span class="badge bg-success badge-dot"></span></div>`

                } else {
                    messageDiv.classList.add('flex', 'mb-4');
                    messageDiv.innerHTML = `<div><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"alt="avatar" class="mr-3" width="50">
                        <span class="badge bg-success badge-dot"></span>
                    </div>
                    <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                        <p class="text-gray-700">${message.message}</p>
                    </div>`
                }
                chatBox.appendChild(messageDiv)
                chatBox.scrollTop = chatBox.scrollHeight;

            });
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}


renderContactList()
