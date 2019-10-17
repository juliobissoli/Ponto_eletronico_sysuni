<?php
  header('Content-Type: text/plain');
//echo phpinfo();
 $usuario = "root";
 $password="";
 $user = $_POST["usuario"];
 $senha = md5($_POST["pass"]);

    //echo $dataLocal;
    //$str =  $selecao." dia " . $data_atual. " hora " .$hora_atual;

    //Saida provisoria do arquivo
    //echo $str;

    try {
      $pdo = new PDO('mysql:host=localhost;dbname=ponto-sysuni', $usuario, $password);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      //INSERT INTO `horarios` (`id`, `nome`, `data_trab`, `hora_inicio`, `hora_fim`, `flag`) VALUES (NULL, 'Murilo', '2019-08-29', '10:01', '10:01', '0');
      $stmt = $pdo->prepare('INSERT INTO autenticacao (id, nome, password) VALUES(:Id, :Nome, :Senha)');
      $stmt->execute(array(
        ':Id' => NULL,
        ':Nome' => $user,
        ':Senha' =>  $senha
      ));
      echo ("GRAVADO COM SUCESSO");
    }
       catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
      }

?>
