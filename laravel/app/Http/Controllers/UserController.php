<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        return User::all(); // Lấy danh sách người dùng
    }

    public function store(Request $request) {
        $user = User::create($request->all()); // Tạo người dùng mới
        return response()->json($user, 201);
    }

    public function show($id) {
        return User::findOrFail($id); // Lấy thông tin người dùng cụ thể
    }

    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->all()); // Cập nhật thông tin người dùng
        return response()->json($user, 200);
    }

    public function destroy($id) {
        User::destroy($id); // Xóa người dùng
        return response()->json(null, 204);
    }
}