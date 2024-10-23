<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupInvitation extends Model
{
    use HasFactory;

    protected $fillable = ['conversation_id', 'sender_id', 'receiver_id', 'status'];

    // Lời mời thuộc về một cuộc trò chuyện nhóm
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    // Lời mời được gửi bởi một người dùng
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Lời mời được gửi đến một người dùng
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
