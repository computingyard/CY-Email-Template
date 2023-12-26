const company = "Computing Yard";
const website = "https://computingyard.com"

exports.getText = (firstName, lastName) => `
Hi ${firstName + " " + lastName},\n
Thank you for contacting ${company}. Our team looks forward to
addressing your inquiry promptly. We typically respond to requests
within 48 hours during normal business days.
\n
\n
If you would like to learn more about our products / services, please
visit our website at ${website}
`;

exports.getSubscribeText = (name) =>
  `Dear ${name},\n
  Thank you for expressing your interest in ${company} and your desire to stay informed about our latest developments and updates.
  We appreciate your engagement with our brand and are excited to keep you in the loop.\n
At ${company}, we are committed to delivering valuable insights, news, and announcements to our valued subscribers.
\n
\n
If you would like to learn more about our products / services, please
visit our website at ${website}`;

exports.getHTML = ({ firstName, lastName, email }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${company}</title>
  </head>

  <body
    style="
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 37em;
      width: 46em;
    "
  >
    <style>
      .footer {
        color: #000;
        padding: 15px;
        display: flex !important;
        flex-direction: column !important;
        text-align: center !important;
      }

      .logoMain {
        color: #000;
        display: flex !important;
        margin-top: 20px;
      }

      .temp {
        color: #000;
        display: flex;
        margin-left: 225px;
        margin-top: -20px;
      }

      .testing {
        color: #000;
        text-align: center !important;
        margin-top: -30px;
      }
    </style>

    <div style="height: 530px">
      <div
        class="logoMain"
        style="display: flex; margin-left: 100px; margin-top: 20px"
      >
        <img
          src="https://computingyard.com/assets/images/logo1_100x100.png"
          style="width: 300px; height: 60px; object-fit: contain"
        />
      </div>
      <div>
        <p
          style="
            color: #000;
            font-family: Arial, Helvetica, sans-serif !important;
            font-weight: 600 !important;
            justify-content: center;
            align-items: center;
            text-align: justify;
            padding: 21px;
          "
        >
          ${email ? `Dear ${email}` : `Hi ${firstName + " " + lastName}`},
          <br />
          <br />
          ${email
    ? `<span style="color: #f57e20">Thank you</span> for expressing your interest
          in <span style="color: #f57e20">${company}</span> and your desire to
          stay informed about our
          <span style="color: #f57e20">latest developments</span> and
          <span style="color: #f57e20">updates</span>. We appreciate
          <span style="color: #f57e20">your engagement</span> with our brand and are
          excited to keep you in the loop.
          <br />
          <br />
          At <span style="color: #f57e20">${company}</span>, we are committed
          to delivering valuable insights, news, and announcements to our
          <span style="color: #f57e20">valued subscribers</span>.`
    : `<span style="color: #f57e20">Thank you</span> for contacting
          <span style="color: #f57e20">${company}</span>. Our team looks
          forward to addressing your inquiry promptly. We typically respond to
          requests within 48 hours during normal business days.`
  }
          <br />
          <br />
          If you would like to learn more about our products / services, please
          <a href="${website}" style="color: #f57e20"
            >visit</a
          >
          our website.
        </p>
      </div>

      <div class="footer">
        <div class="testing" style="margin-top: -30px">
          <p
            style="
              color: #000;
              font-family: Arial, Helvetica, sans-serif !important;
              font-weight: 600 !important;
              justify-content: center;
              align-items: center;
              text-align: center;
              padding: 21px;
            "
          >
            <br />
            Copyright <span style="color: #f57e20">©</span> ${new Date().getFullYear()}
            <span style="color: #f57e20">${company}</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
      <div
        class="temp"
        style="display: flex; margin-left: 225px; margin-top: -20px"
      >
        <a href="https://www.facebook.com/computingyard"
          ><img
            src="https://icons.iconarchive.com/icons/hopstarter/rounded-square/256/Social-Network-Facebook-icon.png"
            style="height: 35px; width: 35px"
        /></a>
        &nbsp;<a href="https://www.linkedin.com/company/computingyard/"
          ><img
            src="https://icons.iconarchive.com/icons/graphics-vibe/simple-rounded-social/256/linkedin-icon.png"
            style="height: 35px; width: 35px"
        /></a>
        &nbsp;<a href="mailto:info@computingyard.com"
          ><img
            src="https://icons.iconarchive.com/icons/graphicloads/100-flat/256/email-2-icon.png"
            style="height: 35px; width: 35px"
        /></a>
      </div>
    </div>
  </body>
</html>
`;
