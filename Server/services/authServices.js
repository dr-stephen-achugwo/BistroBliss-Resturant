const userServices = require('./userServices');

const signUp = async (user) => {
    try {
        const {newUser, token} = await userServices.signUp(user);
        return {newUser, token};
    } catch (error) {
        throw new Error(error.message);
    }
};

const login = async (email, password) => {
    try {
        const {token, user} = await userServices.login(email, password);
        return {token, user};
    } catch (error) {    
        throw new Error(error.message);
    }
};

module.exports = {
    signUp,
    login,
};