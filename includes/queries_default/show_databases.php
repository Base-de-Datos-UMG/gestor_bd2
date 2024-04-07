<?php

    function get_all_databases($conn){
        $sql = "SHOW DATABASES";
        $result = mysqli_query($conn, $sql);

        // Verificar si la consulta fue exitosa
        if (!$result) {
            die("Error al ejecutar la consulta: " . mysqli_error($conn));
        }
        return $result;
    }