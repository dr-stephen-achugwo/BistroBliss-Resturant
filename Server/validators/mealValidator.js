const {body} = require('express-validator');

const createMeal = [
	body("name","meal name is required").isString,
	body("description","meal description is required").isString,
	body("name","meal name is required").isString,
	body("price","meal price is required").isNumeric,
	body("image","meal image is required").isString,
	body("category","meal category is required").isString
]
const updateMeal = [
	body("name","meal name is required").isString,
	body("description","meal description is required").isString,
	body("name","meal name is required").isString,
	body("price","meal price is required").isNumeric,
	body("image","meal image is required").isString,
	body("category","meal category is required").isString
]

module.exports = {createMeal, updateMeal}


