<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\PermisoController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\ArticulosController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    
    return Inertia::render('LoginPage');
    /*return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);*/
})->name('loginpage');

/*Route::resource('user', UserController::class);*/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard',[
        'isAdmin'=>Auth::user()->hasRole('Administrador'),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


//Route::get('/admin', [AdminController::class, 'index'])->middleware(['auth', 'verified'])->name('admin.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::middleware('role_or_permission:Crear Solicitud')->group(function () {    
        Route::post('/solicitud-actualizar', [SolicitudController::class, 'update'])->name('solicitud.update');
        Route::post('/solicitud-aprobar', [SolicitudController::class, 'aprobarSolicitud'])->name('solicitud.aprobar');
        Route::post('/solicitud-negar', [SolicitudController::class, 'negarSolicitud'])->name('solicitud.negar');
        
    });

    Route::middleware('role:Administrador')->group(function () {
        //////ADMIN////////
        Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
        Route::patch('/admin', [AdminController::class, 'update'])->name('admin.update');
        Route::delete('/admin', [AdminController::class, 'delete'])->name('admin.delete');
         //////ADMIN->ROLES/////////
         Route::get('/admin/roles', [RolesController::class, 'index'])->name('roles.index');
         Route::post('/admin/roles',[RolesController::class, 'store'])->name('roles.store');
         Route::patch('/admin/roles',[RolesController::class, 'update'])->name('roles.update');
         Route::delete('/admin/roles',[RolesController::class, 'delete'])->name('roles.delete');
         //////ADMIN->PERMISO/////////
         Route::get('/admin/permisos', [PermisoController::class, 'index'])->name('permisos.index');
         Route::post('/admin/permisos',[PermisoController::class, 'store'])->name('permisos.store');
         Route::patch('/admin/permisos',[PermisoController::class, 'update'])->name('permisos.update');
         Route::delete('/admin/permisos',[PermisoController::class, 'delete'])->name('permisos.delete');
        ////////SOLICIDUD-ACTUALIZAR
        
      
    
    });
   
      ////////////////////////////////////////////////

      Route::get('/solicitud', [SolicitudController::class, 'index'])->name('solicitud.index');
      Route::get('/solicitud-crear', [SolicitudController::class, 'create'])->name('solicitud.create');
      Route::get('/solicitud-export/{id}', [SolicitudController::class, 'exportSolicitud'])->name('solicitud.exportsolicitud');    
      Route::get('/solicitud-msg', [SolicitudController::class, 'enviar_mail'])->name('solicitud.mail');    

      Route::post('/solicitud', [SolicitudController::class, 'store'])->name('solicitud.store');
      Route::resource('articulo', ArticulosController::class);
      Route::post('/articulo-import', [ArticulosController::class, 'import_articulos'])->name('articulo.import_articulos');    

    /*Route::get('/dashboardrt', function () {
        return Inertia::render('Rt/Index');
    })->middleware(['auth', 'verified'])->name('dashboardrt');*/
});

require __DIR__.'/auth.php';
