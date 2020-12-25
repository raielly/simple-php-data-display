<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css">

    <!-- datatable -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/dataTables.bootstrap4.min.css">

    <!-- google font -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">

    <!-- font awesome -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.2.0/css/all.css">

    <!-- animate css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

    <!-- main css -->
    <link rel="stylesheet" href="css/styles.css">

    <title>Web Project Test</title>
</head>
<body>

    <!-- Header -->
    <div class="masthead"></div>
    <!-- / Header -->

    <!-- Main -->
    <div class="container">
        <div class="top-label text-right py-2">Web Project Test</div>
        <div class="table-container">
            <div class="table-header">
                <div class="table-title">user lists</div>   
                <button id="add_user" class="btn rounded-pill add-user px-4" data-bs-toggle="modal" data-bs-target="#user_modal">
                    Add User
                </button>
            </div>
            <div class="table-responsive">
                <table id="user_table" class="table table-striped table-hover" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- / Main -->

    <!-- Add User Modal -->
    <div class="modal fade zoom-in" id="user_modal" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><i class="fal fa-user-plus"></i></h5>
                    <button type="button" class="close-modal border-0 bg-transparent" data-bs-dismiss="modal"><i class="fal fa-times text-white"></i></button>
                </div>
                <div class="modal-body">
                    <form id="addUser">
                        <div class="form-group mb-3">
                            <label>First Name</label>
                            <input type="text" name="first_name" id="firstname" class="form-control text-capitalize">
                        </div>
                        <div class="form-group mb-3">
                            <label>Last Name</label>
                            <input type="text" name="last_name" id="lastname" class="form-control text-capitalize">
                        </div>
                        <div class="form-group mb-4">
                            <label>Email Address</label>
                            <input type="email" name="email" id="email" class="form-control">
                            <span id="emailError" class="d-block"></span>
                        </div>
                        <div class="form-group mb-4">
                            <label class="d-block mb-2">Upload Avatar</label>
                            <input type="file" name="file" class="form-control-file w-100" id="file">
                        </div>
                        <button id="submitUser" class="btn bg-blue w-100 mb-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
     <!-- / Add User Model -->

    <!-- View User Modal -->
    <div class="modal fade" id="user_view_modal" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success">
                    <h5 class="modal-title"><i class="fal fa-eye"></i></h5>
                    <button type="button" class="close-modal border-0 bg-transparent" data-bs-dismiss="modal"><i class="fal fa-times text-white"></i></button>
                </div>
                <div class="modal-body">
                    <div id="addUser">
                        <div class="form-group mb-4 text-center ">
                            <span class="avatar-container">
                             <img alt="" id="avatar_photo" class="avatar">
                            </span>
                        </div>
                        <div class="form-group mb-3">
                            <label>First Name</label>
                            <input type="text" id="v_firstname" class="form-control text-capitalize">
                        </div>
                        <div class="form-group mb-3">
                            <label>Last Name</label>
                            <input type="text" id="v_lastname" class="form-control text-capitalize">
                        </div>
                        <div class="form-group mb-4">
                            <label>Email Address</label>
                            <input type="email" id="v_email" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / View Modal -->

    <!-- Toast Notification -->
    <div class="toast-notification rounded" > 
        <i class="fas fa-check-circle text-white"></i></i>
        <div class="toast-message">
            <span>Success!</span>
            User has been added successfully.
        </div>
        <div class="toast-close"><i class="fal fa-times"></i></div>
    </div>
    <!-- / Toast Notification -->
   

    
    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

    <!-- bootstrap js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>

    <!-- datatable js -->
    <script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.22/js/dataTables.bootstrap4.min.js"></script>

    <!-- jquery validation -->
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.13.1/additional-methods.js"></script>

    <!-- main js -->
    <script src="js/main.js"></script>
   
</body>
</html>