<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\Position;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisionIds = DB::table('divisions')->pluck('id');

        $positionIds = DB::table('positions')->pluck('id');

        $users = [
            [
                'uuid' => Str::uuid(),
                'division_id' => $divisionIds->random(),
                'position_id' => $positionIds->random(), // Corrected line
                'nik' => '11111111',
                'name' => 'John Doe',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('12345678'),
                'photo' => 'admin.png',
                'isActive' => 1,
                'isAdmin' => 1,
                'canDownload' => 1,
                'canPrint' => 1,
                'canComment' => 1,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
