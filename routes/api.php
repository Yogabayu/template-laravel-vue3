<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DeviceController;
use App\Http\Controllers\Admin\DivisionController;
use App\Http\Controllers\Admin\FileController;
use App\Http\Controllers\Admin\HelperController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\UserActivityController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\FavoritePageController;
use App\Http\Controllers\User\FileController as UserFileController;
use App\Http\Controllers\User\HelperController as UserHelperController;
use App\Http\Controllers\User\ReadPageController;
use App\Http\Controllers\User\SearchPageController;
use App\Models\File;
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
        // route admin
        //user
        Route::get('userProfile', [UserController::class, 'userProfile'])->name('userProfile');
        Route::put('updateUserProfile', [UserController::class, 'updateUserProfile'])->name('updateUserProfile');
        Route::post('logout', [AuthController::class, 'destroy'])->name('logout');
        Route::get('change-admin/{uuid}', [UserController::class, 'changeAdmin'])->name('user.changeAdmin');
        Route::put('user-permission/{uuid}', [UserController::class, 'changePermision']);
        Route::delete('user-delete/{uuid}', [UserController::class, 'deleteUser']);
        Route::post('user-add', [UserController::class, 'addUser']);
        Route::get('all-user', [UserController::class, 'getAllUser']);
        Route::get('user-device/{uuid}', [UserController::class, 'userDevices']);
        Route::post('user-device', [UserController::class, 'changeDevice']);
        Route::delete('user-device/{id}', [UserController::class, 'deleteDevice']);
        Route::get('reset-password/{id}', [UserController::class, 'resetPassword']);
        Route::get('getmostuserview', [UserController::class, 'getMostUserview']);
        //activity
        Route::get('useractivity', [UserActivityController::class, 'index']);
        Route::get('useractivity/{id}', [UserActivityController::class, 'getUserActivity']);

        //division
        // Route::get('division', [DivisionController::class, 'index'])->name('division.index');
        // Route::post('division', [DivisionController::class, 'store'])->name('division.store');
        // Route::get('division/{id}', [DivisionController::class, 'show'])->name('division.show');
        // Route::put('division/{id}', [DivisionController::class, 'update'])->name('division.update');
        // Route::delete('division/{id}', [DivisionController::class, 'destroy'])->name('division.destroy');

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
        Route::get('fileperposition', [FileController::class, 'filePerPosition']);
        Route::get('mostfileviews', [FileController::class, 'mostView']);
        Route::get('fileviewsbyid/{id}', [FileController::class, 'fileViewsByid']);
        Route::get('fileviewbyuser/{id}', [FileController::class, 'historyFilePerUser']);
        Route::post('listhistoryfilebyuser', [FileController::class, 'getHistoryAccessUser']);
        Route::get('fileperpositionid/{id}', [FileController::class, 'filePerPositionId']);
        Route::get('filepercategoryid/{id}', [FileController::class, 'filePerCategoryId']);
        //->comment
        Route::get('comment/{id}', [FileController::class, 'getFileComment']);
        Route::post('comment', [FileController::class, 'sendComment']);
        Route::delete('comment/{id}', [FileController::class, 'deleteComment']);
        Route::put('comment/{id}', [FileController::class, 'editComment']);

        //helper
        Route::get('total-file', [HelperController::class, 'totalFile']);
        Route::get('total-user', [HelperController::class, 'totalUser']);
        Route::get('total-category', [HelperController::class, 'totalCategory']);
        Route::get('total-position', [HelperController::class, 'totalPosition']);

        //device
        Route::get('devices', [DeviceController::class, 'index']);
        Route::get('devices/{id}', [DeviceController::class, 'deviceUser']);
        Route::put('updatedevices/{id}', [DeviceController::class, 'updateDevice']);
        Route::delete('deletedevices/{id}', [DeviceController::class, 'deleteDevice']);


        //////// Route User \\\\\\\\\
        Route::group(['prefix' => 'user'], function () {
            //helper
            Route::get('total-file', [UserHelperController::class, 'totalFile']);
            Route::get('total-read', [UserHelperController::class, 'totalRead']);
            Route::get('total-fav', [UserHelperController::class, 'totalFavorite']);

            //page: dashboard
            Route::get('index', [DashboardController::class, 'index']);
            Route::get('fileFav', [DashboardController::class, 'fileFav']);
            Route::get('newestfile', [DashboardController::class, 'getNewFile']);

            //page: file
            Route::get('file/{id}', [UserFileController::class, 'detailFile']);
            Route::get('commentfile/{id}', [UserFileController::class, 'getFileComment']);
            Route::post('sendcomment', [UserFileController::class, 'sendComment']);
            Route::delete('deletecomment/{id}', [UserFileController::class, 'deleteComment']);
            Route::put('editcomment/{id}', [UserFileController::class, 'editComment']);
            Route::get('setfavfile/{id}', [UserFileController::class, 'setFavFile']);

            //page: favorite
            Route::get('fav', [FavoritePageController::class, 'favFiles']);

            //page: view
            Route::get('read', [ReadPageController::class, 'getFileView']);

            //page: search
            Route::get('search', [SearchPageController::class, 'index']);
            Route::get('category', [SearchPageController::class, 'category']);
            Route::get('category/{id}', [SearchPageController::class, 'fileToCategory']);
        });
    });
});
