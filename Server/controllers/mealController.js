const mealServices = require('../services/mealServices');
const jsend = require('jsend');

const getMeals = async (req, res) => {
    try{
        const meals = await mealServices.getAllMeals();
        res.json(jsend.success({meals}));
    }catch(err){
        res.status(500).json(jsend.error({message: err.message}));
    }
}

const getMealsByCategory = async (req, res) => {
    try{
        const category = req.params.category;
        const meals = await mealServices.getMealsByCategory(category);
        res.json(jsend.success({meals}));
    }catch(err){
        res.status(500).json(jsend.error({message: err.message}));
    }
}

const addMeal = async (req, res) => {
    try{
        const meal = req.body;
        const newMeal = await mealServices.createMeal(meal);
        res.json(jsend.success({newMeal}));
    }catch(err){
        res.status(500).json(jsend.error({message: err.message}));
    }
}

const deleteMeal = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedMeal = await mealServices.deleteMeal(id);
        res.json(jsend.success({deletedMeal}));
    }catch(err){
        res.status(500).json(jsend.error({message: err.message}));
    }
}

const updateMeal = async (req, res) => {
    try{
        const id = req.params.id;
        const meal = req.body;
        const updatedMeal = await mealServices.updateMeal(id, meal);
        res.json(jsend.success({updatedMeal}));
    }catch(err){
        res.status(500).json(jsend.error({message: err.message}));
    }
}

module.exports = { getMeals, getMealsByCategory, addMeal, deleteMeal, updateMeal}