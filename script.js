'use strict'
var textTimerStopped ,Zskip,minWid;
var sprite = document.querySelector('#sprite');
var text = document.querySelector('#text');
var text1 = document.querySelector('#text2');
var text2 = document.querySelector('#text3');
var textBox = document.querySelector('#text-box');
var dialogueBox = document.querySelector('#dialogue-box');
var star = document.querySelector('#star');

const toText = (font,sound)=>(string,picture,speed)=>{
  minWid = (font == '\"Undertale Papyrus\"')? 0 : 25;
  let i = 0;
  let waw = new Audio(sound);
  sprite.style.backgroundImage = `url(\'${picture}\')`;
  dialogueBox.style.fontFamily = font;
  text.style.left = '30px';
  star.style.display = 'inline'
  Zskip = false

  if(picture == false){
    star.style.left = '-110px';
    textBox.style.left = '20px';
    textBox.style.width = '655px';
    if(font == '\"Determination Mono\"') {
      star.style.top = '-87px'
      star.style.left = '-118px'
    }else{
      star.style.top = '-80px'
      star.style.left = '-110px'
    }
  }else{
    textBox.style.left = '150px';
    textBox.style.width = '520px';
    if(font == '\"Determination Mono\"') {
      star.style.top = '-87px'
      star.style.left = '10px'
    }else{
      star.style.top = '-80px'
      star.style.left = '18px'
    }
  }
  let textTimer = setInterval(function(){
    textTimerStopped = false;
    if(text.offsetWidth < textBox.offsetWidth - minWid){
      text.innerHTML += string[i];
      if(string[i]!=' '){   
        waw.pause();
        waw.currentTime = 0;
        waw.play()  ;
      }
    } else if(text1.offsetWidth < textBox.offsetWidth){
      text1.innerHTML += string[i];
      if(string[i]!=' '){   
        waw.pause();
        waw.currentTime = 0;
        waw.play(); 
      }
    } else{
      text2.innerHTML += string[i]
      if(string[i]!=' '){   
        waw.pause();
        waw.currentTime = 0;
        waw.play();  
      }
    }
    i++;
    if(i>=string.length){
      textTimerStopped = true;
      clearInterval(textTimer);  
    }
    if(font == '\"Undertale Papyrus\"'){
      text.style.left = '0px';
      text.innerHTML = text.innerHTML.toUpperCase();
      text1.innerHTML = text1.innerHTML.toUpperCase(); 
      text2.innerHTML = text2.innerHTML.toUpperCase();
      star.style.display = 'none';
      textBox.style.left = '180px;'
      textBox.style.top = '-120px';
    }
    if(Zskip) {
      clearInterval(textTimer);
      textTimerStopped = true;
      while(i<string.length){
        if(text.offsetWidth < textBox.offsetWidth - minWid){
        text.innerHTML += string[i];
        } else if(text1.offsetWidth < textBox.offsetWidth){
          text1.innerHTML += string[i];
        } else{
          text2.innerHTML += string[i];           
        }
        i++;
        if(font == '\"Undertale Papyrus\"'){
          text.style.left = '0px';
          text.innerHTML = text.innerHTML.toUpperCase(); 
          text1.innerHTML = text1.innerHTML.toUpperCase(); 
          text2.innerHTML = text2.innerHTML.toUpperCase(); 
          star.style.display = 'none';
          textBox.style.left = '180px;'
          textBox.style.top = '-120px';
        }
      }
     Zskip = false;
    }
  },speed);
}

const papyrusText = toText('\"Undertale Papyrus\"','sounds/voice_papyrus.wav');
const monsterText = toText('\"Determination Mono\"','sounds/voice_monster.mp3');
const sansText = toText('\"Undertale Sans\"','sounds/voice_sans.mp3');
const undyneText = toText('\"Determination Mono\"','sounds/voice_undyne.mp3');

const dialogues = [
  function(){monsterText('(Ring, ring...)',false,60)},
  function(){sansText('heya. is anyone there?','sprites/sans_black_eyes.png',60)},
  function(){papyrusText('Nyehhehehehe h',false,60)},
  function(){undyneText('Liste here you little punk','sprites/sans_black_eyes.png',60)},
  function(){monsterText('(Click...)',false,60)}
];

document.querySelector('button').addEventListener('click',function(){
  let index = 0;
  dialogues[0]();
  document.querySelector('#start').style.display = 'none';
  document.querySelector('#dialogue').style.display = 'block';
  document.addEventListener('keydown',function(){
    if(event.code === 'KeyZ'){
     Zskip = true;
    }
    if(event.code === 'KeyX' && textTimerStopped){
      text.innerHTML = '';
      text1.innerHTML = ''; 
      text2.innerHTML = '';
      if(index < dialogues.length) {
        index++;
        dialogues[index]()
      }else{
        dialogueBox.style.display = 'none'
      }
    }
  })
});