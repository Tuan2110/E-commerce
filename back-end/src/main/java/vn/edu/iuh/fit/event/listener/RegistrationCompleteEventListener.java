package vn.edu.iuh.fit.event.listener;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import vn.edu.iuh.fit.event.RegistrationCompleteEvent;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.services.impl.UserService;

@Slf4j
@Component
@RequiredArgsConstructor
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent>{
	private final UserService userService;
	private final JavaMailSender mailSender;
	private User user;
	@Value("${spring.mail.username}")
	private String fromEmail;
	@Override
	public void onApplicationEvent(RegistrationCompleteEvent event) {
		//1. Get the newly registered user
		user = event.getUser();
		//2. Create a verification token for the user
		String verificationToken  = UUID.randomUUID().toString();
		//3. Save the verification token for the user
		userService.saveUserVerificationToken(user,verificationToken);
		//4. Build the verification url to be sent to the user
		String url = event.getApplicationUrl()+"/api/v1/auth/verifyEmail?token="+verificationToken;
		//5. Send the email
		log.info("Click the link to verify your registration : {}",url);
		try {
			sendVerificationEmail(url);
		} catch (UnsupportedEncodingException | MessagingException e) {
			log.error("Error sending email to user : {}",user.getEmail());
		}
		
	}
	public void sendVerificationEmail(String url) throws UnsupportedEncodingException, MessagingException {
		try {
			String subject = "Email Verification";
			String senderName = "User Registration Portal Service";
			String content = "<p>Hi , "+user.getFirstName()+" </p>\r\n"
					+ "    <p>Thank you for registering with us.</p>\r\n"
					+ "    <a href=\""+url+"\">Verify your email to activate your account</a>\r\n"
					+ "    <p>Thank you User Registration</p>";
			MimeMessage message = mailSender.createMimeMessage();
			var messageHelper = new MimeMessageHelper(message);
			messageHelper.setFrom(fromEmail,senderName);
			messageHelper.setTo(user.getEmail());
			messageHelper.setSubject(subject);
			messageHelper.setText(content,true);
			mailSender.send(message);
		}catch (Exception e) {
			log.error("Error : {}",e.getMessage());
		}
	}

}
