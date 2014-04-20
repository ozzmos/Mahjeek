var db;
var input_score;
var input_player;
var current_game;
var current_game_id;

function initializeDB() {
    if (window.indexedDB) {
        console.log("indexedDB support OK");
    }
    else {
        alert("Your browser doesn\'t support indexedDB");
    }

    var request = indexedDB.open('test', 1);

    request.onsuccess = function (e) {
        db = e.target.result;
    };

    request.onerror = function (e) {
        console.log(e);
    };

    request.onupgradeneeded = function (e) {
        db = e.target.result;

        if (db.objectStoreNames.contains("game")) {
            db.deleteObjectStore("game");
        }

        var objectStore = db.createObjectStore('game', { keyPath: 'id', autoIncrement:true});

        console.log("the game table has been created");
    };
}


function shNewGame() {
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    document.getElementById("new-game-form").reset();
    $("#new-game").show();
}

/* the home page lists existing games */
function shHome() {
    $("#g-list").html("");
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();


    //List the games
    var transaction = db.transaction(['game']);
    var store = transaction.objectStore('game');

    // open a cursor to retrieve all items from the 'notes' store
    store.openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            var value = cursor.value;
            var game_name = value.game_name;
            var gameElement = "<li><a name=" + value.id + " onclick='shCurrentGame(this)'><p>" + game_name+"</p></a></li>";
            $("#g-list").append(gameElement);

            // move to the next item in the cursor
            cursor.continue();
        }
    };

    $("#home").show();
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


function createGame() {
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();


    var game_name = document.getElementById("gameName").value;
    var player1_name = document.getElementById("player1").value;
    var wind_player1 = document.getElementById("windPlayer1").value;
    var player2_name = document.getElementById("player2").value;
    var wind_player2 = document.getElementById("windPlayer2").value;
    var player3_name = document.getElementById("player3").value;
    var wind_player3 = document.getElementById("windPlayer3").value;
    var player4_name = document.getElementById("player4").value;
    var wind_player4 = document.getElementById("windPlayer4").value;


    // Create the object game
    var transaction = db.transaction(['game'], 'readwrite');


    var value = {};
    var player1 = {};
    var player2 = {};
    var player3 = {};
    var player4 = {};
    
    
    value.game_name = game_name;
    value.hand = 1;
    
    player1.name = player1_name;
    player1.wind = wind_player1;
    player1.score = 0;
    player1.hand = 1;
    
    player2.name = player2_name;
    player2.wind = wind_player2;
    player2.score = 0;
    player2.hand = 1;
    
    player3.name = player3_name;
    player3.wind = wind_player3;
    player3.score = 0;
    player3.hand = 1;
    
    player4.name = player4_name;
    player4.wind = wind_player4;
    player4.score = 0;
    player4.hand = 1;

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
    document.getElementById("player1_value").innerHTML = "Player 1: " + value.player1.name;
    document.getElementById("player2_value").innerHTML = "Player 2: " +value.player2.name;
    document.getElementById("player3_value").innerHTML = "Player 3: " +value.player3.name;
    document.getElementById("player4_value").innerHTML = "Player 4: " +value.player4.name;

    // reset scores
    document.getElementById("player1-score").innerHTML = "Score : " + value.player1.score + " points";
    document.getElementById("player2-score").innerHTML = "Score : " + value.player2.score + " points";
    document.getElementById("player3-score").innerHTML = "Score : " + value.player3.score + " points";
    document.getElementById("player4-score").innerHTML = "Score : " + value.player4.score + " points";

    // reset player hand point
    document.getElementById("current-game-form").reset();
    $("#current-game").show();

}



function shCurrentGame(game_name) {

    console.log("id de la partie:" + game_name.name);
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    var transaction = db.transaction(["game"]);
    var objectStore = transaction.objectStore("game");
    game_id = parseInt(game_name.name);
    var request = objectStore.get(game_id);
    request.onerror = function (event) {
        console.log("There is no game with id " + game_name.name);
    };
    request.onsuccess = function (event) {
    // Do something with the request.result!
        game_result = request.result;
        console.log(request.result.game_name);
        current_game = game_result;


        document.getElementById("player1_value").innerHTML = "Player 1: " + current_game.player1.name;
        document.getElementById("player2_value").innerHTML = "Player 2: " + current_game.player2.name;
        document.getElementById("player3_value").innerHTML = "Player 3: " + current_game.player3.name;
        document.getElementById("player4_value").innerHTML = "Player 4: " + current_game.player4.name;
        document.getElementById("player1-score").innerHTML = "Score : " + current_game.player1.score + " points";
        document.getElementById("player2-score").innerHTML = "Score : " + current_game.player2.score + " points";
        document.getElementById("player3-score").innerHTML = "Score : " + current_game.player3.score + " points";
        document.getElementById("player4-score").innerHTML = "Score : " + current_game.player4.score + " points";

    };

    // reset player hand point
    document.getElementById("current-game-form").reset();
    // change score of the game

    $("#current-game").show();

}


function shCalculationGame(input) {
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    resetPage();
    $("#calculation-game").show();

    input_score = input;
    input_player =  input_score.name;
    console.log(input_player);

}

function show_rules() {
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    $("#rules").show();

}

function show_about() {
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    $("#about").show();
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

function backToCurrentGame() {
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    $("#current-game").show();
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


        backToCurrentGame();
}

$(document).ready(function() {
    $("#home, #new-game, #current-game, #list-games,  #calculation-game").hide();
    initializeDB();
    $("#home").show();
});


/*
$(document).ready(function(){
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    initializeDB();
    //$("#home").show();
    $("#list-games").show();



	function somme1()
	{
		var celluleprise = "1_1";
		var celluencourt = 1;
		var somme = 0;
		while(celluencourt <= 16 && document.getElementById(celluleprise).value != "" )
		{
			somme += parseInt(document.getElementById(celluleprise).value);
			celluencourt += 1;
			celluleprise = celluencourt + "_1";
		}
		document.getElementById("total1").textContent = somme;

	}
	function somme2()
	{
		var celluleprise = "1_2";
		var celluencourt = 1;
		var somme = 0;
		while(celluencourt <= 16 && document.getElementById(celluleprise).value != "" )
		{
			somme += parseInt(document.getElementById(celluleprise).value);
			celluencourt += 1;
			celluleprise = celluencourt + "_2";
		}
		document.getElementById("total2").textContent = somme;
	}
	function somme3()
	{
		var celluleprise = "1_3";
		var celluencourt = 1;
		var somme = 0;
		while(celluencourt <= 16 && document.getElementById(celluleprise).value != "" )
		{
			somme += parseInt(document.getElementById(celluleprise).value);
			celluencourt += 1;
			celluleprise = celluencourt + "_3";
		}
		document.getElementById("total3").textContent = somme;
	}
	function somme4()
	{
		var celluleprise = "1_4";
		var celluencourt = 1;
		var somme = 0;
		while(celluencourt <= 16 && document.getElementById(celluleprise).value != "" )
		{
			somme += parseInt(document.getElementById(celluleprise).value);
			celluencourt += 1;
			celluleprise = celluencourt + "_4";
		}
		document.getElementById("total4").textContent = somme;
	}
	function total()
	{
		somme1();
		somme2();
		somme3();
		somme4();
	}
	function resetall()
	{
		resetpage();
		var celluleprise = "1_1";
		var ligneencourt = 1;
		var coloneencourt = 1;
		var somme = 0;
		while(ligneencourt <= 16)
		{
			while(coloneencourt <= 4)
			{
				document.getElementById(celluleprise).value = "";
				coloneencourt += 1;
				celluleprise = ligneencourt + "_" + coloneencourt;
			}
			coloneencourt = 1;
			ligneencourt += 1;
			celluleprise = ligneencourt + "_" + coloneencourt;
		}
	}
	function resetpage()
	{
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

});
*/

