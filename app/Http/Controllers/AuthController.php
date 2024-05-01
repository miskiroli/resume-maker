<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:6',
        ]);
    
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
       
        Auth::login($user);
    
       
        return response()->json(['user' => $user]);
    }
    

    public function login(Request $request)
    {
        
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
          
            $user = Auth::user();
            return response()->json(['user' => $user]);
        } else {
            
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

    public function checkAuth(Request $request): JsonResponse
    {
        if (Auth::check()) {
            return response()->json(['authenticated' => true]);
        }
        return response()->json(['authenticated' => false], 401);
    }
}
