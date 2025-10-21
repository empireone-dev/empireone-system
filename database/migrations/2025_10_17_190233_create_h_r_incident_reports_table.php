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
        Schema::create('h_r_incident_reports', function (Blueprint $table) {
            $table->id();
            $table->string('violator')->nullable();
            $table->string('date')->nullable();
            $table->string('filed_by')->nullable();
            $table->string('witness')->nullable();
            $table->longText('details')->nullable();
            $table->longText('notes')->nullable();
            $table->longText('violation')->nullable();
            $table->longText('infraction')->nullable();
            $table->longText('status')->nullable();
            $table->string('files')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('h_r_incident_reports');
    }
};
