for i in sounds/bass/*.wav; do 
ffmpeg -i "$i" sounds/bass/$(basename "${i/.wav}").mp3
done
