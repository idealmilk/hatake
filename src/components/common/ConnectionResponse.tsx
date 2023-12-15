import { UserType } from "@/types/user";

type ConnectionResponseProps = {
  handleConnectionResponse: any;
};

const ConnectionResponse: React.FC<ConnectionResponseProps> = ({
  handleConnectionResponse,
}) => {
  return (
    <div className="flex">
      <button onClick={() => handleConnectionResponse("ignored")}>
        Ignore
      </button>
      <button onClick={() => handleConnectionResponse("accepted")}>
        Accept
      </button>
    </div>
  );
};

export default ConnectionResponse;
