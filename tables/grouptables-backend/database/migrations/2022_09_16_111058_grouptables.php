<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Grouptables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('grouptables', function (Blueprint $table) {
            $table->id();
            $table->string('course');
            $table->string('group');
            $table->string('groupno');
            $table->text('A')->nullable(true);
            $table->text('B')->nullable(true);
            $table->text('C')->nullable(true);
            $table->text('D')->nullable(true);
            $table->text('E')->nullable(true);
            $table->text('F')->nullable(true);
            $table->text('G')->nullable(true);
            $table->text('H')->nullable(true);
            $table->text('I')->nullable(true);
            $table->text('J')->nullable(true);
            $table->text('K')->nullable(true);
            $table->text('L')->nullable(true);
            $table->text('M')->nullable(true);
            $table->text('N')->nullable(true);
            $table->text('O')->nullable(true);
            $table->text('P')->nullable(true);
            $table->text('Q')->nullable(true);
            $table->text('R')->nullable(true);
            $table->text('S')->nullable(true);
            $table->text('T')->nullable(true);
            $table->text('U')->nullable(true);
            $table->text('V')->nullable(true);
            $table->text('W')->nullable(true);
            $table->text('X')->nullable(true);
            $table->text('Y')->nullable(true);
            $table->text('Z')->nullable(true);
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
        //
        Schema::dropIfExists('grouptables');

    }
}
