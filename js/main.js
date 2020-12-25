$(document).ready(function() {

    // Datatable display all users.
    $('#user_table').DataTable({
        "ajax": "fetch_user.php",
        "columns": [
            { "data": "id" },
            { 
                "data": null,
                "render": function ( data, type, row ) {
                    return '<span><img src="upload/'+data.avatar+'" alt="" class="avatar" ></span>';
                } 
            },
            { 
                "data": null,
                "render": function ( data, type, row ) {
                    return data.first_name + ' ' + data.last_name;
                } 
            },
            { "data": "email" },
            { 
                "data": null,
                "render": function ( data, type, row ) {
                    return '<button data-id="'+data.id+'" class="border-0 bg-transparent viewBtn"><i class="far fa-eye text-success" ></i></button>';
                } 
            }
        ],
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false
            }
        ],
        "targets": 'no-sort',
        "bSort": false,
        "order": []
    });


    // Form Validation.
    $('#addUser').validate({

        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            file: {
                accept: "jpg|jpeg|png|ico|bmp"
            } 
        },
        messages: {
            first_name: {
                required: 'Please enter your first name'
            },
            last_name: {
                required: 'Please enter your last name'
            },
            email: {
                required: 'Please enter your email address',
                email: 'Please enter a valid email address'
            }
        },
        submitHandler: function() {
            addUser();
        }

    });


    // Add User.
    function addUser() {
    
        var fileUpload = uploadAvatar();
        var firstName = $('#firstname'),
            lastName = $('#lastname'),
            email = $('#email');

        var data = {
            first_name: firstName.val(),
            last_name: lastName.val(),
            email: email.val(),
            file: fileUpload
        }

        $.ajax({
            type: 'POST',
            url: 'insert_user.php',
            data: data,
            dataType: 'json',
            success: function( response ) {

                // Check if email is exists.
                if ( response.status == "fail" ) {

                    $('#emailError').text('Email Address is Already Registered');

                } else {

                    $('.toast-notification').show();

                    setTimeout(function() { 
                        $('.toast-notification').fadeOut();
                    }, 3000);
                
                    // Hide modal when process complete.
                    $('#user_modal').modal('hide');

                    // Refresh dataTable.
                    var table = $('#user_table').DataTable();
                    table.ajax.reload();

                }

            },
            error: function( xhr ) {
                console.log( xhr.statusText + "\r\n" + xhr.responseText);
            }

        });

    }

    // File Upload.
    function uploadAvatar() {
      
        var file_data = $('#file').prop('files')[0];   

        if( typeof file_data != 'undefined' ) {

            var form_data = new FormData();         
            form_data.append('file', file_data);

            $.ajax({
                async: false,
                type: 'POST',
                url: 'upload.php',
                data: form_data,
                dataType: 'text',
                contentType:false,
                processData: false,
                success: function( response ) {
                    avatarName = response;
                },
                error: function( xhr ) {
                    console.log( xhr.statusText + "\r\n" + xhr.responseText);
                }
            });

        } else {

            // Set Default if image is empty.
            avatarName = 'no-image.png';

        }

        return avatarName;

    }


    // View Users.
    $('#user_table').on('click', '.viewBtn', function() { 
 
        // Get User ID by data attribute.
        var $user_id = $(this).data('id');

        // Fetch Users Data.
        $.ajax({
            type: 'POST',
            url: 'fetch_user.php',
            data: { id: $user_id },
            dataType: 'json',
            success: function( response ) {

                // Passing response value to the modal input fields.
                $('#v_firstname').val(response.first_name);
                $('#v_lastname').val(response.last_name);
                $('#v_email').val(response.email);
                $('#avatar_photo').attr('src', 'upload/'+response.avatar);

                // Show Modal on Click.
                $('#user_view_modal').modal('show');
            }
        });

        // disable input fields.
        $('#user_view_modal').find('.form-control').attr('disabled', true);

    });

    // Clear Fields when add button is closed.
    $('#add_user').on('click', function () {

        // Input Fields
        $('#firstname').val('');
        $('#lastname').val('');
        $('#email').val('');
        $('#file').val(null);
        $('#emailError').text('');

        // Enable Fields
        $('#user_modal').find('.form-control').attr('disabled', false);
       
    })

    // Destroy Validation
    $('#user_modal').on('hidden.bs.modal', function () {

        // Get User Table
        var validator = $( "#user_modal" ).validate();
        validator.destroy();

        // Remove Validation Styles
        $('#user_modal').find('.form-control').removeClass('error');
        $('#user_modal').find('.form-control').removeClass('valid');
 

    })

    // Success Button.
    $('.toast-close').on('click', function() {
        $('.toast-notification').fadeOut();
    });

    // Hide toast notification.
    $('.toast-notification').hide();

    // Remove email error.
    $("#email").keypress(function() {
        $('#emailError').text('');
    });


});

