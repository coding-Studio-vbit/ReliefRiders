import React from 'react';
import './chooseRequest.css';
import ChooseRequestItem from './chooseRequestItem';'./chooseRequestItem';



const Testing=()=>{
     function sortByDate() {
        function comparisonByDate(dateA,dateB){
        var c = new Date(dateA.date);
        var d = new Date(dateB.date);
        return c - d;
        }
        requests.sort(comparisonByDate);
        console.log(requests.sort(comparisonByDate));
      }
   
      function sortByUrgency(){
          function comparisonByPriority(a,b){

              return a.priority - b.priority;
          }
          requests.sort(comparisonByPriority);
          console.log(requests.sort(comparisonByPriority));
      }
    

    return (
        <div>
        <div className="navbar">
          <div className="backbtn">
            <i className="fas fa-chevron-left"></i>
          </div>
          <h3>Requests</h3>
          <div className="dropdown">
            <button className="dropbtn">
              Order By
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdownContent">
              <button onClick={sortByDate}>Date</button>
              <p>Location</p>
              <button onClick={sortByUrgency}>Urgency</button>
            </div>
          </div>
        </div>
        {requests.length === 0 ? (
          <h3 className="noRequests"> There are no new requests</h3>
        ) : (
          <div className="wholeList">
            {requests.map((req) => {
              return <ChooseRequestItem key={req.requestNumber} data={req} />;
            })}
          </div>
        )}
      </div>
    );
}
export default Testing;
let requests = [{
    date: "7/7/2001",
    requestNumber: "12345",
    requesterID: "777777",
    requestStatus: "PENDING",
    requestType: "General",
    priority :"10",
    roughLocationCoordinates: [ 78.44764026931458,17.44209721721792],
    itemCategories: ["MEDICINES", "MISC"],
  
    dropLocationAddress: {
      addressLine: "6736BH",
      area: "SR Nagar",
      city: "Hyderabad",
    }},{
        date: "7/5/2021",
        requestNumber: "1245",
        requesterID: "727777",
        requestStatus: "PENDING",
        requestType: "General",
        priority :"5",
        roughLocationCoordinates: [ 78.44764026931458,17.44209721721792], 
        itemCategories: ["MEDICINES", "MISC"],
      
        dropLocationAddress: {
          addressLine: "6736BH",
          area: "SR Nagar",
          city: "Hyderabad",
        }},{
      date: "7/9/2031",
      requestNumber: "12345",
      requesterID: "777777",
      requestStatus: "PENDING",
      requestType: "General",
      roughLocationCoordinates: [ 78.44764026931458,17.44209721721792],
  priority :"0",
      itemCategories: ["MEDICINES", "MISC"],
  
      dropLocationAddress: {
        addressLine: "6736BH",
        area: "SR Nagar",
        city: "Hyderabad",
      }}]
  
