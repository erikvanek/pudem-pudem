(() => {
  // public/index.ts
  var isAkaiMidiMix = (input) => input.name === "MIDI Mix" && input.manufacturer === "AKAI";
  var onElektronMessage = (e) => {
    const [userAction, controlId, value] = e.data;
    console.log([...e.data]);
    let interaction = null;
    if (userAction === 144) {
      interaction = "PushDown";
    } else if (userAction === 128) {
      interaction = "PushUp";
    } else if (userAction === 176) {
      interaction = "Tweak";
    }
    const event = {
      interaction,
      controlId,
      value
    };
  };
  var onMidiNovationMessage = (e) => {
    const [userAction, controlId, value] = e.data;
    let interaction = null;
    if (userAction === 144) {
      interaction = "PushDown";
    } else if (userAction === 128) {
      interaction = "PushUp";
    } else if (userAction === 176) {
      interaction = "Tweak";
    }
    const event = {
      interaction,
      controlId,
      value
    };
    console.log(event);
  };
  var runWebMidiApi = () => navigator.requestMIDIAccess().then((midiAccess) => {
    console.log("web midi api running");
    for (const entry of midiAccess.inputs) {
      const input = entry[1];
      console.log(entry);
      const device = { input, controls: [] };
      if (isAkaiMidiMix(input)) {
        startLoggingAkaiMidiMix(device);
      } else {
        startLoggingElektron(device);
      }
    }
  }, console.error);
  var startLoggingAkaiMidiMix = (device) => {
    device.input.onmidimessage = onMidiNovationMessage;
  };
  var startLoggingElektron = (device) => {
    device.input.onmidimessage = onElektronMessage;
  };
  runWebMidiApi();
})();
//# sourceMappingURL=index.js.map
