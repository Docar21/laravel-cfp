<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as RR;

use Inertia\Inertia;
use App\Models\Articulos;
use App\Models\Proyectos;
use App\Models\Solicitudes;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Query\JoinClause;
use DB;

class SolicitudExportar implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */


    //use Exportable;
    protected  $id;

    public function __construct($id){
        //dd($id);
        $this->id=$id;
    }

    public function headings():array{
        return [
            'solicitud_id',
            'articulo_id',
            'descripcion',
            'proyecto',
            'fecha realizada',
            'fecha deseada',
            'estado',
            'observaciones Gerencia',
            'observaciones Compras',
            'Estaado Articulo',
            'cantidad'

        ];
    }

    public function collection()
    {

        $solicitudDetalle = DB::table('solicitud_articulos')
                 ->join('solicitudes', function (JoinClause $join) {
                    $join->on('solicitud_articulos.id_solicitud', '=', 'solicitudes.id')->where('solicitudes.id', '=',$this->id);
                    })
              ->join('articulos','solicitud_articulos.id_articulo','=','articulos.id')
              ->join('proyectos','solicitudes.id_proyecto','=','proyectos.id')
              ->select('solicitudes.id as solicitud_id',
              'articulos.id as articulo_id',
              'descripcion_articulo AS descripcion',
              'proyectos.name AS proyecto',
              'fecha_realizada',
              'fecha_deseada',
              'estado',
              'observaciones',
              'obs_gerencia',
              'solicitud_articulos.aprobado as estado_articulo',
              'cantidad')
              ->get();
        //dd($solicitudDetalle);
        $articulos=Articulos::all();
        return $solicitudDetalle;
    }
}
