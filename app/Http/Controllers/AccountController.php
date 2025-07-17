<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\AccountCreatedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function get_account_by_department(Request $request)
    {
        $users = User::where('department', $request->department)->paginate(10);
        return response()->json($users, 200);
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'location' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'position' => 'required|string|max:255',
        ]);

        $user =  User::create([
            'name' => $request->name,
            'email' => $request->email,
            'location' => $request->location,
            'account_type' => $request->account_type ?? 2,
            'department' => $request->department,
            'position' => $request->position,
            'password' => Hash::make('Business12'),
            'status' => 'active'
        ]);

        $user->notify(new AccountCreatedNotification($user, 'Business12'));
        return response()->json('success', 200);
    }
    public function index(Request $request)
    {
        $search = $request->query('search');

        $users = User::where('location', $request->location)
            ->when($search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json($users, 200);
    }
}
