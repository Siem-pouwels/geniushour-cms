<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
    public function run()
    {
        // php artisan db:seed ProjectsSeeder
        for ($i = 0; $i < 50; $i++) {
            DB::table('projects')->insert([
                'name' => Str::random(10),
                'category' => Str::random(10),
                'timeSpent' => rand(0, 50),
                'timeTotal' => rand(0, 50),
                'summary' => Str::random(10),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
