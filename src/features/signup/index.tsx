"use client";

import { useReducer } from "react";
import { initialState, SignUpAction, signUpReducer, SignUpStep, SignUpState } from "./reducer";
import TermsAgreement from "./steps/TermsAgreement";
import RequiredInfo from "./steps/RequiredInfo";
import OptionalInfo from "./steps/OptionalInfo";
import SignUpCompleted from "./steps/SignUpCompleted";

export default function SignUp() {
  const [state, dispatch] = useReducer(signUpReducer,initialState);

  // 단계별 렌더링
  const renderStepContent = () => {
    switch (state.step) {
      case SignUpStep.TermsAgreement:
        return <TermsAgreement state={state} dispatch={dispatch} />;
      case SignUpStep.RequiredInfo:
        return <RequiredInfo state={state} dispatch={dispatch} />;
      case SignUpStep.OptionalInfo:
        return <OptionalInfo state={state} dispatch={dispatch} />;
      case SignUpStep.Completed:
        return <SignUpCompleted />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">회원가입 진행</h1>
      <progress value={state.step} max={SignUpStep.Completed} className="w-full mb-4" />
      {renderStepContent()}
    </div>
  );
}

export interface SignUpProps {
  dispatch: React.Dispatch<SignUpAction>;
  state: SignUpState;
}