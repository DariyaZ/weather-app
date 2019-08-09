import React from 'react';
import Icon from '../Icon/index';

import { API_KEY, getDateFromDT } from '../utils';
import { getIconByWeatherType } from '../Icon/types';

export default class WeatherCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {}
        }

        this.fetchWeatherData = this.fetchWeatherData.bind(this);
    }

    componentDidMount() {
        this.fetchWeatherData();
    }

    async fetchWeatherData() {
        const json = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=Kyiv&units=metric&cnt=7&appid=${API_KEY}`);
        const data = await json.json();

        this.setState({
            weather: data
        });
    }

    render() {
        console.log(this.state.weather);
        const { weather } = this.state;

        if (!weather.list) {
            return null;
        }

        const weatherToday = weather.list[0];
        const weatherType = weatherToday.weather[0].main.toLowerCase();     

        const days = [1, 2, 3, 4, 5, 6];

        const dayForecast = days.map((day) =>
            <a href='#' key={day} className='forecast-day'>
                <span>{getDateFromDT(weather.list[day].dt, 'ddd').toUpperCase()}</span>
                <span className='weather-icon'>
                    <Icon size='small' weatherType={getIconByWeatherType(weather.list[day].weather[0].main.toLowerCase())}/>
                </span>
                <span>
                    {weather.list[day].temp.day.toFixed()}°
                </span>
            </a>
        );

        return (
            <React.Fragment>
                <div className='content-left'>
                    <section className='forecast-today'>
                        <span className='city'>{weather.city.name.toUpperCase()}</span><br></br>
                        <span className='date-today'>{ getDateFromDT(weatherToday.dt, 'MMMM Do') }</span>
                        <p className='forecast-info'>
                            <span className='temperature'>{weatherToday.temp.day.toFixed()}°</span>
                            <span>
                                <Icon size='large' weatherType={getIconByWeatherType(weatherType)}/>
                            </span>
                        </p>
                    </section>

                    <section className='forecast-week'>
                        {dayForecast}
                    </section>
                </div>

                <div className={`content-right background-${getIconByWeatherType(weatherType)}`}></div>
            </React.Fragment>
        );
    }
}

