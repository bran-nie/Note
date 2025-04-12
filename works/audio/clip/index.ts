(function init() {
  const fileInput: HTMLInputElement | null =
    document.querySelector('#fileInput');

  if (!fileInput) return;

  fileInput.onchange = function () {
    const files = fileInput.files;
    if (!files) return;
    const file = files[0];

    console.log({ file });

    var reader = new FileReader();
    reader.onload = (e) => {
      const arrBuffer = e.target?.result;
      if (!arrBuffer || typeof arrBuffer === 'string') return;

      console.log({ arrBuffer });

      const audioCtx = new AudioContext();

      audioCtx.decodeAudioData(arrBuffer, (audioBuffer) => {
        console.log({ audioBuffer });

        /** 声道数量 */
        const channels = audioBuffer.numberOfChannels;
        /** 采样率 */
        const rate = audioBuffer.sampleRate;

        const startOffset = 0;
        const endOffset = rate * 3;

        const frameCount = endOffset - startOffset;

        /** 创建同样声道数量，同样采样率，前三秒是空的 audioBuffer */
        const newAudioBuffer = new AudioContext().createBuffer(
          channels,
          frameCount,
          rate
        );
        const anotherArray = new Float32Array(frameCount);

        const offset = 0;
        for (let channel = 0; channel < channels; channel += 1) {
          audioBuffer.copyFromChannel(anotherArray, channel, startOffset);
          newAudioBuffer.copyFromChannel(anotherArray, channel, offset);
        }

        const source = audioCtx.createBufferSource();

        source.buffer = newAudioBuffer;
        source.connect(audioCtx.destination);

        console.log({ source });

        source.start();
      });
    };

    reader.readAsArrayBuffer(file);
  };
})();
