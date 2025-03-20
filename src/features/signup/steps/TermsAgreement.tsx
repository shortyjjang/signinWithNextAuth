import Button from "@/entities/Button";
import { SignUpProps } from "..";

  
  export default function TermsAgreement({ dispatch, state }: SignUpProps) {
    return (
      <div>
        <h2 className="text-lg font-semibold">이용약관 동의</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={state.termsAgreed}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "termsAgreed", value: e.target.checked })
            }
            className="mr-2"
          />
          이용약관에 동의합니다.
        </label>
        <Button
          disabled={!state.termsAgreed}
          onClick={() => dispatch({ type: "NEXT_STEP" })}
        >
          동의하고 계속
        </Button>
      </div>
    );
  }