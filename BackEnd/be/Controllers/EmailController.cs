using System;
using System.Net;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;

public class EmailController : ApiController
{
    string smtpServer = "smtp.gmail.com";
    int smtpPort = 587;
    string smtpUsername = "omkaradagale4883@gmail.com";
    string smtpPassword = "wjedzfysyfwnyupp";

    [EnableCors("*", "*", "*")]
    [HttpPost]
    public IHttpActionResult SendEmail([FromBody] string recipientEmail)
    {
        if (string.IsNullOrEmpty(recipientEmail) || !IsValidEmail(recipientEmail))
        {
            return BadRequest("A valid recipient email address is required.");
        }

        int Otp = GenerateRandomOTP();

        try
        {
            using (MailMessage message = new MailMessage())
            {
                message.From = new MailAddress(smtpUsername);
                message.To.Add(recipientEmail);
                message.Subject = "Verification Code";
                message.Body = $"Your verification code is: {Otp}. Please do not share this with anyone.";

                using (SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort))
                {
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                    smtpClient.EnableSsl = true;

                    smtpClient.Send(message);
                }
            }

            return Ok(Otp);
            //return Ok($"OTP sent to {recipientEmail} successfully!");
        }
        catch (Exception ex)
        {
            return InternalServerError(ex);
        }
    }

    private int GenerateRandomOTP()
    {
        Random random = new Random();
        return random.Next(1000, 10000);
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    [EnableCors("*", "*", "*")]
    [HttpPost]
    [Route("ContactUs")]
    public IHttpActionResult SendContact([FromBody] dynamic obj)
    {
        // "name":"","email":"","message":""
        string recipientEmail = obj.email;
        string recipientName = obj.name;

        if (string.IsNullOrEmpty(recipientEmail) || !IsValidEmail(recipientEmail))
        {
            return BadRequest("A valid recipient email address is required.");
        }

        try
        {
            using (MailMessage message = new MailMessage())
            {
                message.From = new MailAddress(smtpUsername);
                message.To.Add(recipientEmail);
                message.Subject = "Housing Society Enquiry";
                message.Body = $"Thank you {recipientName} for contacting us we will get back to you soon... Form Siddhivinayak Housing Society Satara";

                using (SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort))
                {
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                    smtpClient.EnableSsl = true;
                    smtpClient.Send(message);
                }
            }

            return Ok("Thank you for contacting us.");
            //return Ok($"OTP sent to {recipientEmail} successfully!");
        }
        catch (Exception ex)
        {
            return InternalServerError(ex);
        }
    }

}