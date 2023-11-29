import { useState, useEffect, useRef } from "react";
import { useForm } from "@formspree/react";
import autoAnimate from "@formkit/auto-animate";
import "./ContactForm.css";
import type { ContactForm } from "../../../i18n/locales";

interface ContactFormProps {
    resources: ContactForm;
    showCloseButton?: boolean;
}

const contactForm = (props: ContactFormProps) => {
    const [state, handleSubmit] = useForm("mayzkojd");
    const [errorState, setErrorMessage] = useState([{ type: "", message: "" }]);
    const isFirstRender = useRef(true);
    const formRef = useRef(null);
    const formWrapperRef = useRef(null);

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
                    message: props.resources.SubmitError,
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
                message: props.resources.ERROR_CORRECT_FIELDS,
            },
        ]);
    }, [state.errors]);

    // Animate form
    useEffect(() => {
        formRef.current && autoAnimate(formRef.current);
        formWrapperRef.current && autoAnimate(formWrapperRef.current);
    }, [formRef, formWrapperRef]);

    // Validate form submission errors
    const validateError = (errorCode: string, errorMessage: string) => {
        switch (errorCode) {
            case "TYPE_EMAIL":
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: "EMAIL",
                        message: props.resources.ERROR_TYPE_EMAIL,
                    },
                ]);
                break;
            case "TYPE_TEXT":
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: "TEXT",
                        message: props.resources.ERROR_TYPE_TEXT,
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
            {state.submitting && (
                <div id="submitting">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
            {state.succeeded && (
                <div id="submit-success">
                    <p>{props.resources.SubmitSuccess}</p>
                </div>
            )}
            {!state.succeeded && !state.submitting && (
                <form id="fs-frm" ref={formRef} name="simple-contact-form" onSubmit={handleSubmit}>
                    <fieldset id="fs-frm-inputs">
                        <div className="contact-info-container">
                            <label htmlFor="full-name">{props.resources.FullName}</label>
                            <input type="text" autoComplete="name" name="name" id="full-name" placeholder={props.resources.NameAndSurname} required />
                            <label htmlFor="email">{props.resources.EmailAddress}</label>
                            <input id="email" autoComplete="email" type="email" name="email" placeholder="@" required />
                            {errorState.some((key) => key.type === "EMAIL") && <p className="error">{errorState.find((item) => item.type === "EMAIL")?.message}</p>}
                            <label htmlFor="email-subject">Subject</label>
                            <input type="text" name="_subject" id="email-subject" placeholder="Subject" defaultValue="New resume submission" required />
                        </div>
                        <div className="message-container">
                            <label htmlFor="message">{props.resources.Message}</label>
                            <div className="textarea-container">
                                <div className="textarea-bg" />
                                <textarea name="message" id="message" placeholder={props.resources.MessagePlaceholder} required />
                            </div>
                            {errorState.some((key) => key.type === "TEXT") && <p className="error">{errorState.find((item) => item.type === "TEXT")?.message}</p>}
                        </div>

                        <input type="hidden" name="_language" value="cs" />
                    </fieldset>
                    {errorState.some((key) => key.type === "CORRECT_FIELDS") && <p className="error">{errorState.find((item) => item.type === "CORRECT_FIELDS")?.message}</p>}
                    {errorState.some((key) => key.type === "UNDEFINED") && <p className="error">{errorState.find((item) => item.type === "UNDEFINED")?.message}</p>}
                    <div className="buttons-container">
                        {props.showCloseButton && (
                            <button type="button" id="fs-frm-close-button" className="button" disabled={state.submitting}>
                                {props.resources.CloseButton}
                            </button>
                        )}
                        <button type="submit" id="fs-frm-submit-button" className="button" disabled={state.submitting}>
                            {props.resources.Submit}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default contactForm;
