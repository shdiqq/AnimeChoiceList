
import Card from "@/components/Card";
import ImageSlider from "@/components/Image Slider";

const Home = async() => {
  const responseTopAnime = await fetch(`${process.env.API_URL}/top/anime?limit=11`);
  const randomNumber = Math.floor(Math.random() * 20) + 1;
  const responseRecomendationAnime = await fetch(`${process.env.API_URL}/top/anime?limit=12&filter=bypopularity&page=${randomNumber}`);
  const topAnimeJson = await responseTopAnime.json();
  const recomendationAnimeJson = await responseRecomendationAnime.json();

  const topAnimeData = topAnimeJson.data.filter(anime => (anime.trailer.images.maximum_image_url !== null && anime.trailer.youtube_id !== "D9iTQRB4XRk"));
  const recomendationAnimeData = recomendationAnimeJson.data

  return (
    <>
      <ImageSlider data={topAnimeData}/>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col md:w-5/6 w-full gap-4 p-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-end gap-1">
              <p className="text-red-500 md:text-4xl text-xl">|</p>
              <p className="md:text-2xl text-base">Anime Recommendations</p>
            </div>
          </div>
          <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4">
            {recomendationAnimeData.map((data) => {
              return (
                <div key={data.mal_id}>
                  <Card data={data}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;