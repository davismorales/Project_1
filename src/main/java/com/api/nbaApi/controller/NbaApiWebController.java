package com.api.nbaApi.controller;

import java.lang.reflect.InvocationTargetException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.nbaApi.service.NbaApiWebServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.mybatis.datediff.model.DateDiff;

@RestController
@RequestMapping(value = "/dateDiff")
public class NbaApiWebController {
	@Autowired
	NbaApiWebServiceImpl nbaApiWebServiceImpl;

	@RequestMapping(value = "/getPlayers", method = RequestMethod.POST, consumes = { "application/json" })
	public String getPlayers(@RequestBody DateDiff dateDiff) throws IllegalAccessException, InvocationTargetException, JsonMappingException, JsonProcessingException {
		return nbaApiWebServiceImpl.getPlayers();
	}

}
