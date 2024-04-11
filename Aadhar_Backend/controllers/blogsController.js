const db=require('../models')
const Blog= db.blog;
const multer=require('multer');
const path=require('path');

const stroage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'Images')
    },filename:(req,file,cb)=>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const uploadimage=multer({
    storage:stroage,
    limits:{fileSize: '5000000'},
    fileFilter:(req,file,cb)=>{
        const fileTypes=/jpg|jpeg|png|gif/
        const mimeType=fileTypes.test(file.mimetype)
        const extname=fileTypes.test(path.extname(file.originalname))
        if(mimeType && extname){
            return cb(null,true)
        }
        cb('Give proper files format to upload')
    }
}).single('image')


const addBlog=async (req,res)=>{
    console.log(req.body)
    console.log(req.file)
       try{ let details={
            title:req.body.title,
            category:req.body.category,
            description:req.body.description,
            image:req.file.path
        }
        const blogresp=await Blog.create(details)
        console.log(blogresp.toJSON());
        res.status(200).send(blogresp);
    }catch(err){console.log(err)}
    }

    const getAllBlogs=async(req,res)=>{
        const resp=await Blog.findAll({})
        res.status(200).send(resp);
    }

    const updateBlog=async(req,res)=>{
        try{ let details={
            title:req.body.title,
            category:req.body.category,
            description:req.body.description,
            image:req.file.path
        }
        let id=req.params.id;
        const resp=await Blog.update(details,{where:{id : id}})
        res.status(200).send(resp);
        }catch(e){
            console.log(e);
        }
    }
    const getOneBlog=async(req,res)=>{
        let id=req.params.id;
        console.log("in get Blog",id)
        const resp=await Blog.findOne({where:{id : id}})
        console.log(resp)
        res.status(200).send(resp);
    }
    
    
    const deleteBlog=async(req,res)=>{
        let id = req.params.id;
        const resp=await Blog.destroy({where:{id:id}})
        res.status(200).send({msg:"successfully deleted"});
    }

    module.exports = {
        addBlog,
        uploadimage,
        getAllBlogs,
        updateBlog,
        getOneBlog,
        deleteBlog

    }