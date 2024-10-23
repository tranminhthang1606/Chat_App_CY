<?php

namespace App\Http\Controllers;

use App\Models\GroupInvitation;
use Illuminate\Http\Request;

class GroupInvitationController extends Controller
{
    public function store(Request $request, $conversation_id) {
        $invitation = new GroupInvitation($request->all());
        $invitation->conversation_id = $conversation_id;
        $invitation->save(); // Gửi lời mời tham gia nhóm
        return response()->json($invitation, 201);
    }

    public function update(Request $request, $id) {
        $invitation = GroupInvitation::findOrFail($id);
        $invitation->update($request->all()); // Cập nhật trạng thái lời mời
        return response()->json($invitation, 200);
    }

    public function destroy($id) {
        GroupInvitation::destroy($id); // Xóa lời mời
        return response()->json(null, 204);
    }
}