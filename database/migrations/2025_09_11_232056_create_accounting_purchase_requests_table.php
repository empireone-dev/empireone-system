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
       Schema::create('accounting_purchase_requests', function (Blueprint $table) {
    $table->id();
    $table->string('department')->nullable();
    $table->string('requestor_id')->nullable();
    $table->string('accounting')->nullable();
    $table->string('purpose')->nullable();
    $table->string('request_no')->nullable(); // ✅ must match frontend
    $table->string('priority')->nullable(); // ✅ must match frontend
    $table->string(column: 'status')->nullable(); // ✅ must match frontend
    $table->date('date')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_purchase_requests');
    }
};
