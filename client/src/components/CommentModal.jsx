/* eslint-disable */

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

export default function CommentModal({
  isOpen,
  onClose,
  subjectId,
  onCommentAdded,
}) {
  const { currentUser } = useOutletContext();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/comment`, {
        text: data.text,
        userId: currentUser.user_id,
        subjectId: subjectId,
      });
      toast.success("Votre commentaire à été ajouté !");
      reset();
      onCommentAdded();
      onClose();
    } catch (error) {
      console.info(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-background p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Ajouter un commentaire</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <textarea
              {...register("text", {
                required: "veuilliez écrire votre commentaire !",
              })}
              placeholder="Entrer votre commentaire ici"
              className="w-full border border-gray-300 p-2 rounded text-white"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-specialcomponent hover:bg-specialcomponent2 text-zinc-900 hover:text-zinc-300 px-4 py-2 border rounded"
          >
            Répondre
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-800 hover:bg-red-500 text-white border border-black px-4 py-2 rounded ml-2"
          >
            annuler
          </button>
        </form>
      </div>
    </div>
  );
}
