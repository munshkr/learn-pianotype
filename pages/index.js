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

class Home extends React.Component {
  state = {
    scale: Scales.major,
    rootKey: "c4",
    rootKeyNumber: MidiNumbers.fromNote("c4"),
    invalidRootKey: false
  };

  handleScaleChange = e => {
    this.setState({ scale: Scales[e.target.value] });
  };

  handleRootKeyChange = e => {
    const { value } = e.target;
    this.setState({ rootKey: value });
    if (this.isNoteValid(value)) {
      this.setState({
        rootKeyNumber: MidiNumbers.fromNote(value),
        invalidRootKey: false
      });
    } else {
      this.setState({ invalidRootKey: true });
    }
  };

  isNoteValid(value) {
    try {
      MidiNumbers.fromNote(value);
      return true;
    } catch (err) {
      return false;
    }
  }

  render() {
    const { scale, rootKey, rootKeyNumber, invalidRootKey } = this.state;

    const keyboardShortcuts = buildMap(rootKeyNumber, scale);
    const firstNote = MidiNumbers.fromNote("a0");
    const lastNote = MidiNumbers.fromNote("c8");

    return (
      <div>
        <div>
          <label>Scale</label>
          <select onChange={this.handleScaleChange}>
            {Object.keys(Scales).map(scale => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
          <label>Root key</label>
          <input value={rootKey} onChange={this.handleRootKeyChange} />
          {invalidRootKey && (
            <span style={{ color: "red" }}>
              Invalid root key. Examples of valid keys: "c4", "e#5", etc.
            </span>
          )}
        </div>
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
}

export default Home;
