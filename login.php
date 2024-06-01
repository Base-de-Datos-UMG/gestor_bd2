<?php

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "";

$conn = new mysqli($servername, $username, $password, $dbname);

if(isset($_GET['logout'])){
    unset($_SESSION);
    unset($_POST);
}

if (isset($_POST['enter'])) {
    $input_username = $_POST['username'];
    $input_password = $_POST['password'];

    // Crear la consulta
    $sql = "SELECT * FROM mysql.user WHERE User = ? AND authentication_string = PASSWORD(?)";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die("Error en la consulta SQL: " . $conn->error);
    }

    $stmt->bind_param("ss", $input_username, $input_password);

    // Ejecutar la consulta
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar si se encontró un usuario
    if ($result->num_rows > 0) {
        // Usuario válido
        $_SESSION['username'] = $input_username;
        $_SESSION['User'] = $input_username;
        $_SESSION['authentication_string'] = $input_password;
        header("Location: ./index.php");
        exit(); // Asegura que el script se detenga aquí después de la redirección
    } else {
        // Usuario no válido
        $_SESSION['user'] = false;
        echo "<script>alert('Usuario o contraseña incorrectos');</script>";
    }

    // Cerrar la declaración y la conexión
    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pantalla de Login</title>
    <link rel="stylesheet" href="./css/styles-login.css">
</head>
<body>
    <div class="login-container">
        <h1>Iniciar Sesión</h1>
        <form action="./login.php" method="post">
            <div class="input-group">
                <label for="username">Usuario</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="input-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password">
            </div>
            <button type="submit" name="enter">Ingresar</button>
        </form>
    </div>
</body>
</html>
