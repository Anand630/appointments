import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

export default class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    showStarred: false,
  }

  onTitleInput = e => {
    this.setState({title: e.target.value})
  }

  onDateInput = e => {
    this.setState({date: e.target.value})
  }

  addAppointment = e => {
    e.preventDefault()
    const {title, date, appointmentsList} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState({
      appointmentsList: [...appointmentsList, newAppointment],
      title: '',
      date: '',
    })
  }

  makeAppointmentStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  toggleShowStarred = () => {
    this.setState(prevState => ({showStarred: !prevState.showStarred}))
  }

  displayStarredAppointments = () => {
    const {appointmentsList} = this.state
    return appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
  }

  render() {
    const {appointmentsList, showStarred, title, date} = this.state

    const filteredAppointmentsList = showStarred
      ? this.displayStarredAppointments()
      : appointmentsList

    console.log(filteredAppointmentsList)
    const starredBtnClassName = showStarred
      ? 'starred-button-on'
      : 'starred-button-off'

    return (
      <div className="home-container">
        <div className="card-container">
          <div className="card-items-container">
            <div className="card-items-top-container">
              <form
                onSubmit={this.addAppointment}
                className="heading-inputs-button-container"
              >
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <div className="label-input-container">
                  <label htmlFor="title" className="input-instructions">
                    TITLE
                  </label>
                  <input
                    value={title}
                    onChange={this.onTitleInput}
                    id="title"
                    placeholder="Title"
                    type="text"
                  />
                </div>
                <div className="label-input-container">
                  <label
                    htmlFor="date"
                    value="date"
                    className="input-instructions"
                  >
                    DATE
                  </label>
                  <input
                    value={date}
                    onChange={this.onDateInput}
                    id="date"
                    type="date"
                  />
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                className="appointment-image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
            <hr />
            <div className="appointments-and-starred-button-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                onClick={this.toggleShowStarred}
                type="button"
                className={starredBtnClassName}
              >
                Starred
              </button>
            </div>
            {filteredAppointmentsList.length > 0 ? (
              <ul className="all-appointments-list-container">
                {filteredAppointmentsList.map(eachAppointment => (
                  <AppointmentItem
                    appointmentDetails={eachAppointment}
                    key={eachAppointment.id}
                    makeAppointmentStarred={this.makeAppointmentStarred}
                  />
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}
