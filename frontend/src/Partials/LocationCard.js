import './LocationCard.css'

function LocationCard({data}) {

    let cards = [];
    data?.forEach( (location) => {
        cards.push(
            <div key={location.name} className="card">
                <img src={`http://localhost:3001/card/${location.name}`} style={{width: '100%'}} />
                <div className="container">
                    <a href={location.name}>
                        {location.name}
                        <span className='clickable-card'></span>
                    </a>
                    <p>{location.details}</p>
                </div>
            </div>
        );
    })

    return (
        <div>
            {cards}
        </div>
    )
}

export default LocationCard