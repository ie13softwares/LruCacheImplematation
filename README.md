# LruCacheImplematation
A simple Website with a cache implemented with LRU memory management technique. 

Pre Requisites:
-----------------------------------------------------------------------------
Latest version of the following installed and running. 

1. mySql
2. Apache Server running at local host. 
  If there is already a server running, you may need to change the port at which apache is listening. 
  It can be done at etc/apache2/ports.conf
  Add listen <Any Unutilized Port> 
  To find what ports are in use, use the command: #sudo netstat -tulpn
3. Php

Database Setup:
---------------------------------------------------------------------------
Edit MySql username, Paswword, Database Name, Table Name in getMeaning.php 

- The Table need to contain two var char fields, One with the list of words and other with list of Meanings.
- For testing purpose, the cache is created with a size of 10, which can modified in lru.js file.

Place the following files -  lru.js, getMeaning.php, index.php in /var/www/html folder. and run localhost at the set port. 
- If there is a problem in copying the files to /var/www/html folder, Access can be gained by using the command 
sudo nautilas. 

Note: By default, Apache will look for index.html. 
This need to be changed in the file:
$ sudo nano /etc/apache2/mods-enabled/dir.conf

Move index.php to the first in the list of files. 

Note:
-------------------------
- For convience purpose A concole message on call to database, call to the Cache are included in the code. This can be verified from Developer Console of the browser. 
- The code is commented as required. Please ping if further information is necessary. 
- The program takes a word as input and gives its meaning as output. When the word is not present, it retuns black value. 
