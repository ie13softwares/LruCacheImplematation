<?php

//The Table -> word_dict has two fields, word and meaning respectively, to store word and meaning.
//Please correct according to your databse details in the order ''hostname, 'username, 'password', 'databse name'

$con = new mysqli('localhost', 'root', 'murari', 'test_db');

if($con->connect_error){
	die("Connection failed");
}


//
if(isset($_GET['word'])){
	$word = $_GET['word'];
	$sql = "SELECT * FROM word_dict WHERE word = '$word'";

	$result = $con->query($sql);
	$row = $result->fetch_array();
		$result = $row["meaning"];
		if(is_null($result)){
			echo "The meaning of the required word is not present. Try another!";
		}else{
			echo $result;
		}
		


}

mysqli_close($con);


//Previous Code and some other experiments. 
/*
/*
<?php
  $word = $_GET["word"];
        //Edit the details according to your database setup. 
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
          $result = mysqli_query($dbhandle, "SELECT meaning FROM $tablename where word = '$word'") or die("Error: " . mysqli_error($dbhandle));

          //fetch tha data from the database
          while ($row = mysqli_fetch_assoc($result)) {
             $result = $row{'meaning'};
             echo $result;
          }

          //close the connection
          mysqli_close($dbhandle);
?>
*/




/*
function dbConnection(){
	if($mysqli = new mysqli($servername, $username, $password, $dbname)) 
		return $mysqli; 
	else 
		return false;
}


//Calling Database Connection
if(!dbConnection())
	exit("<script language='javascript'>alert('Unable to connect to database')</script>");
else 
	$con = dbConnection();
*/

?>

