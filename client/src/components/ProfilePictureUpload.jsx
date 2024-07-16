/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function ProfilePictureUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [message, setMessage] = useState("");
  const { currentUser } = useOutletContext();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("profileImage", data.profileImage[0]);
    formData.append("userId", currentUser?.user_id);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response && response.data) {
        setMessage(response.data.message);
      } else {
        setMessage("Unexpected response format from server.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setMessage(error.response?.data || "Error uploading profile picture.");
    }
  };

  return (
    <div>
      <h2>Upload Profile Picture</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          {...register("profileImage", {
            required: "Veuillez choisir un fichier à télécharger.",
            validate: {
              validFileType: (value) => {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileExtension = value[0]?.name
                  .split(".")
                  .pop()
                  .toLowerCase();
                return allowedExtensions.includes(fileExtension);
              },
            },
          })}
        />
        {errors.profileImage && errors.profileImage.type === "required" && (
          <p>Selectionner une image</p>
        )}
        {errors.profileImage &&
          errors.profileImage.type === "validFileType" && (
            <p>Votre image doit être de type JPG, JPEG ou PNG</p>
          )}
        {message && <p>{message}</p>}
        <button type="submit" disabled={!isValid}>
          Upload
        </button>
      </form>
      <p className="text-white">votre ID est : {currentUser?.user_id}</p>
      <p>{currentUser?.pseudo}</p>
    </div>
  );
}
