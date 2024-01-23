
/**
 * Validates the provided data against the specified Joi schema.
 *
 * @param {Object} data - The data to be validated.
 * @param {import('@hapi/joi').Schema} schema - The Joi schema to validate against.
 * @returns {Promise<{ isValid: boolean, value?: Object, error?: string }>} - A Promise that resolves to an object indicating whether the validation is successful.
 *   - isValid: A boolean indicating if the data is valid.
 *   - value: The validated data if isValid is true.
 *   - error: The validation error message if isValid is false.
 *
 * @throws {Error} Throws an error if there is an issue with the validation process.
 */
export const validator = async function(data, schema){
    try{
        const value = await schema.validateAsync(data)
        return {
            isValid: true,
            value
        }
    }catch(err){
        return {
            isValid: false,
            error: err.details[0]?.message || "Validation error"
        }
    }
}