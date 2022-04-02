// import { useFetch } from '../../hooks/useFetch'
import { projectFirestore } from '../../firebase/config'
import { useState, useEffect } from 'react'

// styles
import './Home.css'

// components
import RecipeList from '../../components/RecipeList'

export default function Home() {

    // const url = 'http://localhost:3000/recipes'
    // const { data, isPending, error} = useFetch(url)

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsPending(true)
        
        const unsub = projectFirestore.collection('recipes')
        .onSnapshot(snapshot => {
            if (snapshot.empty) {
                setError('No recipes to load')
            } else {
                let results = []
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })
                })
                setData(results)
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsub()

    }, [])

    return(
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}