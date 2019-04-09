var contextClass = (window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext);

      if (contextClass) {
        // Web Audio API is available.
        var context = new AudioContext();
      }
      var gainNode = context.createGain();
      var oscillator1 = context.createOscillator();
      var oscillator2 = context.createOscillator();
      var splitter = context.createChannelSplitter(2);
      var splitter2 = context.createChannelSplitter(2);
      var merger = context.createChannelMerger(2);
      oscillator1.type = 0;
      oscillator2.type = 0;
      gainNode.gain.value=0;

      oscillator1.connect(splitter);
      oscillator2.connect(splitter2);

      splitter.connect(merger, 1, 0);
      splitter2.connect(merger, 1, 1);
      merger.connect(gainNode);

      gainNode.connect(context.destination);

      oscillator1.detune.value = 100; // value in cents
      oscillator1.start(0);
      oscillator2.detune.value = 100; // value in cents
      oscillator2.start(0);

      var oscOn = function(freq1, freq2){
          oscillator1.frequency.value = freq1;
          oscillator2.frequency.value = freq2;
      };

      function start(freq1, freq2) {
        update_views();
        if(document.getElementById("start_btn").style.display === "none"){
            oscOn(freq1,freq2);
            gainNode.gain.value=1;
        }
        else{
            gainNode.gain.value=0;
        }
      }
