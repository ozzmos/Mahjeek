var db;
var input_player;

function initializeDB(){
    if(window.indexedDB){
        console.log("Support d\'indexedDB OK");
    }
    else{
        alert("Votre navigateur ne supporte pas indexedDB");
    }

    var request = indexedDB.open('test', 1);

    request.onsuccess = function (e){
        db = e.target.result;
    };

    request.onerror = function (e){
        console.log(e);
    };

    request.onupgradeneeded = function (e){
        db = e.target.result;

        if (db.objectStoreNames.contains("game")) {
            db.deleteObjectStore("game");
        }

        var objectStore = db.createObjectStore('game', { keyPath: 'id', autoIncrement:true});

        console.log("La table game a été créée ");
    };
}


function shNewGame(){
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    $("#new-game").show();
}

/*
function launch_game() {
    var gameName = document.getElementById("gameName").value;
    var player1 = document.getElementById("player1").value;
    var windPlayer1 = document.getElementById("windPlayer1").value;
    var player2 = document.getElementById("player2").value;
    var windPlayer2 = document.getElementById("windPlayer2").value;
    var player3 = document.getElementById("player3").value;
    var windPlayer3 = document.getElementById("windPlayer3").value;
    var player4 = document.getElementById("player4").value;
    var windPlayer4 = document.getElementById("windPlayer4").value;


    // Create the object game
    var transaction = db.transaction(['game'], 'readwrite');


    var value = {};
    value.gameName = gameName;
    value.player1 = player1;
    value.windPlayer1 = windPlayer1;
    value.player2 = player2;
    value.windPlayer2 = windPlayer2;
    value.player3 = player3;
    value.windPlayer3 = windPlayer3;
    value.player4 = player4;
    value.windPlayer4 = windPlayer4;
    value.hand = 1;

    var store = transaction.objectStore('game');
    var request = store.add(value);
    request.onsuccess = function (e){
        console.log ("Une nouvelle partie a été commencée");
    };

    request.onerror = function (e){
        console.log("Votre partie n'a pas pu être sauvegardée : "+ e.value);
    };

    play_game();
    //list_games();
}*/

/* the home page lists existing games */
function shHome(){
    $("#g-list").html("");
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();


    //List the games
    var transaction = db.transaction([ 'game' ]);
    var store = transaction.objectStore('game');

    // open a cursor to retrieve all items from the 'notes' store
    store.openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            var value = cursor.value;
            var gameName = value.gameName;
            var gameElement = "<li><a onclick='play_game()'><p>"+gameName+"</p></a></li>";
            $("#g-list").append(gameElement);

            // move to the next item in the cursor
            cursor.continue();
        }
    };

    $("#home").show();
}

function shCurrentGame(){
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    /*var transaction  = db.transaction(['game']);
    var store  = transaction.objectStore('game');

    store.openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            var value = cursor.value;
            document.getElementById("hand").innerHTML = "Tour " + value.hand;

        }
    };*/
     var gameName = document.getElementById("gameName").value;
    var player1 = document.getElementById("player1").value;
    var windPlayer1 = document.getElementById("windPlayer1").value;
    var player2 = document.getElementById("player2").value;
    var windPlayer2 = document.getElementById("windPlayer2").value;
    var player3 = document.getElementById("player3").value;
    var windPlayer3 = document.getElementById("windPlayer3").value;
    var player4 = document.getElementById("player4").value;
    var windPlayer4 = document.getElementById("windPlayer4").value;


    // Create the object game
    var transaction = db.transaction(['game'], 'readwrite');


    var value = {};
    value.gameName = gameName;
    value.player1 = player1;
    value.windPlayer1 = windPlayer1;
    value.player2 = player2;
    value.windPlayer2 = windPlayer2;
    value.player3 = player3;
    value.windPlayer3 = windPlayer3;
    value.player4 = player4;
    value.windPlayer4 = windPlayer4;
    value.hand = 1;

    var store = transaction.objectStore('game');
    var request = store.add(value);
    request.onsuccess = function (e){
        console.log ("Une nouvelle partie a été commencée");
    };

    request.onerror = function (e){
        console.log("Votre partie n'a pas pu être sauvegardée : "+ e.value);
    };

    document.getElementById("player1_value").innerHTML = value.player1;
    document.getElementById("player2_value").innerHTML = value.player2;
    document.getElementById("player3_value").innerHTML = value.player3;
    document.getElementById("player4_value").innerHTML = value.player4;


    $("#current-game").show();

}


function shCalculationGame(input){
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    $("#calculation-game").show();

    input_player = input;

}

function show_rules(){
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    $("#rules").show();

}

function show_about(){
    $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
    $("#about").show();
}


function calcul() {
		var resultat = 0;
		var multiplicateur = 0;
		var mahjong = parseInt(document.getElementById("Mahjong").value);
		var mahjongPart = parseInt(document.getElementById("mahjong part").value);
		var combinaisonPart = 0;
		var combinaisonUne = parseInt(document.getElementById("combinaison 1").value);
		var combinaisonDeux = parseInt(document.getElementById("combinaison 2").value);
		var combinaisonTroie = parseInt(document.getElementById("combinaison 3").value);
		var combinaisonQuatre = parseInt(document.getElementById("combinaison 4").value);
		var combinaisonCinq = parseInt(document.getElementById("combinaison 5").value);
		var nbDragon = parseInt(document.getElementById("dragon").value);
		var vent = parseInt(document.getElementById("vent").value);
		var nbFleur = parseInt(document.getElementById("nb fleur").value);
		var fleur = parseInt(document.getElementById("fleur").value);
		if(document.getElementById("pasdeChow").checked)
		{
			combinaisonPart = combinaisonPart + 1;
		}
		if(document.getElementById("mahDerniertuile").checked)
		{
			combinaisonPart = combinaisonPart + 1;
		}
		if(document.getElementById("mahVolantKong").checked)
		{
			combinaisonPart = combinaisonPart + 1;
		}
		if(document.getElementById("hulk").checked)
		{
			combinaisonPart = combinaisonPart + 1;
		}
		if(document.getElementById("kingkong").checked)
		{
			combinaisonPart = combinaisonPart + 2;
		}
		if(document.getElementById("wok").checked)
		{
			combinaisonPart = combinaisonPart + 2;
		}
		if(document.getElementById("yinyang").checked)
		{
			combinaisonPart = combinaisonPart + 2;
		}
		if(document.getElementById("porteExt").checked)
		{
			combinaisonPart = combinaisonPart + 2;
		}
		if(document.getElementById("mainPure").checked)
		{
			combinaisonPart = combinaisonPart + 3;
		}
		if(document.getElementById("drago").checked)
		{
			combinaisonPart = combinaisonPart + 4;
		}
		if(mahjong == 20)
		{
			mahjong = mahjong + mahjongPart;
		}
		resultat = mahjong + combinaisonUne + combinaisonDeux + combinaisonTroie;
		resultat = resultat + combinaisonQuatre + combinaisonCinq + nbFleur;
		multiplicateur = combinaisonPart + nbDragon + vent + fleur;
		multiplicateur = Math.pow(2,multiplicateur);
		var temp = resultat / 10;
		resultat = parseInt(resultat / 10);
		if(temp != resultat)
		{
			resultat = resultat + 1;
		}
		resultat = resultat * 10;
		resultat = resultat * multiplicateur;

        input_player.value = resultat;

		//alert(resultat);
        $("#home, #new-game, #current-game, #list-games,  #calculation-game,#rules, #about").hide();
        $("#current-game").show();
        //alert(resultat);



        // Create the object game


		//document.getElementById("score").textContent = resultat;
		//resetpage();
}

$(document).ready(function(){
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
		document.getElementById("combinaison 1").selectedIndex = 0;
		document.getElementById("combinaison 2").selectedIndex = 0;
		document.getElementById("combinaison 3").selectedIndex = 0;
		document.getElementById("combinaison 4").selectedIndex = 0;
		document.getElementById("combinaison 5").selectedIndex = 0;
		document.getElementById("dragon").selectedIndex = 0;
		document.getElementById("vent").selectedIndex = 0;
		document.getElementById("nb fleur").selectedIndex = 0;
		document.getElementById("fleur").selectedIndex = 0;
	}

});
*/

