import '../style/Barbie.css'

import { useEffect, useRef } from "react";

/* 바비 뮤직 */
import keep_a_secret from './Barbiemp3/Can you keep a secret.mp3';
import Free from './Barbiemp3/Free.mp3';
import spakle_on from './Barbiemp3/Get Your Sparkle On.mp3';
import girl_like_you from './Barbiemp3/I am a Girl Like You.mp3';
import love_me from './Barbiemp3/if you love me for me.mp3';
import Waves from './Barbiemp3/Queen Of The Waves.mp3';
import two_voices from './Barbiemp3/Two Voices, One Song.mp3';
import find_it from "./Barbiemp3/We're Gonna Find It.mp3";
import Princess from "./Barbiemp3/You can tell she's a princess.mp3";


const Baibie_Music = [
        keep_a_secret,
        Free,
        spakle_on,
        girl_like_you,
        love_me,
        Waves,
        two_voices,
        find_it,
        Princess
]


const Lockwood_Music = [
        keep_a_secret,
        Free,
        spakle_on,
        girl_like_you,
        love_me,
        Waves,
        two_voices,
        find_it,
        Princess
]


export function Mp3({ theme, finish, set_finish,} : { theme: string; finish: boolean; set_finish: (value: boolean) => void; }) {
    
    const themeMusic : Record<string, string[]> = {
        theme_barbie: Baibie_Music,
        theme_lockwood: Lockwood_Music,
        // theme_jellyfish: Jellyfish_Music,
    };
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    function music_end(){
        audioRef.current?.pause();

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }

        audioRef.current = null;
        set_finish(false);
    }

    useEffect(()=>{
        if (!finish) return;
        
        /*---------------------------노래 테마 별 랜덤선택-------------------*/
        const musicList = themeMusic[theme];
        const randomIndex = Math.floor(Math.random() * musicList.length);
        const audio = new Audio(musicList[randomIndex]);
        /*--------------------------------------------------------------*/

        audioRef.current = audio;
        audio.play();
        audio.onended = () => {
            set_finish(false);
        };
        
    },[theme, finish])
    return finish ? (
    <div className="popup_Backdrop">
        <div className="music_Popup">
            music is playing
        <button onClick={() => (set_finish(false),music_end())}>X</button>
        </div>
    </div>
) : null;
}

