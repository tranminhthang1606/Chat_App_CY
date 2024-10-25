<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Conversation_User;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function createConversation(Request $request)
    {

        if (count(User::get('id')) < 2) {
            return response()->json(['message' => 'Not enough users'], 201);
        }
        $user_ids = User::where('id', '!=', $request->user_id)->get('id');
        foreach ($user_ids as $user_id) {
            $conversation = Conversation::create(['name' => $request->name]);
            $conversation->users()->attach([$user_id->id, $request->user_id]); // user_ids là mảng ID của người tham gia
        }
        return response()->json(['message' => 'done'], 201);
    }

    public function createGroupConversation(Request $request)
    {
        $user_ids = [];
        $users = User::whereIn('id', $request->members)->get('id');
        foreach ($users as $user) {
            array_push($user_ids, $user->id);
        }

        $conversation = Conversation::create(['name' => $request->name]);
        $conversation->users()->attach($user_ids); // user_ids là mảng ID của người tham gia

        return response()->json(['message' => 'done'], 201);
    }


    public function groupConversation(Request $request)
    {
        $group = Conversation::where('name','!=',null)->with('users')->get();

        return response()->json($group, 201);
    }
   

    public function getUserConversations($user_id, $friend_id)
    {

        // $conversations = Conversation_User::whereIn('user_id', [$user_id, $friend_id])->first();
        $conversations = DB::table('conversation_user')
        ->select('conversation_id')
        ->whereIn('user_id', [$user_id, $friend_id]) // Tìm các conversation_id có 1 trong 2 user_id
        ->groupBy('conversation_id')
        ->havingRaw('COUNT(DISTINCT user_id) = 2') // Chỉ lấy những nhóm có đúng 2 user_id khác nhau
        ->get();

        return response()->json($conversations[0]->conversation_id);
    }

    public function sendMessage(Request $request, $conversation_id)
    {

        $message = Message::create([
            'message' => $request->message,
            'user_id' => $request->user_id,
            'conversation_id' => $conversation_id,
        ]);

        return response()->json($message);
    }

    public function getMessages($conversation_id)
    {
        $messages = Message::where('conversation_id', $conversation_id)->with('user')->get();
        $conversation = Conversation::where('id',$conversation_id)->with('users')->get();

        return response()->json(['messages'=>$messages,'conversation'=>$conversation]);
    }
}
