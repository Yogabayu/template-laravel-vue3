<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('filefavorites', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_uuid');
            $table->uuid('file_uuid');
            $table->timestamps();

            $table->foreign('user_uuid')->references('uuid')->on('users');
            $table->foreign('file_uuid')->references('id')->on('files');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filefavorites');
    }
};
