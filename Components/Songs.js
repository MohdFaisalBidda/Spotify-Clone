import { playlistState } from '@/atoms/playlistsAtom'
import React from 'react'
import { useRecoilValue } from 'recoil'
import Song from './Song'

const Songs = () => {
    const playlist =useRecoilValue(playlistState)
    console.log(playlist);
  return (
    <div className='px-8 flex flex-col space-y-1 pb-28 text-white'>
      {playlist?.tracks?.items?.map((track,i)=>(
        <Song key={track.track.id} track={track} order={i}/>
      ))}
    </div>
  )
}

export default Songs
