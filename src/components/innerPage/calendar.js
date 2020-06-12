import React, {useState} from "react";
import "./css/calendar.css"
import {addDays, format, isSameDay, subDays} from "date-fns";

export default function DatePicker(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const {maxValue} = props;
    const getStyles = (day) => {
        const classes = [];
        if (isSameDay(day, selectedDate)) {
            classes.push('DateDayItem--selected')
        }
        return classes.join(' ')
    };
    

    function renderDays() {
        const dayFormat = "E";
        const dateFormat = "d";
        const days = [];
        let startDay
        if (maxValue===7){
            startDay = subDays(currentWeek,3);
        }else if(maxValue===5){
            startDay = subDays(currentWeek,2);
        }else{
            startDay = subDays(currentWeek,1);
        }
        for (let i = 0; i < maxValue; i++) {
            days.push(
                <div 
                     className={`Datepicker--DateDayItem ${getStyles(addDays(startDay, i))}`}
                     key={i * i + 2}
                     onClick={() => onDateClick(addDays(startDay, i))}
                >
                    <div className={"Datepicker--DayLabel"} key={i}>
                        {format(addDays(startDay, i), dayFormat)}
                    </div>
                    <div className={"Datepicker--DateLabel"} key={i * i + 1}>
                        {format(addDays(startDay, i), dateFormat)}
                    </div>
                </div>
            );
        }
        return <div id={"container"} className='Datepicker--DateList'>{days}</div>;
    }

    
    const onDateClick = day => {
        setSelectedDate(day);
        if (props.getSelectedDay) {
            props.getSelectedDay(day);
        }    
    };
    const currentDay = () => {
        setCurrentWeek(new Date());
        setSelectedDate(new Date());
        if (props.getSelectedDay) {
            props.getSelectedDay(new Date());
        }
    };
    const nextWeek = () => {
        setCurrentWeek(addDays(currentWeek, maxValue))
    };

    const prevWeek = () => {
        setCurrentWeek(subDays(currentWeek, maxValue))
    };

    const dateFormat = "MMMM yyyy";
    return (
        <div className={"Datepicker--Container"}>
            <div className={"Datepicker--Strip"}>
                <div className="row justify-content-between" style={{width: "100%"}}>    
                    <span className={"Datepicker--MonthYearLabel"}>
                        {format(currentWeek, dateFormat)}
                    </span>
                    <span className={"Datepicker--TodayLabel"} onClick={currentDay}>
                        {/* Today  <img src="/calendar.png" alt=""></img> */}
                        <i className="fas fa-undo"></i> Today
                    </span>
                </div>
                <div className={"Datepicker"}>
                    <button className={"Datepicker--button-prev"} onClick={prevWeek}><i className="fas fa-arrow-left"></i></button>
                    {renderDays()}
                    <button className={"Datepicker--button-next"} onClick={nextWeek}><i className="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    )
}