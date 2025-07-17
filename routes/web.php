<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/administrator/dashboard');
    }
    return Inertia::render('auth/login/page');
})->name('login');


Route::middleware('auth:sanctum')->prefix('administrator')->group(function () {
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


Route::middleware('auth:sanctum')->prefix('users')->group(function () {
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
