const mealRepo = require('../repos/mealRepo');

const getAllMeals = async () => {
    try{
        return await mealRepo.getAllMeals();
    }catch(err){
        throw new Error(err.message);
    }
}

const getMealsByCategory = async (category) => {
    try{
        return await mealRepo.getMealsByCategory(category);
    }catch(err){
        throw new Error(err.message);
    }
}

const createMeal = async (meal) => {
    try{
        return await mealRepo.createMeal(meal);
    }catch(err){
        throw new Error(err.message);
    }
}

const updateMeal = async (id, meal) => {
    try{
        return await mealRepo.updateMeal(id, meal);
    }catch(err){
        throw new Error(err.message);
    }
}

const deleteMeal = async (id) => {
    try{
        return await mealRepo.deleteMeal(id);
    }catch(err){
        throw new Error(err.message);
    }
}

module.exports = { getAllMeals, getMealsByCategory ,createMeal, updateMeal , deleteMeal}