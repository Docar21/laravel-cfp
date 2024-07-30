<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Request as RR;
use Inertia\Inertia;
use App\Models\User;


class PermisoController extends Controller
{
    public function index(){
        return Inertia::render('Permiso/Index',
        [
            'permisos' => Permission::query()
                ->when(RR::input('search'),function($query, $search) {
                    $query->where('name','like','%'.$search.'%');
                })->paginate(6)
                ->withQueryString(),
                'filters' => RR::only(['search']),
                'isAdmin'=>User::find(1)->hasRole('Administrador'),
        ]);
    }
    public function store(Request $request){
        Permission::create(['name' => $request->input("name")]);
        return redirect()->route('permisos.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);
    }
    public function update(Request $request){
        $permiso=Permission::find($request->input("id"));
        $permiso->name=$request->input('name');
        $permiso->save();
        return redirect()->route('permisos.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Registro actualizado con éxito']);
    }
    public function delete(Request $request){        
        $permiso=Permission::find($request->input("id"));
        $permiso->delete();
        return redirect()->route('permisos.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Registro eliminado con éxito']);
    }
}
