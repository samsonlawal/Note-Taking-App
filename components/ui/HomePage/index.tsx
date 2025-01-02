import Navbar from "../Navbar";
import Hero from "./Hero";

function HomePage() {
  return (
    <div className="max-screen-wrapper">
      <div className="max-screen-inner">
        <div className="flex justify-center items-center flex-col h-full max-h-fit">
          {/* <Navbar /> */}
          <Navbar />
          <Hero />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
