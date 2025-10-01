
const User = require("../models/User");

const jwt = require("jsonwebtoken");


//Gentrate jwt token
const generateToken =(id) =>
{
    return jwt.sign({ id },process.env.JWT_SECRET, {expiresIn: "7d"})
}

//register user
exports.registerUser = async(req, res) =>{


    const body = req.body || {};
    const{ fullName, email, password, profileImageUrl} = body;
    

    //validate check for missing fields
    if(!fullName || !email || !password){
        return res.status(400).json({message: "all fields are required"});
    }
    try{
        //check if email alreay exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already in use"});
        }

        //create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch(err) {
        res
            .status(500)
            .json({message: "Error registering user", error: err.message});
    }
};

//login user
exports.loginUser = async(req, res) =>{
    const{ email, password}= req.body;
   if(!email || !password){
    return res.status(400).json({messagw: "All fields are required"});
   }
   try{
    const user = await User.findOne({ email });
    if(!user || !(await user.comparePassword(password))){
        return res.status(400).json({message: "Invalid credentials"});
    }
    res.status(200).json({
        id: user._id,
        user,
        token: generateToken(user._id),
    });
   } catch(err){
     res
            .status(500)
            .json({message: "Error registering user", error: err.message});
   }
};

//get user information
exports.getUserInfo = async(req, res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
        return res.status(400).json({message: "User not found"});
    }
                                                       

    res.status(200).json(user);
    } catch (err) {
         res
            .status(500)
            .json({message: "Error registering user", error: err.message});
    }
};
