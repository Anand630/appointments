import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, makeAppointmentStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  console.log(appointmentDetails)
  console.log(formattedDate)

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarClick = () => makeAppointmentStarred(id)

  return (
    <li className="each-appointment-container">
      <div className="title-and-start-container">
        <p className="title">{title}</p>
        <button onClick={onStarClick} type="button" className="star-button">
          <img className="star-image" src={starImageUrl} alt="star" />
        </button>
      </div>
      <p className="appointment-added-time">Date: {formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
