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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('suffix')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('street')->nullable();
            $table->string('zip_code')->nullable();
            $table->text('address')->nullable();
            $table->string('status')->nullable();
            $table->date('hired_date')->nullable();
            $table->string('civil_status')->nullable();
            $table->string('gender')->nullable();
            $table->string('nationality')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('religion')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('father_name')->nullable();
            $table->string('emergency_contact_person')->nullable();
            $table->string('emergency_contact_number')->nullable();
            $table->text('emergency_contact_address')->nullable();
            $table->string('emergency_contact_relationship')->nullable();
            $table->string('educational_background')->nullable();
            $table->string('course')->nullable();
            $table->string('school_name')->nullable();
            $table->string('sss')->nullable();
            $table->string('tin')->nullable();
            $table->string('philhealth')->nullable();
            $table->string('pagibig')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
