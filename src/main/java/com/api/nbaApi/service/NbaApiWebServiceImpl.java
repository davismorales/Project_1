package com.api.nbaApi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.api.nbaApi.model.PlayerSearchByTeam;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;


@Service
public class NbaApiWebServiceImpl {

	@Value("${authentication.rapidAPIKey}")
	private String rapidAPIKey;

	public String getPlayers(String teamId) {
		HttpResponse<String> response = Unirest.get("https://api-nba-v1.p.rapidapi.com/players?team="+teamId+"&season=2023")
			.header("X-RapidAPI-Key", rapidAPIKey)
			.header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
			.asString();

		return response.getBody();
	}

	public String getTomorrowGames() {
		HttpResponse<String> response = Unirest.get("https://api-nba-v1.p.rapidapi.com/games?date=2024-01-13")
		.header("X-RapidAPI-Key", rapidAPIKey)
		.header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
		.asString();

		return response.getBody();
	}

}
