
/* IIFE Immediately invoked function */
(function () {

    var db;
    var input_score;
    var input_player;
    var current_game;
    var current_game_id;
    var ul_li_mahjongmahjong = document.getElementById("mahjongmahjong").querySelectorAll("ul li");
    var div_bonusMahjong_li = document.querySelectorAll("div[name='bonusMahjong'] li");
    var div_complementsForScore_li_name = document.querySelectorAll("div[id='complementsForScore'] li[name]");

    function addEventListeners () {
        // HOME VIEW
        document.querySelector("#btn-home-add").addEventListener("click", function () {
            // reset form fields
            document.getElementById("gameName").value = "";
            document.getElementById("player1").value = "";
            document.getElementById("player2").value = "";
            document.getElementById("player3").value = "";
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

        // CALCULATION GAME VIEW
        document.querySelector("#btn-calculation-game-done").addEventListener("click", function () {
            saveScoreToDB();
            resetPage();
            document.querySelector("#calculation-game").className = 'currentToRight';
            document.querySelector("#current-game").className = 'leftToCurrent';
        });

        document.querySelector("#btn-calculation-game-cancel").addEventListener("click", function () {
            document.querySelector("#calculation-game").className = 'currentToRight';
            document.querySelector("#current-game").className = 'leftToCurrent';
            resetPage();
        });

        document.querySelector("#flowersSeasons").addEventListener("change", function() {
            document.getElementById("flowerOrSeason").checked = false;
            document.getElementById("flowerAndSeason").checked = false;
            document.getElementById("fourFlowersAndOrFourSeasons").checked = false;
            if (parseInt(document.getElementById("flowersSeasons").selectedIndex) == 1) {
                document.querySelector("li[name='flowerOrSeason']").style.display = 'inline';
                document.querySelector("li[name='flowerAndSeason']").style.display = 'none';
                document.querySelector("li[name='fourFlowersAndOrFourSeasons']").style.display = 'none';
            } else if (parseInt(document.getElementById("flowersSeasons").selectedIndex) == 2 ||
                parseInt(document.getElementById("flowersSeasons").selectedIndex) == 3){
                document.querySelector("li[name='flowerOrSeason']").style.display = 'inline';
                document.querySelector("li[name='flowerAndSeason']").style.display = 'inline';
                document.querySelector("li[name='fourFlowersAndOrFourSeasons']").style.display = 'none';
            } else if (parseInt(document.getElementById("flowersSeasons").selectedIndex) >= 4) {
                document.querySelector("li[name='flowerOrSeason']").style.display = 'inline';
                document.querySelector("li[name='flowerAndSeason']").style.display = 'inline';
                document.querySelector("li[name='fourFlowersAndOrFourSeasons']").style.display = 'inline';
            } else if (parseInt(document.getElementById("flowersSeasons").selectedIndex) == 0) {
                document.querySelector("li[name='flowerOrSeason']").style.display = 'none';
                document.querySelector("li[name='flowerAndSeason']").style.display = 'none';
                document.querySelector("li[name='fourFlowersAndOrFourSeasons']").style.display = 'none';
            }
        });

        document.querySelector("#checkFlowersSeasons").addEventListener("change", function() {
            if (document.querySelector("#checkFlowersSeasons").checked == true) {
                var tempScore = calculScore();
                alert(tempScore);
                document.getElementById("mahjongmahjong").style.display = 'block';
            } else if (document.querySelector("#checkFlowersSeasons").checked == false) {
                document.getElementById("flowersSeasons").selectedIndex = 0;
                document.getElementById("flowerOrSeason").checked = false;
                document.getElementById("flowerAndSeason").checked = false;
                document.getElementById("fourFlowersAndOrFourSeasons").checked = false;
                document.getElementById("mahjongmahjong").style.display = 'none';
                if (document.getElementById("checkMahjong").checked = true) {
                    resetFormComplements ();
                }
                resetFormMahjong ();
            }
        });

        document.querySelector("#mahjong").addEventListener("change", function() {
            if (parseInt(document.querySelector("#mahjong").selectedIndex) == 1) {
                for (var x=1; x<ul_li_mahjongmahjong.length-12; x++) {
                    ul_li_mahjongmahjong[x].style.display = 'inline';
                }
                document.getElementById("reachMahjong").selectedIndex = 0;
                document.getElementById("typeMahjong").selectedIndex = 0;
                document.getElementById("noChow").checked = false;
                document.getElementById("fourChows").checked = false;
                document.getElementById("wok").checked = false;
                document.getElementById("pureHand").checked = false;
                document.getElementById("yinYang").checked = false;
                document.getElementById("hulk").checked = false;
                document.getElementById("hidden").checked = false;
                document.getElementById("honorable").checked = false;
                document.getElementById("kingKong").checked = false;
                document.getElementById("nineArks").checked = false;
                document.getElementById("worthy").checked = false;
            } else if (parseInt(document.querySelector("#mahjong").selectedIndex) == 0) {
                if (document.getElementById("checkMahjong").checked = true) {
                    resetFormComplements ();
                }
                resetFormMahjong ();
            }
        });

        document.querySelector("#typeMahjong").addEventListener("change", function () {
            if (parseInt(document.querySelector("#typeMahjong").selectedIndex) == 0) {
                for (var x=0; x<div_bonusMahjong_li.length;x++) {
                    div_bonusMahjong_li[x].style.display = 'none';
                }
            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 1) {
                for (var x=0; x<div_bonusMahjong_li.length;x++) {
                    div_bonusMahjong_li[x].style.display = 'inline';
                }
                div_bonusMahjong_li[9].style.display = 'none';
                div_bonusMahjong_li[10].style.display = 'none';
            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 2) {
                for (var x=0; x<div_bonusMahjong_li.length-1;x++) {
                    div_bonusMahjong_li[x].style.display = 'none';
                }
                div_bonusMahjong_li[2].style.display = 'inline';
                div_bonusMahjong_li[3].style.display = 'inline';
                div_bonusMahjong_li[4].style.display = 'inline';
                div_bonusMahjong_li[5].style.display = 'inline';
                div_bonusMahjong_li[7].style.display = 'inline';
            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 3) {
                for (var x=0; x<div_bonusMahjong_li.length;x++) {
                    div_bonusMahjong_li[x].style.display = 'none';
                }
                div_bonusMahjong_li[9].style.display = 'inline';
            }
             else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 4) {
                for (var x=0; x<div_bonusMahjong_li.length;x++) {
                    div_bonusMahjong_li[x].style.display = 'none';
                }
                div_bonusMahjong_li[10].style.display = 'inline';
            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 5) {
                for (var x=0; x<div_bonusMahjong_li.length;x++) {
                    div_bonusMahjong_li[x].style.display = 'none';
                }
                div_bonusMahjong_li[0].style.display = 'inline';
                div_bonusMahjong_li[3].style.display = 'inline';
                div_bonusMahjong_li[6].style.display = 'inline';
                div_bonusMahjong_li[7].style.display = 'inline';
                div_bonusMahjong_li[8].style.display = 'inline';
            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 6) {
                for (var x=0; x<div_bonusMahjong_li.length;x++) {
                    div_bonusMahjong_li[x].style.display = 'none';
                }
                div_bonusMahjong_li[3].style.display = 'inline';
                div_bonusMahjong_li[6].style.display = 'inline';
                div_bonusMahjong_li[7].style.display = 'inline';
                div_bonusMahjong_li[8].style.display = 'inline';
            }
        });

        document.querySelector("#checkMahjong").addEventListener("change", function() {
            if (document.querySelector("#checkMahjong").checked == true) {
                var tempScore = calculScore();
                alert(tempScore);
                document.querySelector("div[id='complementsForScore']").style.display = 'block';
                /*if (parseInt(document.getElementById("typeMahjong").selectedIndex) == 2)
                    var ee = document.querySelectorAll("div[id='complementsForScore'] ul li\:not(\:nth-child(-n+3))");
                    for (x=0; x<ee.length; x++) {
                        ee[x].style.display = 'none';
                    }
                /*} else if (parseInt(document.getElementById("typeMahjong").selectedIndex) == 3) {
                    var ee = document.querySelectorAll("div[id='complementsForScore'] ul li\:not(\:nth-child(-n+3))");
                    for (x=0; x<ee.length; x++) {
                        ee[x].style.display = 'none';
                    }
                }*/
            } else if (document.querySelector("#checkMahjong").checked == false) {
                resetFormComplements ();
                resetFormMahjong ();
            }
        });

        document.querySelector("#finalCheck").addEventListener("change", function () {
            if (document.querySelector("#finalCheck").checked == true) {
                var tempScore = calculScore();
                alert(tempScore);
            }
        });

        document.querySelector("#boxPairDragon").addEventListener("change", function () {
            if (document.querySelector("#boxPairDragon").checked == true) {
                document.querySelector("li[name='pairDragon']").style.display = 'inline';
            } else if (document.querySelector("#boxPairDragon").checked == false) {
                document.querySelector("li[name='pairDragon']").style.display = 'none';
                document.getElementById("pairDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedPungMinor").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedPungMinor").checked == true) {
                document.querySelector("li[name='revealedPungMinor']").style.display = 'inline';
            } else if (document.querySelector("#boxRevealedPungMinor").checked == false) {
                document.querySelector("li[name='revealedPungMinor']").style.display = 'none';
                document.getElementById("revealedPungMinor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxPungMinor").addEventListener("change", function () {
            if (document.querySelector("#boxPungMinor").checked == true) {
                document.querySelector("li[name='pungMinor']").style.display = 'inline';
            } else if (document.querySelector("#boxPungMinor").checked == false) {
                document.querySelector("li[name='pungMinor']").style.display = 'none';
                document.getElementById("pungMinor").selectedIndex = 0;
            }
        });
        document.querySelector("#boxRevealedPungMajor").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedPungMajor").checked == true) {
                document.querySelector("li[name='revealedPungMajor']").style.display = 'inline';
            } else if (document.querySelector("#boxRevealedPungMajor").checked == false) {
                document.querySelector("li[name='revealedPungMajor']").style.display = 'none';
                document.getElementById("revealedPungMajor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxPungMajor").addEventListener("change", function () {
            if (document.querySelector("#boxPungMajor").checked == true) {
                document.querySelector("li[name='pungMajor']").style.display = 'inline';
            } else if (document.querySelector("#boxPungMajor").checked == false) {
                document.querySelector("li[name='pungMajor']").style.display = 'none';
                document.getElementById("pungMajor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedPungWind").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedPungWind").checked == true) {
                document.querySelector("li[name='revealedPungWind']").style.display = 'inline';
            } else if (document.querySelector("#boxRevealedPungWind").checked == false) {
                document.querySelector("li[name='revealedPungWind']").style.display = 'none';
                document.getElementById("revealedPungWind").selectedIndex = 0;
            }
        });

        document.querySelector("#boxPungWind").addEventListener("change", function () {
            if (document.querySelector("#boxPungWind").checked == true) {
                document.querySelector("li[name='pungWind']").style.display = 'inline';
            } else if (document.querySelector("#boxPungWind").checked == false) {
                document.querySelector("li[name='pungWind']").style.display = 'none';
                document.getElementById("pungWind").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedPungDragon").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedPungDragon").checked == true) {
                document.querySelector("li[name='revealedPungDragon']").style.display = 'inline';
            } else if (document.querySelector("#boxRevealedPungDragon").checked == false) {
                document.querySelector("li[name='revealedPungDragon']").style.display = 'none';
                document.getElementById("revealedPungDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxPungDragon").addEventListener("change", function () {
            if (document.querySelector("#boxPungDragon").checked == true) {
                document.querySelector("li[name='pungDragon']").style.display = 'inline';
            } else if (document.querySelector("#boxPungDragon").checked == false) {
                document.querySelector("li[name='pungDragon']").style.display = 'none';
                document.getElementById("pungDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedKongMinor").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedKongMinor").checked == true) {
                document.querySelector("li[name='revealedKongMinor']").style.display = 'inline';
            } else if (document.querySelector("#boxRevealedKongMinor").checked == false) {
                document.querySelector("li[name='revealedKongMinor']").style.display = 'none';
                document.getElementById("revealedKongMinor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongMinor").addEventListener("change", function () {
            if (document.querySelector("#boxKongMinor").checked == true) {
                document.querySelector("li[name='kongMinor']").style.display = 'inline';
            } else if (document.querySelector("#boxKongMinor").checked == false) {
                document.querySelector("li[name='kongMinor']").style.display = 'none';
                document.getElementById("kongMinor").selectedIndex = 0;
            }
        });
        document.querySelector("#boxRevealedKongMajor").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedKongMajor").checked == true) {
                document.querySelector("li[name='revealedKongMajor']").style.display = 'inline';
            } else if (document.querySelector("#boxRevealedKongMajor").checked == false) {
                document.querySelector("li[name='revealedKongMajor']").style.display = 'none';
                document.getElementById("revealedKongMajor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongMajor").addEventListener("change", function () {
            if (document.querySelector("#boxKongMajor").checked == true) {
                document.querySelector("li[name='kongMajor']").style.display = 'inline';
            } else if (document.querySelector("#boxKongMajor").checked == false) {
                document.querySelector("li[name='kongMajor']").style.display = 'none';
                document.getElementById("kongMajor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedKongWind").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedKongWind").checked == true) {
                document.querySelector("li[name='revealedKongWind']").style.display = 'inline';
            } else if (document.querySelector("#boxRevealedKongWind").checked == false) {
                document.querySelector("li[name='revealedKongWind']").style.display = 'none';
                document.getElementById("revealedKongWind").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongWind").addEventListener("change", function () {
            if (document.querySelector("#boxKongWind").checked == true) {
                document.querySelector("li[name='kongWind']").style.display = 'inline';
            } else if (document.querySelector("#boxKongWind").checked == false) {
                document.querySelector("li[name='kongWind']").style.display = 'none';
                document.getElementById("kongWind").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedKongDragon").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedKongDragon").checked == true) {
                document.querySelector("li[name='revealedKongDragon']").style.display = 'inline';
            } else if (document.querySelector("#boxRevealedKongDragon").checked == false) {
                document.querySelector("li[name='revealedKongDragon']").style.display = 'none';
                document.getElementById("revealedKongDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongDragon").addEventListener("change", function () {
            if (document.querySelector("#boxKongDragon").checked == true) {
                document.querySelector("li[name='kongDragon']").style.display = 'inline';
            } else if (document.querySelector("#boxKongDragon").checked == false) {
                document.querySelector("li[name='kongDragon']").style.display = 'none';
                document.getElementById("kongDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongPungDragon").addEventListener("change", function () {
            if (document.querySelector("#boxKongPungDragon").checked == true) {
                document.querySelector("li[name='kongPungDragon']").style.display = 'inline';
            } else if (document.querySelector("#boxKongPungDragon").checked == false) {
                document.querySelector("li[name='kongPungDragon']").style.display = 'none';
                document.getElementById("kongPungDragon").selectedIndex = 0;
            }
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
        else {
            alert("Your browser doesn\'t support indexedDB");
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
        var transaction = db.transaction(['game']);
        var store = transaction.objectStore('game');

        // open a cursor to retrieve all items from the 'notes' store
        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                var value = cursor.value;
                if (value){
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
            month = "0" + (d.getMonth()+1);
        }
        else{
            month = d.getMonth()+1;
        }
        return day + "/" + month + "/" + d.getFullYear();
    }


    function createGame() {

        var game_name = document.getElementById("gameName").value;
        var player1_name = document.getElementById("player1").value;
        var player2_name = document.getElementById("player2").value;
        var player3_name = document.getElementById("player3").value;
        var player4_name = document.getElementById("player4").value;


        // Create the object game
        var transaction = db.transaction(['game'], 'readwrite');

        var date_now = new Date ();
        var game_date = new Date(date_now.getFullYear(), date_now.getMonth(), date_now.getDate());

        var value = {};
        var player1 = {};
        var player2 = {};
        var player3 = {};
        var player4 = {};


        value.game_name = game_name;
        value.hand = 1;
        value.game_date = game_date;

        player1.name = player1_name;
        player1.wind = "East";
        player1.score = 0;
        player1.hand = 1;

        player2.name = player2_name;
        player2.wind = "South";
        player2.score = 0;
        player2.hand = 1;

        player3.name = player3_name;
        player3.wind = "West";
        player3.score = 0;
        player3.hand = 1;

        player4.name = player4_name;
        player4.wind = "North";
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

        document.getElementById("hand").innerHTML = "Hand n° " + value.hand + " / ";
        document.getElementById("tourWind").innerHTML = 'Tour Wind : East / ';
        document.getElementById("player1_value").innerHTML = "East Wind - Player 1 : " + value.player1.name;
        document.getElementById("player2_value").innerHTML = "South Wind - Player 2 : " +value.player2.name;
        document.getElementById("player3_value").innerHTML = "West Wind - Player 3 : " +value.player3.name;
        document.getElementById("player4_value").innerHTML = "North Wind - Player 4 : " +value.player4.name;

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

            document.getElementById("player1_value").innerHTML = "East Wind - Player 1 : " + current_game.player1.name;
            document.getElementById("player2_value").innerHTML = "South Wind - Player 2 : " + current_game.player2.name;
            document.getElementById("player3_value").innerHTML = "West Wind - Player 3 : " + current_game.player3.name;
            document.getElementById("player4_value").innerHTML = "North Wind - Player 4 : " + current_game.player4.name;
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

        document.getElementById("player1-hand-input").disabled = false;
        document.getElementById("player2-hand-input").disabled = false;
        document.getElementById("player3-hand-input").disabled = false;
        document.getElementById("player4-hand-input").disabled = false;
    }

    function shCalculationGame(input) {
        input_score = input;
        input_player = input_score.name;
        console.log(input_player);

    }

    function resetPage() {
        resetFormFlowers ();
        resetFormMahjong ();
        resetFormComplements ();
    }

    function resetFormFlowers () {
        document.getElementById("flowersSeasons").selectedIndex = 0;
        document.getElementById("flowerOrSeason").checked = false;
        document.getElementById("flowerAndSeason").checked = false;
        document.getElementById("fourFlowersAndOrFourSeasons").checked = false;
        document.getElementById("checkFlowersSeasons").checked = false;
        document.querySelector("li[name='flowerOrSeason']").style.display = 'none';
        document.querySelector("li[name='flowerAndSeason']").style.display = 'none';
        document.querySelector("li[name='fourFlowersAndOrFourSeasons']").style.display = 'none';
        document.querySelector("div[id='mahjongmahjong']").style.display = 'none';
    }

    function resetFormMahjong () {
        document.getElementById("mahjong").selectedIndex = 0;
        document.getElementById("reachMahjong").selectedIndex = 0;
        document.getElementById("typeMahjong").selectedIndex = 0;
        document.getElementById("noChow").checked = false;
        document.getElementById("fourChows").checked = false;
        document.getElementById("wok").checked = false;
        document.getElementById("pureHand").checked = false;
        document.getElementById("yinYang").checked = false;
        document.getElementById("hulk").checked = false;
        document.getElementById("hidden").checked = false;
        document.getElementById("honorable").checked = false;
        document.getElementById("kingKong").checked = false;
        document.getElementById("nineArks").checked = false;
        document.getElementById("worthy").checked = false;
        document.getElementById("checkMahjong").checked = false;
        for (var x=1; x<ul_li_mahjongmahjong.length-12; x++) {
            ul_li_mahjongmahjong[x].style.display = 'none';
        }
        for (var x=0; x<div_bonusMahjong_li.length;x++) {
            div_bonusMahjong_li[x].style.display = 'none';
        }
        document.querySelector("div[id='complementsForScore']").style.display = 'none';
    }

    function resetFormComplements () {
        document.getElementById("pairPlayerWind").checked = false;
        document.getElementById("pairDominantWind").checked = false;
        document.getElementById("pairTourWind").checked = false;
        document.getElementById("boxPairDragon").checked = false;
        document.getElementById("pairDragon").selectedIndex = 0;
        document.getElementById("chow").checked = false;
        document.getElementById("boxRevealedPungMinor").checked = false;
        document.getElementById("revealedPungMinor").selectedIndex = 0;
        document.getElementById("boxPungMinor").checked = false;
        document.getElementById("pungMinor").selectedIndex = 0;
        document.getElementById("boxRevealedPungMajor").checked = false;
        document.getElementById("revealedPungMajor").selectedIndex = 0;
        document.getElementById("boxPungMajor").checked = false;
        document.getElementById("pungMajor").selectedIndex = 0;
        document.getElementById("boxRevealedPungWind").checked = false;
        document.getElementById("revealedPungWind").selectedIndex = 0;
        document.getElementById("boxPungWind").checked = false;
        document.getElementById("pungWind").selectedIndex = 0;
        document.getElementById("boxRevealedPungDragon").checked = false;
        document.getElementById("revealedPungDragon").selectedIndex = 0;
        document.getElementById("boxPungDragon").checked = false;
        document.getElementById("pungDragon").selectedIndex = 0;
        document.getElementById("boxRevealedKongMinor").checked = false;
        document.getElementById("revealedKongMinor").selectedIndex = 0;
        document.getElementById("boxKongMinor").checked = false;
        document.getElementById("kongMinor").selectedIndex = 0;
        document.getElementById("boxRevealedKongMajor").checked = false;
        document.getElementById("revealedKongMajor").selectedIndex = 0;
        document.getElementById("boxKongMajor").checked = false;
        document.getElementById("kongMajor").selectedIndex = 0;
        document.getElementById("boxRevealedKongWind").checked = false;
        document.getElementById("revealedKongWind").selectedIndex = 0;
        document.getElementById("boxKongWind").checked = false;
        document.getElementById("kongWind").selectedIndex = 0;
        document.getElementById("boxRevealedKongDragon").checked = false;
        document.getElementById("revealedKongDragon").selectedIndex = 0;
        document.getElementById("boxKongDragon").checked = false;
        document.getElementById("kongDragon").selectedIndex = 0;
        document.getElementById("kongPungPlayerWind").checked = false;
        document.getElementById("kongPungDominantWind").checked = false;
        document.getElementById("boxKongPungDragon").checked = false;
        document.getElementById("kongPungDragon").selectedIndex = 0;
        document.querySelector("div[id='complementsForScore']").style.display = 'none';
        for (var x=0; x<div_complementsForScore_li_name.length;x++) {
            div_complementsForScore_li_name[x].style.display = 'none';
        }
}
    function calculScore() {
        var points = 0;
            var multiplicateur = 0;

            //Flowers&Seasons
            var inputNbFlowers = document.getElementById("flowersSeasons").selectedIndex * 4;
            points = points + inputNbFlowers;
            if (document.getElementById("flowerOrSeason").checked == true) {
                multiplicateur = multiplicateur + parseInt(document.getElementById("flowerOrSeason").value);
            } else if (document.getElementById("flowerAndSeason").checked == true) {
               multiplicateur = multiplicateur + parseInt(document.getElementById("flowerAndSeason").value);
            } else if (document.getElementById("fourFlowersAndOrFourSeasons").checked == true) {
                multiplicateur = multiplicateur + parseInt(document.getElementById("fourFlowersAndOrFourSeasons").value);
            }

            //Mahjong
            if (parseInt(document.getElementById("mahjong").selectedIndex) != 0) {
                points = points + 20;
            }
            if (parseInt(document.getElementById("reachMahjong").selectedIndex) == 1) {
                multiplicateur = multiplicateur + b;
            } else if (parseInt(document.getElementById("reachMahjong").selectedIndex) == 2) {
                points = points + 5;
            } else if (parseInt(document.getElementById("reachMahjong").selectedIndex) == 3) {
                points = points + 5;
                multiplicateur = multiplicateur + 1;
            }
            if (parseInt(document.getElementById("typeMahjong").selectedIndex) == 1) {
                if (document.getElementById("noChow").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("noChow").value);
                }
                if (document.getElementById("fourChows").checked == true) {
                    points = points + parseInt(document.getElementById("fourChows").value);
                }
                if (document.getElementById("wok").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("wok").value);
                }
                if (document.getElementById("pureHand").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("pureHand").value);
                }
                if (document.getElementById("yinYang").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("yinYang").value);
                }
                if (document.getElementById("hulk").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("hulk").value);
                }
                if (document.getElementById("hidden").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("hidden").value);
                }
                if (document.getElementById("honorable").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("honorable").value);
                }
                if (document.getElementById("kingKong").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("kingKong").value);
                }
            } else if (parseInt(document.getElementById("typeMahjong").selectedIndex) == 2) {
                multiplicateur = multiplicateur + 3;
                if (document.getElementById("wok").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("wok").value);
                }
                if (document.getElementById("pureHand").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("pureHand").value);
                }
                if (document.getElementById("yinYang").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("yinYang").value);
                }
                if (document.getElementById("hulk").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("hulk").value);
                }
                if (document.getElementById("honorable").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("honorable").value);
                }
            } else if (parseInt(document.getElementById("typeMahjong").selectedIndex) == 3) {
                multiplicateur = multiplicateur + 5;
                if (document.getElementById("nineArks").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("nineArks").value);
                }
            } else if (parseInt(document.getElementById("typeMahjong").selectedIndex) == 4) {
                multiplicateur = multiplicateur + 4;
                if (document.getElementById("worthy").checked == true) {
                    points = points + parseInt(document.getElementById("worthy").value);
                }
            } else if (parseInt(document.getElementById("typeMahjong").selectedIndex) == 5) {
                multiplicateur = multiplicateur + 1;
                if (document.getElementById("noChow").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("noChow").value);
                }
                if (document.getElementById("pureHand").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("pureHand").value);
                }
                if (document.getElementById("hidden").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("hidden").value);
                }
                if (document.getElementById("honorable").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("honorable").value);
                }
                if (document.getElementById("kingKong").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("kingKong").value);
                }
            } else if (parseInt(document.getElementById("typeMahjong").selectedIndex) == 6) {
                multiplicateur = multiplicateur + 2;
                if (document.getElementById("pureHand").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("pureHand").value);
                }
                if (document.getElementById("hidden").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("hidden").value);
                }
                if (document.getElementById("honorable").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("honorable").value);
                }
                if (document.getElementById("kingKong").checked == true) {
                    multiplicateur = multiplicateur + parseInt(document.getElementById("kingKong").value);
                }
            }

            //Complements
            if (document.getElementById("pairPlayerWind").checked == true) {
                points = points + parseInt(document.getElementById("pairPlayerWind").value);
            }
            if (document.getElementById("pairDominantWind").checked == true) {
                points = points + parseInt(document.getElementById("pairDominantWind").value);
            }
            if (document.getElementById("pairTourWind").checked == true) {
                points = points + parseInt(document.getElementById("pairTourWind").value);
            }
            if (document.getElementById("boxPairDragon").checked == true) {
                points = points + parseInt(document.getElementById("pairDragon").selectedIndex)*2;
            }
            if (document.getElementById("chow").checked == true) {
                points = points + parseInt(document.getElementById("chow").value);
            }
            if (document.getElementById("boxRevealedPungMinor").checked == true) {
                points = points + parseInt(document.getElementById("revealedPungMinor").selectedIndex)*2;
            }
            if (document.getElementById("boxPungMinor").checked == true) {
                points = points + parseInt(document.getElementById("pungMinor").selectedIndex)*4;
            }
            if (document.getElementById("boxRevealedPungMajor").checked == true) {
                points = points + parseInt(document.getElementById("revealedPungMajor").selectedIndex)*4;
            }
            if (document.getElementById("boxPungMajor").checked == true) {
                points = points + parseInt(document.getElementById("pungMajor").selectedIndex)*8;
            }
            if (document.getElementById("boxRevealedPungWind").checked == true) {
                points = points + parseInt(document.getElementById("revealedPungWind").selectedIndex)*4;
            }
            if (document.getElementById("boxPungWind").checked == true) {
                points = points + parseInt(document.getElementById("pungWind").selectedIndex)*8;
            }
            if (document.getElementById("boxRevealedPungDragon").checked == true) {
                points = points + parseInt(document.getElementById("revealedPungDragon").selectedIndex)*4;
            }
            if (document.getElementById("boxPungDragon").checked == true) {
                points = points + parseInt(document.getElementById("pungDragon").selectedIndex)*8;
            }
            if (document.getElementById("boxRevealedKongMinor").checked == true) {
                points = points + parseInt(document.getElementById("revealedKongMinor").selectedIndex)*8;
            }
            if (document.getElementById("boxKongMinor").checked == true) {
                points = points + parseInt(document.getElementById("kongMinor").selectedIndex)*16;
            }
            if (document.getElementById("boxRevealedKongMajor").checked == true) {
                points = points + parseInt(document.getElementById("revealedKongMajor").selectedIndex)*16;
            }
            if (document.getElementById("boxKongMajor").checked == true) {
                points = points + parseInt(document.getElementById("kongMajor").selectedIndex)*32;
            }
            if (document.getElementById("boxRevealedKongWind").checked == true) {
                points = points + parseInt(document.getElementById("revealedKongWind").selectedIndex)*16;
            }
            if (document.getElementById("boxKongWind").checked == true) {
                points = points + parseInt(document.getElementById("kongWind").selectedIndex)*32;
            }
            if (document.getElementById("boxRevealedKongDragon").checked == true) {
                points = points + parseInt(document.getElementById("revealedKongDragon").selectedIndex)*16;
            }
            if (document.getElementById("boxKongDragon").checked == true) {
                points = points + parseInt(document.getElementById("kongDragon").selectedIndex*32);
            }
            if (document.getElementById("kongPungPlayerWind").checked == true) {
                multiplicateur = multiplicateur + parseInt(document.getElementById("kongPungPlayerWind").value);
            }
            if (document.getElementById("kongPungDominantWind").checked == true) {
                multiplicateur = multiplicateur + parseInt(document.getElementById("kongPungDominantWind").value);
            }
            if (document.getElementById("boxKongPungDragon").checked == true) {
                multiplicateur = multiplicateur + parseInt(document.getElementById("kongPungDragon").selectedIndex);
            }

            //Definitive score
            resultat = (Math.ceil(points/10)*10) * Math.pow(2,multiplicateur);

            return resultat;
    }

    function saveScoreToDB() {
            input_score.value = calculScore();

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

                if (data.hand < 5) {/*gérer le compteur de main*/
                document.getElementById("tourWind").innerHTML = 'Tour Wind : East / ';
                } else if (data.hand < 9) {
                    document.getElementById("tourWind").innerHTML = 'Tour Wind : South / ';
                } else if (data.hand < 13) {
                    document.getElementById("tourWind").innerHTML = 'Tour Wind : West / ';
                } else if (data.hand < 17) {
                    document.getElementById("tourWind").innerHTML = 'Tour Wind : North / ';
                }

                switch(input_player) {
                    case("player1"):
                        // update the values in the object
                        data.player1.score += input_score.value;
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
                        data.player2.score += input_score.value;
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
                        data.player3.score += input_score.value;
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
                        data.player4.score += input_score.value;
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
