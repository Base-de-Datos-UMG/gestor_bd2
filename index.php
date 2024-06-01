<?php

    session_start();

    ini_set('display_errors', 0);
    error_reporting(E_ALL);

    require_once "./includes/db_connection.php";
    include_once "./includes/queries_default/all_querie.php";
    include_once "./includes/misc.php";
    include_once "./includes/queries_default/show_databases.php";
    
    if(!$_SESSION['User']){
        header("Location: ./login.php");
    }

    $conn = conectarBD();
    $bases = get_all_databases($conn);

    $selected_db = isset($_GET['db']) ? $_GET['db'] : '';

    if($selected_db != ''){
        $conn->select_db($selected_db);
    }

    $sql = isset($_POST['query']) ? $_POST['query'] : false;
    $results = $sql ? db_query($sql, $conn) : 'Consulta vacia';
    // $keys = $result instanceof mysqli_result ? get_keys_result($result) : '';

?>
<!DOCTYPE html>
<html>
<head>
    <title>Base de Datos 2</title>
    <link rel="stylesheet" href="./css/codemirror_5.62.0.css">
    <link rel="stylesheet" href="./css/prism_1.23.0.css" />
    <link rel="stylesheet" href="./css/styles.css">
</head>
<body>
    <header>
        <a href="./login.php?logout=1" style="color: white; text-decoration: none; float: right;">LogOut: <?=$_SESSION['username']?></a>
        <h1>Base de Datos 2</h1>
        <?php if($selected_db != ''): ?><div id="selected-database"><?= $selected_db ?></div><?php endif; ?>
    </header>
    <form action="./?db=<?=$selected_db?>" method="POST" class="container" id="form-query">
        <div class="sidebar">
            <h2>Schemas</h2>
            <ul>
                <?php foreach($bases as $index => $value): ?>
                    <li class="database-item"><a href="./?db=<?= $value['Database'] ?>" ><?= $value['Database'] ?></a></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <div class="content">
            <textarea id="query" name="query" spellcheck="false"><?= $sql ? $sql : "" ?></textarea>
            <input type="submit" value="Ejecutar consulta">
            <pre>
                <code class="language-sql" data-prompt="false">
                    <?= $sql ?>
                </code>
            </pre>
            <div class="results" id="results">
                <?php if($results): ?>
                    <?php foreach ($results as $key => $result): ?>
                        <?php if($result instanceof mysqli_result): ?>
                            <?php $keys = get_keys_result($result); ?>
                            <table id="tabla_result" class="tabla"> 
                                <thead>
                                    <tr>
                                        <th colspan="<?= count($keys) ?>">Resultado sentencia <?= ($key+1) ?></th>
                                    </tr>
                                    <tr>
                                        <?php if(is_array($keys)): ?>
                                            <?php foreach ($keys as $key): ?>
                                                <th><?= $key ?></th>
                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                    </tr>
                                </thead>
                                <tbody style="overflow-x: scroll;">
                                    <?php if($result instanceof mysqli_result): ?>
                                        <?php foreach($result as $index => $row): ?>
                                            <tr>
                                                <?php foreach ($keys as $key): ?>
                                                    <td><?= $row[$key] ?></td>
                                                <?php endforeach; ?>
                                            </tr>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                    <?php if(!$result instanceof mysqli_result): ?>
                                        <tr>
                                            <td><?= $result ?></td>
                                        </tr>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        <?php else: ?>
                            <table class="tabla">
                                <thead>
                                    <tr>
                                        <th colspan="<?= count($keys) ?>">Resultado sentencia <?= ($key+1) ?></th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr>
                                            <?php if($result ==1 ): ?>
                                                <td>Query ejecutado con exito</td>
                                            <?php else: ?>
                                                <td class="fail"><?= $result ?></td>
                                            <?php endif; ?>
                                        </tr>
                                    </tbody>
                            </table>
                        <?php endif; ?>
                            <br>
                            <div id="paginacion"></div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </form>

        <script src="./js/codemirror_5.62.0.js"></script>
        <script src="./js/codemirror_sql_5.62.0.js"></script>

        <script>
            const textarea = document.getElementById("query");
            const editor = CodeMirror.fromTextArea(textarea, {
                mode: "text/x-sql",
                lineNumbers: true
            });
        </script>

        <script src="./js/prism_1.23.0.js"></script>
        <script src="./js/prism_sql.js"></script>
        <script> Prism.highlightAll(); </script>

        <script src="./js/script.js"></script>

        
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var tabla = document.getElementsByClassName("tabla");
      var filasPorPagina = 5;
      var filas = tabla[0].querySelectorAll('tbody tr');
      var numFilas = filas.length;
      var numPaginas = Math.ceil(numFilas / filasPorPagina);

      // Función para mostrar una página específica
      function mostrarPagina(pagina) {
        //document.querySelector("#btn_"+pagina).style.backgroundColor = "red";;
        var inicio = (pagina - 1) * filasPorPagina;
        var fin = inicio + filasPorPagina;

        for (var i = 0; i < filas.length; i++) {
          if (i >= inicio && i < fin) {
            filas[i].style.display = '';
          } else {
            filas[i].style.display = 'none';
          }
        }
      }

      // Función para generar los enlaces de paginación
      function generarEnlacesPaginacion() {
        var enlaces = '';

        for (var i = 1; i <= numPaginas; i++) {
          enlaces += '<button id="btn_'+i+'" type="button" onclick="mostrarPagina(' + i + ')">' + i + '</button> ';
        }

        document.querySelector('#paginacion').innerHTML = enlaces;
      }

      window.mostrarPagina = mostrarPagina; // Agregamos la función al objeto window

      // Mostrar la primera página por defecto
      mostrarPagina(1);

      // Generar los enlaces de paginación
      generarEnlacesPaginacion();
    });
  </script>
</body>
</html>