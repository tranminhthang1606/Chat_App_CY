<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversationMember extends Model
{
    use HasFactory;

    protected $table = 'conversation_members';

    protected $fillable = ['conversation_id', 'user_id', 'role'];

    // Thành viên thuộc về một cuộc trò chuyện
    public function conversation() {
        return $this->belongsTo(Conversation::class);
    }

    // Thành viên là một người dùng
    public function user() {
        return $this->belongsTo(User::class);
    }
}
