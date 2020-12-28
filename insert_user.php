<?php 

    require_once('db.php');

    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $file = $_FILES['file'];

    $query = "SELECT * FROM users WHERE email = '". $email ."'  ";
    $result = mysqli_query( $conn, $query );

    if( mysqli_num_rows( $result ) > 0 ) {
        
        echo json_encode( array( "status"=> "fail" ) );


    } else {

        $defaultImg = 'no-image.png';

        if( $file['name'] != "" ) {

            $tmp = explode('.', $file['name']);
            $ext = end( $tmp );
            $defaultImg = 'avatar' . rand(000,999) . '.' . $ext;

        }

        $location = 'upload/' . $defaultImg;

        move_uploaded_file( $file['tmp_name'], $location );

        $query = mysqli_query ($conn, 'INSERT INTO users (avatar, first_name, last_name, email) VALUES ("'. $defaultImg .'", "'. $first_name .'", "'. $last_name .'", "'. $email .'") ') or die( mysqli_error( $conn ) );

        echo json_encode( array( "status"=> "success" ) );
 

    }



?>