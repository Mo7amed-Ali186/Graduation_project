import jwt from "jsonwebtoken";
export const generateToken = ({
    payload = {},
    signature = process.env.TOKEN_SIGNATURE,
    expiresIn = 60 * 60 * 8,
} = {}) => {
    const token = jwt.sign(payload, signature, {
        expiresIn: parseInt(expiresIn),
    });
    return token;
};

export const verifyToken = ({ token, signature } = {}) => {
    const decoded = jwt.verify(token, signature);
    return decoded;
};
