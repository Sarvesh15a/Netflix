import React, { useEffect, useState} from 'react'
import "./Home.scss"
import axios from 'axios'
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey="299ba5325dd81f0c7b8423988eff9822"
const url= "https://api.themoviedb.org/3";
const imgUrl="https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";




const Card=({img})=>(
  
    <img className='card'  src={img} alt="cover" />
  
)

const Row=({title ,arr=[
  {
    img:"https://c4.wallpaperflare.com/wallpaper/361/823/829/avengers-endgame-iron-man-robert-downey-jr-captain-america-chris-evans-hd-wallpaper-preview.jpg"
  }

]})=>(


    <div className='row'>
      <h2>{title}</h2>
      <div>
       {
         arr.map((item,index)=> (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
        ))

       }
     </div>
    </div>
  )



const Home=()=> {
  const [upcomingMovies,setUpcomingMovies]=useState([])
  const [nowplayingMovies,setNowplayingMovies]=useState([])
  const [papularMovies,setPapularMovies]=useState([])
  const [topretedMovies,setTopretedMovies]=useState([])
  const [genre, setGenre] = useState([]);

   useEffect(()=>{
    
    const fetchupcoming=async()=>{
      const{data:{results},}=await  axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)

      setUpcomingMovies(results)
    };
    const fetchNowplaying=async()=>{
      const{data:{results},}=await  axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)

      setNowplayingMovies(results)
    };
    const fetchPapular=async()=>{
      const{data:{results},}=await  axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)

      setPapularMovies(results)
    };
    const fetchTopreted=async()=>{
      const{data:{results},}=await  axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)

      setTopretedMovies(results)
    };
    const getAllGenre = async () => {
      const {
          data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
      console.log(genres)
  };
    
    getAllGenre();
    fetchupcoming();
    fetchNowplaying();
    fetchPapular();
    fetchTopreted();
   },[])

  return (
   <section className="home">
      <div
                className="banner"
                style={{
                    backgroundImage: papularMovies[0]
                        ? `url(${`${imgUrl}/${papularMovies[17].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {papularMovies[17] && <h1>{papularMovies[17].original_title}</h1>}
                {papularMovies[17] && <p>{papularMovies[17].overview}</p>}

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
            </div>
     <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
     <Row title={"Now Playing"} arr={nowplayingMovies}/>
     <Row title={"Popular Movies"} arr={papularMovies}/>
     <Row title={"Top Reted Movies"} arr={topretedMovies}/>
     <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
   </section>
  );
};

export default Home

