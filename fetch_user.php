<?php  

    require_once 'db.php';
    
    if( isset( $_POST['id'] ) ) {
        
        // Fetch data using ID
        $query = mysqli_query( $conn, 'SELECT * FROM users WHERE id = "'. $_POST['id'].'"' );
        $result = mysqli_fetch_assoc( $query );
        echo json_encode( $result );

    } else {

        // Fetch all data
        $query = mysqli_query( $conn, 'SELECT * FROM users ORDER BY id desc' );
        $emparray = array();

        while( $row =mysqli_fetch_assoc( $query ) )
        {
            $emparray[] = $row;
        }

        echo json_encode( array( "data"=> $emparray ) );
        
    }


?>