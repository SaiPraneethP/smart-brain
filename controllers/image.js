const Clarifai =require('clarifai')

const app = new Clarifai.App({
    apiKey: 'fdb6f198789744d0804576b90ecf5fbc'
  });

const handleApiCall=(req,res)=>{
    app.models
        .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input).then(data=>{
            //console.log(res.json(data))
             res.json(data);
        })
        .catch(err=>res.status(400).json('unable to work with API',err))
    }
const handleImage=(req, res,db) => {
    const { id } = req.body
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            //console.log(entries[0])
            res.json(entries[0]);
        }).catch(err => { res.status(400).json('Unable to get entries') })
}
module.exports={
    handleImage,
    handleApiCall
}