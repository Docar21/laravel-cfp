<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

use DB;


class AdminController extends Controller
{
    public function index(){
        $usuarios=User::all();
        $permisos=Permission::all();
        $roles=Role::all();
        $allRolesPermission=User::with('roles')->get();
        $isAdmin=User::find(1)->hasRole('Administrador');
        return Inertia::render('Admin/Index',compact('usuarios','permisos','roles','allRolesPermission','isAdmin'));
    }

    public function update(Request $request){
       //dd($request); 
       $user=User::find($request->input("id"));
       $user->assignRole($request->input("RolPermiso"));
       return redirect()->route('admin.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);
    }
    public function delete(Request $request){
       $user=User::find($request->input("id"));
       $user->syncRoles($request->input("RolPermiso"));
    }
}
