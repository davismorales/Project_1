import './App.css';
import {useState} from 'react';

function App() {
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [fromTime, setFromTime] = useState()
  const [toTime, setToTime] = useState()
  const [returnData, setReturnData] = useState(null)

  async function dateDiff() {
    var formData = {
      fromDate: fromDate,
      toDate: toDate,
      fromTime: fromTime,
      toTime: toTime
    }
  
    await fetch('/dateDiff/calcDiff', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        setReturnData(data)
      });
  }

  return (
    <div id="dateTime" class="container">
      <div class="row" >
        <div align="center" class="form-group col-md-3 col-sm-3 ">
          <label class="control-label" title="Enter From Date">
          From Date: (yyyy-MM-dd)&nbsp;
          </label>
          <input class="col form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /> 
        </div>
        <div align="center" class="form-group col-md-3 col-sm-3">
          <label class="control-label" title="Enter From Date">
          From Time: (HH:mm:ss)&nbsp;
          </label>
          <input class="col form-control" value={fromTime} onChange={(e) => setFromTime(e.target.value)} /> 
        </div>
        
        <div align="center" class="form-group col-md-3 col-sm-3">
          <label class="control-label" title="Enter To Date">
          To Date: (yyyy-MM-dd)&nbsp;
          </label>
          <input class="col form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} /> 
        </div>
        <div align="center" class="form-group col-md-3 col-sm-3">
          <label class="control-label" title="Enter To Date">
          To Time: (HH:mm:ss)&nbsp;
          </label>
          <input class="col form-control" value={toTime} onChange={(e) => setToTime(e.target.value)} /> 
        </div>
      </div>
      
      <div class="row col-md-12 col-sm-12 justify-content-center" style={{width: "100%"}} >
          <button onClick={dateDiff} type="submit" class="btn btn-xs ui-state-default form-control" style={{alignItems:"center"}} title="Click to calculate difference">
              <strong>Calculate Difference</strong>
          </button>
      </div>
      { returnData !== null &&
      <div class="row form-group col-md-12 col-sm-12 justify-content-center results" align="center">
        <div class="row form-group col-md-12 col-sm-12  justify-content-center" align="center">
          <label class="control-label justify-content-center">
            {returnData.years}
          </label>
        </div>
        <div class="row form-group col-md-12 col-sm-12  justify-content-center" align="center">
          <label class="control-label justify-content-center">
            {returnData.months}
          </label>
        </div>
        <div class="row form-group col-md-12 col-sm-12  justify-content-center" align="center">
          <label class="control-label justify-content-center">
            {returnData.days}
          </label>
        </div>
        <div class="row form-group col-md-12 col-sm-12  justify-content-center" align="center">
          <label class="control-label justify-content-center">
            {returnData.hours}
          </label>
        </div>
        <div class="row form-group col-md-12 col-sm-12  justify-content-center" align="center">
          <label class="control-label justify-content-center">
            {returnData.minutes}
          </label>
        </div>
        <div class="row form-group col-md-12 col-sm-12  justify-content-center" align="center">
          <label class="control-label justify-content-center">
            {returnData.seconds}
          </label>
        </div>
      </div>
      }
    </div>
  );
}


export default App;
