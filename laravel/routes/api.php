<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/user',[UserController::class,'index']);
Route::post('/user',[UserController::class,'store']);
Route::post('/conversation', action: [ChatController::class, 'createConversation']);
Route::post('/group_conversation', action: [ChatController::class, 'createGroupConversation']);
Route::get('/group_conversation', action: [ChatController::class, 'groupConversation']);

Route::get('/user/{user_id}/{friend_id}/conversations', [ChatController::class, 'getUserConversations']);
Route::get('/group/{group_id}//conversations', [ChatController::class, 'getGroupConversations']);

Route::post('/conversation/{conversation_id}/message', [ChatController::class, 'sendMessage']);
Route::get('/conversation/{conversation_id}/messages', [ChatController::class, 'getMessages']);
