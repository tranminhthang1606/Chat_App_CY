<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageStatus extends Model
{
    use HasFactory;

    protected $table = 'message_status';

    protected $fillable = ['message_id', 'user_id', 'is_read', 'read_at'];

    // Trạng thái thuộc về một tin nhắn
    public function message()
    {
        return $this->belongsTo(Message::class);
    }

    // Trạng thái thuộc về một người dùng
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
