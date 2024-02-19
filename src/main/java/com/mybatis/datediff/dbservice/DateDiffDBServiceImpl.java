package com.mybatis.datediff.dbservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mybatis.datediff.mapper.DateDiffMapper;
import com.mybatis.datediff.model.DateDiff;

@Component
public class DateDiffDBServiceImpl {

	@Autowired
	private DateDiffMapper dateDiffMapper;

	public void calcDiff(DateDiff dateDiff) {
		dateDiffMapper.insert(dateDiff);
	}

}
