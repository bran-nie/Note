(function init() {
    var fileInput = document.querySelector('#fileInput');
    if (!fileInput)
        return;
    fileInput.onchange = function () {
        var files = fileInput.files;
        if (!files)
            return;
        var file = files[0];
        console.log({ file: file });
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var arrBuffer = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (!arrBuffer || typeof arrBuffer === 'string')
                return;
            console.log({ arrBuffer: arrBuffer });
            var audioCtx = new AudioContext();
            audioCtx.decodeAudioData(arrBuffer, function (audioBuffer) {
                console.log({ audioBuffer: audioBuffer });
                /** 声道数量 */
                var channels = audioBuffer.numberOfChannels;
                /** 采样率 */
                var rate = audioBuffer.sampleRate;
                var startOffset = 0;
                var endOffset = rate * 3;
                var frameCount = endOffset - startOffset;
                /** 创建同样声道数量，同样采样率，前三秒是空的 audioBuffer */
                var newAudioBuffer = new AudioContext().createBuffer(channels, frameCount, rate);
                var anotherArray = new Float32Array(frameCount);
                var offset = 0;
                for (var channel = 0; channel < channels; channel += 1) {
                    audioBuffer.copyFromChannel(anotherArray, channel, startOffset);
                    newAudioBuffer.copyFromChannel(anotherArray, channel, offset);
                }
                var source = audioCtx.createBufferSource();
                source.buffer = newAudioBuffer;
                source.connect(audioCtx.destination);
                console.log({ source: source });
                source.start();
            });
        };
        reader.readAsArrayBuffer(file);
    };
})();
