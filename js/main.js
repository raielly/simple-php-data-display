$(document).ready(function() {

    // Datatable display all users.
    var userTable = $('#user_table').DataTable({
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
    var validator = $('#formData').validate({

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

            if( $('#action').val() == 'add' ) {

                addUser();

            } 

        }

    });


    // Add User.
    function addUser() {

        var fd = new FormData( $('#formData')[0] );
    
        $.ajax({
            type: 'POST',
            url: 'insert_user.php',
            data: fd,
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function( response ) {

                console.log( response.status );

                // Check if email is exists.
                if ( response.status == "fail" ) {

                    // Show Error if email already exists.
                    $('#emailError').text('Email Address is Already Registered');

                } else {

                    // Hide modal when process complete.
                    $('#user_modal').modal('hide');

                    // Refresh dataTable.
                    userTable.ajax.reload();

                    // Show Success Notification.
                    $('.toast-notification').show();
                    $('.message').text('User successfully added!');

                    // Hide after 3 seconds.
                    setTimeout(function() { 
                        $('.toast-notification').fadeOut();
                    }, 3000);
                

                }

            },
            error: function( xhr ) {

                console.log( xhr.responseText );

            }

        });

    }

    // Add User on Click
    $('#add_user').on('click', function () {

        $('#user_modal').modal('show');

        // Reset Form Fields
        $('#formData')[0].reset();
        
        // Reset Validator
        validator.resetForm();
        
        // Remove Error Form Style
        $('.form-control').removeClass('error');

        // Remove Email Error Style
        $('#emailError').text('');

        // Hide avatar
        $('#avatarMain').hide();

        // Remove Update Class
        $('#user_modal').removeClass('update-user');

        // Remove Update Class
        $('#user_modal').removeClass('update-user');

        // disable input fields.
        $('#user_modal').find('.form-control').removeAttr('disabled');

        // Change icon to add
        $('#user_modal').find('.modal-title .fal').addClass('fa-user-plus');

        // Hide File Upload.
        $('.file-container').show();

        // Hide File Upload.
        $('#submitUser').show();

        var action = $('#action').val('add');
       
    });


    // View Form.
    $('#user_table').on('click', '.viewBtn', function() { 
 
        // Get User ID by data attribute.
        var user_id = $(this).data('id');

        //Fetch Users Data.
        $.ajax({
            type: 'POST',
            url: 'fetch_user.php',
            data: { id: user_id },
            dataType: 'json',
            success: function( response ) {

                // Passing response value to the modal input fields.
                $('#id').val(response.id);
                $('#firstname').val(response.first_name);
                $('#lastname').val(response.last_name);
                $('#email').val(response.email);
                $('#avatar_photo').attr('src', 'upload/'+response.avatar);

            }
        });

        // Show Modal on Click.
        $('#user_modal').modal('show');

        // Reset Validator
        validator.resetForm();
        
        // Remove Error Form Style
        $('.form-control').removeClass('error');

        // Show Avatar.
        $('#avatarMain').show();

        // Add Update Class.
        $('#user_modal').addClass('update-user');
            
        // Reset File Upload.
        $('#file').val('');

        // Hide File Upload.
        $('.file-container').hide();

        // Hide File Upload.
        $('#submitUser').hide();

        // Remove Email Error Text
        $('#emailError').text('');

        // disable input fields.
        $('.update-user').find('.form-control').attr('disabled', true);   

        // Change icon to add
        $('#user_modal').find('.modal-title .fal').removeClass('fa-user-plus').addClass('fa-eye');


    });

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

