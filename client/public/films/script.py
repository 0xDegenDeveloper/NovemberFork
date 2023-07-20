import os
import subprocess

# Get a list of all the MP4 files in the current directory
mp4_files = [f for f in os.listdir() if f.endswith(".mp4")]

# Loop through the MP4 files and create new videos
for mp4_file in mp4_files:
    output_file = f"processed_{mp4_file}"
    command = (
        f"ffmpeg -i {mp4_file} -filter_complex \"[0:v]split[original][reverse];[reverse]reverse[reversed];[original][reversed]concat=n=2:v=1:a=0,format=yuv420p[out]\" -map \"[out]\" -c:v libx264 -crf 18 -preset veryfast {output_file}"
    )
    subprocess.run(command, shell=True, check=True)
