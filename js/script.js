
/* IIFE Immediately invoked function */
(function () {

    var db;
    var input_score;
    var input_player;
    var current_game;
    var current_game_id;


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
            resetPage();
        });

        /*Additions by Florie in CALCULATION GAME VIEW*/
        document.querySelector("#flowersSeasons").addEventListener("change", function() {
            document.getElementById("flowerOrSeason").checked = false;
            document.getElementById("flowerAndSeason").checked = false;
            document.getElementById("fourFlowersAndOrFourSeasons").checked = false;
            if (parseInt(document.getElementById("flowersSeasons").selectedIndex) == 1) {
                document.querySelector("li[name='flowerOrSeason']").className = 'allday';
                document.querySelector("li[name='flowerAndSeason']").className = 'none';
                document.querySelector("li[name='fourFlowersAndOrFourSeasons']").className = 'none';
            } else if (parseInt(document.getElementById("flowersSeasons").selectedIndex) == 2 ||
                parseInt(document.getElementById("flowersSeasons").selectedIndex) == 3){
                document.querySelector("li[name='flowerOrSeason']").className = 'allday';
                document.querySelector("li[name='flowerAndSeason']").className = 'allday';
                document.querySelector("li[name='fourFlowersAndOrFourSeasons']").className = 'none';
            } else if (parseInt(document.getElementById("flowersSeasons").selectedIndex) >= 4) {
                document.querySelector("li[name='flowerOrSeason']").className = 'allday';
                document.querySelector("li[name='flowerAndSeason']").className = 'allday';
                document.querySelector("li[name='fourFlowersAndOrFourSeasons']").className = 'allday';
            } else if (parseInt(document.getElementById("flowersSeasons").selectedIndex) == 0) {
                document.querySelector("li[name='flowerOrSeason']").className = 'none';
                document.querySelector("li[name='flowerAndSeason']").className = 'none';
                document.querySelector("li[name='fourFlowersAndOrFourSeasons']").className = 'none';
            }
        });

        document.querySelector("#checkFlowersSeasons").addEventListener("change", function() {
            if (document.querySelector("#checkFlowersSeasons").checked == true) {
                document.querySelector("div[id='mahjongmahjong']").className = 'allday';
            } else if (document.querySelector("#checkFlowersSeasons").checked == false) {
                document.getElementById("flowersSeasons").selectedIndex = 0;
                document.getElementById("flowerOrSeason").checked = false;
                document.getElementById("flowerAndSeason").checked = false;
                document.getElementById("fourFlowersAndOrFourSeasons").checked = false;
                document.querySelector("div[id='mahjongmahjong']").className = 'none';
            }
        });

        /* What is this Mahjong */
        document.querySelector("#mahjong").addEventListener("change", function() {
            if (parseInt(document.querySelector("#mahjong").selectedIndex) == 1) {
                var elmts = document.getElementById("mahjongmahjong").querySelectorAll(".none");
                for (var x=0; x<elmts.length; x++) {
                    elmts[x].className = "allday";
                }
                var elements = document.querySelectorAll("div[name='bonusMahjong'] > li");
                if (parseInt(document.querySelector("#typeMahjong").selectedIndex) == 0) {
                    for (var i = 0; i <elements.length; ++i) {
                        elements[i].classList.remove("allday");
                        elements[i].classList.add("none");
                    }
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
                var elmts = document.getElementById("mahjongmahjong").querySelectorAll(".allday");
                for (var x=0; x<(elmts.length-1); x++) {
                    elmts[x].className = "none";
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
            }
        });



        document.querySelector("#typeMahjong").addEventListener("change", function () {
            var elements = document.querySelectorAll("div[name='bonusMahjong'] > li");
            if (parseInt(document.querySelector("#typeMahjong").selectedIndex) == 0) {
               for (var i = 0; i <elements.length; ++i) {
                    elements[i].classList.remove("allday");
                    elements[i].classList.add("none");
                }
            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 1) {
                for (var i = 0; i <elements.length; ++i) {
                    elements[i].classList.remove("none");
                    elements[i].classList.add("allday");
                }

            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 2) {
                for (var i = 0; i <elements.length; ++i) {
                    elements[i].classList.add("none");
                }
                document.querySelector("#pureHand").classList.remove("none");
                document.querySelector("#pureHand").classList.add("allday");
                document.querySelector("#wok").classList.remove("none");
                document.querySelector("#wok").classList.add("allday");
                document.querySelector("#hulk").classList.remove("none");
                document.querySelector("#hulk").classList.add("allday");
                document.querySelector("#yinYang").classList.remove("none");
                document.querySelector("#yinYang").classList.add("allday");
                document.querySelector("#honorable").classList.remove("none");
                document.querySelector("#honorable").classList.add("allday");
            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 3) {
                for (var i = 0; i <elements.length; ++i) {
                    elements[i].classList.add("none");
                }
                document.querySelector("#nineArks").classList.remove("none");
                document.querySelector("#nineArks").classList.add("allday");
            }
             else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 4) {
                for (var i = 0; i <elements.length; ++i) {
                    elements[i].classList.add("none");
                }
                document.querySelector("#worthy").classList.remove("none");
                document.querySelector("#worthy").classList.add("allday");
            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 5) {
                for (var i = 0; i <elements.length; ++i) {
                    elements[i].classList.add("none");
                }
                document.querySelector("#noChow").classList.remove("none");
                document.querySelector("#noChow").classList.add("allday");
                document.querySelector("#pureHand").classList.remove("none");
                document.querySelector("#pureHand").classList.add("allday");
                document.querySelector("#hidden").classList.remove("none");
                document.querySelector("#hidden").classList.add("allday");
                document.querySelector("#kingKong").classList.remove("none");
                document.querySelector("#kingKong").classList.add("allday");
                document.querySelector("#honorable").classList.remove("none");
                document.querySelector("#honorable").classList.add("allday");
            }
            else if(parseInt(document.querySelector("#typeMahjong").selectedIndex) == 6) {
                for (var i = 0; i <elements.length; ++i) {
                    elements[i].classList.add("none");
                }
                document.querySelector("#pureHand").classList.remove("none");
                document.querySelector("#pureHand").classList.add("allday");
                document.querySelector("#hidden").classList.remove("none");
                document.querySelector("#hidden").classList.add("allday");
                document.querySelector("#kingKong").classList.remove("none");
                document.querySelector("#kingKong").classList.add("allday");
                document.querySelector("#honorable").classList.remove("none");
                document.querySelector("#honorable").classList.add("allday");
            }
        });

        document.querySelector("#checkMahjong").addEventListener("change", function() {
            if (document.querySelector("#checkMahjong").checked == true) {
                document.querySelector("div[name='complementsForScore']").className = 'allday';
            } else if (document.querySelector("#checkMahjong").checked == false) {
                var elmts = document.getElementById("mahjongmahjong").querySelectorAll(".allday");
                for (var x=0; x<(elmts.length-1); x++) {
                    elmts[x].className = "none";
                }
                document.querySelector("div[name='complementsForScore']").className = 'none';
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
            }
        });

        document.querySelector("#boxPairDragon").addEventListener("change", function () {
            if (document.querySelector("#boxPairDragon").checked == true) {
                document.querySelector("li[name='pairDragon']").className = 'allday';
            } else if (document.querySelector("#boxPairDragon").checked == false) {
                document.querySelector("li[name='pairDragon']").className = 'none';
                document.getElementById("pairDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedPungMinor").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedPungMinor").checked == true) {
                document.querySelector("li[name='revealedPungMinor']").className = 'allday';
            } else if (document.querySelector("#boxRevealedPungMinor").checked == false) {
                document.querySelector("li[name='revealedPungMinor']").className = 'none';
                document.getElementById("revealedPungMinor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxPungMinor").addEventListener("change", function () {
            if (document.querySelector("#boxPungMinor").checked == true) {
                document.querySelector("li[name='pungMinor']").className = 'allday';
            } else if (document.querySelector("#boxPungMinor").checked == false) {
                document.querySelector("li[name='pungMinor']").className = 'none';
                document.getElementById("pungMinor").selectedIndex = 0;
            }
        });
        document.querySelector("#boxRevealedPungMajor").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedPungMajor").checked == true) {
                document.querySelector("li[name='revealedPungMajor']").className = 'allday';
            } else if (document.querySelector("#boxRevealedPungMajor").checked == false) {
                document.querySelector("li[name='revealedPungMajor']").className = 'none';
                document.getElementById("revealedPungMajor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxPungMajor").addEventListener("change", function () {
            if (document.querySelector("#boxPungMajor").checked == true) {
                document.querySelector("li[name='pungMajor']").className = 'allday';
            } else if (document.querySelector("#boxPungMajor").checked == false) {
                document.querySelector("li[name='pungMajor']").className = 'none';
                document.getElementById("pungMajor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedPungWind").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedPungWind").checked == true) {
                document.querySelector("li[name='revealedPungWind']").className = 'allday';
            } else if (document.querySelector("#boxRevealedPungWind").checked == false) {
                document.querySelector("li[name='revealedPungWind']").className = 'none';
                document.getElementById("revealedPungWind").selectedIndex = 0;
            }
        });

        document.querySelector("#boxPungWind").addEventListener("change", function () {
            if (document.querySelector("#boxPungWind").checked == true) {
                document.querySelector("li[name='pungWind']").className = 'allday';
            } else if (document.querySelector("#boxPungWind").checked == false) {
                document.querySelector("li[name='pungWind']").className = 'none';
                document.getElementById("pungWind").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedPungDragon").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedPungDragon").checked == true) {
                document.querySelector("li[name='revealedPungDragon']").className = 'allday';
            } else if (document.querySelector("#boxRevealedPungDragon").checked == false) {
                document.querySelector("li[name='revealedPungDragon']").className = 'none';
                document.getElementById("revealedPungDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxPungDragon").addEventListener("change", function () {
            if (document.querySelector("#boxPungDragon").checked == true) {
                document.querySelector("li[name='pungDragon']").className = 'allday';
            } else if (document.querySelector("#boxPungDragon").checked == false) {
                document.querySelector("li[name='pungDragon']").className = 'none';
                document.getElementById("pungDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedKongMinor").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedKongMinor").checked == true) {
                document.querySelector("li[name='revealedKongMinor']").className = 'allday';
            } else if (document.querySelector("#boxRevealedKongMinor").checked == false) {
                document.querySelector("li[name='revealedKongMinor']").className = 'none';
                document.getElementById("revealedKongMinor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongMinor").addEventListener("change", function () {
            if (document.querySelector("#boxKongMinor").checked == true) {
                document.querySelector("li[name='kongMinor']").className = 'allday';
            } else if (document.querySelector("#boxKongMinor").checked == false) {
                document.querySelector("li[name='kongMinor']").className = 'none';
                document.getElementById("kongMinor").selectedIndex = 0;
            }
        });
        document.querySelector("#boxRevealedKongMajor").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedKongMajor").checked == true) {
                document.querySelector("li[name='revealedKongMajor']").className = 'allday';
            } else if (document.querySelector("#boxRevealedKongMajor").checked == false) {
                document.querySelector("li[name='revealedKongMajor']").className = 'none';
                document.getElementById("revealedKongMajor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongMajor").addEventListener("change", function () {
            if (document.querySelector("#boxKongMajor").checked == true) {
                document.querySelector("li[name='kongMajor']").className = 'allday';
            } else if (document.querySelector("#boxKongMajor").checked == false) {
                document.querySelector("li[name='kongMajor']").className = 'none';
                document.getElementById("kongMajor").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedKongWind").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedKongWind").checked == true) {
                document.querySelector("li[name='revealedKongWind']").className = 'allday';
            } else if (document.querySelector("#boxRevealedKongWind").checked == false) {
                document.querySelector("li[name='revealedKongWind']").className = 'none';
                document.getElementById("revealedKongWind").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongWind").addEventListener("change", function () {
            if (document.querySelector("#boxKongWind").checked == true) {
                document.querySelector("li[name='kongWind']").className = 'allday';
            } else if (document.querySelector("#boxKongWind").checked == false) {
                document.querySelector("li[name='kongWind']").className = 'none';
                document.getElementById("kongWind").selectedIndex = 0;
            }
        });

        document.querySelector("#boxRevealedKongDragon").addEventListener("change", function () {
            if (document.querySelector("#boxRevealedKongDragon").checked == true) {
                document.querySelector("li[name='revealedKongDragon']").className = 'allday';
            } else if (document.querySelector("#boxRevealedKongDragon").checked == false) {
                document.querySelector("li[name='revealedKongDragon']").className = 'none';
                document.getElementById("revealedKongDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongDragon").addEventListener("change", function () {
            if (document.querySelector("#boxKongDragon").checked == true) {
                document.querySelector("li[name='kongDragon']").className = 'allday';
            } else if (document.querySelector("#boxKongDragon").checked == false) {
                document.querySelector("li[name='kongDragon']").className = 'none';
                document.getElementById("kongDragon").selectedIndex = 0;
            }
        });

        document.querySelector("#boxKongPungDragon").addEventListener("change", function () {
            if (document.querySelector("#boxKongPungDragon").checked == true) {
                document.querySelector("li[name='kongPungDragon']").className = 'allday';
            } else if (document.querySelector("#boxKongPungDragon").checked == false) {
                document.querySelector("li[name='kongPungDragon']").className = 'none';
                document.getElementById("kongPungDragon").selectedIndex = 0;
            }
        });
        /*End of additions by Florie*/

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
            month = "0" + d.getMonth();
        }
        else{
            month = d.getMonth();
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

        document.getElementById("hand").innerHTML = "Hand n° " + value.hand;
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
    }

    function shCalculationGame(input) {
        input_score = input;
        input_player = input_score.name;
        console.log(input_player);

    }

    function resetPage() {/*modified by Florie for new form of july 2015*/
        document.getElementById("flowersSeasons").selectedIndex = 0;
        document.getElementById("flowerOrSeason").checked = false;
        document.getElementById("flowerAndSeason").checked = false;
        document.getElementById("fourFlowersAndOrFourSeasons").checked = false;
        document.getElementById("checkFlowersSeasons").checked = false;
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
        document.getElementById("pairPlayerWind").checked = false;
        document.getElementById("pairDominantWind").checked = false;
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
    }

    function calcul() {//modified by Florie following new rules of calculations, Ids…
//            resetPage(); problème!
//intégrer le cachage des allday en none
            var points = 0;
            var multiplicateur = 0;

            //Flowers&Seasons
            var inputNbFlowers = document.getElementById("flowersSeasons").selectedIndex * 4;
            points = points + inputNbFlowers;
            if (document.getElementById("flowerOrSeason").checked == true) {
                multiplicateur = multiplicateur + document.getElementById("flowerOrSeason").value;
            } else if (document.getElementById("flowerAndSeason").checked == true) {
               multiplicateur = multiplicateur + document.getElementById("flowerAndSeason").value;
            } else if (document.getElementById("fourFlowersAndOrFourSeasons").checked == true) {
                multiplicateur = multiplicateur + document.getElementById("fourFlowersAndOrFourSeasons").value;
            }

            //Mahjong
            var a = parseInt(document.getElementById("mahjong").selectedIndex);
            if (a != 0) {
                points = points + 20;
            }
            var b = parseInt(document.getElementById("reachMahjong").selectedIndex);
            if (b == 1) {
                multiplicateur = multiplicateur + b;
            } else if (b == 2) {
                points = points + 5;
            } else if (b == 3) {
                points = points + 5;
                multiplicateur = multiplicateur + 1;
            }
            var c = parseInt(document.getElementById("typeMahjong").selectedIndex);
            if (c == 1) {
                if (document.getElementById("noChow").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#noChow").value;
                }
                if (document.getElementById("fourChows").checked == true) {
                    points = points + document.getElementById("#fourChows").value;
                }
                if (document.getElementById("wok").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#fourChows").value;
                }
                if (document.getElementById("pureHand").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#fourChows").value;
                }
                if (document.getElementById("yinYang").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#yinYang").value;
                }
                if (document.getElementById("hulk").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#hulk").value;
                }
                if (document.getElementById("hidden").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#hidden").value;
                }
                if (document.getElementById("honorable").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#honorable").value;
                }
                if (document.getElementById("kingKong").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#kingKong").value;
                }
            } else if (c == 2) {
                multiplicateur = multiplicateur + 3;
                if (document.getElementById("wok").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#fourChows").value;
                }
                if (document.getElementById("pureHand").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#fourChows").value;
                }
                if (document.getElementById("yinYang").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#yinYang").value;
                }
                if (document.getElementById("hulk").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#hulk").value;
                }
                if (document.getElementById("honorable").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#honorable").value;
                }
            } else if (c == 3) {
                multiplicateur = multiplicateur + 5;
                if (document.getElementById("nineArks").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#nineArks").value;
                }
            } else if (c == 4) {
                multiplicateur = multiplicateur + 4;
                if (document.getElementById("worthy").checked == true) {
                    points = points + document.getElementById("#worthy").value;
                }
            } else if (c == 5) {
                multiplicateur = multiplicateur + 1;
                if (document.getElementById("noChow").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#noChow").value;
                }
                if (document.getElementById("pureHand").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#fourChows").value;
                }
                if (document.getElementById("hidden").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#hidden").value;
                }
                if (document.getElementById("honorable").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#honorable").value;
                }
                if (document.getElementById("kingKong").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#kingKong").value;
                }
            } else if (c == 6) {
                multiplicateur = multiplicateur + 2;
                if (document.getElementById("pureHand").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#fourChows").value;
                }
                if (document.getElementById("hidden").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#hidden").value;
                }
                if (document.getElementById("honorable").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#honorable").value;
                }
                if (document.getElementById("kingKong").checked == true) {
                    multiplicateur = multiplicateur + document.getElementById("#kingKong").value;
                }
            }

            //Complements

                resultat = points * Math.pow(2,multiplicateur);

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

