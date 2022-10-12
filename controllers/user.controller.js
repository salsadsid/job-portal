const { signupService, findUserByEmail } = require("../services/user.services")
const { generateToken } = require("../utils/token")

exports.signup = async (req, res, next) => {
    try {
        const user = await signupService(req.body)
        // const token = user.generateConfirmationToken();
        // await user.save({ validateBeforeSave: false })
        // const mailData = {
        //     to: [user.email],
        //     subject: "Verify your email",
        //     text: `Your account has been hacked. Thank you for creating an account. Please confirm your account here: ${req.protocol}://${req.get("host")}${req.originalUrl}/confirmation/${token}`
        // }


        // await sendMailWithMailgun(mailData)
        // sendMailWithGmail(mailData)
        res.status(200).json({
            status: "Success",
            message: "Successfully Sign Up"
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error,
        })
    }
}
/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: "Fail",
                message: "Please provide your credentials"
            })
        }

        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(401).json({
                status: "Fail",
                message: "No User found. Please create an account"
            })
        }
        const isPasswordValid = user.comparePassword(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "Fail",
                message: "Password is not correct"
            })
        }

        if (user.status != "active") {
            return res.status(401).json({
                status: "fail",
                error: "Your account is not active"
            })
        }

        const token = generateToken(user)

        const { password: pwd, ...other } = user.toObject()

        res.status(200).json({
            status: "Success",
            message: "Successfully Logged in",
            data: {
                user: other,
                token
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error,
        })
    }
}

exports.getMe = async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.user?.email)

        const { password: pwd, ...other } = user.toObject()
        res.status(200).json({
            status: "success",
            user: other
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error,
        })
    }
}

// exports.confirmEmail = async (req, res, next) => {
//     try {

//         const { token } = req.params
//         const user = await findUserByToken(token)

//         if (!user) {
//             return res.status(403).json({
//                 status: "Fail",
//                 error: "Invalid Token"
//             })
//         }
//         const expired = new Date() > new Date(user.confirmationTokenExpires)
//         if (expired) {
//             return res.status(401).json({
//                 status: "Fail",
//                 error: "Token Expired"
//             })
//         }
//         user.status = "active",
//             user.confirmationToken = undefined;
//         user.confirmationTokenExpires = undefined;

//         await user.save({ validateBeforeSave: false })

//         res.status(200).json({
//             status: "success",
//             message: "Successfully activate your account"
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             status: "Fail",
//             error,
//         })
//     }
// }