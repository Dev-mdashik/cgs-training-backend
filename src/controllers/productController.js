import express from 'express';
import { products } from '../API/productApi.js';


export const getProduct = async (req, res) => {
    try {
        res.status(200).json({status: 'Data Retrieved Successfully', data: products});
    } catch (error) {
        res.status(500).json({status: 'Failed', message: `${error.message}`});        
    }
}

export const addProduct = async (req, res) => {
    const data = req.body;
    products.push(data);
    try {
        res.status(201).json({status: 'Data Created Successfully', data: products});
    } catch (error) {
        res.status(500).json({status: 'Failed', message: `${error.message}`});        
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
            const deleteProd = products.filter((item)=> item.id !== Number(id));        
            products.splice(0, products.length);
            products.push(...deleteProd);
            console.log(products)        
            res.status(200).json({status: 'success', message: 'Data Deleted Successfully', data: products });         
        } catch (error) {
            res.status(500).json({status: 'Failed', data: error.message});        
    }
}




