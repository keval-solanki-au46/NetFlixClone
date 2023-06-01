import React, { useEffect, useState } from 'react'
import './home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apikey='9265e02545384cd4a33914e4c2a971c4'
const url='https://api.themoviedb.org/3'
const imgurl='https://image.tmdb.org/t/p/original'
const upcoming='upcoming'
const nowplaying='now_playing'
const popular='popular'
const toprating='top_rated'

const Card=({img})=>(
    <img className='card' src={img} alt='cover'/>
)
const Row=({title,arr=[

],
})=>(
    <div className='row'>
        <h2>{title}</h2>
        <div>

            {
                arr.map((item,index)=>(
                    <Card key={index} img={`${imgurl}/${item.poster_path}`}/>
                ))
            }
        
       
      
        </div>
    </div>
)
 const Home = () => {

    const [upcomingMovies,setUpcomingMovies]=useState([])
    const [nowplayingMovies,setnowplayingMovies]=useState([])
    const [popularMovies,setpopularMovies]=useState([])
    const [topratingMovies,settopratingMovies]=useState([])
    const [genre, setGenre] = useState([]);

    useEffect(()=>{

        const fetchUpcoming=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`)
            //destructuring
            
            setUpcomingMovies(results)
          
        
        }
        const fetchnowplaying=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${nowplaying}?api_key=${apikey}`)
            //destructuring
            
            setnowplayingMovies(results)
          
        
        }
        const fetchpopular=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${popular}?api_key=${apikey}`)
            //destructuring
            
            setpopularMovies(results)
          
        
        }
        const fetchtoprating=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${toprating}?api_key=${apikey}`)
            //destructuring
            
            settopratingMovies(results)
          
        
        }
        const getAllGenre = async () => {
            const {
                data: { genres },
            } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
            setGenre(genres);
            console.log(genres);
        };

        getAllGenre();
        
        fetchUpcoming()
        fetchnowplaying()
        fetchpopular()
        fetchtoprating()

    },[])

  return (
    <section className='home'>
        <div className='banner'
             style={{
                backgroundImage: popularMovies[0]
                    ? `url(${`${imgurl}/${popularMovies[0].poster_path}`})`
                    : "rgb(16, 16, 16)",
            }}
        >
            
                {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button><BiPlay />  Play </button>
                    <button>My List  <AiOutlinePlus /> </button>
                </div>
            </div>
       
        
        <Row title={'Upcoming Movies'}arr={upcomingMovies}/>
        <Row title={'Nowplaying Movies'}arr={nowplayingMovies}/>
        <Row title={'Popular Movies'}arr={popularMovies}/>
        <Row title={'Toprating Movies'}arr={topratingMovies}/>

        <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
    </section>
  
  )
}
export default Home
