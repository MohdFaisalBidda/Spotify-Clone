import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo'
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { PlayCircleIcon, PauseCircleIcon, ForwardIcon, BackwardIcon, ArrowsRightLeftIcon, ArrowUturnLeftIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { debounce } from 'lodash';

function Player() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(false);
    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    const handleClick =()=>{
        spotifyApi.getMyCurrentPlaybackState().then(data=>{
            if(data.body?.is_playing){
                spotifyApi.pause();
                setIsPlaying(false)
            }
            else{
                spotifyApi.play();
                setIsPlaying(true)
            }
        })
    }

    const adjustVolume =useCallback(
       debounce((volume)=>{
        spotifyApi.setVolume(volume).catch((err)=>{console.log(err)});
       },500),
        []
    )

    useEffect(()=>{
        if(volume > 0 && volume < 100){
            adjustVolume(volume);
        }
    },[volume])


    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyApi, session])

    return (
        <div className='h-24 text-white px-2 md:px-8 grid grid-cols-3 bg-gradient-to-b from-black to-gray-900 text-xs md:text-base'>
            <div className='flex items-center space-x-2'>
                <img src={songInfo?.album.images[0].url} className="hidden md:inline w-10 h-10" />
                <div>
                    <p className="">{songInfo?.name}</p>
                    <p className="">{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className='flex items-center justify-evenly'>
                <ArrowsRightLeftIcon className='button' />
                <BackwardIcon className='button' />
                {!isPlaying ? <PlayCircleIcon className='button w-10 h-10' onClick={handleClick}/>
                    : <PauseCircleIcon className='button w-10 h-10' onClick={handleClick}/>}

                <ForwardIcon className='button' />
                <ArrowUturnLeftIcon className='button' />


            </div>
            <div className='flex justify-end items-center pr-1 md:pr-5 sm:pr-3 space-x-1 sm:space-x-3 md:space-x-4'>
                <SpeakerXMarkIcon onClick={()=>setVolume(volume - 10)} className='w-5 cursor-pointer' />
                <input 
                type="range" 
                className='w-14 sm:w-20 md:w-28'
                value={volume}
                onChange={(e)=>setVolume(Number(e.target.value))}
                min={0}
                max={100}
                />
                <SpeakerWaveIcon onClick={()=>setVolume(volume + 10)} className='w-5 cursor-pointer' />
            </div>

        </div>
    )
}

export default Player
