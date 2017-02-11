<?php

$response = [];

$since = isset($_GET["since"]) ? urldecode($_GET["since"]) : -1;
$lastId = isset($_GET["lastId"]) ? urldecode($_GET["lastId"]) : -1;

$db = new PDO(
  "mysql:host=localhost;dbname=som_test;charset=utf8",
  "som_user",
  "THUJfhpfHKsCMyzn",
  array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
);

$stmt = $db->query("SELECT CURRENT_TIMESTAMP FROM messages");
$results = $stmt->fetch(PDO::FETCH_ASSOC);
$response["timestamp"] = $results["CURRENT_TIMESTAMP"];

// Only get messages 2 weeks old or newer
$query = "SELECT * FROM messages WHERE `inserted_on` > CURRENT_TIMESTAMP - INTERVAL 2 WEEK";

if ($lastId != -1) $query = "SELECT * FROM messages WHERE `id` > $lastId";

$stmt = $db->query($query);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$response["results"] = $results;
echo json_encode($response);
return;

?>
