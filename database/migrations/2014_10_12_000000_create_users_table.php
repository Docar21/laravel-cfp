<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('proyectos', function (Blueprint $table) {
            $table->increments('id');            
            $table->string('name');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('articulos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('numero_articulo');
            $table->string('descripcion_articulo');
            $table->integer('cantidad');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('solicitudes', function (Blueprint $table) {
            $table->increments('id');
            $table->date('fecha_realizada');
            $table->date('fecha_deseada');
            $table->string('estado');
            $table->unsignedInteger('id_proyecto');
            $table->unsignedInteger('id_user');
            $table->foreign('id_proyecto')->references('id')->on('proyectos')->onDelete('cascade');
            $table->foreign('id_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('solicitud_articulos', function (Blueprint $table) {
            $table->unsignedInteger('id_solicitud');
            $table->unsignedInteger('id_articulo');
            $table->foreign('id_solicitud')
                ->references('id')
                ->on('solicitudes')
                ->onDelete('cascade');
            $table->foreign('id_articulo')
                ->references('id')
                ->on('articulos')
                ->onDelete('cascade');
            $table->primary(["id_solicitud","id_articulo"]);
            $table->string('obs_gerencia')->nullable();
            $table->string('obs_compras')->nullable();
            $table->string('observaciones')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('solicitud_articulos');
        Schema::dropIfExists('proyectos');
        Schema::dropIfExists('solicitudes');
        Schema::dropIfExists('articulos');
    }
};
