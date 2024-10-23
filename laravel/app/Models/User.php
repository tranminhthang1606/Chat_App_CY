<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    public function conversations() {
        return $this->belongsToMany(Conversation::class, 'conversation_members');
    }

    public function messages() {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function invitations() {
        return $this->hasMany(GroupInvitation::class, 'receiver_id');
    }
}
