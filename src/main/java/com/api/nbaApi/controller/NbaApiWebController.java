package com.api.nbaApi.controller;

import java.lang.reflect.InvocationTargetException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.nbaApi.model.PlayerSearchByTeam;
import com.api.nbaApi.service.NbaApiWebServiceImpl;

@RestController
@RequestMapping(value = "/nbaApi")
public class NbaApiWebController {
	@Autowired
	NbaApiWebServiceImpl nbaApiWebServiceImpl;

	@RequestMapping(value = "/getPlayers", method = RequestMethod.POST, consumes = { "application/json" })
	public String getPlayers(@RequestBody PlayerSearchByTeam team) throws IllegalAccessException, InvocationTargetException {
		return nbaApiWebServiceImpl.getPlayers(team.getTeamId());
	}

	@RequestMapping(value = "/getTomorrowGames")
	public String getTomorrowGames() throws IllegalAccessException, InvocationTargetException {
		String result = nbaApiWebServiceImpl.getTomorrowGames();
		return result;
	}
}
