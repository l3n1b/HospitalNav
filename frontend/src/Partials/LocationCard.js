import './LocationCard.css'

const hostname = window.location.hostname;

function LocationCard({data, start}) {

    let cards = [];
    data?.forEach( (location) => {
        cards.push(
            <div key={location.name} className="card container">
                <img src={`http://${hostname}:3001/card/${location.name}`} style={{width: '100%'}} />
                <div className="column">
                    <a href={start + "/" + location.name}>
                        {location.name}
                        <span className='clickable-card'></span>
                    </a>
                    <p>{location.details}</p>
                </div>
            </div>
        );
    })

    return (
        <div className="cards-container">
            {cards}
        </div>
    )
}

export default LocationCard