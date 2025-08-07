<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::get('/', function () {
    $user = Auth::user();
    if ($user) {
        if ($user->account_type == '1') {
            return redirect('/administrator/dashboard');
        } elseif ($user->account_type == '2') {
            return redirect('/users/dashboard');
        }
    }
    return Inertia::render('auth/login/page');
})->name('login');


Route::middleware(['auth:sanctum', 'account_type:1'])->prefix('administrator')->group(function () {


    Route::get('dashboard', function () {
        return Inertia::render('administrator/dashboard/page');
    })->name('administrator.dashboard');


    Route::prefix('users')->group(function () {
        Route::get('{type}', function () {
            return Inertia::render('administrator/users/slug/page');
        });
    });

    Route::get('ticketing/categories', function () {
        return Inertia::render('administrator/ticketing/categories/page');
    })->name('categories');

    Route::prefix('ticketing/{slug}')->group(function () {
        Route::get('tickets', function () {
            return Inertia::render('administrator/ticketing/slug/tickets/page');
        });
        Route::get('{id}/details', function () {
            return Inertia::render('administrator/ticketing/slug/details/page');
        });
        Route::get('dashboard', function () {
            return Inertia::render('administrator/ticketing/slug/dashboard/page');
        });
        Route::get('stats', function () {
            return Inertia::render('administrator/ticketing/slug/stats/page');
        });
        Route::get('users', function () {
            return Inertia::render('administrator/ticketing/slug/users/page');
        });
    });

    Route::get('settings', function () {
        return Inertia::render('administrator/settings/page');
    });
});


Route::middleware(['auth:sanctum', 'account_type:2'])->prefix('users')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('users/dashboard/page');
    })->name('users.dashboard');

    Route::prefix('ticketing')->group(function () {
        Route::get('my_ticket', function () {
            return Inertia::render('users/ticketing/my_ticket/page');
        });
        Route::get('internal_request', function () {
            return Inertia::render('users/ticketing/internal_request/page');
        });
        Route::get('{path}/{ticket_id}/details', function () {
            return Inertia::render('users/ticketing/details/page');
        });
    });
    Route::prefix('accounting')->group(function () {
        Route::get('my_fund_requests', function () {
            return Inertia::render('users/accounting/my_fund_requests/page');
        });
        Route::get('pending_request', function () {
            return Inertia::render('users/accounting/pending_request/page');
        });
        Route::get('daily_expenses', function () {
            return Inertia::render('users/accounting/daily_expenses/page');
        });
        Route::get('expense_reports', function () {
            return Inertia::render('users/accounting/expense_reports/page');
        });
    });
    Route::get('settings', function () {
        return Inertia::render('users/settings/page');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
