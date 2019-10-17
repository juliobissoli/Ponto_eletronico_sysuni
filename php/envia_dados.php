<?php
  header('Content-Type: text/plain');
//echo phpinfo();
 $usuario = "root";
 $password="";
 $selecao = $_POST["selecao_opcoes"];

    //Obter data atual.
    $data_atual = date('Y-m-d', time());
    //Obter hora no padrao brasileiro
    date_default_timezone_set('America/Sao_Paulo');
    $hora_atual = date('H:i:s', time());

    //echo $dataLocal;
    //$str =  $selecao." dia " . $data_atual. " hora " .$hora_atual;

    //Saida provisoria do arquivo
    //echo $str;

    try {
      $pdo = new PDO('mysql:host=localhost;dbname=ponto-sysuni', $usuario, $password);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      //INSERT INTO `horarios` (`id`, `nome`, `data_trab`, `hora_inicio`, `hora_fim`, `flag`) VALUES (NULL, 'Murilo', '2019-08-29', '10:01', '10:01', '0');
      $stmt = $pdo->prepare('INSERT INTO horarios (id, nome, data_trab, hora_inicio, flag) VALUES(:Id, :Nome, :Data, :Inicio, :Flag)');
      $stmt->execute(array(
        ':Id' => NULL,
        ':Nome' => $selecao,
        ':Data' =>  $data_atual,
        ':Inicio' => $hora_atual,
        ':Flag' => '0'
      ));
      echo ("GRAVADO COM SUCESSO");
    }
       catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
      }

?>
