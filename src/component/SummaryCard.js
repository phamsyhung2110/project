import moment from 'moment/moment'
import '../css/SummaryCard.css'

function SummaryCard({day}) {
  const day_icon = `${process.env.REACT_APP_ICON_URL + day.wheather[0]["icon"]}@2x.png`
  return (
    <li className='summary-items'>
      <div>
        <p>{Math.round(day.main.temp)}&deg;C</p>
        <p>
          {day.wheather[0].main}
          <img src={day_icon} alt="" />
        </p>
        <p>{day.wheather[0].description}</p>
        <p>{moment(day.dt_txt).format('hh:mm a')}</p>
      </div>
    </li>
  )
}

export default SummaryCard