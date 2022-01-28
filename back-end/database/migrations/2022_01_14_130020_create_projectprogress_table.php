<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectprogressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projectprogress', function (Blueprint $table) {
            $table->id();
            $table->boolean('finished');
            $table->integer('amountofhours');
            $table->string('title');
            $table->string('description');
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->unsignedBigInteger('teachergroups_id');
            $table->foreign('teachergroups_id')->references('id')->on('groups');
            $table->unsignedBigInteger('studentgroups_id');
            $table->foreign('studentgroups_id')->references('id')->on('groups');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projectprogress');
    }
}
