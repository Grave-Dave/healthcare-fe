import {get} from "lodash";

export const getLayoutPadding = (isMobile: boolean) => {
    return isMobile ? '0' : '24px 32px'
}

export const extractValidationMessages = (response: any) => {
    const responseValidationErrors = get(response, 'response.data.errors', '')
    const responseValidationError = get(response, 'response.data', '')

    let messages: string[] = []

    if (responseValidationErrors) {
        {
            Object.values(responseValidationErrors).map((message) => {
                messages.push(message as string)
            })
        }
    } else if (responseValidationError) {
        messages.push(responseValidationError.message)
    }

    return messages
}

export const enterKeyListener = (event: KeyboardEvent, onEnterKey: () => void) => {

    if (event.key === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        onEnterKey()
    }
};
