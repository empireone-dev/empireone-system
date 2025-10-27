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
                $path = $uploadedFile->store(date("Y"), 's3');
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

    public function update(Request $request, $id)
    {
        $ia = EngagementActivity::findOrFail($id);
        $ia->update($request->all());
        return response()->json(['message' => 'Update method called']);
    }

    public function destroy($id)
    {
        $ia = EngagementActivity::findOrFail($id);
        $ia->delete();
        return response()->json(['message' => 'Destroy method called']);
    }
}
