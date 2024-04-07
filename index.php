<?php

    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    require_once "./includes/db_connection.php";
    include_once "./includes/queries_default/all_querie.php";
    include_once "./includes/misc.php";
    include_once "./includes/queries_default/show_databases.php";

    $conn = conectarBD();
    $bases = get_all_databases($conn);

    $selected_db = isset($_GET['db']) ? $_GET['db'] : '';

    if($selected_db != ''){
        $conn->select_db($selected_db);
    }

    $sql = isset($_POST['query']) ? $_POST['query'] : false;
    $result = $sql ? db_query($sql, $conn) : 'Consulta vacia';
    $keys = $result instanceof mysqli_result ? get_keys_result($result) : '';

    // echo "<pre>";
    //     var_dump($result);
    // echo "</pre>";

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
        <h1>Base de Datos 2</h1>
        <?php if($selected_db != ''): ?><div id="selected-database"><?= $selected_db ?></div><?php endif; ?>
    </header>
    <form action="./?db=<?=$selected_db?>" method="POST" class="container">
        <div class="sidebar">
            <h2>Listado de bases de datos</h2>
            <ul>
                <?php foreach($bases as $index => $value): ?>
                    <li class="database-item"><a href="./?db=<?= $value['Database'] ?>" ><?= $value['Database'] ?></a></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <div class="content">
            <textarea id="query" name="query" spellcheck="false"><?= $sql ? $sql : "" ?></textarea>

            <input type="submit" value="Ejecutar consulta">
            <?php if($result instanceof mysqli_result): ?>
                <pre>
                    <code class="language-sql" data-prompt="false">
                        <?= $sql ?>
                    </code>
                </pre>
            <?php endif; ?>
            <div class="results" id="results">
                <table id="tabla_result" class="tabla">
                    <thead>
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
                    </tbody>
                </table>
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
</body>
</html>