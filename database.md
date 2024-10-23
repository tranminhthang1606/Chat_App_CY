users (
    user_id INT PRIMARY KEY,         -- ID người dùng
    username VARCHAR(50) UNIQUE,     -- Tên đăng nhập duy nhất
    email VARCHAR(100) UNIQUE,       -- Email người dùng (unique)
    password TEXT,                   -- Mật khẩu (hash)
    avatar_url TEXT,                 -- URL hình đại diện
    created_at TIMESTAMP DEFAULT NOW() -- Thời gian tạo tài khoản
);

conversations (
    _id INT PRIMARY KEY,                   -- ID phòng chat
    name VARCHAR(100),                     -- Tên phòng chat (chỉ cần cho group chat)
    is_group BOOLEAN DEFAULT FALSE,        -- Phân biệt giữa 1-1 chat và group chat
    created_at TIMESTAMP DEFAULT NOW()     -- Thời gian tạo phòng chat
);

conversation_members (
    id SERIAL PRIMARY KEY,         
    conversation_id INT REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT NOW(),     -- Thời gian tham gia
    role VARCHAR(20) DEFAULT 'member'      -- Vai trò trong group chat (admin, member)
);

messages (
    message_id SERIAL PRIMARY KEY,         
    conversation_id INT REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    sender_id INT REFERENCES users(user_id) ON DELETE SET NULL, -- Người gửi tin nhắn
    content TEXT,                             -- Nội dung tin nhắn
    message_type VARCHAR(20) DEFAULT 'text',  -- Loại tin nhắn (text, image, file, ...)
    created_at TIMESTAMP DEFAULT NOW(),       -- Thời gian gửi tin nhắn
    is_deleted BOOLEAN DEFAULT FALSE          -- Cờ đánh dấu tin nhắn đã bị xóa
);

message_status (
    id SERIAL PRIMARY KEY,
    message_id INT REFERENCES messages(message_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,           -- Tin nhắn đã đọc chưa
    read_at TIMESTAMP                        -- Thời gian đọc tin nhắn (nếu đã đọc)
);

group_invitations (
    invitation_id SERIAL PRIMARY KEY, 
    conversation_id INT REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    sender_id INT REFERENCES users(user_id) ON DELETE CASCADE,  -- Người gửi lời mời
    receiver_id INT REFERENCES users(user_id) ON DELETE CASCADE, -- Người nhận lời mời
    status VARCHAR(20) DEFAULT 'pending',  -- Trạng thái lời mời (pending, accepted, declined)
    created_at TIMESTAMP DEFAULT NOW()     -- Thời gian gửi lời mời
);