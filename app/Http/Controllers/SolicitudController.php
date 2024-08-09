<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as RR;

use Inertia\Inertia;
use App\Models\Articulos;
use App\Models\Proyectos;
use App\Models\Solicitudes;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Exports\SolicitudExportar;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Database\Query\JoinClause;
use Mail;
use DB;
use App\Mail\Notification;



class SolicitudController extends Controller
{
    public function index(){      
                      //->join('solicitudes','solicitud_articulos.id_solicitud','=','solicitudes.id')->where('solicitudes.id','=',3)
        //              ->join('articulos','solicitud_articulos.id_articulo','=','articulos.id')
        //                ->join('proyectos','solicitudes.id_proyecto','=','proyectos.id')

        return Inertia::render('Solicitud/Index',[
              'solicitudDetalle'=> DB::table('solicitud_articulos')
              ->join('solicitudes','solicitud_articulos.id_solicitud','=','solicitudes.id')
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
              'obs_compras',
              'solicitud_articulos.aprobado as estado_articulo',
              'cantidad')
              ->get(),
              //////////
              /*'solicitudes' => Solicitudes::query()
                ->when(RR::input('search'),function($query, $search) {
                    $query->join('proyectos','solicitudes.id_proyecto','=','proyectos.id')
                    ->join('users','solicitudes.id_user','=','users.id')
                    ->select('solicitudes.id as solicitud_id','solicitudes.fecha_realizada','solicitudes.fecha_deseada','solicitudes.estado', 'proyectos.name AS proyecto', 'users.name AS usuario')
                    ->where('proyectos','like','%'.$search.'%');
                })->Paginate(30),
                'filters' => RR::only(['search']),*/
              /*'solicitudes'=>DB::table('solicitudes')
              ->join('proyectos','solicitudes.id_proyecto','=','proyectos.id')
              ->join('users','solicitudes.id_user','=','users.id')
              ->select('solicitudes.id as solicitud_id','solicitudes.fecha_realizada','solicitudes.fecha_deseada','solicitudes.estado', 'proyectos.name AS proyecto', 'users.name AS usuario')
              ->Paginate(30)
              ->withQueryString(),*/
              //'filters' => RR::only(['search']),
                'solicitudes'=>Solicitudes::query()->join('proyectos','solicitudes.id_proyecto','=','proyectos.id')->join('users','solicitudes.id_user','=','users.id')
                ->select('solicitudes.id as solicitud_id','solicitudes.fecha_realizada','solicitudes.fecha_deseada','solicitudes.estado', 'proyectos.name AS proyecto', 'users.name AS usuario')
                ->when(RR::input('search'),function($table, $search) {
                    $table->where('estado','like','%'.$search.'%')->OrWhere('proyectos.name','like','%'.$search.'%');
                })->Paginate(20)->withQueryString(),
                'filters' => RR::only(['search']),


              /////////
              'solicitudesAprobadas'=>DB::table('solicitudes')
              ->join('proyectos','solicitudes.id_proyecto','=','proyectos.id')
              ->join('users','solicitudes.id_user','=','users.id')
              ->select('solicitudes.id as solicitud_id','solicitudes.fecha_realizada','solicitudes.fecha_deseada','solicitudes.estado', 'proyectos.name AS proyecto', 'users.name AS usuario')
              ->where('solicitudes.estado','=','Aprobado')
              ->get(),
              ///////
              'isAdmin'=>User::find(Auth::user()->id)->hasRole('Administrador'),
              'isCompras'=>User::find(Auth::user()->id)->hasRole('compras'),
              'isRt'=>User::find(Auth::user()->id)->hasRole('RT'),
              
        ]);

    }

    public function create(){
        return Inertia::render('Solicitud/Create',
        [
            'articulos' => Articulos::query()
                ->when(RR::input('search'),function($query, $search) {
                    $query->where('descripcion_articulo','like','%'.$search.'%');
                })->paginate(10)
                ->withQueryString(),
                'filters' => RR::only(['search']),
                'proyectos'=>Proyectos::all(),
                
        ]);

    }
   
    public function store(Request $request){
        $articulos=$request->input("coleccion");
        $fecha_deseada=$request->input("fecha_deseada");
        $proyecto=$request->input("proyecto");
        $usuario=$request->input("usuario");  
        
        try {
            DB::beginTransaction();
            $id_solicitud=DB::table('solicitudes')->insertGetId([
                'fecha_realizada'=>date("Y-m-d"),
                'fecha_deseada'=>$fecha_deseada,
                'estado'=>'En Espera',
                'id_proyecto'=>$proyecto,
                'id_user'=>$usuario]);

                foreach ($articulos as $articulo) {
                    DB::table('solicitud_articulos')->insert([
                        'id_solicitud'=>$id_solicitud,
                        'id_articulo'=>$articulo['id'],
                        'obs_gerencia'=>'',
                        'obs_compras'=>'',
                        'cantidad'=>$articulo['cant'],
                        'observaciones'=>$articulo['comn'],
                        'aprobado'=>''
                    ]);
                }
            DB::commit();
            return to_route('solicitud.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);
            //return redirect()->route('solicitud.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);

        } catch (\Throwable $th) {
                DB::rollBack();
                return redirect()->route('solicitud.index')->with('message',['type' => 'error', 'action' => 'success', 'text' => 'ERROR']);

            
        } 
    }

    public function aprobarSolicitud(Request $request){
        $id_solicitud=$request->input("id_solicitud");
        $estado='Aprobado Total';
        DB::update('update solicitudes set estado = ? where id = ?', [$estado,$id_solicitud]);
        return redirect()->route('solicitud.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);

    }
    public function negarSolicitud(Request $request){
        //dd($request);
        $id_solicitud=$request->input("id_solicitud");
        $estado='Negado';
        DB::update('update solicitudes set estado = ? where id = ?', [$estado,$id_solicitud]);
        return redirect()->route('solicitud.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);

    }

    public function update(Request $request){
        //dd($request);
        $id_solicitud=$request->input("id_solicitud");
        $observaciones=$request->input("observaciones_gerencia");
        $aprobado=$request->input("aprobados");
        $is_Admin=$request->input("isAdmin");
        $is_Compras=$request->input("isCompras");
        $isAprobado='Aprobado Por Gerencia';
        $mayor=((count($aprobado)+count($observaciones))+((count($aprobado)-count($observaciones))*(-1)))/2;
        //dd($mayor);
        try {
            //isset($observaciones)
            DB::beginTransaction();
            for ($i=0; $i<=$mayor;$i++) {
                if(isset($observaciones[$i])){
                    if($is_Admin){
                        DB::update('update solicitud_articulos set obs_gerencia = ? where id_solicitud = ? AND id_articulo= ?', [$observaciones[$i],$id_solicitud,$i]);
                    }
                    if($is_Compras){
                        DB::update('update solicitud_articulos set obs_compras = ? where id_solicitud = ? AND id_articulo= ?', [$observaciones[$i],$id_solicitud,$i]);
                    }
                }
                if(isset($aprobado[$i])){
                    DB::update('update solicitud_articulos set aprobado = ? where id_solicitud = ? AND id_articulo= ?', [$isAprobado,$id_solicitud,$aprobado[$i]]);
                }
            }
            DB::commit();
            //enviar_mail();
            //Mail::to('docar.decz@gmail.com')->send(new Notification);
            return redirect()->route('solicitud.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->route('solicitud.index')->with('message',['type' => 'error', 'action' => 'success', 'text' => $th]);
        }
    }
    public function exportSolicitud($id) 
    {
        try {
            //return mail();
            return Excel::download(new SolicitudExportar($id), 'Solicitud.xlsx');       
            //Excel::download(new SolicitudExportar, 'Solicitud.xlsx');
            redirect()->route('solicitud.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);

        } catch (\Throwable $th) {
            redirect()->route('solicitud.index')->with('message',['type' => 'error', 'action' => 'success', 'text' => $th]);
        }
        

    }

    public function enviar_mail()
    {
        try {
            Mail::to('docar.decz@gmail.com')->send(new Notification);
            return redirect()->route('solicitud.index')->with('message',['type' => 'success', 'action' => 'success', 'text' => 'Tarea Realizada con éxito']);
        } catch (\Throwable $th) {
            return $th;
        }
        
        /*$data = array('name'=>"Our Code World");
        // Path or name to the blade template to be rendered
        $template_path = 'email_template';

        Mail::send(['text'=> $template_path ], $data, function($message) {
            // Set the receiver and subject of the mail.
            $message->to('docar.decz@gmail.com', 'Receiver Name')->subject('Laravel First Mail');
            // Set the sender
            $message->from('auxiliarit.bolivia@confipetrol.com','Our Code World');
        });

        return "Basic email sent, check your inbox.";*/
    }
}
