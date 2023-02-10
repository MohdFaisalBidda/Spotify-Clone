import React from 'react'
import { getProviders, signIn } from "next-auth/react"


function Login({ providers }) {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-black'>
            <img src="https://i.imgur.com/fPuEa9V.png" className='w-40'/>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className='bg-green-400 p-5 rounded-full text-sm font-bold text-white mt-4 hover:bg-green-600 duration-150' onClick={()=>{
                        signIn(provider.id,{callbackUrl:"/"})
                    }}>Login with {provider.name}</button>


                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}
