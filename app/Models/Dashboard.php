<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dashboard extends Model
{
    use HasFactory;
    protected $table = 'dashboard';
    protected $fillable = ['id_alat', 'nama_alat', 'ph', 'suhu', 'amonia', 'tss', 'tds', 'salinitas'];
}
