<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


use App\Models\Language;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Hobbie;
use App\Models\ProfileImage;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
    public function profile(Request $request)
{
    $user = $request->user()->load('languages', 'educations', 'experiences', 'hobbies', 'images', 'skills');

    return response()->json([
        'user' => $user,
        'educations' => $user->educations,
        'languages' => $user->languages,
        'experiences' => $user->experiences,
        'hobbies' => $user->hobbies,
        'images' => $user->images,
        'skills' => $user->skills,
    ], 200);
}
    
public function updateProfile(Request $request, $id)
{
   
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255',
        'about_me' => 'nullable|string',
        'live_place' => 'nullable|string|max:255',
        'phone_number' => 'nullable|string|max:20',
        'languages' => 'array',
        'languages.*.name' => 'required_with:languages|string|max:255',
        'languages.*.level' => 'required_with:languages|string|max:50',
        'educations' => 'array',
        'educations.*.institution' => 'required_with:educations|string|max:255',
        'educations.*.degree' => 'required_with:educations|string|max:255',
        'educations.*.field_of_study' => 'required_with:educations|string|max:255',
        'educations.*.start_date' => 'required_with:educations|date',
        'educations.*.end_date' => 'nullable|date',
        'experiences' => 'array',
        'experiences.*.company' => 'required_with:experiences|string|max:255',
        'experiences.*.position' => 'required_with:experiences|string|max:255',
        'experiences.*.description' => 'nullable|string',
        'experiences.*.start_date' => 'required_with:experiences|date',
        'experiences.*.end_date' => 'nullable|date',
        'skills' => 'array',
        'skills.*.name' => 'required_with:skills|string|max:255',
        'hobbies' => 'array',
        'hobbies.*.name' => 'required_with:hobbies|string|max:255',
        'hobbies.*.description' => 'nullable|string',
        'profile_images' => 'array',
        'profile_images.*.image_path' => 'required_with:profile_images|string',
    ]);

    $user = User::find($id);
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'about_me' => $request->about_me,
        'live_place' => $request->live_place,
        'phone_number' => $request->phone_number,
    ]);

   
    $user->languages()->sync($validated['languages']);
    $user->educations()->sync($validated['educations']);
    $user->experiences()->sync($validated['experiences']);
    $user->skills()->sync($validated['skills']);
    $user->hobbies()->sync($validated['hobbies']);

    if ($request->hasFile('profile_images')) {
        $user->images()->delete();
        foreach ($request->file('profile_images') as $file) {
            $path = $file->store('profile_images');
            $user->images()->create(['image_path' => $path]);
        }
    }

    return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
}


    

}
