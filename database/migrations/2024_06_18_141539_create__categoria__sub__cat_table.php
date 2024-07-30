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
       Schema::create('categorias', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->timestamps();
        });
        Schema::create('sub_categorias', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->timestamps();
        });
        Schema::create('categorias_subcategorias', function (Blueprint $table) {
            $table->unsignedInteger('id_categorias');
            $table->unsignedInteger('id_sub_categorias');
            $table->foreign('id_categorias')
            ->references('id')
            ->on('categorias')
            ->onDelete('cascade');
            $table->foreign('id_sub_categorias')
            ->references('id')
            ->on('categorias')
            ->onDelete('cascade');
            $table->timestamps();
        });
        Schema::table('articulos', function (Blueprint $table) {
            $table->unsignedInteger('id_sub_categorias');
            $table->foreign('id_sub_categorias')
            ->references('id')
            ->on('sub_categorias')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorias');
        Schema::dropIfExists('sub_categorias');
    }
};
