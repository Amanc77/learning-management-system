import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "365d",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true, // required for HTTPS
      sameSite: "none", // allows cross-domain
      maxAge: 24 * 60 * 60 * 365 * 1000,
    })
    .json({
      success: true,
      message,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  return token;
};
