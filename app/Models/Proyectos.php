<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyectos extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];
    
    public function solicitud(): BelongsTo
    {
        return $this->belongsTo(Solicitudes::class);
    }
}
