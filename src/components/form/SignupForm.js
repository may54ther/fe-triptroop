import { useState } from "react";
import { useDispatch } from "react-redux";
import { callSignupAPI } from "../../apis/UserAPICalls";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomInput from "../custom/CustomInput";

function SignupForm() {

    const dispatch = useDispatch();
    const [ form, setForm ] = useState({});

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickSignupHandler = () => {
        dispatch(callSignupAPI({ signupRequest: form }));
    };

    return (
        <>
            <h2 className="fs-1 fw-bold text-center mb-5">회원 가입</h2>

            <Form>
                <CustomInput
                    label="이메일"
                    id="email"
                    placeholder="이메일 입력"
                    onChangeHandler={onChangeHandler}
                    // message={!emailValid ? "Email already in use" : "사용가능한 이메일 입니다."}
                    // isInvalid={!emailValid}
                    // isValid={emailValid}
                    required
                />
                <CustomInput
                    type="password"
                    label="비밀번호"
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                    onChangeHandler={onChangeHandler}
                    // message={!emailValid ? "Email already in use" : "사용가능한 이메일 입니다."}
                    // isInvalid={!emailValid}
                    // isValid={emailValid}
                    required
                />
                <CustomInput
                    type="repassword"
                    label="비밀번호 확인"
                    id="repassword"
                    placeholder="비밀번호를 입력하세요"
                    onChangeHandler={onChangeHandler}
                    // message={!emailValid ? "Email already in use" : "사용가능한 이메일 입니다."}
                    // isInvalid={!emailValid}
                    // isValid={emailValid}
                    required
                />
                <CustomInput
                    label="이름"
                    id="name"
                    placeholder="이름 입력"
                    onChangeHandler={onChangeHandler}
                    // message={!emailValid ? "Email already in use" : "사용가능한 이메일 입니다."}
                    // isInvalid={!emailValid}
                    // isValid={emailValid}
                    required
                />
                <Form.Group className="mb-3" controlId="gender">
                    <Row>
                        <Col>
                            <Form.Label>성별</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control.Feedback
                                // type={isInvalid ? "invalid" : "valid"} tooltip
                            >
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Form.Select
                        id="gender"
                        className="fs-6"
                        onChange={onChangeHandler}
                        size="lg"
                        required>
                        <option>선택</option>
                        <option value="F">여자</option>
                        <option value="M">남자</option>
                    </Form.Select>
                </Form.Group>
                <CustomInput
                    label="생년월일"
                    id="birth"
                    placeholder="생년월일 입력 (8자리)"
                    onChangeHandler={onChangeHandler}
                    // message={!emailValid ? "Email already in use" : "사용가능한 이메일 입니다."}
                    // isInvalid={!emailValid}
                    // isValid={emailValid}
                    required
                />
                <Button
                    size="lg"
                    className="fs-6"
                    onClick={onClickSignupHandler}>회원가입</Button>
            </Form>
        </>
    );
}

export default SignupForm;