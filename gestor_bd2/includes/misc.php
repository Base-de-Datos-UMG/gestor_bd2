<?php

    function get_keys_result($result){
        
        $keys_array = [];

        if ($result) {
            // Obtener el primer resultado como un array asociativo
            $row = $result->fetch_assoc();
        
            // Obtener las llaves del array asociativo
            $keys = array_keys($row);
        
            // Imprimir las llaves
            foreach ($keys as $key) {
                array_push($keys_array, $key);
            }
        }

        return $keys_array;

    }