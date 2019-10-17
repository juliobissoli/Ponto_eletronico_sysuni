<?php 
header('Content-Type: text/plain');
//echo phpinfo();
 $usuario = "root";
 $password="";
 $id = $_POST["id"];

    //echo $id;

    //Obter hora no padrao brasileiro
    date_default_timezone_set('America/Sao_Paulo');
    $hora_atual = date('H:i:s', time());

    //Faz manipulaçao no banco
    try {
      $pdo = new PDO('mysql:host=localhost;dbname=ponto-sysuni', $usuario, $password);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      //UPDATE `horarios` SET `hora_fim` = '11:30:40' WHERE `horarios`.`id` = 31;
      //Atualiza a hora fim como a hora atual e muda a flag para 1
      $stmt = $pdo->prepare('UPDATE horarios SET hora_fim = :Hora_fim, flag = :Flag WHERE id = :id');
      $stmt->execute(array(
        ':id'   => $id,
        ':Hora_fim' => $hora_atual,
        ':Flag'=> "1"
      ));
      echo ("GRAVADO COM SUCESSO");
    }
    catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }

?>