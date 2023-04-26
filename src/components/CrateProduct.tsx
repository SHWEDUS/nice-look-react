import React, {useState} from "react";
import {IProduct} from "../models";
import axios from "axios";
import {ErrorMeassage} from "./ErrorMeassage";

const productData: IProduct = {
    title: '',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 42,
        count: 10
    }
}

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

export function CrateProduct({onCreate}: CreateProductProps) {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        if (value.trim().length === 0) {
            setError('Incorrect input!!!')
            return
        }
        productData.title = value
        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
        onCreate(response.data);
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                className="border py-2 px-5 mb-2 w-full outline-0"
                placeholder="Enter product title"
                value={value}
                onChange={changeHandler}
            />
            {error && <ErrorMeassage error={error}/>}
            <button type="submit" className="py-2 px-5 border bg-amber-400 hover:bg-amber-500">Create</button>
        </form>
    )
}