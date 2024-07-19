import axios from "axios";
import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Pagination() {
  const { currentUser } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const recordsPerpage = 5;
  const lastIndex = currentPage * recordsPerpage;
  const firstIndex = lastIndex - recordsPerpage;
  const records = subjects.slice(firstIndex, lastIndex);
  const npage = Math.ceil(subjects.length / recordsPerpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/subject`
        );
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().slice(0, 16).replace("T", "-");
    return formattedDate;
  };

  function changeCpage(id) {
    setCurrentPage(id);
  }

  return (
    <div className=" w-full flex flex-col justify-center items-center ">
      {currentUser && (
        <Link
          to="/subjectCreate"
          className="bg-zinc-900 hover:bg-specialcomponent  outline-none border border-specialcomponent hover:border-indigo-400 text-zinc-400 hover:text-zinc-900  rounded p-2 md:ml-[625px]"
        >
          crée votre poste
        </Link>
      )}

      {records.map((s) => (
        <div
          className=" w-10/12 md:w-6/12 shadow-xl m-4 borderSpecial "
          key={s.subject_id}
        >
          <div className="p-2  ">
            <h2 className="card-title text-white pb-2">{s.title}</h2>

            <div className="flex justify-between items-end">
              <span className="text-specialcomponent text-sm">
                {s.pseudo}{" "}
                <span className="text-zinc-400 text-xs">
                  {formatDate(s.created_at)}
                </span>
              </span>

              <Link
                to={`/subject/${s.subject_id}`}
                className=" bg-zinc-900 hover:bg-specialcomponent  outline-none border border-specialcomponent hover:border-indigo-400 text-zinc-400 hover:text-zinc-900 rounded p-1 md:p-2"
              >
                Lire
              </Link>
            </div>
          </div>
        </div>
      ))}
      <nav className="mb-10">
        <ul className="pagination flex flex-row justify-center ">
          {numbers.map((n) => (
            <div
              key={n.id}
              className={`page-item ${currentPage === n ? "active" : ""} join`}
            >
              <button
                type="button"
                href="#"
                className="join-item btn btn-xs md:btn-sm btn-square hover:bg-specialcomponent focus:bg-specialcomponent2 border border-specialcomponent mx-[1px] focus:border-white"
                onClick={() => changeCpage(n)}
              >
                {n}
              </button>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
}
