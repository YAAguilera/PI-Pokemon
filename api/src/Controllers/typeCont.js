const axios=require("axios")

const getTypes= async(req, res)=>{
    try {
        //get url de types
        const response=await axios.get("https://pokeapi.co/api/v2/type")
        //hace un mapeo de los nombres de los types, para devolverlos en un array
        const types=response.data.results.map((type)=>type.name)
        return types
    } catch (error) {
        console.error(error)
    }
    
}
module.exports=getTypes