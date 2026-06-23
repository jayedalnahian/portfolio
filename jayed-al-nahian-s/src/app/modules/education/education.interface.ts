export interface createEducation {
    instition:string
    degree:string
    duration:string
    status:string
    description:string
    order:number  
}

export interface updateEducation {
    instition?:string
    degree?:string
    duration?:string
    status?:string
    description?:string
    order?:number  
}
