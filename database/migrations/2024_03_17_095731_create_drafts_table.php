<?php

use App\Models\DraftComment;
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
        Schema::create('drafts', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_uuid');
            $table->string('title');
            $table->string('file');
            $table->enum('status', ['pending', 'approved', 'rejected']);
            $table->integer('required_approvals')->comment('jumlah approval yang dibutuhkan')->nullable();
            $table->timestamps();

            $table->foreign('user_uuid')->references('uuid')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drafts');
    }
};
