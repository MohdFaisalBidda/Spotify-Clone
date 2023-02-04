import React from 'react'
import { HomeIcon,MagnifyingGlassIcon,BuildingLibraryIcon,PlayCircleIcon,HeartIcon,RssIcon} from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'

function Sidebar() {
    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900'>
            <div className="space-y-4">
                <button className='flex items-center space-x-2 hover:text-white'
                onClick={()=>signOut()}>
                    <p>Sign out</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='w-5 h-5'/>
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <MagnifyingGlassIcon className='w-5 h-5'/>
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <BuildingLibraryIcon className='w-5 h-5'/>
                    <p>Your Library</p>
                </button>
                <hr className='border-gray-900'/>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlayCircleIcon className='w-5 h-5'/>
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='w-5 h-5'/>
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='w-5 h-5'/>
                    <p>Your episodes</p>
                </button>
                <hr className='border-gray-900'/>

                {/* {playlists} */}
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
                <p className='flex items-center space-x-2 hover:text-white'>playlists</p>
            </div>
        </div>
    )
}

export default Sidebar
