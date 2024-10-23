<?php

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
use App\Http\Controllers\UserController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\GroupInvitationController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Routes cho User
Route::get('/users', [UserController::class, 'index']); 
Route::post('/users', [UserController::class, 'store']); 
Route::get('/users/{id}', [UserController::class, 'show']); 
Route::put('/users/{id}', [UserController::class, 'update']); 
Route::delete('/users/{id}', [UserController::class, 'destroy']); 

// Routes cho Conversation
Route::get('/conversations', [ConversationController::class, 'index']); 
Route::post('/conversations', [ConversationController::class, 'store']); 
Route::get('/conversations/{id}', [ConversationController::class, 'show']); 
Route::put('/conversations/{id}', [ConversationController::class, 'update']); 
Route::delete('/conversations/{id}', [ConversationController::class, 'destroy']); 

// Routes cho Message
Route::get('/conversations/{conversation_id}/messages', [MessageController::class, 'index']); 
Route::post('/conversations/{conversation_id}/messages', [MessageController::class, 'store']); 
Route::get('/messages/{id}', [MessageController::class, 'show']); 
Route::put('/messages/{id}', [MessageController::class, 'update']); 
Route::delete('/messages/{id}', [MessageController::class, 'destroy']); 

// Routes cho Group Invitations
Route::post('/conversations/{conversation_id}/invitations', [GroupInvitationController::class, 'store']); 
Route::put('/invitations/{id}', [GroupInvitationController::class, 'update']); 
Route::delete('/invitations/{id}', [GroupInvitationController::class, 'destroy']); 
