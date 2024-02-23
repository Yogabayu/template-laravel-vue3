<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            ['id' => Str::uuid(), 'name' => 'IT Programmer'],
            ['id' => Str::uuid(), 'name' => 'IT Support'],
            ['id' => Str::uuid(), 'name' => 'Account Officer Pusat'],
        ];

        foreach ($positions as $position) {
            Position::create($position);
        }
    }
}
