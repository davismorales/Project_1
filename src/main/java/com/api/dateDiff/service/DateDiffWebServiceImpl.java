package com.api.dateDiff.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.dateDiff.model.CalcDiffResult;
import com.mybatis.datediff.dbservice.DateDiffDBServiceImpl;
import com.mybatis.datediff.model.DateDiff;

@Service
public class DateDiffWebServiceImpl {

	@Autowired
	DateDiffDBServiceImpl dateDiffDBService;

	public CalcDiffResult calculateDifference(DateDiff dateDiff) {
		CalcDiffResult result = new CalcDiffResult();
		try {
			String date1 = dateDiff.getFromDate() + " " + dateDiff.getFromTime();
			String date2 = dateDiff.getToDate() + " " + dateDiff.getToTime();
			LocalDateTime from = LocalDateTime.parse(date1, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
			LocalDateTime to = LocalDateTime.parse(date2, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

			if (from.isAfter(to)) {
				LocalDateTime temp = to;
				to = from;
				from = temp;
			}

			LocalDateTime fromTemp = LocalDateTime.from(from);

			long years = fromTemp.until(to, ChronoUnit.YEARS);
			dateDiff.setYears(years);
			result.setYears("Years:\t\t" + dateDiff.getYears());
			fromTemp = fromTemp.plusYears(dateDiff.getYears());

			long months = fromTemp.until(to, ChronoUnit.MONTHS);
			dateDiff.setMonths(months);
			result.setMonths("Months:\t\t" + dateDiff.getMonths());
			fromTemp = fromTemp.plusMonths(dateDiff.getMonths());

			long days = fromTemp.until(to, ChronoUnit.DAYS);
			dateDiff.setDays(days);
			result.setDays("Days:\t\t" + dateDiff.getDays());
			fromTemp = fromTemp.plusDays(dateDiff.getDays());

			long hours = fromTemp.until(to, ChronoUnit.HOURS);
			dateDiff.setHours(hours);
			result.setHours("Hours:\t\t" + dateDiff.getHours());
			fromTemp = fromTemp.plusHours(hours);

			long minutes = fromTemp.until(to, ChronoUnit.MINUTES);
			dateDiff.setMinutes(minutes);
			result.setMinutes("Minutes:\t" + minutes);
			fromTemp = fromTemp.plusMinutes(minutes);

			long seconds = fromTemp.until(to, ChronoUnit.SECONDS);
			dateDiff.setSeconds(seconds);
			result.setSeconds("Seconds:\t" + seconds);
			fromTemp = fromTemp.plusSeconds(seconds);

			dateDiffDBService.calcDiff(dateDiff);

			result.setResult(String.format("\nYears:\t\t%s\nMonths:\t\t%s\nDays:\t\t%s<br>Hours:\t\t%s<hr>Minutes:\t%s<hr>Seconds:\t%s", years, months, days, hours, minutes, seconds));
			return result;
		} catch (Exception e) {
			System.out.println(e);
			result.setResult("\nIncorrect Input. Must be in ISO Date Format: 'yyyy-MM-dd HH:mm:ss'");
			result.setYears("\nIncorrect Input. Must be in ISO Date Format: 'yyyy-MM-dd HH:mm:ss'");
			return result;
		}
	}

}
