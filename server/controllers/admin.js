import Order from "../models/order";
import User from "../models/user";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);
export const orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
};

// export const orderStatus = async (req, res) => {
//   // console.log(req.body);
//   // return;
//   const { orderId, orderStatus } = req.body;

//   let updated = await Order.findByIdAndUpdate(
//     orderId,
//     { orderStatus },
//     { new: true }
//   ).exec();

//   res.json(updated);
// };



const sendEmailWithSES = (emailData) => {
  const params = {
    Source: emailData.from,
    Destination: {
      ToAddresses: [emailData.to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailData.html,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: emailData.subject,
      },
    },
  };

  return SES.sendEmail(params).promise();
};
export const orderStatus = async (req, res) => {
  try {

    const { orderId, orderStatus } = req.body;
    
    // console.log(user)
    // let email = user.orderedBy;
    let email = await Order.findById(
      orderId,
    ).exec();    
    let user = await User.findById(email.orderedBy).exec();
    // console.log("email ===> " + useremail)
    
    let updated = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).exec();
  
  
    const emailData = {
      from: "ruchir.shrikhande555@gmail.com",
      to: user.email,
      subject: "Order status",
      html: `
        <h1>Hi ${user.name}, Your order's status is: <span style="color:red;">${orderStatus}</span></h1>
        <p>Visit <a href="http://localhost:3000/user/history">your dashboard</a> for more details</p>
      `,
    };
    // console.log("emailData ===> " + JSON.stringify(emailData));
// return
    try {
      await sendEmailWithSES(emailData);
      res.json(updated);
    } catch (err) {
      console.log(err);
      // Handle any errors that occur while sending the email
      res.status(500).json({ error: "Failed to send email" });
    }
  } catch (err) {
    console.log(err);
  }
};
