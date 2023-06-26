<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AlatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('dashboard')->insert([
            'nama_alat' => Str::random(5),
            'id_alat' => Str::random(16),
            'ph' => fake()->randomFloat(2, 0, 2),
            'suhu' => fake()->randomFloat(2, 0, 2),
            'amonia' => fake()->randomFloat(2, 0, 2),
            'tds' => fake()->randomFloat(2, 0, 2),
            'tss' => fake()->randomFloat(2, 0, 2),
            'salinitas' => fake()->randomFloat(2, 0, 2),
            'status' => 0
        ]);
    }
}
