const loader=document.querySelector(".animate"),
progress_bar=document.querySelector("#load_bar"),
container= document.querySelector(".container"),
songimg = container.querySelector(".imgarea img"),
detail_song=container.querySelector(".detail_song"),
songname = detail_song.querySelector(".name"),
songartist = detail_song.querySelector(".artist"),
currsong=container.querySelector("#curr_song"),
playbttn=container.querySelector(".play-pause"),
changearrow=playbttn.querySelector("#play_pause"),
controls=container.querySelector(".controls"),
prev=controls.querySelector("#prev"),
next=controls.querySelector("#next"),
progarea=container.querySelector(".progress_area"),
progressbar=progarea.querySelector(".progress_bar"),
timestamp=progarea.querySelector(".timer"),
currtime=timestamp.querySelector(".current"),
endtime=timestamp.querySelector(".end"),
music_store=container.querySelector(".music_store"),
ultag=music_store.querySelector("ul"),
header=music_store.querySelector(".header"),
backfo=music_store.querySelector(".backfo"),
cross=header.querySelector("#close"),
roww=header.querySelector(".row"),
searching=roww.querySelector(".search input"),
upbar=container.querySelector(".upbar"),
particle=container.querySelector("#particles-js canvas"),
expand=upbar.querySelector("#expand");
console.log(particle)
// !!!!!!!!!!!!!!!!!!!!!!!
let filtered_order=songplaylist
let songindex = Math.floor(Math.random()*(songplaylist.length));
let present_class=filterddata[songindex]
filterddata(filtered_order);
let cout=0


window.addEventListener("load",()=>{
    loadmusic(songindex)
    currentplay()
});

function loadmusic(index){
    console.log(index);
    songname.innerText = filtered_order[index].name;
    songartist.innerText = filtered_order[index].artist;
    songimg.src=`./image/${filtered_order[index].img}.jpeg`
    currsong.src=`./playlist/${filtered_order[index].src}.mp3`
};
// if(songartist.innerText.length>=15){
//     console.log("hello")
//     songartist.setAttribute("id","writer")
// }
if(songartist.innerText.length>=15){
    console.log("hyyy")
    songartist.setAttribute("id","writer")}
 function playsong(){
     container.classList.add("paused");
     changearrow.innerText="pause";
     particle.style.display="block"
     if(songartist.innerText.length>=15){
        console.log("hyyy")
        songartist.setAttribute("id","writer")}
     else{
        songartist.removeAttribute("id","writer")}
     currsong.play()
     present_class=songname.innerText;    
     currentplay();

 }
 function pausesong(){
    container.classList.remove("paused");
    changearrow.innerText="play_arrow";
    particle.style.display="none"
    if(songartist.innerText.length<15){
        console.log("jjjjjjjjjjj")
        songartist.removeAttribute("id","writer")
    }
    currsong.pause();
}

// play pause click and key!!!!!
playbttn.addEventListener("click",()=>{
    const songsound = container.classList.contains("paused");
    songsound ? pausesong() : playsong();
});
e=getComputedStyle(music_store)
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        const songsound = container.classList.contains("paused");
        songsound ? pausesong() : playsong();
    }
}


// change song using clicks and key!!!!!!
function next_song(){
    
    songindex+=1;
    currentplay();
    if(count2==1){
        songindex=Math.floor(Math.random()*(songplaylist.length));
        loadmusic(songindex)
        playsong()
    }
    else if(songindex!=songplaylist.length){
        loadmusic(songindex);
    playsong();
    }
    else{
        songindex=Math.floor(Math.random()*(songplaylist.length));
        loadmusic(songindex)
        playsong()
}
};

function prev_song(){
    songindex-=1
    if(songindex!=-1){
    loadmusic(songindex)
    playsong()
    }
    else{
        songindex=Math.floor(Math.random()*(songplaylist.length))
        loadmusic(songindex)
        playsong()

    }
};
window.addEventListener('keydown', function(event) {
    // console.log(event);
    if(event.key=="ArrowRight"){
        pausesong()
        setTimeout(myFunction, 1500);
     function myFunction() {
         
        next_song();
      }
    } // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if(event.key=="ArrowLeft"){
        pausesong()
        setTimeout(myFunction, 1500);
        function myFunction() {
        prev_song();
      }
    } 
    if(event.key=="/"){
        // console.log("hello")
        searching.focus()
        music_store.style.bottom="7%";
        expand.innerText="expand_more";
        
        cout+=1;
    }

});
next.addEventListener("click",()=>{
    pausesong()
    setTimeout(myFunction, 1000);
     function myFunction() {
        
        next_song();
      }
});
prev.addEventListener("click",()=>{
    pausesong()
    setTimeout(myFunction, 1000);
    function myFunction() {
    prev_song();
      }
});
let count1=0,count2=0;
currsong.addEventListener("timeupdate",(e)=>{
    const currdur=e.target.currentTime,
        duration=e.target.duration;
        const endduration=(currdur/duration)*100
        progressbar.style.width=`${endduration}%`
        currsong.addEventListener("loadeddata",()=>{
            total_duration=currsong.duration
            let total_min=Math.floor(total_duration/60),
                total_sec=Math.floor(total_duration%60);
            if(total_sec<10)
            {
                total_sec=`0${total_sec}`
            }    
            endtime.innerText=`${total_min}:${total_sec}`;
            
        });
        let currmin=Math.floor(currdur/60),
            currsec=Math.floor(currdur%60);
            if(currsec<10){
                currsec=`0${currsec}`
            }
            currtime.innerText=`${currmin}:${currsec}`
        
        //   console.log(currdur,duration);
});

progarea.addEventListener("click",(e)=>{
    let totalwidth=progarea.clientWidth;
    let currwidth=e.offsetX;
    let totwidth = currsong.duration;
    currsong.currentTime=(currwidth/totalwidth)*(totwidth)
    // console.log(totalwidth,e.offsetX)
    
});
searching.addEventListener("keyup",()=>{
    input_value=searching.value;
    filterdata=search_data(input_value,songplaylist)
    filtered_order=filterdata; 
    filterddata(filterdata);
    currentplay()
    //!!!!!
 });
 function search_data(value,data){
     let filterdata=[];
     let kk=0
     for(kk=0;kk<data.length;kk++){
         let valuee = value.toLowerCase()
         let singer=data[kk].name.toLowerCase();
        console.log(singer[0]);
         if(String(singer).includes(valuee)){
            //  console.log(value,data[kk]);
             filterdata.push(data[kk]);
         }
     }
     return filterdata;
 }

function filterddata(filterdata){
    ultag.innerHTML=""
for(let i=0;i<filterdata.length;i++){
    let li_atrr=`<li li-index="${i}" onclick="clicked(this)">
                    <span class="img_size"><img src="./image/${filterdata[i].img}.jpeg"></img><span>
                       
                    <div class="row">
                        <span>${filterdata[i].name}</span>
                        <p>&nbsp&nbsp${filterdata[i].artist}</p>

                    </div>
                    
                    <!--<span class="song_duration">4:00</span>-->
                </li>`;
    ultag.insertAdjacentHTML("beforeend",li_atrr);            
    
 
}};
let litags=ultag.querySelectorAll("li");
function currentplay() {
    litags=ultag.querySelectorAll("li");
for(k=0;k<litags.length;k++){
    if(litags[k].classList.contains("currentplaying")){
        litags[k].classList.remove("currentplaying")       
    }  
    
    // console.log(litags[k].querySelector(".row span").innerText,present_class)
    // if(songindex==k){
        if(litags[k].querySelector(".row span").innerText==present_class){
        litags[k].classList.add("currentplaying")       
    }    
    litags[k].setAttribute("onclick","clicked(this)");
}
}
function clicked(attr){
    let liindex = attr.getAttribute("li-index");
    singer_name=attr.querySelector(".row span")
    present_class=singer_name.innerText;
    songindex=parseInt(liindex);
    currentplay();
    loadmusic(songindex);
    pausesong()
    setTimeout(myFunction, 2000);
    function myFunction() {
        playsong()
      }
}
// songplaylist
// REPEAT the song!!

repeatt=controls.querySelector("#repeat");
add_r=controls.querySelector("#poss");
repeatt.addEventListener("click",()=>{
    if(count1==0){
    repeatt.classList.add("repeat_song");
    count1+=1;
    }
    else{
    repeatt.classList.remove("repeat_song");
    count1-=1;
    }
});

shuffle=controls.querySelector("#shuffle");
shuffle.addEventListener("click",()=>{
    if(count2==0){
    shuffle.classList.add("shuffle_song");
    count2+=1;
    }
    else{
    shuffle.classList.remove("shuffle_song");
    count2-=1;
    }
});

currsong.addEventListener("ended",(e)=>{
    if(e.target.currentTime==e.target.duration){
        if(count1==0){
            setTimeout(myFunction, 2000);
            function myFunction() {
                next_song();
            }
        }
        else{
            setTimeout(myFunction, 2000);
            function myFunction() {
                
                currsong.currentTime=0;
                playsong();
            }
    }
}
});



expand.addEventListener("click",()=>{
    // console.log(music_store.style.left)
    if(cout==0){
    music_store.style.bottom="7%";
    expand.innerText="expand_more";
    cout+=1;

}
    else{
        music_store.style.bottom="97%";
        expand.innerText="expand_less";
        cout-=1
    }
});

flag=0
if(flag==0){
window.addEventListener("load",()=>{
    var i = 0;
        var txt = 'PlayX';
    logo();
    function logo() {
        
    if (i < txt.length) {
        loader.innerHTML += '<u>'+txt.charAt(i)+'</u>';
        i++;
        setTimeout(logo,250);
    }
    }
    
    loader.style.backgroundImage="linear-gradient(45deg,#505050,100%,var(--white))";

    var i = 0;
    move();
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.querySelector("#bar");
    var width = 10;
    var id = setInterval(frame,20);
    function frame() {
      if (width>=100){
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        
        
      }
    }
  }
}
    setTimeout(myFunction, 2500);
            function myFunction() {
                loader.parentElement.removeChild(loader);
                progress_bar.parentElement.removeChild(progress_bar);
                container.style.opacity="1";
            } flag=1   
    
    
})}