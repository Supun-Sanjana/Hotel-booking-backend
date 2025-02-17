import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();



export function getUsers(req, res)  {
    User.find().then(
        (usersList)=>{
            res.json({
                list : usersList
            });
        }
    )
};

export function postUsers(req, res)  {

    const user = req.body

    const password = req.body.password;

    const passwordHash = bcrypt.hashSync(password, 10);
    user.password = passwordHash
    console.log(passwordHash);

    const newUser = new User(user)
    newUser.save().then(
        ()=>
        {
            res.json({message : "user created successfully"});
        }
    ).catch(
        ()=>{
            res.json({message : "user creation failed"});
        }
    )
};

export function putUsers(req, res)  {
    res.json({ message: "Put request" });
};

export function deleteUsers(req, res)  {
    res.json({ message: "delete request" });
};


export function loginUsers(req, res) {
    const credentials = req.body;

    // Find the user by email
    User.findOne({ email: credentials.email }).then(
        (user) => {
            if (user == null) {
                res.status(401).json({ message: "Invalid credentials" });
            } else {
                // Compare the provided password with the stored hash
                const isPasswordCorrect = bcrypt.compareSync(credentials.password, user.password);

                if (!isPasswordCorrect) {
                    res.status(401).json({ message: "Invalid credentials" });
                } else {
                    const payload = {
                        email: user.email,
                        firstName: user.firstName,
                        user: user.type,
                    };

                    // Generate a JWT token
                    const token = jwt.sign(payload,process.env.JWT_SECRET , { expiresIn: "72h" });

                    res.json({
                        message: "Success",
                        user: user,
                        token: token,
                    });
                }
            }
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: "Server error", error: err });
        }
    );
};
