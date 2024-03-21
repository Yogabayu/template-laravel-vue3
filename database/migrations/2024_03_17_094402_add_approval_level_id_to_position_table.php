<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Temporarily drop the foreign key constraint
        // Schema::table('positions', function (Blueprint $table) {
        //     $table->dropForeign(['approval_level_id']);
        // });

        // Add the column with the foreign key constraint without validation
        Schema::table('positions', function (Blueprint $table) {
            $table->unsignedBigInteger('approval_level_id')->nullable()->after('name');
            $table->foreign('approval_level_id')->references('id')->on('draft_approval_levels');
        });

        // Update existing data if needed

        // Re-add the foreign key constraint
        // Schema::table('positions', function (Blueprint $table) {
        //     $table->foreign('approval_level_id')->references('id')->on('draft_approval_levels');
        // });
    }

    public function down()
    {
        Schema::table('positions', function (Blueprint $table) {
            // $table->dropForeign(['approval_level_id']);
            // $table->dropColumn('approval_level_id');
        });
    }
};
