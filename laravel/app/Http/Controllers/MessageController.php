<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index($conversation_id) {
        return Message::where('conversation_id', $conversation_id)->get(); // Lấy tất cả tin nhắn của phòng chat
    }

    public function store(Request $request, $conversation_id) {
        $message = new Message($request->all());
        $message->conversation_id = $conversation_id;
        $message->save(); // Gửi tin nhắn mới
        return response()->json($message, 201);
    }

    public function show($id) {
        return Message::findOrFail($id); // Lấy chi tiết tin nhắn
    }

    public function update(Request $request, $id) {
        $message = Message::findOrFail($id);
        $message->update($request->all()); // Cập nhật tin nhắn
        return response()->json($message, 200);
    }

    public function destroy($id) {
        Message::destroy($id); // Xóa tin nhắn
        return response()->json(null, 204);
    }
}