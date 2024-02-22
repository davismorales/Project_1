package com.api.nbaApi.controller;

import java.lang.reflect.InvocationTargetException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.nbaApi.service.NbaApiWebServiceImpl;
import com.mybatis.datediff.model.DateDiff;

@RestController
@RequestMapping(value = "/nbaApi")
public class NbaApiWebController {
	@Autowired
	NbaApiWebServiceImpl nbaApiWebServiceImpl;

	@RequestMapping(value = "/getPlayers", method = RequestMethod.POST, consumes = { "application/json" })
	public String getPlayers(@RequestBody DateDiff dateDiff) throws IllegalAccessException, InvocationTargetException {
		return nbaApiWebServiceImpl.getPlayers();
	}

	@RequestMapping(value = "/getTomorrowGames")
	public String getTomorrowGames() throws IllegalAccessException, InvocationTargetException {
		String result = nbaApiWebServiceImpl.getTomorrowGames();
		return result;
	}
}
