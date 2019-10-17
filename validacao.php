<?php
header('Content-Type: text/plain');
$usuario = "root";
$password="";

$selecao = $_GET["campo1"];
$senha = $_GET["campo2"];
$senha2 = md5($senha);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=ponto-sysuni', $usuario, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $consulta = $pdo->prepare("SELECT password FROM autenticacao WHERE nome = :nome AND password = :senha");
    // $consulta = $pdo->prepare("SELECT password FROM autenticacao WHERE nome = :nome");   
    $consulta->execute(array(
        ':nome' => $selecao,
        ':senha' => $senha2
    ));
    $teste=json_encode($consulta->fetchAll(), JSON_PRETTY_PRINT);
   
    echo $teste;
    // if($teste.password == md5($senha)){
        // echo "ta certo";
    // }
    // else echo "";
}
catch(PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}
?>