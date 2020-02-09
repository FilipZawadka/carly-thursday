import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchDates } from '../redux/actions'
import { monthNames, monthLengths } from '../redux/constants'
import "../style/PageCalendar.css"
import { SERVER_ADDRESS } from 'constants';

function CalendarDay(props) {
    let profileStatus, weekClassName, weekNumber;
    if (props.reserved) profileStatus = "reserved";
    else profileStatus = "notReserved";

    if (props.day === 1) {
        let tempDate = new Date(props.date + 1);
        weekNumber = tempDate.getDay();
        weekClassName = "first" + weekNumber.toString();
    }
    else
        weekClassName = "notFirst";

    return <div className={weekClassName + " " + profileStatus + " " + "monthDay"} to="/details">
        {props.day}
    </div>

}

class PageCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.date = new Date();
        this.days;

        this.state = {
            month: this.date.getMonth(),
            year: this.date.getFullYear()

        }

        this.changeMonth = this.changeMonth.bind(this);
        this.getDaysArray = this.getDaysArray.bind(this);
        this.leapYearFeb = this.leapYearFeb.bind(this);
        this.mapReservation = this.mapReservation.bind(this);
        this.createDate = this.createDate.bind(this);
        this.checkReservation = this.checkReservation.bind(this);
        this.backClick = this.backClick.bind(this);
    }

    backClick() {
        this.props.history.push('/list');
    }

    changeMonth(direction) {
        let monthNumber = this.state.month;
        let yearNumber = this.state.year;
        if (direction === "right") {
            monthNumber++;
            if (monthNumber > 11) {
                monthNumber = 0;
                yearNumber++;
            }
        }
        else {
            monthNumber--;
            if (monthNumber < 0) {
                monthNumber = 11;
                yearNumber--
            }
        }

        this.setState({ month: monthNumber, year: yearNumber });
    }


    leapYearFeb() {
        if (this.state.year % 4 === 0 && this.state.month === 1)
            return true
        else return false;
    }

    createDate() {
        return this.state.year + "-" + (1 + this.state.month) + "-";
    }

    getDaysArray() {
        let monthLength;

        if (this.leapYearFeb() === true)
            monthLength = monthLengths[this.state.month] + 1;
        else
            monthLength = monthLengths[this.state.month];

        this.monthDays = new Array(monthLength);

        for (let i = 0; i < monthLength; i++)
            this.monthDays[i] = (i + 1);

        return this.monthDays;
    }

    checkReservation(idx) {
        let date = this.createDate() + idx;
        let reserved = false;
        this.props.dates.dates.map(data => {
            //console.log("check",date,data.start_date,data.end_date,new Date(date)>=new Date(data.start_date) && new Date(date)<=new Date(data.end_date));
            if (new Date(date) >= new Date(data.start_date) && new Date(date) <= new Date(data.end_date))
                reserved = true;
        })
        return reserved;
    }

    mapReservation() {
        return this.days.map(idx => {
            if (this.checkReservation(idx))
                return { idx: idx, reserved: true };
            else return { idx: idx, reserved: false };
        })
    }

    componentWillMount() {
        this.props.carDates(this.props.carid);
    }

    render() {
        let calendarEntries = null;

        if (this.props.loaded === true && this.props.dates !== undefined) {
            this.days = this.getDaysArray();
            this.days = this.mapReservation();
            //console.log(this.days);
            calendarEntries = this.days.map(data => (
                <CalendarDay key={(data.idx)} day={data.idx} reserved={data.reserved} date={this.createDate()} />
            ));
        }
        else
            calendarEntries = <p>Loading...</p>

        return <div id="calendar">
            <div className="flex">
                <div className="header">Availability calendar</div>
                <button id="backButton" className="monthChangeButton" onClick={this.backClick}>back</button>
            </div>
            <div id="calendarHeader">
                <button id="left" className="monthChangeButton" onClick={(e) => this.changeMonth(e.target.id)}>{"<"}</button>
                <button id="right" className="monthChangeButton" onClick={(e) => this.changeMonth(e.target.id)}>{">"}</button>
                <div id="monthHeader">{monthNames[this.state.month] + " " + this.state.year}</div>
            </div>
            <div id="weekDays">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>
            <div id="monthDays">
                {calendarEntries}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        dates: state.dates,
        carid: state.carid,
        loaded: state.loaded
    }
}

const mapDispatchToProps = (dispatch) => ({
    carDates: (id) => dispatch(fetchDates(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PageCalendar))