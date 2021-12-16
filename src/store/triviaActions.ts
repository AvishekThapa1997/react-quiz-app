import Question from "../model/Question";

type ACTIONS =
  | {
      type: "loading";
    }
  | {
      type: "success";
      payload: Question[];
    }
  | {
      type: "next";
    }
  | {
      type: "update_score";
      payload: number;
    }
  | {
      type: "reset_game";
    }
  | {
      type: "countdown";
    };
export default ACTIONS;
