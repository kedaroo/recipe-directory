import { useParams } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

import { useState, useEffect } from 'react'
import './Recipe.css'
import { useTheme } from '../../hooks/useTheme'

export default function Recipe() {

    const { id } = useParams()
    // const url = 'http://localhost:3000/recipes/' + id
    // const {data: recipe, isPending, error} = useFetch(url)

    const { mode } = useTheme()

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsPending(true)
        const unsub = projectFirestore.collection('recipes')
        .doc(id)
        .onSnapshot(doc => {
            if (doc.exists) {
                setIsPending(false)
                setRecipe(doc.data())
            } else {
                setError('could not find the recipe')
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsub()
    }, [id])

    const handleClick = () => {
        projectFirestore.collection('recipes')
        .doc(id)
        .update({
            title: 'im am an updated title'
        })
    }

    return (
        <div className={`recipe ${mode}`}>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>loading recipe...</p>}
            {recipe && (
                <>
                    <h2 className='page-title'>{recipe.title}</h2>
                    <p>takes {recipe.cookingTime} to cook</p>
                    <ul>
                        {recipe.ingredients.map(ingredient => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                    <p className='method'>{recipe.method}</p>
                    <button onClick={handleClick}>update me</button>
                </>
            )}
        </div>
    )
}