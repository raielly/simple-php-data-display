<?php  

 
if($_FILES['file']['name'] != '') {
    
    // Explode file name and generate random name.
    $temp = explode('.', $_FILES['file']['name']);
    $extension = end($temp);    
    $name = 'avatar'.rand(100,999).'.'.$extension;

    $location = 'upload/'.$name;

    // Move file upload to the upload folder.
    move_uploaded_file($_FILES['file']['tmp_name'], $location);

    echo $name;

} 

?>