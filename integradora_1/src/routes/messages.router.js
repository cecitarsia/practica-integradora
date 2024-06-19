import { Router } from 'express';

const router = Router()

router.get('/', (req,res) => {
    res.render('chat', {})
  })

router.post("/",async(req,res)=>{
    res.send("algo")
})

router.put("/",async(req,res)=>{
    res.send("algo")
})

router.delete("/",async(req,res)=>{
    res.send("algo")
})


export default router