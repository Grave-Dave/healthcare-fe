import {RegisterForm} from "../Register/types.ts";

export const checkFormStillKeepsInitialValues = (properties: string[], formData: RegisterForm, formDataReference: Partial<RegisterForm>) => {
    return properties.every(prop => {
        const key = prop as keyof RegisterForm;
        return formData[key] === formDataReference[key];
    });
};
