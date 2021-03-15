let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let img_vinyl = document.querySelector("#img-vinyl");
let mute_som = document.querySelector("#mute-som");
let icon_mute = document.querySelector(".fa-volume-up");



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
   {
	   name: "Da Weasel",
	   path: "music/da_weasel/1_da_weasel_uma_pagina_historia.mp3",
	   img: "img/da_wasel_1.jpg",
	   trackName: '"Força"'
   },
   {
     name: "Da Weasel",
     path: "music/da_weasel/2_da_weasel_joaninha.mp3",
     img: "img/da_wasel_2.jpg",
     trackName: '"Joaninha"'
   },
   {
     name: "Dire Straits",
     path: "music/dire_straits/1_dire _straits_ sultans_of_wing.mp3",
     img: "img/dire_straits_3.jpg",
     trackName:'"Sultans Of Swing"'
   },
   {
     name: "Dire Straits",
     path: "music/dire_straits/2_dire_straits_calling_elvis.mp3",
     img: "img/dire_straits_1.jpg",
     trackName: '"Calling Elvis"'
   },
   {
     name: "Survivor",
     path: "music/survivor/2_burning_heart.flac",
     img: "img/survivor_1.jpg",
     trackName: '"Burning Heart"'
   },
   {
   name: "Survivor",
   path: "music/survivor/1_eye_of_the_tiger.flac",
   img: "img/survivor_1.jpg",
   trackName: '"Eye of The Tiger"'
 }

   
];


// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

    artist.innerHTML = All_song[index_no].trackName;
	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
	/*mute_som.innerHTML = '<i class="fa fa-pause"></i>';*/
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  img_vinyl.classList.add("rotate_animation");
  
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
	img_vinyl.classList.remove("rotate_animation");

}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;

}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }