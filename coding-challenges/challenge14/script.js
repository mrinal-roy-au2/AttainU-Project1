function timeFormatHHMMSS (duration) {
    var hr = String(Math.floor(duration/3600));
    var new_duration = duration % 3600;
    var min = String(Math.floor(new_duration/60));
    var sec = String(new_duration%60);
    console.log('Input : '+ duration +'\n'+'Output : '+'"'+hr+':'+min+':'+sec+'"');

}

timeFormatHHMMSS(200);
timeFormatHHMMSS(10000);
timeFormatHHMMSS(20);
timeFormatHHMMSS(1000);
timeFormatHHMMSS(2000);
timeFormatHHMMSS(3001);
timeFormatHHMMSS(4000);
