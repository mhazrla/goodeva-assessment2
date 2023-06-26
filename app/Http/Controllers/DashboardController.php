<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use App\Models\Logdata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function index()
    {
        $alats = Dashboard::get();

        return Inertia::render(
            'Dashboard/Index',
            [
                'title' => 'Dashboard',
                'alats' => $alats
            ]
        );
    }

    public function show($id)
    {
        $alats = Dashboard::get();
        $sensor = Dashboard::where('id_alat', $id)->firstOrFail();

        $data_avg = [];
        $averages = DB::table('logdata')
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('AVG(ph) as ph_avg'),
                DB::raw('AVG(suhu) as suhu_avg'),
                DB::raw('AVG(amonia) as amonia_avg'),
                DB::raw('AVG(tss) as tss_avg'),
                DB::raw('AVG(tds) as tds_avg'),
                DB::raw('AVG(salinitas) as salinitas_avg'),
            )
            ->groupBy('date')
            ->get();

        foreach ($averages as $average) {
            $date = $average->date;
            $data_avg['ph'] = $average->ph_avg;
            $data_avg['suhu'] = $average->suhu_avg;
            $data_avg['amonia'] = $average->amonia_avg;
            $data_avg['tss'] = $average->tss_avg;
            $data_avg['tds'] = $average->tds_avg;
            $data_avg['salinitas'] = $average->salinitas_avg;
        }

        return Inertia::render(
            'Dashboard/Detail',
            [
                'title' => 'Detail',
                'sensor' => $sensor,
                'alats' => $alats,
                'data_avg' => $averages
            ]
        );
    }

    public function store(Request $request)
    {
        if (auth()->user()->role === 0) abort(403);

        $this->validate(
            $request,
            ['nama_alat' => 'required']
        );

        Dashboard::create([
            'nama_alat' => $request->nama_alat,
            'id_alat' => Str::random(12),
        ]);

        return to_route('/')->with('message', 'Alat Berhasil Ditambahkan');
    }

    public function destroy($id)
    {
        if (auth()->user()->role === 0) abort(403);

        Dashboard::where('id_alat', $id)->firstOrFail()->delete();
        return Redirect::route('/');
    }

    public function getData(Request $request)
    {
        $id_alat = $request->segment(3);
        $nama_alat = $request->segment(4);
        $ph = $request->segment(5);
        $suhu = $request->segment(6);
        $amonia = $request->segment(7);
        $tss = $request->segment(8);
        $tds = $request->segment(9);
        $salinitas = $request->segment(10);
        $status = 0;

        if ($amonia < 0.1) {
            if ($ph >= 6 && $ph <= 8.5) {
                if ($suhu >= 28 && $suhu <= 32) {
                    if ($tds < 1000 and ($tss > 3.8 or $salinitas >= 0 && $salinitas <= 0.4)) {
                        $status = 1;
                    }
                }
            }
        }


        $data = [
            "id_alat" => $id_alat,
            "nama_alat" => $nama_alat,
            "ph" => $ph,
            "suhu" => $suhu,
            "amonia" => $amonia,
            "tss" => $tss,
            "tds" => $tds,
            "salinitas" => $salinitas,
            "status" => $status,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString()
        ];
        Dashboard::where('id_alat', $id_alat)->firstOrFail()->update($data);
        Logdata::insert($data);
        return response()->json(['message' => 'Success'], 200);
    }

    public function ApiCall()
    {
        $dashboard = Dashboard::get();
        return response()->json($dashboard);
    }

    public function ApiCallByID($id)
    {
        $dashboard = Dashboard::where('id_alat', $id)->firstOrFail();
        return response()->json($dashboard);
    }
}
