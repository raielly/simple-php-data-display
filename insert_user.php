<?php 

    require_once('db.php');

    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $file = $_POST['file'];

    $query = "SELECT * FROM users WHERE email = '". $email ."'  ";
    $result = mysqli_query( $conn, $query );

    if( mysqli_num_rows( $result ) > 0 ) {
        
        echo json_encode( array( "status"=> "fail" ) );


    } else {

        $query = mysqli_query ($conn, 'INSERT INTO users (avatar, first_name, last_name, email) VALUES ("'. $file .'", "'. $first_name .'", "'. $last_name .'", "'. $email .'") ') or die( mysqli_error( $conn ) );

        echo json_encode( array( "status"=> "success" ) );
 

    }


?>