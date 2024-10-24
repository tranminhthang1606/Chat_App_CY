document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.querySelector('.flex-1.overflow-y-auto.p-8.pb-36'); // Khu vực hiển thị tin nhắn
    const messageInput = document.getElementById('messageInput'); // Ô nhập tin nhắn
    const sendButton = document.getElementById('sendButton'); // Nút gửi

    // Hàm gửi tin nhắn
    function sendMessage() {
        const messageText = messageInput.value.trim(); // Lấy nội dung tin nhắn
        if (messageText !== '') {
            const date = new Date(); // Lấy thời gian hiện tại
            const options = { hour: '2-digit', minute: '2-digit' }; // Định dạng thời gian
            const timeStamp = date.toISOString(); // Lấy thời gian dưới dạng ISO

            // Tạo div cho tin nhắn
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('flex', 'justify-end', 'mb-4');

            const messageBubble = document.createElement('div');
            messageBubble.classList.add('flex', 'max-w-96', 'bg-blue-500', 'text-white', 
                'rounded-lg', 'p-3', 'gap-3', 'mr-3');
            messageBubble.textContent = messageText; // Đặt nội dung tin nhắn

            // Thêm thời gian vào tin nhắn
            const timeElement = document.createElement('span');
            timeElement.textContent = date.toLocaleTimeString([], options); // Định dạng thời gian
            timeElement.classList.add('text-gray-300', 'text-sm', 'mt-1'); // Thêm lớp CSS cho thời gian

            messageDiv.appendChild(messageBubble);
            messageDiv.appendChild(timeElement); // Thêm thời gian vào messageDiv
            chatMessages.appendChild(messageDiv); // Thêm tin nhắn vào khu vực chat
            chatMessages.scrollTop = chatMessages.scrollHeight; // Cuộn xuống cuối khu vực chat
            
            // Gửi yêu cầu POST tới API
            fetch('https://api.example.com/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageText,
                    timestamp: timeStamp
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data); // Xử lý dữ liệu phản hồi
            })
            .catch((error) => {
                console.error('Error:', error); // Xử lý lỗi
            });

            messageInput.value = ''; // Xóa ô nhập liệu
        }
    }

    // Lắng nghe sự kiện click cho nút gửi
    sendButton.addEventListener('click', sendMessage);

    // Lắng nghe sự kiện nhấn phím
    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage(); // Gửi tin nhắn khi nhấn Enter
        }
    });
});
