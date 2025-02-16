import GalleryItem from "../models/galleryItem.js";


export function createGalleryItems(req, res)  {
    const user = req.user

    if (user == null) {
        res.status(401).json({message : "Please login to create gallery item"

        })
        return
    }

    if (user.type != "admin") {
        res.status(401).json({
            message : "Only admin can create gallery item"
        });
        return
    }
    

    

    const galleryItem = req.body.item;

    const newGalleryItem = new GalleryItem(galleryItem)
    newGalleryItem.save().then(
        ()=>
        {
            res.json({
                message : "gallery item created successfully"
            });
        }
    ).catch(
        ()=>
        {
            res.status(500).json({message : "gallery item creation failed"});
        }
    )
}



export function getGalleryItems(req, res)  {
    GalleryItem.find().then(
        (galleryItemsList)=>
        {
            res.json({list : galleryItemsList});
        }
    )
}