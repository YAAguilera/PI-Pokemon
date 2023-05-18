const {Router}=require ("express")
const router=Router()
const getTypes=require("../Controllers/typeCont")
const {Type}=require("../db")

router.get("/", async(req, res)=>{
    try {
        //si el type eciste en la BDD
        const typesDB=await Type.findAll()

        if(typesDB.length>0){
            //mapeo type para que me devuelva los typename
            const types=await typesDB.map((type)=>type.name)
            res.status(200).json(types)
        }
        //Si no existe en la BDD busca en la API, para obtener los types
        else{
            const typesAPI=await getTypes();
            //para cada tipo obtenido de la API, se crea un registro en la base de datos usando el método create y devuelve el typename
            const types=await Promise.all(typesAPI.map(async(typename)=>{
                const type=await Type.create({name:typename})
                return type.name
            }))
            res.status(200).json(types)
        }
    } catch (error) {
        console.error(error)
        res.status(400).json("server error")      
    }
})

module.exports=router