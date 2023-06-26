<?php

namespace Database\Seeders;

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
        DB::table('users')->delete();

        $users = DB::table('users')->insert([
            [
                'uuid' => Str::random(),
                'name' => 'Administrator',
                'role' => 1,
                'email' => 'admin@simonair.ipb.ac.id',
                'password' => Hash::make('Simonair321!')
            ],
            [
                'uuid' => Str::random(),
                'name' => 'User',
                'role' => 2,
                'email' => 'simonair@gmail.com',
                'password' => Hash::make('password'),
            ]

        ]);
    }
}
