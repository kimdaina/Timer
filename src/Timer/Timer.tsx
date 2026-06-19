import {Mp3} from '../assets/mp3/Mp3';

import { useState,useEffect } from "react";

import './Timer.css' ; {/*공통으로 들어가야할 테마 */}
import '../assets/style/Barbie.css'

function Timer({ theme }: { theme: string }){
    // const [theme] = useState(Theme_name()); //이건 리액트가 따로 기억하도록 도와주는 값, 렌더링돼도 유지하고 싶은 값은 useState에 넣는다. 걍 App에서 받음
    //const theme = Theme_name 이렇게만하면 렌더링이 될때 마다(버튼을 누를때마다) 테마를 새로 갱신해서 사용하면 안됨
    
    const [hours,set_hours]=useState('00');
    const [minutes,set_minutes]=useState('00');
    const [seconds,set_seconds]=useState('00');
    const [totalTime,set_totalTime] = useState(0);

    const [started,set_started]=useState(false);
    const [finish,set_finish] = useState(false);

    let hours_num=Number(hours);
    let minutes_num=Number(minutes);
    let seconds_num=Number(seconds);


    function plus(num:number){ {/* +버튼,숫자증가 */}
        return String(num+1).padStart(2,'0')
    } 
    function minus(num:number){  {/* -버튼,숫자감소 */}
        return num-1>=0?String(num-1).padStart(2,'0'):String(num).padStart(2,'0')
    }

    function reset(){ {/* 리셋버튼 */}
        set_hours("00");
        set_minutes("00");
        set_seconds("00");
        set_totalTime(0);
        set_started(false);
    }

    function start(){ {/*시작버튼 누르면 1초싹 감소 시작 */}
        let total_num =hours_num*3600+minutes_num*60+seconds_num
        if (total_num!==0){ {/*0이 아닐때만 실행*/}
            set_totalTime(total_num);
            set_started(true);
        }
        
    }
    
    useEffect(()=>{ {/*started의 값이 바뀌면 호출되는 함수 */}
            if(!started) return; {/*started가 false면 실행 안함*/}
            
            const timer = setInterval(() => { {/*setInterval은 타이머에서 쓰이는 react 함수*/ }
                set_totalTime((prev) => {       
                    const next_num=prev-1;  {/*감소된 초*/}
                    
                    if(next_num<=0){    {/*감소된초가 0 이하면 끝 */ }
                        set_hours("00");
                        set_minutes("00");
                        set_seconds("00");

                        // set_totalTime(0);
                        set_finish(true);
                        set_started(false);
                        return 0; //이거 자체가 set_total을 0으로 바꾼다
                    }

                    
                    const hour_display=Math.floor(next_num/3600);   {/*감소된 초,시간*/}
                    const minute_display=Math.floor((next_num%3600)/60); {/*감소된 초,분*/}
                    const second_display=Math.floor((next_num%3600)%60); {/*감소된 초,초*/}

                    set_hours(String(hour_display).padStart(2,'0'));
                    set_minutes(String(minute_display).padStart(2,'0'));
                    set_seconds(String(second_display).padStart(2,'0'));

                    return next_num;
                });
            }, 1000);

            return () => clearInterval(timer);
        }, [started]);
    
    function pause(){
        set_started(false);
    }
    

    return(
        <div id="timer_Box" className={theme} >
            <div id = "All_timeBox" className={!started?"adjust_timeBox":"Hidden_timeBox"}>
                
                <div className="time_Box"> {/*시*/}
                    <button className={!started?"adjust_Button":"Hidden_Button"} onClick={()=>set_hours(plus(hours_num))} disabled={started}>+</button>
                    <input className="time_Input" type="number" min={0} value={hours} disabled={started} onChange={(e)=>(set_hours(String(Number(e.target.value || 0)).padStart(2, "0")))}/>
                    {/* onChange랑 value가 있어야지 사용자가 입력한 값을 state에 반영하고, 그 state가 다시 화면에 보인다, value만 있으면 타이핑은 힘들다 */}
                    <button className={!started?"adjust_Button":"Hidden_Button"} onClick={()=>set_hours(minus(hours_num))} disabled={started}>-</button>
                </div>
                
                <span className="colon">:</span>
                
                <div className="time_Box"> {/*분*/}
                    <button className={!started?"adjust_Button":"Hidden_Button"} onClick={()=>minutes_num+1<60?set_minutes(plus(minutes_num)):minutes} disabled={started}>+</button>
                    <input className="time_Input" type="number" value={minutes} disabled={started} max={59} onChange={(e)=>(set_minutes(String(Number(e.target.value || 0)).padStart(2, "0")))}/>
                    <button className={!started?"adjust_Button":"Hidden_Button"} onClick={()=>set_minutes(minus(minutes_num))} disabled={started}>-</button>
                </div>
                
                <span className="colon">:</span>
                
                <div className="time_Box"> {/*초*/}
                    <button className={!started?"adjust_Button":"Hidden_Button"} onClick={()=>seconds_num+1<60?set_seconds(plus(seconds_num)):seconds_num} disabled={started}>+</button>
                    <input className="time_Input" type="number" value={seconds} disabled={started} max={59} onChange={(e)=>(set_seconds(String(Number(e.target.value || 0)).padStart(2, "0")))}/>
                    <button className={!started?"adjust_Button":"Hidden_Button"} onClick={()=>set_seconds(minus(seconds_num))} disabled={started}>-</button>
                
                </div>
            </div>
                <div id="timer_button">
                    <button className="type_Button sparkle_Button" onClick={()=>started?pause():start()}>
                        {started ? "pause" : "start"}
                        {theme === "theme_barbie" && (
                            <>
                                <span className="star star-1">★</span>
                                <span className="star star-2">★</span>
                                <span className="star star-3">★</span>
                                <span className="star star-4">✦</span>
                            </>
                        )}
                    </button>
                    <button className="type_Button sparkle_Button" onClick={() => reset()}>
                        reset
                        {theme === "theme_barbie" && (
                            <>
                                <span className="star star-1">★</span>
                                <span className="star star-2">★</span>
                                <span className="star star-3">★</span>
                                <span className="star star-4">✦</span>
                            </>
                        )}
                    </button>
                </div>    
                <Mp3 theme={theme} finish={finish} set_finish={set_finish} />
        </div>
    )
}
export default Timer