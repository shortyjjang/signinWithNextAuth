export enum SignUpStep {
    TermsAgreement = 1, // 이용약관 동의
    RequiredInfo = 2,   // 필수정보 입력
    OptionalInfo = 3,   // 선택정보 입력
    Completed = 4,      // 회원가입 완료
  }
  
  // 상태 타입 정의
  export interface SignUpState {
    step: SignUpStep;
    termsAgreed: boolean;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    password?: string;
  }
  
  // 액션 타입 정의
  export type SignUpAction =
    | { type: "NEXT_STEP" }
    | { type: "UPDATE_FIELD"; field: keyof SignUpState; value: string | boolean };
  
  // 초기 상태
  export const initialState: SignUpState = {
    step: SignUpStep.TermsAgreement,
    termsAgreed: false,
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  };
  
  // Reducer 함수
  export function signUpReducer(state: SignUpState, action: SignUpAction): SignUpState {
    switch (action.type) {
      case "NEXT_STEP":
        return { ...state, step: state.step + 1 };
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
      default:
        return state;
    }
  }