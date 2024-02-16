<?php

use App\Http\Controllers\Admin\DivisionController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['namespace' => 'Api', 'prefix' => 'v1'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::get('userProfile', [UserController::class, 'userProfile'])->name('userProfile');
        // Route::put('updateUserProfile', [UserController::class, 'updateUserProfile'])->name('updateUserProfile');
        Route::post('logout', [AuthController::class, 'destroy'])->name('logout');

        //division
        Route::get('division', [DivisionController::class, 'index'])->name('division.index');
        Route::post('division', [DivisionController::class, 'store'])->name('division.store');
        Route::get('division/{id}', [DivisionController::class, 'show'])->name('division.show');
        Route::put('division/{id}', [DivisionController::class, 'update'])->name('division.update');
        Route::delete('division/{id}', [DivisionController::class, 'destroy'])->name('division.destroy');

        //position
        Route::get('position', [PositionController::class, 'index'])->name('position.index');
        Route::post('position', [PositionController::class, 'store'])->name('position.store');
        Route::get('position/{id}', [PositionController::class, 'show'])->name('position.show');
        Route::put('position/{id}', [PositionController::class, 'update'])->name('position.update');
        Route::delete('position/{id}', [PositionController::class, 'destroy'])->name('position.destroy');
    });
});
