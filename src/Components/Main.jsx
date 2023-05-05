import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Card from './Card';

let API_KEY = "&api_key=bfca83cd3a831e1c30fa8891591322d4";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_KEY;

let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedie"]

const tailwindInput = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

function Main() {
    const [movieData, setMovieData] = useState([]);
    const [navUrl, setNavUrl] = useState(url);
    const [isLoading, setIsLoading] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [search,setSearch] = useState()

    const getData = (movieType) => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false)
        }, 1000);


        if (movieType === "Popular") {
            setNavUrl(base_url + "/discover/movie?sort_by=popularity.desc" + API_KEY);
        }
        if (movieType === "Theatre") {
            setNavUrl(base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_KEY);
        }
        if (movieType === "Kids") {
            setNavUrl(base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_KEY);
        }
        if (movieType === "Drama") {
            setNavUrl(base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_KEY);
        }
        if (movieType === "Comedie") {
            setNavUrl(base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_KEY);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(navUrl);
                setMovieData(response.data.results);
                console.log(response.data.results)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [navUrl]);
    
    const runSearch = () => {
        setNavUrl(base_url+"/search/movie?api_key=bfca83cd3a831e1c30fa8891591322d4&query="+search)
    }


    return (
        <>
            <div className="bg-sky-950">
                <nav className='max-w-[1150px] w-[100%] mx-auto flex justify-between align-center py-5 relative'>
                    <ul className='flex gap-5 hidden md:flex'>
                        {
                            arr.map((value, key) => (
                                <li key={key} onClick={() => getData(value)} className='cursor-pointer  hover:bg-sky-600 hover:text-white text-xl font-bold  bg-sky-500 flex items-center justify-center px-3 py-1 rounded-xl  text-slate-300 my-5'>{value}</li>
                            ))
                        }
                    </ul>
                    <div className="responsive-nav flex md:hidden">
                        <div className="flex flex-col ms-5 items-center">
                        <button className={`text-white font-medium border rounded-xl px-3 py-2  ${toggle ? "bg-sky-600" : "bg-sky-800"}`}  onClick={() => setToggle(!toggle)}>{toggle ? "Open Categories" : "Close Categories"}</button>
                        <ul className={` top-16 z-10 bg-sky-500 flex flex-col absolute ${toggle ? "hidden" : "flex"} `}>
                            {
                                arr.map((value, key) => (
                                    <li key={key} onClick={() => getData(value)} className='cursor-pointer hover:bg-sky-600 border-b-2 hover:text-white text-lg font-medium  bg-sky-500  flex  items-center justify-center px-2 py-1 rounded-xl  text-slate-300 my-0.5'>{value}</li>
                                ))
                            }
                        </ul>
                        </div>
                       
                    </div>


                    <form className='flex items-center gap-2 justify-center pe-2' onSubmit={(e) => e.preventDefault()}>
                        <div className="search-btn">
                            <input className={tailwindInput} type="text" placeholder='Type a movie..' onChange={(e)=>setSearch(e.target.value)} />
                        </div>
                        <button  type="submit" onClick={runSearch} > <FaSearch className='text-white text-xl' /></button>
                    </form>
                </nav>
            </div>


            <div className={isLoading ? "block bg-slate-400 h-screen" : "hidden"}>
                <div role="status">
                    <svg aria-hidden="true" className="w-[200px] h-[200px] mx-auto mt-48 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className={isLoading ? "hidden " : "bg-slate-500"}>
                <div className="py-16 container movie max-w-[1150px] w-[100%] mx-auto flex justify-center items-center flex-wrap gap-7">
                    {
                        (movieData && movieData.length === 0) ? <p className='text-2xl'>Not Found</p> : movieData.map((res, index) => (
                            <Card info={res} key={index} />
                        ))
                    }

                </div>
            </div>
        </>
    )}

export default Main;