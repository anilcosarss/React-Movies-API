import React from 'react'

function Card(movie) {
    let img_src = "https://image.tmdb.org/t/p/w500"

    const movieTitle = movie.info.original_title;

    const wordCount = movieTitle.split(" ").length;
    const titles = movieTitle.split(" ");
    const firstThreeWords = titles.slice(0, 5);
    const newTitle = firstThreeWords.join(" ");

    // console.log("firthree" , firstThreeWords)
    // console.log("newtitle" , newTitle)
    // console.log(movie.info)



    return (
        <>
            {(movie.info.poster_path === null) ? "" :

                <div className="card-inner text-white relative w-[80%] sm:w-[45%] lg:w-[23%] shadow-xl shadow-slate-800">
                    <div className="">
                        <div className="p-5 bg-slate-800 ">
                            <img className='' src={img_src + movie.info.poster_path} alt="" />
                            <div className="movie-details">
                                <div className="box flex flex-col items-start ">
                                    <h4 className="font-bold">{wordCount > 3 ? newTitle : movie.info.original_title}</h4>
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex items-center justify-center border border-xxl rounded-full bg-sky-500 w-10 h-10 mt-2"><span className='font-medium'>{(movie.info.vote_average === 0) ? 7.4 : movie.info.vote_average.toFixed(1)}</span></div>
                                        <div className="block bg-sky-500 px-2 py-1 rounded-xl">{movie.info.release_date}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="overview absolute left-0 top-0 max-h-[100%] bg-sky-300 w-full  text-white p-2 text-center">
                        <h1 className='underline mb-2 text-xl'>Overview</h1>
                        <p>{movie.info.overview}</p>
                    </div>


                </div>

            }





        </>
    )
}

export default Card