<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$DB_SERVER = "localhost";
$DB_NAME = "surache1_631234";
$DB_USERNAME = "surache1_631234";
$DB_PASSWORD = "KG1883AH";
$con = mysqli_connect($DB_SERVER, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);
mysql_select_db($DB_NAME, $con);
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $user = $dData['user'];
    $pass = $dData['password'];
    $result = "";

    if ($user != "" && $pass != "") {
        $sql = "SELECT * from  usertbl where username = '$user';";
        $res = mysqli_query($con, $sql);

        if (mysql_num_rows($res) != 0) {
            $row = mysql_fetch_array($res);
            if ($pass != $row['password']) {
                $result = "invalid password!";
            }
            $result = "login successfully! redirecting...";
        } else {
            $result = "invalid user";
        }
        $con->close();
        $responce[] = array("result" => $result);
        echo json_encode($responce);
    }
}
?>