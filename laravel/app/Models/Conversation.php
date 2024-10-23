<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'is_group'];


    public function members()
    {
        return $this->belongsToMany(User::class, 'conversation_members')
            ->withPivot('role');
    }


    public function messages()
    {
        return $this->hasMany(Message::class);
    }


    public function invitations()
    {
        return $this->hasMany(GroupInvitation::class);
    }
}
