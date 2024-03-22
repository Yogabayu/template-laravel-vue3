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
        Schema::create('draft_comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('draft_id');
            $table->uuid('user_uuid');
            $table->longText('desc');
            $table->string('attachment')->nullable();
            $table->timestamps();

            $table->foreign('draft_id')->references('id')->on('drafts');
            $table->foreign('user_uuid')->references('uuid')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('draft_comments');
    }
};
