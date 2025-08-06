import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Welcome = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id && params.lang) {
      navigate("/");
    }
  }, [params.id, params.lang, navigate]);

  return (
    <div>
      <div>
        <span>
          User id: <strong>{params.id}</strong>
        </span>
      </div>
      <div>
        <span>
          Language: <strong>{params.lang}</strong>
        </span>
      </div>
    </div>
  );
};
