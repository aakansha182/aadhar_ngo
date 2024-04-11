const db=require('../models')
const Event= db.event;
const multer=require('multer');
const path=require('path');
const file=require('file');
// const upload=multer({file:file,reeolveWithFullPath:true,storage:storage.disk()});

const addEvent=async (req,res)=>{
console.log(req.body)
console.log(req.file)
   try{ let details={
        ename:req.body.ename,
        catagory:req.body.catagory,
        description:req.body.description,
        image:req.file.path
    }
    const eventresp=await Event.create(details)
    console.log(eventresp.toJSON());
    res.status(200).send(eventresp);
}catch(err){console.log(err)}
}

const getAllEvents=async(req,res)=>{
    const resp=await Event.findAll({})
    res.status(200).send(resp);
}

const updateEvent=async(req,res)=>{
    try{ let details={
        ename:req.body.ename,
        catagory:req.body.catagory,
        description:req.body.description,
        image:req.file.path
    }
    let id=req.params.id;
    const resp=await Event.update(details,{where:{id : id}})
    res.status(200).send(resp);
    }catch(e){
        console.log(e);
    }
}
const getOneEvent=async(req,res)=>{
    let id=req.params.id;
    console.log("in get event",id)
    const resp=await Event.findOne({where:{id : id}})
    console.log(resp)
    res.status(200).send(resp);
}


const deleteEvent=async(req,res)=>{
    let id = req.params.id;
    const resp=await Event.destroy({where:{id:id}})
    res.status(200).send({msg:"successfully deleted"});
}

//multer images upload
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

//for multiple images use->> .array('images',3); 3->num of images
module.exports={
    addEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    uploadimage,
    getOneEvent
};