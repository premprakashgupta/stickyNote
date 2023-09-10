const generateToken = (data, statusCode, res, msg) => {
  try {
    const token = data.getJwtToken();

    const options = {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_EXPAIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
      _id: data._id,
      message: msg,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = generateToken;
