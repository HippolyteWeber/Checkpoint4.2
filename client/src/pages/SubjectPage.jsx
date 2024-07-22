/* eslint-disable */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import CommentModal from "../components/CommentModal";

export default function SubjectPage() {
  const { currentUser } = useOutletContext();
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchSubjectDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/subject/${id}`
      );
      const data = response.data;
      setSubject({
        subjectId: data.subject_id,
        title: data.title,
        description: data.description,
        text: data.text,
        createdAt: data.subject_created_at,
        updatedAt: data.subject_updated_at,
        user: {
          pseudo: data.subject_user_pseudo,
        },
      });

      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching subject details:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchSubjectDetails();
  }, [fetchSubjectDetails]);

  const handleCommentAdded = () => {
    fetchSubjectDetails();
  };

  if (!subject) return <p>Loading...</p>;

  return (
    <div className="w-full flex flex-col justify-center items-center pt-20 ">
      {subject && (
        <div className="w-10/12 shadow-xl m-4  bg-component border ">
          <div className="p-2">
            <h1 className="text-specialcomponent">{subject.user.pseudo}</h1>
            <h2 className="card-title text-white pb-2">{subject.title}</h2>
            <p>{subject.text}</p>
            <p className="text-zinc-500">
              {new Date(subject.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <h2 className="card-title text-white pb-2">Commentaires</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            className="w-10/12 shadow-xl m-4 borderSpecial"
            key={comment.comment_id}
          >
            <div className="p-2">
              <span className="text-zinc-500">
                Réponse de{" "}
                <span className="text-specialcomponent">
                  {comment.comment_user_pseudo}
                </span>
              </span>
              <p className="text-xl text-white py-4">{comment.comment_text}</p>
              <p className="text-sm text-zinc-500">
                posté le {new Date(comment.comment_created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Pas encore de commentaire</p>
      )}
      {currentUser && (
        <>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="borderSpecialButton md:ml-[625px] mb-24"
          >
            répondre
          </button>

          <CommentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            subjectId={id}
            onCommentAdded={handleCommentAdded}
          />
        </>
      )}
      {!currentUser ? (
        <Link
          to="/login"
          className=" bg-zinc-900 hover:bg-specialcomponent  outline-none border border-specialcomponent hover:border-indigo-400 text-zinc-400 hover:text-zinc-900 rounded p-1 md:p-2 mb-10"
        >
          Connecté vous pour répondre !
        </Link>
      ) : null}
    </div>
  );
}
