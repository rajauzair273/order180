<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
class Welcome extends REST_Controller {

  public function __construct($config = 'rest')
  {
      parent::__construct($config);

  //Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Content-Type: application/json ');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");


}


  }



  function headers(){


  }



	public function index_post()
	{

    $test = $this->db->select("*")->from("users")->where("id" , 1)->get()->row();
   $this->session->set_userdata("user" , $test);
		$this->response(array("result" => $test), REST_Controller::HTTP_OK);
  }

  public function check_session_get(){


    $this->response(array("result" => $this->session->userdata("user" )), REST_Controller::HTTP_OK);
  }
  public function sign_up_get(){

     $data = [
       "first_name" => $this->input->get("first_name"),
       "last_name" => $this->input->get("last_name"),
       "birth_day"  => $this->input->get("bd"),
       "email" => $this->input->get("email"),
       "password"=> $this->input->get("password")
     ];


     $check = $this->db->select("*")->from("users")->where("email" , $data['email'])->get();
     if($check->num_rows() > 0){
      $this->response(array("result" => FALSE , "msg" => "User Already Exist"), REST_Controller::HTTP_OK);
      return;
     }else{


      $data['password'] = $this->encryptIt( $data['password'] );
      $this->db->set($data);
      $this->db->insert("users");
      $this->response(array("result" => TRUE  , "msg" => "Account Created Successfully"), REST_Controller::HTTP_OK);

     }





  }


  public function login_get(){
    $email = $this->input->get("email");
    $password = $this->input->get("password");

    $user = $this->db->select("*")->from("users")->where("email" , $email)->get();
    if($user->num_rows()  == 0){
      $this->response(array("result" => FALSE  , "msg" => "User not found"), REST_Controller::HTTP_OK);
      return ;
    }
    else{
      $user = $user->row();
      $password = $this->encryptIt($password);
      if($password != $user->password){
        $this->response(array("result" => FALSE  , "msg" => "Incorrect Password"), REST_Controller::HTTP_OK);
        return ;
      }else{
        $this->response(array("result" => TRUE  , "msg" => "Welcome ". $user->first_name . " " . $user->last_name , "user"=> $user), REST_Controller::HTTP_OK);
        return ;
      }

    }


  }

  public function forget_get(){
           $email = $this->input->get("email");
           $password = $this->input->get("password");

           $user = $this->db->select("*")->from("users")->where("email" , $email)->get();
           if($user->num_rows()  == 0){
            $this->response(array("result" => FALSE  , "msg" => "Invalid User" ), REST_Controller::HTTP_OK);
           }else{
             $password = $this->encryptIt($password);
             $this->db->update("users" , array("password" => strval($password)) , array("email" => $email));
             $this->response(array("result" => TRUE  , "msg" => "Password Reset Successfully" ), REST_Controller::HTTP_OK);
           }
  }

  public function submitFile_get(){

    $text = $this->input->get("text");
    $password = $this->input->get("password");
    $email = $this->input->get("email");

      $user = $this->db->select("*")->from("users")->where("email" , $email)->get();
    if($user->num_rows() == 0){
      $this->response(array("result" => FALSE  , "msg" => "User not Found" ), REST_Controller::HTTP_OK);
    }else{
          $user = $user->row();
          if($user->password != $password){
            $this->response(array("result" => FALSE  , "msg" => "User not Found" ), REST_Controller::HTTP_OK);
          }
          else{
            $data = array(
              "user_id" => $user->id,
              "file" => $text
            );
            $this->db->insert("files" , $data);
            $this->response(array("result" => TRUE  , "msg" => "Submit Successfully" ), REST_Controller::HTTP_OK);
          }
    }

  }

  function encryptIt( $q ) {
    $cryptKey  = 'qJB0rGtIn5UB1xG03efyCp';
    $qEncoded      = base64_encode( mcrypt_encrypt( MCRYPT_RIJNDAEL_256, md5( $cryptKey ), $q, MCRYPT_MODE_CBC, md5( md5( $cryptKey ) ) ) );
    return( $qEncoded );
}

function decryptIt( $q ) {
    $cryptKey  = 'qJB0rGtIn5UB1xG03efyCp';
    $qDecoded      = rtrim( mcrypt_decrypt( MCRYPT_RIJNDAEL_256, md5( $cryptKey ), base64_decode( $q ), MCRYPT_MODE_CBC, md5( md5( $cryptKey ) ) ), "\0");
    return( $qDecoded );
}



}
