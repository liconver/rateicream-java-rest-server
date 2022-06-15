package com.controllers;


import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.social.connect.Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.oauth2.AccessGrant;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DAOs.UserRepository;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.models.Users;

import ch.qos.logback.core.net.SyslogOutputStream;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class AuthController {
	
	final String CLIENT_ID = "189931351381-tgc64ldgqtla91ih0gac6b5rb94c1i1e.apps.googleusercontent.com";
	final String APP_ID = "236468527448875";
	final String APP_SECRET = "3e55052c5112e30f382a5ca42f7b35e9";
	private final UserRepository repository;
	
	AuthController(UserRepository repository){
		this.repository = repository;
	}
	
	@PostMapping("/token")
	public Map validateToken(@RequestBody Map token) {
		Map response = new HashMap<String, String>();
		response.put("token", "");
		System.out.println(token);
		String idTokenString = (String) token.get("token");
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
			    // Specify the CLIENT_ID of the app that accesses the backend:
			    .setAudience(Collections.singletonList(CLIENT_ID))
			    // Or, if multiple clients access the backend:
			    //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
			    .build();

			// (Receive idTokenString by HTTPS POST)

			GoogleIdToken idToken;
			try {
				idToken = verifier.verify(idTokenString);
				if (idToken != null) {
					  Payload payload = idToken.getPayload();
					  System.out.println(payload);
					  // Print user identifier
					  String userId = payload.getSubject();
					  System.out.println("User ID: " + userId);

					  // Get profile information from payload
					  String email = payload.getEmail();
					  boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
					  String name = (String) payload.get("name");
					  String pictureUrl = (String) payload.get("picture");
					  String locale = (String) payload.get("locale");
					  String familyName = (String) payload.get("family_name");
					  String givenName = (String) payload.get("given_name");

					  // Use or store profile information
					  // ...
					  Users currUser = repository.findBySocialId(userId).orElseGet( () -> {
						Users newUser = new Users();
						newUser.setSocialId(userId);
						return repository.save(newUser);
					  });
					  
					  response.put("token", "valid");
					  response.put("id", currUser.getUserId());
					  return response;
					} else {
					  System.out.println("Invalid ID token.");
					  response.put("token", "invalid");
					  return response;
					}
			} catch (GeneralSecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
		return response;
	}
	
	@PostMapping("/fbtoken")
	public Map validateFbToken(@RequestBody Map token) {
		Map response = new HashMap<String, String>();
		String idTokenString = (String) token.get("token");
		AccessGrant accessor = new AccessGrant(idTokenString);
		FacebookConnectionFactory factory = new FacebookConnectionFactory(APP_ID, APP_SECRET );
		try {
			Connection<Facebook> connection = factory.createConnection(accessor);
			Facebook facebook = connection.getApi();
			String[] fields = { "id", "email", "first_name", "last_name" };
			User userProfile = facebook.fetchObject("me", User.class, fields);
			if (userProfile.getId() != null) {
				String fbId = userProfile.getId();
				System.out.println(userProfile.getFirstName()+" "+userProfile.getLastName()+" "+
						userProfile.getEmail());
				Users currUser = repository.findBySocialId(fbId).orElseGet( () -> {
					Users newUser = new Users();
					newUser.setSocialId(fbId);
					return repository.save(newUser);
				  });
				response.put("token", "valid");
				  response.put("id", currUser.getUserId());
				  return response;
			} else {
				System.out.println("Invalid ID token.");
				  response.put("token", "invalid");
				  return response;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
		

	}

}
