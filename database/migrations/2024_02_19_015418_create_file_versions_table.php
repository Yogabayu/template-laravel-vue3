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
        Schema::create('fileversions', function (Blueprint $table) {
            $table->id();
            $table->uuid('file_uuid');
            $table->integer('versionNumber');
            $table->string('name');
            $table->string('path');
            $table->string('summary')->nullable();
            $table->timestamps();

            $table->foreign('file_uuid')->references('id')->on('files');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fileversions');
    }
};
