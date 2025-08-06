import { useParams } from "react-router-dom";

export const Welcome = () => {
  const params = useParams();

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
