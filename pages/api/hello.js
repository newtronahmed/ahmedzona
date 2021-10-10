import db from '../../utils/db'
 async function handler (req,res){

    res.status(200).json({message:"hello from the server"})
}
export default db.connect(handler)