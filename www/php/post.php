<?php

$response = [];

$message = isset($_POST["message"]) ? urldecode($_POST["message"]) : "no message!";

$db = new PDO(
  "mysql:host=localhost;dbname=som_test;charset=utf8",
  "som_user",
  "THUJfhpfHKsCMyzn",
  array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
);

$stmt = $db->prepare("INSERT INTO messages (`text`) VALUES(:text)");
$stmt->bindParam(":text", $message);
$stmt->execute();
echo json_encode(true);
return;

?>
