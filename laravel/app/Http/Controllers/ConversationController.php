<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index() {
        return Conversation::with('members')->get(); // Lấy tất cả các cuộc trò chuyện
    }

    public function store(Request $request) {
        $conversation = Conversation::create($request->all()); // Tạo cuộc trò chuyện mới
        return response()->json($conversation, 201);
    }

    public function show($id) {
        return Conversation::with('members')->findOrFail($id); // Lấy thông tin chi tiết phòng chat
    }

    public function update(Request $request, $id) {
        $conversation = Conversation::findOrFail($id);
        $conversation->update($request->all()); // Cập nhật phòng chat
        return response()->json($conversation, 200);
    }

    public function destroy($id) {
        Conversation::destroy($id); // Xóa phòng chat
        return response()->json(null, 204);
    }
}