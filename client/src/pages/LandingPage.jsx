import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-background h-screen">
      <div className="pt-12">
        <h1 className="text-center text-3xl mt-8 font-main text-white lg:mt-10">
          Bienvenue dans{" "}
          <span className="text-GreenBlue font-bold">la javascrypte</span>
        </h1>
        <p className="pt-5 px-5 md:ml-10 font-thin text-xl font-paraph text-white text-center">
          Le forum d'échange des wilders de la promo de février 2024 vous pouvez
          vous inscrire pour accéder à l'ensemble des fonctionnalités ou bien
          visité les postes en tant qu'invité
        </p>
      </div>
      <div className="bg-background md:mt-20 flex flex-col justify-center items-center lg:gap-1">
        <Link
          to="/home"
          className="bg-specialcomponent hover:bg-specialcomponent2   border-2 border-softbluec rounded-lg mx-auto  my-8 h-8 w-48 text-center  "
        >
          explorer
        </Link>
        <div>
          <div className="divider w-96">ou</div>
        </div>
        <Link
          to="/register"
          type="submit"
          className="bg-specialcomponent hover:bg-specialcomponent2   border-2 border-softbluec rounded-lg mx-auto  my-8 h-8 w-48   text-center"
        >
          s'inscrire
        </Link>
      </div>
    </div>
  );
}
