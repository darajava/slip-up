for i in *.wav; do 
ffmpeg -i "$i" $(basename "${i/.wav}").mp3
done
