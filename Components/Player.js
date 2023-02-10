import useSongInfo from '@/hooks/useSongInfo'
import React from 'react'

function Player() {
    const songInfo = useSongInfo();
    return (
        <div className='text-white p-10 grid grid-cols-3 items-center'>
            <div className='flex items-center'>
                <img src={songInfo?.album.images[0].url} className="w-10 h-10" />
                <p className="text-white">Name</p>
            </div>
            <div className='flex'>
                lefticon
                play
                righticon
            </div>
            <div className='flex'>
               volumeLow
               input range
               volumehigh
            </div>

        </div>
    )
}

export default Player
