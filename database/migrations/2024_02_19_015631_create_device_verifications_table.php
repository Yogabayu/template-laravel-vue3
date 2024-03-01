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
        Schema::create('deviceverifications', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_uuid');
            $table->string('deviceName');
            $table->string('ip')->nullable();
            $table->string('verificationCode')->nullable();
            $table->boolean('isVerified')->default(0);
            $table->timestamps();

            $table->foreign('user_uuid')->references('uuid')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deviceverifications');
    }
};
