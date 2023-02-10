import { playlistIdState, playlistState } from '@/atoms/playlistsAtom';
import useSpotify from '@/hooks/useSpotify';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Songs from './Songs';

const Center = () => {

    const colors = [
        "from-red-500",
        "from-orange-500",
        "from-green-500",
        "from-blue-500",
        "from-pink-500"
    ]

    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState("");
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const playlistId = useRecoilValue(playlistIdState);

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId])

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getPlaylist(playlistId).then((data) => {
                setPlaylist(data.body)
            })
        }
    }, [spotifyApi, playlistId])

    return (
        <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
            <header className='absolute top-5 right-5'>
                <div className="flex items-center bg-black text-white space-x-3 opacity-90 cursor-pointer rounded-full pr-2 p-1" onClick={() => signOut()}>
                    <img src={session?.user?.image} alt="img" className='w-10 h-10 rounded-full' />
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className='w-5 h-5' />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img src={playlist.images?.[0]?.url} alt="" className='w-44 h-44 shadow-lg' />
                <div className="">
                    <p >PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist.name}</h1>
                </div>
            </section>
            <Songs />
        </div>

    )
}

export default Center
