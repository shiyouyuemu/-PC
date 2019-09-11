<?php
      header('Access-Control-Allow-Credentials',"true");
      header('Set-Cookie','token=cowshield');
      # 状态码 : 
      # 1  => 成功登陆
      # 2  => 参数不全;
      # 3  => 数据库查询错误;
      # 4  => 用户名和密码不符;
      # 登陆功能;
      // echo $_GET["username"];

      # form 表单要提交数据 => name=value&name=value;
      $usernameValue = @$_GET["username"];
      $passwordValue = @$_GET["password"];
      $validType     = @$_GET["type"];
      echo($usernameValue,$passwordValue);
      if(!$usernameValue || !$passwordValue){
            die('{"statu":"error","code" : 2}');
      }
      # 可以得到用户提交的值;

      $hostname = "localhost:3306";
      $username = "root";
      $password = "root";
      $dbname   = "gp14";

      #链接数据库 
      $con = mysqli_connect($hostname , $username , $password , $dbname);
      #选择数据库
      mysqli_select_db( $con , $dbname);
      #登陆逻辑 
      # 查询数据库 
      $query_select = "SELECT `username`,`password` FROM `userlist` WHERE `username`='$usernameValue'";
      $res = mysqli_query($con , $query_select);

      if(!$res){
            mysqli_close($con);
            die('{"statu":"error","code" : 3 ,"errorMsg" : " ' . mysqli_error($con). ' "}');
      }

      while($row = mysqli_fetch_array($res)){
            if($row["password"] === ($validType === "cookie" ? $passwordValue :  md5($passwordValue))){
                  # 登陆成功 => 设置一条cookie;
                  $usemsg = array("username" => $usernameValue , "password" => $row["password"]);
                  setcookie("usrmsg",json_encode($usemsg),time()+3600,"/");
                  //echo("<script>location='../index.html'</script>")              
                  die( '{"statu":"success","code" : 1}');
            }
      }
      mysqli_close($con);

      die( '{"statu":"error","code" : 4}');

?>