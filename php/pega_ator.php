<?php
header('Content-Type: text/plain');
$usuario = "root";
$password="";

$selecao = $_GET["campo1"];
$ini = $_GET["campo2"];
$fim = $_GET["campo3"];

// $fim = $_GET["campo3"];

//var_dump($_GET);

//$str =" teste nova memdekm ->>  $selecao";
//echo $str;s
$mes = date('m', time());
//echo $mes;

try {
   $pdo = new PDO('mysql:host=localhost;dbname=ponto-sysuni', $usuario, $password);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   // $consulta = $pdo->prepare("SELECT * FROM horarios WHERE nome = :nome AND MONTH(data_trab) = :mes ORDER BY data_trab DESC, hora_inicio DESC");
   // $consulta->execute(array(
   //    ':nome' => $selecao,
   //    ':mes' => $mes
   
   //    ));
   $consulta = $pdo->prepare("SELECT * FROM horarios WHERE  nome = :nome AND `data_trab` BETWEEN :inicio AND :fim ORDER BY data_trab DESC, hora_inicio DESC");
   
   $consulta->execute(array(
   ':nome' => $selecao,
   ':inicio'=> $ini,
   ':fim' => $fim
   ));
   //echo $consulta;
   // echo $selecao;
   $teste=json_encode($consulta->fetchAll(), JSON_PRETTY_PRINT);
   echo $teste;
  }
     catch(PDOException $e) {
      echo 'Error: ' . $e->getMessage();
    }

?>
