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
        Schema::table('h_r_incident_report_logs', function (Blueprint $table) {
            $table->text('notes')->nullable()->change(); // Change to text for longer notes
            $table->string('assigned_hr_handler')->nullable()->after('user');
            $table->timestamp('due_date')->nullable()->after('status'); // For 5-day NTE response deadline
        });
        
        Schema::table('h_r_incident_reports', function (Blueprint $table) {
            $table->string('department')->nullable()->after('filed_by');
            $table->string('employee_id')->nullable()->after('violator');
            $table->string('violation_type')->nullable()->after('infraction'); // Minor/Moderate/Grave
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('h_r_incident_report_logs', function (Blueprint $table) {
            $table->dropColumn(['assigned_hr_handler', 'due_date']);
        });
        
        Schema::table('h_r_incident_reports', function (Blueprint $table) {
            $table->dropColumn(['department', 'employee_id', 'violation_type']);
        });
    }
};
