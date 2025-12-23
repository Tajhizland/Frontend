"use client"
import React, {useState} from 'react';

const PodcastPlayer = ({title, description, src, date}: {
    title: string,
    description: string,
    src: string,
    date: string
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="podcast-player">
            <div className="podcast-header">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="audio-controls">
                <button onClick={handlePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <audio ref={audioRef} src={src}/>
            </div>

            <div className="podcast-footer">
                <span>{date}</span>
            </div>
        </div>
    );
};

export default PodcastPlayer;
