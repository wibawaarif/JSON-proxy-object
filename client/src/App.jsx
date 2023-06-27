import { useState } from 'react'
import useSWR from 'swr'
import './App.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function App() {
  const { data, error, isLoading } = useSWR('http://localhost:3000/posts', fetcher)
  console.log('data', data)
  return (
    <>
    <h1>Posts</h1>
      { isLoading ? <p>Loading...</p> :
        data?.map(x => {
          <p style={{color: 'white'}} key={x.id}>{x}</p>
        })
      }
    </>
  )
}

export default App
