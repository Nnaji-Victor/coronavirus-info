export function get_date(date){
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}
export function get_default_date(date){
    return new Date(date).toLocaleDateString('en-GB', { 
        month: "short",
        day: "numeric",
    })
}
