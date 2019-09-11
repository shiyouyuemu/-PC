
<?php
      # 5 存在相同用户名 => 用户名重名：
      # 6 数据库插入失败 => 用户名重名：
      # form 表单要提交数据 => name=value&name=value;
      $usernameValue = @$_GET["username"];
      $passwordValue = @$_GET["password"];

      if(!$usernameValue || !$passwordValue){
            die('{"state":"error","code":2}');
      }
      # 可以得到用户提交的值;

      header("Content-Type: text/html;charset=utf8");
      $hostname = "localhost:3306";
      $username = "root";
      $password = "root";
      $dbname   = "gp14";

      #链接数据库 
      $con = mysqli_connect($hostname , $username , $password , $dbname);
      #选择数据库
      mysqli_select_db( $con , $dbname);
      function creatTable($con){
            $query="CREATE TABLE IF NOT EXISTS `userList`(
                `id` INT UNSIGNED AUTO_INCREMENT,
                `username` VARCHAR(20)  NOT NULL, 
                `password` VARCHAR(255) NOT NULL,
                PRIMARY KEY ( `id` )
            )";
                $res=mysqli_query($con,$query);
                if(!$res){
                  mysqli_close($con);
                    die("表创建失败". mysqli_error($con));
                }
            }
      creatTable($con);
      function hasSameUsername($con,$usernameValue){
            # 判定用户名是否存在;
            $query_select = "SELECT username FROM `userlist` WHERE `username`= '$usernameValue'";
            $res = mysqli_query($con , $query_select);
            if(!$res){
                  die('{"state":"error","code" : 3}');
            }
            $hasSame = false;
            while($row = mysqli_fetch_array($res)){
                  $hasSame = true;
                  break;
            }
            if($hasSame){
                  mysqli_close($con);
                  die('{"state":"error","code" : 5}');
            }
      }
      hasSameUsername($con , $usernameValue);

      function insertUserListValue($con,$usernameValue,$passwordValue){
             #将获得的数据插入gp14数据库userlist的表之中。
            $passwordValue = md5($passwordValue);
            $query_insert = "INSERT INTO `userlist` ( `username` , `password`)
                  VALUES 
                  ('$usernameValue','$passwordValue')
            ";
            #让php使用mySQL语句操作mySQL数据库;
            $retval = mysqli_query($con , $query_insert);
            # 判定当前的数据库操作是否成功;
            if(!$retval){
                  mysqli_close($con);
                  die('{"state":"error","code" : 6}');
            }
      }
      insertUserListValue($con,$usernameValue,$passwordValue);

      mysqli_close($con);
      die('{"state":"error","code" : 1}');

?>