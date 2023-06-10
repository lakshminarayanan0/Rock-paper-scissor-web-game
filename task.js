///Entire game



const game=()=>{
    let pScore=localStorage.getItem('playerScore') || 0;
    let cScore=localStorage.getItem('computerScore') || 0;
    playerScore=document.querySelector('#playerScore p').textContent=pScore;
    computerScore=document.querySelector('#computerScore p').textContent=cScore;
    const clicksound=document.querySelector('#click');
    const winsound=document.querySelector('#win');
    const losesound=document.querySelector('#lose');
    const impactsound=document.querySelector('#impact');

///Audio section which is the function to repeat the audio for every existence occur
//when clicking buttons


    const resetAudio = (audioElement) => {
        audioElement.pause();
        audioElement.currentTime = 0;
      };
    
      winsound.addEventListener('ended', () => {
        resetAudio(winsound);
      });
    
      losesound.addEventListener('ended', () => {
        resetAudio(losesound);
      });
    
      impactsound.addEventListener('ended', () => {
        resetAudio(impactsound);
      });


///start function to make transition between gamescreen and playarea


    const start=()=>{
        let playbtn=document.querySelector('.gameScreen button');
        let gameScreen=document.querySelector('.gameScreen');
        let playArea=document.querySelector('.playArea');
        let newgame=document.querySelector('#newgame');
        let exit=document.querySelector('#exit');
        playbtn.addEventListener('click',()=>{
            clicksound.play();
            gameScreen.classList.add('fadeout');
            playArea.classList.add('fadein');
            
        
        });
        exit.addEventListener('click',()=>{
            clicksound.play();
            gameScreen.classList.remove('fadeout');
            playArea.classList.remove('fadein');
            
        
        });
        newgame.addEventListener('click',()=>{
           
            clicksound.play();
            gameScreen.classList.add('fadeout');
            playArea.classList.add('fadein');

            localStorage.setItem('playerScore',0);
            localStorage.setItem('computerScore',0);
            winner.textContent='choose any option';
            document.querySelector('#playerScore p').innerHTML=0;
            document.querySelector('#computerScore p').innerHTML=0;
            document.querySelector('#winner');
            
            
            
        });
        
    };

    ///here is the main code to functioning the tasks to make a game great

 let play=()=>{
    let options=document.querySelectorAll('#options button');
    let hands=document.querySelectorAll('#hands img')
    let playerHand=document.querySelector('#playerHand');
    let computerHand=document.querySelector('#computerHand');
   let winner=document.querySelector('#winner');

///when the player choose any of three options,it induces computer to make its own option 
///by the below function

    computerOptions=['rock','paper','scissor'];
     options.forEach(option=>{
        option.addEventListener('click',()=>{
            clicksound.play();
            computerNumber=Math.floor(Math.random()*3);
            computerChoice=computerOptions[computerNumber];
            // console.log(computerChoice);

 ///it is the animation section for winner tag and image tags which is coonected through keyframes
 ///of CSS           
    
    let time=()=>{
        compareHands(option.textContent,computerChoice);
        playerHand.src=`/rock-paper-scissor/${option.textContent}.png`;
        console.log(option.textContent);
        computerHand.src=`/rock-paper-scissor/${computerChoice}.png`;
        playerHand.style.animation='shakePlayer 1s ease';
        computerHand.style.animation='shakeComputer 1s ease';
       
    };


    ///the time function is fed into setTimeout function with .5s instruction to how
    ///long the function displays the animation

    setTimeout(time,500);
    setTimeout(()=>{ winner.style.animation='shakeResult 1s ease';},700)

        });
    });

   ///this section of function is to end the animation after .5s to make another turn to play


    hands.forEach(hand=>{
        hand.addEventListener('animationend',function(){
        this.style.animation='';
    });
    winner.addEventListener('animationend',function(){
        this.style.animation='';
    });
});


///restart button to take back to its begining stage of game where scores are 0

 restart=document.querySelector('#restart');
 restart.addEventListener('click',()=>{
    clicksound.play();
    pScore=0;
    document.querySelector('#playerScore p').innerHTML=pScore;
    cScore=0;
    document.querySelector('#computerScore p').innerHTML=cScore;
    winner.textContent='choose any option';
    localStorage.setItem('playerScore',0);
    localStorage.setItem('computerScore',0);
 });
};

///update score funtion is created to updated score to pScore and cScore


    updateScore=()=>{
        playerScore=document.querySelector('#playerScore p');
        computerScore=document.querySelector('#computerScore p');
        playerScore.textContent=pScore;
        computerScore.textContent=cScore;
        saveScore();
       
    }

///compareHandss is the main function which decides to winner and loser of the game

    let compareHands=(playerChoice,computerChoice)=>{
       winner=document.querySelector('#winner');

///in case of match is tied
       if(playerChoice===computerChoice){
        winner.textContent='Oops! Match tied.';
        impactsound.play();
        return;
       
///in case of player choice is rock    
    }
    if(playerChoice==='rock'){
     if(computerChoice==='scissor'){
        winner.textContent='Hurray! You won';
        winsound.play();
        pScore++;
        updateScore();
        return;
     }
     else{
        winner.textContent='Oops! You lose';
        losesound.play();
        cScore++;
        updateScore();
        return;
     }
///in case of player choice is paper
    }
    if(playerChoice==='paper'){
        if(computerChoice==='rock'){
           winner.textContent='Hurray! You won';
           winsound.play();
           pScore++;
           updateScore();
           return;
        }
        else{
           winner.textContent='Oops! You lose';
           losesound.play();
           cScore++;
           updateScore();
           return;
        }
       }
 ///in case of player choice is scissor
       if(playerChoice==='scissor'){
        if(computerChoice==='paper'){
           winner.textContent='Hurray! You won';
           winsound.play();
           pScore++;
           updateScore();
           return;
        }
        else{
           winner.textContent='Oops! You lose';
           losesound.play();
           cScore++;
           updateScore();
           return;
        };
       };

    };
    
 ///save score is the function created to save the score in localstorage which cant be erased 
 ///even after window rsfresh  
function saveScore(){
    localStorage.setItem("playerScore",pScore.toString());
    localStorage.setItem("computerScore",cScore.toString());
}

///if the scores are not stored in local storage then this condition is to store it


if(localStorage.getItem("playerScore")||localStorage.getItem("computerScore"))

{
saveScore();
}
else{
    localStorage.setItem("playerScore",pScore.toString());
    localStorage.setItem("computerScore",cScore.toString());
}
   






    start();
    play();
}
game();


 