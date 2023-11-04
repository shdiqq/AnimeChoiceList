import NotFound from "@/app/not-found";
import Navbar from "@/components/Navbar";

const animeName = async({params}) => {
  const responseAnimeById = await fetch(`${process.env.API_URL}/anime/${params.animeName}/full`);
  const animeByIdJson = await responseAnimeById.json();
  if (animeByIdJson.status) {
    return (
      <NotFound/>
    )
  } else {
      const animeByIdData = animeByIdJson.data;
      return (
      <>
        <Navbar params={params}/>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center md:w-5/6 gap-4 p-8">
            <h1>Coming Soon!</h1>
          </div>
        </div>
      </>
    )
  }
}

export default animeName;