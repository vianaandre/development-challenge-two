export const maskCep = (cep: string) => {
    if(cep.length === 5) {
        cep += "-"
    }

    return cep
}