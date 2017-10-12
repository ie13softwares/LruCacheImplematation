<?php
	$word = $_GET["word"];
        //Edit the details according to your setup. 
        $username = "root";
        $password = "murari";
        $hostname = "localhost";
        $databasename = "test_db";
        $tablename = "word_dict";
        
        $dbhandle = mysqli_connect($hostname, $username, $password)
            or die("Unable to connect to MySQL");

          //select a database to work with
          $selected = mysqli_select_db($dbhandle, $databasename)
            or die("Could not select test_db");


          //execute the SQL query and return records
          $result = mysqli_query($dbhandle, "SELECT * FROM $tablename where word = '$word'");

          //fetch tha data from the database
          while ($row = mysqli_fetch_array($result)) {
             $result = $row{'meaning'};
             echo $result;
          }
          //close the connection
          mysqli_close($dbhandle);
?>
