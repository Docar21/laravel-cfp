<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as RR;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Models\User;
use DB;
//use App\Models\User;

class RolesController extends Controller
{
    public function index(){
        
        return Inertia::render('Roles/Index',
        [
            'roles' => Role::query()
                ->when(RR::input('search'),function($query, $search) {
                    $query->where('name','like','%'.$search.'%');
                })->paginate(6)
                ->withQueryString(),
                'filters' => RR::only(['search']),
              'permisos'=>Permission::all(),
              'permissionNames'=> DB::table('role_has_permissions')
              ->join('roles','role_has_permissions.role_id','=','roles.id')
              ->join('permissions','role_has_permissions.permission_id','=','permissions.id')
              ->select('roles.id as rol_id','permissions.id as permiso_id')
              ->get(),
              'isAdmin'=>User::find(1)->hasRole('Administrador'),
              
        ]);
    }


    public function edit($id){
        $role=Role::find($id);
        return Inertia::render('Roles/Edit',[
            'role'=>Role::find($id),
            'permissionNames'=> DB::table('roles')->select('roles.id as rol_id','roles.name as rol_name','permissions.id as permiso_id','permissions.name as permiso_name')
              ->leftJoin('role_has_permissions', 'roles.id', '=', 'role_has_permissions.role_id')
              ->leftJoin('permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
              ->where('roles.id','=',$id)
              ->get(),
              'permission'=>Permission::all(),
        ]);
    }

    public function store(Request $request){
        Role::create(['name' => $request->input("name")]);
        return redirect()->route('roles.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);
    }
    public function update(Request $request){
       // dd($request);
        $role=Role::find($request->input("id"));
        $role->syncPermissions($request->RolPermiso);
        return redirect()->route('roles.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Registro actualizado con éxito']);
       
    }
    public function delete(Request $request){        
        $role=Role::find($request->input("id"));
        $role->delete();
        return redirect()->route('roles.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Registro eliminado con éxito']);
    }
}
