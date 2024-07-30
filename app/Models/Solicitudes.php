<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

//use App\Models\Proyectos;
//use App\Models\User;


class Solicitudes extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_realizada',
        'fecha_deseada',
        'estado',
    ];
    
    
    /*

    public function proyectos(){
        return $this->hasMany(Proyectos::class);
    }*/



    /**
     * Get all of the proyectos for the Solicitudes
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function proyectos(): HasMany
    {
        return $this->hasMany(Proyectos::class);
    }

    public function usuarios(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * The roles that belong to the Solicitudes
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function articulos(): BelongsToMany
    {
        return $this->belongsToMany(Articulos::class, 'solicitud_articulos');
    }
}
