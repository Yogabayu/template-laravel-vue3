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
        Schema::create('draft_approval_mappings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('draft_id');
            $table->uuid('position_id');
            $table->boolean('is_approved')->default(false);
            $table->timestamps();

            $table->foreign('draft_id')->references('id')->on('drafts');
            $table->foreign('position_id')->references('id')->on('positions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('draft_approval_mappings');
    }
};
