type Person={
readonly id: number,
readonly name: string,
birth_year: number,
death_year?: number,
biography: string,
image: string
}

type Actress = Person & {
most_famous_movies:[string,string,string],
awards: string,
nationality: |"American"|"British"|"Australian"|"Israeli-American"|"South African"|"French"|"Indian"|"Israeli"|"Spanish"|"South Korean"|"Chinese"
}










function isActress(dati:unknown):dati is Actress{
return(
  typeof dati === "object" && dati !== null &&
  "id" in dati && typeof dati.id === "number" &&
  "name" in dati && typeof dati.name === "string" &&
  "birth_year" in dati && typeof dati.birth_year ==="number"&&
  "death_year" in dati && typeof dati.death_year ==="number"&&
  "biography"in dati && typeof dati.biography === "string" &&
  "image"in dati && typeof dati.image === "string" &&
  "most_famous_movies" in dati && 
  dati.most_famous_movies instanceof Array &&
  dati.most_famous_movies.length === 3 &&
  dati.most_famous_movies.every (m=>typeof m==="string") &&
  "awards" in dati && typeof dati.awards === "string" &&
  "nationality" in dati && typeof dati.nationality === "string"
)
}
async function getActress(id: number): Promise<Actress | null> {
  try {
  const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/&{id}`)
  const dati:unknown = await response.json();
  if(!isActress(dati)){
    throw new Error ('formato dei dati non validi')
  }
  return dati;
  } catch (error) {
    if(error instanceof Error){
      console.error("errore nell recupero dell\'attrice",error)
    }else{
      console.error("errore sconosciuto",error)
    }
    return null
  }
}

async function getAllActresses():Promise<Actress[]>{
try {
  const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses`)
  if (!response.ok) {
    throw new Error(`Errore HTTP ${response.status}:${response.statusText}`)
  }
  const dati:unknown= await response.json()
  if(!(dati instanceof Array)){
    throw new Error('formato non valido')
  }
  const attriciValidi: Actress[]=dati.filter(isActress)
  return attriciValidi;
} catch (error) {
  if(error instanceof Error){
    console.error("errore nell recupero delle attrice",error)
  }else{
    console.error("errore sconosciuto",error)
  }
  return [];
}
}

async function getActresses(ids:number[]):Promise<(Actress|null)[]>{
  try {
    const promises=ids.map(id=>getActress(id));
    return await Promise.all(promises);
  } catch (error) {
    if(error instanceof Error){
      console.error("errore nell recupero delle attrice",error)
    }else{
      console.error("errore sconosciuto",error)
    }
    return [];
  }
}
