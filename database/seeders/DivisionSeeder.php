<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = [
            ['id' => Str::uuid(), 'name' => 'HRGA'],
            ['id' => Str::uuid(), 'name' => 'Operation'],
            ['id' => Str::uuid(), 'name' => 'Bisnis'],
        ];

        foreach ($divisions as $division) {
            Division::create($division);
        }
    }
}
