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
        Schema::create('filetocategories', function (Blueprint $table) {
            $table->id();
            $table->uuid('category_uuid');
            $table->uuid('file_uuid');
            $table->timestamps();


            $table->foreign('category_uuid')->references('id')->on('categories');
            $table->foreign('file_uuid')->references('id')->on('files');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filetocategories');
    }
};
