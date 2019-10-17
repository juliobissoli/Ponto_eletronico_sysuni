<?php
header('Content-Type: text/plain');
//echo phpinfo();
 $usuario = "root";
 $password="";
 $selecao = $_GET["campo1"];
 $data_ini = $_GET["campo2"];
 $data_fim = $_GET["campo3"];
  
  try {
   $pdo = new PDO('mysql:host=localhost;dbname=ponto-sysuni', $usuario, $password);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  

   $consulta = $pdo->prepare(" SELECT * FROM `horarios` WHERE `nome` = :nome AND `data_trab` BETWEEN :inicio AND :fim");
   $consulta->execute(array(
   ':nome' => $selecao,
   ':inicio' => $data_ini,
   ':fim' => $data_fim
   ));
   $teste=json_encode($consulta->fetchAll(), JSON_PRETTY_PRINT);
   echo $teste;
   }
    catch(PDOException $e) {
     echo 'Error: ' . $e->getMessage();
   }


?>
