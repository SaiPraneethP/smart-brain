const handleProfile=(req, res,db) => {
    const { id } = req.params
    let found = false;
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        //console.log(user)
        if (user.length) { res.json(user[0]); }
        else { res.status(400).json('Not found') }
    }).catch(err => { res.status(400).json('error') })
    // if (!found) {
    //     res.status(404).json("User not Found :( ")
    // }
}

module.exports={
    handleProfile
}