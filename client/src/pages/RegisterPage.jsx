/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [displaySecondButton, setDisplaySecondButton] = useState(false);

  const onSubmit = async (data) => {
    const formData = { ...data };
    delete formData.confirmpassword;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, data);
      toast.success("Votre inscritption est prise en compte!");

      setDisplaySecondButton(true);
      reset();
    } catch (e) {
      const errorMessage = e.response?.data?.message;
      if (errorMessage === "Pseudo et email déjà utilisés") {
        toast.error("L'email ou pseudo déjà utilisé");
      } else if (errorMessage === "Email déjà utilisé") {
        toast.error("l'email déjà utilisé");
      } else if (errorMessage === "Pseudo déjà utilisé") {
        toast.error("Le pseudo est déjà utilisé");
      } else {
        toast.error("Erreur lors de l'inscription");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blackc text-white">
      <div className="rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-center mb-6" />
        <div className="flex flex-col gap-3">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                className="input bg-white border border-gray-500 text-black placeholder-gray-500 w-full p-2 mt-1"
                type="text"
                id="pseudo"
                name="pseudo"
                defaultValue=""
                placeholder="Saisissez votre pseudo"
                {...register("pseudo", {
                  required: "Ce champ est requis !",
                  minLength: {
                    value: 2,
                    message:
                      "Votre prénom doit contenir au minimum 2 caractères",
                  },
                })}
              />
            </div>
            <div>
              <input
                className="input bg-white border border-gray-500 text-black placeholder-gray-500 w-full p-2 mt-1"
                type="email"
                id="email"
                name="email"
                placeholder="Saisissez votre adresse mail"
                {...register("email", {
                  required: "Votre email est obligatoire!",
                  pattern: {
                    value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                    message: "Le format de votre email est incorrect !",
                  },
                })}
              />
              {errors?.email && (
                <span className="text-red-500 text-center">
                  {" "}
                  {errors.email.message}{" "}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                className="input bg-white border border-gray-500 text-black placeholder-gray-500 w-full p-2 mt-1"
                type="password"
                id="password"
                name="password"
                placeholder="Saisissez votre mot de passe"
                {...register("password", {
                  required: "le mot de passe est requis!",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                    message: "Le format de votre mot de passe est incorrect !",
                  },
                })}
              />
              {errors?.password && (
                <span className="text-red-500 text-center">
                  {" "}
                  {errors.password.message}{" "}
                </span>
              )}
            </div>
            <div>
              <input
                className="input bg-white border border-gray-500 text-black placeholder-gray-500 w-full p-2 mt-1"
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirmez votre mot de passe"
                {...register("confirmpassword", {
                  required: "la confirmation du mot de passe est requise!",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                    message: "Le format de votre mot de passe est incorrect !",
                  },
                  validate: (value) =>
                    value === watch("password") ||
                    "Les mots de passe ne sont pas identiques !",
                })}
              />
              {errors?.confirmpassword && (
                <span className="text-red-500 text-center">
                  {" "}
                  {errors.confirmpassword.message}{" "}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn bg-GreenComp text-darkblueC w-full p-2 mt-3 bg-secondyellow hover:bg-firstyellow text-softbluec hover:text-darkblueC  border-2 border-softbluec"
            >
              Inscription
            </button>
            <Link
              to="/login"
              type="button"
              disabled={!displaySecondButton}
              className={`btn w-full p-2 mt-3 ${displaySecondButton ? "bg-yellow-500 text-white  hover:bg-yellow-600" : "bg-gray-500 cursor-not-allowed"}`}
            >
              Suivant
            </Link>
          </form>
          <div>
            <span className="text-sm mt-2">Déjà inscrit ?</span>{" "}
            <Link
              to="/login"
              type="button"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
