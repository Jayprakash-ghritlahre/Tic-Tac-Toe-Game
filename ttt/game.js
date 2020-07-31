//grabing html element
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs= document.querySelectorAll('.game-cell')


//game variable
let gameIsLive = true;
let xIsNext = true;
let winner = null;


//functions
const handleWin = (winner)=>{
    gameIsLive = false
    // winner=letter
    if(winner==='X'){
        statusDiv.innerHTML=`<span style="color:purple">${winner} has won!`
    }else{
        statusDiv.innerHTML = `<span style="color:maroon"> ${winner} has won! </span>`;
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];
    // console.log(topLeft,topMiddle,topRight,middleLeft,middleMiddle,middleRight,bottomLeft,bottomMiddle,bottomRight)

    //check winner
    // 3 horizontal line
    if(topLeft && topLeft==topMiddle && topLeft==topRight){
        gameIsLive = false;
        winner = topLeft;
        // console.log(winner);
        // gives a winner color default black for both to change
        //statusDiv.innerHTML = `${topLeft} has won!`
        if(topLeft==='X'){
            statusDiv.innerHTML=`${topLeft} has won!`
        }else{
            statusDiv.innerHTML = `<span> ${topLeft} has won! </span>`;
        }
        //to make winning boxes different
        cellDivs[0].classList.add('won')
        cellDivs[1].classList.add('won')
        cellDivs[2].classList.add('won')
    }else if (middleLeft && middleLeft==middleMiddle && middleLeft==middleRight){
        handleWin(middleLeft);
        cellDivs[3].classList.add('won')
        cellDivs[4].classList.add('won')
        cellDivs[5].classList.add('won')
        //copy whole thing from above and needs to be repeated 8 times better way make function
    }else if (bottomLeft && bottomLeft==bottomMiddle && bottomLeft==bottomRight){
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won')
        cellDivs[7].classList.add('won')
        cellDivs[8].classList.add('won')
    }//3 vertical winning possible
    else if (topLeft && topLeft==middleLeft && topLeft==bottomLeft){
        handleWin(topLeft);
        cellDivs[0].classList.add('won')
        cellDivs[3].classList.add('won')
        cellDivs[6].classList.add('won')
    }else if (topMiddle && topMiddle==middleMiddle && topMiddle==bottomMiddle){
        handleWin(topMiddle);
        cellDivs[1].classList.add('won')
        cellDivs[4].classList.add('won')
        cellDivs[7].classList.add('won')
    }else if (topRight && topRight==middleRight && topRight==bottomRight){
        handleWin(topRight);
        cellDivs[2].classList.add('won')
        cellDivs[5].classList.add('won')
        cellDivs[8].classList.add('won')
    }//Diagonals 
    else if (topLeft && topLeft==middleMiddle && topLeft==bottomRight){handleWin(topLeft);
        cellDivs[0].classList.add('won')
        cellDivs[4].classList.add('won')
        cellDivs[8].classList.add('won')
    }else if (topRight && topRight==middleMiddle && topRight==bottomLeft){handleWin(topRight);
        cellDivs[2].classList.add('won')
        cellDivs[4].classList.add('won')
        cellDivs[6].classList.add('won')
    }//codn for tie game
    else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight ){
        gameIsLive = false
        statusDiv.innerHTML=`<span style="color:red"> Game has tied!</span>`
    }//when all cells are not filled
    else{
        xIsNext = !xIsNext;
        if(xIsNext){
            statusDiv.innerHTML="X is next";
        }else {statusDiv.innerHTML=`<span> O is next </span>`}
    }
}


//event handlers or functions
const handleReset = () =>{
    // console.log(e)
    xIsNext = true;
    statusDiv.innerHTML = `x is next`;
    winner= null;
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('X');
        cellDiv.classList.remove('O');
        cellDiv.classList.remove('won');
    }
    gameIsLive=true;    
};

const handleCellClick = (e) =>{
    // console.log(e)
    // console.log(e.target.classList);
    const location = e.target.classList[1];
    //console.log("location",location)

    const classList=e.target.classList;// we can replace all e.target.classList to just classList

    // check if already X and O present in classlist
    if (!gameIsLive ||classList[2]=='X' || classList[2]=='O'){
        return;
        //index 2 is known by seeing classlist
    }

    // add X and O in classlist
    if(xIsNext===true){
        //console.log(e.target)
        e.target.classList.add('X');
        checkGameStatus();
        // xIsNext= !xIsNext
    }else{
        e.target.classList.add('O');
        checkGameStatus();
        // xIsNext = !xIsNext erase this bcz its manually and put in function checkgamestatus
 
        // to see this is working or not inspect each elements in grid
        // problem with this is it can take both x and o to solve this see above loop
    }
}


//event listeners
resetDiv.addEventListener('click', handleReset)

for (const i of cellDivs){
    // see the difference between (i of cellDivs) and (i in cellDivs)
    //console.log(i);
    i.addEventListener('click',handleCellClick)
}

