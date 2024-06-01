<?php

function conectarBD() {
  $servername = "localhost";
  $username = $_SESSION['User'];
  $password = $_SESSION['authentication_string'];
  $dbname = "";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
  }

  return $conn;
}

?>