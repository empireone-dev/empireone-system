<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\AccountCreatedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class AccountController extends Controller
{

    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        // Check email exist
        $user = User::where('email', '=', $request->email)->first();

        // Check password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid credentials'
            ], 401);
        }

        $data['token'] = $user->createToken($request->email)->plainTextToken;
        $data['user'] = $user;

        $response = [
            'status' => 'success',
            'message' => 'User is logged in successfully.',
            'data' => $data,
        ];

        return response()->json($response, 200);
    }

    // Update the authenticated user's own profile (settings page).
    public function update_profile(Request $request)
    {
        $user = $request->user();

        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 422);
        }

        $user->update($validate->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully.',
            'data' => $user->fresh(),
        ], 200);
    }

    // Update the authenticated user's own password (settings page).
    public function update_password(Request $request)
    {
        $user = $request->user();

        $validate = Validator::make($request->all(), [
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 422);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => ['current_password' => ['The current password is incorrect.']],
            ], 422);
        }

        $user->update(['password' => Hash::make($request->password)]);

        return response()->json([
            'status' => 'success',
            'message' => 'Password updated successfully.',
        ], 200);
    }

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
