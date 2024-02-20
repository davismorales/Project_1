package com.api.nbaApi.service;

import org.springframework.stereotype.Service;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;


@Service
public class NbaApiWebServiceImpl {

	public String getPlayers() {
		HttpResponse<String> response = Unirest.get("https://api-nba-v1.p.rapidapi.com/players?season=2023")
			.header("X-RapidAPI-Key", "69d2a15b99msha85cb38973dc1bbp13505ajsnb87ce882d69b")
			.header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
			.asString();

		return response.getBody();
	}

}
