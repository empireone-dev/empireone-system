<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountTypeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $type
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $type = null)
    {
        $user = Auth::user();
        if (!$user || ($type !== null && $user->account_type != $type)) {
            // Redirect based on type
            if ($type && $type != '1') {
                return redirect('/administrator/dashboard');
            } else if ($type && $type != '2') {
                return redirect('/users/dashboard');
            } 
        }
        return $next($request);
    }
}
