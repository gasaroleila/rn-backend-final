export default function errorResponse(ex){
    return {
        message:ex.message,
        details:ex
    }
}