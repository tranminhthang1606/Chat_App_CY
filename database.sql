CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY, -- ID người dùng, khóa chính
    username VARCHAR(50) NOT NULL UNIQUE,   -- Tên đăng nhập, duy nhất
    email VARCHAR(100) UNIQUE,              -- Email, duy nhất
    password_hash TEXT NOT NULL,            -- Mật khẩu hash   
    avatar_url TEXT,                        -- URL của ảnh đại diện
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Thời gian tạo
) ENGINE=InnoDB;

-- Bảng conversations: Lưu thông tin về các cuộc trò chuyện (1-1 và nhóm)
CREATE TABLE conversations (
    conversation_id INT AUTO_INCREMENT PRIMARY KEY, -- ID cuộc trò chuyện, khóa chính
    name VARCHAR(100),                -- Tên nhóm chat (chỉ cho group chat)
    is_group BOOLEAN DEFAULT FALSE,   -- Phân biệt group chat và 1-1 chat
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Thời gian tạo phòng chat
) ENGINE=InnoDB;

-- Bảng conversation_members: Liên kết giữa người dùng và các phòng chat
CREATE TABLE conversation_members (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- ID tự động tăng, khóa chính
    conversation_id INT NOT NULL,            -- ID phòng chat, khóa ngoại
    user_id INT NOT NULL,                    -- ID người dùng, khóa ngoại
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tham gia
    role VARCHAR(20) DEFAULT 'member',       -- Vai trò trong group chat (admin, member)
    CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Bảng messages: Lưu trữ các tin nhắn trong phòng chat
CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,      -- ID tin nhắn, khóa chính
    conversation_id INT NOT NULL,                   -- ID phòng chat, khóa ngoại
    sender_id INT,                                  -- ID người gửi, khóa ngoại
    content TEXT,                                   -- Nội dung tin nhắn
    message_type VARCHAR(20) DEFAULT 'text',        -- Loại tin nhắn (text, image, file, ...)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian gửi tin nhắn
    is_deleted BOOLEAN DEFAULT FALSE,               -- Đánh dấu tin nhắn đã bị xóa
    CONSTRAINT fk_message_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    CONSTRAINT fk_message_sender FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Bảng message_status: Lưu trạng thái tin nhắn đã đọc hay chưa
CREATE TABLE message_status (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- ID tự động tăng, khóa chính
    message_id INT NOT NULL,                  -- ID tin nhắn, khóa ngoại
    user_id INT NOT NULL,                     -- ID người dùng, khóa ngoại
    is_read BOOLEAN DEFAULT FALSE,            -- Tin nhắn đã đọc chưa
    read_at TIMESTAMP NULL DEFAULT NULL,      -- Thời gian đọc tin nhắn
    CONSTRAINT fk_status_message FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
    CONSTRAINT fk_status_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Bảng group_invitations: Lưu trữ lời mời tham gia group chat
CREATE TABLE group_invitations (
    invitation_id INT AUTO_INCREMENT PRIMARY KEY, -- ID lời mời, khóa chính
    conversation_id INT NOT NULL,                -- ID group chat, khóa ngoại
    sender_id INT NOT NULL,                      -- Người gửi lời mời, khóa ngoại
    receiver_id INT NOT NULL,                    -- Người nhận lời mời, khóa ngoại
    status VARCHAR(20) DEFAULT 'pending',        -- Trạng thái lời mời (pending, accepted, declined)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian gửi lời mời
    CONSTRAINT fk_invitation_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    CONSTRAINT fk_invitation_sender FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_invitation_receiver FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;