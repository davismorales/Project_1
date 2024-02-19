package com.api.dateDiff.controller;

import java.lang.reflect.InvocationTargetException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.dateDiff.model.CalcDiffResult;
import com.api.dateDiff.service.DateDiffWebServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.mybatis.datediff.model.DateDiff;

@RestController
@RequestMapping(value = "/dateDiff")
public class DateDiffWebController {
	@Autowired
	DateDiffWebServiceImpl dateDiffWebServiceImpl;

	@RequestMapping(value = "/calcDiff", method = RequestMethod.POST, consumes = { "application/json" })
	public CalcDiffResult calcDiff(@RequestBody DateDiff dateDiff) throws IllegalAccessException, InvocationTargetException, JsonMappingException, JsonProcessingException {
		return dateDiffWebServiceImpl.calculateDifference(dateDiff);
	}

}
