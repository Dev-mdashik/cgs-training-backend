import express from 'express';
import { products } from '../API/productApi.js';
import ProductModel from '../models/productModel.js';


export const getProduct = async (req, res) => {
    const filterProduct = {};
    try {
        const {search, category, brand, minPrice, maxPrice, page = 1, limit = 10} = req.query;

        // search
        if(search){
            filterProduct.name = {
                $regex: search, $options: 'i'
            };            
        }       

        
        // filter
        if(category){
            const categories = category.split(',');
            filterProduct.category = {
                $in : categories
            }
        }

        if(brand){     
            const allBrands = brand.split(',');            
            filterProduct.brand = { $in: allBrands };
        }

        if(minPrice || maxPrice){
            filterProduct.price = {}
            console.log('true')
            if(minPrice){
                filterProduct.price.$gte = Number(minPrice);
                console.log('minPrice')
            }
            if(maxPrice){
                filterProduct.price.$lte = Number(maxPrice);
                console.log('maxPrice')
            }
        }        

        
        // pagination
        const pageNumber = Math.max(Number(page), 1);
        const pageLimit = Math.max(Number(limit), 1);
        const skip = (pageNumber - 1) * pageLimit;
        const total = await ProductModel.countDocuments(filterProduct);        
        const allBrands = await ProductModel.distinct('brand');           
        const data = await ProductModel.find(filterProduct).skip(skip).limit(pageLimit);
        res.status(200).json({
            status: 'Success', 
            msg: 'Data Retrieved Successfully',
            limit: pageLimit,
            page: pageNumber,
            totalProducts: total,
            totalPages: Math.ceil( total / pageLimit ), 
            allBrands,                       
            data: data,            
        });
    } catch (error) {
        res.status(500).json({status: 'Failed', msg: `${error.message}`});        
    }
}

export const getProductById = async (req, res) => {
    try{
        const {id} = req.params;
        const data = await ProductModel.findById(id);
        return res.status(200).json({status: 'Success', msg: 'Data retrieved successfully', data})
    } catch (err) {
        return res.status(500).json({status: 'Failed', msg: `${err.message}`});        
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
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {new: true});

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
            const deltedProduct = await ProductModel.findByIdAndDelete(id, {new: true});

            if(!deltedProduct) {
                 res.status(404).json({status: 'Failed', msg: 'ID Not Found'})
            }

            res.status(200).json({status: 'Success', msg: 'Data Deleted Successfully' });         
        } catch (error) {            
            res.status(500).json({status: 'Failed', msg: error.message});        
    }
}




