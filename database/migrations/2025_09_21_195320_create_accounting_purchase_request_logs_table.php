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
        Schema::create('accounting_purchase_request_logs', function (Blueprint $table) {
            $table->id();
            $table->string('accounting_purchase_requests_id')->nullable();
            $table->string('notes')->nullable();
            $table->string('files')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_purchase_request_logs');
    }
};
