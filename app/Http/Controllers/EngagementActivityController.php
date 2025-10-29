<?php

namespace App\Http\Controllers;

use App\Models\EngagementActivity;
use App\Models\EngagementCalendar;
use App\Models\EngagementFile;
use App\Models\EngagementNewsFeed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EngagementActivityController extends Controller
{
    public function index()
    {
        $currentYear = now()->year;
        $activities = EngagementActivity::whereYear('created_at', $currentYear)->with(['files'])->orderBy('id', 'desc')->get();
        return response()->json($activities, 200);
    }
    public function store(Request $request)
    {
        $ia = EngagementActivity::create($request->all());
        // EngagementNewsFeed::create([
        //     'news_feed_id' => $ia->id,
        //     'type' => 'activity',
        // ]); need to publish to news feed

        EngagementCalendar::create([
            'news_feed_id' => $ia->id,
            'type' => 'activity',
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $uploadedFile) {
                $path = $uploadedFile->store('unified/' . date("Y"), 's3');
                $url = Storage::disk('s3')->url($path);
                EngagementFile::create([
                    'news_feed_id' => $ia->id,
                    'files' => $url,
                    'type' => 'activity'
                ]);
            }
        }
        return response()->json('success', 200);
    }

    public function update_activity(Request $request)
    {
        $ia = EngagementActivity::where('id', $request->id)->first();
        $ia->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'start_at' => $request->input('start_at'),
            'end_at' => $request->input('end_at'),
        ]);
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $uploadedFile) {
                $path = $uploadedFile->store('unified/' . date("Y"), 's3');
                $url = Storage::disk('s3')->url($path);
                EngagementFile::create([
                    'news_feed_id' => $ia->id,
                    'files' => $url,
                    'type' => 'activity'
                ]);
            }
        }
        if ($request->delete_files) {
            foreach ($request->delete_files as $fileId) {
                EngagementFile::where('id', $fileId)->delete();
            }
        }
        return response()->json(['message' => 'Update method called']);
    }

    public function destroy($id)
    {
        $ia = EngagementActivity::findOrFail($id);
        $ia->delete();
        return response()->json(['message' => 'Destroy method called']);
    }
}
