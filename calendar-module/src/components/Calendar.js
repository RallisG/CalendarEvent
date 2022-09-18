import {AiOutlineCalendar} from 'react-icons/ai';
import { Modal, Button, ModalBody } from "react-bootstrap";
import React, {useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import './Modal.css';
import ReactHtmlParser from 'react-html-parser'; 
import ICalendarLink from "react-icalendar-link";

//difference in dates lib
import moment from 'moment';

const Calendar = ({data, column}) => {
    const [openModal, setOpen] = useState(false); 
    const [modalInfo, setModalInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [show, SetShow] = useState(false);
    const handleClose = () => SetShow(false);
    const handleShow = () => SetShow(true);
    
    const currentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today);
        return today;
    }

    const dateConverter = (startDate, timeEnd) => {
        const startDateMoment = moment(startDate);
        const endDateMoment = moment(timeEnd);
        var differenceVal = startDateMoment.diff(endDateMoment, 'days')
        return differenceVal;   
    }

    const dateFormatter=(data, row) => {
        const eventDate = data.slice(0,10);
        console.log(eventDate);
        const differenceInDates = dateConverter(currentDate(), eventDate)
        if(differenceInDates > 0 && differenceInDates < 7){
            if(differenceInDates == 1){
                let formattedValue = "in " + differenceInDates + " day"
                return formattedValue;
            } else {
                let formattedValue = "in " + differenceInDates + " days"
                return formattedValue;
            }
        } else if(differenceInDates == 0) {
            return "Today";
        } else {
            return eventDate;
        }
        }
    
    const headerText = () => {
        return <p style={{"fontWeight":"600", "fontSize":"20px"}}><AiOutlineCalendar/> Upcoming Events</p>
    }
    const columns = [
        {dataField: "EventStartDate", text: headerText(), formatter: dateFormatter}
    ]

    //convert month number to its name
    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
      }
    
    //function to pass the clicked row's data 
    const rowEvents = {
        onClick: (e, row) => {
            setModalInfo(row);
            toggleTrueFalse();
        }
    }
    const toggleTrueFalse = () => {
        setShowModal(handleShow);
    }

    //ICS preperation
    const eventCreation=(data, row) => {
    const fullAddress = data.AddressLine1 + " " + data.AddressLine2 + " " + data.PostCode + " " + data.City + " "+ data.Country;
    const event = {
        title: data.Title,
        description: data.Description,
        startTime: data.EventStartDate,
        endTime: data.EventEndDate,
        location: fullAddress,
      }
    return event
    }

    //Modal content
    const ModalContent = () => {
        return(
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header >
                <img className='imgModal' src={modalInfo.BannerUrl} alt="Image"></img>
                <div className='genericGreyDiv'>
                    <p style={{"padding": "10px"}}>{toMonthName(modalInfo.EventStartDate.slice(6,7))}  {modalInfo.EventStartDate.slice(8,10)}</p>
                    <p style={{"padding":"20px", "fontWeight": "500"}}>{modalInfo.Title}</p>
                    <p style={{"bottom": "0px", "left": "3%", "top": "20%", "position": "relative"}}>Meeting</p>
                </div>
            </Modal.Header>
            <ModalBody scrollable> 
                <div className='leftBodyDiv'>
                    <p className='titleStyle'>DESCRIPTION</p >
                    <p placeholder='Description text'>{ReactHtmlParser(modalInfo.Description)}</p>
                </div>
                <div className='rightBodyDiv'>
                    <p className='titleStyle'>DATE AND TIME</p>
                    <p>{moment(modalInfo.EventStartDate).format('LLLL')}</p>
                    <ICalendarLink  filename="BSM_Calendar.ics" className='linkCalendar' event={eventCreation(modalInfo)}>
                        Add to Calendar
                    </ICalendarLink>
                    <p className='titleStyle' style={{"marginTop": "20px"}}>LOCATION</p>
                    <p>
                        {modalInfo.AddressLine1}
                        {modalInfo.AddressLine2}<br/>
                        {modalInfo.PostCode}<br/>
                        {modalInfo.City}<br/>
                        {modalInfo.Country}
                    </p>
                </div>
            </ModalBody>
            <Modal.Footer>
                <div>
                    <p className='2'>Created By {modalInfo.Author} on {modalInfo.Created.slice(0,10)} at {modalInfo.Created.slice(11,16)}</p>
                    <br/>
                    <p className='textFooter'>Modified By {modalInfo.Editor} on {modalInfo.Modified.slice(0,10)} at {modalInfo.Modified.slice(11,16)}</p>
                </div>

            </Modal.Footer>
        </Modal>
        )
    }
    return (
        //Table
       <div>
             <BootstrapTable 
             keyField='EventStartDate'
             data={data}
             columns={columns}
             rowEvents={rowEvents}
             bodyClasses="table"
             id="tableStyle"
             striped
             hover 
             />

        {show ? <ModalContent/> : null}
        </div>
    );
};

export default Calendar;