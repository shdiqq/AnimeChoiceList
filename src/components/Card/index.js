import Image from "next/image";
import Link from "next/link";
import { HiStar } from 'react-icons/hi';

const Card = ({data}) => {
  return (
    <div className="relative group overflow-hidden h-full flex flex-col items-center">
      {data.score? <div className="absolute z-10 right-0 rounded-tr-lg px-2 bg-black bg-opacity-20 flex flex-row items-center cursor-default text-sm"><HiStar />{data.score}</div> : null }
      <Link href={`/anime?q=${data.mal_id}`} className="absolute z-10 w-full h-full flex items-center justify-center opacity-0 md:group-hover:opacity-100 md:cursor-pointer text-white text-lg font-semibold" rel="noopener noreferrer">See More</Link>
      <Image 
          alt={data.images.webp.large_image_url}
          src={data.images.webp.large_image_url} 
          width={500}
          height={500}
          className="h-full w-full bg-cover rounded-lg md:group-hover:scale-110 md:group-hover:opacity-50 md:duration-500 md:ease-in-out md:cursor-pointer opacity-90"
        />
      <p className="absolute z-10 bottom-0 w-full text-center bg-black bg-opacity-20 md:font-semibold font-medium md:text-sm text-[12px] cursor-default">{data.title}</p>
    </div>
  )
}

export default Card;