const Meal = require('../models/Meal');

const createMeal = async (meal) => {
  try{
      const newMeal = new Meal(meal);
      return await newMeal.save();
  }catch(err){
      throw new Error(err.message);
  }
}

const deleteMeal = async (id) => {
  try{
      return await Meal.findByIdAndDelete(id);
  }catch(err){
      throw new Error(err.message);
  }
}

const updateMeal = async (id, meal) => {
  try{
      return await Meal.findByIdAndUpdate(id, meal, {new: true});
  }catch(err){
      throw new Error(err.message);
  }
}

const getAllMeals = async () => {
  try{
      return await Meal.find({});
  }catch(err){
      throw new Error(err.message);
  }
}

const getMealsByCategory = async (category) => {
  try{
      return await Meal.find({category});
  }catch(err){
      throw new Error(err.message);
  }
}


module.exports = { getAllMeals, getMealsByCategory, updateMeal, createMeal, deleteMeal }