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