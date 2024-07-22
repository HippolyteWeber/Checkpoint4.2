/* eslint-disable */
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

export default function CreateSubject() {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.userId = currentUser.user_id;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/subject`, data);
      toast.success("Votre post a été créé avec succès !");
      navigate("/home");
      reset();
    } catch (e) {
      toast.error("Erreur lors de la création du post");
      console.error(e);
    }
  };

  return (
    <main className="flex justify-center md:justify-start md:ml-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-72 md:w-96"
      >
        <input
          type="text"
          name="title"
          defaultValue=""
          placeholder="Saisissez le titre du sujet"
          {...register("title", {
            required: "Ce champ est requis !",
            minLength: {
              value: 3,
              message: "Le titre doit contenir au moins 3 caractères",
            },
          })}
          className="rounded p-2 md:w-96 bg-white outline-none border-2 focus:border-none focus:outline-specialcomponent placeholder:text-slate-700 text-black"
        />
        {errors?.title && (
          <span className="text-red-500 md:w-96">{errors?.title.message}</span>
        )}
        <input
          type="text"
          name="description"
          defaultValue=""
          placeholder="Saisissez la description du sujet"
          {...register("description", {
            required: "Ce champ est requis !",
            minLength: {
              value: 10,
              message: "La description doit contenir au moins 10 caractères",
            },
          })}
          className="rounded p-2 md:w-96 bg-white outline-none border-2 focus:border-none focus:outline-specialcomponent placeholder:text-slate-700 text-black"
        />
        {errors?.description && (
          <span className="text-red-500  md:w-96">
            {errors?.description.message}
          </span>
        )}
        <textarea
          type="text"
          name="text"
          defaultValue=""
          placeholder="Saisissez le texte du sujet"
          {...register("text", {
            required: "Ce champ est requis !",
            minLength: {
              value: 10,
              message: "Le texte doit contenir au moins 2 caractères",
            },
          })}
          className="input border border-gray-500 text-white placeholder-gray-500 md:w-[900px] h-48 p-2 mt-1 text-left textarea"
        />
        <button
          type="submit"
          className=" bg-zinc-900 hover:bg-specialcomponent  outline-none border border-specialcomponent hover:border-indigo-400 text-zinc-400 hover:text-zinc-900 rounded  h-8  text-center  w-28"
        >
          Créer le sujet
        </button>
      </form>
    </main>
  );
}
