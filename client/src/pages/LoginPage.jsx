/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

export default function LoginPage() {
  const { currentUser, setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.info(errors);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(response.data.user);
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center ">
      <div>
        <form
          className="flex items-center flex-col my-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="my-8" htmlFor="email">
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              className="rounded p-1 md:w-96"
              {...register("email", {
                required: "Votre email est obligatoire!",
                pattern: {
                  value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                  message: "Le format de votre email est incorrect !",
                },
              })}
            />
          </label>
          {errors.email && (
            <span className="flex justify-center max-w-48 text-center text-red-500 ">
              {errors.email.message}
            </span>
          )}
          <label className="m-4">
            <input
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              className="rounded p-1 md:w-96"
              {...register("password", {
                required: "le mot de passe est requis!",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                  message: "Le mot de passe est invalide !",
                },
              })}
            />
          </label>
          {errors.password && (
            <span className="flex justify-center max-w-48 text-center text-red-500 ">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            className="bg-secondyellow hover:bg-firstyellow text-softbluec hover:text-darkblueC  border-2 border-softbluec rounded-lg mx-auto  my-8 h-8 w-48 text-center  "
          >
            Connexion
          </button>
          <div>
            <div className="divider w-96">ou</div>
          </div>
          <Link
            to="/register"
            type="submit"
            className="bg-secondyellow hover:bg-firstyellow text-softbluec hover:text-darkblueC  border-2 border-softbluec rounded-lg mx-auto  my-8 h-8 w-48   text-center"
          >
            s'inscrire
          </Link>
        </form>
      </div>
    </main>
  );
}
