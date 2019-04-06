import { MidiNumbers, Piano } from "react-piano";
import "react-piano/dist/styles.css";

// TODO Import from pianotype
const keys = [
  "z",
  "x",
  "k",
  "b",
  "y",
  "f",
  "m",
  "d",
  "h",
  "n",
  "o",
  "t",
  "c",
  "l",
  "e",
  "a",
  "i",
  "s",
  "r",
  "u",
  "w",
  "g",
  "p",
  "v",
  "j",
  "q"
];

// TODO Import from pianotype
const Scales = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10]
};

// TODO Import from pianotype
function buildMap(rootKey, scale) {
  let map = [];
  for (let i = 0; i < 26; i++) {
    const j = i - 14;
    const k = scale[mod(j, scale.length)] + 12 * Math.floor(j / scale.length);
    const note = rootKey + k;
    map.push({ key: keys[i], midiNumber: note });
  }
  return map;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function Home() {
  const firstNote = MidiNumbers.fromNote("a0");
  const lastNote = MidiNumbers.fromNote("c8");

  const rootKey = MidiNumbers.fromNote("c4");
  const scale = Scales.minor;

  const keyboardShortcuts = buildMap(rootKey, scale);
  console.log(keyboardShortcuts);

  return (
    <div>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={() => {}}
        stopNote={() => {}}
        width={1500}
        keyboardShortcuts={keyboardShortcuts}
      />
    </div>
  );
}

export default Home;
