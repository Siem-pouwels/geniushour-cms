<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Project;
use App\Models\ProjectComments;
use App\Models\ProjectProgress;
use App\Models\StudentGroup;
use App\Models\StudentHour;
use App\Models\TeacherGroup;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // php artisan db:seed DatabaseSeeder
        // Student
        $siem = User::create([
            'first_name' => 'SiemStudent',
            'email' => 'siemstudent@mail.com',
            'addition' => 'Van',
            'role' => 'student',
            'surname' => 'Pouwels',
            'password' => 123456,
            'student_number' => 69,
        ]);

        $tim = User::create([
            'first_name' => 'TimStudent',
            'email' => 'timstudent@mail.com',
            'addition' => 'Van',
            'role' => 'student',
            'surname' => 'Kol',
            'password' => 123456,
            'student_number' => 70,
        ]);

        $yannick = User::create([
            'first_name' => 'YannickStudent',
            'email' => 'yannickstudent@mail.com',
            'addition' => 'Van',
            'role' => 'student',
            'surname' => 'Maas',
            'password' => 123456,
            'student_number' => 71,
        ]);

        $siemStudentHours = StudentHour::create([
            'user_id' => $siem->id,
            'hours' => rand(0, 171)
        ]);

        $timStudentHours = StudentHour::create([
            'user_id' => $tim->id,
            'hours' => rand(0, 171)
        ]);

        $yannickStudentHours = StudentHour::create([
            'user_id' => $yannick->id,
            'hours' => rand(0, 171)
        ]);
        // END Student
        // Teacher
        $siemTeacher = User::create([
            'first_name' => 'SiemTeacher',
            'email' => 'siemteacher@mail.com',
            'addition' => 'Van',
            'role' => 'teacher',
            'surname' => 'Pouwels',
            'password' => 123456,
            'student_number' => 72,
        ]);

        $timTeacher = User::create([
            'first_name' => 'TimTeacher',
            'email' => 'timteacher@mail.com',
            'addition' => 'Van',
            'role' => 'teacher',
            'surname' => 'Kol',
            'password' => 123456,
            'student_number' => 73,
        ]);

        $yannickTeacher = User::create([
            'first_name' => 'YannickTeacher',
            'email' => 'yannickteacher@mail.com',
            'addition' => 'Van',
            'role' => 'teacher',
            'surname' => 'Maas',
            'password' => 123456,
            'student_number' => 74,
        ]);
        // END Teacher

        // Admin
        $siemAdmin = User::create([
            'first_name' => 'SiemAdmin',
            'email' => 'siemAdmin@mail.com',
            'addition' => 'Van',
            'role' => 'admin',
            'surname' => 'Pouwels',
            'password' => 123456,
            'student_number' => 75,
        ]);

        $timAdmin = User::create([
            'first_name' => 'TimAdmin',
            'email' => 'timAdmin@mail.com',
            'addition' => 'Van',
            'role' => 'admin',
            'surname' => 'Kol',
            'password' => 123456,
            'student_number' => 76,
        ]);

        $yannickAdmin = User::create([
            'first_name' => 'YannickAdmin',
            'email' => 'yannickAdmin@mail.com',
            'addition' => 'Van',
            'role' => 'admin',
            'surname' => 'Maas',
            'password' => 123456,
            'student_number' => 77,
        ]);
        // END Teacher

        $studentGroup = Group::create([
            'name' => "Webgang",
            'type' => "Webdev",
        ]);

        $teacherGroup = Group::create([
            'id' => 2,
            'name' => "Group2",
            'type' => "Type2",
        ]);

        $studentGroup1 = StudentGroup::create([
            'group_id' => $studentGroup->id,
            'user_id' => $siem->id,
        ]);

        $studentGroup2 = StudentGroup::create([
            'group_id' => $studentGroup->id,
            'user_id' => $tim->id,
        ]);
        $studentGroup3 = StudentGroup::create([
            'group_id' => $studentGroup->id,
            'user_id' => $yannick->id,
        ]);

        $teacherGroup1 = TeacherGroup::create([
            'group_id' => $teacherGroup->id,
            'user_id' => $siemTeacher->id,
        ]);

        $teacherGroup2 = TeacherGroup::create([
            'group_id' => $teacherGroup->id,
            'user_id' => $timTeacher->id,
        ]);
        $teacherGroup3 = TeacherGroup::create([
            'group_id' => $teacherGroup->id,
            'user_id' => $yannickTeacher->id,
        ]);

        // create random projects
        for ($i = 0; $i < 10; $i++) {
            $project = Project::create([
                'name' => Str::random(10),
                'category' => Str::random(10),
                'timeTotal' => rand(0, 50),
                'summary' => Str::random(10),
            ]);
            $project_proggres1 = ProjectProgress::create([
                'finished' => 0,
                'amountofhours' => 55,
                'title' => "Projectprogress 1",
                'description' => "This is a test 1",
                'teachergroups_id' => $teacherGroup->id,
                'studentgroups_id' => $studentGroup->id,
                'project_id' => $project->id,
            ]);
            $project_proggres2 = ProjectProgress::create([
                'finished' => 1,
                'amountofhours' => 65,
                'title' => "Projectprogress 2",
                'description' => "This is a test 2",
                'teachergroups_id' => $teacherGroup->id,
                'studentgroups_id' => $studentGroup->id,
                'project_id' => $project->id,
            ]);

            $comment1 = ProjectComments::create([
                'title' => "Verbeteringen",
                'text' => "Voeg footer aan de pagina toe",
                'user_id' => $siemTeacher->id,
                'projectprogress_id' => $project_proggres1->id,
            ]);

            $comment2 = ProjectComments::create([
                'title' => "Pils",
                'text' => "Zuipen kreng",
                'user_id' => $timTeacher->id,
                'projectprogress_id' => $project_proggres1->id,
            ]);

            $comment3 = ProjectComments::create([
                'title' => "Pieter post memes",
                'text' => "Nog meer memes",
                'user_id' => $yannickTeacher->id,
                'projectprogress_id' => $project_proggres1->id,
            ]);

            $comment4 = ProjectComments::create([
                'title' => "Verbeteringen",
                'text' => "Voeg footer aan de pagina toe",
                'user_id' => $siemTeacher->id,
                'projectprogress_id' => $project_proggres2->id,
            ]);

            $comment5 = ProjectComments::create([
                'title' => "Pils",
                'text' => "Zuipen kreng",
                'user_id' => $timTeacher->id,
                'projectprogress_id' => $project_proggres2->id,
            ]);

            $comment6 = ProjectComments::create([
                'title' => "Pieter post memes",
                'text' => "Nog meer memes",
                'user_id' => $yannickTeacher->id,
                'projectprogress_id' => $project_proggres2->id,
            ]);
        }
    }
}
