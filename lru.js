var lrucache;
/* Initialize LRU cache with default limit being 10 items just ot be on safe side*/
//Creating Lru Map.
function lru(limit) {
    this.size = 0;
    (typeof limit == "number") ? this.limit = limit : this.limit = 5;
    this.map = {};
    this.head = null;
    this.tail = null;
}

//Using Java Script Objects properties.
lru.prototype.lrunode = function(key, value) {
    if (typeof key != "undefined" && key !== null) {
        this.key = key;
    }
    if (typeof value != "undefined" && value !== null) {
        this.value = value;
    }
    this.prev = null;
    this.next = null;
}

lru.prototype.setHead = function(node) {
    node.next = this.head;
    node.prev = null;
    if (this.head !== null) {
        this.head.prev = node;
    }
    this.head = node;
    if (this.tail === null) {
        this.tail = node;
    }
    this.size++;
    this.map[node.key] = node;
}

//Add new value;
//Overwrite it, if already exists. 
lru.prototype.set = function(key, value) {
    var node = new lru.prototype.lrunode(key, value);
    if (this.map[key]) {
        this.map[key].value = node.value;
        this.remove(node.key);
    } else {
        if (this.size >= this.limit) {
            delete this.map[this.tail.key];
            this.size--;
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
    }
    this.setHead(node);
};

/* Fetching data from cache */
/*
    Using Ajax, to establish a call to getMeaning.php, which inturn establishes a connection to database and 
    fetches data from it. 
    Using Ajax, so that, the need for refresh after the call can be prevented. 
*/
lru.prototype.get = function(key) {
    if (this.map[key]) {
        var value = this.map[key].value;
        var node = new lru.prototype.lrunode(key, value);
        this.remove(key);
        this.setHead(node);
        document.getElementById("ans").innerHTML = value;
        console.log("value from cache "+value);
    } else {
        console.log ("Key " + key + " does not exist in the cache. adding it.");
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "getMeaning.php?word="+key, false);
        xhttp.send();
        console.log("value received "+xhttp.responseText);
        document.getElementById("ans").innerHTML = xhttp.responseText;
        this.set(key, xhttp.responseText);
    }
};

/* Remove an entry from the cache */
lru.prototype.remove = function(key) {
    var node = this.map[key];
    if (node.prev !== null) {
        node.prev.next = node.next;
    } else {
        this.head = node.next;
    }
    if (node.next !== null) {
        node.next.prev = node.prev;
    } else {
        this.tail = node.prev;
    }
    delete this.map[key];
    this.size--;
};

//Function to create Cache and Initilize it for the first time. 
function CreateCache() {
      var size = 10;
      lrucache = new lru(size);
      console.log("Created cache with size " + size);
    }
function isCacheInitialized() {
      return (lrucache != null);
    }
function getMean()
{
    if (!isCacheInitialized()) {
        console.log("Cache is not initialized");
        CreateCache();
    }
    var k = document.getElementById("key").value;
    lrucache.get(k);
   
}
