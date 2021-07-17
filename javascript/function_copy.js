const container= document.querySelector(".container"),
songimg = container.querySelector(".imgarea img"),
songname = container.querySelector(".detail_song .name"),
songartist = container.querySelector(".detail_song .artist"),
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
roww=header.querySelector(".row"),
searching=roww.querySelector(".search input");


console.log(ultag);




// window.addEventListener("keypress",function(event){
//     // console.log(e);
//     if(event.key==32){
//         // console.log(e);
//     const songsound = container.classList.contains("paused");
//     songsound ? pausesong() : playsong();
//     }
       
// });

// window.addEventListener("keypress",(e)=>{
//     console.log("Hello");

//     if(e.keyCode==39){
//         console.log("Hello");
//     } 
// });

// protocol to play and pause songs and laod music!!!!
let songindex = Math.floor(Math.random()*(songplaylist.length));

window.addEventListener("load",()=>{
    loadmusic(songindex)
    currentplay()
});

function loadmusic(index){
    console.log(index);
    songname.innerText = songplaylist[index].name;
    songartist.innerText = songplaylist[index].artist;
    songimg.src=`./image/${songplaylist[index].img}.jpeg`
    currsong.src=`./playlist/${songplaylist[index].src}.mp3`
};

 function playsong(){
     container.classList.add("paused");
     changearrow.innerText="pause";
    //  setTimeout(myFunction, 1000);
    //  function myFunction() {
    //     currsong.play()
    //   }
      currsong.play()     

 }
 function pausesong(){
    container.classList.remove("paused");
    changearrow.innerText="play_arrow";

    currsong.pause();
}

// play pause click and key!!!!!
playbttn.addEventListener("click",()=>{
    const songsound = container.classList.contains("paused");
    songsound ? pausesong() : playsong();
});
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        //your code
        const songsound = container.classList.contains("paused");
        songsound ? pausesong() : playsong();
    }
}


// change song using clicks and key!!!!!!
function next_song(){
    
    songindex+=1;
    if(songindex!=songplaylist.length){
        loadmusic(songindex);
    playsong();
    }
    else{
        songindex=Math.floor(Math.random()*(songplaylist.length))
        // console.log(songindex);
        // console.log(songindex);
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
        // console.log(songindex);
        loadmusic(songindex)
        playsong()

    }
};
window.addEventListener('keydown', function(event) {
    if(event.key=="ArrowRight"){
        pausesong()
        setTimeout(myFunction, 1500);
     function myFunction() {
         
        next_song();
      } // next_song();
    } // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if(event.key=="ArrowLeft"){
        pausesong()
        setTimeout(myFunction, 1500);
        function myFunction() {
        prev_song();
      }
        // prev_song();
    } 
});
next.addEventListener("click",()=>{
    pausesong()
    setTimeout(myFunction, 1000);
     function myFunction() {
        next_song();
      }
    // next_song();
});
prev.addEventListener("click",()=>{
    pausesong()
    setTimeout(myFunction, 1000);
    function myFunction() {
    prev_song();
      }
    // prev_song();
});
let count=0;
currsong.addEventListener("timeupdate",(e)=>{
    const currdur=e.target.currentTime,
        duration=e.target.duration;
          
        // if(Math.floor(currdur)==Math.floor(duration)){
        //         if(count==0){
        //             setTimeout(myFunction, 2000);
        //             function myFunction() {
        //                 loadmusic(songindex)
        //                 next_song();
        //             }
        //         }
        //         else{
        //             setTimeout(myFunction, 2000);
        //             function myFunction() {
                        
        //                 playsong();
        //             }
        //     }
        // }
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
        
          console.log(currdur,duration);
});

progarea.addEventListener("click",(e)=>{
    let totalwidth=progarea.clientWidth;
    let currwidth=e.offsetX;
    let totwidth = currsong.duration;
    currsong.currentTime=(currwidth/totalwidth)*(totwidth)
    console.log(totalwidth,e.offsetX)
    
});
searching.addEventListener("keyup",()=>{
    input_value=searching.value;
    filterdata=search_data(input_value,songplaylist) 
    // filterddata(filterdata)
 });
 function search_data(value,data){
     let filterdata=[];
    //  console.log(data)
     let kk=0
     for(kk=0;kk<data.length;kk++){
         let valuee = value.toLowerCase()
         let singer=data[kk].name.toLowerCase();
        
        // console.log(valuee,singer);
        console.log(singer[0]);
         if(String(singer).includes(valuee)){
             console.log(value,data[kk]);
             filterdata.push(data[kk]);
         }
     }
     return filterdata;
 }
 
for(let i=0;i<songplaylist.length;i++){
    let li_atrr=`<li li-index="${i}">
                    <span class="img_size"><img src="./image/${songplaylist[i].img}.jpeg"></img><span>
                       
                    <div class="row">
                        <span>${songplaylist[i].name}</span>
                        <p>&nbsp&nbsp${songplaylist[i].artist}</p>

                    </div>
                    
                    <!--<span class="song_duration">4:00</span>-->
                </li>`;
    ultag.insertAdjacentHTML("beforeend",li_atrr);            
 
};
const litags=ultag.querySelectorAll("li");

console.log(litags)
function currentplay() {
for(k=0;k<litags.length;k++){
    if(litags[k].classList.contains("currentplaying")){
        litags[k].classList.remove("currentplaying")       
    }  
    if(songindex==k){
        litags[k].classList.add("currentplaying")       
    }    
    litags[k].setAttribute("onclick","clicked(this)");
}
}
function clicked(attr){
    let liindex = attr.getAttribute("li-index");
    songindex=parseInt(liindex);
    currentplay();
    loadmusic(songindex);
    pausesong()
    setTimeout(myFunction, 2000);
    function myFunction() {
        playsong()
      }
    //   playsong()
}

// REPEAT the song!!

repeatt=controls.querySelector("#repeat");
add_r=controls.querySelector("#poss");
repeatt.addEventListener("click",()=>{
    if(count==0){
    add_r.innerText="R"
    add_r.classList.add("repeat_song");
    count+=1;
    }
    else{
    add_r.innerText=" ";
    add_r.classList.remove("repeat_song");
    count-=1;
    }
});

currsong.addEventListener("ended",(e)=>{
    if(e.target.currentTime==e.target.duration){
        if(count==0){
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

