const nodemailer = require("nodemailer");
const axios = require("axios"); // If not already imported
const Imap = require("imap"); // If not already imported
const MailParser = require("mailparser").MailParser;
const sendEmail = (req, res) => {
  console.log(req.body);
  const { email, password, receiver, subject, text } = req.body;

  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email, // sender's email
      pass: password, // sender's password
    },
  });

  // Email message options
  const mailOptions = {
    from: email, // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to send email." });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully." });
    }
  });
};
const getEmail = async (req, res) => {
  const imapConfig = {
    user: "janakovaion@gmail.com",
    password: "fmvcncjhacikrsfv",
    host: "imap.gmail.com",
    port: "993",
    tls: false,
  };

  const imap = new Imap(imapConfig);

  function openInbox(cb) {
    imap.openBox("INBOX", true, cb);
  }
  const response = await new Promise((resolve, reject) => {
    imap.once("ready", function () {
      openInbox(function (err, box) {
        if (err) {
          reject(err); // Reject the promise if there's an error
          return; // Exit the function
        }

        const currentTime = new Date(Date.now() - 60000);
        const searchCriteria = [["SENTSINCE", currentTime]];

        imap.search(searchCriteria, async function (err, results) {
          if (err) {
            reject(err); // Reject the promise if there's an error
            return; // Exit the function
          }

          const fetchOptions = {
            bodies: "",
            markSeen: true,
          };

          const emails = []; // Initialize emails array
          let processedMessages = 0; // Initialize processedMessages counter
          let totalMessages = 0; // Initialize totalMessages counter

          try {
            const filteredResults = [];
            for (const seqno of results) {
              const fetch = imap.fetch(seqno, {
                bodies: ["HEADER.FIELDS (DATE)"],
              });
              const headers = await new Promise((resolve, reject) => {
                fetch.on("message", function (msg, seqno) {
                  msg.on("body", function (stream, info) {
                    let buffer = "";
                    stream.on("data", function (chunk) {
                      buffer += chunk.toString("utf8");
                    });
                    stream.on("end", function () {
                      const headers = Imap.parseHeader(buffer);
                      resolve(headers);
                    });
                  });
                });
                fetch.on("error", function (err) {
                  reject(err); // Reject the promise if there's an error
                });
              });

              const date = new Date(headers.date[0]);
              if (date > new Date(currentTime)) {
                filteredResults.push(seqno);
              }
            }

            totalMessages = filteredResults.length;

            const fetch = imap.fetch(filteredResults, fetchOptions);
            fetch.on("message", function (msg, seqno) {
              const mailParser = new MailParser();
              const emailData = {
                from: "",
                date: "",
                subject: "",
                body: "",
              };

              msg.once("body", function (stream, info) {
                let buffer = "";

                stream.on("data", function (chunk) {
                  buffer += chunk.toString("utf8");
                });

                stream.on("end", function () {
                  mailParser.write(buffer);
                  mailParser.end();
                });
              });

              mailParser.on("headers", function (headers) {
                const fromEmail = headers.get("from") || {};
                emailData.from = fromEmail?.value[0]?.address;

                // Format the date using toLocaleString()
                const date = new Date(headers.get("date")).toLocaleString();
                emailData.date = date || "No Date";

                emailData.subject = headers.get("subject");
              });

              mailParser.on("data", function (data) {
                if (data.type === "text" && data.path === undefined) {
                  // Exclude multipart alternative text sections
                  const confidentialInfo =
                    "This message contains confidential information";
                  if (data.text.includes(confidentialInfo)) {
                    const startIndex = data.text.indexOf(confidentialInfo);
                    emailData.body += data.text.substring(0, startIndex);
                  } else {
                    emailData.body += data.text;
                  }
                }
              });

              mailParser.on("end", function () {
                emails.push(emailData);

                processedMessages++;
                if (processedMessages === totalMessages) {
                  resolve(emails); // Resolve the promise with emails when all messages are processed
                }
              });
            });

            fetch.once("error", function (err) {
              reject(err); // Reject the promise if there's an error
            });
          } catch (error) {
            reject(error); // Reject the promise if there's an error
          }
        });
      });
    });

    imap.once("error", function (err) {
      reject(err); // Reject the promise if there's an error
    });

    imap.once("end", function () {
      // You may handle the end event if needed
    });

    imap.connect();
  });

  console.log(response, "response");

  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute < 10 ? "0" + minute : minute;
  const time = formattedHour + ":" + formattedMinute + " " + ampm;
  const emailsConverted = response?.map((elm) => {
    return {
      issuestatus: "Open",
      createduser: elm.from?.split("@")[0],
      reporteremail: elm.from,
      reporter: elm.from?.split("@")[0],
      createdTime: elm.date,
      createdBy: elm.from,
      projectId: null,
      title: elm.subject,
      description: elm.body,
      reporter: elm.from,
      creationdate: new Date(),
    };
  });
  console.log("Hello", response);

  res.status(200).json(emailsConverted);
};

module.exports = {
  sendEmail,
  getEmail,
};
