import category from "../models/catagory.js";

export function createCategories(req, res)  {
    if(req.user == null){
        res.status(401).json({
            massage : "Unauthorized"
        })
        return
    }
    if(req.user.type != "admin"){
        res.status(403).json({
            massage : "Only admin can create category"
        })
        return
    }

    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>
        {
            res.json({
                message : "category created successfully",
                result : result
            });
        }
    ).catch(
        (err)=>
        {
            res.json({
                message : "category creation failed",
                error : err
                
            });
        }
    )
}