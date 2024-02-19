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
        Schema::create('fileToPositions', function (Blueprint $table) {
            $table->id();
            $table->uuid('file_uuid');
            $table->uuid('position_uuid');
            $table->timestamps();


            $table->foreign('position_uuid')->references('id')->on('positions');
            $table->foreign('file_uuid')->references('id')->on('files');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fileToPositions');
    }
};
