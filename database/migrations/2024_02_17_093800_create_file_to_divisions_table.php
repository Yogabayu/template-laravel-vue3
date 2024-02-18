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
        Schema::create('fileToDivisions', function (Blueprint $table) {
            $table->id();
            $table->uuid('file_uuid')->unique();
            $table->uuid('division_uuid')->unique();
            $table->timestamps();


            $table->foreign('division_uuid')->references('id')->on('divisions');
            $table->foreign('file_uuid')->references('id')->on('files');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fileToDivisions');
    }
};
