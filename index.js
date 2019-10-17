const express = require('express');
const server = express();
//Indica ao servidor que ele deve aceitar JSON
server.use(express.json());

const projects = [];
let counter=0;


//Checar se projeto existe

function projectExists(req,res,next){
    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).json({ error: 'Project not found' });
    }
    req.project = project;
    return next();
 }
 //Contando o numero de requisições
 function logRequest(req,res,next){
        counter++;
        console.log(`Requisição: ${counter}`);
        return next();
 }

 server.use(logRequest);

//Listar todos os projetos
server.get('/projects', (req,res)=>{
    return res.json(projects);
})
// Buscar por ID
server.get('/projects/:id',projectExists, (req,res)=>{
    return res.json(req.project);
})
//Alterar dados (Título do Projeto), recebendo ID como parametro
server.put('/projects/:id', projectExists,(req,res)=>{
    const {id} = req.params;
    const {title} = req.body;
    const project = projects.find(p=>p.id=id);
    project.title = title;
    return res.json(projects);
})
// Deletar projeto, recebe o ID como parametro
server.delete('/projects/:id', projectExists,(req,res)=>{
    const {id} = req.params;
    const project = projects.find(p=>p.id===id);
    projects.splice(project,1);

    return res.send();
})

// Adicionar novo projeto ao Vetor
server.post('/projects', (req, res) => {
    const { id, title } = req.body;
  
    const project = {
      id,
      title,
      tasks: []
    };
  
    projects.push(project);
    return res.json(project);
  })


  // Task


  /**
 * Tasks
 */
server.post('/projects/:id/tasks', projectExists, (req, res) => {
    const { id } = req.params;
    const { title_tarefa } = req.body;
  
    const project = projects.find(p => p.id == id);
  
    project.tasks.push(title_tarefa);
  
    return res.json(project);
  });



server.listen(4000);