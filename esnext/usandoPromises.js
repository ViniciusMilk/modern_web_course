const http = require('http')

/** 
 * @param {String} letra Letra da turma
 * @return Promise
 */
const getTurma = letra => {
    const url = `http://files.cod3r.com.br/curso-js/turma${letra}.json`
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let resultado = ''
            res.on('data', dados => {
                resultado+=dados
            })
            res.on('end', () => {
                try {
                    resolve(JSON.parse(resultado))
                } catch (error) {
                    reject(error)
                }
            })
        })
    })
}

// let nomes = []
// getTurma('A').then(alunos => {
//     nomes = nomes.concat(alunos.map(aluno => `A: ${aluno.nome}`))
//     getTurma('B').then(alunos => {
//         nomes = nomes.concat(alunos.map(aluno => `B: ${aluno.nome}`))
//         getTurma('C').then(alunos => {
//             nomes = nomes.concat(alunos.map(aluno => `C: ${aluno.nome}`))
//             console.log(nomes)
//         })
//     })
// })

Promise.all([getTurma('A'), getTurma('B'), getTurma('C')])
    .then(turmas => [].concat(...turmas))
    .then(alunos => alunos.map(aluno => aluno.nome))
    .then(nomes => console.log(nomes))
    .catch(error => console.log(error.message))