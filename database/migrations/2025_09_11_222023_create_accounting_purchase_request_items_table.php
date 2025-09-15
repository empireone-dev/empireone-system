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
        Schema::create('accounting_purchase_request_items', function (Blueprint $table) {
            $table->id();
            $table->string('stock_no')->nullable();
            $table->string('unit')->nullable();
            $table->string('description')->nullable();
            $table->string('quantity')->nullable();
            $table->string('unit_cost')->nullable();
            $table->string('total_cost')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_purchase_request_items');
    }
};
