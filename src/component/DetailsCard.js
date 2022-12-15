import moment from 'moment/moment'
import '../css/DetailsCard.css'

function DetailsCard({wheather_icon, data}) {
    const {clouds, main, wheather} = data.list[0]
    return (
        <div className='details'>
            <div className="clouds">
                <p className='celsius'>{Math.round(main.temp)}$deg:C</p>
                <div className='cloud-icon'>
                    {wheather[0].main}
                    <img src="{wheather_icon" alt="" />
                </div>
                <div className="des">{wheather[0].description}</div>
                <div className="time">{moment().format("dddd MMM YYY")}</div>
            </div>
            <div className="more-info">
                <p>RealFell: {Math.roundmain.feels_like}&deg;C</p>
                <p>Humidity: {main.humidity}</p>
                <p>Cloud Cover: {clouds.all}</p>
                <p>Min Temp: {Math.round(main.temp_min)}&deg;C</p>
                <p>Max Temp: {Math.round(main.temp_max)}&deg;C</p>
            </div>
        </div>
    )
}

export default DetailsCard