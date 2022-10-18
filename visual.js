let analyser

function play_music(track){
    player.src = track.value
    player.load();
    player.play();

    let context = new AudioContext();
    let src = context.createMediaElementSource(player);
    analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 2048;

}

function get_volume(){
    if (!analyser){
        return 0
    }

    let sum = 0
    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    // console.log(dataArray[4]/256)
    // return dataArray[4]/200
    for (let i = 0; i < analyser.frequencyBinCount; i++) {
        let barHeight = dataArray[i];
        sum += barHeight**2
    }
    sum = Math.sqrt(sum/analyser.frequencyBinCount)
    console.log(sum/80)
    return sum/80

}