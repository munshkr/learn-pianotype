import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
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

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVES = [3, 4, 5, 6];

// TODO Import from pianotype
const Scales = {
  major: { name: "Major", values: [0, 2, 4, 5, 7, 9, 11] },
  minor: { name: "Minor", values: [0, 2, 3, 5, 7, 8, 10] }
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

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

const SelectControl = withStyles(styles)(
  ({ classes, name, label, options, value, onChange }) => (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        inputProps={{
          name: name,
          id: name
        }}
      >
        {options.map(opts => (
          <MenuItem key={opts.key || opts} value={opts.key || opts}>
            {opts.value || opts}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
);

class Home extends React.Component {
  state = {
    scale: "major",
    octave: 4,
    rootNote: "C"
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const { scale, octave, rootNote } = this.state;

    const scaleValues = Scales[scale].values;
    const rootKey = MidiNumbers.fromNote(`${rootNote}${octave}`);
    const keyboardShortcuts = buildMap(rootKey, scaleValues);

    const firstNote = rootKey - 25;
    const lastNote = rootKey + 21;

    return (
      <div>
        <div>
          <form className={classes.root} autoComplete="off">
            <SelectControl
              name="scale"
              label="Scale"
              options={Object.keys(Scales).map(key => ({
                key: key,
                value: Scales[key].name
              }))}
              value={scale}
              onChange={this.handleInputChange}
            />
            <SelectControl
              name="octave"
              label="Octave"
              options={OCTAVES}
              value={octave}
              onChange={this.handleInputChange}
            />
            <SelectControl
              name="rootNote"
              label="Root Note"
              options={NOTES}
              value={rootNote}
              onChange={this.handleInputChange}
            />
          </form>
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

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
