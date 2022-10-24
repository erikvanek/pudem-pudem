(() => {
  // public/akai-midi-mix.ts
  var faderData = [
    {
      marker: "1",
      id: 19
    },
    {
      marker: "2",
      id: 23
    },
    {
      marker: "3",
      id: 27
    },
    {
      marker: "4",
      id: 31
    },
    {
      marker: "5",
      id: 49
    },
    {
      marker: "6",
      id: 53
    },
    {
      marker: "7",
      id: 57
    },
    {
      marker: "8",
      id: 61
    },
    {
      marker: "master",
      id: 62
    }
  ];
  var faders = faderData.map((preset) => ({
    controlId: preset.id,
    min: 0,
    max: 127,
    marker: preset.marker
  }));
  var startLoggingAkaiMidiMix = (device) => {
    device.input.onmidimessage = onMidiNovationMessage;
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
  var isAkaiMidiMix = (input) => input.name === "MIDI Mix" && input.manufacturer === "AKAI";

  // public/elektron.ts
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
    console.log(event);
  };
  var startLoggingElektron = (device) => {
    device.input.onmidimessage = onElektronMessage;
  };

  // public/arturia-key-step.ts
  var isArturiaKeyStep = (input) => input.name === "Arturia KeyStep 32 MIDI 1";
  var onArturiaMessage = (e) => {
    const [actionByte, controlId, value] = e.data;
    const timestamp = new Date().getTime();
    let interaction = null;
    if (actionByte === 151) {
      interaction = "PushDown";
    } else if (actionByte === 135) {
      interaction = "PushUp";
    }
    const event = {
      interaction,
      controlId,
      value,
      timestamp
    };
    console.log(event);
  };
  var startLoggingArturiaKeyStep = (device) => {
    device.input.onmidimessage = onArturiaMessage;
  };

  // public/index.ts
  var runWebMidiApi = () => navigator.requestMIDIAccess().then((midiAccess) => {
    console.log("web midi api running");
    for (const entry of midiAccess.inputs) {
      const input = entry[1];
      const device = { input, controls: [] };
      if (isAkaiMidiMix(input)) {
        startLoggingAkaiMidiMix(device);
      } else if (isArturiaKeyStep(input)) {
        startLoggingArturiaKeyStep(device);
      } else {
        startLoggingElektron(device);
      }
    }
  }, console.error);
  runWebMidiApi();
})();
//# sourceMappingURL=index.js.map
