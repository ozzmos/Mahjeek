
 var storage_type;
 var db;
 var input_score;
 var input_player;
 var current_game;
 var current_game_id;

/* IIFE Immediately invoked function */
(function () {

    function nullDataHandler(transaction, results) { }

    function errorHandler(transaction, error)

    {

        // error.message is a human-readable string.

        // error.code is a numeric error code

        alert('Oops.  Error was '+error.message+' (Code '+error.code+')');



        // Handle errors here

        var we_think_this_error_is_fatal = true;

        if (we_think_this_error_is_fatal) return true;

        return false;

    }



    function addEventListeners () {

        // HOME VIEW
        document.querySelector("#btn-home-add").addEventListener("click", function () {
            // reset form fields
            document.getElementById("gameName").value = "";
            document.getElementById("windPlayer1").value = "";
            document.getElementById("player1").value = "";
            document.getElementById("windPlayer2").value = "";
            document.getElementById("player2").value = "";
            document.getElementById("windPlayer3").value = "";
            document.getElementById("player3").value = "";
            document.getElementById("windPlayer4").value = "";
            document.getElementById("player4").value = "";
            document.querySelector("#home").className = 'currentToLeft';
            document.querySelector("#new-game").className = 'rightToCurrent';
        });

        document.querySelector("#btn-home-sidebar").addEventListener("click", function () {
            document.querySelector("#home").className = 'currentToRight';
            document.querySelector("#settings").className = 'leftToCurrent';
        });

        // NEW GAME VIEW
        document.querySelector("#btn-new-game-cancel").addEventListener("click", function () {
            document.querySelector("#home").className = 'leftToCurrent';
            document.querySelector("#new-game").className = 'currentToRight';

        });

        document.querySelector("#btn-new-game-done").addEventListener("click", function () {
            if(!document.getElementById("gameName").value) {
                console.log("Specify a game name ");
            }
            else{
                createGame();
                document.querySelector("#new-game").className = 'currentToLeft';
                document.querySelector("#current-game").className = 'rightToCurrent';
            }
        });

        // CURRENT GAME VIEW
        document.querySelector("#btn-current-game-cancel").addEventListener("click", function () {
            shHome();
            document.querySelector("#current-game").className = 'currentToRight';
            document.querySelector("#home").className = 'leftToCurrent';
        });

        document.querySelector("#btn-current-game-edit").addEventListener("click", function () {

            document.querySelector("#current-game").className = 'currentToLeft';
            document.querySelector("#edit-game").className = 'rightToCurrent';
        });


        // EDIT GAME VIEW
        document.querySelector("#btn-edit-game-cancel").addEventListener("click", function () {
            document.querySelector("#edit-game").className = 'currentToRight';
            document.querySelector("#current-game").className = 'leftToCurrent';
        });

        document.querySelector("#btn-edit-game-delete").addEventListener("click", function () {
            deleteGame(current_game_id);
            shHome();
            document.querySelector("#edit-game").className = 'currentToRight';
            document.querySelector("#home").className = 'leftToCurrent';
        });

        document.querySelector("#btn-edit-game-done").addEventListener("click", function () {
            editGame(current_game_id);
            shCurrentGame(current_game_id);
            document.querySelector("#edit-game").className = 'currentToLeft';
            document.querySelector("#current-game").className = 'rightToCurrent';
        });

        // CURRENT GAME VIEW
        document.querySelector("#player1-hand-input").addEventListener("click", function () {
            resetPage();
            shCalculationGame(this);
            document.querySelector("#current-game").className = 'currentToLeft';
            document.querySelector("#calculation-game").className = 'rightToCurrent';
        });

        document.querySelector("#player2-hand-input").addEventListener("click", function () {
            resetPage();
            shCalculationGame(this);
            document.querySelector("#current-game").className = 'currentToLeft';
            document.querySelector("#calculation-game").className = 'rightToCurrent';
        });

        document.querySelector("#player3-hand-input").addEventListener("click", function () {
            resetPage();
            shCalculationGame(this);
            document.querySelector("#current-game").className = 'currentToLeft';
            document.querySelector("#calculation-game").className = 'rightToCurrent';
        });

        document.querySelector("#player4-hand-input").addEventListener("click", function () {
            resetPage();
            shCalculationGame(this);
            document.querySelector("#current-game").className = 'currentToLeft';
            document.querySelector("#calculation-game").className = 'rightToCurrent';
        });

        // CALCULATION GAME VIEW
        document.querySelector("#btn-calculation-game-done").addEventListener("click", function () {
            calcul();
            document.querySelector("#calculation-game").className = 'currentToRight';
            document.querySelector("#current-game").className = 'leftToCurrent';
        });

        document.querySelector("#btn-calculation-game-cancel").addEventListener("click", function () {
            document.querySelector("#calculation-game").className = 'currentToRight';
            document.querySelector("#current-game").className = 'leftToCurrent';
        });

        // SETTINGS VIEW
        document.querySelector("#btn-settings-hide").addEventListener("click", function () {
            document.querySelector("#settings").className = 'currentToLeft';
            document.querySelector("#home").className = 'rightToCurrent';
        });

        document.querySelector("#btn-about-show").addEventListener("click", function () {
            document.querySelector("#settings").className = 'right';
            document.querySelector("#about").className = 'current';
        });

        // ABOUT VIEW
        document.querySelector("#btn-about-hide").addEventListener("click", function () {
            document.querySelector("#about").className = 'left';
            document.querySelector("#settings").className = 'current';
        });

        // RULES VIEW
        document.querySelector("#btn-rules-show").addEventListener("click", function () {
            document.querySelector("#settings").className = 'right';
            document.querySelector("#rules").className = 'current';
        });

        document.querySelector("#btn-rules-hide").addEventListener("click", function () {
            document.querySelector("#rules").className = 'left';
            document.querySelector("#settings").className = 'current';
        });
    }

    function initializeDB() {
        if (window.indexedDB) {
            console.log("indexedDB support OK");
            storage_type = 'indexedDB';

            var request = indexedDB.open('test', 1);

            request.onsuccess = function (e) {
                db = e.target.result;
                shHome();
            };

            request.onerror = function (e) {
                console.log(e);
            };

            /* if database doesn't exist or schema has changed */
            request.onupgradeneeded = function (e) {
                db = e.target.result;

                if (db.objectStoreNames.contains("game")) {
                    db.deleteObjectStore("game");
                }

                var objectStore = db.createObjectStore('game', { keyPath: 'id', autoIncrement:true});

                console.log("the game table has been created");

            };
        }
        else if ('openDatabase' in window) {
            console.log("webSQL support OK");
            storage_type = 'webSQL';

            var shortName = 'mahjeek';
            var version = '1.0';
            var displayName = 'Mahjeek database';
            var maxSize = 65536; // in bytes

            try {
                db = openDatabase(shortName, version, displayName, maxSize);
            }
            catch(e) {
                if (e == 2) {
                    // Version number mismatch.
                    alert("Invalid database version.");
                } else {

                    alert("Unknown error "+e+".");
                }

                return;
            }



            db.transaction(function(sqltrans) {
                sqltrans.executeSql('CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                    'game_name TEXT,' + 'game_date TEXT, hand INTEGER,' +
                ' player1_name TEXT, player1_wind TEXT, player1_hand INTEGER, ' + 'player1_score INTEGER, ' +
                'player2_name TEXT, player2_wind TEXT, player2_hand INTEGER,' + ' player2_score INTEGER, ' +
                'player3_name TEXT, player3_wind TEXT, player3_hand INTEGER, ' + 'player3_score INTEGER, ' +
                'player4_name TEXT, player4_wind TEXT, player4_hand INTEGER, ' + 'player4_score INTEGER);',
                    [], nullDataHandler, errorHandler);
            });

            console.log("the game table has been created");
        }
        else {
            alert("Your browser doesn\'t support storage");
        }


    }


    function shNewGame() {
        document.getElementById("new-game-form").reset();
    }

    /* the home page lists existing games */
    function shHome() {

        console.log("Listing game…");
        var glist = document.getElementById("g-list");
        while (glist.firstChild) {
            glist.removeChild(glist.firstChild);
        }

        //List the games
        if(storage_type == 'indexedDB') {
            var transaction = db.transaction(['game']);
            var store = transaction.objectStore('game');

            // open a cursor to retrieve all items from the 'notes' store
            store.openCursor().onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    var value = cursor.value;
                    if (value) {
                        var game_name = value.game_name;
                        var gameElement = document.createElement("li");
                        gameElement.innerHTML = "<a name =" + value.id + "><p>" + value.game_name + " - " + "<span class='game-date'>" + formatDate(value.game_date) +"</span></p></a>";
                        gameElement.addEventListener("click", function () {
                            shCurrentGame(value.id);
                            document.querySelector("#home").className = 'currentToLeft';
                            document.querySelector("#current-game").className = 'rightToCurrent';
                        });
                        document.getElementById("g-list").appendChild(gameElement);
                    }


                    // move to the next item in the cursor
                    cursor.continue();
                }
            };
        }
        else if(storage_type == 'webSQL') {

            db.transaction(function(sqltrans) {
                 sqltrans.executeSql('SELECT * FROM games;', [],function(sqltrans, result) {
                    var nb = result.rows.length;
                     var i;

                     for(i=0; i<nb; i++) {
                         var gameElement = document.createElement("li");
                         gameElement.innerHTML = "<a name =" + result.rows.item(i).id + "><p>" + result.rows.item(i).game_name + " - " + "<span class='game-date'>" + result.rows.item(i).game_date +"</span></p></a>";
                         gameElement.addEventListener("click", function () {
                             shCurrentGame(result.rows.item(i).id);
                             document.querySelector("#home").className = 'currentToLeft';
                             document.querySelector("#current-game").className = 'rightToCurrent';
                         });
                         document.getElementById("g-list").appendChild(gameElement);

                     }
                    console.log("Number of rows " + nb);
                });
            });

        }
        else {
            console.log("no database support");
        }

        console.log("games listed !");
    }


    function checkNewGameForm() {
        if(!document.getElementById("gameName").value) {
            //document.getElementById("new-game-error").innerHTML = "Fields are required";
            console.log("Specify a game name ");
        }
        else{
            createGame();
        }
    }

    function formatDate(d) {
        var day;
        var month;

        if(d.getDate() < 10){
            day = "0" + d.getDate();
        }
        else{
            day = d.getDate();
        }
        if(d.getMonth() < 10){
            month = "0" + d.getMonth();
        }
        else{
            month = d.getMonth();
        }

        return day + "/" + month + "/" + d.getFullYear();
    }


    function createGame() {

        var hand = 1;
        var playerHand = 1;
        var playerScore = 1;
        var game_name = document.getElementById("gameName").value;
        var player1_name = document.getElementById("player1").value;
        var wind_player1 = document.getElementById("windPlayer1").value;
        var player2_name = document.getElementById("player2").value;
        var wind_player2 = document.getElementById("windPlayer2").value;
        var player3_name = document.getElementById("player3").value;
        var wind_player3 = document.getElementById("windPlayer3").value;
        var player4_name = document.getElementById("player4").value;
        var wind_player4 = document.getElementById("windPlayer4").value;

        var date_now = new Date ();
        var game_date = new Date(date_now.getFullYear(), date_now.getMonth(), date_now.getDate());

        if(storage_type == 'indexedDB') {
            // Create the object game
            var transaction = db.transaction(['game'], 'readwrite');



            var value = {};
            var player1 = {};
            var player2 = {};
            var player3 = {};
            var player4 = {};


            value.game_name = game_name;
            value.hand = hand;
            value.game_date = game_date;

            player1.name = player1_name;
            player1.wind = wind_player1;
            player1.score = playerScore;
            player1.hand = playerHand;

            player2.name = player2_name;
            player2.wind = wind_player2;
            player2.score = playerScore;
            player2.hand = playerHand;

            player3.name = player3_name;
            player3.wind = wind_player3;
            player3.score = playerScore;
            player3.hand = playerScore;

            player4.name = player4_name;
            player4.wind = wind_player4;
            player4.score = playerScore;
            player4.hand = playerHand;

            value.player1 = player1;
            value.player2 = player2;
            value.player3 = player3;
            value.player4 = player4;



            var store = transaction.objectStore('game');
            var request = store.add(value);
            request.onsuccess = function (e) {
                console.log ("A new game has been started");
                current_game = value;
                current_game_id = request.result;
                console.log("Created object id: "+ request.result);
            };

            request.onerror = function (e) {
                console.log("Your game can\'t be saved : "+ e.value);
            };

            document.getElementById("hand").innerHTML = "Hand n° " + value.hand;
            document.getElementById("player1_value").innerHTML = "Player 1 : " + value.player1.name;
            document.getElementById("player2_value").innerHTML = "Player 2 : " +value.player2.name;
            document.getElementById("player3_value").innerHTML = "Player 3 : " +value.player3.name;
            document.getElementById("player4_value").innerHTML = "Player 4 : " +value.player4.name;

            // reset scores
            document.getElementById("player1-score").innerHTML = "Score : " + value.player1.score + " points";
            document.getElementById("player2-score").innerHTML = "Score : " + value.player2.score + " points";
            document.getElementById("player3-score").innerHTML = "Score : " + value.player3.score + " points";
            document.getElementById("player4-score").innerHTML = "Score : " + value.player4.score + " points";

            /* set values for edit-game page too */
            document.getElementById("edit-game-gameName").value = value.game_name;
            document.getElementById("edit-game-player1").value = value.player1.name;
            document.getElementById("edit-game-player2").value = value.player2.name;
            document.getElementById("edit-game-player3").value = value.player3.name;
            document.getElementById("edit-game-player4").value = value.player4.name;
        }
        else if(storage_type == 'webSQL') {

            var valuesToInsert = [
                game_name, game_date, hand,
                player1_name , wind_player1, playerHand, playerScore,
                player2_name , wind_player2, playerHand, playerScore,
                player3_name , wind_player3, playerHand, playerScore,
                player4_name , wind_player4, playerHand, playerScore
            ];


            db.transaction(function(sqltrans) {
                sqltrans.executeSql('INSERT INTO games (game_name, game_date, hand,' +
                    'player1_name , player1_wind, player1_hand, player1_score,' +
                    'player2_name , player2_wind, player2_hand, player2_score,' +
                    'player3_name , player3_wind, player3_hand, player3_score,' +
                    'player4_name , player4_wind, player4_hand, player4_score)' +
                    ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);', valuesToInsert,
                    nullDataHandler, errorHandler);
            });


        }


        // reset player hand point
        document.getElementById("current-game-form").reset();

    }

    function shCurrentGame(game_id) {

        console.log("id de la partie:" + game_id);
        var transaction = db.transaction(["game"]);
        var objectStore = transaction.objectStore("game");
        id = parseInt(game_id);
        var request = objectStore.get(id);
        request.onerror = function (event) {
            console.log("There is no game with id " + game_id);
        };
        request.onsuccess = function (event) {
        // Do something with the request.result!
            game_result = request.result;
            console.log(request.result.game_name);
            current_game = game_result;
            current_game_id = game_id;


            document.getElementById("player1_value").innerHTML = "Player 1 : " + current_game.player1.name;
            document.getElementById("player2_value").innerHTML = "Player 2 : " + current_game.player2.name;
            document.getElementById("player3_value").innerHTML = "Player 3 : " + current_game.player3.name;
            document.getElementById("player4_value").innerHTML = "Player 4 : " + current_game.player4.name;
            document.getElementById("player1-score").innerHTML = "Score : " + current_game.player1.score + " points";
            document.getElementById("player2-score").innerHTML = "Score : " + current_game.player2.score + " points";
            document.getElementById("player3-score").innerHTML = "Score : " + current_game.player3.score + " points";
            document.getElementById("player4-score").innerHTML = "Score : " + current_game.player4.score + " points";

            /* set values for edit-game page too */
            document.getElementById("edit-game-gameName").value = current_game.game_name;
            document.getElementById("edit-game-player1").value = current_game.player1.name;
            document.getElementById("edit-game-player2").value = current_game.player2.name;
            document.getElementById("edit-game-player3").value = current_game.player3.name;
            document.getElementById("edit-game-player4").value = current_game.player4.name;

        };

        // reset player hand point
        document.getElementById("current-game-form").reset();
        // change score of the game

    }

    function editGame(id) {
        var game_name = document.getElementById("edit-game-gameName").value;
        var player1_name = document.getElementById("edit-game-player1").value;
        var player2_name = document.getElementById("edit-game-player2").value;
        var player3_name = document.getElementById("edit-game-player3").value;
        var player4_name = document.getElementById("edit-game-player4").value;

        // Request the database object to update
        var objectStore = db.transaction(["game"], "readwrite").objectStore("game");
        var request = objectStore.get(current_game_id);

        request.onerror = function (event) {
            console.log("There is no game with id " + current_game_id);
        };

        request.onsuccess = function (event) {
            data = request.result;
            current_game = data;

            current_game.game_name = game_name;
            current_game.player1.name = player1_name;
            current_game.player2.name = player2_name;
            current_game.player3.name = player3_name;
            current_game.player4.name = player4_name;


            // Push the object in the database
            var requestUpdate = objectStore.put(data);
            requestUpdate.onerror = function(event) {
                console.log("Unable to update the database");
            };

            requestUpdate.onsuccess = function (event) {
                console.log("The database has been updated");
            };

        }
    }

    function deleteGame(id) {
        var trans = db.transaction(["game"], "readwrite");
        var store = trans.objectStore("game");

        var request = store.delete(id);

        request.onsuccess = function(e) {
            console.log("element has been deleted");
        };

        request.onerror = function(e) {
            console.log("delete error…");
            console.log(e);
        }
    }

    function shCalculationGame(input) {
        input_score = input;
        input_player =  input_score.name;
        console.log(input_player);

    }

    function resetPage() {
            document.getElementById("pasdeChow").checked = false;
            document.getElementById("mahDerniertuile").checked = false;
            document.getElementById("mahVolantKong").checked = false;
            document.getElementById("hulk").checked = false;
            document.getElementById("kingkong").checked = false;
            document.getElementById("wok").checked = false;
            document.getElementById("yinyang").checked = false;
            document.getElementById("porteExt").checked = false;
            document.getElementById("mainPure").checked = false;
            document.getElementById("drago").checked = false;
            document.getElementById("Mahjong").selectedIndex = 0;
            document.getElementById("mahjong part").selectedIndex = 0;
            document.getElementById("combination1").selectedIndex = 0;
            document.getElementById("combination2").selectedIndex = 0;
            document.getElementById("combination3").selectedIndex = 0;
            document.getElementById("combination4").selectedIndex = 0;
            document.getElementById("combination5").selectedIndex = 0;
            document.getElementById("dragon").selectedIndex = 0;
            document.getElementById("vent").selectedIndex = 0;
            document.getElementById("nb fleur").selectedIndex = 0;
            document.getElementById("fleur").selectedIndex = 0;
        }




    function calcul() {
            var resultat = 0;
            var multiplicateur = 0;
            var mahjong = parseInt(document.getElementById("Mahjong").value);
            var mahjongPart = parseInt(document.getElementById("mahjong part").value);
            var combinaisonPart = 0;
            var combinaisonUne = parseInt(document.getElementById("combination1").value);
            var combinaisonDeux = parseInt(document.getElementById("combination2").value);
            var combinaisonTroie = parseInt(document.getElementById("combination3").value);
            var combinaisonQuatre = parseInt(document.getElementById("combination4").value);
            var combinaisonCinq = parseInt(document.getElementById("combination5").value);
            var nbDragon = parseInt(document.getElementById("dragon").value);
            var vent = parseInt(document.getElementById("vent").value);
            var nbFleur = parseInt(document.getElementById("nb fleur").value);
            var fleur = parseInt(document.getElementById("fleur").value);
            if(document.getElementById("pasdeChow").checked) {
                combinaisonPart = combinaisonPart + 1;
            }
            if(document.getElementById("mahDerniertuile").checked) {
                combinaisonPart = combinaisonPart + 1;
            }
            if(document.getElementById("mahVolantKong").checked) {
                combinaisonPart = combinaisonPart + 1;
            }
            if(document.getElementById("hulk").checked) {
                combinaisonPart = combinaisonPart + 1;
            }
            if(document.getElementById("kingkong").checked) {
                combinaisonPart = combinaisonPart + 2;
            }
            if(document.getElementById("wok").checked) {
                combinaisonPart = combinaisonPart + 2;
            }
            if(document.getElementById("yinyang").checked) {
                combinaisonPart = combinaisonPart + 2;
            }
            if(document.getElementById("porteExt").checked) {
                combinaisonPart = combinaisonPart + 2;
            }
            if(document.getElementById("mainPure").checked) {
                combinaisonPart = combinaisonPart + 3;
            }
            if(document.getElementById("drago").checked) {
                combinaisonPart = combinaisonPart + 4;
            }
            if(mahjong == 20) {
                mahjong = mahjong + mahjongPart;
            }
            resultat = mahjong + combinaisonUne + combinaisonDeux + combinaisonTroie;
            resultat = resultat + combinaisonQuatre + combinaisonCinq + nbFleur;
            multiplicateur = combinaisonPart + nbDragon + vent + fleur;
            multiplicateur = Math.pow(2,multiplicateur);
            var temp = resultat / 10;
            resultat = parseInt(resultat / 10);
            if(temp != resultat) {
                resultat = resultat + 1;
            }
            resultat = resultat * 10;
            resultat = resultat * multiplicateur;

            input_score.value = resultat;

            // Request the database object to update
            var objectStore = db.transaction(["game"], "readwrite").objectStore("game");
            var request = objectStore.get(current_game_id);

             request.onerror = function (event) {
            console.log("There is no game with id " + current_game_id);
            };

            request.onsuccess = function (event) {
                // Do something with the request.result!
                data = request.result;
                current_game = data;
                console.log("Hand player 1 : " + data.player1.hand);
                console.log("Hand player 2 : " + data.player2.hand);
                console.log("Hand player 3 : " + data.player3.hand);
                console.log("Hand player 4 : " + data.player4.hand);

                switch(input_player) {
                    case("player1"):
                        // update the values in the object
                        data.player1.score += resultat;
                        data.player1.hand += 1;

                        // desactivate input field to prevent cheat
                        document.getElementById("player1-hand-input").disabled = true;
                        document.getElementById("player1-score").innerHTML = "Score : " + current_game.player1.score + " points";
                        if(data.player1.hand == data.player2.hand && data.player1.hand == data.player3.hand && data.player1.hand == data.player4.hand){
                            console.log("The hand number will be updated");
                            data.hand +=1;
                            document.getElementById("hand").innerHTML = "Hand n° " + data.hand;
                            document.getElementById("player1-hand-input").disabled = false;
                            document.getElementById("player2-hand-input").disabled = false;
                            document.getElementById("player3-hand-input").disabled = false;
                            document.getElementById("player4-hand-input").disabled = false;
                            document.getElementById("current-game-form").reset();
                        }
                        break;
                    case("player2"):
                        // update the values in the object
                        data.player2.score += resultat;
                         data.player2.hand += 1;

                        // desactivate input field to prevent cheat
                        document.getElementById("player2-hand-input").disabled = true;
                        document.getElementById("player2-score").innerHTML =  "Score : " + current_game.player2.score + " points";
                        if(data.player1.hand == data.player2.hand && data.player1.hand == data.player3.hand && data.player1.hand == data.player4.hand){
                            console.log("The hand number will be updated");
                            data.hand +=1;
                            document.getElementById("hand").innerHTML = "Hand n° " + data.hand;
                            document.getElementById("player1-hand-input").disabled = false;
                            document.getElementById("player2-hand-input").disabled = false;
                            document.getElementById("player3-hand-input").disabled = false;
                            document.getElementById("player4-hand-input").disabled = false;
                            document.getElementById("current-game-form").reset();
                        }
                        break;
                    case("player3"):
                        // update the values in the object
                        data.player3.score += resultat;
                        data.player3.hand += 1;
                        // desactivate input field to prevent cheat
                        document.getElementById("player3-hand-input").disabled = true;
                        document.getElementById("player3-score").innerHTML =  "Score : " + current_game.player3.score + " points";
                        if(data.player1.hand == data.player2.hand && data.player1.hand == data.player3.hand && data.player1.hand == data.player4.hand){
                            console.log("The hand number will be updated");
                            data.hand +=1;
                            document.getElementById("hand").innerHTML = "Hand n° " + data.hand;
                            document.getElementById("player1-hand-input").disabled = false;
                            document.getElementById("player2-hand-input").disabled = false;
                            document.getElementById("player3-hand-input").disabled = false;
                            document.getElementById("player4-hand-input").disabled = false;
                            document.getElementById("current-game-form").reset();
                        }
                        break;
                    case("player4"):
                        // update the values in the object
                        data.player4.score += resultat;
                        data.player4.hand += 1;
                        // desactivate input field to prevent cheat
                        document.getElementById("player4-hand-input").disabled = true;
                        document.getElementById("player4-score").innerHTML = "Score : " + current_game.player4.score + " points";
                        if(data.player1.hand == data.player2.hand && data.player1.hand == data.player3.hand && data.player1.hand == data.player4.hand){
                            console.log("The hand number will be updated");
                            data.hand +=1;
                            document.getElementById("hand").innerHTML = "Hand n° " + data.hand;
                            document.getElementById("player1-hand-input").disabled = false;
                            document.getElementById("player2-hand-input").disabled = false;
                            document.getElementById("player3-hand-input").disabled = false;
                            document.getElementById("player4-hand-input").disabled = false;
                            document.getElementById("current-game-form").reset();
                        }
                        break;
                }



                // Push the object in the database
                var requestUpdate = objectStore.put(data);
                requestUpdate.onerror = function(event) {
                    console.log("Unable to update the database");
                };

                requestUpdate.onsuccess = function (event) {
                    console.log("The database has been updated");
                };

            };
    }

initializeDB();
addEventListeners();
/* end of IIFE */
}) ();

