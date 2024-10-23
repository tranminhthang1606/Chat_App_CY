<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['conversation_id', 'sender_id', 'content', 'message_type', 'is_deleted'];

    // Tin nhắn thuộc về một cuộc trò chuyện
    public function conversation() {
        return $this->belongsTo(Conversation::class);
    }

    // Tin nhắn được gửi bởi một người dùng
    public function sender() {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Tin nhắn có thể có nhiều trạng thái đọc từ các thành viên
    public function statuses() {
        return $this->hasMany(MessageStatus::class);
    }
}
