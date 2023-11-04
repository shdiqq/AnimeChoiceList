import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

const Search = async({params, searchParams}) => {
  const responseSearchAnime = await fetch(`${process.env.API_URL}/anime?q=${searchParams.q}`);
  const searchAnimeJson = await responseSearchAnime.json();
  const searchAnimeData = searchAnimeJson.data;
  return (
    <>
      <Navbar params={'/search'}/>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col md:w-5/6 gap-4 p-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <span className="text-red-500 md:text-4xl text-2xl">|</span>
              <span className="md:text-2xl text-xl">Search results: {searchParams.q}</span>
            </div>
          </div>
          <div className="w-full grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {searchAnimeData.map((data) => {
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

export default Search;