<?php

    function db_query($query, $conn) {

        // $result = $conn->query($query);
        // return $result;

        if ($conn->connect_error) {
            die("Error de conexión: " . $conn->connect_error);
        } else {
            // echo "Conexion exitosa";
        }

        // Detectar la acción de la consulta SQL
        $query = str_replace("\n", "", $query);
        $action = strtoupper(explode(' ', trim($query))[0]);

        switch ($action) {
            case 'USE':
                $secondWord = strtoupper(explode(' ', trim($query))[1]);
                $db = strtoupper(explode(' ', trim($query))[2]);
                switch ($secondWord) {
                    case 'DATABASE':
                        header("Location: ./?db=".$db);
                        break;
                    default:
                        return "Acción USE no válida";
                        break;
                }
            case 'DESC':
            case 'DESCRIBE':
                // Acción DESCRIBE o DESC
                $result = $conn->query($query);
                // Código para manejar los resultados de DESCRIBE o DESC
                return $result;

            case 'SELECT':
                // Acción SELECT
                $result = $conn->query($query);
                // Código para manejar los resultados de SELECT
                return $result;

            case 'UPDATE':
                // Acción UPDATE
                $result = $conn->query($query);
                // Código para manejar los resultados de UPDATE
                return $result;

            case 'ALTER':
                // Acción ALTER
                $result = $conn->query($query);
                // Código para manejar los resultados de ALTER
                return $result;

            case 'TRUNCATE':
                // Acción TRUNCATE
                $result = $conn->query($query);
                // Código para manejar los resultados de TRUNCATE
                return $result;

            case 'SHOW':
                $secondWord = strtoupper(explode(' ', trim($query))[1]);
                switch ($secondWord) {
                    case 'TABLES':
                        // Acción SHOW TABLES
                        $result = $conn->query($query);
                        // Código para manejar los resultados de SHOW TABLES
                        return $result;
                    
                    case 'DATABASES':
                        // Acción SHOW DATABASES
                        $result = $conn->query($query);
                        // Código para manejar los resultados de SHOW DATABASES
                        return $result;

                    default:
                        return "Acción SHOW no válida";
                        break;
                }

            case 'CREATE':
                $secondWord = strtoupper(explode(' ', trim($query))[1]);

                switch ($secondWord) {
                    case 'VIEW':
                        // Acción CREATE VIEW
                        $result = $conn->query($query);
                        // Código para manejar los resultados de CREATE VIEW
                        return $result;

                    case 'TABLE':
                        // Acción CREATE TABLE
                        $result = $conn->query($query);
                        // Código para manejar los resultados de CREATE TABLE
                        return $result;

                    case 'PROCEDURE':
                        // Acción CREATE PROCEDURE
                        $result = $conn->query($query);
                        // Código para manejar los resultados de CREATE PROCEDURE
                        return $result;

                    // Agrega más casos según sea necesario para otras acciones CREATE

                    default:
                        return "Acción CREATE no válida";
                        break;
                }
                break;

            case 'TRIGGER':
                // Acción TRIGGER
                $result = $conn->query($query);
                // Código para manejar los resultados de TRIGGER
                return $result;

            // Agrega más casos según sea necesario para otras acciones

            default:
                return "Acción no reconocida";
                break;
        }
    }