const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-windymymy.byethost3.com-cat-a@";
/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req, res, next) => {
  
  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
  console.log(tokenFromClient);
  if (tokenFromClient) {
    
    try {
      
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
      
      req.jwtDecoded = decoded;
      
      next();
    } catch (error) {

      debug("Error while verify token:", error);
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}
module.exports = {
  isAuth: isAuth,
};