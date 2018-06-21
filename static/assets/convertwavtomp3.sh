for i in *.wav; do 
ffmpeg -i "$i" $(basename "${i/.flac}").mp3
done