export default function LandingPage() {
  return (
    <div className="bg-background h-screen">
      <div className="pt-12">
        <h1 className="text-center text-3xl mt-8 font-main text-white lg:mt-20">
          Bienvenue dans le{" "}
          <span className="text-GreenBlue">TOMBEAU DES BRAVES</span>
        </h1>
        <p className="pt-5 ml-10 text-xl font-paraph text-white lg:text-center">
          Un forum dédié aux échanges sur les jeux vidéos et les nouvelles
          technologies
        </p>
      </div>
      <div className="mt-40 flex flex-col justify-center items-center lg:gap-1">
        <button
          type="button"
          className="bg-secondyellow hover:bg-firstyellow text-softbluec hover:text-darkblueC  border-2 border-softbluec rounded-lg mx-auto px-8  "
        >
          Explorer
        </button>
      </div>
    </div>
  );
}
