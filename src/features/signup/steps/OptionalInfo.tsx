import Button from "@/entities/Button";
import { SignUpProps } from "..";
import Input from "../../../entities/Input";
import { signIn } from "@/auth";

export default function OptionalInfo({ state, dispatch }: SignUpProps) {
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(state),
      });
      if (response.ok) {
        signIn("credentials", {
          email: state.email,
          password: state.password,
        });
        dispatch({ type: "NEXT_STEP" });
      } else {
        console.error("회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold">선택 정보 입력</h2>
      <Input
        type="tel"
        placeholder="전화번호 (선택)"
        value={state.phone as string}
        regex={/^[010]-[0-9]{4}-[0-9]{4}$/}
        regexMessage="올바른 형식을 입력해주세요."
        onChange={(e) => {
          let value = e.target.value.replace(/[^0-9]/g, "");
          value = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
          dispatch({
            type: "UPDATE_FIELD",
            field: "phone",
            value: value,
          });
        }}
      />
      <Input
        placeholder="주소 (선택)"
        value={state.address as string}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "address",
            value: e.target.value,
          })
        }
      />
      <Button onClick={handleSubmit}>회원가입 완료</Button>
    </div>
  );
}
