var players_num = null;
while (true) {
    players_num = prompt("Enter Number Of Players");
    if (!(players_num==1||players_num==2||players_num==3||players_num==4)) {
        alert("Number of Players Should be less than 5 or valid value");
    }
    else if (players_num.trim() == "") {
        continue;
    }
    else {
        document.getElementsByClassName("box")[0].classList.remove("none");
        break;
    }
}
// for the leaderboards
var wins = 0, end = false, total = players_num;
//defining player's data
function player(number, tile, won, has_start, img) {
    this.number = number;
    this.tile = 0;
    this.has_start = false;
    this.won = false;
    this.img = img;
}
//for showing the leaderboard for different players
if (players_num > 1) {
    for (var i = 1; i < players_num; i++) {
        var str = "w" + i.toString();
        document.getElementsByClassName(str)[0].classList.remove("none");
    }
}
if (players_num == 1) {
    document.getElementsByClassName("w1")[0].classList.remove('none');
    document.getElementsByClassName("lose")[0].classList.add('none');
}
//creating array of players
var players = []
for (var i = 0; i < players_num; i++) {
    var str = "player" + (i + 1).toString();
    var img = document.getElementById(str);
    var str1 = "fig" + (i + 1).toString();
    img.classList.remove("none");
    document.getElementById(str1).classList.remove("none")
    players[i] = new player(i + 1, 0, false, false, img);
}
const c = document.getElementById("myCanvas");
var ctx = c.getContext('2d');
c.height = 600;
c.width = 600;

function tile(number, x, y) {
    this.x = x;
    this.number = number;
    this.y = y;
}
var create = function () {
    ctx.fillStyle = "rgb(252, 64, 64)";
    if (count % 2 == 0) {
        ctx.fillStyle = "rgb(190, 190, 255)";
    }
    ctx.fillRect(x, y, 60, 60);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = "20px Arial";
    ctx.fillText(count + 1, x + 10, y + 30);
}
var tiles = []
var count = 0, i = 0;
for (y = 540; y >= 0; y -= 60) {
    if (i % 2 == 0) {
        for (x = 0; x <= 540; x += 60) {
            tiles[count + 1] = new tile(count + 1, x, y)
            create();
            count++;
        }
    }
    else {
        for (x = 540; x >= 0; x -= 60) {
            tiles[count + 1] = new tile(count + 1, x, y)
            create();
            count++;
        }
    }
    i += 1;
}
function roll() {
    var val = Math.floor(Math.random() * 6) + 1;
    str = "Images/Dice" + val.toString() + ".png";
    document.getElementById("dice").style.transition = "all .5s";
    document.getElementById("dice").src = str;
    return val;
}
function next() {
    play_num++;
    if (play_num >= players.length) {
        play_num = 0;
    }
    if (players[play_num].won == true) {
        next();
    }
}
function turn(play_num) {
    t = play_num;
    t++;
    if (t >= players.length) { t = 0; }
    if (players[t].won == true) { turn(t); }
    document.getElementById("turnof").innerText = t;
}

var play_num = 0, t = 1;
document.getElementById("turnof").innerText = 1;
function play() {
    var n = players[play_num];
    turn(play_num);
    document.getElementById("turnof").innerText = players[t].number;
    var dice = roll();
    if (n.has_start == false) {
        if (dice == 1) {
            if (n.tile + dice <= 100) {
                n.tile += dice;
            }
            n.img.style.position = 'absolute';
            n.img.style.transition = 'all 1s';
            n.img.style.top = tiles[n.tile].y + 'px';
            n.img.style.left = tiles[n.tile].x + 'px';
            n.has_start = true;
        }
    }

    if (n.has_start && !n.won) {
        if (n.tile + dice <= 100) {
            n.tile += dice;
        }
        switch (n.tile) {
            case 31: n.tile = 8; break;
            case 18: n.tile = 42; break;
            case 34: n.tile = 53; break;
            case 66: n.tile = 85; break;
            case 99: n.tile = 27; break;
            case 92: n.tile = 54; break;
        }
        n.img.style.position = 'absolute';
        n.img.style.top = tiles[n.tile].y + 'px';
        n.img.style.left = tiles[n.tile].x + 'px';
        if (n.tile == 100) {
            n.won = true;
            alert("Player " + n.number + " has Won!");
            wins++;
            if (wins == 1) {
                document.getElementById('win1').innerText = "Player " + n.number;
            }
            else if (wins == 2) {
                document.getElementById('win2').innerText = "Player " + n.number;
            }
            else if (wins == 3) {
                document.getElementById('win3').innerText = "Player " + n.number;
            }
            if (total - wins === 1 || total - wins === 0) {
                if (total > 1) {
                    next();
                    document.getElementById("lost").innerText = "Player " + players[play_num].number;
                }
                document.getElementById("buttn").disabled = true;
                end = true;
            }
        }
    }
    if (end == false) {
        next();
    }
}
