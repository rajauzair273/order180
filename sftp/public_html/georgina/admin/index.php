<?php

$mysqli = new mysqli("localhost","arslanba_blog","arsal1234","arslanba_blog");

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/owl.carousel.min.css">
    <link rel="stylesheet" href="../css/magnific-popup.css">
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/themify-icons.css">
    <link rel="stylesheet" href="../css/nice-select.css">
    <link rel="stylesheet" href="../css/flaticon.css">
    <link rel="stylesheet" href="../css/gijgo.css">
    <link rel="stylesheet" href="../css/animate.css">
    <link rel="stylesheet" href="../css/slick.css">
    <link rel="stylesheet" href="../css/slicknav.css">
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css">

    <title>Login</title>

    <style>


/* Full-width inputs */
input[type=email], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}



/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
.login{
	padding:0 200px 0 200px;
}
@media (max-width: 767px) {
 .login{
	padding:0 50px 0 50px;
}
}

@media (min-width: 768px) and (max-width: 991px) {
  .login{
	padding:0 100px 0 100px;
}
}

@media (min-width: 992px) and (max-width: 1200px) {
 .login{
	padding:0 150px 0 150px;
}
}
    </style>
</head>
<body>
<form method="post">
  <div class="imgcontainer">
    <i style="font-size:150px;" class="fa fa-user text-info"></i>
  </div>

  <div class="container login">
    <label for="uname"><b>Email</b></label>
    <input type="email" placeholder="Enter Email" name="uname" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>
    <input type="submit" class="btn btn-info" name="login" value="Login">
    <label class="float-right">
      <a href="changePassword"> forget Password </a>
    </label>
  </div>
</form>
</body>
</html>
<?php


  if(isset($_POST["login"]) ){
    $email = $_POST['uname'];
    $password = $_POST['psw'];

    $sql = "SELECT * FROM auditor WHERE email = '$email' and password = '$password'";
    $result = mysqli_query($mysqli,$sql);
    $row = mysqli_fetch_array($result,MYSQLI_ASSOC);

    $count = mysqli_num_rows($result);

    if($count == 1) {
      $_SESSION['loggedin'] = true;
      $_SESSION['username'] = $username;
       header("location: welcome.php");
    }else {
       echo "Your Login Name or Password is invalid";
    }
  }

?>
