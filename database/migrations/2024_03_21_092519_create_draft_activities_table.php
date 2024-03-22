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
        Schema::create('draft_activities', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_uuid');
            $table->unsignedBigInteger('draft_id');
            $table->string('desc');
            $table->timestamps();

            $table->foreign('user_uuid')->references('uuid')->on('users');
            $table->foreign('draft_id')->references('id')->on('drafts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('draft_activities');
    }
};
