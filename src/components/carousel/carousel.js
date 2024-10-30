
const Carousel = ({movies}) => {

    
  return (
    <div>
        <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
    {
        movies.length && movies.slice(0,3).map((movie) => {
            return <div key={movie.title} className="carousel-item active">
            <img src={movie.image} className="d-block w-100" alt={movie.title} />
            </div>
        })
        
    }
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Carousel