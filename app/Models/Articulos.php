<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use App\Models\Solicitudes;


class Articulos extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero_articulo',
        'descripcion_articulo',
    ];

    /**
     * Get the solicitud that owns the Articulos
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    /*public function solicitud(): BelongsTo
    {
        return $this->belongsTo(Solicitudes::class);
    }*/

    /**
     * The roles that belong to the Articulos
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function solicitud(): BelongsToMany
    {
        return $this->belongsToMany(Solicitudes::class, 'solicitud_articulos');
    }

}
