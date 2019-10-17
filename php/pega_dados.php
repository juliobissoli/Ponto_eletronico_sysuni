<?php
header('Content-Type: text/plain');
//echo phpinfo();
 $usuario = "root";
 $password="";
 $selecao = $_POST["selecao"];

 
 //echo "<p> e essr trem->$selecao </p>";
  
  //$teste=json_encode($selecao->fetchAll(), JSON_PRETTY_PRINT);
 // echo $selecao;
  try {
   $pdo = new PDO('mysql:host=localhost;dbname=ponto-sysuni', $usuario, $password);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
   //$consulta = $pdo->query("SELECT * FROM `horarios` WHERE nome = :nome");
   //$consulta->execute(array(
   //':nome' => $selecao
   //));
   $consulta = $pdo->query("SELECT *  FROM horarios;");
   $teste=json_encode($consulta->fetchAll(), JSON_PRETTY_PRINT);
   echo $teste;
   }
    catch(PDOException $e) {
     echo 'Error: ' . $e->getMessage();
   }


?>
