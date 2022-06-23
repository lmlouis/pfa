
export class Entreprise{

   
    public id ?: string;
    constructor(
        public nom : string,
        public region : string,
        public telephone : string,
        public description : string,
        public secteurActivicte : string,
        public domaine : string,
        public logo : string,
        public listProduit ? : string[],
        public idResponsable ?: string
        ){}
}

export enum SecteurActivicte{
    Industriel = "Société de Industriel",
    Service = "Société de Service",
    Commercial = "Société  Commerciale"
}

export enum Region{
    Estuaire = "Libreville",
    HautOgooue = "Franceville/Masuku",
    MoyenOgooue = "Lambaréné",
    Ngounie = "Moulia",
    Nyanga = "Tchibanga",
    OgooueIvindo = "Makokou",
    OgooueLolo = "Koulamoutou",
    OgooueMaritime = "Port-Gentil",
    WoleuNtem = "Oyem"
}


export enum Domaine{
    Digitale = "Numéric & Web",
    Commercial = "Commercial",
    Transport = "Transport",
    Artisanat = "Artisanat",
    Sante = "Santé",
    Paramedicale = "Paramédicale",
    BTP = "Travaux public & Matériaux de construction",
    Ecommerce = "E-commerce",
    Service = "Service au particuliers",
}