//using MimeKit;
//using MailKit.Net.Smtp;
//using System.Threading.Tasks;
//using System.Web.Http;
//using System;

//namespace EmailApi.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiControll]
//    public class EmailController : ControllerBase
//    {
//        [HttpPost]
//        [Route("send")]
//        public async Task<IActionResult> SendEmailAsync([FromBody] EmailRequest emailRequest)
//        {
//            if (emailRequest == null)
//                return BadRequest("Invalid email request.");

//            var message = new MimeMessage();
//            message.From.Add(new MailboxAddress("Sender Name", "sender@example.com"));
//            message.To.Add(new MailboxAddress("Recipient Name", emailRequest.To));
//            message.Subject = emailRequest.Subject;

//            var builder = new BodyBuilder();
//            builder.HtmlBody = emailRequest.Body;

//            message.Body = builder.ToMessageBody();

//            using (var client = new SmtpClient())
//            {
//                try
//                {
//                    await client.ConnectAsync("smtp.example.com", 587, false);
//                    await client.AuthenticateAsync("your_username", "your_password");
//                    await client.SendAsync(message);
//                    await client.DisconnectAsync(true);

//                    return Ok("Email sent successfully.");
//                }
//                catch (Exception ex)
//                {
//                    return StatusCode(500, $"Error sending email: {ex.Message}");
//                }
//            }
//        }
//    }

//    public class EmailRequest
//    {
//        public string To { get; set; }
//        public string Subject { get; set; }
//        public string Body { get; set; }
//    }
//}
