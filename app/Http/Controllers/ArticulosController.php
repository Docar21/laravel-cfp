<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as RR;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ExcelImport;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Models\Articulos;
use Inertia\Inertia;


class ArticulosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       // $articulos=Articulos::all();
        
        return Inertia::render('Articulo/Index',[
            'articulos'=>Articulos::all(),
            'isAdmin'=>User::find(Auth::user()->id)->hasRole('Administrador'),
            'isCompras'=>User::find(Auth::user()->id)->hasRole('compras'),
            'isRt'=>User::find(Auth::user()->id)->hasRole('RT'),
            
           /* 'arti' => Articulos::query()
                ->when(RR::input('search'),function($query, $search) {
                    $query->where('id','like','%'.$search.'%');
                })
                ->withQueryString(),
                'filters' => RR::only(['search']),*/
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Articulos::create([
            'numero_articulo' => $request->input("numero_articulo"),
            'descripcion_articulo' => $request->input("descripcion_articulo"),
        ]);
        return redirect()->route('articulo.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function import_articulos(Request $request){
        //dd($request->file('excel'));
        $file = $request->file('excel');
       // dd($file);
        Excel::import(new ExcelImport, $file );
        return redirect()->route('articulo.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);

    }
}
