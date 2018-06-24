for i in sounds/$1/*.$2; do 
ffmpeg -i "$i" sounds/$1/$(basename "${i/.$2}").$3
done
