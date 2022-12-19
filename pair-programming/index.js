
// 1. Se obtiene el arreglo con los estudiantes

const getStudentArray = (qty)=> {
  const array = [];
  for (let i=1; i <= qty; i++) {
    array.push("A" + i);
  }
  return array;
};

const studentArray = getStudentArray(5);

// Obtine todas las combinaciones posibles
const getAllPossibleTeams = (array) => {
  const teams = [];
  //console.log((array.length/2)+1);
  for(let i=0; i < array.length; i++) {
    for(let j=i+1; j < array.length; j++) {
      teams.push([ array[i], array[j] ]);
    }
  }

  // En caso de impar añade los grupos de 1 integrante
  if(array.length%2 !== 0){
    array.forEach(item => {
      teams.push([item]);
    });
  }

  return teams;
};

const allPossibleTeams = getAllPossibleTeams(studentArray);
//console.log('allPossibleTeams', allPossibleTeams);


  
const isMemberAlreadyBussy = (member, array) => {
  return array.includes(member);
}


// 2. las combinaciones por rondas
const createTeamsByRound = (students, allPossibleTeams) => {

  //crea copia para modificar el argumento
  const allPossibleTeamsAux = allPossibleTeams.slice(0, allPossibleTeams.length);

  // almacena los equipos de cada ronda
  const rounds = [];  
  
  // mientras no se completen todas las rondas mantener en el loop
  while(allPossibleTeamsAux.length > 0 ) {
    //crea copia para poder eliminar elementos con comodidad
    const studentsAux = students.slice(0, students.length);
    const round = [];

    // mientras queden alumnos continuar
    while(studentsAux.length > 0 ) {

      // Obtiene un equipo cuyos miembros aún no partipen en algún equipo
      const aTeamForThisRound = allPossibleTeamsAux.find((team)=>{
        //verifica que los integrantes aún no sean parte de un equipo
        //Si todos está pueden participar
        let areMembersFree = true;
        team.forEach((member) => {
          areMembersFree = areMembersFree && studentsAux.includes(member);
        });

        return areMembersFree;
      });

      console.log('aTeamForThisRound', aTeamForThisRound);

      // quita los miembros del studentAux
      aTeamForThisRound.forEach((member)=>{
        studentsAux.splice(studentsAux.indexOf(member),1)
      });

      console.log('studentsAux', studentsAux);

      // añade al equipo a esta ronda
      round.push(aTeamForThisRound);
    }

    //TODO: remover al team de la combinatoria 
    rounds.push(round);
  }

  return rounds;

}

const allRounds = createTeamsByRound(studentArray, allPossibleTeams);


/*
const createTeamsByRound = (students, round) => {
  const roundTeams = [];
  const studentsAux = students.slice(0, students.length);

  while(studentsAux.length > 0) {
    roundTeams.push([
      studentsAux.splice(round%studentsAux.length,1), 
      studentsAux.splice(round%studentsAux.length,1)
    ]); 
  }
  
  return roundTeams;
}
*/



// console.log('round 0', createTeamsByRound(studentArray, 0));
// console.log('round 1', createTeamsByRound(studentArray, 1));
// console.log('round 2', createTeamsByRound(studentArray, 2));
// console.log('round 3', createTeamsByRound(studentArray, 3));

