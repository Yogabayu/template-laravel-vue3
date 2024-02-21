<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DivisionController;
use App\Http\Controllers\Admin\FileController;
use App\Http\Controllers\Admin\HelperController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\UserActivityController;
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
        //user
        Route::get('userProfile', [UserController::class, 'userProfile'])->name('userProfile');
        Route::put('updateUserProfile', [UserController::class, 'updateUserProfile'])->name('updateUserProfile');
        Route::post('logout', [AuthController::class, 'destroy'])->name('logout');
        Route::get('change-admin/{uuid}', [UserController::class, 'changeAdmin'])->name('user.changeAdmin');
        Route::put('user-permission/{uuid}', [UserController::class, 'changePermision']);
        Route::delete('user-delete/{uuid}', [UserController::class, 'deleteUser']);
        Route::post('user-add', [UserController::class, 'addUser']);
        Route::get('all-user', [UserController::class, 'getAllUser']);
        //activity
        Route::get('useractivity', [UserActivityController::class, 'index']);

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

        //category
        Route::get('category', [CategoryController::class, 'index'])->name('category.index');
        Route::post('category', [CategoryController::class, 'store'])->name('category.store');
        Route::get('category/{id}', [CategoryController::class, 'show'])->name('category.show');
        Route::put('category/{id}', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('category/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');

        //file
        Route::get('file', [FileController::class, 'index'])->name('file.index');
        Route::post('file', [FileController::class, 'store'])->name('file.store');
        Route::get('file/{id}', [FileController::class, 'show'])->name('file.show');
        Route::put('file/{id}', [FileController::class, 'update'])->name('file.update');
        Route::delete('file/{id}', [FileController::class, 'destroy'])->name('file.destroy');

        //helper
        Route::get('total-file', [HelperController::class, 'totalFile']);
        Route::get('total-user', [HelperController::class, 'totalUser']);
    });
});
