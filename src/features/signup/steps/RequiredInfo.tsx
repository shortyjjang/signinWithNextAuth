import { useState } from "react";
import { SignUpProps } from "..";
import Input from "../../../entities/Input";
import Button from "@/entities/Button";

export default function RequiredInfo({ state, dispatch }: SignUpProps) {
  const [password, setPassword] = useState("");
  return (
    <div>
      <h2 className="text-lg font-semibold">필수 정보 입력</h2>
      <Input
        placeholder="이름"
        value={state.name}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "name",
            value: e.target.value,
          })
        }
      />
      <Input
        placeholder="이메일"
        value={state.email}
        regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        regexMessage="올바른 이메일 형식을 입력해주세요."
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "email",
            value: e.target.value,
          })
        }
      />
      <Input
        placeholder="비밀번호"
        value={state.password as string}
        type="password"
        regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{8,16}$/}
        regexMessage="영문자, 대문자, 숫자, 특수문자를 포함한 8자 이상 16자 이하의 비밀번호를 입력해주세요."
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            field: "password",
            value: e.target.value,
          })
        }
      />
      <Input
        placeholder="비밀번호 확인"
        value={password}
        type="password"
        regex={new RegExp(`^${state.password}$`)}
        regexMessage="비밀번호가 일치하지 않습니다."
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={() => dispatch({ type: "NEXT_STEP" })}
      >
        다음
      </Button>
    </div>
  );
}
