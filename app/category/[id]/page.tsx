'use client';
export const dynamic = 'force-dynamic'

import { useRouter, useParams } from 'next/navigation'
import {getOneCategory, Category, updateCategory} from "@/service/category.service";
import React, {useEffect, useState} from "react";
import {Input, Textarea} from "@nextui-org/input";
import {categoryName} from "@/app/components/primitives";
import {Button} from "@nextui-org/button";

export default function Page() {

    const router = useRouter();
    const params = useParams();

    const { id } = params;

    const [categoryNameValue, setCategoryNameValue] = useState("");
    const [category, setCategory]: [Category, React.Dispatch<Category>] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchItem();
        }
    }, [id]);

    const fetchItem = async () => {
        try {
            const category: Category = await getOneCategory(id?.toString());
            console.log(category);
            setCategoryNameValue(category.categoryName);
            setCategory(category);
            setLoading(false);
        } catch (error) {
            setError('Error fetching item');
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let updatedCategory = category;
            updatedCategory.categoryName = categoryNameValue;
            console.log("trying to update...", updatedCategory);
            const res = await updateCategory(updatedCategory);
            router.push('/category');
        } catch (error) {
            setError('Error updating item');
        }
    };

    const resetForm = () => {
        setCategoryNameValue(category.categoryName);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 className={categoryName}>Edit Category ID: {id}</h2>
            <form onSubmit={handleSubmit} className='my-2'>
                <Input
                    label="categoryName"
                    placeholder="Enter categoryName"
                    type="text"
                    value={categoryNameValue}
                    variant="bordered"
                    onValueChange={setCategoryNameValue}
                    isRequired={true}
                />
                <div className='flex my-2'>
                    <Button color="default" variant="flat" className='flex-1' onClick={resetForm}>
                        Reset
                    </Button>
                    <Button color="primary" className='flex-1' type='submit'>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}