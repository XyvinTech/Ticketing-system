require("dotenv").config();
const { EMAIL_ID, PASSWORD } = process.env;
const nodemailer = require("nodemailer");
const sendMail = async (receiverMail, ticketObject, role) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ID,
        pass: PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_ID,
      to: receiverMail,
      subject: "You Have New Ticket today!",
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        </head>
        <body style="font-family: Inter">
          <div>
            <div class="header">
              <img
                src="https://image-upload-oxium.s3.ap-south-1.amazonaws.com/users/acute.png"
                width="64px"
                height="56px"
              />
              <h1 style="font-weight: 400">You Have New Ticket today!</h1>
            </div>
            <div style="font-weight: 400; font-size: 16px">
              <p style="padding-top: 10px; padding-bottom: 25px">Dear,</p>
              <p>
                We are glad to inform you that you have a new ticket from one of Your client
                <a style="color: #9d46d9; text-decoration: none" href=${ticketObject.mail}
                  >${ticketObject.mail}</a
                >
              </p>
            </div>
            <a
              href=${"http://localhost:3000/" + role + "/SingleTicket/" + ticketObject._id}
              target="_blank"
              style="
                background-color: #9d46d9;
                color: #fff;
                padding: 10px 20px;
                border-radius: 25px;
                text-decoration: none;
                margin: 20px 0;
              "
              >Track Ticket</a
            >
            <br />
            <br />
            <hr />
            <div style="color: #999999; font-size: 14px; font-weight: 400">
              Note
              <br />
              <br />
              You can refuse to accept a shipment if the outer packaging is
              tampered/damaged//torn/pressed/disturbed. Please mention the same reason on the POD slip.
              For questions, you can reach out to us at
              <span>
                <a style="color: #9d46d9; text-decoration: none" href=${ticketObject.mail}
                  >${ticketObject.mail}</a
                ></span
              >
              <div style="color: #333333">
                <p style="font-size: 16px; font-weight: 400; margin-bottom: 0">Best Regards,</p>
                <p style="font-size: 20px; font-weight: 500; margin: 0">Team Acute</p>
              </div>
            </div>
            <div>
              <p style="color: #9d46d9; font-size: 16px; font-weight: 500">Ticket Details</p>
              <p style="color: #999999; font-size: 14px; font-weight: 400">
                This is a system generated message. Do not reply.
              </p>
            </div>
            <div
              style="padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
            >
              <h2 style="font-size: 20px; font-weight: 600">We have an error in app</h2>
              <p style="font-size: 12px; font-weight: 400">
                #${ticketObject.ticket_Id} | ${ticketObject.updatedAt} | 
                ${ticketObject.priority} | ${ticketObject.department}
              </p>
              <div style="margin: 30px 0; color: #374151; font-size: 11px; font-family: 400">
              ${ticketObject.description}
              </div>
            </div>
            <br />
            <br />
            <hr />
            <div class="icons">
              <a href="http://example.com"
                ><img
                  src="https://image-upload-oxium.s3.ap-south-1.amazonaws.com/users/x.png"
                  alt="Icon 1"
                  width="22"
                  height="18"
                  style="margin: 0 10px;"
              /></a>
              <a href="http://example.com"
                ><img
                  src="https://image-upload-oxium.s3.ap-south-1.amazonaws.com/users/facebook.png"
                  alt="Icon 2"
                  width="18"
                  height="18"
                  style="margin: 0 10px;"
              /></a>
              <a href="http://example.com"
                ><img
                  src="https://image-upload-oxium.s3.ap-south-1.amazonaws.com/users/linkedin.png"
                  alt="Icon 3"
                  width="18"
                  height="18"
                  style="margin: 0 10px;"
              /></a>
            </div>
            <div style="color: #999999; font-size: 12px; font-weight: 400; padding: 20px 0">
              Copyright &copy; 2024 Acute .
              <br />
              A better company begins with a support experience.
            </div>
          </div>
        </body>
      </html>      
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("🚀 ~ Email sent: ~ response: " + info.response);
      }
    });
  } catch (error) {
    console.log("🚀 ~ sendMail ~ error:", error);
  }
};

module.exports = sendMail;
