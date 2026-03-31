const loginMR = (req, res, next) => {
    const { username, password } = req?.body;
    console.log(username,password)
    
    res.send('sucess')
}
module.exports = loginMR;