export interface ValidationObject {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number,
};

export function validate(validationObject: ValidationObject) {
    let isValid = true;

    if (validationObject.required) {
        isValid = isValid && validationObject.value.toString().trim().length !== 0;
    }
    if (validationObject.minLength != null && typeof validationObject.value === 'string') {
        isValid = isValid && validationObject.value.length >= validationObject.minLength;
    }
    if (validationObject.maxLength != null && typeof validationObject.value === 'string') {
        isValid = isValid && validationObject.value.length <= validationObject.maxLength;
    }
    if (validationObject.min != null && typeof validationObject.value === 'number') {
        isValid = isValid && validationObject.value >= validationObject.min;
    }
    if (validationObject.max != null && typeof validationObject.value === 'number') {
        isValid = isValid && validationObject.value <= validationObject.max;
    }

    return isValid;
}