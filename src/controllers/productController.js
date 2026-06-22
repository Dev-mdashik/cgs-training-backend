import express from 'express';
import { products } from '../API/productApi.js';
import ProductModel from '../models/productModel.js';


export const getProduct = async (req, res) => {
    try {
        const data = await ProductModel.find({});
        res.status(200).json({status: 'Success', msg: 'Data Retrieved Successfully', data});
    } catch (error) {
        res.status(500).json({status: 'Failed', msg: `${error.message}`});        
    }
}

export const addProduct = async (req, res) => {    
    try {
        const data = await ProductModel.create(req.body);
        res.status(201).json({status: 'Success', msg: 'Data Created Successfully', data});
    } catch (error) {
        res.status(500).json({status: 'Failed', msg: `${error.message}`});        
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;        
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body);

        if(!updatedProduct) {
            res.status(404).json({status: 'Failed', msg: 'ID Not Found'})
        }
        res.status(200).json({status: 'Success', msg: 'Data Updated Successfully', data: updatedProduct});
    } catch (err) {
        res.status(500).json({status: 'Failed', msg: `${err.message}`});
    }
}

export const deleteProduct = async (req, res) => {
    try {       
            const {id} = req.params;    
            const deltedProduct = await ProductModel.findByIdAndDelete(id);

            if(!deltedProduct) {
                 res.status(404).json({status: 'Failed', msg: 'ID Not Found'})
            }

            res.status(200).json({status: 'Success', msg: 'Data Deleted Successfully' });         
        } catch (error) {            
            res.status(500).json({status: 'Failed', msg: error.message});        
    }
}




