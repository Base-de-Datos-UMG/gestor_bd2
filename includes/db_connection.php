<?php

function conectarBD() {
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
  }

  return $conn;
}

?>