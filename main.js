//blah.addEventListener is your best friend
var currentSymbol = "x";
var td_items;
var x_moves = [];
var o_moves = [];
var gg = false;

var checkWin = function(){
	win_cons = [["1x1", "1x2", "1x3"], 
				["2x1", "2x2", "2x3"],
				["3x1", "3x2", "3x3"],
				["1x1", "2x1", "3x1"],
				["1x2", "2x2", "3x2"],
				["1x3", "2x3", "3x3"],
				["1x1", "2x2", "3x3"],
				["3x1", "2x2", "1x3"]
				];
	for (i = 0; i < win_cons.length; i++){
		var pos_x = win_cons[i].diff(x_moves);
		var pos_o = win_cons[i].diff(o_moves);
		if (pos_x.length >= 3){
			alert("Player 1 wins!");
			gg = true;
			return null;
		}
		else if (pos_o.length >= 3){
			alert("Player 2 wins!");
			gg = true;
			return null;
		}
	}
	console.log(x_moves);
	console.log(o_moves);
};

Array.prototype.diff = function(arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf( this[i] ) > -1){
            ret.push( this[i] );
        }
    }
    return ret;
};

var setNextSymbol=function(){
	if (currentSymbol == "x"){
		currentSymbol = "o";
		document.querySelector("#plnum").innerHTML = "2";
	}
	else{
		currentSymbol = "x";
		document.querySelector("#plnum").innerHTML = "1";
	}
};

var setSymbol= function( event ){
	if (gg == true){
		return null;
	}
	else if (this.innerHTML != "" || this.innerHTML == null){
		alert("You must choose a different spot.");
	}
	else{
		this.innerHTML = currentSymbol;
		if(currentSymbol == "x"){
			x_moves.push(this.id);
		}
		else{
			o_moves.push(this.id);
		}
		checkWin();	
		setNextSymbol();
	}
};

var resetButtonHandler = function(){
	for (var i = td_items.length - 1; i >=0; i--){
		td_items[i].innerHTML ="";
	}
	x_moves = [];
	o_moves = [];
	gg = false;
	currentSymbol = "x";
	document.querySelector("#plnum").innerHTML = "1";
};

var initialize = function(){
	td_items = document.querySelectorAll("td");
	document.querySelector("#reset").addEventListener("click", resetButtonHandler);
	for (var i = td_items.length - 1; i >=0; i--){
		td_items[i].addEventListener("click", setSymbol);
	}
};

window.onload = initialize;