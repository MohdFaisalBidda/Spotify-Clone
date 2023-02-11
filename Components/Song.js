import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSpotify from '@/hooks/useSpotify';
import React from 'react'
import { useRecoilState } from 'recoil'

const Song = ({ order, track }) => {
    const spotifyApi =useSpotify();
    const [currentTrackId,setCurrentTrackId]=useRecoilState(currentTrackIdState);
    const [isPlaying,setIsPlaying]=useRecoilState(isPlayingState);

    const playSong =()=>{
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris:[track.track.uri],
        });
    }

    return (
        <div className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg' onClick={playSong}>
            <div className='flex items-center space-x-4'>
                <p>{order + 1}</p>
                <img src={track.track.album.images[0].url} className="w-10 h-10"/>
                <div>
                    <p className='w-36 lg:w-64 text-white truncate'>{track.track.name}</p>
                    <p>{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <p className='w-40 hidden md:inline'>{track.track.album.name}</p>
                <p className='ml-auto'>Duration</p>
            </div>
        </div>
    )
}

export default Song
