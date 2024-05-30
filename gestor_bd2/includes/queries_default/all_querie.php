<?php

    function db_query($query, $conn) {

        if ($conn->connect_error) {
            die("Error de conexión: " . $conn->connect_error);
        }

        $querys = explode(";", $query);

        $results = [];
        foreach ($querys as $key => $query) {  
            
            if(strlen($query)<=0){
                continue;
            }

            $result = $conn->query($query);  // Ejecuta la consulta una vez

            if (!$result) {
                array_push($results, $conn->error);
            } else {
                array_push($results, $result); 
            }
        }
        
        return $results;

    }
    