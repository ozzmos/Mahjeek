/**
 * User: christophe
 * Date: 9/09/13
 */

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB")
}

var db;
var request = indexedDB.open("MahjongDatabase");
request.onerror = function(event) {
  alert("Unable to open the Mahjong Database !");
};
request.onsuccess = function(event) {
  console.log("Database opened");
  db = request.result;
};