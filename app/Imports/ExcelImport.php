<?php

namespace App\Imports;

use App\Models\Articulos;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;


class ExcelImport implements ToModel,WithHeadingRow
{
    /**
    * @param Collection $collection
    */

    //HeadingRowFormatter::default('none');

    public function model(array $row)
    {
        //dd($row);
            return new Articulos([
                'numero_articulo' => $row['numero_articulo'],
                'descripcion_articulo' => $row['descripcion_articulo'],
             ]);
        
    }
}
