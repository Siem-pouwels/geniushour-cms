<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getStudents()
    {
        return response()->json(User::where('role', '=', 'student')->get());
    }


    public function getTeachers()
    {
        return response()->json(User::where('role', '=', 'teacher')->get());
    }
    
    public function getDropdownStudents()
    {
        $users = User::where('role', '=', 'student')->get();
        $users->each(function ($model) {
            $model->setAppends(['full_name']);
        });
        return response()->json($users);
    }

    public function getDropdownTeachers()
    {
        $users = User::where('role', '=', 'teacher')->get();
        $users->each(function ($model) {
            $model->setAppends(['full_name']);
        });
        return response()->json($users);
    }

    public function InsertMultiple(Request $request)
    {
        // if the validator fails return 400 bad request
        $request =
            [
                [
                    "82630",
                    "Akhnikh",
                    "",
                    "Anass",
                    "82630@roc-teraa.nl"
                ],
                [
                    "79570",
                    "Al Haj Ali",
                    "",
                    "Bshr",
                    "79570@roc-teraa.nl"
                ],
                [
                    "83783",
                    "Bermudo Avila",
                    "",
                    "Raul",
                    "83783@roc-teraa.nl"
                ],
                [
                    "73665",
                    "Bettonvil",
                    "",
                    "Ricardo",
                    "73665@roc-teraa.nl"
                ],
                [
                    "83203",
                    "Dungen",
                    "van den",
                    "Tom",
                    "83203@roc-teraa.nl"
                ],
                [
                    "83400",
                    "Elsayyad",
                    "",
                    "Alaa",
                    "83400@roc-teraa.nl"
                ],
                [
                    "88264",
                    "Evers",
                    "",
                    "Max",
                    "88264@roc-teraa.nl"
                ],
                [
                    "83909",
                    "Gansewinkel",
                    "van",
                    "Daan",
                    "83909@roc-teraa.nl"
                ],
                [
                    "86795",
                    "Hamam",
                    "",
                    "Ousama",
                    "86795@roc-teraa.nl"
                ],
                [
                    "85737",
                    "Janse",
                    "",
                    "Xander",
                    "85737@roc-teraa.nl"
                ],
                [
                    "84850",
                    "Keizers",
                    "",
                    "Thom",
                    "84850@roc-teraa.nl"
                ],
                [
                    "84592",
                    "Kielenstijn",
                    "",
                    "Gino",
                    "84592@roc-teraa.nl"
                ],
                [
                    "71372",
                    "Kuijpers",
                    "",
                    "Sherina",
                    "71372@roc-teraa.nl"
                ],
                [
                    "77275",
                    "Nieuwland",
                    "",
                    "Harm",
                    "77275@roc-teraa.nl"
                ],
                [
                    "79147",
                    "Olşen",
                    "",
                    "Ruyetullah",
                    "79147@roc-teraa.nl"
                ],
                [
                    "83278",
                    "Tilburgs",
                    "",
                    "Simon",
                    "83278@roc-teraa.nl"
                ],
                [
                    "84788",
                    "Belkjar",
                    "",
                    "Lahcen",
                    "84788@roc-teraa.nl"
                ],
                [
                    "84036",
                    "Benders",
                    "",
                    "Niels",
                    "84036@roc-teraa.nl"
                ],
                [
                    "84758",
                    "Huijbers",
                    "",
                    "Denzel",
                    "84758@roc-teraa.nl"
                ],
                [
                    "84004",
                    "Jacobs",
                    "",
                    "Stefan",
                    "84004@roc-teraa.nl"
                ],
                [
                    "83417",
                    "Janssen",
                    "",
                    "Devan",
                    "83417@roc-teraa.nl"
                ],
                [
                    "82405",
                    "Kessel",
                    "van",
                    "Thijs",
                    "82405@roc-teraa.nl"
                ],
                [
                    "83349",
                    "Kol",
                    "van",
                    "Tim",
                    "83349@roc-teraa.nl"
                ],
                [
                    "84098",
                    "Leesberg",
                    "",
                    "Stijn",
                    "84098@roc-teraa.nl"
                ],
                [
                    "82997",
                    "Maas",
                    "",
                    "Yannick",
                    "82997@roc-teraa.nl"
                ],
                [
                    "83373",
                    "Noten",
                    "",
                    "Lisa",
                    "83373@roc-teraa.nl"
                ],
                [
                    "84181",
                    "Pouwels",
                    "",
                    "Siem",
                    "84181@roc-teraa.nl"
                ],
                [
                    "84274",
                    "Türkyilmaz",
                    "",
                    "Han",
                    "84274@roc-teraa.nl"
                ]
            ];

        foreach ($request as $user => $key) {

            $user = User::create([
                'student_number' => $key[0],
                'first_name' => $key[3],
                'surname' => $key[1],
                'addition' => $key[2],
                'email' => $key[4],
                'role' => 'student',
                'password' => Hash::make(Str::random(12))
            ]);
        }

        $response = [
            'user' => $user
        ];

        return response($response, 201);
    }
}
