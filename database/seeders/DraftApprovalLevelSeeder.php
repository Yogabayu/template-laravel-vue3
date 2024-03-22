<?php

namespace Database\Seeders;

use App\Models\DraftApprovalLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DraftApprovalLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            ['id' => 1, 'name' => 'Level 1', 'desc' => 'normal', 'canUpload' => 0, 'canEdit' => 0, 'canComment' => 0],
            ['id' => 2, 'name' => 'Level 2', 'desc' => 'uploader', 'canUpload' => 1, 'canEdit' => 1, 'canComment' => 1],
            ['id' => 3, 'name' => 'Level 3', 'desc' => 'reviewer', 'canUpload' => 1, 'canEdit' => 1, 'canComment' => 1],
        ];

        foreach ($positions as $position) {
            DraftApprovalLevel::create($position);
        }
    }
}
