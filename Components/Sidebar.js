import React, { useEffect, useState } from 'react'
import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, PlayCircleIcon, HeartIcon, RssIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import useSpotify from '@/hooks/useSpotify'
import { useRecoilState } from 'recoil';
import { playlistIdState } from '@/atoms/playlistsAtom';

function Sidebar() {
    const { data: session } = useSession();

    const spotifyApi = useSpotify();
    const [playlists, setPlaylists] = useState([])
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi])



    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide hidden md:flex sm:w-[12rem] lg:w-[15rem]'>
            <div className="space-y-4">
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='w-5 h-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <MagnifyingGlassIcon className='w-5 h-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <BuildingLibraryIcon className='w-5 h-5' />
                    <p>Your Library</p>
                </button>
                <hr className='border-gray-900' />
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlayCircleIcon className='w-5 h-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='w-5 h-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='w-5 h-5' />
                    <p>Your episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                {playlists.map((playlist, i) => {
                    return (
                        <p key={i} onClick={() => setPlaylistId(playlist.id)} className='flex items-center space-x-2 hover:text-white cursor-pointer'>{playlist.name}</p>

                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar
