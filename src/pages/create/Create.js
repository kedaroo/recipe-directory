import { useState, useRef } from 'react'
// import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

import './Create.css'

export default function Create() {

    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientsInput = useRef(null)
    const navigate = useNavigate()

    // const url = 'http://localhost:3000/recipes'
    // const { postData, data, error } = useFetch(url, 'POST')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // postData({title, ingredients, method, cookingTime: cookingTime + ' minutes'})
        const doc = {title, ingredients, method, cookingTime: cookingTime + ' minutes'}
        try {
            await projectFirestore.collection('recipes').add(doc)
            navigate.push('/')
        } catch(err) {
            console.log(err)
        }
        
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()
        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('')
        ingredientsInput.current.focus()
    }

    // useEffect(() => {
    //     if (data) {
    //         history.push('/')
    //     }
    // }, [data, history])

    return (
        <div className='create'>
            <h2 className='page-title'>add a new recipe</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>recipe title:</span>
                    <input 
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>recipe ingredients:</span>
                    <div className='ingredients'>
                        <input 
                            type='text' 
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientsInput}
                        />
                        <button className='btn' onClick={handleAdd}>add</button>
                    </div>
                </label>
                <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>recipe method:</span>
                    <textarea 
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>cooking time (minutes):</span>
                    <input 
                        type='number'
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>

                <button className='btn'>submit</button>

            </form>
        </div>
    )
}