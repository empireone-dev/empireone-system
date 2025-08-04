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
            $table->integer('quantity')->nullable();
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('receipt_number')->nullable();
            $table->decimal('amount', 15, 2)->nullable();
            $table->decimal('total', 15, 2)->nullable();
            $table->decimal('credit', 15, 2)->nullable();
            $table->decimal('debit', 15, 2)->nullable();
            $table->decimal('balance', 15, 2)->nullable();
            $table->string('files')->nullable();
            $table->string('status')->nullable();
            $table->date('date')->nullable();
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
