
const containerTiposId: { tipo: string; ids: number[]; }[] = [];

export function generateId(tipoId: string)  {
    const existeTipo = containerTiposId.find(tipo => tipo.tipo === tipoId);

    if(!existeTipo) {
        const novoTipo = {
            tipo: tipoId,
            ids: []
        };
        
        containerTiposId.push(novoTipo)
    } 

    const tipoAtual = containerTiposId.find(tipo => tipo.tipo === tipoId)!;
    const novoId = tipoAtual.ids.length;
    tipoAtual.ids.push(novoId);

    return novoId;
}