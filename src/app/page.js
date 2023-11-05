import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const Home = async() => {
  const responseTopAnime = await fetch(`${process.env.API_URL}/top/anime?limit=12`);
  const responseRecomendationAnime = await fetch(`${process.env.API_URL}/recommendations/anime`);
  const topAnimeJson = await responseTopAnime.json();
  const recomendationAnimeJson = await responseRecomendationAnime.json();

  const topAnimeData = topAnimeJson.data;
  const recomendationAnimeData = recomendationAnimeJson.data;

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  return (
    <>
      <Navbar params={'/'}/>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col md:w-5/6 gap-4 p-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <span className="text-red-500 md:text-4xl text-2xl">|</span>
              <span className="md:text-2xl text-xl">Top Anime</span>
            </div>
            <div>
              <Link href="/top-anime" className="bg-red-500 hover:bg-red-700 text-white md:text-base text-xs py-1 px-2 border border-red-700 rounded cursor-pointer">See Detail</Link>
            </div>
          </div>
          <div className="w-full grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {topAnimeData.map((data) => {
              return (
                <div key={data.mal_id}>
                  <Card data={data}/>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="flex flex-col md:w-5/6 gap-4 p-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <span className="text-red-500 md:text-4xl text-2xl">|</span>
              <span className="md:text-2xl text-xl">Anime Recommendations</span>
            </div>
          </div>
          <div className="w-full grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {shuffleArray(recomendationAnimeData).slice(0, 12).map((data) => {
              return (
                <div key={data.mal_id}>
                  <Card data={data.entry[Math.random() < 0.5 ? 0 : 1]}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;