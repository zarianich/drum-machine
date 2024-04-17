const { useState, useContext, useEffect, createContext } = React;

document.documentElement.setAttribute('data-bs-theme','dark');

const Context = createContext(null);

const App = () => {
  const [power, setPower] = useState(false);
  const [bank, setBank] = useState(false);
  const [volume, setVolume] = useState(50);
  const [name, setName] = useState("Welcome");
  
  useEffect(() => {
    
    const handleKeydown = (e) => {
      let audio;
      
     for (let i = 0; i < 9; i++) {
         if (e.key === bankOne[i].keyTrigger || e.keyCode === bankOne[i].keyCode) { 
          audio = document.getElementById(bank ? bankTwo[i].id : bankOne[i].id).firstElementChild;
          setName(audio.parentElement.id);
          audio.volume = volume/100;
          audio.src = bank ? bankTwo[i].url : bankOne[i].url;
          break;
        }
      }
      
     if (power && typeof audio !== 'undefined') {
      audio.play();
     }
    };
    
    document.documentElement.addEventListener("keydown", handleKeydown);
    
    Context.Provider.bank = bank;
    
    return () => {
      document.documentElement.removeEventListener("keydown", handleKeydown);
    };
  }, [bank, power, volume]);
  
  const toggleBank = (e) => {
    setBank(prevBank => {
      setName(`${prevBank ? 'Heater Kit' : 'Smooth Piano Kit'}`);
      return !prevBank;
    });
  }
  
  const togglePower = (e) => {
    setPower(prevPower => {
      setName(`Power: ${!prevPower ? 'on' : 'off'}`);
      return !prevPower;
    });
  }
  
  const changeVolume = (e) => {
    setVolume(() => {
      setName(`Volume: ${Number(e.target.value)}`);
      return Number(e.target.value);
    });
  }
  
  const playClip = (e) => {
    if (power) {
    const clip = e.target.firstElementChild;
    clip.volume = volume/100;
    clip.play();
    }
    setName(e.target.id);
  }
  
  return (
    <Context.Provider value={{
        drumPadClass: "w-25 mx-2 drum-pad",
        playClip,
        bank
      }}>
      <div class="d-flex flex-wrap justify-content-center align-items-center vh-100">
        <div id="keys" class="d-flex py-5 flex-column flex-nowrap justify-content-center align-items-center border">
          <div class="w-75 d-block my-2">
            <DrumPad data={{
                order: "0", 
                key: "Q"
              }}/>
            <DrumPad data={{
                order: "1", 
                key: "W"
              }}/>
            <DrumPad data={{
                order: "2", 
                key: "E"
              }}/>
          </div>
          <div class="w-75 d-block my-2">
            <DrumPad data={{
                order: "3", 
                key: "A"
              }}/>
            <DrumPad data={{
                order: "4", 
                key: "S"
              }}/>
            <DrumPad data={{
                order: "5", 
                key: "D"
              }}/>
          </div>
          <div class="w-75 d-block my-2">
            <DrumPad data={{
                order: "6", 
                key: "Z"
              }}/>
            <DrumPad data={{
                order: "7", 
                key: "X"
              }}/>
            <DrumPad data={{
                order: "8", 
                key: "C"
              }}/>
          </div>
        </div>
        <div class="border py-4 px-3">
          <div class="form-check form-switch pb-2">
            <input onClick={togglePower} class="form-check-input" type="checkbox" role="switch" id="power-switch" />
            <label class="form-check-label" for="power-switch">Power</label>
          </div>
          <p id="display" class="py-2 text-center bg-secondary-subtle text-light">{name}</p>
          <label for="volume-slider" class="form-label">Volume</label>
          <input onChange={changeVolume} step="2" type="range" class="form-range" min="0" max="100" id="volume-slider" />
          <div class="form-check form-switch pt-2">
            <input onClick={toggleBank} class="form-check-input" type="checkbox" role="switch" id="bank-switch" />
            <label class="form-check-label" for="bank-switch">Bank</label>
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

const DrumPad = (props) => {
  const context = useContext(Context);
  const { order, key } = props.data;
  return (
    <button id={context.bank ? bankTwo[order].id : bankOne[order].id} class={context.drumPadClass} onClick={context.playClip}>{key}
      <audio id={key} class="clip" src={context.bank ? bankTwo[order].url : bankOne[order].url} type="audio/mpeg" />
    </button>
  );
}

//banks from https://codepen.io/freeCodeCamp/pen/MJyNMd?editors=0010
const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

ReactDOM.render(<App />, document.getElementById('drum-machine'));