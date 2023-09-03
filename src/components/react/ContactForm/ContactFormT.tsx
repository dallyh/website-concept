import { useState, useEffect, useRef } from "react";
import { useForm } from "@formspree/react";
import "./ContactForm.css";

interface ContactFormProps {
    label: string;
}

const contactFormT = (props: ContactFormProps) => {
    const [state, handleSubmit] = useForm("mayzkojd");
    const [errorState, setErrorMessage] = useState([{ type: "", message: "" }]);
    const isFirstRender = useRef(true);
    const formRef = useRef(null);
    const formWrapperRef = useRef(null);

    // I18n - pass locale so there are no server side HTML render errors
    //const { t } = useTranslation("contactForm", {lng: props.locale});

    // Handle submit and errors
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        var formErrors = state.errors?.getAllFieldErrors();

        if (formErrors === undefined) {
            console.debug("No errors returned from form.");
            setErrorMessage((prevState) => [
                ...prevState,
                {
                    type: "UNDEFINED",
                    message: "TEST",
                },
            ]);
            return;
        }

        formErrors.map((x) => {
            x[1].map((e) => {
                validateError(e.code, e.message);
            });
        });

        setErrorMessage((prevState) => [
            ...prevState,
            {
                type: "CORRECT_FIELDS",
                message:"TEST",
            },
        ]);
    }, [state.errors]);

    // Animate form
    useEffect(() => {
        formRef.current; //&& autoAnimate(formRef.current);
        formWrapperRef.current; //&& autoAnimate(formWrapperRef.current);
    }, [formRef, formWrapperRef]);

    // Validate form submission errors
    const validateError = (errorCode: string, errorMessage: string) => {
        switch (errorCode) {
            case "TYPE_EMAIL":
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: "EMAIL",
                        message: "TEST",
                    },
                ]);
                break;
            case "TYPE_TEXT":
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: "TEXT",
                        message: "TEST",
                    },
                ]);
                break;
            default:
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: errorCode ?? "UNDEFINED",
                        message: errorMessage,
                    },
                ]);
                break;
        }
    };

    return (
        <div ref={formWrapperRef}>
            {state.succeeded && (
                <div id="submit-success">
                    <p>"TEST"</p>
                </div>
            )}
            {!state.succeeded && (
                <form id="fs-frm" ref={formRef} name="simple-contact-form" onSubmit={handleSubmit}>
                    <fieldset id="fs-frm-inputs">
                        <label htmlFor="full-name">"TEST"</label>
                        <input type="text" autoComplete="name" name="name" id="full-name" placeholder="TEST" required />
                        <label htmlFor="email">"TEST"</label>
                        <input id="email" autoComplete="email" type="email" name="email" placeholder="@" required />
                        {errorState.some((key) => key.type === "EMAIL") && <p className="error">{errorState.find((item) => item.type === "EMAIL")?.message}</p>}
                        <label htmlFor="message">"TEST"</label>
                        <textarea rows={5} name="message" id="message" placeholder="TEST" required></textarea>
                        {errorState.some((key) => key.type === "TEXT") && <p className="error">{errorState.find((item) => item.type === "TEXT")?.message}</p>}
                        <input type="hidden" name="_subject" id="email-subject" value="New resume submission" />
                        <input type="hidden" name="_language" value="cs" />
                    </fieldset>
                    {errorState.some((key) => key.type === "CORRECT_FIELDS") && <p className="error">{errorState.find((item) => item.type === "CORRECT_FIELDS")?.message}</p>}
                    {errorState.some((key) => key.type === "UNDEFINED") && <p className="error">{errorState.find((item) => item.type === "UNDEFINED")?.message}</p>}
                    <button type="submit" id="fs-frm-submit-button" className="button" disabled={state.submitting}>
                        {props.label}
                    </button>
                </form>
            )}
        </div>
    );
};

export default contactFormT;
