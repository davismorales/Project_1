package com;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//This file is only needed when running React npm server on Port 3000
//	and still want to run routes to Spring Boot server on Port 8080
@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {

		registry.addMapping("/**").exposedHeaders("Access-Control-Allow-Origin").allowedOrigins("http://localhost:3000");
	}

}
