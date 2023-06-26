<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use App\Models\Logdata;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogdataController extends Controller
{
    public function show($id)
    {
        $log = Logdata::where('id_alat', $id)->firstOrFail()->get();
        $alats = Dashboard::get();

        return Inertia::render(
            'Logdata/Detail',
            [
                'title' => 'Log Data',
                'log' => $log,
                'alats' => $alats,
            ]
        );
    }

    public function import(Request $request)
    {
        $file = $request->file('csv_file');

        $data = array_map('str_getcsv', file($file->path()));
        $headers = array_shift($data);

        foreach ($data as $row) {
            $rowData = array_combine($headers, $row);

            // Save data to the database using the model
            Logdata::create($rowData);
        }

        return to_route('/')->with('message', 'CSV imported successfully.');
    }


    // public function import(Request $request)
    // {
    //     $file = $request->file('csv_file');
    //     $csvData = file_get_contents($file);
    //     $rows = array_map('str_getcsv', explode("\n", $csvData));

    //     foreach ($rows as $row) {
    //         LogData::create([
    //             // Map the CSV columns to your database columns
    //             'nama_alat' => $row[0],
    //             'id_alat' => $row[1],
    //             'ph' => $row[2],
    //             'suhu' => $row[3],
    //             'amonia' => $row[4],
    //             'tds' => $row[5],
    //             'tss' => $row[6],
    //             'salinitas' => $row[7],
    //             'status' => $row[8],
    //             // Add more columns as needed
    //         ]);
    //     }

    //     return response()->json(['message' => 'CSV imported successfully']);
    // }
}
