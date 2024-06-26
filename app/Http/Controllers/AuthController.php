<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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

    public function checkAuth(Request $request)
    {
        if (Auth::check()) {
            return response()->json(['authenticated' => true]);
        }
        return response()->json(['authenticated' => false], 401);
    }

    public function profile(Request $request)
    {
        $user = $request->user();
        return response()->json($user, 200);
    }

   
    public function updateName(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->name = $request->name;
        $user->save();

        return response()->json(['message' => 'Name updated successfully']);
    }

    public function updateEmail(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->email = $request->email;
        $user->save();

        return response()->json(['message' => 'Email updated successfully']);
    }

   
    public function updateAboutMe(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->about_me = $request->about_me;
        $user->save();

        return response()->json(['message' => 'About me updated successfully']);
   }
    public function updateLivePlace(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->live_place = $request->live_place;
        $user->save();

        return response()->json(['message' => 'Live place updated successfully']);
    }

    public function updatePhoneNumber(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->phone_number = $request->phone_number;
        $user->save();

        return response()->json(['message' => 'Phone number updated successfully']);
    }

    public function updateLanguages(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->languages = $request->languages;
        $user->save();

        return response()->json(['message' => 'Languages updated successfully']);
    }

    public function updateEducations(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->educations = $request->educations;
        $user->save();

        return response()->json(['message' => 'Educations updated successfully']);
    }

    public function updateExperiences(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->experiences = $request->experiences;
        $user->save();

        return response()->json(['message' => 'Experiences updated successfully']);
    }

    public function updateSkills(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->skills = $request->skills;
        $user->save();

        return response()->json(['message' => 'Skills updated successfully']);
    }

    public function updateHobbies(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->hobbies = $request->hobbies;
        $user->save();

        return response()->json(['message' => 'Hobbies updated successfully']);
    }

    public function upload(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $path = $file->store('avatars', 'public');
            $user->avatar = $path;
            $user->save();
        }

        return response()->json(['message' => 'Avatar uploaded successfully']);
    }
}

