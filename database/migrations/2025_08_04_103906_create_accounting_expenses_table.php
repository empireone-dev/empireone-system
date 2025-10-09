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
        Schema::create('accounting_expenses', function (Blueprint $table) {
            $table->id();
            $table->string('site')->nullable();
            $table->string('user_id')->nullable();
            $table->string('assigned_to')->nullable();
            $table->integer('quantity')->nullable();
            $table->string('tin')->nullable();
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('receipt_number')->nullable();
            $table->decimal('amount', 15, 2)->nullable();
            $table->decimal('total', 15, 2)->nullable();
            $table->string('files')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('status')->nullable();
            $table->string('date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_expenses');
    }
};
