import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from './useSpotify';

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentIdTrack, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {

        const fetchSongData = async () => {
            if (currentIdTrack) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }).then(res => res.json())
                    .catch((err) => console.log(err))
                setSongInfo(trackInfo);
            }
        }

        fetchSongData();

    }, [spotifyApi, currentIdTrack])


    return songInfo;
}

export default useSongInfo
