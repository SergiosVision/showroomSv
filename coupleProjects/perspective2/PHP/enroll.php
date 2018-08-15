<?php
$name = $_POST['name'];
$mail = $_POST['mail'];
$message = $_POST['message'];
$name = htmlspecialchars($name);
$mail = htmlspecialchars($mail);
$message = htmlspecialchars($message);
$name = urldecode($name);
$mail = urldecode($mail);
$message = urldecode($message);
$name = trim($name);
$mail = trim($mail);
$message = trim($message);
//echo $name;
//echo "<br>";
//echo $email;
mail("", "Обратная связь Perspective 2", "Имя: ".$name.".  Почта: ".$mail.". Сообщение: ".$message.".")
?>