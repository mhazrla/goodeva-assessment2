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
        Schema::create('logdata', function (Blueprint $table) {
            $table->id();
            $table->string('nama_alat');
            $table->char('id_alat', 16);
            $table->float('ph', 10, 2)->default(0);
            $table->float('suhu', 10, 2)->default(0);
            $table->float('amonia', 10, 2)->default(0);
            $table->float('tds', 10, 2)->default(0);
            $table->float('tss', 10, 2)->default(0);
            $table->float('salinitas', 10, 2)->default(0);
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logdata');
    }
};
