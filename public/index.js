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
  var keys = [
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72
  ];
  var keysMap = /* @__PURE__ */ new Map();
  var isArturiaKeyStep = (input) => input.name === "Arturia KeyStep 32 MIDI 1";
  var getKeyDomNode = (key) => document.getElementById(key.toString());
  var onArturiaMessage = (e) => {
    const [actionByte, controlId, value] = e.data;
    const timestamp = new Date().getTime();
    let interaction = null;
    const domNode = getKeyDomNode(controlId);
    if (actionByte === 151) {
      domNode.style.transition = "none";
      interaction = "PushDown";
      keysMap.set(controlId, timestamp);
    } else if (actionByte === 135) {
      interaction = "PushUp";
      const lastTimestamp = keysMap.get(controlId);
      const difference = timestamp - lastTimestamp;
      domNode.style.transition = `background ${difference}ms`;
      console.log(difference);
      keysMap.delete(controlId);
    }
    const event = {
      interaction,
      controlId,
      value,
      timestamp
    };
    redrawBox(event);
  };
  var redrawBox = (event) => {
    const div = getKeyDomNode(event.controlId);
    if (div) {
      if (event.interaction === "PushDown") {
        div.classList.add("active");
      } else if (event.interaction === "PushUp") {
        div.classList.remove("active");
      }
    }
  };
  var drawBoxes = () => {
    for (const key of keys) {
      const div = document.createElement("div");
      div.setAttribute("id", key.toString());
      div.setAttribute("class", "key");
      const textNode = document.createTextNode(key.toString());
      div.appendChild(textNode);
      document.getElementById("main")?.appendChild(div);
    }
  };
  var startLoggingArturiaKeyStep = (device) => {
    device.input.onmidimessage = onArturiaMessage;
    drawBoxes();
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
