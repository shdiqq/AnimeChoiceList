import Link from "next/link"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col md:w-5/6 gap-4 p-8">
        <div className="text-center">
          <h1 className="md:text-9xl text-6xl">404</h1>
          <h2 className="text-3xl">There was a problem.</h2>
          <p>We could not find the page you were looking for.</p>
          <p>Go back to the <Link href="/">dashboard</Link>.</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound;